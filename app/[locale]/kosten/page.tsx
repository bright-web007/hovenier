import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Kosten Hovenier - Prijsgids Tuinonderhoud | Hovenier.frl',
  description: 'Wat kost een hovenier? Ontdek alle prijzen voor tuinonderhoud, tuinaanleg, groendaken en meer. Transparante kostengids met actuele tarieven in Friesland.',
  keywords: 'hovenier kosten, tuinonderhoud prijzen, hovenier per uur, tuinaanleg kosten, Friesland',
}

export default function KostenHubPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = useTranslations('pages.costs')

  return (
    <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Kosten Hovenier
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Transparante prijsgids voor alle hovenierdiensten in Friesland
          </p>
        </div>

        {/* Quick Overview */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-6 text-center">
              Gemiddelde Kosten Overzicht
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Per Uur</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€35 - €55</p>
                <p className="text-sm text-forest-700">Afhankelijk van ervaring & regio</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Maandelijks Onderhoud</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€150 - €400</p>
                <p className="text-sm text-forest-700">Gemiddelde tuin 200-500m²</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Tuinaanleg</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€50 - €150/m²</p>
                <p className="text-sm text-forest-700">Complete nieuwe tuin</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Guide Links */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Gedetailleerde Kostengidsen
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Hourly Rates - Most Important */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-sage-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Kosten per Uur</h3>
                  <span className="bg-white text-sage-600 text-xs px-2 py-1 rounded-full font-medium">Meest Gezocht</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-forest-700 mb-4 text-sm">
                  Wat kost een hovenier per uur? Ontdek alle uurtarieven, regionale verschillen en factoren die de prijs beïnvloeden.
                </p>
                <div className="text-2xl font-bold text-sage-600 mb-3">€35 - €55</div>
                <p className="text-xs text-forest-600 mb-4">Per uur exclusief materialen</p>
                <a 
                  href="/kosten/hovenier-per-uur" 
                  className="inline-block w-full text-center bg-sage-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-sage-700 transition-colors"
                >
                  Bekijk Volledige Gids
                </a>
              </div>
            </div>

            {/* Garden Maintenance Costs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-forest-600 px-6 py-4">
                <h3 className="text-white font-semibold">Tuinonderhoud Kosten</h3>
              </div>
              <div className="p-6">
                <p className="text-forest-700 mb-4 text-sm">
                  Maandelijkse en jaarlijkse kosten voor regelmatig tuinonderhoud door professionals.
                </p>
                <div className="text-2xl font-bold text-forest-600 mb-3">€150 - €400</div>
                <p className="text-xs text-forest-600 mb-4">Per maand voor gemiddelde tuin</p>
                <a 
                  href="/kosten/tuinonderhoud" 
                  className="inline-block w-full text-center bg-forest-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-forest-700 transition-colors"
                >
                  Bekijk Kosten
                </a>
              </div>
            </div>

            {/* Garden Installation */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-emerald-600 px-6 py-4">
                <h3 className="text-white font-semibold">Tuin Aanleggen</h3>
              </div>
              <div className="p-6">
                <p className="text-forest-700 mb-4 text-sm">
                  Complete kostenoverzicht voor nieuwe tuinaanleg van ontwerp tot oplevering.
                </p>
                <div className="text-2xl font-bold text-emerald-600 mb-3">€8.000 - €35.000</div>
                <p className="text-xs text-forest-600 mb-4">Afhankelijk van grootte & complexiteit</p>
                <a 
                  href="/kosten/tuin-aanleggen" 
                  className="inline-block w-full text-center bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Zie Prijzen
                </a>
              </div>
            </div>

            {/* Green Roof Costs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-teal-600 px-6 py-4">
                <h3 className="text-white font-semibold">Groendak Kosten</h3>
              </div>
              <div className="p-6">
                <p className="text-forest-700 mb-4 text-sm">
                  Investering in sedum daken, subsidies en lange termijn besparingen.
                </p>
                <div className="text-2xl font-bold text-teal-600 mb-3">€45 - €85/m²</div>
                <p className="text-xs text-forest-600 mb-4">Inclusief installatie</p>
                <a 
                  href="/kosten/groendak" 
                  className="inline-block w-full text-center bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Groendak Prijzen
                </a>
              </div>
            </div>

            {/* Garden Design */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-purple-600 px-6 py-4">
                <h3 className="text-white font-semibold">Tuinontwerp Kosten</h3>
              </div>
              <div className="p-6">
                <p className="text-forest-700 mb-4 text-sm">
                  Kosten voor professioneel tuinontwerp en landschapsarchitectuur.
                </p>
                <div className="text-2xl font-bold text-purple-600 mb-3">€750 - €2.500</div>
                <p className="text-xs text-forest-600 mb-4">Per ontwerpproject</p>
                <a 
                  href="/kosten/tuinontwerp" 
                  className="inline-block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Ontwerp Tarieven
                </a>
              </div>
            </div>

            {/* Paving Costs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-600 px-6 py-4">
                <h3 className="text-white font-semibold">Bestrating Kosten</h3>
              </div>
              <div className="p-6">
                <p className="text-forest-700 mb-4 text-sm">
                  Prijzen voor terrassen, opritten, tuinpaden en andere hardscaping projecten.
                </p>
                <div className="text-2xl font-bold text-gray-600 mb-3">€45 - €150/m²</div>
                <p className="text-xs text-forest-600 mb-4">Afhankelijk van materiaal</p>
                <a 
                  href="/kosten/stratenmaker" 
                  className="inline-block w-full text-center bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Bestrating Prijzen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Factors */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-forest-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
              Welke Factoren Bepalen de Kosten?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Tuinfactoren</h3>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Tuingrootte en vorm
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Toegankelijkheid (poorten, trappen)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Grondsoort en bodemgesteldheid
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Bestaande beplanting en obstakels
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Hoeveelheid afval en transport
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Service Factoren</h3>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Type werk (onderhoud vs. aanleg)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Seizoen en weersomstandigheden
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Urgentie van de werkzaamheden
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Ervaring en specialisatie hovenier
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Lokale vraag en aanbod
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Price Differences */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
              Regionale Prijsverschillen in Friesland
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Leeuwarden & Omgeving</h3>
                <p className="text-lg font-bold text-sage-600 mb-2">Gemiddeld - Hoog</p>
                <p className="text-sm text-forest-700">Grotere vraag, meer specialisten</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Grote Gemeenten</h3>
                <p className="text-lg font-bold text-sage-600 mb-2">Gemiddeld</p>
                <p className="text-sm text-forest-700">Heerenveen, Smallingerland</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Landelijke Gebieden</h3>
                <p className="text-lg font-bold text-sage-600 mb-2">Laag - Gemiddeld</p>
                <p className="text-sm text-forest-700">Mogelijk lagere tarieven, meer reistijd</p>
              </div>
            </div>
          </div>
        </section>

        {/* Money Saving Tips */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-sage-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
              Tips om Kosten te Besparen
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900">Plan Vooruit</h4>
                    <p className="text-sm text-forest-700">Boek in het laagseizoen (winter) voor werk in het voorjaar</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900">Vergelijk Meerdere Offertes</h4>
                    <p className="text-sm text-forest-700">Krijg altijd 2-3 offertes voor grote projecten</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900">Combineer Werkzaamheden</h4>
                    <p className="text-sm text-forest-700">Laat meerdere karweitjes tegelijk uitvoeren</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900">Zelf Voorbereiden</h4>
                    <p className="text-sm text-forest-700">Ruim obstakels op en zorg voor goede toegankelijkheid</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900">Regulier Onderhoud</h4>
                    <p className="text-sm text-forest-700">Voorkom dure reparaties door preventief onderhoud</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-sage-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs">💡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900">Lokale Hoveniers</h4>
                    <p className="text-sm text-forest-700">Kies professionals uit uw gemeente voor lagere reiskosten</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}