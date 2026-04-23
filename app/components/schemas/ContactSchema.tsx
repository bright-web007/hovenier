import React from 'react';
import { getAbsoluteUrl, type SupportedLocale } from '@/lib/locale-utils';

interface ContactSchemaProps {
  locale: string;
  url: string;
}

export default function ContactSchema({ locale, url }: ContactSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hovenier.frl",
    "description": "Leading platform connecting homeowners with professional gardeners in Friesland",
    "url": "https://hovenier.frl",
    "logo": "https://hovenier.frl/images/logo.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "info@hovenier.frl",
        "contactType": "customer service",
        "availableLanguage": ["Dutch", "English"],
        "areaServed": "Friesland",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      },
      {
        "@type": "ContactPoint",
        "contactType": "technical support",
        "email": "support@hovenier.frl",
        "availableLanguage": ["Dutch", "English"],
        "areaServed": "Netherlands"
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "partnerships@hovenier.frl",
        "availableLanguage": ["Dutch", "English"],
        "areaServed": "Friesland"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Friesland",
      "addressCountry": "NL"
    },
    "areaServed": {
      "@type": "State",
      "name": "Friesland",
      "containedInPlace": {
        "@type": "Country",
        "name": "Nederland"
      }
    },
    "sameAs": [
      "https://www.facebook.com/hovenier.frl",
      "https://www.linkedin.com/company/hovenier-frl"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hovenier.frl",
    "description": "Professional gardener matching platform for Friesland homeowners",
    "url": "https://hovenier.frl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${getAbsoluteUrl('/hoveniers', locale as SupportedLocale)}?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Hovenier.frl",
    "description": "Contact Hovenier.frl for partnerships, press inquiries, technical support, or general questions about our gardener matching platform.",
    "url": url,
    "mainEntity": {
      "@type": "Organization",
      "name": "Hovenier.frl",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@hovenier.frl",
        "contactType": "customer support",
        "availableLanguage": ["Dutch", "English"]
      }
    }
  };

  return (
    <>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema, null, 2)
        }}
      />
    </>
  );
}
