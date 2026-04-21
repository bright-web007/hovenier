import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Breadcrumbs from '../../../components/Breadcrumbs';
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../components/RelatedArticles';
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData';
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/lib/translator';

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
    const isEn = validLocale === 'en';

    return {
      title: isEn
        ? 'Garden Maintenance Friesland | Professional & Reliable | Hovenier.frl'
        : 'Tuinonderhoud Friesland | Professioneel & Betrouwbaar | Hovenier.frl',
      description: isEn
        ? 'Professional garden maintenance in Friesland by certified gardeners. Monthly subscriptions or one-time jobs. From €35/hour — request a free quote.'
        : 'Professioneel tuinonderhoud in Friesland door gecertificeerde hoveniers. Maandelijkse abonnementen of eenmalige klussen. Vanaf €35/uur — gratis offerte aanvragen.',
      keywords: isEn
        ? ['garden maintenance', 'garden maintenance friesland', 'garden maintenance subscription', 'garden maintenance businesses', 'garden maintenance private']
        : ['tuinonderhoud', 'tuinonderhoud friesland', 'tuinonderhoud abonnement', 'abonnement tuinonderhoud', 'tuinonderhoud bedrijven', 'tuinonderhoud particulier'],
      alternates: getLocaleAlternates('/diensten/tuinonderhoud', validLocale as SupportedLocale),
    };
  } catch {
    return {
      title: 'Tuinonderhoud - Hovenier.frl',
      description: 'Professional garden maintenance services in Friesland.'
    };
  }
}

export default async function TuinonderhoudPage({ params }: Props) {
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
  const localeFaqs = (t.raw('faqs.tuinonderhoud') || []) as Array<{ question: string; answer: string }>;
  const localeArticles = (t.raw('related_articles.tuinonderhoud') || []) as Array<{ id: string; title: string; excerpt: string; slug: string; category: string; readTime: number; publishedAt: string }>;

  // Navigation translations
  const navTranslations = {
    gardeners: t('gardeners'),
    services: t('services'),
    regions: t('regions'),
    inspiration: t('inspiration'),
    request_quote: t('request_quote')
  };

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

  // Breadcrumb items
  const breadcrumbItems = [
    { label: validLocale === 'nl' ? 'Home' : 'Home', href: '/' },
    { label: validLocale === 'nl' ? 'Diensten' : 'Services', href: localizePath('/diensten', validLocale as SupportedLocale) },
    { label: validLocale === 'nl' ? 'Tuinonderhoud' : 'Garden Maintenance' }
  ];

  return (
    <>
      <LocalBusinessSchema
        serviceType="tuinonderhoud"
        url={`https://hovenier.frl${localizePath('/diensten/tuinonderhoud', validLocale as SupportedLocale)}`}
      />

      <BreadcrumbSchema
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl${localizePath('/diensten/tuinonderhoud', validLocale as SupportedLocale)}`
        }))}
      />

      <Navigation locale={validLocale} translations={navTranslations} />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        {/* Hero Section */}
        <section className="section">
          <div className="section-inner">
            <div className="service-hero">
              <div className="service-hero-content">
                <div className="service-hero-image">
                  <div className="service-hero-image-placeholder">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="service-hero-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div className="service-hero-text">
                  <h1 className="service-hero-title">{isEn ? 'Garden Maintenance in Friesland' : 'Tuinonderhoud in Friesland'}</h1>
                  <p className="service-hero-description">
                    {isEn
                      ? 'Professional garden maintenance by experienced gardeners. From weekly lawn mowing to seasonal maintenance — we ensure your garden looks beautiful all year round.'
                      : 'Professioneel tuinonderhoud door ervaren hoveniers. Van wekelijks gras maaien tot seizoensonderhoud - wij zorgen ervoor dat uw tuin er het hele jaar door prachtig uitziet.'}
                  </p>
                  <div className="service-hero-stats">
                    <div className="service-stat">
                      <span className="service-stat-number">€35+</span>
                      <span className="service-stat-label">{isEn ? 'per hour' : 'per uur'}</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">28</span>
                      <span className="service-stat-label">{isEn ? 'gardeners' : 'hoveniers'}</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">4.8★</span>
                      <span className="service-stat-label">{isEn ? 'average' : 'gemiddeld'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">{isEn ? 'What we do for you' : 'Wat wij voor u doen'}</h2>
              <p className="section-sub">{isEn ? 'Complete garden care by skilled gardeners' : 'Complete tuinverzorging door vakkundige hoveniers'}</p>
            </div>

            <div className="service-features-grid">
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Lawn mowing & care' : 'Gras maaien & verzorging'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Regular mowing, edging and lawn care for a perfect green carpet.' : 'Regelmatig maaien, randjes steken en gazonverzorging voor een perfect groen tapijt.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a4 4 0 01-4-4z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Pruning & shaping' : 'Snoeien & vormgeven'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Professional pruning of trees, shrubs and hedges according to seasonal guidelines.' : 'Professioneel snoeien van bomen, struiken en hagen volgens seizoensrichtlijnen.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Weed control' : 'Onkruidbestrijding'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Effective and eco-friendly weed control for borders and lawns.' : 'Effectieve en milieuvriendelijke onkruidbestrijding voor borders en gazons.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Seasonal maintenance' : 'Seizoensonderhoud'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Leaf raking, winterizing, spring treatments and seasonal planting.' : 'Bladeren harken, winterklaar maken, voorjaarsbeurten en seizoensbeplanting.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">{isEn ? 'Frequently asked questions' : 'Veelgestelde vragen'}</h2>
            </div>

            <div className="faq-grid">
              {localeFaqs.map((faq: { question: string; answer: string }, index: number) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="service-form-container">
              <div className="service-form-header">
                <h2 className="section-title section-title-centered">{isEn ? 'Request a quote' : 'Vraag een offerte aan'}</h2>
                <p className="section-sub section-sub-centered">
                  {isEn ? 'Receive responses from experienced gardeners in your municipality within 24 hours' : 'Ontvang binnen 24 uur reacties van ervaren hoveniers in uw gemeente'}
                </p>
              </div>
              <div className="service-form-content">
                <NewLeadForm translations={translations} locale={validLocale} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Related Articles */}
      <RelatedArticles articles={localeArticles} title={isEn ? 'Related articles about garden maintenance' : 'Gerelateerde artikelen over tuinonderhoud'} />

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
            "name": isEn ? "Garden Maintenance" : "Tuinonderhoud",
            "description": isEn ? "Professional garden maintenance services in Friesland by certified gardeners" : "Professionele tuinonderhoud diensten in Friesland door gecertificeerde hoveniers",
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
              "price": "35",
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "35",
                "priceCurrency": "EUR",
                "unitText": "per hour"
              }
            }
          }),
        }}
      />
    </>
  );
}
