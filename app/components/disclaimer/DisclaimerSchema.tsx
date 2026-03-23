import Script from 'next/script';

export default function DisclaimerSchema() {
  const disclaimerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer - Hovenier.frl",
    "description": "Disclaimer en aansprakelijkheidsbeperkingen voor het gebruik van Hovenier.frl platform en diensten.",
    "url": "https://hovenier.frl/aansprakelijkheid",
    "inLanguage": "nl-NL",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    },
    "mainEntity": {
      "@type": "WebPageElement",
      "name": "Disclaimer",
      "description": "Volledige disclaimer met aansprakelijkheidsbeperkingen voor Hovenier.frl",
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
          "description": "Beperkingen van aansprakelijkheid voor platformgebruik"
        },
        {
          "@type": "Thing",
          "name": "Information Accuracy",
          "description": "Disclaimer over nauwkeurigheid van verstrekte informatie"
        },
        {
          "@type": "Thing",
          "name": "Third Party Services",
          "description": "Disclaimer voor diensten van aangesloten hoveniers"
        },
        {
          "@type": "Thing",
          "name": "External Links",
          "description": "Disclaimer voor externe websites en links"
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
