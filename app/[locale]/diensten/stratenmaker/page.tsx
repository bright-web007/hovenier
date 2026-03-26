import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../components/RelatedArticles';
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData';
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import styles from './Stratenmaker.module.css'

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
      service_stratenmaker_title: "Stratenmaker & Bestrating in Friesland",
      service_stratenmaker_subtitle: "Professionele hardscaping diensten door gecertificeerde stratenmakers",
      form_eyebrow: "Gratis & vrijblijvend",
      form_title: "Offerte bestrating",
      form_subtitle: "Ontvang binnen 24 uur reacties van stratenmakers in uw regio."
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
    question: "Hoe lang gaat bestrating mee?",
    answer: "Bij correcte aanleg en normaal gebruik gaan betonklinkers 25-30 jaar mee, natuursteen 50+ jaar. De kwaliteit van de fundering is cruciaal voor levensduur. Onderhoud bestaat voornamelijk uit voegen aanvullen en occasioneel schoonmaken."
  },
  {
    question: "Is een vergunning nodig voor bestrating?",
    answer: "Voor bestrating van uw eigen terrein is meestal geen vergunning nodig. Wel moet u zich houden aan de maximale verharding per perceel (check uw bestemmingsplan). Bij aansluiting op de openbare weg kan een KLIC-melding verplicht zijn."
  },
  {
    question: "Welk materiaal is het beste voor mijn situatie?",
    answer: "Dit hangt af van gebruik, budget en esthetiek. Betonklinkers zijn veelzijdig en betaalbaar, natuursteen is duurzamer maar duurder. Voor zwaar verkeer (opritten) adviseren we verstevigde klinkers of natuursteen. Voor terrassen zijn keramische tegels populair."
  },
  {
    question: "Wanneer is het beste seizoen voor bestratingswerkzaamheden?",
    answer: "Bestrating kan bijna het hele jaar door, behalve bij vorst. Het beste seizoen is maart-november. In de winter kan bij vorstvrij weer ook worden gewerkt. Voor grote projecten plannen we bij voorkeur in droge perioden vanwege grondcondities."
  }
];

// Sample related articles data
const relatedArticles = [
  {
    id: "1",
    title: "Kosten bestrating: wat betaal je per m² in 2024?",
    excerpt: "Compleet overzicht van bestratingsprijzen voor verschillende materialen en technieken.",
    slug: "kosten-bestrating-per-m2",
    category: "Prijzen",
    readTime: 5,
    publishedAt: "2024-03-15",
  },
  {
    id: "2", 
    title: "Betonklinkers vs natuursteen: wat is beter?",
    excerpt: "Vergelijking tussen verschillende bestratingsmaterialen voor oprit en terras.",
    slug: "betonklinkers-natuursteen-vergelijking",
    category: "Materialen",
    readTime: 7,
    publishedAt: "2024-03-10",
  },
  {
    id: "3",
    title: "Drainage en waterafvoer bij bestrating",
    excerpt: "Waarom goede waterafvoer essentieel is en hoe je dit professioneel aanpakt.",
    slug: "drainage-waterafvoer-bestrating",
    category: "Techniek", 
    readTime: 6,
    publishedAt: "2024-03-05",
  }
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;

  return {
    title: 'Stratenmaker Friesland | Bestrating & Terras Aanleggen | Hovenier.frl',
    description: 'Stratenmaker nodig in Friesland? Vakkundige bestrating voor terrassen, opritten en tuinpaden. Keramisch, natuursteen of beton — gratis offertes van lokale specialisten.',
    keywords: 'stratenmaker friesland, hovenier stratenmaker friesland, stratenmaker gezocht friesland, bestrating aanleggen friesland, terras aanleggen friesland',
    alternates: getLocaleAlternates('/diensten/stratenmaker', validLocale as SupportedLocale),
  }
}

