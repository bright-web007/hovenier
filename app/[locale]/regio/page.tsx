import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Hovenier per Gemeente in Friesland | Hovenier.frl',
  description: 'Vind lokale hoveniers in alle 11 Friese gemeenten. Van Leeuwarden tot Harlingen - bekijk welke tuinspecialisten actief zijn in jouw gemeente.',
  keywords: 'hovenier per gemeente, Friesland hoveniers, lokale tuinman, gemeente hovenier',
}

const frieslanders = [
  { name: 'Leeuwarden', slug: 'leeuwarden', population: '123.000', description: 'Hoofdstad van Friesland met diverse tuinspecialisten' },
  { name: 'Súdwest-Fryslân', slug: 'sudwest-fryslan', population: '89.000', description: 'Grootste gemeente van Friesland, veel landelijke tuinen' },
  { name: 'Smallingerland', slug: 'smallingerland', population: '56.000', description: 'Rond Drachten, mix van stedelijk en landelijk' },
  { name: 'Heerenveen', slug: 'heerenveen', population: '50.000', description: 'Sportstad met mooie woonwijken en tuinen' },
  { name: 'Achtkarspelen', slug: 'achtkarspelen', population: '28.000', description: 'Landelijke gemeente, veel boerderiatapijten' },
  { name: 'Tietjerksteradiel', slug: 'tietjerksteradiel', population: '25.000', description: 'Groene gemeente tussen Leeuwarden en Groningen' },
  { name: 'Dantumadiel', slug: 'dantumadiel', population: '19.000', description: 'Kleinste gemeente, persoonlijke service' },
  { name: 'De Fryske Marren', slug: 'de-fryske-marren', population: '51.000', description: 'Waterrijke gemeente, unieke tuin uitdagingen' },
  { name: 'Waadhoeke', slug: 'waadhoeke', population: '46.000', description: 'Kustgemeente, speciale klimatologische omstandigheden' },
  { name: 'Noardeast-Fryslân', slug: 'noardeast-fryslan', population: '45.000', description: 'Noordoosthoek, traditionele Friese tuinen' },
  { name: 'Harlingen', slug: 'harlingen', population: '16.000', description: 'Historische havenstad, klassieke stadstuinen' },
]

export default function RegioHubPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('pages.regions')

  return (
    <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Hoveniers per Gemeente
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Vind lokale tuinspecialisten in alle 11 Friese gemeenten
          </p>
        </div>

        {/* Friesland Map or Visual */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-6 text-center">
              Waarom Lokale Hoveniers?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-2">Korte Afstand</h3>
                <p className="text-forest-700 text-sm">Lagere reiskosten en snellere service door nabijheid</p>
              </div>
              <div className="text-center">
                <div className="bg-forest-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 6.414V12z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-2">Lokale Kennis</h3>
                <p className="text-forest-700 text-sm">Bekend met bodemsoort, klimaat en lokale voorschriften</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-2">Persoonlijke Service</h3>
                <p className="text-forest-700 text-sm">Nabije relatie, beter begrip van uw wensen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gemeente Grid */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Kies uw Gemeente
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frieslanders.map((gemeente) => (
              <div key={gemeente.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-forest-900 mb-2">
                    {gemeente.name}
                  </h3>
                  <p className="text-sm text-forest-600 mb-3">{gemeente.population} inwoners</p>
                  <p className="text-forest-700 text-sm mb-4">{gemeente.description}</p>
                  <a 
                    href={`/regio/${gemeente.slug}`}
                    className="inline-block w-full text-center bg-sage-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-sage-700 transition-colors"
                  >
                    Bekijk Hoveniers →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Services by Region */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-forest-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
              Populaire Diensten per Regio
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Stedelijke Gemeenten</h3>
                <p className="text-forest-700 text-sm mb-3">(Leeuwarden, Heerenveen, Smallingerland)</p>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Kleine tuinen & achtertuinen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Tuinverbouwing & modernisering
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Groendaken & duurzaamheid
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-sage-600 rounded-full mr-3"></span>
                    Bestrating & terrassen
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-forest-900 mb-4">Landelijke Gemeenten</h3>
                <p className="text-forest-700 text-sm mb-3">(Súdwest-Fryslân, Achtkarspelen, etc.)</p>
                <ul className="space-y-2 text-forest-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Grote tuinen & landschappen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Boomverzorging & heggen
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Traditioneel tuinbeheer
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                    Ecologisch tuinbeheer
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Statistics */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
              Hoveniers in Friesland
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-sage-600 mb-2">150+</p>
                <p className="text-forest-700 font-medium">Aangesloten Hoveniers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-forest-600 mb-2">11</p>
                <p className="text-forest-700 font-medium">Gemeenten Dekking</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600 mb-2">24u</p>
                <p className="text-forest-700 font-medium">Gemiddelde Reactietijd</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 mb-2">4.8/5</p>
                <p className="text-forest-700 font-medium">Gemiddelde Beoordeling</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}