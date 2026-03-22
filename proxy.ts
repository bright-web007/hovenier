import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LOCALE,
  getServerAcceptLanguage,
  getServerCookieLocale,
  getInternalPath,
  getPathLocale,
  localizePath,
  stripLocalePrefix,
  type SupportedLocale
} from './lib/locale-utils';

const intlMiddleware = createMiddleware({
  locales: ['en', 'nl'],
  defaultLocale: 'nl',
  localePrefix: 'as-needed',
  localeDetection: false
});

function detectPreferredLocale(request: NextRequest): SupportedLocale {
  const cookieHeader = request.headers.get('cookie');
  const acceptLangHeader = request.headers.get('accept-language');

  const cookieLocale = getServerCookieLocale(cookieHeader);
  if (cookieLocale) {
    return cookieLocale;
  }

  return getServerAcceptLanguage(acceptLangHeader);
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestLocale = getPathLocale(pathname);
  const normalizedPathname = stripLocalePrefix(pathname);
  const internalPathname = getInternalPath(pathname);
  const canonicalPublicPath = localizePath(pathname, requestLocale);
  const internalLocalizedPath =
    requestLocale === DEFAULT_LOCALE
      ? internalPathname
      : internalPathname === '/'
        ? '/en'
        : `/en${internalPathname}`;

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

  if (pathname === '/') {
    const preferredLocale = detectPreferredLocale(request);

    if (preferredLocale !== DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = localizePath(pathname, preferredLocale);
      return NextResponse.redirect(url);
    }
  }

  if (pathname !== canonicalPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = canonicalPublicPath;
    return NextResponse.redirect(url, 308);
  }

  if (canonicalPublicPath !== internalLocalizedPath) {
    const url = request.nextUrl.clone();
    url.pathname = internalLocalizedPath;
    return NextResponse.rewrite(url);
  }

  const response = intlMiddleware(request);

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
