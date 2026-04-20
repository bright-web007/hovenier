import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../components/RelatedArticles';
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData';
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/lib/translator'
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



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  const isEn = validLocale === 'en';

  return {
    title: isEn
      ? 'Paver Friesland | Paving & Terrace Installation | Hovenier.frl'
      : 'Stratenmaker Friesland | Bestrating & Terras Aanleggen | Hovenier.frl',
    description: isEn
      ? 'Need a paver in Friesland? Expert paving for terraces, driveways and garden paths. Ceramic, natural stone or concrete — free quotes from local specialists.'
      : 'Stratenmaker nodig in Friesland? Vakkundige bestrating voor terrassen, opritten en tuinpaden. Keramisch, natuursteen of beton — gratis offertes van lokale specialisten.',
    keywords: isEn
      ? 'paver friesland, paving friesland, terrace installation friesland, driveway paving friesland'
      : 'stratenmaker friesland, hovenier stratenmaker friesland, stratenmaker gezocht friesland, bestrating aanleggen friesland, terras aanleggen friesland',
    alternates: getLocaleAlternates('/diensten/stratenmaker', validLocale as SupportedLocale),
  }
}

export default async function StratenmakerPage({ params }: Props) {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  setRequestLocale(validLocale);

  const t = createTranslator(validLocale);
  const isEn = validLocale === 'en';
  const localeFaqs = t.raw('faqs.stratenmaker') || []
  const localeArticles = t.raw('related_articles.stratenmaker') || []

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
    { label: isEn ? 'Services' : 'Diensten', href: localizePath('/diensten', validLocale as SupportedLocale) },
    { label: isEn ? 'Paver' : 'Stratenmaker', href: localizePath('/diensten/stratenmaker', validLocale as SupportedLocale) }
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
              {isEn ? 'Paver & Paving' : 'Stratenmaker & Bestrating'}
            </h1>
            <p className={styles.heroSubtitle}>
              {isEn ? 'Professional hardscaping services in Friesland' : 'Professionele hardscaping diensten in Friesland'}
            </p>
          </div>

          {/* Service Description */}
          <section className={styles.section}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                {isEn ? 'Expert Paving Work' : 'Deskundige Bestratingswerken'}
              </h2>
              <div className={styles.cardContent}>
                <p>
                  {isEn
                    ? 'A paver lays the foundation for durable and aesthetically beautiful outdoor spaces. Our qualified specialists in Friesland combine technical expertise with attention to detail for all your hardscaping projects.'
                    : 'Een stratenmaker legt de basis voor duurzame en esthetisch mooie buitenruimtes. Onze gekwalificeerde specialisten in Friesland combineren technische expertise met oog voor detail voor al uw hardscaping projecten.'}
                </p>
                <p>
                  {isEn
                    ? 'From simple garden paths to complex driveways and terraces — we work exclusively with experienced professionals who are familiar with local ground conditions and building regulations.'
                    : 'Van eenvoudige tuinpaden tot complexe opritten en terrassen - we werken uitsluitend met ervaren professionals die bekend zijn met lokale grondcondities en bouwvoorschriften.'}
                </p>
              </div>
            </div>
          </section>

          {/* Service Types */}
          <section className={styles.sectionWide}>
            <h2 className={styles.sectionTitle}>
              {isEn ? 'Our Paving Specializations' : 'Onze Bestrating Specialisaties'}
            </h2>
            <div className={`${styles.grid} ${styles.gridCols2} ${styles.gridCols3}`}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>{isEn ? 'Driveways & Parking Areas' : 'Opritten & Parkeerplaatsen'}</h3>
                <p className={styles.serviceDescription}>
                  {isEn ? 'Durable driveways made of concrete pavers, natural stone or asphalt. Including drainage and foundation.' : 'Duurzame opritten van betonklinkers, natuursteen of asfalt. Inclusief drainage en fundering.'}
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>{isEn ? 'Terraces & Patios' : 'Terrassen & Patio\'s'}</h3>
                <p className={styles.serviceDescription}>
                  {isEn ? 'Stylish outdoor spaces made of ceramic, natural stone, concrete or wood. Custom made for your garden.' : 'Stijlvolle buitenruimtes van keramiek, natuursteen, beton of hout. Op maat gemaakt voor uw tuin.'}
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>{isEn ? 'Garden Paths & Borders' : 'Tuinpaden & Borders'}</h3>
                <p className={styles.serviceDescription}>
                  {isEn ? 'Functional and decorative paths through the garden. Various materials and patterns available.' : 'Functionele en decoratieve paden door de tuin. Diverse materialen en patronen mogelijk.'}
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>{isEn ? 'Retaining Walls & Borders' : 'Keermuren & Borders'}</h3>
                <p className={styles.serviceDescription}>
                  {isEn ? 'Retaining walls and borders made of concrete, natural stone or stacking blocks for height differences.' : 'Steunmuren en borders van beton, natuursteen of stapelblokken voor hoogteverschillen.'}
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>{isEn ? 'Drainage & Sewerage' : 'Drainage & Riolering'}</h3>
                <p className={styles.serviceDescription}>
                  {isEn ? 'Professional water drainage, drainage systems and sewerage for paved surfaces.' : 'Professionele waterafvoer, drainagesystemen en riolering voor bestrate oppervlakken.'}
                </p>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A.996.996 0 0118 6v2a1 1 0 11-2 0v-.277l-1.254.145a1 1 0 11-.992-1.736L14.984 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.723V12a1 1 0 11-2 0v-1.277l-1.246-.855a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.277l1.246.855a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.277V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364.372l.254.145V16a1 1 0 112 0v1.021l.254-.145a1 1 0 11.992 1.736l-1.735.99a.995.995 0 01-1.022 0l-1.735-.99a1 1 0 01.128-1.608z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className={styles.serviceTitle}>{isEn ? 'Decorative Elements' : 'Decoratieve Elementen'}</h3>
                <p className={styles.serviceDescription}>
                  {isEn ? 'Circle cuts, mosaics, inlaid work and other decorative paving techniques.' : 'Cirkelzagen, mozaïeken, ingelegd werk en andere decoratieve bestratingstechnieken.'}
                </p>
              </div>
            </div>
          </section>

          {/* Materials Section */}
          <section className={styles.section}>
            <div className={styles.highlightSection}>
              <h2 className={styles.highlightTitle}>
                {isEn ? 'Materials & Options' : 'Materialen & Opties'}
              </h2>
              <div className={`${styles.grid} ${styles.gridCols2}`}>
                <div className={styles.materialsList}>
                  <h3>{isEn ? 'Paving Materials' : 'Bestrating Materialen'}</h3>
                  <ul>
                    <li>{isEn ? 'Concrete pavers (various colors/sizes)' : 'Betonklinkers (diverse kleuren/formaten)'}</li>
                    <li>{isEn ? 'Natural stone (bluestone, granite, basalt)' : 'Natuursteen (hardsteen, graniet, basalt)'}</li>
                    <li>{isEn ? 'Ceramic tiles (large format)' : 'Keramische tegels (groot formaat)'}</li>
                    <li>{isEn ? 'Decorative gravel & stabilization mats' : 'Siergrind & stabilisatiematten'}</li>
                    <li>{isEn ? 'Asphalt & crushed stone (functional)' : 'Asfalt & steenslag (functioneel)'}</li>
                  </ul>
                </div>
                <div className={styles.materialsList}>
                  <h3>{isEn ? 'Special Techniques' : 'Speciale Technieken'}</h3>
                  <ul>
                    <li>{isEn ? 'Permeable paving (water-permeable)' : 'Doorlatende bestrating (waterdoorlatend)'}</li>
                    <li>{isEn ? 'Deformation-resistant constructions' : 'Vervorming bestendige constructies'}</li>
                    <li>{isEn ? 'Anti-slip treatments' : 'Antislip behandelingen'}</li>
                    <li>{isEn ? 'Integrated edge restraint' : 'Geïntegreerde kantopsluiting'}</li>
                    <li>{isEn ? 'LED lighting integration' : 'LED verlichting integratie'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Information */}
          <section className={styles.section}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle} style={{ textAlign: 'center' }}>
                {isEn ? 'Paving Cost Overview' : 'Kostenoverzicht Bestrating'}
              </h2>
              <div className={styles.priceGrid}>
                <div className={styles.priceCard}>
                  <h3>{isEn ? 'Concrete Pavers' : 'Betonklinkers'}</h3>
                  <p className={styles.priceAmount}>€45 - €75/m²</p>
                  <p className={styles.priceNote}>{isEn ? 'Incl. sand/cement joints' : 'Incl. zand/cement voegen'}</p>
                </div>
                <div className={styles.priceCard}>
                  <h3>{isEn ? 'Natural Stone' : 'Natuursteen'}</h3>
                  <p className={styles.priceAmount}>€75 - €150/m²</p>
                  <p className={styles.priceNote}>{isEn ? 'Depending on stone type' : 'Afhankelijk van steensoort'}</p>
                </div>
                <div className={styles.priceCard}>
                  <h3>{isEn ? 'Ceramic Tiles' : 'Keramische Tegels'}</h3>
                  <p className={styles.priceAmount}>€85 - €120/m²</p>
                  <p className={styles.priceNote}>{isEn ? 'Large format, on plots' : 'Groot formaat, op plots'}</p>
                </div>
              </div>
              <div className={styles.priceDetails}>
                <p><strong>{isEn ? 'Including:' : 'Inclusief:'}</strong> {isEn ? 'Groundwork, foundation, sand/gravel, laying and finishing' : 'Grondwerk, fundering, zand/grind, leggen en afwerking'}</p>
                <p><strong>{isEn ? 'Excluding:' : 'Exclusief:'}</strong> {isEn ? 'Any permits, sewer work, electrical connections' : 'Eventuele vergunningen, rioolwerk, elektrische aansluitingen'}</p>
                <p><strong>{isEn ? 'Surcharge possible for:' : 'Toeslag mogelijk voor:'}</strong> {isEn ? 'Very hard ground, limited accessibility, special patterns' : 'Zeer harde grond, beperkte toegankelijkheid, speciale patronen'}</p>
              </div>
            </div>
          </section>

          {/* Process Steps */}
          <section className={styles.section}>
            <div className={styles.highlightSection}>
              <h2 className={styles.highlightTitle}>
                {isEn ? 'The Paving Process' : 'Het Bestratingsproces'}
              </h2>
              <div className={styles.processSteps}>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>
                    <span>1</span>
                  </div>
                  <div className={styles.stepContent}>
                    <h3>{isEn ? 'Measurement & Advice' : 'Opmeting & Advies'}</h3>
                    <p>
                      {isEn ? 'Precise measurement, soil investigation and advice on materials and execution.' : 'Precieze opmeting, bodemonderzoek en advies over materialen en uitvoering.'}
                    </p>
                  </div>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>
                    <span>2</span>
                  </div>
                  <div className={styles.stepContent}>
                    <h3>{isEn ? 'Earthwork & Foundation' : 'Grondverzet & Fundering'}</h3>
                    <p>
                      {isEn ? 'Excavation, applying foundation layer and compacting according to PAV guidelines.' : 'Uitgraven, fundatielaag aanbrengen en verdichten volgens PAV richtlijnen.'}
                    </p>
                  </div>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>
                    <span>3</span>
                  </div>
                  <div className={styles.stepContent}>
                    <h3>{isEn ? 'Sand Bed & Edge Restraint' : 'Zandbed & Kantopsluiting'}</h3>
                    <p>
                      {isEn ? 'Applying sand bed and placing edges/edge restraint for stability.' : 'Aanbrengen zandbed en plaatsen van randen/kantopsluiting voor stabiliteit.'}
                    </p>
                  </div>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>
                    <span>4</span>
                  </div>
                  <div className={styles.stepContent}>
                    <h3>{isEn ? 'Laying & Finishing' : 'Leggen & Afwerking'}</h3>
                    <p>
                      {isEn ? 'Professional laying of paving, jointing and compacting for optimal compaction.' : 'Professioneel leggen van bestrating, voegen en trillen voor optimale verdichting.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {isEn ? 'Frequently Asked Questions' : 'Veelgestelde Vragen'}
            </h2>
            <div className={styles.faqSection}>
              {localeFaqs.map((faq: { question: string; answer: string }, index: number) => (
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
                {isEn ? 'Free Quotes for Paving Work' : 'Gratis Offertes voor Bestratingswerk'}
              </h2>
              <p className={styles.leadFormDescription}>
                {isEn ? 'Get in touch with up to 3 experienced pavers in your municipality within 24 hours' : 'Krijg binnen 24 uur contact van tot 3 ervaren stratenmakers in jouw gemeente'}
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
              articles={localeArticles}
              title={isEn ? 'Related articles about paving' : 'Gerelateerde artikelen over bestrating'}
            />
          </section>
        </div>
      </main>
    </>
  )
}
