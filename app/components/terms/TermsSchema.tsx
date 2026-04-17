import Script from 'next/script';

export default function TermsSchema({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';
  const lang = isEn ? 'en-US' : 'nl-NL';
  const urlPrefix = isEn ? 'https://hovenier.frl/en' : 'https://hovenier.frl';
  const pageUrl = `${urlPrefix}/algemene-voorwaarden`;

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isEn
      ? "Terms and Conditions - Hovenier.frl"
      : "Algemene Voorwaarden - Hovenier.frl",
    "description": isEn
      ? "Terms and conditions for using the Hovenier.frl platform and services."
      : "Algemene voorwaarden voor het gebruik van Hovenier.frl platform en dienstverlening.",
    "url": pageUrl,
    "inLanguage": lang,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    },
    "mainEntity": {
      "@type": "TermsOfService",
      "name": isEn ? "Terms and Conditions" : "Algemene Voorwaarden",
      "description": isEn
        ? "Complete terms and conditions for the Hovenier.frl platform"
        : "Volledige algemene voorwaarden voor Hovenier.frl platform",
      "dateModified": new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": "Hovenier.frl",
        "url": "https://hovenier.frl",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "info@hovenier.frl",
          "contactType": isEn ? "Legal Department" : "Juridische Afdeling"
        }
      },
      "about": [
        {
          "@type": "Thing",
          "name": isEn ? "Platform Usage" : "Platformgebruik",
          "description": isEn
            ? "Terms for using the Hovenier.frl platform"
            : "Voorwaarden voor gebruik van het Hovenier.frl platform"
        },
        {
          "@type": "Thing",
          "name": isEn ? "Service Terms" : "Dienstvoorwaarden",
          "description": isEn
            ? "Terms for services and mediation"
            : "Voorwaarden voor dienstverlening en bemiddeling"
        },
        {
          "@type": "Thing",
          "name": isEn ? "User Rights" : "Gebruikersrechten",
          "description": isEn
            ? "Rights and obligations of users"
            : "Rechten en plichten van gebruikers"
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
