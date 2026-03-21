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
}\n\n/**\n * Generate breadcrumbs for a given path\n */\nexport function generateBreadcrumbs(\n  path: string,\n  locale: string = 'nl',\n  customLabels?: { [key: string]: string }\n): Array<{ name: string; url: string }> {\n  const breadcrumbs = [{ name: 'Home', url: getCanonicalUrl('', locale) }];\n  \n  const pathSegments = path.split('/').filter(Boolean);\n  let currentPath = '';\n  \n  pathSegments.forEach((segment, index) => {\n    currentPath += `/${segment}`;\n    const label = customLabels?.[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);\n    \n    breadcrumbs.push({\n      name: label,\n      url: getCanonicalUrl(currentPath, locale)\n    });\n  });\n  \n  return breadcrumbs;\n}\n\n/**\n * Get default SEO config for pages\n */\nexport async function getDefaultSEOConfig(\n  locale: string,\n  path: string = ''\n): Promise<Partial<SEOConfig>> {\n  const t = await getTranslations({ locale, namespace: 'seo' });\n  \n  return {\n    title: t('default.title'),\n    description: t('default.description'),\n    canonicalUrl: getCanonicalUrl(path, locale),\n    alternateUrls: getAlternateUrls(path),\n    openGraph: {\n      siteName: 'Hovenier.frl',\n      type: 'website'\n    }\n  };\n}\n\n/**\n * Generate structured data for organization\n */\nexport function getOrganizationSchema(locale: string = 'nl') {\n  return {\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"LocalBusiness\",\n    \"@id\": `${BASE_URL}#organization`,\n    name: \"Hovenier.frl\",\n    description: locale === 'nl' \n      ? \"Professionele hoveniersdiensten in Nederland\"\n      : \"Professional landscaping services in the Netherlands\",\n    url: BASE_URL,\n    telephone: \"+31-20-123-4567\",\n    address: {\n      \"@type\": \"PostalAddress\",\n      addressCountry: \"NL\",\n      addressRegion: \"Nederland\"\n    },\n    geo: {\n      \"@type\": \"GeoCoordinates\",\n      latitude: \"52.3676\",\n      longitude: \"4.9041\"\n    },\n    sameAs: [\n      \"https://www.facebook.com/hovenier.frl\",\n      \"https://www.instagram.com/hovenier.frl\"\n    ]\n  };\n}