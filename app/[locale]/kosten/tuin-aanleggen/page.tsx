import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import NewLeadForm from '@/app/components/NewLeadForm'
import { getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Tuin Aanleggen Kosten 2026 | Prijs per m² | Hovenier.frl',
    description: 'Wat kost een tuin aanleggen? Gemiddeld €45–€120 per m². Volledig kostenoverzicht voor tuinaanleg in Friesland, inclusief materialen en arbeid. Gratis offertes vergelijken.',
    keywords: 'tuin aanleggen kosten, kosten tuin aanleggen, wat kost een tuin aanleggen, wat kost het aanleggen van een tuin, wat kost aanleggen tuin, tuin aanleggen kosten m2',
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
  const t = createTranslator(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat kost een tuin aanleggen per m²?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een tuin aanleggen kost gemiddeld €45–€120 per m² inclusief materialen en arbeid. Voor eenvoudige tuinen €45–€70/m², midrange €70–€100/m², en luxe tuinen €100–€180/m²."
        }
      },
      {
        "@type": "Question",
        "name": "Wat is inbegrepen bij tuinaanleg?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bij tuinaanleg zijn grondwerk, materialen, beplanting, grasaanleg, bestrating en arbeid inbegrepen. Irrigatie en verlichting zijn meestal optioneel en kosten extra."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe lang duurt het aanleggen van een tuin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Het aanleggen van een gemiddelde tuin van 100m² duurt 1-3 weken, afhankelijk van complexiteit, weersomstandigheden en beschikbaarheid van materialen."
        }
      }
    ]
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
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
              Tuin Aanleggen Kosten 2026 — Wat Kost het Aanleggen van een Tuin?
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
                Een tuin aanleggen kost gemiddeld <strong>€45 tot €120 per m²</strong>, inclusief materialen en arbeid. 
                Voor een complete tuinaanleg van 100 m² betaalt u doorgaans <strong>€4.500–€12.000</strong>. 
                De prijs hangt sterk af van de materialen, grondwerk, beplanting en eventuele bestrating.
              </p>
            </div>
          </section>

          {/* Cost Breakdown Table */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Tuin Aanleggen Kosten per m² — Gedetailleerd Overzicht
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <table className="w-full">
                <thead className="bg-sage-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-forest-900">Type Tuin</th>
                    <th className="text-right py-4 px-6 font-bold text-forest-900">Kosten per m²</th>
                    <th className="text-right py-4 px-6 font-bold text-forest-900">Voorbeeld 100 m²</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Eenvoudig</div>
                      <div className="text-sm text-gray-600">Gras, borders, paden</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€45 – €70</td>
                    <td className="text-right py-4 px-6 font-semibold">€4.500 – €7.000</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Midrange</div>
                      <div className="text-sm text-gray-600">Bestrating, beplanting, verlichting</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€70 – €100</td>
                    <td className="text-right py-4 px-6 font-semibold">€7.000 – €10.000</td>
                  </tr>
                  <tr className="border-b border-sage-100">
                    <td className="py-4 px-6">
                      <div className="font-semibold">Luxe</div>
                      <div className="text-sm text-gray-600">Hardwood, waterelement, volledige aanleg</div>
                    </td>
                    <td className="text-right py-4 px-6 font-semibold">€100 – €180</td>
                    <td className="text-right py-4 px-6 font-semibold">€10.000 – €18.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-cream border-l-4 border-sage p-6 rounded-r-lg">
              <h3 className="font-semibold text-forest-deep mb-3">Totaalprijs per tuingrootte:</h3>
              <ul className="space-y-2 text-sm text-forest-deep">
                <li>• Klein 50 m²: €2.500–€6.000</li>
                <li>• Middelgroot 100 m²: €4.500–€12.000</li>
                <li>• Groot 200 m²: €9.000–€25.000+</li>
              </ul>
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
