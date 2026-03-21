import Link from 'next/link';
import NewLeadForm from './components/NewLeadForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export const metadata = {
  title: 'Pagina niet gevonden | Hovenier.frl',
  description: 'De pagina die u zoekt bestaat niet. Ontdek onze hovendiensten of neem contact op.',
  robots: 'noindex, nofollow'
};

export default function NotFound() {
  // Static translations for the form
  const translations = {
    form_eyebrow: "Gratis Offerte",
    form_title: "Vraag direct een offerte aan",
    form_subtitle: "Binnen 24 uur contact van lokale hoveniers",
    your_name: "Uw naam",
    municipality: "Gemeente", 
    service: "Type werkzaamheden",
    phone_number: "Telefoonnummer",
    send_request: "Verstuur aanvraag",
    form_note: "Door dit formulier te versturen gaat u akkoord met onze voorwaarden"
  };
  return (
    <>
      <Navigation locale="nl" />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Error Illustration */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-7.5a9 9 0 00-9 9v1.5h18v-1.5a9 9 0 00-9-9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v.01" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                404 - Pagina niet gevonden
              </h1>
              <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                De pagina die u zoekt bestaat niet of is verplaatst. Misschien kunnen we u helpen met het vinden van wat u zoekt?
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Onze Diensten</h3>
                <p className="text-sm text-neutral-600 mb-4">Ontdek alle hovendiensten</p>
                <Link href="/services" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Bekijk diensten →
                </Link>
              </div>

              <div className="p-6 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Gemeenten</h3>
                <p className="text-sm text-neutral-600 mb-4">Vind hoveniers in uw buurt</p>
                <Link href="/regio" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Bekijk regio's →
                </Link>
              </div>

              <div className="p-6 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Tuin Tips</h3>
                <p className="text-sm text-neutral-600 mb-4">Lees onze tuinartikelen</p>
                <Link href="/artikelen" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Lees artikelen →
                </Link>
              </div>
            </div>

            {/* Lead Form Section */}
            <div className="bg-neutral-50 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Heeft u hulp nodig met uw tuin?
              </h2>
              <p className="text-neutral-600 mb-6">
                Laat ons u helpen met het vinden van de juiste hovenier voor uw project.
              </p>
              <NewLeadForm 
                translations={translations}
                locale="nl"
              />
            </div>

            {/* Back to homepage link */}
            <div className="mt-8">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Terug naar homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}