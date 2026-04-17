import Script from 'next/script';

interface CookieSchemaProps {
  translations: Record<string, string>;
}

export default function CookieSchema({ translations }: CookieSchemaProps) {
  const cookieSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations.schema_name,
    "description": translations.schema_description,
    "url": "https://hovenier.frl/cookie-beleid",
    "inLanguage": translations.schema_language,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    },
    "mainEntity": {
      "@type": "PrivacyPolicy",
      "name": translations.schema_main_name,
      "description": translations.schema_main_description,
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "Hovenier.frl",
        "url": "https://hovenier.frl",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "privacy@hovenier.frl",
          "contactType": "Privacy Support"
        }
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Cookie Management",
          "description": translations.schema_main_description
        },
        {
          "@type": "Thing",
          "name": "Data Collection",
          "description": translations.schema_description
        },
        {
          "@type": "Thing",
          "name": "Third Party Services",
          "description": translations.thirdparty_text
        }
      ]
    }
  };

  return (
    <Script
      id="cookie-policy-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cookieSchema) }}
    />
  );
}
