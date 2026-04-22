import { getBusinessConfig, ServiceType } from '@/lib/business-config';
import { env } from '@/lib/env';

interface LocalBusinessSchemaProps {
  /** Service type to get specific config, omit for general business config */
  serviceType?: ServiceType;
  /** Page URL for this specific page */
  url: string;
  /** Override specific services for this page (optional) */
  services?: string[];
  /** Additional context for the business name (optional) */
  nameContext?: string;
}

interface BreadcrumbSchemaProps {
  items: {
    position: number;
    name: string;
    url: string;
  }[];
}

export function LocalBusinessSchema({
  serviceType,
  url,
  services,
  nameContext
}: LocalBusinessSchemaProps) {
  const config = getBusinessConfig(serviceType);
  
  // Build business name with optional context
  const businessName = nameContext 
    ? `${nameContext} - ${config.name}`
    : config.name;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": config.contactInfo.website,
    "name": businessName,
    "legalName": config.legalName,
    "description": config.description,
    "url": url,
    "sameAs": [config.contactInfo.website],
    "priceRange": config.priceRange,
    "currenciesAccepted": config.currenciesAccepted,
    "paymentAccepted": config.paymentAccepted,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": config.address.addressLocality,
      "postalCode": config.address.postalCode,
      "addressRegion": config.address.addressRegion,
      "addressCountry": config.address.addressCountry,
      ...(config.address.streetAddress && {
        "streetAddress": config.address.streetAddress
      })
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": config.location.latitude,
      "longitude": config.location.longitude
    },
    "areaServed": {
      "@type": "State",
      "name": config.serviceArea.name,
      "containedInPlace": {
        "@type": "Country",
        "name": "Nederland"
      }
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": config.location.latitude,
        "longitude": config.location.longitude
      },
      "geoRadius": config.serviceArea.radius
    },
    ...(config.businessHours && {
      "openingHours": config.businessHours.dayOfWeek.map(day => 
        `${day} ${config.businessHours!.opens}-${config.businessHours!.closes}`
      )
    }),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hoveniersdiensten",
      "itemListElement": (services || config.coreServices).map((service, index) => ({
        "@type": "Offer",
        "@id": `${url}#service-${index}`,
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "provider": {
            "@type": "LocalBusiness",
            "@id": config.contactInfo.website,
            "name": config.legalName
          }
        }
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}

export function WebsiteSchema() {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Hovenier FRL",
    "description": "Het lokale platform voor hoveniers in Friesland — tuinaanleg, tuinonderhoud, tuinontwerp en groendaken",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": "nl-NL",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item) => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function OrganizationSchema() {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Hovenier FRL",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#logo`,
      "url": `${baseUrl}/logo.png`,
      "contentUrl": `${baseUrl}/logo.png`,
      "caption": "Hovenier FRL"
    },
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/homepage.jpg`
    },
    "description": "Hovenier FRL is het lokale platform dat huiseigenaren in Friesland verbindt met ervaren hoveniers voor tuinaanleg, tuinonderhoud, tuinontwerp en groendaken.",
    "email": "info@hovenier.frl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Heliconweg 60",
      "addressLocality": "Leeuwarden",
      "postalCode": "8914 AT",
      "addressRegion": "Friesland",
      "addressCountry": "NL"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Friesland",
        "sameAs": "https://en.wikipedia.org/wiki/Friesland"
      }
    ],
    "foundingDate": "2026",
    "sameAs": [
      "https://www.facebook.com/hovenierfrl",
      "https://www.linkedin.com/company/hovenierfrl",
      "https://www.instagram.com/hovenierfrl"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export function HomepageSchemas() {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#business`,
        "name": "Hovenier FRL",
        "url": baseUrl,
        "description": "Hovenier FRL verbindt huiseigenaren in Friesland met vakkundige lokale hoveniers voor tuinaanleg, tuinonderhoud, tuinontwerp en groendaken. Ontvang binnen 24 uur meerdere vrijblijvende offertes.",
        "email": "info@hovenier.frl",
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        },
        "image": `${baseUrl}/images/homepage.jpg`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Heliconweg 60",
          "addressLocality": "Leeuwarden",
          "postalCode": "8914 AT",
          "addressRegion": "Friesland",
          "addressCountry": "NL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "53.2014",
          "longitude": "5.7998"
        },
        "areaServed": [
          { "@type": "State", "name": "Friesland", "sameAs": "https://en.wikipedia.org/wiki/Friesland" },
          { "@type": "City", "name": "Leeuwarden", "sameAs": "https://en.wikipedia.org/wiki/Leeuwarden" },
          { "@type": "City", "name": "Heerenveen", "sameAs": "https://en.wikipedia.org/wiki/Heerenveen" },
          { "@type": "City", "name": "Drachten", "sameAs": "https://en.wikipedia.org/wiki/Drachten" },
          { "@type": "City", "name": "Sneek", "sameAs": "https://en.wikipedia.org/wiki/Sneek" },
          { "@type": "City", "name": "Harlingen", "sameAs": "https://en.wikipedia.org/wiki/Harlingen,_Friesland" },
          { "@type": "City", "name": "Dokkum", "sameAs": "https://en.wikipedia.org/wiki/Dokkum" },
          { "@type": "City", "name": "Franeker", "sameAs": "https://en.wikipedia.org/wiki/Franeker" },
          { "@type": "City", "name": "Bolsward", "sameAs": "https://en.wikipedia.org/wiki/Bolsward" },
          { "@type": "City", "name": "Burgum", "sameAs": "https://en.wikipedia.org/wiki/Burgum" },
          { "@type": "City", "name": "Lemmer", "sameAs": "https://en.wikipedia.org/wiki/Lemmer" },
          { "@type": "City", "name": "Gorredijk", "sameAs": "https://en.wikipedia.org/wiki/Gorredijk" },
          { "@type": "City", "name": "Oosterwolde", "sameAs": "https://en.wikipedia.org/wiki/Oosterwolde,_Friesland" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Hovenier Diensten Friesland",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#tuinaanleg`,
                "name": "Tuinaanleg Friesland",
                "description": "Professionele tuinaanleg door lokale hoveniers in Friesland. Van ontwerp tot realisatie.",
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#tuinonderhoud`,
                "name": "Tuinonderhoud Friesland",
                "description": "Professioneel tuinonderhoud door lokale hoveniers in Friesland. Gazononderhoud, snoeien en meer.",
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#tuinontwerp`,
                "name": "Tuinontwerp Friesland",
                "description": "Professioneel tuinontwerp door ervaren tuinontwerpers in Friesland. Van schets tot 3D visualisatie.",
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#groendaken`,
                "name": "Groendaken Friesland",
                "description": "Duurzame groendaken door specialisten in Friesland. Sedum daken en extensieve begroeide daken.",
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#bestrating`,
                "name": "Bestrating Friesland",
                "description": "Duurzame bestratingswerken in Friesland. Terrassen, opritten en tuinpaden door vakkundige stratenmakers.",
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "124",
          "bestRating": "5",
          "worstRating": "1"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "14:00"
          }
        ],
        "sameAs": [
          "https://www.facebook.com/hovenierfrl",
          "https://www.linkedin.com/company/hovenierfrl"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Wat doet Hovenier FRL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hovenier FRL is het lokale platform dat huiseigenaren in Friesland verbindt met vakkundige hoveniers voor tuinaanleg, tuinonderhoud, tuinontwerp en groendaken. Via Hovenier FRL ontvangt u binnen 24 uur meerdere vrijblijvende offertes van lokale hoveniers in uw regio."
            }
          },
          {
            "@type": "Question",
            "name": "In welke steden in Friesland is Hovenier FRL actief?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hovenier FRL is actief in alle Friese gemeenten, waaronder Leeuwarden, Heerenveen, Drachten, Sneek, Harlingen, Dokkum, Franeker, Bolsward, Burgum, Lemmer, Gorredijk en Oosterwolde. Ook kleinere dorpen en gemeenten in Friesland worden bediend."
            }
          },
          {
            "@type": "Question",
            "name": "Hoe snel ontvang ik een offerte via Hovenier FRL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Via Hovenier FRL ontvangt u binnen 24 uur meerdere vrijblijvende offertes van lokale hoveniers in uw regio in Friesland. Het aanvragen van offertes is volledig gratis en vrijblijvend."
            }
          },
          {
            "@type": "Question",
            "name": "Wat kost een hovenier in Friesland?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "De kosten van een hovenier in Friesland variëren afhankelijk van het type werk. Tuinonderhoud kost gemiddeld €40 tot €65 per uur. Tuinaanleg start vanaf €500 voor kleinere projecten. Via Hovenier FRL vergelijkt u eenvoudig meerdere offertes om de beste prijs-kwaliteitverhouding te vinden."
            }
          },
          {
            "@type": "Question",
            "name": "Welke tuindiensten zijn beschikbaar via Hovenier FRL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Via Hovenier FRL zijn de volgende tuindiensten beschikbaar in Friesland: tuinaanleg, tuinonderhoud, tuinontwerp, groendaken en bestrating. Alle hoveniers in het netwerk hebben specifieke kennis van de Friese bodemomstandigheden en het lokale klimaat."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}