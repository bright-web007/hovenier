import { HOVENIER_BUSINESS_CONFIG } from '@/lib/business-config';

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: {  // Made optional since we use centralized config
    name?: string;
    url?: string;
  };
  areaServed: string;
  priceRange?: string;  // Still accept for backward compatibility
  lowPrice?: number;    // New proper schema format
  highPrice?: number;   // New proper schema format
  category?: string;
}

export default function ServiceSchema({
  name,
  description,
  provider,
  areaServed,
  priceRange,
  lowPrice,
  highPrice,
  category
}: ServiceSchemaProps) {
  // Parse price range if provided but not low/high prices
  let finalLowPrice = lowPrice;
  let finalHighPrice = highPrice;
  
  if (priceRange && (!lowPrice || !highPrice)) {
    const numbers = priceRange.replace(/€/g, '').split('-').map(price => parseInt(price.trim()));
    finalLowPrice = numbers[0] || 35;
    finalHighPrice = numbers[1] || 250;
  }
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: provider?.name || HOVENIER_BUSINESS_CONFIG.name,
      url: provider?.url || HOVENIER_BUSINESS_CONFIG.contactInfo.website,
      address: {
        "@type": "PostalAddress",
        addressLocality: HOVENIER_BUSINESS_CONFIG.address.addressLocality,
        postalCode: HOVENIER_BUSINESS_CONFIG.address.postalCode,
        addressRegion: HOVENIER_BUSINESS_CONFIG.address.addressRegion,
        addressCountry: HOVENIER_BUSINESS_CONFIG.address.addressCountry,
        ...(HOVENIER_BUSINESS_CONFIG.address.streetAddress && {
          streetAddress: HOVENIER_BUSINESS_CONFIG.address.streetAddress
        })
      }
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: areaServed
    },
    category: category || "Landscaping Services",
    serviceType: "Professional Gardening Services",
    // Use proper AggregateOffer with lowPrice/highPrice (NOT priceRange in offers)
    ...((finalLowPrice && finalHighPrice) && {
      offers: {
        "@type": "AggregateOffer",
        lowPrice: finalLowPrice.toString(),
        highPrice: finalHighPrice.toString(),
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