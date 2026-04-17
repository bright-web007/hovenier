import Script from 'next/script';

interface DisclaimerSchemaProps {
  translations: Record<string, string>;
}

export default function DisclaimerSchema({ translations }: DisclaimerSchemaProps) {
  const disclaimerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations.schema_name,
    "description": translations.schema_description,
    "url": "https://hovenier.frl/aansprakelijkheid",
    "inLanguage": translations.schema_language,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    },
    "mainEntity": {
      "@type": "WebPageElement",
      "name": translations.schema_main_name,
      "description": translations.schema_main_description,
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "Hovenier.frl",
        "url": "https://hovenier.frl",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@hovenier.frl",
          "contactType": "Legal Department"
        }
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Liability Limitations",
          "description": translations.schema_about_liability
        },
        {
          "@type": "Thing",
          "name": "Information Accuracy",
          "description": translations.schema_about_accuracy
        },
        {
          "@type": "Thing",
          "name": "Third Party Services",
          "description": translations.schema_about_services
        },
        {
          "@type": "Thing",
          "name": "External Links",
          "description": translations.schema_about_links
        }
      ]
    }
  };

  return (
    <Script
      id="disclaimer-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(disclaimerSchema) }}
    />
  );
}
