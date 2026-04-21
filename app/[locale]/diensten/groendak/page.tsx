import { Metadata } from 'next';
import Image from 'next/image';
import Navigation from '../../../components/Navigation';
import RelatedArticles from '../../../components/RelatedArticles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData';
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/lib/translator';
import { TickCircle, Cloud, Heart, DollarCircle } from 'iconsax-reactjs';
import FaqSection from '@/app/components/FaqSection';
import LeadFormSection from '@/app/components/LeadFormSection';
import BenefitsSection from '@/app/components/BenefitsSection';

type RoofTypeCardProps = {
  title: string;
  price: string;
  description: string;
  specs: { label: string; value: string }[];
  badge?: string;
  accentBar?: boolean;
};

function RoofTypeCard({ title, price, description, specs, badge, accentBar }: RoofTypeCardProps) {
  return (
    <div className="roof-type-card">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
        {badge && (
          <span style={{ backgroundColor: 'var(--forest)', color: 'var(--white)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.5px', padding: '6px 14px', borderRadius: '20px', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
            {badge}
          </span>
        )}
        <h3 style={{ fontFamily: 'var(--heading-font)', fontSize: '26px', lineHeight: '32px', fontWeight: 700, color: 'var(--forest)', margin: 0 }}>
          {title}
        </h3>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ backgroundColor: '#8AB87A26', borderRadius: '8px', padding: '8px 14px', fontSize: '1rem', fontWeight: 600, color: 'var(--forest)' }}>
          {price}
        </span>
      </div>
      <p style={{ fontSize: '15px', lineHeight: '24px', fontWeight: 400, color: 'var(--text-mid)', margin: 0 }}>
        {description}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #2A3E2014', paddingTop: '24px' }}>
        {specs.map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{label}</span>
            <span style={{ color: 'var(--forest)', fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const t = createTranslator(validLocale);

    return {
      title: t('groendak_page.meta_title'),
      description: t('groendak_page.meta_description'),
      keywords: t('groendak_page.meta_keywords').split(','),
      alternates: getLocaleAlternates('/diensten/groendak', validLocale as SupportedLocale),
    };
  } catch {
    return {
      title: 'Groendaken - Hovenier.frl',
      description: 'Professional green roof services in Friesland.'
    };
  }
}

export default async function GroendakPage({ params }: Props) {
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
  const localeFaqs = (t.raw('faqs.groendak') || []) as Array<{ question: string; answer: string }>;
  const localeArticles = (t.raw('related_articles.groendak') || []) as Array<{ id: string; title: string; excerpt: string; slug: string; category: string; readTime: number; publishedAt: string }>;

  // Navigation translations
  const navTranslations = {
    gardeners: t('gardeners'),
    services: t('services'),
    regions: t('regions'),
    inspiration: t('inspiration'),
    request_quote: t('request_quote')
  };

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('groendak_page.breadcrumb_services'), href: localizePath('/diensten', validLocale as SupportedLocale) },
    { label: t('groendak_page.breadcrumb_green_roofs') }
  ];

  // Prepare translations for the lead form
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

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": localeFaqs.map((faq: { question: string; answer: string }) => ({
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
            "name": isEn ? "Green Roofs" : "Groendaken",
            "description": isEn ? "Professional green roof installation in Friesland by certified specialists" : "Professionele groendak aanleg in Friesland door gecertificeerde specialisten",
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
              "price": "85",
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "85",
                "priceCurrency": "EUR",
                "unitText": "per square meter"
              }
            }
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl${localizePath('/diensten/groendak', validLocale as SupportedLocale)}`
        }))}
      />

      {/* Local Business Schema for Green Roof Services */}
      <LocalBusinessSchema
        serviceType="groendak"
        url={`https://hovenier.frl${localizePath('/diensten/groendak', validLocale as SupportedLocale)}`}
      />

      <Navigation locale={validLocale} translations={navTranslations} />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        <section style={{ backgroundColor: '#2A3E20EB', width: '100%', position: 'relative' }}>
          <Image sizes="100vw" style={{ objectFit: 'cover' }} loading='eager' alt="Green Roof background image" src="/images/green_roof_bg.jpg" fill />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#2A3E20E5', zIndex: 10 }}></div>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '50.5px 1rem', display: 'flex', flexDirection: 'column', gap: '15.4px', position: 'relative', zIndex: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '22px', height: '.5px', backgroundColor: 'var(--sage)' }} />
              <span style={{ fontSize: '10px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--sage)' }}>
                {t('groendak_page.eyebrow')}
              </span>
            </div>
            <h1 style={{ color: '#F4F0E8', fontSize: '48px', fontWeight: 500, lineHeight: '51.84px', margin: 0 }}>
              {t('groendak_page.title')}
            </h1>
            <p style={{ borderLeft: '2px solid var(--sage)', padding: '16px 20px', backgroundColor: '#FFFFFF0F', color: '#C8DFC0', fontSize: '15px', lineHeight: '24.75px', fontWeight: 300, margin: 0 }}>
              {t('groendak_page.description')}
            </p>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '8.6px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, margin: 0 }}>{t('groendak_page.stat_price')}</p>
                <p style={{ color: '#B8C4B0', fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                  {t('groendak_page.stat_price_label')}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, margin: 0 }}>{t('groendak_page.stat_warranty')}</p>
                <p style={{ color: '#B8C4B0', fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                  {t('groendak_page.stat_warranty_label')}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, margin: 0 }}>{t('groendak_page.stat_specialists')}</p>
                <p style={{ color: '#B8C4B0', fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>
                  {t('groendak_page.stat_specialists_label')}
                </p>
              </div>
            </div>
          </div>
        </section>   

        <section style={{ backgroundColor: 'var(--cream-dark)', width: '100%' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '80px 1rem', display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{ fontFamily: 'var(--heading-font)', fontSize: '44px', fontWeight: 700, color: 'var(--forest-deep)', margin: 0, letterSpacing: '-0.44px' }}>
                {t('groendak_page.types_title')}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '26px', color: 'var(--text-muted)', margin: 0, fontWeight: 400 }}>
                {t('groendak_page.types_subtitle')}
              </p>
            </div>

            <div className="grid-responsive-2-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
              <RoofTypeCard
                title={t('groendak_page.extensief_title')}
                price={t('groendak_page.extensief_price')}
                description={t('groendak_page.extensief_desc')}
                accentBar
                specs={[
                  { label: t('groendak_page.spec_dikte'), value: t('groendak_page.extensief_dikte') },
                  { label: t('groendak_page.spec_gewicht'), value: t('groendak_page.extensief_gewicht') },
                  { label: t('groendak_page.spec_onderhoud'), value: t('groendak_page.extensief_onderhoud') },
                  { label: t('groendak_page.spec_toegankelijk'), value: t('groendak_page.extensief_toegankelijk') },
                  { label: t('groendak_page.spec_beplanting'), value: t('groendak_page.extensief_beplanting') },
                ]}
              />
              <RoofTypeCard
                title={t('groendak_page.intensief_title')}
                price={t('groendak_page.intensief_price')}
                description={t('groendak_page.intensief_desc')}
                badge={t('groendak_page.intensief_badge')}
                specs={[
                  { label: t('groendak_page.spec_dikte'), value: t('groendak_page.intensief_dikte') },
                  { label: t('groendak_page.spec_gewicht'), value: t('groendak_page.intensief_gewicht') },
                  { label: t('groendak_page.spec_onderhoud'), value: t('groendak_page.intensief_onderhoud') },
                  { label: t('groendak_page.spec_toegankelijk'), value: t('groendak_page.intensief_toegankelijk') },
                  { label: t('groendak_page.spec_beplanting'), value: t('groendak_page.intensief_beplanting') },
                ]}
              />
            </div>
          </div>
        </section>

        <BenefitsSection
          title={t('groendak_page.benefits_title')}
          subtitle={t('groendak_page.benefits_subtitle')}
          benefits={[
            { icon: <TickCircle size={24} color="#FFFFFF" variant="Linear" />, title: t('groendak_page.benefit_1_title'), description: t('groendak_page.benefit_1_desc') },
            { icon: <Cloud size={24} color="#FFFFFF" variant="Linear" />, title: t('groendak_page.benefit_2_title'), description: t('groendak_page.benefit_2_desc') },
            { icon: <Heart size={24} color="#FFFFFF" variant="Linear" />, title: t('groendak_page.benefit_3_title'), description: t('groendak_page.benefit_3_desc') },
            { icon: <DollarCircle size={24} color="#FFFFFF" variant="Linear" />, title: t('groendak_page.benefit_4_title'), description: t('groendak_page.benefit_4_desc') },
          ]}
        />

        <FaqSection
          title={t('groendak_page.faq_title')}
          faqs={localeFaqs}
        />

        <LeadFormSection
          title={t('groendak_page.lead_title')}
          subtitle={t('groendak_page.lead_subtitle')}
          locale={validLocale}
          backgroundColor="#EDE9E0"
          formBackgroundColor="#FFFFFF"
          translations={translations}
        />
      </main>

      {/* Related Articles */}
      <RelatedArticles articles={localeArticles} title={t('groendak_page.related_articles_title')} />
    </>
  );
}
