import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '../../../components/Navigation';
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../components/RelatedArticles';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Municipality data with names and key information
const gemeenteMappings = {
  'leeuwarden': {
    name: 'Leeuwarden',
    displayName: 'Leeuwarden',
    population: '124.000',
    highlights: ['Culturele Hoofdstad 2018', 'Historisch centrum', 'Tuinen en parken'],
  },
  'sudwest-fryslan': {
    name: 'SûdWest-Fryslân',
    displayName: 'SûdWest-Fryslân',
    population: '89.000',
    highlights: ['Sneek en IJlst', 'Waterrijke gemeente', 'Binnensteden'],
  },
  'smallingerland': {
    name: 'Smallingerland',
    displayName: 'Smallingerland',
    population: '56.000',
    highlights: ['Drachten centrum', 'Bedrijventerreinen', 'Woonwijken'],
  },
  'heerenveen': {
    name: 'Heerenveen',
    displayName: 'Heerenveen',
    population: '50.000',
    highlights: ['Sportstad', 'Bosrijke omgeving', 'Nieuwbouwwijken'],
  },
  'achtkarspelen': {
    name: 'Achtkarspelen',
    displayName: 'Achtkarspelen',
    population: '28.000',
    highlights: ['Buitengebied', 'Agrarisch gebied', 'Landelijke tuinen'],
  },
  'tietjerksteradeel': {
    name: 'Tietjerksteradeel',
    displayName: 'Tietjerksteradeel',
    population: '43.000',
    highlights: ['Burgum centrum', 'Landelijke ligging', 'Natuurgebieden'],
  },
  'dantumadiel': {
    name: 'Dantumadiel',
    displayName: 'Dantumadiel', 
    population: '19.000',
    highlights: ['Damwâld', 'Agrarisch gebied', 'Landgoederen'],
  },
  'de-fryske-marren': {
    name: 'De Fryske Marren',
    displayName: 'De Fryske Marren',
    population: '51.000',
    highlights: ['Lemmer en Joure', 'Meren en waterrecreatie', 'Toeristische gebieden'],
  },
  'waadhoeke': {
    name: 'Waadhoeke',
    displayName: 'Waadhoeke',
    population: '46.000',
    highlights: ['Franeker historisch', 'Waddenzeekust', 'Terpenlandschap'],
  },
  'noardeast-fryslan': {
    name: 'Noardeast-Fryslân',
    displayName: 'Noardeast-Fryslân',
    population: '45.000',
    highlights: ['Dokkum vestingstad', 'Waddenzeekust', 'Historische dorpen'],
  },
  'harlingen': {
    name: 'Harlingen',
    displayName: 'Harlingen',
    population: '16.000',
    highlights: ['Historische haven', 'Waddenzeekust', 'Monumentale panden'],
  },
};

const gemeenten = Object.keys(gemeenteMappings);

export async function generateStaticParams() {
  return gemeenten.map(slug => ({ slug }));
}

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
    messages = {
      form_eyebrow: "Gratis & vrijblijvend",
      form_title: "Offerte aanvragen",
      form_subtitle: "Ontvang binnen 24 uur reacties van hoveniers in uw gemeente."
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale, slug } = await params;
    const validLocale = locale || defaultLocale;
    const gemeente = gemeenteMappings[slug as keyof typeof gemeenteMappings];
    
    if (!gemeente) {
      return {
        title: 'Gemeente niet gevonden - Hovenier.frl',
        description: 'De gevraagde gemeente pagina kon niet worden gevonden.'
      };
    }
    
    return {
      title: `Hovenier ${gemeente.displayName} | Tuinonderhoud & Tuinontwerp | Hovenier.frl`,
      description: `Professionele hoveniersdiensten in ${gemeente.displayName} ✓ Tuinonderhoud ✓ Tuinontwerp ✓ Groendaken ✓ Lokale specialisten ✓ Gratis offerte`,
      keywords: ['hovenier', gemeente.name.toLowerCase(), 'tuinonderhoud', 'tuinontwerp', 'friesland'],
    };
  } catch (error) {
    return {
      title: 'Gemeente - Hovenier.frl',
      description: 'Hoveniersdiensten in uw gemeente.'
    };
  }
}