export default async function StratenmakerPage({ params }: Props) {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  setRequestLocale(validLocale);
  
  const t = createTranslator(validLocale);
  
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
    { label: 'Home', href: localizePath('/', validLocale as SupportedLocale) },
    { label: 'Diensten', href: localizePath('/diensten', validLocale as SupportedLocale) },
    { label: 'Stratenmaker', href: localizePath('/diensten/stratenmaker', validLocale as SupportedLocale) }
  ];

  return (
    <>
      <LocalBusinessSchema 
        serviceType="stratenmaker"
        url={`https://hovenier.frl${localizePath('/diensten/stratenmaker', validLocale as SupportedLocale)}`}
      />
      
      <BreadcrumbSchema 
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl${localizePath('/diensten/stratenmaker', validLocale as SupportedLocale)}`
        }))}
      />
      
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className={styles.container}>
      <div className={styles.inner}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Stratenmaker & Bestrating
          </h1>
          <p className={styles.heroSubtitle}>
            Professionele hardscaping diensten in Friesland
          </p>
        </div>

        {/* Service Description */}
        <section className={styles.section}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              Deskundige Bestratingswerken
            </h2>
            <div className={styles.cardContent}>
              <p>
                Een stratenmaker legt de basis voor duurzame en esthetisch mooie buitenruimtes. 
                Onze gekwalificeerde specialisten in Friesland combineren technische expertise 
                met oog voor detail voor al uw hardscaping projecten.
              </p>
              <p>
                Van eenvoudige tuinpaden tot complexe opritten en terrassen - we werken uitsluitend 
                met ervaren professionals die bekend zijn met lokale grondcondities en bouwvoorschriften.
              </p>
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className={styles.sectionWide}>
          <h2 className={styles.sectionTitle}>
            Onze Bestrating Specialisaties
          </h2>
          <div className={`${styles.grid} ${styles.gridCols2} ${styles.gridCols3}`}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Opritten & Parkeerplaatsen</h3>
              <p className={styles.serviceDescription}>
                Duurzame opritten van betonklinkers, natuursteen of asfalt. Inclusief drainage en fundering.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Terrassen & Patio's</h3>
              <p className={styles.serviceDescription}>
                Stijlvolle buitenruimtes van keramiek, natuursteen, beton of hout. Op maat gemaakt voor uw tuin.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Tuinpaden & Borders</h3>
              <p className={styles.serviceDescription}>
                Functionele en decoratieve paden door de tuin. Diverse materialen en patronen mogelijk.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Keermuren & Borders</h3>
              <p className={styles.serviceDescription}>
                Steunmuren en borders van beton, natuursteen of stapelblokken voor hoogteverschillen.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Drainage & Riolering</h3>
              <p className={styles.serviceDescription}>
                Professionele waterafvoer, drainagesystemen en riolering voor bestrate oppervlakken.
              </p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A.996.996 0 0118 6v2a1 1 0 11-2 0v-.277l-1.254.145a1 1 0 11-.992-1.736L14.984 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.723V12a1 1 0 11-2 0v-1.277l-1.246-.855a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.277l1.246.855a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.277V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364.372l.254.145V16a1 1 0 112 0v1.021l.254-.145a1 1 0 11.992 1.736l-1.735.99a.995.995 0 01-1.022 0l-1.735-.99a1 1 0 01.128-1.608z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className={styles.serviceTitle}>Decoratieve Elementen</h3>
              <p className={styles.serviceDescription}>
                Cirkelzagen, mozaïeken, ingelegd werk en andere decoratieve bestratingstechnieken.
              </p>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className={styles.section}>
          <div className={styles.highlightSection}>
            <h2 className={styles.highlightTitle}>
              Materialen & Opties
            </h2>
            <div className={`${styles.grid} ${styles.gridCols2}`}>
              <div className={styles.materialsList}>
                <h3>Bestrating Materialen</h3>
                <ul>
                  <li>Betonklinkers (diverse kleuren/formaten)</li>
                  <li>Natuursteen (hardsteen, graniet, basalt)</li>
                  <li>Keramische tegels (groot formaat)</li>
                  <li>Siergrind & stabilisatiematten</li>
                  <li>Asfalt & steenslag (functioneel)</li>
                </ul>
              </div>
              <div className={styles.materialsList}>
                <h3>Speciale Technieken</h3>
                <ul>
                  <li>Doorlatende bestrating (waterdoorlatend)</li>
                  <li>Vervorming bestendige constructies</li>
                  <li>Antislip behandelingen</li>
                  <li>Geïntegreerde kantopsluiting</li>
                  <li>LED verlichting integratie</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Information */}
        <section className={styles.section}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle} style={{textAlign: 'center'}}>
              Kostenoverzicht Bestrating
            </h2>
            <div className={styles.priceGrid}>
              <div className={styles.priceCard}>
                <h3>Betonklinkers</h3>
                <p className={styles.priceAmount}>€45 - €75/m²</p>
                <p className={styles.priceNote}>Incl. zand/cement voegen</p>
              </div>
              <div className={styles.priceCard}>
                <h3>Natuursteen</h3>
                <p className={styles.priceAmount}>€75 - €150/m²</p>
                <p className={styles.priceNote}>Afhankelijk van steensoort</p>
              </div>
              <div className={styles.priceCard}>
                <h3>Keramische Tegels</h3>
                <p className={styles.priceAmount}>€85 - €120/m²</p>
                <p className={styles.priceNote}>Groot formaat, op plots</p>
              </div>
            </div>
            <div className={styles.priceDetails}>
              <p><strong>Inclusief:</strong> Grondwerk, fundering, zand/grind, leggen en afwerking</p>
              <p><strong>Exclusief:</strong> Eventuele vergunningen, rioolwerk, elektrische aansluitingen</p>
              <p><strong>Toeslag mogelijk voor:</strong> Zeer harde grond, beperkte toegankelijkheid, speciale patronen</p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className={styles.section}>
          <div className={styles.highlightSection}>
            <h2 className={styles.highlightTitle}>
              Het Bestratingsproces
            </h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>
                  <span>1</span>
                </div>
                <div className={styles.stepContent}>
                  <h3>Opmeting & Advies</h3>
                  <p>
                    Precieze opmeting, bodemonderzoek en advies over materialen en uitvoering.
                  </p>
                </div>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>
                  <span>2</span>
                </div>
                <div className={styles.stepContent}>
                  <h3>Grondverzet & Fundering</h3>
                  <p>
                    Uitgraven, fundatielaag aanbrengen en verdichten volgens PAV richtlijnen.
                  </p>
                </div>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>
                  <span>3</span>
                </div>
                <div className={styles.stepContent}>
                  <h3>Zandbed & Kantopsluiting</h3>
                  <p>
                    Aanbrengen zandbed en plaatsen van randen/kantopsluiting voor stabiliteit.
                  </p>
                </div>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>
                  <span>4</span>
                </div>
                <div className={styles.stepContent}>
                  <h3>Leggen & Afwerking</h3>
                  <p>
                    Professioneel leggen van bestrating, voegen en trillen voor optimale verdichting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Veelgestelde Vragen
          </h2>
          <div className={styles.faqSection}>
            {faqs.map((faq, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>
                  {faq.question}
                </summary>
                <p className={styles.faqAnswer}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Lead Form */}
        <section className={styles.leadFormSection}>
          <div className={styles.leadFormCard}>
            <h2 className={styles.leadFormTitle}>
              Gratis Offertes voor Bestratingswerk
            </h2>
            <p className={styles.leadFormDescription}>
              Krijg binnen 24 uur contact van tot 3 ervaren stratenmakers in jouw gemeente
            </p>
            <NewLeadForm 
              translations={formTranslations}
              locale={validLocale}
            />
          </div>
        </section>

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <RelatedArticles 
            articles={relatedArticles}
            title="Gerelateerde artikelen over bestrating"
          />
        </section>
      </div>
    </main>
    </>
  )
}
