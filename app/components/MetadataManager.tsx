import { useLocale } from 'next-intl';

interface MetadataManagerProps {
  canonicalUrl: string;
  title: string;
  description: string;
  alternateUrls?: {
    locale: string;
    url: string;
  }[];
  openGraph?: {
    type?: string;
    image?: string;
    siteName?: string;
  };
}

export default function MetadataManager({
  canonicalUrl,
  title,
  description,
  alternateUrls = [],
  openGraph = {}
}: MetadataManagerProps) {
  const locale = useLocale();
  
  // Default alternate URLs for supported locales
  const defaultAlternates = [
    { locale: 'en', url: canonicalUrl.replace(/\/nl\//, '/en/').replace(/\/en\//, '/') },
    { locale: 'nl', url: canonicalUrl.replace(/\/en\//, '/nl/').replace(/^\/$/, '/nl/') }
  ];
  
  const allAlternates = alternateUrls.length > 0 ? alternateUrls : defaultAlternates;

  return (
    <>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language alternates */}
      {allAlternates.map(({ locale: altLocale, url }) => (
        <link
          key={altLocale}
          rel="alternate"
          hrefLang={altLocale}
          href={url}
        />
      ))}
      
      {/* X default for search engines */}
      <link rel="alternate" hrefLang="x-default" href={allAlternates[0].url} />
      
      {/* Open Graph metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={openGraph.type || 'website'} />
      {openGraph.image && <meta property="og:image" content={openGraph.image} />}
      {openGraph.siteName && <meta property="og:site_name" content={openGraph.siteName} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {openGraph.image && <meta name="twitter:image" content={openGraph.image} />}
      
      {/* Additional SEO meta */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale} />
    </>
  );
}