import React from 'react';

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed: string;
  serviceTypes: string[];
  ratingValue?: string;
  reviewCount?: string;
}

export default function LocalBusinessSchema({
  name,
  description,
  url,
  areaServed,
  serviceTypes,
  ratingValue = "4.8",
  reviewCount = "127"
}: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    areaServed: {
      "@type": "AdministrativeArea",
      name: areaServed
    },
    serviceType: serviceTypes,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount
    }
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}