import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limit store (best-effort, resets on server restart)
// In production, consider using Redis or similar
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per 15 minutes per IP

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIP || 'unknown';
  return ip;
}

/**
 * Check rate limit for an IP address
 */
function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    // No record or window expired, create new record
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(ip, {
    count: record.count,
    resetAt: record.resetAt,
  });

  return { allowed: true };
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate and sanitize input
 */
function validateInput(data: unknown): {
  valid: boolean;
  errors: string[];
  sanitized?: {
    email: string;
    name?: string;
    company?: string;
    role?: string;
    comment?: string;
  };
} {
  if (typeof data !== 'object' || data === null) {
    return { valid: false, errors: ['Invalid request body'] };
  }

  const body = data as Record<string, unknown>;
  const errors: string[] = [];

  // Email is required
  if (!body.email || typeof body.email !== 'string') {
    errors.push('Email is required');
  } else if (!isValidEmail(body.email.trim())) {
    errors.push('Invalid email format');
  }

  // Validate lengths
  if (body.email && typeof body.email === 'string' && body.email.length > 255) {
    errors.push('Email is too long');
  }
  if (body.name && typeof body.name === 'string' && body.name.length > 200) {
    errors.push('Name is too long');
  }
  if (body.company && typeof body.company === 'string' && body.company.length > 200) {
    errors.push('Company name is too long');
  }
  if (body.comment && typeof body.comment === 'string' && body.comment.length > 2000) {
    errors.push('Comment is too long');
  }

  // Validate role if provided
  const validRoles = ['founder', 'finance', 'ops', 'sales', 'other'];
  if (body.role && typeof body.role === 'string' && !validRoles.includes(body.role)) {
    errors.push('Invalid role');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Sanitize and return
  return {
    valid: true,
    errors: [],
    sanitized: {
      email: (body.email as string).trim().toLowerCase(),
      name: body.name && typeof body.name === 'string' ? body.name.trim() : undefined,
      company: body.company && typeof body.company === 'string' ? body.company.trim() : undefined,
      role: body.role && typeof body.role === 'string' ? body.role : undefined,
      comment: body.comment && typeof body.comment === 'string' ? body.comment.trim() : undefined,
    },
  };
}

/**
 * POST handler for early access form submission
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter?.toString() || '900',
          },
        }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Honeypot check (should not be present in body)
    if (body && typeof body === 'object' && 'website' in body) {
      // Bot detected, silently return success
      return NextResponse.json({ message: 'Success' }, { status: 200 });
    }

    // Validate input
    const validation = validateInput(body);
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const { sanitized } = validation;

    // Send to webhook if configured
    const webhookUrl = process.env.EARLY_ACCESS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: sanitized.email,
            name: sanitized.name,
            company: sanitized.company,
            role: sanitized.role,
            comment: sanitized.comment,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!webhookResponse.ok) {
          console.error('Webhook request failed:', webhookResponse.status);
          // Still return success to user (fail gracefully)
        }
      } catch (error) {
        console.error('Webhook request error:', error);
        // Still return success to user (fail gracefully)
      }
    } else {
      // Dev fallback: log to console
      console.log('Early Access Form Submission (dev mode):', {
        email: sanitized.email,
        name: sanitized.name,
        company: sanitized.company,
        role: sanitized.role,
        comment: sanitized.comment,
        submittedAt: new Date().toISOString(),
      });
    }

    // Return success (generic message)
    return NextResponse.json(
      { message: 'Success' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Early access form error:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}

