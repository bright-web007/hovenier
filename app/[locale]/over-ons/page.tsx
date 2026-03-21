import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Over Ons - Hovenier.frl | Friesland\'s Tuinier Directory',
  description: 'Ontdek wat hovenier.frl is en hoe ons platform werkt voor huiseigenaren. Leer hoe je in 3 stappen gratis offertes krijgt van lokale hoveniers in Friesland.',
  keywords: 'over ons, hovenier platform, Friesland, tuiniers directory, gratis offertes',
}

export default function OverOnsPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = useTranslations('pages.about')

  return (
    <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Over Hovenier.frl
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Friesland's betrouwbare platform om lokale hoveniers te vinden
          </p>
        </div>

        {/* What We Are Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
            Wat is Hovenier.frl?
          </h2>
          <div className="prose prose-lg max-w-none text-forest-800">
            <p>
              Hovenier.frl is Friesland's leidende online directory voor professionele tuinonderhoud 
              en landschapsarchitectuur diensten. Wij verbinden huiseigenaren met gekwalificeerde, 
              lokale hoveniers in alle 11 Friese gemeenten.
            </p>
            <p>
              Ons platform maakt het eenvoudig om betrouwbare tuinprofessionals te vinden voor 
              elk project - van regulier onderhoud tot complete tuintransformaties.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
            Hoe het werkt
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">1</span>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">Verstuur je Aanvraag</h3>
              <p className="text-forest-700">
                Vul ons eenvoudige formulier in met je locatie, type werk, 
                en contactgegevens. Helemaal gratis.
              </p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">Wij Matchen je</h3>
              <p className="text-forest-700">
                Ons systeem verbindt je met tot 3 gekwalificeerde hoveniers 
                in jouw gemeente die gespecialiseerd zijn in jouw type werk.
              </p>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg">
              <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sage-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">Ontvang Offertes</h3>
              <p className="text-forest-700">
                Hoveniers nemen binnen 24 uur contact met je op. 
                Vergelijk offertes en kies de beste voor jouw project.
              </p>
            </div>
          </div>
        </section>

        {/* For Gardeners Section */}
        <section className="max-w-4xl mx-auto mb-16 bg-sage-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
            Voor Hoveniers
          </h2>
          <div className="prose prose-lg max-w-none text-forest-800">
            <p>
              Ben je een professionele hovenier in Friesland? Sluit je aan bij ons netwerk 
              en krijg toegang tot nieuwe klanten in jouw regio.
            </p>
            <p>
              We bieden drie verschillende lidmaatschapsniveaus - van gratis basis listings 
              tot premium featured placements. Alle hoveniers op ons platform worden 
              gecontroleerd op kwalificaties en betrouwbaarheid.
            </p>
          </div>
          <div className="text-center mt-6">
            <a 
              href="/samenwerking" 
              className="inline-block bg-sage-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors"
            >
              Word Partner →
            </a>
          </div>
        </section>

        {/* Trust & Quality Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
            Betrouwbaarheid & Kwaliteit
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-forest-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">Geverifieerde Professionals</h3>
              <p className="text-forest-700">
                Alle hoveniers worden gecontroleerd op ervaring, 
                verzekeringen en klantbeoordelingen.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-forest-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest-900 mb-3">100% Gratis Service</h3>
              <p className="text-forest-700">
                Voor huiseigenaren is onze matching service 
                volledig gratis - geen verborgen kosten.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}