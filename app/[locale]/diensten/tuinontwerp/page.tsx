import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Breadcrumbs from '../../../components/Breadcrumbs';
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles, { type Article } from '../../../components/RelatedArticles';
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
    const isEn = validLocale === 'en';

    return {
      title: isEn
        ? 'Garden Design Friesland | Professional Landscape Architect | Hovenier.frl'
        : 'Tuinontwerp Friesland | Professionele Landschapsarchitect | Hovenier.frl',
      description: isEn
        ? 'Professional garden designs in Friesland. 3D visualization, plant selection and complete realization. From €750. Request a free quote.'
        : 'Professionele tuinontwerpen in Friesland. 3D visualisatie, plantenkeuze en complete realisatie. Vanaf €750. Vraag gratis offerte.',
      keywords: isEn
        ? ['garden design', 'landscape architect', 'garden architect', 'friesland', '3d visualization']
        : ['tuinontwerp', 'landschapsarchitect', 'tuinarchitect', 'friesland', '3d visualisatie'],
      alternates: getLocaleAlternates('/diensten/tuinontwerp', validLocale as SupportedLocale),
    };
  } catch {
    return {
      title: 'Tuinontwerp - Hovenier.frl',
      description: 'Professional garden design services in Friesland.'
    };
  }
}

export default async function TuinontwerpPage({ params }: Props) {
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
  const rawFaqs = t.raw('faqs.tuinontwerp');
  const rawArticles = t.raw('related_articles.tuinontwerp');
  const localeFaqs: FaqItem[] = Array.isArray(rawFaqs) ? rawFaqs.filter(isFaqItem) : [];
  const localeArticles: Article[] = Array.isArray(rawArticles) ? rawArticles.filter(isRelatedArticle) : [];

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
    { label: validLocale === 'nl' ? 'Tuinontwerp' : 'Garden Design' }
  ];

  return (
    <>
      <LocalBusinessSchema
        serviceType="tuinontwerp"
        url={`https://hovenier.frl${localizePath('/diensten/tuinontwerp', validLocale as SupportedLocale)}`}
      />

      <BreadcrumbSchema
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl${localizePath('/diensten/tuinontwerp', validLocale as SupportedLocale)}`
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a4 4 0 01-4-4z" />
                    </svg>
                  </div>
                </div>
                <div className="service-hero-text">
                  <h1 className="service-hero-title">{isEn ? 'Garden Design in Friesland' : 'Tuinontwerp in Friesland'}</h1>
                  <p className="service-hero-description">
                    {isEn
                      ? 'From concept sketch to 3D visualization — our garden architects design your dream garden. Unique designs that perfectly match your wishes, lifestyle and the Frisian surroundings.'
                      : 'Van conceptschets tot 3D visualisatie - onze tuinarchitecten ontwerpen uw droomtuin. Unieke ontwerpen die perfect passen bij uw wensen, levensstijl en de Friese omgeving.'}
                  </p>
                  <div className="service-hero-stats">
                    <div className="service-stat">
                      <span className="service-stat-number">€750+</span>
                      <span className="service-stat-label">{isEn ? 'starting price' : 'vanaf prijs'}</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">3D</span>
                      <span className="service-stat-label">{isEn ? 'visualization' : 'visualisatie'}</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">15+</span>
                      <span className="service-stat-label">{isEn ? 'designers' : 'ontwerpers'}</span>
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
              <h2 className="section-title">{isEn ? 'From idea to dream garden' : 'Van idee tot droomtuin'}</h2>
              <p className="section-sub">{isEn ? 'Our complete design process in 4 steps' : 'Ons complete ontwerpproces in 4 stappen'}</p>
            </div>

            <div className="service-features-grid">
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? '1. Intake meeting & site visit' : '1. Intakegesprek & locatiebezoek'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Introduction, inventory of wishes and on-site review of possibilities.' : 'Kennismaking, wensen inventariseren en ter plaatse de mogelijkheden bekijken.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? '2. Concept design & sketches' : '2. Conceptontwerp & schetsen'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Initial sketches and concepts based on your wishes and site characteristics.' : 'Eerste schetsen en concepten op basis van uw wensen en de locatie-eigenschappen.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? '3. 3D visualization & plant selection' : '3. 3D visualisatie & plantenkeuze'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Realistic 3D images of your new garden plus detailed plant selection.' : 'Realistische 3D beelden van uw nieuwe tuin plus gedetailleerde plantenselectie.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? '4. Final design & realization' : '4. Definitief ontwerp & realisatie'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Technical drawings and guidance during construction by our partner gardener.' : 'Technische tekeningen en begeleiding bij de aanleg door onze partner hovenier.'}
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
              {localeFaqs.map((faq, index: number) => (
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
                <h2 className="section-title section-title-centered">{isEn ? 'Request a garden design' : 'Vraag een tuinontwerp aan'}</h2>
                <p className="section-sub section-sub-centered">
                  {isEn ? 'Receive responses from experienced garden architects in your municipality within 24 hours' : 'Ontvang binnen 24 uur reacties van ervaren tuinarchitecten in uw gemeente'}
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
      <RelatedArticles articles={localeArticles} title={isEn ? 'Related articles about garden design' : 'Gerelateerde artikelen over tuinontwerp'} />

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
            "name": isEn ? "Garden Design" : "Tuinontwerp",
            "description": isEn ? "Professional garden design services in Friesland by certified garden architects" : "Professionele tuinontwerp diensten in Friesland door gecertificeerde tuinarchitecten",
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
              "price": "750",
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "750",
                "priceCurrency": "EUR",
                "unitText": "per project"
              }
            }
          }),
        }}
      />
    </>
  );
}
