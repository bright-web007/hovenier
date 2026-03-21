import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Hoveniers Directory - Vind uw Tuinspecialist | Hovenier.frl',
  description: 'doorzoek onze database van gekwalificeerde hoveniers in Friesland. Filter op gemeente, specialisatie, beoordelingen en beschikbaarheid.',
  keywords: 'hoveniers directory, tuinman zoeken, Friesland hoveniers, tuinspecialist vinden',
}

export default function HoveniersDirectoryPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Hoveniers Directory
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Vind de perfecte tuinspecialist voor uw project
          </p>
        </div>

        {/* Search & Filters */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-6 text-center">
              Zoek & Filter Hoveniers
            </h2>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div>
                <label htmlFor="gemeente" className="block text-sm font-medium text-forest-700 mb-2">
                  Gemeente
                </label>
                <select
                  id="gemeente"
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                >
                  <option value="">Alle gemeenten</option>
                  <option value="leeuwarden">Leeuwarden</option>
                  <option value="heerenveen">Heerenveen</option>
                  <option value="smallingerland">Smallingerland</option>
                  {/* Add all 11 gemeenten */}
                </select>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-forest-700 mb-2">
                  Service Type
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                >
                  <option value="">Alle diensten</option>
                  <option value="tuinonderhoud">Tuinonderhoud</option>
                  <option value="tuinontwerp">Tuinontwerp</option>
                  <option value="groendak">Groendak</option>
                  <option value="tuin-aanleggen">Tuin Aanleggen</option>
                  <option value="stratenmaker">Bestrating</option>
                </select>
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-forest-700 mb-2">
                  Minimale Rating
                </label>
                <select
                  id="rating"
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                >
                  <option value="">Alle ratings</option>
                  <option value="4.5">4.5+ sterren</option>
                  <option value="4.0">4.0+ sterren</option>
                  <option value="3.5">3.5+ sterren</option>
                </select>
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-forest-700 mb-2">
                  Beschikbaarheid
                </label>
                <select
                  id="availability"
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                >
                  <option value="">Alle</option>
                  <option value="immediate">Direct beschikbaar</option>
                  <option value="week">Binnen 1 week</option>
                  <option value="month">Binnen 1 maand</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button 
                type="button"
                className="bg-sage-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors"
              >
                Zoeken
              </button>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <section className="max-w-6xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            <p className="text-forest-700">
              <span className="font-semibold">147</span> hoveniers gevonden in <span className="font-semibold">Alle gemeenten</span>
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-forest-600">Sorteer op:</span>
              <select className="px-3 py-1 border border-sage-300 rounded text-sm">
                <option>Relevantie</option>
                <option>Rating (hoog-laag)</option>
                <option>Afstand</option>
                <option>Naam (A-Z)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Directory Results (Placeholder for Dynamic Content) */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid gap-6">
            {/* Example Hovenier Card - This would be dynamic */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-forest-900">TuinService Friesland</h3>
                      <p className="text-forest-600">Leeuwarden & Omgeving</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-forest-700 font-medium">4.8 (23 reviews)</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm">Tuinonderhoud</span>
                      <span className="bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-sm">Tuinontwerp</span>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">Groendak</span>
                    </div>
                    <p className="text-forest-700 text-sm">
                      Ervaren tuinspecialist met 15+ jaar ervaring in Friesland. Gespecialiseerd in 
                      duurzaam tuinbeheer en ecologische tuinontwerpen.
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-forest-600 space-x-4">
                    <span>📍 5km van u</span>
                    <span>💰 €42-48/uur</span>
                    <span>🕐 Beschikbaar deze week</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <button className="bg-sage-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-sage-700 transition-colors w-full md:w-auto">
                    Bekijk Profiel
                  </button>
                  <p className="text-xs text-forest-600 mt-2">Lid sinds 2020</p>
                </div>
              </div>
            </div>

            {/* More hovenier cards would be dynamically generated here */}
            <div className="text-center py-8">
              <p className="text-forest-600 mb-4">Dit is een dynamische pagina die hoveniers uit de database toont</p>
              <p className="text-sm text-forest-500">
                Filtering en zoeken wordt client-side afgehandeld of via API calls
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-sage-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-forest-900 mb-4">
              Niet de juiste hovenier gevonden?
            </h2>
            <p className="text-forest-700 mb-6">
              Laat ons voor u zoeken! Vul onze vragenlijst in en wij matchen u met de perfecte tuinspecialist.
            </p>
            <a 
              href="/#lead-form"
              className="inline-block bg-sage-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors"
            >
              Gratis Matching Service →
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}