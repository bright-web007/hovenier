import { getBusinessConfig, ServiceType } from '@/lib/business-config';
import { BASE_URL, getAbsoluteUrl, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/i18n';

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

interface ServiceSchemaProps {
  serviceType: ServiceType;
  url: string;
  locale?: string;
  faqs?: Array<{ question: string; answer: string }>;
  breadcrumbItems?: Array<{ name: string; url: string }>;
  offers?: {
    lowPrice: string;
    highPrice: string;
  };
}

const SERVICE_TYPE_TO_TRANSLATION_KEY: Record<string, string> = {
  groendak: 'groendaken',
  tuinonderhoud: 'tuinonderhoud',
  tuinontwerp: 'tuinontwerp',
  stratenmaker: 'bestrating',
  'tuin-aanleggen': 'tuinaanleg',
};

const FRISIAN_CITIES = [
  { name: 'Leeuwarden', sameAs: 'Leeuwarden' },
  { name: 'Sneek', sameAs: 'Sneek' },
  { name: 'Drachten', sameAs: 'Drachten' },
  { name: 'Heerenveen', sameAs: 'Heerenveen' },
  { name: 'Harlingen', sameAs: 'Harlingen,_Friesland' },
  { name: 'Dokkum', sameAs: 'Dokkum' },
  { name: 'Franeker', sameAs: 'Franeker' },
  { name: 'Bolsward', sameAs: 'Bolsward' },
  { name: 'Joure', sameAs: null },
  { name: 'Burgum', sameAs: 'Burgum' },
  { name: 'Lemmer', sameAs: 'Lemmer' },
  { name: 'Gorredijk', sameAs: 'Gorredijk' },
  { name: 'Oosterwolde', sameAs: 'Oosterwolde,_Friesland' },
  { name: 'Wolvega', sameAs: null },
  { name: 'Stiens', sameAs: null },
  { name: 'Grou', sameAs: null },
  { name: 'Akkrum', sameAs: null },
  { name: 'Damwald', sameAs: null },
  { name: 'Kollum', sameAs: null },
];

function getFrisianAreaServed(locale: string, includeSameAs: boolean) {
  const wikiBase = locale === 'en' ? 'https://en.wikipedia.org/wiki/' : 'https://nl.wikipedia.org/wiki/';
  return [
    {
      '@type': 'AdministrativeArea',
      name: 'Friesland',
      sameAs: `${wikiBase}Friesland`,
    },
    ...FRISIAN_CITIES.map((city) => ({
      '@type': 'City' as const,
      name: city.name,
      ...(includeSameAs && city.sameAs ? { sameAs: `${wikiBase}${city.sameAs}` } : {}),
    })),
  ];
}

export function ServicePageSchema({ serviceType, url, locale = 'nl', faqs, breadcrumbItems, offers }: ServiceSchemaProps) {
  const t = createTranslator(locale);
  const config = getBusinessConfig(serviceType);
  const translationKey = SERVICE_TYPE_TO_TRANSLATION_KEY[serviceType] || serviceType;

  const name = t(`schema.service_${translationKey}_name`);
  const description = t(`schema.service_${translationKey}_desc`);
  const category = t(`schema.service_${translationKey}_category`);
  const serviceTypeLabel = t(`schema.service_${translationKey}_serviceType`);
  const unitText = t(`schema.service_${translationKey}_unit`);

  const lowPrice = offers?.lowPrice ?? config.lowPrice.toString();
  const highPrice = offers?.highPrice ?? config.highPrice.toString();

  const businessId = `${BASE_URL}#business`;
  const graph: Array<Record<string, unknown>> = [];

  // 1. Service (with embedded LocalBusiness provider)
  graph.push({
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    url,
    description,
    category,
    serviceType: serviceTypeLabel,
    provider: {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: 'Hovenier FRL',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/logo-light.svg`,
      },
      email: 'info@hovenier.frl',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Leeuwarden',
        addressRegion: 'Friesland',
        addressCountry: 'NL',
      },
      areaServed: getFrisianAreaServed(locale, true),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
    },
    areaServed: getFrisianAreaServed(locale, false),
    offers: {
      '@type': 'AggregateOffer',
      lowPrice,
      highPrice,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: lowPrice,
        priceCurrency: 'EUR',
        unitText,
      },
      validFrom: '2026-01-01',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
  });

  // 2. FAQPage
  if (faqs && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // 3. BreadcrumbList
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
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

export function WebsiteSchema({ locale = 'nl' }: { locale?: string }) {
  const baseUrl = BASE_URL;
  const t = createTranslator(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Hovenier FRL",
    "description": t('schema.website_description'),
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": locale === 'en' ? "en-GB" : "nl-NL",
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
  const baseUrl = BASE_URL;

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

export function HomepageSchemas({ locale = 'nl' }: { locale?: string }) {
  const baseUrl = BASE_URL;
  const t = createTranslator(locale);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#business`,
        "name": "Hovenier FRL",
        "url": baseUrl,
        "description": t('schema.business_description'),
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
          "name": t('schema.offer_catalog_name'),
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#tuinaanleg`,
                "name": t('schema.service_tuinaanleg_name'),
                "description": t('schema.service_tuinaanleg_desc'),
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#tuinonderhoud`,
                "name": t('schema.service_tuinonderhoud_name'),
                "description": t('schema.service_tuinonderhoud_desc'),
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#tuinontwerp`,
                "name": t('schema.service_tuinontwerp_name'),
                "description": t('schema.service_tuinontwerp_desc'),
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#groendaken`,
                "name": t('schema.service_groendaken_name'),
                "description": t('schema.service_groendaken_desc'),
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": `${baseUrl}/diensten#bestrating`,
                "name": t('schema.service_bestrating_name'),
                "description": t('schema.service_bestrating_desc'),
                "areaServed": { "@type": "State", "name": "Friesland" }
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
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
            "name": t('schema.faq_1_q'),
            "acceptedAnswer": { "@type": "Answer", "text": t('schema.faq_1_a') }
          },
          {
            "@type": "Question",
            "name": t('schema.faq_2_q'),
            "acceptedAnswer": { "@type": "Answer", "text": t('schema.faq_2_a') }
          },
          {
            "@type": "Question",
            "name": t('schema.faq_3_q'),
            "acceptedAnswer": { "@type": "Answer", "text": t('schema.faq_3_a') }
          },
          {
            "@type": "Question",
            "name": t('schema.faq_4_q'),
            "acceptedAnswer": { "@type": "Answer", "text": t('schema.faq_4_a') }
          },
          {
            "@type": "Question",
            "name": t('schema.faq_5_q'),
            "acceptedAnswer": { "@type": "Answer", "text": t('schema.faq_5_a') }
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