# Early Access Form API

## Overview

The Early Access form submission API (`/api/early-access`) handles form submissions with validation, spam protection, and rate limiting.

## Environment Variables

### `EARLY_ACCESS_WEBHOOK_URL` (optional)

If set, form submissions will be POSTed to this webhook URL as JSON.

**Example:**
```bash
EARLY_ACCESS_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/123456/abcdef
```

**Webhook Payload:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "company": "Acme Corp",
  "role": "founder",
  "comment": "Interested in early access",
  "submittedAt": "2026-01-01T12:00:00.000Z"
}
```

**If not set:**
- In development, submissions are logged to the console
- The API still returns success (200) to the user
- This allows local testing without a webhook

## Rate Limiting

**Configuration:**
- Window: 15 minutes
- Max requests: 3 per IP address per window
- Storage: In-memory (resets on server restart)

**Response:**
- Status: `429 Too Many Requests`
- Headers: `Retry-After: <seconds>`
- Body: `{ "message": "Too many requests. Please try again later." }`

**Note:** This is a best-effort rate limit. For production, consider using Redis or a dedicated rate limiting service.

## Security Features

### Honeypot Field
- Hidden field named `website` in the form
- If filled, submission is silently rejected (bot detection)
- No error message shown

### Input Validation
- Email: Required, must be valid format, max 255 characters
- Name: Optional, max 200 characters
- Company: Optional, max 200 characters
- Role: Optional, must be one of: `founder`, `finance`, `ops`, `sales`, `other`
- Comment: Optional, max 2000 characters

### Error Responses
- Generic error messages (no sensitive information leaked)
- Validation errors return `400 Bad Request`
- Server errors return `500 Internal Server Error` with generic message

## Local Testing

1. **Without webhook (dev mode):**
   ```bash
   # No env var needed
   npm run dev
   ```
   - Submissions will be logged to console
   - Check server logs for submission data

2. **With webhook:**
   ```bash
   EARLY_ACCESS_WEBHOOK_URL=https://your-webhook-url npm run dev
   ```
   - Submissions will be sent to the webhook
   - Check webhook logs for received data

3. **Test rate limiting:**
   - Submit the form 4 times quickly from the same IP
   - 4th submission should return `429` status

## API Endpoint

**POST** `/api/early-access`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "company": "Acme Corp",
  "role": "founder",
  "comment": "Optional message"
}
```

**Success Response (200):**
```json
{
  "message": "Success"
}
```

**Error Responses:**
- `400 Bad Request`: Validation failed
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

