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
  ratingValue,
  reviewCount,
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
    "@type": businessType || "LocalBusiness",
    name,
    description,
    url,
    areaServed: {
      "@type": "AdministrativeArea",
      name: areaServed
    },
    serviceType: serviceTypes
  };

  // Only add aggregateRating if we have valid review data
  if (ratingValue && reviewCount && ratingValue !== "4.8" && reviewCount !== "127") {
    baseSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount
    };
  }

  // Add contact information only if provided and valid
  if (contactPhone || contactEmail || contactWebsite) {
    const contactPoint: any = {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Dutch", "English"]
    };
    
    // Only add fields that are provided and not placeholder values
    if (contactPhone && !contactPhone.includes('123')) {
      contactPoint.telephone = contactPhone;
    }
    if (contactEmail && !contactEmail.includes('example')) {
      contactPoint.email = contactEmail;
    }
    if (contactWebsite) {
      contactPoint.url = contactWebsite;
    }
    
    // Only add contactPoint if it has actual contact info
    if (contactPoint.telephone || contactPoint.email || contactPoint.url) {
      baseSchema.contactPoint = contactPoint;
    }
  }

  // Always add address - use location param or default to Leeuwarden as regional center
  const addressLocality = location || "Leeuwarden";
  baseSchema.address = {
    "@type": "PostalAddress",
    addressLocality,
    postalCode: location === "Leeuwarden" ? "8900" : "8000-9999",
    addressRegion: "Friesland", 
    addressCountry: "NL"
  };

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