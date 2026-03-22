import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Over Ons - Hovenier.frl | Friesland\'s Tuinier Directory',
  description: 'Ontdek wat hovenier.frl is en hoe ons platform werkt voor huiseigenaren. Leer hoe je in 3 stappen gratis offertes krijgt van lokale hoveniers in Friesland.',
  keywords: 'over ons, hovenier platform, Friesland, tuiniers directory, gratis offertes',
}

export default async function OverOnsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'About Us' : 'Over Ons' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main className="section section-alt">
      <div className="section-inner">
        {/* Hero Section */}
        <div className="section-centered mb-16">
          <h1 className="hero-h1 text-forest">
            Over Hovenier.frl
          </h1>
          <p className="section-sub section-sub-centered">
            Friesland's betrouwbare platform om lokale hoveniers te vinden
          </p>
        </div>

        {/* What We Are Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="section-title text-center">
            Wat is Hovenier.frl?
          </h2>
          <div className="prose prose-lg max-w-none text-text">
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
          <h2 className="section-title text-center">
            Hoe het werkt
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="text-xl font-semibold mb-3 text-forest-deep">Verstuur je Aanvraag</h3>
              <p className="step-text">
                Vul ons eenvoudige formulier in met je locatie, type werk, 
                en contactgegevens. Helemaal gratis.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="text-xl font-semibold mb-3 text-forest-deep">Wij Matchen je</h3>
              <p className="step-text">
                Ons systeem verbindt je met tot 3 gekwalificeerde hoveniers 
                in jouw gemeente die gespecialiseerd zijn in jouw type werk.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="text-xl font-semibold mb-3 text-forest-deep">Ontvang Offertes</h3>
              <p className="step-text">
                Hoveniers nemen binnen 24 uur contact met je op. 
                Vergelijk offertes en kies de beste voor jouw project.
              </p>
            </div>
          </div>
        </section>

        {/* For Gardeners Section */}
        <section className="max-w-4xl mx-auto mb-16 section-alt rounded-xl p-8">
          <h2 className="section-title text-center">
            Voor Hoveniers
          </h2>
          <div className="prose prose-lg max-w-none text-text">
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
              className="nav-cta"
            >
              Word Partner →
            </a>
          </div>
        </section>

        {/* Trust & Quality Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">
            Betrouwbaarheid & Kwaliteit
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-cream-dark">
                <svg className="w-8 h-8 text-forest" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-forest">Geverifieerde Professionals</h3>
              <p className="text-text-mid">
                Alle hoveniers worden gecontroleerd op ervaring, 
                verzekeringen en klantbeoordelingen.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-cream-dark">
                <svg className="w-8 h-8 text-forest" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-forest">100% Gratis Service</h3>
              <p className="text-text-mid">
                Voor huiseigenaren is onze matching service 
                volledig gratis - geen verborgen kosten.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  )
}