export default async function GemeenteDetailPage({ params }: Props) {
  let validLocale = defaultLocale;
  let slug = '';
  
  try {
    const resolvedParams = await params;
    validLocale = resolvedParams.locale || defaultLocale;
    slug = resolvedParams.slug;
    
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
    
    if (!gemeenten.includes(slug)) {
      notFound();
    }
  } catch (error) {
    console.error('Error parsing params:', error);
    notFound();
  }

  const gemeente = gemeenteMappings[slug as keyof typeof gemeenteMappings];
  
  if (!gemeente) {
    notFound();
  }

  const t = createTranslator(validLocale);

  // Sample related articles specific to municipality
  const relatedArticles = [
    {
      id: "1",
      title: `Tuinonderhoud in ${gemeente.displayName}: jaarrond schema`,
      excerpt: `Maandelijks onderhoudsschema voor tuinen in ${gemeente.displayName} aangepast op het lokale klimaat.`,
      slug: `tuinonderhoud-${slug}-jaarrond`,
      category: "Onderhoud",
      readTime: 7,
      publishedAt: "2024-03-20",
    },
    {
      id: "2",
      title: `Populaire tuinplanten voor ${gemeente.displayName}`,
      excerpt: `Welke planten gedijen het best in de bodem en het klimaat van ${gemeente.displayName}?`,
      slug: `tuinplanten-${slug}`,
      category: "Planten",
      readTime: 5,
      publishedAt: "2024-03-15",
    },
    {
      id: "3",
      title: `Subsidies groendaken ${gemeente.displayName} 2024`,
      excerpt: `Actuele regelingen en subsidies voor groendaken beschikbaar in ${gemeente.displayName}.`,
      slug: `subsidies-groendaken-${slug}`,
      category: "Subsidies",
      readTime: 4,
      publishedAt: "2024-03-10",
    }
  ];

  // Location-specific FAQs
  const locationFaqs = [
    {
      question: `Wat kost een hovenier in ${gemeente.displayName}?`,
      answer: `Hoveniersdiensten in ${gemeente.displayName} kosten gemiddeld €35-50 per uur voor onderhoud, €85+ per m² voor groendaken en vanaf €750 voor een volledig tuinontwerp. Prijzen zijn afhankelijk van de gewenste diensten en toegankelijkheid.`
    },
    {
      question: `Welke hoveniers werken er in ${gemeente.displayName}?`,
      answer: `In ${gemeente.displayName} werken meerdere gecertificeerde hoveniers die aangesloten zijn bij ons netwerk. Alle aangesloten bedrijven hebben geldige certificaten en verzekeringen.`
    },
    {
      question: `Is er subsidie beschikbaar voor groendaken in ${gemeente.displayName}?`,
      answer: `${gemeente.displayName} biedt mogelijk subsidie voor duurzame tuinaanpassingen. Wij helpen u bij het aanvragen van beschikbare regelingen en provinciale subsidies.`
    },
    {
      question: `Hoe snel kan een hovenier langskomen in ${gemeente.displayName}?`,
      answer: `In ${gemeente.displayName} kunnen onze hoveniers meestal binnen 1-3 werkdagen voor een offerte langskomen. Voor spoedopdrachten (zoals stormschade) streven we naar dezelfde dag.`
    },
  ];

  // Service areas within the municipality  
  const serviceAreas = [
    'Tuinonderhoud jaar rond',
    'Tuinontwerp en -aanleg', 
    'Groendaken installatie',
    'Haag snoeien en vormgeven',
    'Boomverzorging',
    'Terras aanleg',
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
      <Navigation locale={validLocale} />
      
      <main>
        {/* Hero Section */}
        <section className="section">
          <div className="section-inner">
            <div className="gemeente-hero">
              <div className="gemeente-hero-content">
                <div className="gemeente-hero-badge">
                  <span className="gemeente-hero-badge-text">
                    ✓ {gemeente.population} inwoners ✓ Lokale specialisten
                  </span>
                </div>
                <h1 className="gemeente-hero-title">
                  Hovenier {gemeente.displayName}
                </h1>
                <p className="gemeente-hero-description">
                  Professionele hoveniersdiensten in {gemeente.displayName}. Van tuinonderhoud tot complete 
                  tuinontwerpprojecten - onze lokale specialisten zorgen voor uw groene buitenruimte.
                </p>
                <div className="gemeente-hero-highlights">
                  {gemeente.highlights.map((highlight, index) => (
                    <span key={index} className="gemeente-hero-highlight">
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="gemeente-hero-stats">
                  <div className="gemeente-stat">
                    <span className="gemeente-stat-number">12</span>
                    <span className="gemeente-stat-label">Specialisten</span>
                  </div>
                  <div className="gemeente-stat">
                    <span className="gemeente-stat-number">24u</span>
                    <span className="gemeente-stat-label">Response</span>
                  </div>
                  <div className="gemeente-stat">
                    <span className="gemeente-stat-number">95%</span>
                    <span className="gemeente-stat-label">Tevreden</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">Hoveniersdiensten in {gemeente.displayName}</h2>
              <p className="section-sub">Volledig pakket voor al uw tuinwensen</p>
            </div>
            
            <div className="gemeente-services-grid">
              {serviceAreas.map((service, index) => (
                <div key={index} className="gemeente-service-card">
                  <div className="gemeente-service-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="gemeente-service-title">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Benefits Section */}
        <section className="section">
          <div className="section-inner">
            <div className="gemeente-benefits">
              <div className="gemeente-benefits-content">
                <h2 className="gemeente-benefits-title">Waarom kiezen voor lokale hoveniers?</h2>
                <div className="gemeente-benefits-list">
                  <div className="gemeente-benefit">
                    <div className="gemeente-benefit-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="gemeente-benefit-title">Kennis van lokaal klimaat</h3>
                      <p className="gemeente-benefit-description">
                        Onze specialisten kennen de specifieke bodem en weersomstandigheden in {gemeente.displayName}.
                      </p>
                    </div>
                  </div>
                  
                  <div className="gemeente-benefit">
                    <div className="gemeente-benefit-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="gemeente-benefit-title">Snelle respons</h3>
                      <p className="gemeente-benefit-description">
                        Binnen {gemeente.displayName} zijn we snel ter plaatse voor offertes en spoedopdrachten.
                      </p>
                    </div>
                  </div>
                  
                  <div className="gemeente-benefit">
                    <div className="gemeente-benefit-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="gemeente-benefit-title">Gecertificeerd & verzekerd</h3>
                      <p className="gemeente-benefit-description">
                        Alle aangesloten hoveniers hebben geldige certificaten en WA-verzekering.
                      </p>
                    </div>
                  </div>
                  
                  <div className="gemeente-benefit">
                    <div className="gemeente-benefit-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="gemeente-benefit-title">Lokale reputatie</h3>
                      <p className="gemeente-benefit-description">
                        Gevestigde namen met bewezen trackrecord in {gemeente.displayName} en omgeving.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">Veelgestelde vragen over hoveniers in {gemeente.displayName}</h2>
            </div>
            
            <div className="faq-grid">
              {locationFaqs.map((faq, index) => (
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
            <div className="gemeente-form-container">
              <div className="gemeente-form-header">
                <h2 className="section-title section-title-centered">
                  Gratis offerte aanvragen in {gemeente.displayName}
                </h2>
                <p className="section-sub section-sub-centered">
                  Ontvang binnen 24 uur reacties van lokale hovenier specialisten
                </p>
              </div>
              <div className="gemeente-form-content">
                <NewLeadForm 
                  translations={translations} 
                  locale={validLocale}
                  prefillMunicipality={gemeente.displayName}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Related Articles */}
      <RelatedArticles 
        articles={relatedArticles} 
        title={`Gerelateerde artikelen voor ${gemeente.displayName}`} 
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": locationFaqs.map(faq => ({
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

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Hovenier ${gemeente.displayName}`,
            "description": `Professionele hoveniersdiensten in ${gemeente.displayName}`,
            "url": `https://hovenier.frl/gemeente/${slug}`,
            "areaServed": {
              "@type": "City",
              "name": gemeente.displayName,
              "containedInPlace": {
                "@type": "State", 
                "name": "Friesland",
                "containedInPlace": {
                  "@type": "Country",
                  "name": "Nederland"
                }
              }
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "53.2",
                "longitude": "5.8"
              },
              "geoRadius": "20000"
            }
          }),
        }}
      />
    </>
  );
}
