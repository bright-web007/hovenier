import Script from 'next/script';

export default function CookieSchema() {
  const cookieSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookiebeleid - Hovenier.frl",
    "description": "Cookiebeleid van Hovenier.frl. Informatie over welke cookies wij gebruiken en hoe u uw cookie-instellingen kunt beheren.",
    "url": "https://hovenier.frl/nl/cookie-beleid",
    "inLanguage": "nl-NL",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    },
    "mainEntity": {
      "@type": "PrivacyPolicy",
      "name": "Cookiebeleid",
      "description": "Uitgebreide informatie over cookie-gebruik bij Hovenier.frl",
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
          "description": "Hoe cookies beheren en voorkeuren instellen"
        },
        {
          "@type": "Thing",
          "name": "Data Collection",
          "description": "Welke gegevens worden verzameld via cookies"
        },
        {
          "@type": "Thing",
          "name": "Third Party Services",
          "description": "External services die cookies plaatsen"
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