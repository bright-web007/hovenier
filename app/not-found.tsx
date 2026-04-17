import Link from 'next/link';
import NewLeadForm from './components/NewLeadForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { localizePath } from '@/lib/locale-utils';

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
    form_note: "Door dit formulier te versturen gaat u akkoord met onze voorwaarden",
    select_municipality: "Selecteer gemeente",
    what_do_you_need: "Wat heeft u nodig?",
    your_company: "Uw bedrijf",
    loading: "Versturen...",
    privacy_agreement: "Ik ga akkoord met het",
    privacy_link: "privacybeleid",
    privacy_consent: "en geef toestemming voor het verwerken van mijn gegevens.",
    services: {
      tuinonderhoud: "Tuinonderhoud",
      tuinontwerp: "Tuinontwerp",
      'tuin-aanleggen': "Tuin Aanleggen",
      stratenmaker: "Bestrating",
      groendak: "Groendak",
      overig: "Overig"
    }
  };

  return (
    <div className="page-container">
      <Navigation locale="nl" />
      <main>
        <section className="section">
          <div className="section-inner">
            {/* Error Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                margin: '0 auto 2rem', 
                background: 'var(--cream-dark)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '2px solid var(--border)'
              }}>
                <svg style={{ width: '48px', height: '48px', color: 'var(--text-muted)' }} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-4.5V5.25" />
                </svg>
              </div>
              
              <h1 style={{ 
                fontFamily: 'var(--heading-font)', 
                fontSize: '48px', 
                fontWeight: '600', 
                color: 'var(--forest)', 
                marginBottom: '1rem',
                lineHeight: '1.1'
              }}>
                404
              </h1>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '500', 
                color: 'var(--text)', 
                marginBottom: '1rem'
              }}>
                Pagina niet gevonden
              </h2>
              
              <p style={{ 
                fontSize: '16px', 
                color: 'var(--text-muted)', 
                maxWidth: '600px', 
                margin: '0 auto 3rem',
                lineHeight: '1.6'
              }}>
                De pagina die u zoekt bestaat niet of is verplaatst. Geen probleem! 
                Ontdek onze hovendiensten of vraag direct een offerte aan.
              </p>

              <Link 
                href="/"
                className="nav-cta"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontSize: '14px',
                  padding: '12px 24px'
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Terug naar homepage
              </Link>
            </div>

            {/* Quick Navigation Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2rem', 
              marginBottom: '4rem' 
            }}>
              <div style={{ 
                background: 'var(--white)', 
                padding: '2rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'var(--sage)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem' 
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--white)' }} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--forest)', 
                  marginBottom: '0.5rem' 
                }}>
                  Onze Diensten
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-muted)', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Ontdek alle tuindiensten van onze gecertificeerde hoveniers
                </p>
                <Link href={localizePath('/services', 'nl')} style={{ 
                  color: 'var(--sage)', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  textDecoration: 'underline'
                }}>
                  Bekijk diensten →
                </Link>
              </div>

              <div style={{ 
                background: 'var(--white)', 
                padding: '2rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'var(--forest)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem' 
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--white)' }} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--forest)', 
                  marginBottom: '0.5rem' 
                }}>
                  Hoveniers per Regio
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-muted)', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Vind betrouwbare hoveniers in uw gemeente in Friesland
                </p>
                <Link href="/regio" style={{ 
                  color: 'var(--sage)', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  textDecoration: 'underline'
                }}>
                  Bekijk regio's →
                </Link>
              </div>

              <div style={{ 
                background: 'var(--white)', 
                padding: '2rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'var(--gold)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem' 
                }}>
                  <svg style={{ width: '24px', height: '24px', color: 'var(--white)' }} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--forest)', 
                  marginBottom: '0.5rem' 
                }}>
                  Tuininspiratie
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-muted)', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  Lees onze tuinartikelen met tips van professionals
                </p>
                <Link href="/nieuws" style={{ 
                  color: 'var(--sage)', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  textDecoration: 'underline'
                }}>
                  Lees artikelen →
                </Link>
              </div>
            </div>

            {/* Lead Form Section */}
            <div style={{ 
              background: 'var(--cream-dark)', 
              padding: '3rem 2rem', 
              borderRadius: '12px', 
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h2 style={{ 
                fontFamily: 'var(--heading-font)', 
                fontSize: '32px', 
                fontWeight: '600', 
                color: 'var(--forest)', 
                marginBottom: '1rem' 
              }}>
                Heeft u hulp nodig met uw tuin?
              </h2>
              <p style={{ 
                fontSize: '16px', 
                color: 'var(--text-muted)', 
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem'
              }}>
                Laat ons u helpen met het vinden van de juiste hovenier voor uw project. 
                Vraag vrijblijvend een offerte aan.
              </p>
              <NewLeadForm 
                translations={translations}
                locale="nl"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer locale="nl" />
    </div>
  );
}
