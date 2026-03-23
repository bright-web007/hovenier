import { getBusinessConfig, ServiceType, type LocalBusinessConfig } from '@/lib/business-config';

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

interface WebsiteSchemaProps {
  url: string;
  name: string;
  description: string;
  publisher: string;
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

export function WebsiteSchema({
  url,
  name,
  description,
  publisher
}: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": publisher
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/?s={search_term_string}`
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
    "itemListElement": items.map((item, index) => ({
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hovenier.frl",
    "description": "Platform voor het vergelijken van betrouwbare hoveniers in Friesland",
    "url": "https://hovenier.frl",
    "logo": "https://hovenier.frl/assets/logo-light.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@hovenier.frl",
      "contactType": "Customer Service",
      "availableLanguage": ["Dutch", "English"],
      "areaServed": "NL"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Leeuwarden",
      "addressRegion": "Friesland", 
      "addressCountry": "NL"
    },
    "sameAs": [
      "https://facebook.com/hovenier.frl",
      "https://instagram.com/hovenier.frl",
      "https://twitter.com/hovenier_frl"
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