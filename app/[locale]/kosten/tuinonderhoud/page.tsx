import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import NewLeadForm from "@/app/components/NewLeadForm"

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Kosten Tuinonderhoud - Wat Kost Tuin Onderhoud? | Hovenier.frl',
  description: 'Wat kost tuinonderhoud per maand of jaar? Ontdek alle kosten voor regelmatig tuinonderhoud door professionals in Friesland.',
  keywords: 'tuinonderhoud kosten, tuin onderhoud prijzen, hovenier onderhoud, maandelijks tuinonderhoud, Friesland',
}

// ISR: Never revalidate (static pricing content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function TuinonderhoudKostenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  
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
    form_note: "Door het versturen van dit formulier gaat u akkoord met onze voorwaarden."
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Kosten', href: '/kosten' },
    { label: 'Tuinonderhoud' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Kosten Tuinonderhoud
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Wat kost regelmatig tuinonderhoud door een professional?
          </p>
        </div>

        {/* Direct Answer */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-sage-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Kosten Overzicht:</h2>
            <p className="text-lg leading-relaxed">
              Tuinonderhoud kost gemiddeld <strong>€150-400 per maand</strong> voor een tuin van 200-500m². 
              Jaarlijks onderhoud varieert van <strong>€1.800-4.800</strong>, afhankelijk van tuingrootte, 
              gewenste onderhoudsniveau en frequentie van bezoeken.
            </p>
          </div>
        </section>

        {/* Cost Breakdown by Garden Size */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Kosten per Tuingrootte
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-forest-900 mb-4 text-center">Kleine Tuin</h3>
              <div className="text-center mb-6">
                <p className="text-sm text-forest-600 mb-2">100-200m²</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-sage-600">€150 - €250</p>
                  <p className="text-sm text-forest-600">per maand</p>
                  <p className="text-lg font-semibold text-forest-800">€1.800 - €3.000</p>
                  <p className="text-sm text-forest-600">per jaar</p>
                </div>
              </div>
              <ul className="text-sm text-forest-700 space-y-2">
                <li>• Maandelijks 3-4 uur werk</li>
                <li>• Gazon maaien & randen</li>
                <li>• Basis snoeiwerkzaamheden</li>
                <li>• Seizoensgebonden taken</li>
                <li>• Eenvoudige beplanting</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-sage-200">
              <div className="bg-sage-600 text-white text-xs px-3 py-1 rounded-full inline-block mb-4">POPULAIRST</div>
              <h3 className="text-xl font-semibold text-forest-900 mb-4 text-center">Gemiddelde Tuin</h3>
              <div className="text-center mb-6">
                <p className="text-sm text-forest-600 mb-2">200-500m²</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-sage-600">€250 - €400</p>
                  <p className="text-sm text-forest-600">per maand</p>
                  <p className="text-lg font-semibold text-forest-800">€3.000 - €4.800</p>
                  <p className="text-sm text-forest-600">per jaar</p>
                </div>
              </div>
              <ul className="text-sm text-forest-700 space-y-2">
                <li>• Maandelijks 4-6 uur werk</li>
                <li>• Uitgebreid gazon onderhoud</li>
                <li>• Hagen trimmen & snoeien</li>
                <li>• Borders wieden & verzorgen</li>
                <li>• Seizoensplanting vervangen</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-forest-900 mb-4 text-center">Grote Tuin</h3>
              <div className="text-center mb-6">
                <p className="text-sm text-forest-600 mb-2">500m²+</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-sage-600">€400 - €800</p>
                  <p className="text-sm text-forest-600">per maand</p>
                  <p className="text-lg font-semibold text-forest-800">€4.800 - €9.600</p>
                  <p className="text-sm text-forest-600">per jaar</p>
                </div>
              </div>
              <ul className="text-sm text-forest-700 space-y-2">
                <li>• Maandelijks 6-10+ uur werk</li>
                <li>• Uitgebreid landschap</li>
                <li>• Boomverzorging</li>
                <li>• Speciale plantenborders</li>
                <li>• Waterpartij onderhoud</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Service Frequency Options */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Onderhoudspakketten & Frequentie
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Wekelijks</h3>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-emerald-600">€60 - €120</p>
                <p className="text-sm text-forest-600">per bezoek</p>
              </div>
              <ul className="text-sm text-forest-700 space-y-1">
                <li>• 52 bezoeken per jaar</li>
                <li>• Perfecte tuin altijd</li>
                <li>• Premium service</li>
                <li>• Voor perfectionalisten</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-sage-200">
              <div className="bg-sage-600 text-white text-xs px-2 py-1 rounded-full inline-block mb-3">STANDAARD</div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Tweewekelijks</h3>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-sage-600">€80 - €150</p>
                <p className="text-sm text-forest-600">per bezoek</p>
              </div>
              <ul className="text-sm text-forest-700 space-y-1">
                <li>• 26 bezoeken per jaar</li>
                <li>• Goede balans prijs/kwaliteit</li>
                <li>• Meest gekozen optie</li>
                <li>• Voor gemiddelde tuinen</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Maandelijks</h3>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-forest-600">€120 - €250</p>
                <p className="text-sm text-forest-600">per bezoek</p>
              </div>
              <ul className="text-sm text-forest-700 space-y-1">
                <li>• 12 bezoeken per jaar</li>
                <li>• Basis onderhoud</li>
                <li>• Goede prijs-kwaliteit</li>
                <li>• Voor onderhoudsarme tuinen</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Seizoensgebonden</h3>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-gray-600">€300 - €800</p>
                <p className="text-sm text-forest-600">per bezoek</p>
              </div>
              <ul className="text-sm text-forest-700 space-y-1">
                <li>• 4-6 bezoeken per jaar</li>
                <li>• Grote werkzaamheden</li>
                <li>• Voorjaar & herfst</li>
                <li>• Voor zelframere eigenaren</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-forest-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
              Wat is Inbegrepen in Tuinonderhoud?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Standaard Werkzaamheden:</h3>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Gazon maaien en randen bijwerken
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Wieden van borders en paden
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Hagen trimmen en vormgeven
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Dode bloemen verwijderen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Basis snoeiwerkzaamheden
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Opruimen bladeren (herfst)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Seizoensgebonden Extra's:</h3>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Voorjaar: gazon verticuleren
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Zomer: extra begieten droge perioden
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Herfst: bladeren opruimen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Winter: beschermen planten
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Seizoensplanten vervangen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Tuinadvies en plantenkeuze
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Factors */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Factoren die Kosten Beïnvloeden
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-forest-900 mb-4">Tuinkenmerken</h3>
              <ul className="text-sm text-forest-700 space-y-2">
                <li>• <strong>Grootte:</strong> Meer m² = hogere kosten</li>
                <li>• <strong>Complexiteit:</strong> Veel borders vs. alleen gazon</li>
                <li>• <strong>Bereikbaarheid:</strong> Smalle toegangen</li>
                <li>• <strong>Hoogteverschillen:</strong> Hellingen en trappen</li>
                <li>• <strong>Bomen & struiken:</strong> Snoeiwerkzaamheden</li>
                <li>• <strong>Bijzondere elementen:</strong> Vijvers, pergola's</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-forest-900 mb-4">Service Level</h3>
              <ul className="text-sm text-forest-700 space-y-2">
                <li>• <strong>Basis:</strong> Alleen maaien & wieden</li>
                <li>• <strong>Standaard:</strong> + snoeien & opruimen</li>
                <li>• <strong>Uitgebreid:</strong> + seizoensplanten</li>
                <li>• <strong>Premium:</strong> + advies & design</li>
                <li>• <strong>Frequentie:</strong> Wekelijks vs maandelijks</li>
                <li>• <strong>Flexibiliteit:</strong> Vaste dagen vs. op afroep</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-forest-900 mb-4">Externe Factoren</h3>
              <ul className="text-sm text-forest-700 space-y-2">
                <li>• <strong>Seizoen:</strong> Voorjaar/zomer duurder</li>
                <li>• <strong>Weer:</strong> Meer werk bij vochtige zomers</li>
                <li>• <strong>Materialen:</strong> Stijgende kosten planten/meststof</li>
                <li>• <strong>Afvalverwerking:</strong> Stortkosten tuinafval</li>
                <li>• <strong>Locatie:</strong> Regio-verschillen Friesland</li>
                <li>• <strong>Contractduur:</strong> Jaarcontract = korting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
            Veelgestelde Vragen
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Is het goedkoper om een jaarcontract af te sluiten?
              </summary>
              <p className="mt-3 text-forest-700">
                Ja, jaarcontracten zijn vaak 10-20% goedkoper dan losse bezoeken. Je krijgt 
                prioriteit bij planning, de hovenier kent je tuin beter, en je hebt zekerheid 
                over kosten. Veel hoveniers geven extra korting bij meerjarige contracten.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Wat gebeurt er als ik niet tevreden ben met het onderhoud?
              </summary>
              <p className="mt-3 text-forest-700">
                Serieuze hoveniers bieden garantie op hun werk. Bij ontevredenheid komen ze 
                binnen enkele dagen terug om het probleem op te lossen. Check dit altijd in 
                je contract. Een goede hovenier staat achter zijn werk en wil tevreden klanten.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Kan ik het onderhoud tijdelijk stopzetten (bijvoorbeeld in de winter)?
              </summary>
              <p className="mt-3 text-forest-700">
                De meeste contracten lopen door het hele jaar, maar met minder frequentie in 
                winter. Volledig stoppen is vaak niet mogelijk bij jaarcontracten. Bespreek 
                dit vooraf - sommige hoveniers bieden seizoenscontracten maart-oktober aan.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Moet ik zelf gereedschap en materialen leveren?
              </summary>
              <p className="mt-3 text-forest-700">
                Nee, professionele hoveniers brengen hun eigen gereedschap mee. Wel worden 
                materialen zoals planten, meststof en bestrijdingsmiddelen apart berekend. 
                Sommige hoveniers vragen een kleine toeslag voor water uit uw kraan.
              </p>
            </details>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-6 text-center">
              Gratis Offertes voor Tuinonderhoud
            </h2>
            <p className="text-forest-700 mb-8 text-center">
              Krijg binnen 24 uur contact van tot 3 hoveniers voor een passend onderhoudscontract
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