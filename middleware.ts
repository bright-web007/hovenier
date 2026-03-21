import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Configure next-intl middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'nl'],
  defaultLocale: 'nl',
  localePrefix: 'as-needed', // Only prefix non-default locales
  localeDetection: true
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Routes that should be noindexed
  const noindexRoutes = [
    '/api',
    '/admin', 
    '/_next',
    '/search',
    '/tags',
    '/bedankt', // Thank you page
    '/samenwerking' // Partnership page
  ];
  
  // Check if current path should be noindexed
  const shouldNoindex = noindexRoutes.some(route => 
    pathname.startsWith(route) || 
    pathname.includes('/search?') ||
    pathname.includes('/tag/')
  );
  
  // Run the intl middleware first
  const response = intlMiddleware(request);
  
  // Add noindex header for specified routes
  if (shouldNoindex) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  
  return response;
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files (images, etc.)
  // - Next.js internals
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.).*)',
  ],
};