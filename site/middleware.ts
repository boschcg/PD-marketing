import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales - explicitly defined
const SUPPORTED_LOCALES = ['en'] as const;

/**
 * Check if a locale is supported
 */
function isSupportedLocale(locale: string): locale is typeof SUPPORTED_LOCALES[number] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return SUPPORTED_LOCALES.includes(locale as any);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Explicitly exclude static assets, Next.js internals, and SEO files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }
  
  // If accessing root, redirect to /en
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }
  
  // Extract locale from pathname (first segment after /)
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  // Check if first segment is a locale
  if (firstSegment && firstSegment.length === 2) {
    // It might be a locale
    if (isSupportedLocale(firstSegment)) {
      // Valid locale, allow through
      return NextResponse.next();
    } else {
      // Invalid locale, redirect to /en with the rest of the path
      const restOfPath = pathSegments.slice(1).join('/');
      const redirectPath = restOfPath ? `/en/${restOfPath}` : '/en';
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }
  
  // No locale in path, redirect to /en + pathname
  return NextResponse.redirect(new URL(`/en${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap)
     * - robots.txt (robots)
     * - Static assets are handled in middleware function
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

