import { getAbsoluteUrl, localizePath, type SupportedLocale } from './locale-utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl';

// Create translator function for SEO utilities
function createSeoTranslator(locale: string) {
  try {
    const translations = require(`../locales/${locale}/common.json`);
    return (key: string) => {
      const keys = key.split('.');
      let result = translations;
      for (const k of keys) {
        result = result?.[k];
      }
      return result || key;
    };
  } catch (error) {
    console.warn(`Could not load translations for locale: ${locale}`);
    return (key: string) => key;
  }
}

export interface SEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  alternateUrls?: Array<{
    locale: string;
    url: string;
  }>;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  openGraph?: {
    type?: string;
    image?: string;
    siteName?: string;
  };
}

/**
 * Generate canonical URL for a given path and locale
 */
export function getCanonicalUrl(path: string, locale: string = 'nl'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return getAbsoluteUrl(normalizedPath === '/' ? '' : normalizedPath, locale as SupportedLocale);
}

/**
 * Generate alternate URLs for all supported locales
 */
export function getAlternateUrls(path: string): Array<{ locale: string; url: string }> {
  return [
    { locale: 'nl', url: getCanonicalUrl(path, 'nl') },
    { locale: 'en', url: getCanonicalUrl(path, 'en') }
  ];
}

/**
 * Generate breadcrumbs for a given path
 */
export function generateBreadcrumbs(
  path: string,
  locale: string = 'nl',
  customLabels?: { [key: string]: string }
): Array<{ name: string; url: string }> {
  const breadcrumbs = [{ name: 'Home', url: getCanonicalUrl('', locale) }];
  
  const pathSegments = path.split('/').filter(Boolean);
  let currentPath = '';
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = customLabels?.[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({
      name: label,
      url: getCanonicalUrl(currentPath, locale)
    });
  });
  
  return breadcrumbs;
}

/**
 * Get default SEO config for pages
 */
export function getDefaultSEOConfig(
  locale: string,
  path: string = ''
): Partial<SEOConfig> {
  const t = createSeoTranslator(locale);
  
  return {
    title: t('seo.default.title'),
    description: t('seo.default.description'),
    canonicalUrl: getCanonicalUrl(path, locale),
    alternateUrls: getAlternateUrls(path),
    openGraph: {
      siteName: 'Hovenier.frl',
      type: 'website'
    }
  };
}

/**
 * Generate structured data for organization
 */
export function getOrganizationSchema(locale: string = 'nl') {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#organization`,
    name: "Hovenier.frl",
    description: locale === 'nl' 
      ? "Professionele hoveniersdiensten in Nederland"
      : "Professional landscaping services in the Netherlands",
    url: BASE_URL,
    email: "info@hovenier.frl",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
      addressRegion: "Nederland"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "52.3676",
      longitude: "4.9041"
    },
    sameAs: [
      "https://www.facebook.com/hovenier.frl",
      "https://www.instagram.com/hovenier.frl"
    ]
  };
}
