import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../components/RelatedArticles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData';
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
      service_greenroof_title: "Groendaken in Friesland",
      service_greenroof_subtitle: "Duurzame groendaken door gecertificeerde specialisten",
      form_eyebrow: "Gratis & vrijblijvend",
      form_title: "Offerte groendak",
      form_subtitle: "Ontvang binnen 24 uur reacties van groendak specialisten in uw regio."
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

const faqs = {
  nl: [
    {
      question: "Wat kost een groendak?",
      answer: "Een extensief sedumdak kost €40–€60 per m², intensieve groendaken €80–€150 per m². Voor een gemiddeld groendak van 30 m² betaalt u €1.200–€1.800 inclusief aanleg."
    },
    {
      question: "Welke subsidie is er voor groendaken in Friesland?",
      answer: "Leeuwarden biedt tot €15 per m², Súdwest-Fryslân heeft klimaatadaptatie subsidie (bedrag varieert), en Smallingerland heeft incidentele subsidieronden. Uw hovenier helpt bij de aanvraag."
    },
    {
      question: "Wat is een extensief groendak?",
      answer: "Een extensief groendak is lichtgewicht, onderhoudsarm en geschikt voor de meeste hellende en platte daken. De begroeiing bestaat uit sedum, mossen en kruiden."
    },
    {
      question: "Kunnen groendaken gecombineerd worden met zonnepanelen?",
      answer: "Ja — groendaken en zonnepanelen zijn een uitstekende combinatie. De begroeiing houdt de panelen koeler, wat de stroomopbrengst verhoogt."
    },
    {
      question: "Is mijn dak geschikt voor een groendak?",
      answer: "De meeste platte of licht hellende daken zijn geschikt, maar we controleren altijd de draagkracht, waterafvoer en isolatie. Een dakconstructie-onderzoek is onderdeel van ons proces."
    },
    {
      question: "Hoeveel onderhoud heeft een groendak nodig?",
      answer: "Extensieve groendaken vereisen minimaal onderhoud (1-2x per jaar). Intensieve groendaken hebben meer zorg nodig, vergelijkbaar met een gewone tuin."
    }
  ],
  en: [
    {
      question: "What does a green roof cost?",
      answer: "An extensive sedum roof costs €40–€60 per m², intensive green roofs €80–€150 per m². For an average green roof of 30 m² you pay €1,200–€1,800 including installation."
    },
    {
      question: "What subsidies are available for green roofs in Friesland?",
      answer: "Leeuwarden offers up to €15 per m², Súdwest-Fryslân has a climate adaptation subsidy (amount varies), and Smallingerland has occasional subsidy rounds. Your gardener helps with the application."
    },
    {
      question: "What is an extensive green roof?",
      answer: "An extensive green roof is lightweight, low-maintenance and suitable for most sloped and flat roofs. The vegetation consists of sedum, mosses and herbs."
    },
    {
      question: "Can green roofs be combined with solar panels?",
      answer: "Yes — green roofs and solar panels are an excellent combination. The vegetation keeps the panels cooler, which increases electricity yield."
    },
    {
      question: "Is my roof suitable for a green roof?",
      answer: "Most flat or slightly sloped roofs are suitable, but we always check the load-bearing capacity, drainage and insulation. A roof structure assessment is part of our process."
    },
    {
      question: "How much maintenance does a green roof need?",
      answer: "Extensive green roofs require minimal maintenance (1-2x per year). Intensive green roofs need more care, comparable to a regular garden."
    }
  ]
};

