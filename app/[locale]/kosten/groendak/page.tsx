import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import NewLeadForm from '@/app/components/NewLeadForm'
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Groendak Kosten 2026 | Prijs per m² + Subsidie Overzicht | Hovenier.frl',
    description: 'Wat kost een groendak? Extensief sedumdak €40–€90/m². Volledig kostenoverzicht per type groendak, inclusief Friesland subsidies. Gratis offertes vergelijken.',
    keywords: 'groendak kosten, kosten groendak, wat kost een groendak, groendak aanleggen kosten, kosten groendak per m2, groendak kosten per m2, subsidie groendak friesland',
    alternates: getLocaleAlternates('/kosten/groendak', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static pricing content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function GroendakKostenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = createTranslator(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat kost een groendak per m²?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een extensief sedumdak kost €40–€60 per m², semi-intensief €60–€90 per m², en intensief €80–€150 per m². Voor een sedumdak van 30 m² betaalt u €1.200–€1.800 inclusief aanleg."
        }
      },
      {
        "@type": "Question",
        "name": "Welke subsidie is er voor een groendak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leeuwarden biedt tot €15 per m² groendak subsidie. Súdwest-Fryslân heeft klimaatadaptatie subsidie (bedrag varieert per aanvraagperiode). Smallingerland heeft incidentele subsidieronden."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe lang gaat een groendak mee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een goed aangelegd groendak gaat 30-50 jaar mee en beschermt de dakbedekking tegen weersinvloeden. Jaarlijks onderhoud kost €1–€3 per m²."
        }
      }
    ]
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: 'Kosten', href: localizePath('/kosten', locale as SupportedLocale) },
    { label: 'Groendak' }
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
              Groendak Kosten & Subsidies in Friesland
            </h1>
            <p className="text-xl text-forest-700 mb-8">
              Complete kostengids voor groendaken inclusief beschikbare subsidies
            </p>
          </div>

          {/* Direct Answer Box */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-sage-600 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Direct Antwoord:</h2>
              <p className="text-lg leading-relaxed">
                Een extensief groendak (sedumdak) kost <strong>€85-120 per m²</strong> all-in. 
                Een intensief groendak kost <strong>€150-250 per m²</strong>. 
                Met subsidies kunt u <strong>€25-50 per m²</strong> besparen. Een groendak van 50m² kost dus 
                €4.250-6.000 (extensief) of €7.500-12.500 (intensief) voor subsidie.
              </p>
            </div>
          </section>

          {/* Cost Comparison */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Groendak Types & Kosten
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Extensief Groendak */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sage-200">
                <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Extensief Groendak</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€85-120/m²</div>
                  <div className="text-green-600 font-semibold">Incl. subsidie: €60-95/m²</div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Ideaal voor:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Flatdaken tot 30° hellingshoek
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>  
                      Draagkracht 80-150 kg/m²
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Weinig onderhoud gewenst  
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Inclusief:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Sedum planten (8-12 variëteiten)</li>
                    <li>• Groendaksubstraat (6cm dik)</li>
                    <li>• Worteldoek en beschermlaag</li>
                    <li>• Drainage en waterafvoer</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Onderhoud: €3-8/m² per jaar</div>
                </div>
              </div>

              {/* Intensief Groendak */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sage-200">
                <div className="bg-forest-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Intensief Groendak</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€150-250/m²</div>
                  <div className="text-green-600 font-semibold">Incl. subsidie: €125-225/m²</div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Ideaal voor:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Begaanbare daken
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Draagkracht 200-500 kg/m²
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Recreatief gebruik gewenst
                    </li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Inclusief:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Grassen, kruiden en kleine struiken</li>
                    <li>• Voedingsrijk substraat (15-25cm)</li>
                    <li>• Irrigatiesysteem</li>
                    <li>• Begaanbare paden (optioneel)</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Onderhoud: €15-25/m² per jaar</div>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Cost Breakdown */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Gedetailleerde Kostenverdeling
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <table className="w-full">
                <thead className="bg-sage-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-forest-900">Onderdeel</th>
                    <th className="text-right py-4 px-6 font-bold text-forest-900">Extensief</th>
                    <th className="text-right py-4 px-6 font-bold text-forest-900">Intensief</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Dakconstructie Check</div>
                      <div className="text-sm text-gray-600">Statische analyse, isolatie</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€8-12/m²</td>
                    <td className="text-right py-4 px-6 font-semibold">€12-18/m²</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Waterafvoer & Drainage</div>
                      <div className="text-sm text-gray-600">Dakgoten, afvoerpijpen, filters</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€15-25/m²</td>
                    <td className="text-right py-4 px-6 font-semibold">€20-30/m²</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Worteldoek & Beschermlagen</div>
                      <div className="text-sm text-gray-600">Anti-wortel, filter, bescherming</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€12-18/m²</td>
                    <td className="text-right py-4 px-6 font-semibold">€15-25/m²</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Substraat & Grond</div>
                      <div className="text-sm text-gray-600">Extensief 6cm / Intensief 15-25cm</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€20-30/m²</td>
                    <td className="text-right py-4 px-6 font-semibold">€35-60/m²</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Beplanting</div>
                      <div className="text-sm text-gray-600">Sedum matten / Grassen & kruiden</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€15-25/m²</td>
                    <td className="text-right py-4 px-6 font-semibold">€35-75/m²</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Irrigatie (optioneel)</div>
                      <div className="text-sm text-gray-600">Druppelirrigatie systeem</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€8-15/m²</td>
                    <td className="text-right py-4 px-6 font-semibold">€15-25/m²</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Installatie & Arbeid</div>
                      <div className="text-sm text-gray-600">Professionele installatie</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€15-25/m²</td>
                    <td className="text-right py-4 px-6 font-semibold">€25-40/m²</td>
                  </tr>
                  <tr className="bg-sage-50">
                    <td className="py-4 px-6 font-bold">Totaal</td>
                    <td className="text-right py-4 px-6 font-bold text-lg">€85-120/m²</td>
                    <td className="text-right py-4 px-6 font-bold text-lg">€150-250/m²</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Subsidies Section */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Beschikbare Subsidies in Friesland
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-8a2 2 0 00-2-2h-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-forest-900 mb-4 text-center">Gemeente Subsidies</h3>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">€25-50/m²</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Leeuwarden: max €25/m²</li>
                  <li>• Heerenveen: max €30/m²</li>
                  <li>• Smallingerland: max €35/m²</li>
                  <li>• Andere gemeenten: €20-40/m²</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A1.8 1.8 0 0016.2 13l-1.8-1.8h-8.4L4.2 13A1.8 1.8 0 002 11.57V8a2 2 0 012-2h2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-forest-900 mb-4 text-center">Provincie Friesland</h3>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">€15-25/m²</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Verduurzaming subsidie</li>
                  <li>• Klimaatadaptatie regeling</li>
                  <li>• Max 50% van de kosten</li>
                  <li>• Check actuele voorwaarden</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-forest-900 mb-4 text-center">Rijkssubsidies</h3>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-purple-600">Tot €1000</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• SEEH subsidie (tot €1000)</li>
                  <li>• Isolatie subsidie</li>
                  <li>• BTW teruggave (21% → 9%)</li>
                  <li>• Investeringsaftrek</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-forest-700 text-lg">
                <strong>Tip:</strong> Subsidies zijn vaak beperkt beschikbaar op basis van &apos;eerst komen, eerst maalt&apos;. 
                Plan uw groendak project vroeg in het jaar voor de beste kans op subsidie.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Veelgestelde Vragen over Groendak Kosten
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Hoeveel kan ik besparen op energiekosten met een groendak?
                </h3>
                <p className="text-forest-700">
                  Een groendak bespaart 10-30% op koeling in de zomer en 5-15% op verwarming in de winter. 
                  Voor een gemiddelde woning is dat €200-500 per jaar. Het groendak betaalt zichzelf terug in 8-15 jaar.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Is mijn dak geschikt voor een groendak?
                </h3>
                <p className="text-forest-700">
                  Uw dak moet een draagkracht hebben van minimaal 80 kg/m² voor extensief en 200 kg/m² voor intensief. 
                  De hellingshoek moet tussen 0° en 30° liggen. Laat dit altijd controleren door een specialist.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Hoe lang gaat een groendak mee?
                </h3>
                <p className="text-forest-700">
                  Een professioneel geïnstalleerd groendak gaat 40-60 jaar mee, verdubbelt de levensduur van uw dakbedekking. 
                  De beplanting vernieuwt zichzelf en groeit het hele jaar door.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-sage-600 to-forest-600 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">
                Benieuwd naar uw groendak mogelijkheden?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Ontvang gratis advies en kostenoverzicht van groendak specialisten
              </p>
              <div className="max-w-md mx-auto">
                <NewLeadForm 
                  locale={locale}
                  serviceType="groendak"
                  translations={{
                    form_eyebrow: t('form_eyebrow'),
                    form_title: t('form_title'),
                    form_subtitle: t('form_subtitle'),
                    your_name: t('your_name'),
                    municipality: t('municipality'),
                    service: t('service'),
                    phone_number: t('phone_number'),
                    send_request: t('send_request'),
                    form_note: t('form_note'),
                    select_municipality: t('form.select_municipality'),
                    what_do_you_need: t('form.what_do_you_need'),
                    your_company: t('form.your_company'),
                    loading: t('form.loading'),
                    privacy_agreement: t('form.privacy_agreement'),
                    privacy_link: t('form.privacy_link'),
                    privacy_consent: t('form.privacy_consent'),
                    services: {
                      tuinonderhoud: t('form.services.tuinonderhoud'),
                      tuinontwerp: t('form.services.tuinontwerp'),
                      'tuin-aanleggen': t('form.services.tuin-aanleggen'),
                      stratenmaker: t('form.services.stratenmaker'),
                      groendak: t('form.services.groendak'),
                      overig: t('form.services.overig')
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
