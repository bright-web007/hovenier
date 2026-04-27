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
}

const SERVICE_TYPE_TO_TRANSLATION_KEY: Record<string, string> = {
  groendak: 'groendaken',
  tuinonderhoud: 'tuinonderhoud',
  tuinontwerp: 'tuinontwerp',
  stratenmaker: 'bestrating',
  'tuin-aanleggen': 'tuinaanleg',
};

export function ServicePageSchema({ serviceType, url, locale = 'nl', faqs, breadcrumbItems }: ServiceSchemaProps) {
  const t = createTranslator(locale);
  const config = getBusinessConfig(serviceType);
  const translationKey = SERVICE_TYPE_TO_TRANSLATION_KEY[serviceType] || serviceType;

  const name = t(`schema.service_${translationKey}_name`);
  const description = t(`schema.service_${translationKey}_desc`);
  const category = t(`schema.service_${translationKey}_category`);
  const serviceTypeLabel = t(`schema.service_${translationKey}_serviceType`);
  const unitText = t(`schema.service_${translationKey}_unit`);

  const businessUrl = getAbsoluteUrl('/', locale as SupportedLocale);
  const graph: Array<Record<string, unknown>> = [];

  // 1. LocalBusiness
  graph.push({
    '@type': 'LocalBusiness',
    '@id': `${config.contactInfo.website}#business`,
    name: config.legalName,
    url: businessUrl,
    description: config.description,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/assets/logo-light.svg`,
    },
    email: config.contactInfo.email || 'info@hovenier.frl',
    priceRange: config.priceRange,
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.address.addressLocality,
      postalCode: config.address.postalCode,
      addressRegion: config.address.addressRegion,
      addressCountry: config.address.addressCountry,
      ...(config.address.streetAddress && { streetAddress: config.address.streetAddress }),
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.location.latitude,
      longitude: config.location.longitude,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: config.serviceArea.name,
      sameAs: locale === 'en'
        ? 'https://en.wikipedia.org/wiki/Friesland'
        : 'https://nl.wikipedia.org/wiki/Friesland',
      containedInPlace: {
        '@type': 'Country',
        name: 'Nederland',
      },
    },
    ...(config.businessHours && {
      openingHoursSpecification: config.businessHours.dayOfWeek.map(day => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day,
        opens: config.businessHours!.opens,
        closes: config.businessHours!.closes,
      })),
    }),
    ...(config.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ...config.aggregateRating,
      },
    }),
  });

  // 2. Service
  graph.push({
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    url,
    description,
    category,
    serviceType: serviceTypeLabel,
    provider: {
      '@id': `${config.contactInfo.website}#business`,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: config.serviceArea.name,
      sameAs: locale === 'en'
        ? 'https://en.wikipedia.org/wiki/Friesland'
        : 'https://nl.wikipedia.org/wiki/Friesland',
      containedInPlace: {
        '@type': 'Country',
        name: 'Nederland',
      },
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: config.lowPrice.toString(),
      highPrice: config.highPrice.toString(),
      priceCurrency: config.currenciesAccepted,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: config.lowPrice.toString(),
        priceCurrency: config.currenciesAccepted,
        unitText,
      },
      validFrom: '2026-01-01',
    },
  });

  // 3. FAQPage
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

  // 4. BreadcrumbList
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        '@id': item.url,
        item: {
          '@type': 'WebPage',
          '@id': item.url,
          name: item.name,
        },
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