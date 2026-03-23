interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed?: {
    name: string;
    type: 'City' | 'State' | 'Country';
    containedIn?: {
      name: string;
      type: 'State' | 'Country';
    };
  };
  services?: string[];
  coordinates?: {
    latitude: string;
    longitude: string;
  };
  priceRange?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    postalCode?: string;
    addressRegion: string;
    addressCountry: string;
  };
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
  name,
  description,
  url,
  areaServed,
  services,
  coordinates,
  priceRange = "€35-250",
  address
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "url": url,
    "priceRange": priceRange,
    "currenciesAccepted": "EUR",
    "address": address || {
      "@type": "PostalAddress",
      "addressLocality": "Leeuwarden", 
      "postalCode": "8900",
      "addressRegion": "Friesland",
      "addressCountry": "NL"
    },
    "areaServed": areaServed ? {
      "@type": areaServed.type,
      "name": areaServed.name,
      ...(areaServed.containedIn && {
        "containedInPlace": {
          "@type": areaServed.containedIn.type,
          "name": areaServed.containedIn.name
        }
      })
    } : {
      "@type": "State",
      "name": "Friesland",
      "containedInPlace": {
        "@type": "Country",
        "name": "Nederland"
      }
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": coordinates?.latitude || "53.2",
        "longitude": coordinates?.longitude || "5.8"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hoveniersdiensten",
      "itemListElement": (services || [
        "Tuinonderhoud",
        "Tuinontwerp", 
        "Groendaken",
        "Bestrating",
        "Boomverzorging",
        "Hagen snoeien"
      ]).map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service
        }
      }))
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