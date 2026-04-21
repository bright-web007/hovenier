import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import NewLeadForm from "@/app/components/NewLeadForm"
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../components/StructuredData'
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Tuin Aanleggen - Professionele Tuinaanleg | Hovenier.frl',
    description: 'Laat je nieuwe tuin professioneel aanleggen door ervaren hoveniers in Friesland. Van ontwerp tot realisatie - krijg offertes van gekwalificeerde tuinspecialisten.',
    keywords: 'tuin aanleggen, nieuwe tuin, tuinaanleg, hovenier, Friesland, tuinontwerp realisatie',
    alternates: getLocaleAlternates('/diensten/tuin-aanleggen', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static service content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function TuinAanleggenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale)
  const t = createTranslator(locale)
  
  // Simple translations for the form
  const formTranslations = {
    form_eyebrow: "Gratis Offerte",
    form_title: "Vraag direct een offerte aan",
    form_subtitle: "Ontvang binnen 24 uur contact van lokale tuinspecialisten",
    your_name: "Uw naam",
    municipality: "Gemeente",
    service: "Gewenste dienst",
    phone_number: "Telefoonnummer",
    send_request: "Verstuur aanvraag",
    form_note: "Door het versturen van dit formulier gaat u akkoord met onze voorwaarden.",
    select_municipality: 'Selecteer gemeente',
    what_do_you_need: 'Wat heeft u nodig?',
    your_company: 'Uw bedrijf',
    loading: 'Versturen...',
    privacy_agreement: 'Ik ga akkoord met het',
    privacy_link: 'privacybeleid',
    privacy_consent: 'en geef toestemming voor het verwerken van mijn gegevens.',
    services: {
      tuinonderhoud: 'Tuinonderhoud',
      tuinontwerp: 'Tuinontwerp',
      'tuin-aanleggen': 'Tuin Aanleggen',
      stratenmaker: 'Bestrating',
      groendak: 'Groendak',
      overig: 'Overig'
    }
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: 'Diensten', href: localizePath('/diensten', locale as SupportedLocale) },
    { label: 'Tuin Aanleggen' }
  ];

  return (
    <>
      <LocalBusinessSchema 
        serviceType="tuin-aanleggen"
        url={`https://hovenier.frl${localizePath('/diensten/tuin-aanleggen', locale as SupportedLocale)}`}
      />
      
      <BreadcrumbSchema 
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl${localizePath('/diensten/tuin-aanleggen', locale as SupportedLocale)}`
        }))}
      />
      
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-screen-xl mx-auto text-center mb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Tuin Aanleggen
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Van droomtuin naar werkelijkheid - professionele tuinaanleg in Friesland
          </p>
        </div>

        {/* Service Description */}
        <section className="max-w-screen-xl mx-auto mb-16 px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-6">
              Complete Tuinaanleg van A tot Z
            </h2>
            <div className="prose prose-lg max-w-none text-forest-800">
              <p>
                Een nieuwe tuin aanleggen is een grote investering die vakkennis en ervaring vereist. 
                Onze aangesloten hoveniers in Friesland begeleiden je van het eerste ontwerp tot 
                de eindrealisatie van je droomtuin.
              </p>
              <p>
                Of je nu een nieuwbouwwoning hebt, een complete tuinrenovatie plant, of gewoon 
                toe bent aan een totaal nieuwe look - wij helpen je de juuste specialist te vinden 
                voor jouw project.
              </p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="max-w-screen-xl mx-auto mb-16 px-4">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Wat is inbegrepen bij tuinaanleg?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Tuinontwerp & Planning</h3>
              <p className="text-forest-700 text-sm">
                Professioneel ontwerp op maat, rekening houdend met je wensen, budget en tuinomstandigheden.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Grondwerk & Voorbereiding</h3>
              <p className="text-forest-700 text-sm">
                Grondverzet, drainage, bodemverbetering en alle voorbereidende werkzaamheden.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zM7 8a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Hardscaping</h3>
              <p className="text-forest-700 text-sm">
                Terrassen, paden, muren, pergola&apos;s en andere hardscape elementen.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Beplanting</h3>
              <p className="text-forest-700 text-sm">
                Selectie en plaatsing van bomen, struiken, vaste planten en gazon volgens ontwerp.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Irrigatie & Verlichting</h3>
              <p className="text-forest-700 text-sm">
                Automatische sproeisystemen en sfeervolle tuinverlichting (optioneel).
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 6.414V12z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Afwerking & Onderhoud</h3>
              <p className="text-forest-700 text-sm">
                Eindafwerking, opruimen en advies voor het onderhoud van je nieuwe tuin.
              </p>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="max-w-screen-xl mx-auto mb-16 px-4">
          <div className="bg-forest-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
              Het Tuinaanleg Proces
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Intake & Locatiebezoek</h3>
                  <p className="text-forest-700 text-sm">
                    Persoonlijk gesprek over je wensen, budget en mogelijkheden. Opname van de tuin en bodemanalyse.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Ontwerp & Offerte</h3>
                  <p className="text-forest-700 text-sm">
                    Uitgewerkt tuinontwerp met 3D visualisatie en gedetailleerde kostenraming per fase.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Planning & Vergunningen</h3>
                  <p className="text-forest-700 text-sm">
                    Aanvraag benodigde vergunningen, planning van werkzaamheden en bestelling materialen.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Realisatie</h3>
                  <p className="text-forest-700 text-sm">
                    Stapsgewijze uitvoering volgens planning: grondwerk → hardscaping → beplanting → afwerking.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Oplevering & Garantie</h3>
                  <p className="text-forest-700 text-sm">
                    Eindcontrole, overdracht onderhoudsadvies en garantieregelingen voor planten en materialen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Information */}
        <section className="max-w-screen-xl mx-auto mb-16 px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
              Kosten van Tuinaanleg
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Kleine Tuin</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€8.000 - €15.000</p>
                <p className="text-sm text-forest-700">50-100m² | Basis beplanting</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Gemiddelde Tuin</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€15.000 - €35.000</p>
                <p className="text-sm text-forest-700">100-300m² | Met terrassen/paden</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Grote Tuin</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€35.000+</p>
                <p className="text-sm text-forest-700">300m²+ | Luxe afwerking</p>
              </div>
            </div>
            <p className="text-center text-forest-700">
              Prijzen zijn indicatief en afhankelijk van grondsoort, toegankelijkheid, gekozen materialen en complexiteit van het ontwerp.
            </p>
            <div className="text-center mt-4">
              <Link href="/kosten/tuin-aanleggen" className="text-sage-600 hover:underline font-medium">
                → Bekijk gedetailleerde kostengids
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-screen-xl mx-auto mb-16 px-4">
          <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
            Veelgestelde Vragen
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Hoelang duurt het aanleggen van een nieuwe tuin?
              </summary>
              <p className="mt-3 text-forest-700">
                De doorlooptijd hangt af van de grootte en complexiteit. Een kleine tuin (50-100m²) 
                kan binnen 2-3 weken gerealiseerd worden. Voor grotere projecten met uitgebreide 
                hardscaping rekent u 4-8 weken. Het seizoen speelt ook een rol - voorjaar en 
                herfst zijn ideaal voor beplanting.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Wat is het beste seizoen voor tuinaanleg?
              </summary>
              <p className="mt-3 text-forest-700">
                Hardscaping (terrassen, paden) kan het hele jaar door. Voor beplanting zijn 
                september-november en maart-mei optimaal. Gazon wordt bij voorkeur in april-mei 
                of september-oktober gelegd. We plannen het project zo dat elk onderdeel op 
                het juiste moment wordt uitgevoerd.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Krijg ik garantie op de aangelegde tuin?
              </summary>
              <p className="mt-3 text-forest-700">
                Ja, erkende hoveniers geven garantie. Doorgaans 1 jaar op beplanting (bij normale 
                verzorging), 2-5 jaar op hardscaping afhankelijk van materiaal, en 6 maanden op gazon. 
                Garantievoorwaarden worden altijd duidelijk vastgelegd in de overeenkomst.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Kan de tuin in fases worden aangelegd?
              </summary>
              <p className="mt-3 text-forest-700">
                Absoluut! Veel klanten kiezen voor gefaseerde aanleg om kosten te spreiden. 
                Typische verdeling: Fase 1 (grondwerk + basis hardscaping), Fase 2 (hoofdbeplanting), 
                Fase 3 (details + bijzondere elementen). Het ontwerp houdt rekening met deze fasering.
              </p>
            </details>
          </div>
        </section>

        {/* Lead Form */}
        <section className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-6 text-center">
              Gratis Offertes voor Tuinaanleg
            </h2>
            <p className="text-forest-700 mb-8 text-center">
              Krijg binnen 24 uur contact van tot 3 ervaren hoveniers in jouw gemeente
            </p>
            <NewLeadForm 
              translations={formTranslations}
              locale={locale}
            />
          </div>
        </section>
      </div>
    </main>
    </>
  )
}
