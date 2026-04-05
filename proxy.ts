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
  const host = request.headers.get('host') || 'hovenier.frl';

  // In Docker standalone mode request.nextUrl.hostname is '0.0.0.0' (the
  // internal bind address). Derive the real hostname and port from the Host
  // header so any redirect/rewrite URL targets the correct domain.
  // www normalisation and HTTP→HTTPS are handled at the ingress level.
  const [cleanHostname, cleanPort = ''] = host.split(':');

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
    url.port = cleanPort;
    url.pathname = canonicalPublicPath;
    return NextResponse.redirect(url, 308);
  }

  if (canonicalPublicPath !== internalLocalizedPath) {
    const url = request.nextUrl.clone();
    url.hostname = cleanHostname;
    url.port = cleanPort;
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
