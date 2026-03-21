import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import NewLeadForm from '../../components/NewLeadForm';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

// Simple translation function
function createTranslator(locale: string) {
  let messages: Record<string, any> = {};
  
  try {
    if (locale === 'nl') {
      messages = require(`../../../locales/nl/common.json`);
    } else {
      messages = require(`../../../locales/en/common.json`);
    }
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    messages = {
      form_eyebrow: "Gratis & vrijblijvend",
      form_title: "Word partner",
      form_subtitle: "Sluit je aan bij ons netwerk van professionele hoveniers."
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
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Word Partner | Hovenier.frl - Voor Professionele Hoveniers',
      description: 'Sluit je aan bij Hovenier.frl en krijg toegang tot klanten in heel Friesland. Voor gecertificeerde hoveniers met ervaring. Vergroot je klantenkring!',
      keywords: ['hovenier partner', 'samenwerking', 'friesland', 'klanten', 'hoveniersbedrijf'],
    };
  } catch (error) {
    return {
      title: 'Word Partner - Hovenier.frl',
      description: 'Word partner van Hovenier.frl en vergroot je klantenkring.'
    };
  }
}

export default async function SamenwerkingPage({ params }: Props) {
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

  // Partner benefits data
  const benefits = [
    {
      title: "Meer klanten",
      description: "Krijg toegang tot klanten in heel Friesland die op zoek zijn naar betrouwbare hoveniers.",
      icon: "users"
    },
    {
      title: "Geen commissie",
      description: "Wij rekenen geen commissie af. Direct contact tussen jou en de klant.",
      icon: "money"
    },
    {
      title: "Lokale focus",
      description: "Word gekoppeld aan klanten in jouw werkgebied voor optimale efficiency.",
      icon: "location"
    },
    {
      title: "Kwaliteitsnetwerk",
      description: "Onderdeel worden van een selecte groep gecertificeerde hoveniers.",
      icon: "badge"
    }
  ];

  // Requirements list
  const requirements = [
    "Minimaal 3 jaar ervaring als hovenier",
    "KvK inschrijving en BTW nummer",
    "Geldige WA-verzekering",
    "Relevante certificaten (VCA, groendaken, etc.)",
    "Positieve referenties van eerdere klanten",
    "Werkgebied in Friesland of omliggende provincies"
  ];

  // FAQ data
  const faqs = [
    {
      question: "Wat kost het om partner te worden?",
      answer: "Het partnerschap is volledig gratis. Wij verdienen alleen geld als onze partners succesvol zijn. Er zijn geen aanmeldkosten, maandelijkse kosten of commissies op opdrachten."
    },
    {
      question: "Hoe worden klanten aan partners gekoppeld?",
      answer: "Klanten geven hun locatie en gewenste dienst op. Wij koppelen hen aan de meest geschikte partners in hun gebied op basis van specialisatie, beschikbaarheid en reviews."
    },
    {
      question: "Krijg ik gegarandeerd werk?",
      answer: "We kunnen geen werk garanderen, maar we zorgen ervoor dat je kiesbrieven krijgt toegestuurd die passen bij jouw diensten en werkgebied. De kwaliteit van je diensten bepaalt je succes."
    },
    {
      question: "Wat gebeurt er na de aanmelding?",
      answer: "We nemen binnen 48 uur contact met je op voor een kennismakingsgesprek. Daarna voeren we een referentiecheck uit en bekijken we je certificaten en verzekeringen."
    },
    {
      question: "Kan ik zelf bepalen welke opdrachten ik aannneem?",
      answer: "Ja, absoluut. Je bent altijd vrij om kiesbrieven af te slaan die niet passen bij je planning, specialisatie of werkgebied."
    }
  ];

  // Success stories data
  const successStories = [
    {
      name: "Jan Verhoeven",
      company: "Tuin & Bouw Heerenveen",
      quote: "Sinds ik partner ben bij Hovenier.frl is mijn klantenkring met 40% gegroeid. Vooral de groendak specialists vragen maken het verschil.",
      years: "2 jaar partner"
    },
    {
      name: "Maria Dijkstra",
      company: "Groene Vingers Leeuwarden", 
      quote: "De klanten die ik via het platform krijg zijn serieus en weten wat ze willen. Dat scheelt veel tijd en zorgt voor betere opdrachten.",
      years: "1.5 jaar partner"
    },
    {
      name: "Pieter de Jong",
      company: "Landschapshoven Smallingerland",
      quote: "Het partnerschap heeft me geholpen om me te specialiseren in tuinontwerp. De klanten waarderen de professionele aanpak.",
      years: "3 jaar partner"
    }
  ];

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: "Aanmelden",
      description: "Vul het partnerformulier in met je bedrijfsgegevens en ervaring."
    },
    {
      step: 2,
      title: "Screening",
      description: "Wij controleren je certificaten, verzekering en referenties."
    },
    {
      step: 3, 
      title: "Kennismaking",
      description: "Persoonlijk gesprek over jouw specialisaties en werkgebied."
    },
    {
      step: 4,
      title: "Live gaan",
      description: "Na goedkeuring ontvang je direct kiesbrieven van potentiële klanten."
    }
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
        <section className="section partnership-hero">
          <div className="section-inner">
            <div className="partnership-hero-content">
              <div className="partnership-hero-text">
                <div className="partnership-hero-badge">
                  <span className="partnership-badge-text">Voor professionals</span>
                </div>
                <h1 className="partnership-hero-title">
                  Word partner van Hovenier.frl
                </h1>
                <p className="partnership-hero-description">
                  Sluit je aan bij ons netwerk van gekwalificeerde hoveniers en krijg toegang tot 
                  klanten in heel Friesland. Zonder commissiekosten, met volledige transparantie.
                </p>
                <div className="partnership-hero-stats">
                  <div className="partnership-stat">
                    <span className="partnership-stat-number">150+</span>
                    <span className="partnership-stat-label">Tevreden klanten</span>
                  </div>
                  <div className="partnership-stat">
                    <span className="partnership-stat-number">25+</span>
                    <span className="partnership-stat-label">Partner hoveniers</span>
                  </div>
                  <div className="partnership-stat">
                    <span className="partnership-stat-number">0%</span>
                    <span className="partnership-stat-label">Commissie</span>
                  </div>
                </div>
              </div>
              <div className="partnership-hero-image">
                <div className="partnership-hero-placeholder">
                  <svg className="partnership-hero-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">Waarom partner worden?</h2>
              <p className="section-sub">De voordelen van samenwerken met Hovenier.frl</p>
            </div>
            
            <div className="partnership-benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="partnership-benefit-card">
                  <div className="partnership-benefit-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {benefit.icon === 'users' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      )}
                      {benefit.icon === 'money' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      )}
                      {benefit.icon === 'location' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      )}
                      {benefit.icon === 'badge' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>
                  <h3 className="partnership-benefit-title">{benefit.title}</h3>
                  <p className="partnership-benefit-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">Hoe werkt het?</h2>
              <p className="section-sub">In 4 stappen partner worden</p>
            </div>
            
            <div className="partnership-process-grid">
              {processSteps.map((step, index) => (
                <div key={index} className="partnership-process-step">
                  <div className="partnership-process-number">{step.step}</div>
                  <h3 className="partnership-process-title">{step.title}</h3>
                  <p className="partnership-process-description">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="section section-alt">
          <div className="section-inner">
            <div className="partnership-requirements">
              <div className="partnership-requirements-content">
                <h2 className="partnership-requirements-title">Partner vereisten</h2>
                <p className="partnership-requirements-description">
                  Wij werken alleen samen met professionele hoveniers die voldoen aan onze kwaliteitseisen.
                </p>
                
                <div className="partnership-requirements-list">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="partnership-requirement-item">
                      <div className="partnership-requirement-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="partnership-requirement-text">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="section">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <h2 className="section-title">Succesverhalen</h2>
              <p className="section-sub">Wat onze partners zeggen</p>
            </div>
            
            <div className="partnership-testimonials-grid">
              {successStories.map((story, index) => (
                <div key={index} className="partnership-testimonial-card">
                  <div className="partnership-testimonial-content">
                    <p className="partnership-testimonial-quote">"{story.quote}"</p>
                    <div className="partnership-testimonial-author">
                      <div className="partnership-testimonial-info">
                        <h4 className="partnership-testimonial-name">{story.name}</h4>
                        <p className="partnership-testimonial-company">{story.company}</p>
                        <p className="partnership-testimonial-years">{story.years}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

        {/* CTA Section */}
        <section className="section">
          <div className="section-inner">
            <div className="partnership-cta">
              <div className="partnership-cta-content">
                <h2 className="partnership-cta-title">Klaar om partner te worden?</h2>
                <p className="partnership-cta-description">
                  Meld je vandaag nog aan en begin binnen een week met het ontvangen van kiesbrieven.
                </p>
                <div className="partnership-form-container">
                  <NewLeadForm 
                    translations={{
                      ...translations,
                      form_title: "Partner aanmelding",
                      form_subtitle: "Laat je gegevens achter en we nemen binnen 24 uur contact op."
                    }}
                    locale={validLocale} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hovenier.frl Partner Network",
            "description": "Professioneel netwerk van gecertificeerde hoveniers in Friesland",
            "url": "https://hovenier.frl/samenwerking",
            "areaServed": {
              "@type": "State",
              "name": "Friesland",
              "containedInPlace": {
                "@type": "Country",
                "name": "Nederland"
              }
            }
          }),
        }}
      />
    </>
  );
}