// Sample related articles data
const relatedArticles = {
  nl: [
    {
      id: "1",
      title: "Groendaken en subsidies in Nederland 2024",
      excerpt: "Overzicht van beschikbare subsidies en regelingen voor groendaken in uw gemeente.",
      slug: "groendak-subsidies-2024",
      category: "Subsidies",
      readTime: 6,
      publishedAt: "2024-03-20",
    },
    {
      id: "2",
      title: "Sedum groendaken: voordelen en nadelen",
      excerpt: "Alles over sedum planten voor uw groendak en waarom ze zo populair zijn.",
      slug: "sedum-groendaken-voordelen",
      category: "Groendaken",
      readTime: 5,
      publishedAt: "2024-03-15",
    },
    {
      id: "3",
      title: "Intensief vs extensief groendak: wat past bij u?",
      excerpt: "Welk type groendak past het beste bij uw wensen, budget en onderhoudsmogelijkheden.",
      slug: "intensief-extensief-groendak-vergelijking",
      category: "Groendaken",
      readTime: 8,
      publishedAt: "2024-03-10",
    }
  ],
  en: [
    {
      id: "1",
      title: "Green roofs and subsidies in the Netherlands 2024",
      excerpt: "Overview of available subsidies and regulations for green roofs in your municipality.",
      slug: "groendak-subsidies-2024",
      category: "Subsidies",
      readTime: 6,
      publishedAt: "2024-03-20",
    },
    {
      id: "2",
      title: "Sedum green roofs: advantages and disadvantages",
      excerpt: "Everything about sedum plants for your green roof and why they are so popular.",
      slug: "sedum-groendaken-voordelen",
      category: "Green Roofs",
      readTime: 5,
      publishedAt: "2024-03-15",
    },
    {
      id: "3",
      title: "Intensive vs extensive green roof: which suits you?",
      excerpt: "Which type of green roof best fits your wishes, budget and maintenance capabilities.",
      slug: "intensief-extensief-groendak-vergelijking",
      category: "Green Roofs",
      readTime: 8,
      publishedAt: "2024-03-10",
    }
  ]
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const isEn = validLocale === 'en';

    return {
      title: isEn
        ? 'Green Roof Installation Friesland | Sedum & Extensive Green Roof | Hovenier.frl'
        : 'Groendak Aanleggen Friesland | Sedum & Extensief Groendak | Hovenier.frl',
      description: isEn
        ? 'Professional green roofs in Friesland. Extensive sedum roof or intensive green roof — including subsidy advice. From €40/m² — request a free quote from a specialist.'
        : 'Professionele groendaken in Friesland. Extensief sedumdak of intensief groendak — inclusief subsidie-advies. Vanaf €40/m² — vraag gratis offerte aan bij een specialist.',
      keywords: isEn
        ? ['green roof', 'green roof installation', 'extensive green roof', 'green roof subsidy', 'green roof solar panels', 'green roof friesland', 'sedum roof']
        : ['groendak', 'groendak aanleggen', 'extensief groendak', 'groendak subsidie', 'subsidie groendak', 'groendak met zonnepanelen', 'groendak friesland', 'sedumdak'],
      alternates: getLocaleAlternates('/diensten/groendak', validLocale as SupportedLocale),
    };
  } catch (error) {
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
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const t = createTranslator(validLocale);
  const isEn = validLocale === 'en';
  const localeFaqs = faqs[isEn ? 'en' : 'nl'];
  const localeArticles = relatedArticles[isEn ? 'en' : 'nl'];

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
    { label: 'Home', href: '/' },
    { label: isEn ? 'Services' : 'Diensten', href: localizePath('/services', validLocale as SupportedLocale) },
    { label: isEn ? 'Green Roofs' : 'Groendaken' }
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
      <Navigation locale={validLocale} translations={navTranslations} />
      <Breadcrumbs items={breadcrumbItems} />

      <main>
        {/* Hero Section */}
        <section className="section">
          <div className="section-inner">
            <div className="service-hero">
              <div className="service-hero-content">
                <div className="service-hero-image">
                  <img
                    src="/images/green-roof.png"
                    alt={isEn ? "Professional green roof installed in Friesland" : "Professioneel groendak aangelegd in Friesland"}
                    className="service-hero-image-photo"
                  />
                </div>
                <div className="service-hero-text">
                  <h1 className="service-hero-title">{isEn ? 'Green Roofs in Friesland' : 'Groendaken in Friesland'}</h1>
                  <p className="service-hero-description">
                    {isEn
                      ? 'Sustainable green roofs that improve your living environment. From extensive sedum roofs to intensive roof gardens — our specialists ensure expert installation with all required certifications.'
                      : 'Duurzame groendaken die uw leefomgeving verbeteren. Van extensieve sedum daken tot intensieve daktuin - onze specialisten zorgen voor vakkundige aanleg met alle benodigde certificaten.'}
                  </p>
                  <div className="service-hero-stats">
                    <div className="service-stat">
                      <span className="service-stat-number">€85+</span>
                      <span className="service-stat-label">{isEn ? 'per m²' : 'per m²'}</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">{isEn ? '25yr' : '25jr'}</span>
                      <span className="service-stat-label">{isEn ? 'warranty' : 'garantie'}</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">12</span>
                      <span className="service-stat-label">{isEn ? 'specialists' : 'specialisten'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Green Roofs */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">{isEn ? 'Two main types of green roofs' : 'Twee hoofdtypes groendaken'}</h2>
              <p className="section-sub">{isEn ? 'Which green roof suits your situation best?' : 'Welk groendak past het beste bij uw situatie?'}</p>
            </div>

            <div className="greenroof-types">
              <div className="greenroof-type-card">
                <div className="greenroof-type-header">
                  <h3 className="greenroof-type-title">{isEn ? 'Extensive green roof' : 'Extensief groendak'}</h3>
                  <p className="greenroof-type-price">€85-110 {isEn ? 'per m²' : 'per m²'}</p>
                </div>
                <div className="greenroof-type-content">
                  <p className="greenroof-type-description">
                    {isEn ? 'Light, low-maintenance solution with sedum and grasses. Perfect for sheds, garages and commercial buildings.' : 'Lichte, onderhoudsarme oplossing met sedum en grassen. Perfect voor berging, garages en bedrijfspanden.'}
                  </p>
                  <ul className="greenroof-type-features">
                    <li>{isEn ? 'Substrate depth: 2-15 cm' : 'Substraatdikte: 2-15 cm'}</li>
                    <li>{isEn ? 'Weight: 60-150 kg/m²' : 'Gewicht: 60-150 kg/m²'}</li>
                    <li>{isEn ? 'Maintenance: 1-2x per year' : 'Onderhoud: 1-2x per jaar'}</li>
                    <li>{isEn ? 'Not accessible for people' : 'Niet toegankelijk voor personen'}</li>
                    <li>{isEn ? 'Sedum, grasses, herbs' : 'Sedum, grassen, kruiden'}</li>
                  </ul>
                </div>
              </div>

              <div className="greenroof-type-card greenroof-type-card-popular">
                <div className="greenroof-type-popular">{isEn ? 'Popular' : 'Populair'}</div>
                <div className="greenroof-type-header">
                  <h3 className="greenroof-type-title">{isEn ? 'Intensive green roof' : 'Intensief groendak'}</h3>
                  <p className="greenroof-type-price">€120-200 {isEn ? 'per m²' : 'per m²'}</p>
                </div>
                <div className="greenroof-type-content">
                  <p className="greenroof-type-description">
                    {isEn ? 'Full-fledged roof garden that is accessible. Suitable for terraces, gardens and recreational spaces.' : 'Volwaardige daktuin die toegankelijk is. Geschikt voor terrassen, tuinen en recreatieve ruimtes.'}
                  </p>
                  <ul className="greenroof-type-features">
                    <li>{isEn ? 'Substrate depth: 15-100+ cm' : 'Substraatdikte: 15-100+ cm'}</li>
                    <li>{isEn ? 'Weight: 150-500+ kg/m²' : 'Gewicht: 150-500+ kg/m²'}</li>
                    <li>{isEn ? 'Maintenance: regular garden care' : 'Onderhoud: reguliere tuinverzorging'}</li>
                    <li>{isEn ? 'Accessible and walkable' : 'Toegankelijk en bewandelbaar'}</li>
                    <li>{isEn ? 'Shrubs, trees, lawn possible' : 'Struiken, bomen, gazon mogelijk'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">{isEn ? 'Benefits of green roofs' : 'Voordelen van groendaken'}</h2>
              <p className="section-sub">{isEn ? 'Why are more and more people choosing a green roof?' : 'Waarom kiezen steeds meer mensen voor een groendak?'}</p>
            </div>

            <div className="service-features-grid">
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Better insulation' : 'Betere isolatie'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Up to 30% less energy costs through natural insulation in summer and winter.' : 'Tot 30% minder energiekosten door natuurlijke isolatie zomer en winter.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Water retention' : 'Waterberging'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Reduces wastewater and prevents flooding during heavy rainfall.' : 'Vermindert afvalwater en voorkomt wateroverlast bij hevige regenval.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Biodiversity' : 'Biodiversiteit'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Habitat for insects, birds and supports local ecosystems.' : 'Leefruimte voor insecten, vogels en ondersteunt de lokale ecosystemen.'}
                </p>
              </div>

              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="service-feature-title">{isEn ? 'Value increase' : 'Waardevermeerdering'}</h3>
                <p className="service-feature-description">
                  {isEn ? 'Increases the value of your property and improves its assessment.' : 'Verhoogt de waarde van uw eigendom en verbetert het WOZ-gehalte.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">{isEn ? 'Frequently asked questions' : 'Veelgestelde vragen'}</h2>
            </div>

            <div className="faq-grid">
              {localeFaqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section className="section">
          <div className="section-inner">
            <div className="service-form-container">
              <div className="service-form-header">
                <h2 className="section-title section-title-centered">{isEn ? 'Request a green roof quote' : 'Vraag een groendak offerte aan'}</h2>
                <p className="section-sub section-sub-centered">
                  {isEn ? 'Receive responses from green roof specialists including subsidy advice within 24 hours' : 'Ontvang binnen 24 uur reacties van groendak specialisten inclusief subsidie-advies'}
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
      <RelatedArticles articles={localeArticles} title={isEn ? 'Related articles about green roofs' : 'Gerelateerde artikelen over groendaken'} />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": localeFaqs.map(faq => ({
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
    </>
  );
}
