import React from 'react';

interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed: string;
  serviceTypes: string[];
  ratingValue?: string;
  reviewCount?: string;
  // Enhanced props for comprehensive schema
  contactPhone?: string;
  contactEmail?: string;
  contactWebsite?: string;
  personName?: string;
  priceRange?: string;
  services?: string[];
  location?: string;
  businessType?: string;
}

export default function LocalBusinessSchema({
  name,
  description,
  url,
  areaServed,
  serviceTypes,
  ratingValue = "4.8",
  reviewCount = "127",
  contactPhone,
  contactEmail,
  contactWebsite,
  personName,
  priceRange,
  services,
  location,
  businessType = "LandscapingBusiness"
}: LocalBusinessSchemaProps) {
  const baseSchema: any = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", businessType],
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

  // Add contact information if available
  if (contactPhone || contactEmail || contactWebsite) {
    baseSchema.contactPoint = {
      "@type": "ContactPoint",
      telephone: contactPhone,
      email: contactEmail,
      url: contactWebsite,
      contactType: "customer service",
      availableLanguage: ["Dutch", "English"]
    };
  }

  // Add address if location provided
  if (location) {
    baseSchema.address = {
      "@type": "PostalAddress",
      addressLocality: location,
      addressRegion: "Friesland",
      addressCountry: "NL"
    };
  }

  // Add price range if available
  if (priceRange) {
    baseSchema.priceRange = priceRange;
  }

  // Add individual services as Service objects
  if (services && services.length > 0) {
    baseSchema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Hoveniersdiensten",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        "@id": `${url}#service-${index}`,
        name: service,
        description: `Professionele ${service.toLowerCase()} in ${location || areaServed}`,
        provider: {
          "@type": "LocalBusiness",
          name: name
        }
      }))
    };
  }

  // Add person information if individual gardener
  if (personName) {
    baseSchema.employee = {
      "@type": "Person",
      name: personName,
      jobTitle: "Hovenier / Tuinspecialist",
      worksFor: {
        "@type": "LocalBusiness",
        name: name
      }
    };
  }

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseSchema, null, 2) }}
    />
  );
}