import { getTranslations } from 'next-intl/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl';

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
  // Remove leading/trailing slashes and normalize
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  if (locale === 'nl') {
    return cleanPath ? `${BASE_URL}/${cleanPath}` : BASE_URL;
  }
  
  return cleanPath ? `${BASE_URL}/${locale}/${cleanPath}` : `${BASE_URL}/${locale}`;
}

/**
 * Generate alternate URLs for all supported locales
 */
export function getAlternateUrls(path: string): Array<{ locale: string; url: string }> {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  return [
    { locale: 'nl', url: cleanPath ? `${BASE_URL}/${cleanPath}` : BASE_URL },
    { locale: 'en', url: cleanPath ? `${BASE_URL}/en/${cleanPath}` : `${BASE_URL}/en` }
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
export async function getDefaultSEOConfig(
  locale: string,
  path: string = ''
): Promise<Partial<SEOConfig>> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  
  return {
    title: t('default.title'),
    description: t('default.description'),
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