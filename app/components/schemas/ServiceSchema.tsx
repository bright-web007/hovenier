interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed: string;
  priceRange?: string;
  category?: string;
}

export default function ServiceSchema({
  name,
  description,
  provider,
  areaServed,
  priceRange,
  category
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: provider.name,
      url: provider.url
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: areaServed
    },
    category: category || "Landscaping Services",
    serviceType: "Professional Gardening Services",
    // Use proper offer structure instead of invalid priceRange on Service
    ...(priceRange && {
      offers: {
        "@type": "Offer",
        priceRange: priceRange,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        validFrom: new Date().toISOString().split('T')[0],
        areaServed: {
          "@type": "AdministrativeArea",
          name: areaServed
        }
      }
    })
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}