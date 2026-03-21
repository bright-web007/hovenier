interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed: string;
  priceRange?: string;
}

export default function ServiceSchema({
  name,
  description,
  provider,
  areaServed,
  priceRange
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
    ...(priceRange && { priceRange })
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}