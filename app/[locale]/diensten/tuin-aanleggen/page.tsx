import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Breadcrumbs from '../../../components/Breadcrumbs';
import RelatedArticles, { type Article } from '../../../components/RelatedArticles';
import { LocalBusinessSchema, BreadcrumbSchema, ServicePageSchema } from '../../../components/StructuredData';
import { getLocaleAlternates, getAbsoluteUrl, localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/lib/translator';
import Image from 'next/image';
import FaqSection from '@/app/components/FaqSection';
import LeadFormSection from '@/app/components/LeadFormSection';
import BenefitsSection from '@/app/components/BenefitsSection';
import { MessageEdit, Brush, Tree, ClipboardText } from 'iconsax-reactjs';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

function isSupportedPageLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

export const revalidate = false;

export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

type Props = {
  params: Promise<{ locale: string }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

function isFaqItem(value: unknown): value is FaqItem {
  return typeof value === 'object' && value !== null && 'question' in value && 'answer' in value;
}

function isRelatedArticle(value: unknown): value is Article {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'excerpt' in value &&
    'slug' in value &&
    'category' in value &&
    'readTime' in value &&
    'publishedAt' in value
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const t = createTranslator(validLocale);

    return {
      title: t('tuin_aanleggen_page.meta_title'),
      description: t('tuin_aanleggen_page.meta_description'),
      keywords: t('tuin_aanleggen_page.meta_keywords').split(','),
      alternates: getLocaleAlternates('/diensten/tuin-aanleggen', validLocale as SupportedLocale),
    };
  } catch {
    return {
      title: 'Tuin Aanleggen - Hovenier.frl',
      description: 'Professional garden installation services in Friesland.'
    };
  }
}

export default async function TuinAanleggenPage({ params }: Props) {
  let validLocale = defaultLocale;

  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!isSupportedPageLocale(validLocale)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const t = createTranslator(validLocale);
  const isEn = validLocale === 'en';
  const rawFaqs = t.raw('faqs.tuin-aanleggen');
  const rawArticles = t.raw('related_articles.tuin-aanleggen');
  const localeFaqs: FaqItem[] = Array.isArray(rawFaqs) ? rawFaqs.filter(isFaqItem) : [];
  const localeArticles: Article[] = Array.isArray(rawArticles) ? rawArticles.filter(isRelatedArticle) : [];

  const navTranslations = {
    gardeners: t('gardeners'),
    services: t('services'),
    regions: t('regions'),
    inspiration: t('inspiration'),
    request_quote: t('request_quote')
  };

  const translations = {
    form_eyebrow: t('form_eyebrow'),
    form_title: t('form_title'),
    form_subtitle: t('form_subtitle'),
    your_name: t('your_name'),
    municipality: t('municipality'),
    service: t('service'),
    phone_number: t('phone_number'),
    send_request: t('send_request'),
    form_note: t('form_note'),
    select_municipality: t('form.select_municipality'),
    what_do_you_need: t('form.what_do_you_need'),
    your_company: t('form.your_company'),
    loading: t('form.loading'),
    privacy_agreement: t('form.privacy_agreement'),
    privacy_link: t('form.privacy_link'),
    privacy_consent: t('form.privacy_consent'),
    services: {
      tuinonderhoud: t('form.services.tuinonderhoud'),
      tuinontwerp: t('form.services.tuinontwerp'),
      'tuin-aanleggen': t('form.services.tuin-aanleggen'),
      stratenmaker: t('form.services.stratenmaker'),
      groendak: t('form.services.groendak'),
      overig: t('form.services.overig')
    }
  };

  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: localizePath('/', validLocale as SupportedLocale) },
    { label: t('tuin_aanleggen_page.breadcrumb_services'), href: localizePath('/diensten', validLocale as SupportedLocale) },
    { label: t('tuin_aanleggen_page.breadcrumb_installation') }
  ];

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": localeFaqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }),
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": isEn ? "Garden Installation" : "Tuin Aanleggen",
            "description": isEn ? "Professional garden installation services in Friesland by certified gardeners" : "Professionele tuinaanleg diensten in Friesland door gecertificeerde hoveniers",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Hovenier.frl",
              "url": "https://hovenier.frl",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Leeuwarden",
                "postalCode": "8900",
                "addressRegion": "Friesland",
                "addressCountry": "NL"
              }
            },
            "areaServed": {
              "@type": "State",
              "name": "Friesland",
              "containedInPlace": {
                "@type": "Country",
                "name": "Nederland"
              }
            },
            "offers": {
              "@type": "Offer",
              "price": "50",
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "50",
                "priceCurrency": "EUR",
                "unitText": isEn ? "per m²" : "per m²"
              }
            }
          }),
        }}
      />

      <LocalBusinessSchema
        serviceType="tuin-aanleggen"
        url={getAbsoluteUrl('/diensten/tuin-aanleggen', validLocale as SupportedLocale)}
      />
      <ServicePageSchema
        serviceType="tuin-aanleggen"
        url={getAbsoluteUrl('/diensten/tuin-aanleggen', validLocale as SupportedLocale)}
        locale={validLocale}
      />

      <BreadcrumbSchema
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? getAbsoluteUrl(item.href, validLocale as SupportedLocale) : getAbsoluteUrl('/diensten/tuin-aanleggen', validLocale as SupportedLocale)
        }))}
      />

      <Navigation locale={validLocale} translations={navTranslations} />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        <section style={{ backgroundColor: '#2A3E20EB', width: '100%', position: 'relative' }}>
          <Image sizes="100vw" style={{ objectFit: 'cover' }} loading='eager' alt="Garden installation background image" src="/images/tuinontwerp-hero.jpg" fill />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#2A3E20E5', zIndex: 10 }}></div>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '50.5px 1rem', display: 'flex', flexDirection: 'column', gap: '15.4px', position: 'relative', zIndex: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '22px', height: '.5px', backgroundColor: 'var(--sage)' }} />
              <span style={{ fontSize: '10px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--sage)' }}>
                {t('tuin_aanleggen_page.eyebrow')}
              </span>
            </div>
            <h1 style={{ color: '#F4F0E8', fontSize: '48px', fontWeight: 500, lineHeight: '51.84px', margin: 0 }}>
              {t('tuin_aanleggen_page.title')}
            </h1>
            <p style={{ borderLeft: '2px solid var(--sage)', padding: '16px 20px', backgroundColor: '#FFFFFF0F', color: '#C8DFC0', fontSize: '15px', lineHeight: '24.75px', fontWeight: 300, margin: 0 }}>
              {t('tuin_aanleggen_page.description')}
            </p>

          </div>
        </section>

        <BenefitsSection
          title={t('tuin_aanleggen_page.process_title')}
          subtitle={t('tuin_aanleggen_page.process_subtitle')}
          benefits={[
            { icon: <MessageEdit size={24} color="#FFFFFF" variant="Linear" />, title: t('tuin_aanleggen_page.process_step1_title'), description: t('tuin_aanleggen_page.process_step1_text') },
            { icon: <Brush size={24} color="#FFFFFF" variant="Linear" />, title: t('tuin_aanleggen_page.process_step2_title'), description: t('tuin_aanleggen_page.process_step2_text') },
            { icon: <Tree size={24} color="#FFFFFF" variant="Linear" />, title: t('tuin_aanleggen_page.process_step3_title'), description: t('tuin_aanleggen_page.process_step3_text') },
            { icon: <ClipboardText size={24} color="#FFFFFF" variant="Linear" />, title: t('tuin_aanleggen_page.process_step4_title'), description: t('tuin_aanleggen_page.process_step4_text') },
          ]}
        />

        <FaqSection
          title={t('tuin_aanleggen_page.faq_title')}
          faqs={localeFaqs}
        />

        <LeadFormSection
          title={t('tuin_aanleggen_page.lead_title')}
          subtitle={t('tuin_aanleggen_page.lead_subtitle')}
          locale={validLocale}
          backgroundColor="#EDE9E0"
          formBackgroundColor="#FFFFFF"
          translations={translations}
        />
      </main>

      <RelatedArticles articles={localeArticles} title={t('tuin_aanleggen_page.related_articles_title')} />
    </>
  );
}
