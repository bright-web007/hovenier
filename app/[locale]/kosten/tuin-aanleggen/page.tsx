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
    title: 'Kosten Tuin Aanleggen - Complete Prijsgids 2024 | Hovenier.frl',
    description: 'Wat kost het om een nieuwe tuin aan te leggen in Friesland? Complete kostenoverzicht van tuinaanleg inclusief grondwerk, beplanting en materialen.',
    keywords: 'tuin aanleggen kosten, tuinaanleg prijzen, nieuwe tuin kosten, hovenier prijzen, Friesland tuinaanleg',
    alternates: getLocaleAlternates('/kosten/tuin-aanleggen', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static pricing content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function TuinAanleggenKostenPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat kost het om een tuin aan te leggen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een nieuwe tuin aanleggen kost gemiddeld tussen €75 en €150 per m² in Friesland. Voor een complete tuin van 100m² betaal je tussen €7.500 en €15.000, afhankelijk van complexiteit en materialen."
        }
      },
      {
        "@type": "Question",
        "name": "Welke kosten zijn er bij tuinaanleg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bij tuinaanleg komen kosten voor grondwerk (€15-25/m²), beplanting (€20-50/m²), verharding (€40-80/m²), gazon (€8-15/m²) en arbeidskosten (€40-55/uur)."
        }
      },
      {
        "@type": "Question",
        "name": "Hoelang duurt het om een tuin aan te leggen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een gemiddelde tuin van 100m² aanleggen duurt 1-3 weken, afhankelijk van complexiteit, weersomstandigheden en beschikbaarheid van materialen."
        }
      }
    ]
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Kosten', href: '/kosten' },
    { label: 'Tuin Aanleggen' }
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
              Kosten Tuin Aanleggen in Friesland
            </h1>
            <p className="text-xl text-forest-700 mb-8">
              Complete kostengids voor het aanleggen van een nieuwe tuin
            </p>
          </div>

          {/* Direct Answer Box */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-sage-600 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Direct Antwoord:</h2>
              <p className="text-lg leading-relaxed">
                Een nieuwe tuin aanleggen kost gemiddeld tussen <strong>€75 en €150 per m²</strong> in Friesland. 
                Voor een gemiddelde achtertuin van 100m² betaal je <strong>€7.500 tot €15.000</strong>, 
                inclusief grondwerk, beplanting, gazon en basis verharding. Luxe tuinen kunnen tot €250/m² kosten.
              </p>
            </div>
          </section>

          {/* Cost Breakdown Table */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Kostenoverzicht per Onderdeel
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <table className="w-full">
                <thead className="bg-sage-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-forest-900">Onderdeel</th>
                    <th className="text-right py-4 px-6 font-bold text-forest-900">Kosten per m²</th>
                    <th className="text-right py-4 px-6 font-bold text-forest-900">Kosten 100m²</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Grondwerk & Egaliseren</div>
                      <div className="text-sm text-gray-600">Afgraven, niveleren, drainage</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€15 - €25</td>
                    <td className="text-right py-4 px-6 font-semibold">€1.500 - €2.500</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Gazon Aanleggen</div>
                      <div className="text-sm text-gray-600">Grond voorbereiden + zaaien/leggen</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€8 - €15</td>
                    <td className="text-right py-4 px-6 font-semibold">€800 - €1.500</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Beplanting & Struiken</div>
                      <div className="text-sm text-gray-600">Planten, grond, mulch</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€20 - €50</td>
                    <td className="text-right py-4 px-6 font-semibold">€2.000 - €5.000</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Verharding (Basis)</div>
                      <div className="text-sm text-gray-600">Tegels, klinkers, grind paden</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€40 - €80</td>
                    <td className="text-right py-4 px-6 font-semibold">€1.200 - €2.400</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Tuinverlichting</div>
                      <div className="text-sm text-gray-600">LED spots, padverlichting</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€10 - €25</td>
                    <td className="text-right py-4 px-6 font-semibold">€1.000 - €2.500</td>
                  </tr>
                  <tr className="bg-sage-50">
                    <td className="py-4 px-6 font-bold">
                      <div>Totaal Basis Tuin</div>
                    </td>
                    <td className="text-right py-4 px-6 font-bold text-lg">€75 - €150</td>
                    <td className="text-right py-4 px-6 font-bold text-lg">€7.500 - €15.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Garden Types Pricing */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Kosten per Tuintype
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-sage-200">
                <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Basis Tuin</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€75-95/m²</div>
                  <div className="text-gray-600">100m² = €7.500-9.500</div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Gazon aanleggen
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Basis beplanting
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Simpele verharding
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Grondwerk
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-sage-400">
                <div className="bg-sage-400 text-white px-3 py-1 rounded-full text-sm font-bold text-center mb-4">Populair</div>
                <div className="bg-sage-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Complete Tuin</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€120-180/m²</div>
                  <div className="text-gray-600">100m² = €12.000-18.000</div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Professioneel tuinontwerp
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Kwalitatieve beplanting
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Tuinverlichting
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Irrigatiesysteem
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-sage-200">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-forest-900 mb-4 text-center">Luxe Tuin</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sage-600">€200-350/m²</div>
                  <div className="text-gray-600">100m² = €20.000-35.000</div>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Designers ontwerp
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Premium materialen
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Waterelementen
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Speciale elementen
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Veelgestelde Vragen over Tuinaanleg Kosten
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Wat zijn de grootste kostenfactoren bij tuinaanleg?
                </h3>
                <p className="text-forest-700">
                  De grootste kosten zijn: grondwerk (25-30%), beplanting (30-35%), verharding (20-25%) en arbeidskosten (15-20%). 
                  Complexe grondwerken en premium materialen verhogen de kosten aanzienlijk.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Kan ik kosten besparen door zelf te helpen?
                </h3>
                <p className="text-forest-700">
                  Ja, eenvoudige taken zoals onkruid verwijderen, kleine plantjes zetten of mulch aanbrengen kun je zelf doen. 
                  Dit kan 10-20% van de arbeidskosten besparen. Laat grondwerk en verharding altijd over aan professionals.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-forest-900 mb-3">
                  Wanneer is het beste seizoen om een tuin aan te laten leggen?
                </h3>
                <p className="text-forest-700">
                  Het beste seizoen is maart-mei en september-november. In deze perioden zijn hoveniers vaak goedkoper beschikbaar 
                  en groeien planten het beste aan. Vermijd de drukke zomermaanden voor lagere kosten.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-sage-600 to-forest-600 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">
                Klaar om uw droomtuin te realiseren?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Ontvang gratis offertes van ervaren hoveniers in uw regio
              </p>
              <div className="max-w-md mx-auto">
                <NewLeadForm 
                  locale={locale}
                  serviceType="tuin-aanleggen"
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
