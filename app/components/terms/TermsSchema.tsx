import Script from 'next/script';

export default function TermsSchema() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Algemene Voorwaarden - Hovenier.frl",
    "description": "Algemene voorwaarden voor het gebruik van Hovenier.frl platform en dienstverlening.",
    "url": "https://hovenier.frl/algemene-voorwaarden", 
    "inLanguage": "nl-NL",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    },
    "mainEntity": {
      "@type": "TermsOfService",
      "name": "Algemene Voorwaarden",
      "description": "Volledige algemene voorwaarden voor Hovenier.frl platform",
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
          "name": "Platform Usage",
          "description": "Voorwaarden voor gebruik van het Hovenier.frl platform"
        },
        {
          "@type": "Thing",
          "name": "Service Terms",
          "description": "Voorwaarden voor dienstverlening en bemiddeling"
        },
        {
          "@type": "Thing",
          "name": "User Rights",
          "description": "Rechten en plichten van gebruikers"
        }
      ]
    }
  };

  return (
    <Script
      id="terms-of-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
    />
  );
}
