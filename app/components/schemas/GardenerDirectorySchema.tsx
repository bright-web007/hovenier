import React from 'react';
import { Gardener } from '../../../lib/gardeners-data';

interface GardenerDirectorySchemaProps {
  gardeners: Gardener[];
  url: string;
  locale: string;
}

export default function GardenerDirectorySchema({ 
  gardeners, 
  url, 
  locale 
}: GardenerDirectorySchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hoveniers Directory Friesland",
    "description": "Uitgebreide directory van gekwalificeerde hoveniers en tuinspecialisten in Friesland",
    "url": url,
    "numberOfItems": gardeners.length,
    "itemListElement": gardeners.map((gardener, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": ["LocalBusiness", "LandscapingBusiness"],
        "@id": `https://hovenier.frl/${locale}/hoveniers/${gardener.slug}`,
        "name": `${gardener.name} - ${gardener.company}`,
        "description": gardener.description,
        "url": `https://hovenier.frl/${locale}/hoveniers/${gardener.slug}`,
        "serviceType": gardener.specialties,
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": `${gardener.location}, Friesland`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": gardener.rating.toString(),
          "reviewCount": gardener.reviewCount.toString()
        },
        "priceRange": `€${gardener.startingPrice}-€${gardener.startingPrice + 20}`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": gardener.contact.phone,
          "email": gardener.contact.email,
          "url": gardener.contact.website,
          "contactType": "customer service",
          "availableLanguage": ["Dutch", "English"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": gardener.location,
          "addressRegion": "Friesland",
          "addressCountry": "NL"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Hoveniersdiensten",
          "itemListElement": gardener.services.map((service, serviceIndex) => ({
            "@type": "Offer",
            "@id": `https://hovenier.frl/${locale}/hoveniers/${gardener.slug}#service-${serviceIndex}`,
            "name": service,
            "description": `Professionele ${service.toLowerCase()} in ${gardener.location}`,
            "provider": {
              "@type": "LocalBusiness",
              "name": `${gardener.name} - ${gardener.company}`
            }
          }))
        },
        "employee": {
          "@type": "Person",
          "name": gardener.name,
          "jobTitle": "Hovenier / Tuinspecialist",
          "worksFor": {
            "@type": "LocalBusiness",
            "name": `${gardener.name} - ${gardener.company}`
          }
        }
      }
    }))
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}