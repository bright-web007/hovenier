import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import NewLeadForm from "@/app/components/NewLeadForm"

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Stratenmaker - Bestrating & Hardscaping | Hovenier.frl',
  description: 'Professionele bestratingswerken in Friesland. Van opritten tot terrassen - vind ervaren stratenmakers voor al je hardscaping projecten.',
  keywords: 'stratenmaker, bestrating, oprit, terras, hardscaping, Friesland, straatklinkers, tuinpaden',
}

export default function StratenmakerPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = useTranslations('services.paving')
  
  // Simple translations for the form
  const formTranslations = {
    form_eyebrow: "Gratis Offerte",
    form_title: "Vraag direct een offerte aan",
    form_subtitle: "Ontvang binnen 24 uur contact van lokale stratenmakers",
    your_name: "Uw naam",
    municipality: "Gemeente",
    service: "Gewenste dienst",
    phone_number: "Telefoonnummer",
    send_request: "Verstuur aanvraag",
    form_note: "Door het versturen van dit formulier gaat u akkoord met onze voorwaarden."
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Stratenmaker & Bestrating
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Professionele hardscaping diensten in Friesland
          </p>
        </div>

        {/* Service Description */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-6">
              Deskundige Bestratingswerken
            </h2>
            <div className="prose prose-lg max-w-none text-forest-800">
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
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Onze Bestrating Specialisaties
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Opritten & Parkeerplaatsen</h3>
              <p className="text-forest-700 text-sm">
                Duurzame opritten van betonklinkers, natuursteen of asfalt. Inclusief drainage en fundering.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Terrassen & Patio's</h3>
              <p className="text-forest-700 text-sm">
                Stijlvolle buitenruimtes van keramiek, natuursteen, beton of hout. Op maat gemaakt voor uw tuin.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Tuinpaden & Borders</h3>
              <p className="text-forest-700 text-sm">
                Functionele en decoratieve paden door de tuin. Diverse materialen en patronen mogelijk.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Keermuren & Borders</h3>
              <p className="text-forest-700 text-sm">
                Steunmuren en borders van beton, natuursteen of stapelblokken voor hoogteverschillen.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Drainage & Riolering</h3>
              <p className="text-forest-700 text-sm">
                Professionele waterafvoer, drainagesystemen en riolering voor bestrate oppervlakken.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A.996.996 0 0118 6v2a1 1 0 11-2 0v-.277l-1.254.145a1 1 0 11-.992-1.736L14.984 6l-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.723V12a1 1 0 11-2 0v-1.277l-1.246-.855a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.277l1.246.855a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.277V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364.372l.254.145V16a1 1 0 112 0v1.021l.254-.145a1 1 0 11.992 1.736l-1.735.99a.995.995 0 01-1.022 0l-1.735-.99a1 1 0 01.128-1.608z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-forest-900 mb-3">Decoratieve Elementen</h3>
              <p className="text-forest-700 text-sm">
                Cirkelzagen, mozaïeken, ingelegd werk en andere decoratieve bestratingstechnieken.
              </p>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-forest-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
              Materialen & Opties
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Bestrating Materialen</h3>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Betonklinkers (diverse kleuren/formaten)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Natuursteen (hardsteen, graniet, basalt)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Keramische tegels (groot formaat)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Siergrind & stabilisatiematten
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Asfalt & steenslag (functioneel)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Speciale Technieken</h3>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Doorlatende bestrating (waterdoorlatend)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Vervorming bestendige constructies
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Antislip behandelingen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Geïntegreerde kantopsluiting
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    LED verlichting integratie
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Information */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
              Kostenoverzicht Bestrating
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Betonklinkers</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€45 - €75/m²</p>
                <p className="text-sm text-forest-700">Incl. zand/cement voegen</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Natuursteen</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€75 - €150/m²</p>
                <p className="text-sm text-forest-700">Afhankelijk van steensoort</p>
              </div>
              <div className="text-center bg-sage-50 rounded-lg p-6">
                <h3 className="font-semibold text-forest-900 mb-2">Keramische Tegels</h3>
                <p className="text-2xl font-bold text-sage-600 mb-2">€85 - €120/m²</p>
                <p className="text-sm text-forest-700">Groot formaat, op plots</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-forest-700">
              <p><strong>Inclusief:</strong> Grondwerk, fundering, zand/grind, leggen en afwerking</p>
              <p><strong>Exclusief:</strong> Eventuele vergunningen, rioolwerk, elektrische aansluitingen</p>
              <p><strong>Toeslag mogelijk voor:</strong> Zeer harde grond, beperkte toegankelijkheid, speciale patronen</p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-sage-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
              Het Bestratingsproces
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Opmeting & Advies</h3>
                  <p className="text-forest-700 text-sm">
                    Precieze opmeting, bodemonderzoek en advies over materialen en uitvoering.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Grondverzet & Fundering</h3>
                  <p className="text-forest-700 text-sm">
                    Uitgraven, fundatielaag aanbrengen en verdichten volgens PAV richtlijnen.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Zandbed & Kantopsluiting</h3>
                  <p className="text-forest-700 text-sm">
                    Aanbrengen zandbed en plaatsen van randen/kantopsluiting voor stabiliteit.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sage-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Leggen & Afwerking</h3>
                  <p className="text-forest-700 text-sm">
                    Professioneel leggen van bestrating, voegen en trillen voor optimale verdichting.
                  </p>
                </div>
              </div>
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
                Hoe lang gaat bestrating mee?
              </summary>
              <p className="mt-3 text-forest-700">
                Bij correcte aanleg en normaal gebruik gaan betonklinkers 25-30 jaar mee, 
                natuursteen 50+ jaar. De kwaliteit van de fundering is cruciaal voor levensduur. 
                Onderhoud bestaat voornamelijk uit voegen aanvullen en occasioneel schoonmaken.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Is een vergunning nodig voor bestrating?
              </summary>
              <p className="mt-3 text-forest-700">
                Voor bestrating van uw eigen terrein is meestal geen vergunning nodig. 
                Wel moet u zich houden aan de maximale verharding per perceel (check uw 
                bestemmingsplan). Bij aansluiting op de openbare weg kan een KLIC-melding 
                verplicht zijn.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Welk materiaal is het beste voor mijn situatie?
              </summary>
              <p className="mt-3 text-forest-700">
                Dit hangt af van gebruik, budget en esthetiek. Betonklinkers zijn veelzijdig 
                en betaalbaar, natuursteen is duurzamer maar duurder. Voor zwaar verkeer 
                (opritten) adviseren we verstevigde klinkers of natuursteen. Voor terrassen 
                zijn keramische tegels populair.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold text-forest-900 cursor-pointer">
                Wanneer is het beste seizoen voor bestratingswerkzaamheden?
              </summary>
              <p className="mt-3 text-forest-700">
                Bestrating kan bijna het hele jaar door, behalve bij vorst. Het beste seizoen 
                is maart-november. In de winter kan bij vorstvrij weer ook worden gewerkt. 
                Voor grote projecten plannen we bij voorkeur in droge perioden vanwege 
                grondcondities.
              </p>
            </details>
          </div>
        </section>

        {/* Lead Form */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-6 text-center">
              Gratis Offertes voor Bestratingswerk
            </h2>
            <p className="text-forest-700 mb-8 text-center">
              Krijg binnen 24 uur contact van tot 3 ervaren stratenmakers in jouw gemeente
            </p>
            <NewLeadForm 
              translations={formTranslations}
              locale={locale}
            />
          </div>
        </section>
      </div>
    </main>
  )
}