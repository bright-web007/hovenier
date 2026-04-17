import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_LOCALE,
  getInternalPath,
  getPathLocale,
  getServerAcceptLanguage,
  getServerCookieLocale,
  LOCALE_COOKIE_NAME,
  localizePath,
  stripLocalePrefix,
  SUPPORTED_LOCALES,
  type SupportedLocale
} from './lib/locale-utils';

/**
 * Check if the pathname starts with an explicit locale prefix (e.g. /nl/ or /en/).
 */
function hasExplicitLocalePrefix(pathname: string): boolean {
  for (const locale of SUPPORTED_LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return true;
    }
  }
  return false;
}

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') || 'hovenier.frl';

  // Derive the real hostname and port from the Host header.
  // In Docker standalone mode request.nextUrl.hostname is '0.0.0.0'.
  const [cleanHostname, cleanPort = ''] = host.split(':');

  // Determine the correct public-facing protocol for user-visible 308 redirects.
  // Check X-Forwarded-Proto (Cloudflare/ingress) and CF-Visitor as fallbacks.
  // Default to https in production — without this, a 308 to http:// gets
  // upgraded by Cloudflare, hits the origin again over http://, produces
  // another 308, etc (infinite loop). nginx sidecars often strip
  // X-Forwarded-Proto so we cannot rely on it alone.
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const cfVisitorScheme = (() => {
    try { return JSON.parse(request.headers.get('cf-visitor') || '{}').scheme; }
    catch { return null; }
  })();
  const redirectProtocol =
    forwardedProto === 'https' || cfVisitorScheme === 'https'
      ? 'https:'
      : process.env.NODE_ENV === 'production'
        ? 'https:'
        : request.nextUrl.protocol;

  const { pathname } = request.nextUrl;

  // Locale resolution priority:
  // 1. Explicit locale prefix in URL (e.g. /en/diensten) — always respected
  // 2. Persisted cookie (hovenier-language-preference) — user's previous choice
  // 3. Browser's Accept-Language header — first-visit auto-detection
  // 4. Default to Dutch (nl)
  let requestLocale: SupportedLocale;
  let isAutoDetected = false;

  if (hasExplicitLocalePrefix(pathname)) {
    requestLocale = getPathLocale(pathname);
  } else {
    const cookieLocale = getServerCookieLocale(request.headers.get('cookie'));
    if (cookieLocale) {
      requestLocale = cookieLocale;
    } else {
      requestLocale = getServerAcceptLanguage(request.headers.get('accept-language'));
      isAutoDetected = true;
    }
  }
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

  // Redirect to canonical public URL (e.g. /nl/diensten → /diensten).
  // Must be an absolute URL with the correct public-facing protocol.
  if (pathname !== canonicalPublicPath) {
    const url = request.nextUrl.clone();
    url.protocol = redirectProtocol;
    url.hostname = cleanHostname;
    url.port = cleanPort;
    url.pathname = canonicalPublicPath;
    const response = NextResponse.redirect(url, 308);

    // Persist the detected locale in a cookie so subsequent visits
    // don't need to re-detect from Accept-Language.
    if (isAutoDetected) {
      response.cookies.set(LOCALE_COOKIE_NAME, requestLocale, {
        path: '/',
        maxAge: 365 * 24 * 60 * 60, // 1 year
        sameSite: 'lax',
      });
    }

    return response;
  }

  // Internally rewrite the canonical public path to the [locale]-prefixed
  // path that Next.js app router expects (e.g. /diensten → /nl/diensten).
  // IMPORTANT: only change pathname — keep the original 0.0.0.0:port origin
  // so Next.js treats this as a true internal rewrite and does NOT route the
  // request back through the public ingress (which would re-trigger middleware
  // and create a /nl → / → /nl redirect loop).
  if (canonicalPublicPath !== internalLocalizedPath) {
    const url = request.nextUrl.clone();
    url.pathname = internalLocalizedPath;
    const response = NextResponse.rewrite(url);
    response.headers.set('x-locale', requestLocale);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set('x-locale', requestLocale);

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
