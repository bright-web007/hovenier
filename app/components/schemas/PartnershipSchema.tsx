import React from 'react';
import { getAbsoluteUrl, type SupportedLocale } from '@/lib/locale-utils';

interface FAQ {
  question: string;
  answer: string;
}

interface PartnershipSchemaProps {
  locale: string;
  faqs: FAQ[];
  url: string;
}

export default function PartnershipSchema({ locale, faqs, url }: PartnershipSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hovenier.frl Partner Network",
    "description": "Professioneel netwerk van gecertificeerde hoveniers in Friesland",
    "url": url,
    "areaServed": {
      "@type": "State",
      "name": "Friesland",
      "containedInPlace": {
        "@type": "Country",
        "name": "Nederland"
      }
    },
    "memberOf": {
      "@type": "ProfessionalService",
      "name": "Hoveniers Network Friesland",
      "serviceType": "Landscaping Services"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Partnership Opportunities",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Professional Gardener Partnership",
          "description": "Join our network of certified gardeners in Friesland",
          "price": "0",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "businessFunction": "https://schema.org/Sell",
          "areaServed": {
            "@type": "State",
            "name": "Friesland"
          }
        }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Partnership Inquiries",
      "availableLanguage": ["Dutch", "English"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hovenier.frl Partnership Program",
    "description": "Join the leading professional gardener network in Friesland. No commission fees, transparent partnership.",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${getAbsoluteUrl('/hoveniers', locale as SupportedLocale)}?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 2)
        }}
      />
    </>
  );
}
