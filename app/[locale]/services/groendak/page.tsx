import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../components/RelatedArticles';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData';

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

const faqs = [
  {
    question: "Wat kost een groendak aanleggen in Friesland?",
    answer: "Groendaken kosten gemiddeld €85-150 per m², afhankelijk van het type (extensief vs intensief), toegankelijkheid en gewenste plantenkeuze. Subsidies kunnen beschikbaar zijn."
  },
  {
    question: "Wat is het verschil tussen extensief en intensief groendak?",
    answer: "Extensieve groendaken hebben een dunne substraatlaag (2-15cm) met lage planten en weinig onderhoud. Intensieve groendaken zijn dikker (15-100cm+) en geschikt voor grotere planten, bomen en toegankelijkheid."
  },
  {
    question: "Is mijn dak geschikt voor een groendak?",
    answer: "De meeste platte of licht hellende daken zijn geschikt, maar we controleren altijd de draagkracht, waterafvoer en isolatie. Een dakconstructie-onderzoek is onderdeel van ons proces."
  },
  {
    question: "Hoeveel onderhoud heeft een groendak nodig?",
    answer: "Extensieve groendaken vereisen minimaal onderhoud (1-2x per jaar). Intensieve groendaken hebben meer zorg nodig, vergelijkbaar met een gewone tuin."
  },
  {
    question: "Welke subsidies zijn er beschikbaar voor groendaken?",
    answer: "Verschillende gemeenten en provincies bieden subsidies voor groendaken. Wij helpen u bij het aanvragen van beschikbare subsidies en regelingen."
  },
  {
    question: "Hoe belangrijk is waterafvoer bij groendaken?",
    answer: "Cruciale. Een goed drainagesysteem voorkomt wateroverlast en beschermt uw dak. Wij ontwerpen altijd een professioneel drainagesysteem als onderdeel van het groendak."
  }
];

// Sample related articles data
const relatedArticles = [
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
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Groendaken Friesland | Sedum Dak Specialist | Hovenier.frl',
      description: 'Professionele groendaken in Friesland. Extensief en intensief groendak aanleg door specialisten. Vanaf €85/m². Subsidie-advies inbegrepen.',
      keywords: ['groendak', 'sedum dak', 'extensief groendak', 'intensief groendak', 'friesland', 'subsidie'],
    };
  } catch (error) {
    return {
      title: 'Groendaken - Hovenier.frl',
      description: 'Professionele groendak diensten in Friesland.'
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
    { label: 'Diensten', href: '/services' },
    { label: 'Groendaken' }
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
    form_note: t('form_note')
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
                    alt="Professioneel groendak aangelegd in Friesland"
                    className="service-hero-image-photo"
                  />
                </div>
                <div className="service-hero-text">
                  <h1 className="service-hero-title">Groendaken in Friesland</h1>
                  <p className="service-hero-description">
                    Duurzame groendaken die uw leefomgeving verbeteren. Van extensieve sedum daken tot intensieve 
                    daktuin - onze specialisten zorgen voor vakkundige aanleg met alle benodigde certificaten.
                  </p>
                  <div className="service-hero-stats">
                    <div className="service-stat">
                      <span className="service-stat-number">€85+</span>
                      <span className="service-stat-label">per m²</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">25jr</span>
                      <span className="service-stat-label">garantie</span>
                    </div>
                    <div className="service-stat">
                      <span className="service-stat-number">12</span>
                      <span className="service-stat-label">specialisten</span>
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
              <h2 className="section-title">Twee hoofdtypes groendaken</h2>
              <p className="section-sub">Welk groendak past het beste bij uw situatie?</p>
            </div>
            
            <div className="greenroof-types">
              <div className="greenroof-type-card">
                <div className="greenroof-type-header">
                  <h3 className="greenroof-type-title">Extensief groendak</h3>
                  <p className="greenroof-type-price">€85-110 per m²</p>
                </div>
                <div className="greenroof-type-content">
                  <p className="greenroof-type-description">
                    Lichte, onderhoudsarme oplossing met sedum en grassen. Perfect voor berging, garages en bedrijfspanden.
                  </p>
                  <ul className="greenroof-type-features">
                    <li>Substraatdikte: 2-15 cm</li>
                    <li>Gewicht: 60-150 kg/m²</li>
                    <li>Onderhoud: 1-2x per jaar</li>
                    <li>Niet toegankelijk voor personen</li>
                    <li>Sedum, grassen, kruiden</li>
                  </ul>
                </div>
              </div>
              
              <div className="greenroof-type-card greenroof-type-card-popular">
                <div className="greenroof-type-popular">Populair</div>
                <div className="greenroof-type-header">
                  <h3 className="greenroof-type-title">Intensief groendak</h3>
                  <p className="greenroof-type-price">€120-200 per m²</p>
                </div>
                <div className="greenroof-type-content">
                  <p className="greenroof-type-description">
                    Volwaardige daktuin die toegankelijk is. Geschikt voor terrassen, tuinen en recreatieve ruimtes.
                  </p>
                  <ul className="greenroof-type-features">
                    <li>Substraatdikte: 15-100+ cm</li>
                    <li>Gewicht: 150-500+ kg/m²</li>
                    <li>Onderhoud: reguliere tuinverzorging</li>
                    <li>Toegankelijk en bewandelbaar</li>
                    <li>Struiken, bomen, gazon mogelijk</li>
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
              <h2 className="section-title">Voordelen van groendaken</h2>
              <p className="section-sub">Waarom kiezen steeds meer mensen voor een groendak?</p>
            </div>
            
            <div className="service-features-grid">
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Betere isolatie</h3>
                <p className="service-feature-description">
                  Tot 30% minder energiekosten door natuurlijke isolatie zomer en winter.
                </p>
              </div>
              
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Waterberging</h3>
                <p className="service-feature-description">
                  Vermindert afvalwater en voorkomt wateroverlast bij hevige regenval.
                </p>
              </div>
              
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Biodiversiteit</h3>
                <p className="service-feature-description">
                  Leefruimte voor insecten, vogels en ondersteunt de lokale ecosystemen.
                </p>
              </div>
              
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="service-feature-title">Waardevermeerdering</h3>
                <p className="service-feature-description">
                  Verhoogt de waarde van uw eigendom en verbetert het WOZ-gehalte.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section section-alt">
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
        <section className="section">
          <div className="section-inner">
            <div className="service-form-container">
              <div className="service-form-header">
                <h2 className="section-title section-title-centered">Vraag een groendak offerte aan</h2>
                <p className="section-sub section-sub-centered">
                  Ontvang binnen 24 uur reacties van groendak specialisten inclusief subsidie-advies
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
      <RelatedArticles articles={relatedArticles} title="Gerelateerde artikelen over groendaken" />

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
            "name": "Groendaken",
            "description": "Professionele groendak aanleg in Friesland door gecertificeerde specialisten",
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
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl/services/groendak`
        }))}
      />

      {/* Local Business Schema for Green Roof Services */}
      <LocalBusinessSchema
        name="Groendak Specialisten Friesland - Hovenier.frl"
        description="Professionele groendak installatie in Friesland. Extensief en intensief groendak aanleg door specialisten."
        url="https://hovenier.frl/services/groendak"
        services={["Extensieve groendaken", "Intensieve groendaken", "Sedum daken", "Daktuin aanleg", "Waterafvoer systemen"]}
        priceRange="€85-200"
      />
    </>
  );
}
