/**
 * Get the base site URL for canonical URLs and OpenGraph
 * Uses NEXT_PUBLIC_SITE_URL or SITE_URL env var
 * Defaults to http://localhost:3000 in development/build time
 */
export function getSiteUrl(): string {
  // Try NEXT_PUBLIC_SITE_URL first (Next.js convention)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Fallback to SITE_URL
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  
  // Default to localhost for development and build time
  // In production runtime, this should be set via env var
  return 'http://localhost:3000';
}

