import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Contact - Hovenier.frl | Neem Contact Op',
  description: 'Neem contact op met hovenier.frl voor vragen over partnerships, pers, of technische ondersteuning. We helpen je graag verder.',
  keywords: 'contact, hovenier.frl, partnership, pers, technische ondersteuning, Friesland',
}

export default function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = useTranslations('pages.contact')

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Contact' : 'Contact' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Contact
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Vragen, feedback of samenwerking? We horen graag van je!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-forest-900 mb-6">
              Stuur ons een bericht
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-forest-700 mb-2">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-forest-700 mb-2">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-forest-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-forest-700 mb-2">
                  Onderwerp *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
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
                <label htmlFor="message" className="block text-sm font-medium text-forest-700 mb-2">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Beschrijf je vraag of opmerking..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-sage-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors"
              >
                Verstuur Bericht
              </button>
            </form>

            <p className="text-sm text-forest-600 mt-4">
              * Verplichte velden. We respecteren je privacy - zie ons 
              <a href="/privacy-beleid" className="text-sage-600 hover:underline"> privacybeleid</a>.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-forest-900 mb-4">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-sage-100 p-3 rounded-lg">
                    <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-forest-900">Email</p>
                    <p className="text-forest-700">info@hovenier.frl</p>
                    <p className="text-sm text-forest-600">We reageren binnen 24 uur</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-sage-100 p-3 rounded-lg">
                    <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-forest-900">Locatie</p>
                    <p className="text-forest-700">Friesland, Nederland</p>
                    <p className="text-sm text-forest-600">Lokaal gevestigd in Friesland</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-forest-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-forest-900 mb-4">
                Veelgestelde Vragen
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-forest-900">Voor Huiseigenaren:</p>
                  <p className="text-sm text-forest-700">Hoe werkt de matching service?</p>
                  <a href="/over-ons" className="text-sage-600 text-sm hover:underline">→ Lees meer</a>
                </div>
                <div>
                  <p className="font-medium text-forest-900">Voor Hoveniers:</p>
                  <p className="text-sm text-forest-700">Hoe word ik lid van het platform?</p>
                  <a href="/samenwerking" className="text-sage-600 text-sm hover:underline">→ Partnership info</a>
                </div>
                <div>
                  <p className="font-medium text-forest-900">Kosten & Prijzen:</p>
                  <p className="text-sm text-forest-700">Wat kosten hovenier diensten?</p>
                  <a href="/kosten" className="text-sage-600 text-sm hover:underline">→ Kostengids</a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-forest-900 mb-3">
                Reactietijd
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-forest-700">Email</span>
                  <span className="font-medium text-forest-900">&lt; 24 uur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-700">Partnership vragen</span>
                  <span className="font-medium text-forest-900">&lt; 48 uur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-forest-700">Technische problemen</span>
                  <span className="font-medium text-forest-900">&lt; 12 uur</span>
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