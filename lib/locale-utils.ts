export const LOCALE_COOKIE_NAME = 'hovenier-language-preference';
export const SUPPORTED_LOCALES = ['nl', 'en'] as const;  
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'nl';
const BASE_URL = (() => {
  const configuredBaseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl').replace(/\/$/, '');
  return configuredBaseUrl.startsWith('http') ? configuredBaseUrl : `https://${configuredBaseUrl}`;
})();

const LOCALIZED_ROUTE_PREFIXES = [
  {
    internal: '/diensten',
    localized: {
      nl: '/diensten',
      en: '/diensten',
    },
  },
] as const;

/**
 * Get the saved language preference from cookies (client-side)
 */
export function getCookieLocale(): SupportedLocale | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const localeCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${LOCALE_COOKIE_NAME}=`)
  );
  
  if (localeCookie) {
    const locale = localeCookie.split('=')[1]?.trim();
    return SUPPORTED_LOCALES.includes(locale as SupportedLocale) 
      ? (locale as SupportedLocale) 
      : null;
  }
  
  return null;
}

/**
 * Set the language preference cookie (client-side)
 */
export function setCookieLocale(locale: SupportedLocale): void {
  if (typeof window === 'undefined') return;
  
  // Set cookie with 1 year expiration
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

/**
 * Get browser's preferred language (client-side)
 */
export function getBrowserLocale(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  
  const browserLangs = navigator.languages || [navigator.language];
  
  for (const lang of browserLangs) {
    // Check exact match first (e.g., 'nl' or 'en')
    if (SUPPORTED_LOCALES.includes(lang as SupportedLocale)) {
      return lang as SupportedLocale;
    }
    
    // Check language code only (e.g., 'en-US' -> 'en')
    const langCode = lang.split('-')[0];
    if (SUPPORTED_LOCALES.includes(langCode as SupportedLocale)) {
      return langCode as SupportedLocale;
    }
  }
  
  // Default fallback
  return DEFAULT_LOCALE;
}

/**
 * Get the saved language preference from Request headers (server-side)
 */
export function getServerCookieLocale(cookieHeader: string | null): SupportedLocale | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';');
  const localeCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${LOCALE_COOKIE_NAME}=`)
  );
  
  if (localeCookie) {
    const locale = localeCookie.split('=')[1]?.trim();
    return SUPPORTED_LOCALES.includes(locale as SupportedLocale) 
      ? (locale as SupportedLocale) 
      : null;
  }
  
  return null;
}

/**
 * Parse Accept-Language header to get preferred language (server-side)
 */
export function getServerAcceptLanguage(acceptLangHeader: string | null): SupportedLocale {
  if (!acceptLangHeader) return DEFAULT_LOCALE;
  
  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,nl;q=0.8")
  const languages = acceptLangHeader
    .split(',')
    .map(lang => ({
      code: lang.split(';')[0].trim(),
      quality: parseFloat(lang.split('q=')[1] || '1')
    }))
    .sort((a, b) => b.quality - a.quality);
  
  for (const { code } of languages) {
    // Check exact match first
    if (SUPPORTED_LOCALES.includes(code as SupportedLocale)) {
      return code as SupportedLocale;
    }
    
    // Check language code only (e.g., 'en-US' -> 'en')
    const langCode = code.split('-')[0];
    if (SUPPORTED_LOCALES.includes(langCode as SupportedLocale)) {
      return langCode as SupportedLocale;
    }
  }
  
  return DEFAULT_LOCALE;
}

export function getPathLocale(pathname: string): SupportedLocale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) {
    return pathname.replace(/^\/en/, '');
  }
  if (pathname === '/nl') return '/';
  if (pathname.startsWith('/nl/')) {
    return pathname.replace(/^\/nl/, '');
  }
  return pathname;
}

export function getInternalPath(pathname: string): string {
  const strippedPath = stripLocalePrefix(pathname);

  for (const route of LOCALIZED_ROUTE_PREFIXES) {
    if (strippedPath === route.internal || strippedPath.startsWith(`${route.internal}/`)) {
      return strippedPath;
    }

    for (const localizedPath of Object.values(route.localized)) {
      if (strippedPath === localizedPath || strippedPath.startsWith(`${localizedPath}/`)) {
        return strippedPath.replace(localizedPath, route.internal);
      }
    }
  }

  return strippedPath;
}

function getLocalizedPublicPath(pathname: string, locale: SupportedLocale): string {
  for (const route of LOCALIZED_ROUTE_PREFIXES) {
    if (pathname === route.internal || pathname.startsWith(`${route.internal}/`)) {
      return pathname.replace(route.internal, route.localized[locale]);
    }
  }

  return pathname;
}

export function localizePath(pathname: string, locale: SupportedLocale): string {
  const normalizedPath = pathname === '' ? '/' : pathname;
  const internalPath = getInternalPath(normalizedPath);
  const publicPath = getLocalizedPublicPath(internalPath, locale);

  return publicPath === '/' ? `/${locale}` : `/${locale}${publicPath}`;
}

export function switchLocalePath(pathname: string, locale: SupportedLocale): string {
  return localizePath(pathname, locale);
}

export function getAbsoluteUrl(pathname: string, locale: SupportedLocale): string {
  return `${BASE_URL}${localizePath(pathname, locale)}`;
}

export function getLocaleAlternates(pathname: string, locale: SupportedLocale) {
  const alternates: { [key: string]: string } = {};
  
  // Add all language versions (including self-referencing)
  SUPPORTED_LOCALES.forEach(loc => {
    const hrefLangCode = loc === 'nl' ? 'nl-NL' : 'en-US';
    alternates[hrefLangCode] = getAbsoluteUrl(pathname, loc);
  });
  
  // Add x-default (pointing to default locale)
  alternates['x-default'] = getAbsoluteUrl(pathname, DEFAULT_LOCALE);

  return {
    canonical: getAbsoluteUrl(pathname, locale),
    languages: alternates,
  };
}
