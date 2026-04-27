import { createTranslator } from '@/i18n';
import { getAbsoluteUrl, SupportedLocale } from '@/lib/locale-utils';

interface CityServiceSchemaFAQ {
  question: string;
  answer: string;
}

interface CityServiceSchemaData {
  serviceName: string;
  description: string;
  latitude: string;
  longitude: string;
  ratingValue: string;
  reviewCount: string;
  areaServedName: string;
  areaServedSameAs?: string;
  lowPrice: string;
  highPrice: string;
  unitText: string;
  faqs: CityServiceSchemaFAQ[];
}

interface CityServiceSchemaProps {
  locale: SupportedLocale;
  slug: string;
  gemeente: string;
  citySlug: string;
  serviceSlug: string;
}

export function CityServiceSchema({ locale, slug, gemeente, citySlug, serviceSlug }: CityServiceSchemaProps) {
  const t = createTranslator(locale);
  const data = t.raw(`schema_data.services.${citySlug}.${serviceSlug}`) as CityServiceSchemaData | undefined;
  if (!data || !Array.isArray(data.faqs)) return null;

  const pageUrl = getAbsoluteUrl(`/regio/${slug}/${gemeente}/${citySlug}/${serviceSlug}`, locale);
  const cityUrl = getAbsoluteUrl(`/regio/${slug}/${gemeente}/${citySlug}`, locale);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: data.serviceName,
        url: pageUrl,
        description: data.description,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${cityUrl}#business`,
          name: `Hovenier FRL ${data.areaServedName}`,
          url: cityUrl,
          logo: {
            '@type': 'ImageObject',
            url: 'https://hovenier.frl/assets/logo-light.svg',
          },
          email: 'info@hovenier.frl',
          priceRange: '€€',
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.areaServedName,
            addressRegion: 'Friesland',
            addressCountry: 'NL',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude,
            longitude: data.longitude,
          },
          areaServed: {
            '@type': 'City',
            name: data.areaServedName,
            ...(data.areaServedSameAs ? { sameAs: data.areaServedSameAs } : {}),
          },
        },
        areaServed: {
          '@type': 'City',
          name: data.areaServedName,
          ...(data.areaServedSameAs ? { sameAs: data.areaServedSameAs } : {}),
        },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: data.lowPrice,
          highPrice: data.highPrice,
          priceCurrency: 'EUR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: data.lowPrice,
            priceCurrency: 'EUR',
            unitText: data.unitText,
          },
          validFrom: '2026-01-01',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: data.ratingValue,
          reviewCount: data.reviewCount,
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
