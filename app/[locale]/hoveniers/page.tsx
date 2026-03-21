import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import GardenerCard from '../../components/GardenerCard'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Hoveniers Directory - Vind uw Tuinspecialist | Hovenier.frl',
  description: 'Doorzoek onze database van gekwalificeerde hoveniers in Friesland. Filter op gemeente, specialisatie, beoordelingen en beschikbaarheid.',
  keywords: 'hoveniers directory, tuinman zoeken, Friesland hoveniers, tuinspecialist vinden, tuinonderhoud, tuinontwerp',
}

// Sample gardener data - In production this would come from API/database
const sampleGardeners = [
  {
    name: "Jan de Vries",
    company: "TuinService Friesland",
    slug: "tuinservice-friesland",
    location: "Leeuwarden",
    specialties: ["Tuinonderhoud", "Tuinontwerp", "Groendak"],
    rating: 4.8,
    reviewCount: 23,
    verified: true,
    responseTime: "< 2 uur",
    startingPrice: 35,
    availability: 'available' as const
  },
  {
    name: "Marie Bakker",
    company: "Groene Vingers",
    slug: "groene-vingers",
    location: "Heerenveen", 
    specialties: ["Tuinontwerp", "Stratenmaker", "Tuin Aanleggen"],
    rating: 4.9,
    reviewCount: 41,
    verified: true,
    responseTime: "< 1 uur",
    startingPrice: 40,
    availability: 'available' as const
  },
  {
    name: "Piet Janssen",
    company: "Friese Tuinen",
    slug: "friese-tuinen",
    location: "Smallingerland",
    specialties: ["Tuinonderhoud", "Tuin Aanleggen"],
    rating: 4.6,
    reviewCount: 18,
    verified: false,
    responseTime: "< 4 uur",
    startingPrice: 32,
    availability: 'busy' as const
  },
  {
    name: "Anna Smit",
    company: "Duurzame Tuinen",
    slug: "duurzame-tuinen", 
    location: "Ooststellingwerf",
    specialties: ["Groendak", "Tuinontwerp"],
    rating: 4.7,
    reviewCount: 15,
    verified: true,
    responseTime: "< 3 uur",
    startingPrice: 38,
    availability: 'available' as const
  },
  {
    name: "Tom van der Berg",
    company: "Berg Hoveniers",
    slug: "berg-hoveniers",
    location: "Weststellingwerf", 
    specialties: ["Tuinonderhoud", "Stratenmaker"],
    rating: 4.5,
    reviewCount: 27,
    verified: true,
    responseTime: "< 2 uur",
    startingPrice: 34,
    availability: 'available' as const
  }
]

export default function HoveniersDirectoryPage({ params: { locale } }: Props) {
  setRequestLocale(locale)

  return (
    <>
      <Navigation locale={locale} />
      
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
              Hoveniers Directory
            </h1>
            <p className="text-xl text-forest-700 mb-8 max-w-2xl mx-auto">
              Vind de perfecte tuinspecialist voor uw project. Alle hoveniers zijn geverifieerd en beoordeeld door echte klanten.
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
                    <option value="ooststellingwerf">Ooststellingwerf</option>
                    <option value="weststellingwerf">Weststellingwerf</option>
                    <option value="opsterland">Opsterland</option>
                    <option value="achtkarspelen">Achtkarspelen</option>
                    <option value="tytsjerksteradiel">Tytsjerksteradiel</option>
                    <option value="de-fryske-marren">De Fryske Marren</option>
                    <option value="sudwest-fryslan">Súdwest-Fryslân</option>
                    <option value="waadhoeke">Waadhoeke</option>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-forest-700">
                <span className="font-semibold">{sampleGardeners.length}</span> hoveniers gevonden in <span className="font-semibold">Alle gemeenten</span>
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

          {/* Directory Results */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="grid gap-6">
              {sampleGardeners.map((gardener, index) => (
                <GardenerCard
                  key={`${gardener.slug}-${index}`}
                  name={gardener.name}
                  company={gardener.company}
                  slug={gardener.slug}
                  location={gardener.location}
                  specialties={gardener.specialties}
                  rating={gardener.rating}
                  reviewCount={gardener.reviewCount}
                  verified={gardener.verified}
                  responseTime={gardener.responseTime}
                  startingPrice={gardener.startingPrice}
                  availability={gardener.availability}
                />
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto text-center bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-4">
              Geen passende hovenier gevonden?
            </h2>
            <p className="text-forest-600 mb-8">
              Vraag een gratis offerte aan en wij verbinden u met de beste hoveniers in uw regio.
            </p>
            <button className="bg-sage-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors">
              Gratis Offerte Aanvragen
            </button>
          </section>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  )
}