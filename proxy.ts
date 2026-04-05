import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LOCALE,
  getInternalPath,
  getPathLocale,
  localizePath,
  stripLocalePrefix,
  type SupportedLocale
} from './lib/locale-utils';

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || 'hovenier.frl';

  // In Docker standalone mode request.nextUrl.hostname resolves to '0.0.0.0'
  // because the server binds to that address. Always override with the real
  // hostname from the Host header so redirects point to the correct domain.
  const cleanHostname = hostname.replace(/^www\./, '').split(':')[0] || 'hovenier.frl';
  url.hostname = cleanHostname;
  url.port = '';

  // Handle www -> non-www redirect (for SEO domain consistency)
  if (hostname.startsWith('www.')) {
    return NextResponse.redirect(url, { status: 301 });
  }

  // Handle HTTP -> HTTPS redirect (though this is usually handled by hosting)
  if (url.protocol === 'http:' && process.env.NODE_ENV === 'production') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, { status: 301 });
  }

  const { pathname } = request.nextUrl;
  const requestLocale = getPathLocale(pathname);
  const normalizedPathname = stripLocalePrefix(pathname);
  const internalPathname = getInternalPath(pathname);
  const canonicalPublicPath = localizePath(pathname, requestLocale);
  
  // For the internal rewrite, we always need the locale prefix since all pages are under [locale]
  const internalLocalizedPath = requestLocale === DEFAULT_LOCALE
    ? `/nl${internalPathname === '/' ? '' : internalPathname}`
    : `/en${internalPathname === '/' ? '' : internalPathname}`;

  const noindexRoutes = [
    '/api',
    '/admin',
    '/_next',
    '/search',
    '/tags',
    '/bedankt',
    '/samenwerking'
  ];

  const shouldNoindex = noindexRoutes.some(route =>
    normalizedPathname.startsWith(route) ||
    normalizedPathname.includes('/search?') ||
    normalizedPathname.includes('/tag/')
  );

  if (pathname !== canonicalPublicPath) {
    const url = request.nextUrl.clone();
    url.hostname = cleanHostname;
    url.port = '';
    url.pathname = canonicalPublicPath;
    return NextResponse.redirect(url, 308);
  }

  if (canonicalPublicPath !== internalLocalizedPath) {
    const url = request.nextUrl.clone();
    url.hostname = cleanHostname;
    url.port = '';
    url.pathname = internalLocalizedPath;
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();

  if (shouldNoindex) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.).*)',
  ],
};
