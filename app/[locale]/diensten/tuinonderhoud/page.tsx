import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import Breadcrumbs from '../../../components/Breadcrumbs';
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../components/RelatedArticles';
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';

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

// Simple translation function
function createTranslator(locale: string) {
  let messages: Record<string, any> = {};
  
  try {
    if (locale === 'nl') {
      messages = require(`../../../../locales/nl/common.json`);
    } else {
      messages = require(`../../../../locales/en/common.json`);
    }
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    // Fallback messages
    messages = {
      service_maintenance_title: "Tuinonderhoud in Friesland",
      service_maintenance_subtitle: "Professioneel tuinonderhoud door gecertificeerde hoveniers",
      form_eyebrow: "Gratis & vrijblijvend",
      form_title: "Offerte tuinonderhoud",
      form_subtitle: "Ontvang binnen 24 uur reacties van hoveniers in uw regio."
    };
  }
  
  return (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };
}

const faqs = [
  {
    question: "Wat kost tuinonderhoud in Friesland?",
    answer: "De kosten voor tuinonderhoud variëren tussen €35-50 per uur, afhankelijk van het type werkzaamheden en de grootte van uw tuin. Voor een gemiddelde tuin rekent u op €150-300 per bezoek."
  },
  {
    question: "Hoe vaak heeft mijn tuin onderhoud nodig?",
    answer: "Dit hangt af van het seizoen en type tuin. Gemiddeld adviseren we maandelijks onderhoud tijdens het groeiseizoen (maart-oktober) en minder frequent in de winter."
  },
  {
    question: "Welke werkzaamheden vallen onder tuinonderhoud?",
    answer: "Gras maaien, hagen knippen, onkruid wieden, bladeren harken, snoeien van bomen en struiken, en seizoensklussen zoals winterklaar maken."
  },
  {
    question: "Zijn jullie hoveniers verzekerd?",
    answer: "Ja, alle hoveniers in ons netwerk hebben een geldige AVB verzekering (aansprakelijkheidsverzekering voor bedrijven) en zijn waar nodig gecertificeerd."
  },
  {
    question: "Kan ik een vast onderhoudcontract afsluiten?",
    answer: "Absoluut! Veel van onze hoveniers bieden jaarcontracten met vaste tarieven. Dit zorgt voor optimale tuincondities en vaak betere prijzen."
  }
];

// Sample related articles data
const relatedArticles = [
  {
    id: "1",
    title: "Wanneer is het beste moment om uw gazon te maaien?",
    excerpt: "Ontdek de optimale timing voor gras maaien en tips voor een perfect resultaat.",
    slug: "wanneer-gazon-maaien",
    category: "Tuinonderhoud",
    readTime: 5,
    publishedAt: "2024-03-15",
  },
  {
    id: "2", 
    title: "Onkruid natuurlijk bestrijden zonder chemicaliën",
    excerpt: "Milieuvriendelijke methoden om onkruid effectief te verwijderen uit uw tuin.",
    slug: "onkruid-natuurlijk-bestrijden",
    category: "Tuintips",
    readTime: 7,
    publishedAt: "2024-03-10",
  },
  {
    id: "3",
    title: "Seizoenssnoei: wat, wanneer en hoe?",
    excerpt: "Complete gids voor het snoeien van bomen en struiken door het jaar heen.",
    slug: "seizoenssnoei-gids",
    category: "Snoeitechnieken", 
    readTime: 8,
    publishedAt: "2024-03-05",
  }
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Tuinonderhoud Friesland | Professionele Hovenier | Hovenier.frl',
      description: 'Betrouwbare tuinonderhoud in Friesland. Vakkundige hoveniers voor gras maaien, snoeien, onkruidbestrijding. Vanaf €35/uur. Vraag gratis offerte.',
      keywords: ['tuinonderhoud', 'hovenier friesland', 'gras maaien', 'snoeien', 'tuinverzorging'],
      alternates: getLocaleAlternates('/diensten/tuinonderhoud', validLocale as SupportedLocale),
    };
  } catch (error) {
    return {
      title: 'Tuinonderhoud - Hovenier.frl',
      description: 'Professionele tuinonderhoud diensten in Friesland.'
    };
  }
}

export default async function TuinonderhoudPage({ params }: Props) {
  let validLocale = defaultLocale;
  
  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const t = createTranslator(validLocale);

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
    form_note: t('form_note')
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: validLocale === 'nl' ? 'Home' : 'Home', href: '/' },
    { label: validLocale === 'nl' ? 'Diensten' : 'Services', href: localizePath('/services', validLocale as SupportedLocale) },
    { label: validLocale === 'nl' ? 'Tuinonderhoud' : 'Garden Maintenance' }
  ];

  return (
    <>
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
                  <h1 className="service-hero-title">Tuinonderhoud in Friesland</h1>
                  <p className="service-hero-description">
                    Professioneel tuinonderhoud door ervaren hoveniers. Van wekelijks gras maaien tot seizoensonderhoud - 
                    wij zorgen ervoor dat uw tuin er het hele jaar door prachtig uitziet.
                  </p>
                  <div className="service-hero-stats">
                    <div className="service-stat">
                      <span className="service-stat-number">€35+</span>
                      <span className="service-stat-label">per uur</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">28</span>
                      <span className="service-stat-label">hoveniers</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">4.8★</span>
                      <span className="service-stat-label">gemiddeld</span>
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
              <h2 className="section-title">Wat wij voor u doen</h2>
              <p className="section-sub">Complete tuinverzorging door vakkundige hoveniers</p>
            </div>
            
            <div className="service-features-grid">
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Gras maaien & verzorging</h3>
                <p className="service-feature-description">
                  Regelmatig maaien, randjes steken en gazonverzorging voor een perfect groen tapijt.
                </p>
              </div>
              
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a4 4 0 01-4-4z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Snoeien & vormgeven</h3>
                <p className="service-feature-description">
                  Professioneel snoeien van bomen, struiken en hagen volgens seizoensrichtlijnen.
                </p>
              </div>
              
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Onkruidbestrijding</h3>
                <p className="service-feature-description">
                  Effectieve en milieuvriendelijke onkruidbestrijding voor borders en gazons.
                </p>
              </div>
              
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Seizoensonderhoud</h3>
                <p className="service-feature-description">
                  Bladeren harken, winterklaar maken, voorjaarsbeurten en seizoensbeplanting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">Veelgestelde vragen</h2>
            </div>
            
            <div className="faq-grid">
              {faqs.map((faq, index) => (
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
                <h2 className="section-title section-title-centered">Vraag een offerte aan</h2>
                <p className="section-sub section-sub-centered">
                  Ontvang binnen 24 uur reacties van ervaren hoveniers in uw gemeente
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
      <RelatedArticles articles={relatedArticles} title="Gerelateerde artikelen over tuinonderhoud" />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            "name": "Tuinonderhoud",
            "description": "Professionele tuinonderhoud diensten in Friesland door gecertificeerde hoveniers",
            "provider": {
              "@type": "Organization",
              "name": "Hovenier.frl",
              "url": "https://hovenier.frl"
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
