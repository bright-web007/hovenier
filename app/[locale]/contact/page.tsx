import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Contact - Hovenier.frl | Neem Contact Op',
  description: 'Neem contact op met hovenier.frl voor vragen over partnerships, pers, of technische ondersteuning. We helpen je graag verder.',
  keywords: 'contact, hovenier.frl, partnership, pers, technische ondersteuning, Friesland',
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Contact' : 'Contact' }
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
            Contact
          </h1>
          <p className="section-sub section-sub-centered">
            Vragen, feedback of samenwerking? We horen graag van je!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="section-title">
              Stuur ons een bericht
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="form-label">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="form-label">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="subject" className="form-label">
                  Onderwerp *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="form-select"
                >
                  <option value="">Selecteer onderwerp...</option>
                  <option value="general">Algemene vraag</option>
                  <option value="partnership">Partnership/Samenwerking</option>
                  <option value="press">Pers</option>
                  <option value="technical">Technische ondersteuning</option>
                  <option value="feedback">Feedback/Suggestie</option>
                  <option value="other">Anders</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="form-input"
                  placeholder="Beschrijf je vraag of opmerking..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="form-btn"
              >
                Verstuur Bericht
              </button>
            </form>

            <p className="text-sm mt-4 text-text-mid">
              * Verplichte velden. We respecteren je privacy - zie ons 
              <a href="/privacy-beleid" className="hover:underline text-forest"> privacybeleid</a>.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-forest font-serif">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-cream-dark">
                    <svg className="w-5 h-5 text-forest" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-forest">Email</p>
                    <p className="text-text-mid">info@hovenier.frl</p>
                    <p className="text-sm text-text-muted">We reageren binnen 24 uur</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-cream-dark">
                    <svg className="w-5 h-5 text-forest" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-forest">Locatie</p>
                    <p className="text-text-mid">Friesland, Nederland</p>
                    <p className="text-sm text-text-muted">Lokaal gevestigd in Friesland</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="rounded-xl p-6 bg-cream-dark">
              <h3 className="text-xl font-bold mb-4 text-forest font-serif">
                Veelgestelde Vragen
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-forest">Voor Huiseigenaren:</p>
                  <p className="text-sm text-text-mid">Hoe werkt de matching service?</p>
                  <a href="/over-ons" className="text-sm hover:underline text-forest">→ Lees meer</a>
                </div>
                <div>
                  <p className="font-medium text-forest">Voor Hoveniers:</p>
                  <p className="text-sm text-text-mid">Hoe word ik lid van het platform?</p>
                  <a href="/samenwerking" className="text-sm hover:underline text-forest">→ Partnership info</a>
                </div>
                <div>
                  <p className="font-medium text-forest">Kosten & Prijzen:</p>
                  <p className="text-sm text-text-mid">Wat kosten hovenier diensten?</p>
                  <a href="/kosten" className="text-sm hover:underline text-forest">→ Kostengids</a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-xl p-6 bg-cream-dark">
              <h3 className="text-xl font-bold mb-3 text-forest font-serif">
                Reactietijd
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-mid">Email</span>
                  <span className="font-medium text-forest">&lt; 24 uur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-mid">Partnership vragen</span>
                  <span className="font-medium text-forest">&lt; 48 uur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-mid">Technische problemen</span>
                  <span className="font-medium text-forest">&lt; 12 uur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}