import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import RelatedArticles from '../../../components/RelatedArticles';
import { LocalBusinessSchema, BreadcrumbSchema, ServicePageSchema } from '../../../components/StructuredData';
import { getLocaleAlternates, getAbsoluteUrl, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'
import Image from 'next/image';
import BenefitsSection from '@/app/components/BenefitsSection';
import FaqSection from '@/app/components/FaqSection';
import LeadFormSection from '@/app/components/LeadFormSection';
import { Award, Drop, Designtools, Home } from 'iconsax-reactjs';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

// ISR: Never revalidate (static service content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  const t = createTranslator(validLocale);

  return {
    title: t('stratenmaker.meta_title'),
    description: t('stratenmaker.meta_description'),
    keywords: t('stratenmaker.meta_keywords'),
    alternates: getLocaleAlternates('/diensten/stratenmaker', validLocale as SupportedLocale),
  }
}

export default async function StratenmakerPage({ params }: Props) {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  setRequestLocale(validLocale);

  const t = createTranslator(validLocale);
  const localeFaqs = (t.raw('faqs.stratenmaker') || []) as Array<{ question: string; answer: string }>;
  const localeArticles = (t.raw('related_articles.stratenmaker') || []) as Array<{ id: string; title: string; excerpt: string; slug: string; category: string; readTime: number; publishedAt: string }>;

  // Simple translations for the form
  const formTranslations = {
    form_eyebrow: t('form_eyebrow') || "Gratis Offerte",
    form_title: t('form_title') || "Vraag direct een offerte aan",
    form_subtitle: t('form_subtitle') || "Ontvang binnen 24 uur contact van lokale stratenmakers",
    your_name: t('your_name') || "Uw naam",
    municipality: t('municipality') || "Gemeente",
    service: t('service') || "Gewenste dienst",
    phone_number: t('phone_number') || "Telefoonnummer",
    send_request: t('send_request') || "Verstuur aanvraag",
    form_note: t('form_note') || "Door het versturen van dit formulier gaat u akkoord met onze voorwaarden.",
    select_municipality: t('form.select_municipality') || 'Selecteer gemeente',
    what_do_you_need: t('form.what_do_you_need') || 'Wat heeft u nodig?',
    your_company: t('form.your_company') || 'Uw bedrijf',
    loading: t('form.loading') || 'Versturen...',
    privacy_agreement: t('form.privacy_agreement') || 'Ik ga akkoord met het',
    privacy_link: t('form.privacy_link') || 'privacybeleid',
    privacy_consent: t('form.privacy_consent') || 'en geef toestemming voor het verwerken van mijn gegevens.',
    services: {
      tuinonderhoud: t('form.services.tuinonderhoud') || 'Tuinonderhoud',
      tuinontwerp: t('form.services.tuinontwerp') || 'Tuinontwerp',
      'tuin-aanleggen': t('form.services.tuin-aanleggen') || 'Tuin Aanleggen',
      stratenmaker: t('form.services.stratenmaker') || 'Bestrating',
      groendak: t('form.services.groendak') || 'Groendak',
      overig: t('form.services.overig') || 'Overig'
    }
  }

  // Breadcrumb items 
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: localizePath('/', validLocale as SupportedLocale) },
    { label: t('stratenmaker.breadcrumb_services'), href: localizePath('/diensten', validLocale as SupportedLocale) },
    { label: t('stratenmaker.breadcrumb_paver'), href: localizePath('/diensten/stratenmaker', validLocale as SupportedLocale) }
  ];

  return (
    <>
      <LocalBusinessSchema
        serviceType="stratenmaker"
        url={getAbsoluteUrl('/diensten/stratenmaker', validLocale as SupportedLocale)}
      />
      <ServicePageSchema
        serviceType="stratenmaker"
        url={getAbsoluteUrl('/diensten/stratenmaker', validLocale as SupportedLocale)}
        locale={validLocale}
      />

      <BreadcrumbSchema
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? getAbsoluteUrl(item.href, validLocale as SupportedLocale) : getAbsoluteUrl('/diensten/stratenmaker', validLocale as SupportedLocale)
        }))}
      />

      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        <section style={{ backgroundColor: '#2A3E20EB', width: '100%', position: 'relative' }}>
          <Image sizes="100vw" style={{ objectFit: 'cover' }} loading='eager' alt="Stratenmaker background image" src="/images/paving_bg.jpg" fill />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#2A3E20E5', zIndex: 10 }}></div>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '50.5px 1rem', display: 'flex', flexDirection: 'column', gap: '15.4px', position: 'relative', zIndex: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '22px', height: '.5px', backgroundColor: 'var(--sage)' }} />
              <span style={{ fontSize: '10px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--sage)' }}>
                {t('stratenmaker.hero_eyebrow')}
              </span>
            </div>
            <h1 style={{ color: '#F4F0E8', fontSize: '48px', fontWeight: 500, lineHeight: '51.84px', margin: 0 }}>
              {t('stratenmaker.hero_title')}
            </h1>
            <p style={{ borderLeft: '2px solid var(--sage)', padding: '16px 20px', backgroundColor: '#FFFFFF0F', color: '#C8DFC0', fontSize: '15px', lineHeight: '24.75px', fontWeight: 300, margin: 0 }}>
              {t('stratenmaker.hero_description')}
            </p>
          </div>
        </section>

        <BenefitsSection
          title={t('stratenmaker.process_title')}
          subtitle={t('stratenmaker.process_subtitle')}
          benefits={[
            { icon: <Award size={24} color="#FFFFFF" variant="Linear" />, title: t('stratenmaker.process_step1_title'), description: t('stratenmaker.process_step1_text') },
            { icon: <Drop size={24} color="#FFFFFF" variant="Linear" />, title: t('stratenmaker.process_step2_title'), description: t('stratenmaker.process_step2_text') },
            { icon: <Designtools size={24} color="#FFFFFF" variant="Linear" />, title: t('stratenmaker.process_step3_title'), description: t('stratenmaker.process_step3_text') },
            { icon: <Home size={24} color="#FFFFFF" variant="Linear" />, title: t('stratenmaker.process_step4_title'), description: t('stratenmaker.process_step4_text') },
          ]}
        />

        <FaqSection
          title={t('stratenmaker.faq_title')}
          faqs={localeFaqs}
        />

        <LeadFormSection
          title={t('stratenmaker.lead_title')}
          subtitle={t('stratenmaker.lead_description')}
          locale={validLocale}
          backgroundColor="#EDE9E0"
          formBackgroundColor="#FFFFFF"
          translations={formTranslations}
        />
      </main>

      <RelatedArticles articles={localeArticles} title={t('stratenmaker.related_title')} />
    </>
  )
}
