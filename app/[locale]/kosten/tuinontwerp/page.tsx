import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import NewLeadForm from '@/app/components/NewLeadForm'
import { getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Tuinontwerp Kosten - Wat Kost een Tuinarchitect? | Hovenier.frl',
    description: 'Wat kost professioneel tuinontwerp in Friesland? Ontdek alle prijzen voor tuinadvies, tekeningen, 3D visualisaties en complete tuinplannen.',
    keywords: 'tuinontwerp kosten, tuinarchitect prijzen, tuinplan kosten, 3D tuinontwerp, tuinadvies tarieven, Friesland tuinontwerp',
    alternates: getLocaleAlternates('/kosten/tuinontwerp', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static pricing content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function TuinontwerpKostenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat kost een professioneel tuinontwerp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een professioneel tuinontwerp kost €750-2500 in Friesland, afhankelijk van tuingrootte en complexiteit. Een basis schetsontwerp kost €350-750, een uitgewerkt tuinplan €1200-2500."
        }
      },
      {
        "@type": "Question",
        "name": "Wat krijg ik bij een tuinontwerp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een volledig tuinontwerp bevat: verkennend gesprek, schetsontwerp, plantenschema, materiaalspecificatie, kostenraming en vaak ook 3D visualisaties."
        }
      },
      {
        "@type": "Question",
        "name": "Hoeveel kost tuinadvies per uur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tuinadvies en -ontwerp kost €65-125 per uur, afhankelijk van ervaring en specialisatie van de tuonarchitect. Veel ontwerpers werken met vaste pakketten."
        }
      }
    ]
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Kosten', href: '/kosten' },
    { label: 'Tuinontwerp' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
              Tuinontwerp Kosten in Friesland
            </h1>
            <p className="text-xl text-forest-700 mb-8">
              Complete kostengids voor professioneel tuinontwerp & advies
            </p>
          </div>

          {/* Direct Answer Box */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-sage-600 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Direct Antwoord:</h2>
              <p className="text-lg leading-relaxed">
                Een professioneel tuinontwerp kost <strong>€750-2.500</strong> in Friesland. 
                Een basis schetsontwerp start vanaf <strong>€350-750</strong>, een uitgewerkt tuinplan met 
                3D visualisatie kost <strong>€1.200-2.500</strong>. Tuinadvies per uur kost <strong>€65-125</strong>.
              </p>
            </div>
          </section>

          {/* Design Package Comparison */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Tuinontwerp Pakketten & Prijzen
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Basis Advies */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sage-200">
                <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Basis Tuinadvies</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€350-750</div>
                  <div className="text-gray-600">Klein tot middel</div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Inclusief:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Locatiebezoek (2-3 uur)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>  
                      Inventarisatie wensen
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Schriftelijk adviesrapport
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Plantenadvies (15-25 soorten)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7-293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Globale kostenraming
                    </li>
                  </ul>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Ideaal voor: kleine tuinen, gedeeltelijke herinrichting
                </div>
              </div>

              {/* Standaard Ontwerp */}
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-sage-400">
                <div className="bg-sage-400 text-white px-3 py-1 rounded-full text-sm font-bold text-center mb-4">Populair</div>
                <div className="bg-sage-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                    <path d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM6 12a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Compleet Tuinplan</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€1.200-2.500</div>
                  <div className="text-gray-600">Middel tot grote tuin</div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Inclusief:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Uitgebreide analyse & bezoeken
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Technische tuintekening (schaal)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Beplantingsplan (40+ soorten)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Materiaalspecificatie
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Gedetailleerde kostenraming
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Aanlegadvies & begeleiding
                    </li>
                  </ul>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Ideaal voor: complete nieuwe tuinen, grote verbouwingen
                </div>
              </div>

              {/* Premium Design */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sage-200">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Premium + 3D</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€2.800-5.000</div>
                  <div className="text-gray-600">Luxe & exclusief</div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Extra inclusief:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      3D visualisaties (meerdere hoeken)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Seizoen impressies
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Exclusieve plantencombinaties
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Lichtplan ontwerp
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Persoonlijke projectbegeleiding
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      1 jaar nazorg & garantie
                    </li>
                  </ul>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Ideaal voor: exclusieve tuinen, complex ontwerp
                </div>
              </div>
            </div>
          </section>

          {/* Hourly Rate Breakdown */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Uurtarieven Tuinontwerp & Advies
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <table className="w-full">
                <thead className="bg-sage-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-forest-900">Service Type</th>
                    <th className="text-right py-4 px-6 font-bold text-forest-900">Uurtarief</th>
                    <th className="text-center py-4 px-6 font-bold text-forest-900">Typische Duur</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Locatie Analyse & Adviesgesprek</div>
                      <div className="text-sm text-gray-600">Terreinbezoek, inventarisatie, quick-scan</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€65-85</td>
                    <td className="text-center py-4 px-6 font-semibold">2-4 uur</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Schetsontwerp & Plantenkeuze</div>
                      <div className="text-sm text-gray-600">Eerste ontwerp, plantenadvies, concepttekening</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€75-95</td>
                    <td className="text-center py-4 px-6 font-semibold">4-8 uur</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Technische Uitwerking</div>
                      <div className="text-sm text-gray-600">CAD tekening, materiaalspecificatie, meetstaat</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€85-110</td>
                    <td className="text-center py-4 px-6 font-semibold">6-12 uur</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">3D Visualisatie & Rendering</div>
                      <div className="text-sm text-gray-600">Fotorealistische beelden, seizoenimpressies</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€95-125</td>
                    <td className="text-center py-4 px-6 font-semibold">4-8 uur</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Projectbegeleiding</div>
                      <div className="text-sm text-gray-600">Aanlegadvies, kwaliteitscontrole, nazorg</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€75-100</td>
                    <td className="text-center py-4 px-6 font-semibold">Variabel</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* What Influences Design Costs */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Wat Beïnvloedt Tuinontwerp Kosten?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-forest-900 mb-6">Kostenverhogend</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Grote tuinoppervlakte ({'>'}200m²)</div>
                      <div className="text-sm text-gray-600">Meer tijd voor analyse en ontwerp</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Complexe terreinomstandigheden</div>
                      <div className="text-sm text-gray-600">Hellingen, slecht drainage, oude beplanting</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Speciale elementen gewenst</div>
                      <div className="text-sm text-gray-600">Vijvers, pergola's, speciale verharding</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Luxe/premium ontwerper</div>
                      <div className="text-sm text-gray-600">Bekende namen, specialistische expertise</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-forest-900 mb-6">Kostenbesparend</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Kleinere tuin ({'<'}100m²)</div>
                      <div className="text-sm text-gray-600">Minder complexiteit en analysetijd</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Eenvoudige terreinomstandigheden</div>
                      <div className="text-sm text-gray-600">Vlak terrein, geen grote obstakels</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Basis ontwerppakket</div>
                      <div className="text-sm text-gray-600">Geen 3D visualisaties, standaard aanpak</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-semibold">Duidelijke wensen & snelle beslissingen</div>
                      <div className="text-sm text-gray-600">Minder revisies en aanpassingsrondes</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Veelgestelde Vragen over Tuinontwerp Kosten
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Krijg ik eigendomsrecht op het tuinontwerp?
                </h3>
                <p className="text-forest-700">
                  Ja, na volledige betaling krijgt u alle rechten op uw tuinontwerp. U kunt het ontwerp gebruiken 
                  voor aanleg door elke hovenier. Sommige ontwerpers behouden wel het recht om het ontwerp in hun portfolio te gebruiken.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Hoeveel revisierondes zijn inbegrepen?
                </h3>
                <p className="text-forest-700">
                  De meeste ontwerpers rekenen 2-3 revisierondes in bij hun standaardprijzen. Elke extra revisie 
                  kost meestal €150-300 extra, afhankelijk van de omvang van de aanpassingen.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Kan de ontwerper ook de aanleg begeleiden?
                </h3>
                <p className="text-forest-700">
                  Ja, veel tuinarchitecten bieden projectbegeleiding aan voor €75-100 per uur. Dit omvat aanlegadvies, 
                  kwaliteitscontrole en nazorg. Dit zorgt ervoor dat uw ontwerp precies wordt uitgevoerd zoals bedoeld.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-sage-600 to-forest-600 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">
                Klaar voor uw droomtuinontwerp?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Vergelijk offertes van ervaren tuinarchitecten in Friesland
              </p>
              <div className="max-w-md mx-auto">
                <NewLeadForm 
                  locale={locale}
                  serviceType="tuinontwerp"
                  translations={{
                    form_eyebrow: locale === 'en' ? 'Free & No Obligations' : 'Gratis & vrijblijvend',
                    form_title: locale === 'en' ? 'Request Quote' : 'Vraag een offerte aan',
                    form_subtitle: locale === 'en' ? 'Get responses within 24 hours from gardeners in your area.' : 'Ontvang binnen 24 uur reacties van hoveniers in uw regio.',
                    your_name: locale === 'en' ? 'Your name' : 'Uw naam',
                    municipality: locale === 'en' ? 'Municipality' : 'Gemeente',
                    service: locale === 'en' ? 'Service' : 'Dienst',
                    phone_number: locale === 'en' ? 'Phone number' : 'Telefoonnummer',
                    send_request: locale === 'en' ? 'Send Request' : 'Verstuur aanvraag',
                    form_note: locale === 'en' ? 'Completely free · no spam · GDPR compliant' : 'Volledig gratis · geen spam · AVG-conform',
                    select_municipality: locale === 'en' ? 'Select municipality' : 'Selecteer gemeente',
                    what_do_you_need: locale === 'en' ? 'What do you need?' : 'Wat heeft u nodig?',
                    your_company: locale === 'en' ? 'Your company' : 'Uw bedrijf',
                    loading: locale === 'en' ? 'Loading...' : 'Versturen...',
                    privacy_agreement: locale === 'en' ? 'I agree to the' : 'Ik ga akkoord met het',
                    privacy_link: locale === 'en' ? 'privacy policy' : 'privacybeleid',
                    privacy_consent: locale === 'en' ? 'and consent to processing my data.' : 'en geef toestemming voor het verwerken van mijn gegevens.',
                    services: {
                      tuinonderhoud: locale === 'en' ? 'Garden Maintenance' : 'Tuinonderhoud',
                      tuinontwerp: locale === 'en' ? 'Garden Design' : 'Tuinontwerp',
                      'tuin-aanleggen': locale === 'en' ? 'Garden Installation' : 'Tuin Aanleggen',
                      stratenmaker: locale === 'en' ? 'Paving' : 'Bestrating',
                      groendak: locale === 'en' ? 'Green Roof' : 'Groendak',
                      overig: locale === 'en' ? 'Other' : 'Overig'
                    }
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
