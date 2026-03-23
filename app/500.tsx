import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const metadata = {
  title: 'Server Fout | Hovenier.frl',
  description: 'Er is een technische fout opgetreden. Probeer het later opnieuw.',
  robots: 'noindex, nofollow'
};

export default function Error500() {
  // Navigation translations
  const navTranslations = {
    gardeners: 'Hoveniers',
    services: 'Diensten',
    regions: 'Regio\'s',
    inspiration: 'Inspiratie',
    request_quote: 'Offerte aanvragen'
  };
  return (
    <>
      <Navigation locale="nl" translations={navTranslations} />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Error Illustration */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                500 - Server Fout
              </h1>
              <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                Er is een technische fout opgetreden op onze kant. Onze technische dienst is op de hoogte gesteld en werkt aan een oplossing.
              </p>
            </div>

            {/* Status Information */}
            <div className="bg-neutral-50 rounded-lg p-8 mb-12 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Wat kunt u doen?
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-neutral-700 font-medium">Probeer de pagina te vernieuwen</p>
                    <p className="text-sm text-neutral-600">Soms helpt het om de pagina opnieuw te laden</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-neutral-700 font-medium">Wacht een paar minuten</p>
                    <p className="text-sm text-neutral-600">Onze technische dienst lost het probleem snel op</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-neutral-700 font-medium">Neem contact op</p>
                    <p className="text-sm text-neutral-600">Blijft het probleem? Laat het ons weten</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Homepage Bezoeken</h3>
                <p className="text-sm text-neutral-600 mb-4">Ga terug naar de startpagina</p>
                <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Naar homepage →
                </Link>
              </div>

              <div className="p-6 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Contact Opnemen</h3>
                <p className="text-sm text-neutral-600 mb-4">Probleem melden</p>
                <Link href="/contact" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Contact →
                </Link>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border-t border-neutral-200 pt-8">
              <p className="text-sm text-neutral-600 mb-4">
                Urgente hovenklus? Stuur een e-mail:
              </p>
              <a 
                href="mailto:info@hovenier.frl"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@hovenier.frl
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}