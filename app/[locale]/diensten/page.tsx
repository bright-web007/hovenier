import { getTranslator, locales, defaultLocale } from '../../../i18n';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import NewLeadForm from '@/app/components/NewLeadForm';
import Link from 'next/link';
import ServiceSchema from '../../components/schemas/ServiceSchema';
import { localizePath, type SupportedLocale } from '@/lib/locale-utils';

// ISR: Never revalidate (static service listings, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  if (!locales.includes(validLocale as any)) notFound();
  const t = getTranslator(validLocale as "nl" | "en");

  // Service data
  const services = [
    {
      id: 'tuinonderhoud',
      title: 'Tuinonderhoud',
      subtitle: 'Regulier onderhoud & verzorging',
      description: 'Professioneel tuinonderhoud om uw tuin het hele jaar door in topconditie te houden. Van gras maaien tot hagen knippen.',
      features: ['Gras maaien', 'Hagen knippen', 'Onkruidbestrijding', 'Seizoensklussen'],
      price: 'Vanaf €35/uur',
      icon: (
        <svg style={{ width: '32px', height: '32px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    },
    {
      id: 'tuinontwerp',
      title: 'Tuinontwerp',
      subtitle: 'Creatieve tuinconcepten',
      description: 'Op maat gemaakte tuinontwerpen die perfect aansluiten bij uw wensen, stijl en budget. Van compact tot expansief.',
      features: ['3D visualisaties', 'Plantenschema\'s', 'Stijladvies', 'Budget planning'],
      price: 'Vanaf €750',
      icon: (
        <svg style={{ width: '32px', height: '32px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'tuin-aanleggen',
      title: 'Tuin Aanleggen',
      subtitle: 'Complete tuinrealisatie',
      description: 'Van concept tot realisatie: wij leggen uw droomtuin volledig aan met kwalitatieve materialen en vakmanschap.',
      features: ['Grondwerkzaamheden', 'Beplanting', 'Verharding', 'Irrigatiesystemen'],
      price: 'Op maat',
      icon: (
        <svg style={{ width: '32px', height: '32px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      id: 'stratenmaker',
      title: 'Bestrating',
      subtitle: 'Terrassen & tuinpaden',
      description: 'Duurzame bestratingswerken voor terrassen, opritten en tuinpaden. Verschillende materialen en stijlen mogelijk.',
      features: ['Keramische tegels', 'Natuursteen', 'Betonstraat', 'Drainage systemen'],
      price: 'Vanaf €45/m²',
      icon: (
        <svg style={{ width: '32px', height: '32px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 'groendak',
      title: 'Groendaken',
      subtitle: 'Duurzame dakoverdekking',
      description: 'Extensieve en intensieve groendaken voor een duurzamere leefomgeving. Expertise in waterafvoer en beplanting.',
      features: ['Waterafvoer', 'Isolatie verbetering', 'Biodiversiteit', 'Energiebesparing'],
      price: 'Vanaf €85/m²',
      icon: (
        <svg style={{ width: '32px', height: '32px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    }
  ];

  // Form translations
  const formTranslations = {
    form_eyebrow: validLocale === 'nl' ? 'Gratis Offerte' : 'Free Quote',
    form_title: validLocale === 'nl' ? 'Vraag direct een offerte aan' : 'Request a quote now',
    form_subtitle: validLocale === 'nl' ? 'Binnen 24 uur contact van lokale hoveniers' : 'Contact from local gardeners within 24 hours',
    your_name: validLocale === 'nl' ? 'Uw naam' : 'Your name',
    municipality: validLocale === 'nl' ? 'Gemeente' : 'Municipality',
    service: validLocale === 'nl' ? 'Gewenste dienst' : 'Desired service',
    phone_number: validLocale === 'nl' ? 'Telefoonnummer' : 'Phone number',
    send_request: validLocale === 'nl' ? 'Verstuur aanvraag' : 'Send request',
    form_note: validLocale === 'nl' ? 'Door dit formulier te versturen gaat u akkoord met onze voorwaarden' : 'By submitting this form you agree to our terms',
    select_municipality: validLocale === 'nl' ? 'Selecteer gemeente' : 'Select municipality',
    what_do_you_need: validLocale === 'nl' ? 'Wat heeft u nodig?' : 'What do you need?',
    your_company: validLocale === 'nl' ? 'Uw bedrijf' : 'Your company',
    loading: validLocale === 'nl' ? 'Versturen...' : 'Loading...',
    privacy_agreement: validLocale === 'nl' ? 'Ik ga akkoord met het' : 'I agree to the',
    privacy_link: validLocale === 'nl' ? 'privacybeleid' : 'privacy policy',
    privacy_consent: validLocale === 'nl' ? 'en geef toestemming voor het verwerken van mijn gegevens.' : 'and consent to processing my data.',
    services: {
      tuinonderhoud: validLocale === 'nl' ? 'Tuinonderhoud' : 'Garden Maintenance',
      tuinontwerp: validLocale === 'nl' ? 'Tuinontwerp' : 'Garden Design',
      'tuin-aanleggen': validLocale === 'nl' ? 'Tuin Aanleggen' : 'Garden Installation',
      stratenmaker: validLocale === 'nl' ? 'Bestrating' : 'Paving',
      groendak: validLocale === 'nl' ? 'Groendak' : 'Green Roof',
      overig: validLocale === 'nl' ? 'Overig' : 'Other'
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: validLocale === 'nl' ? 'Home' : 'Home', href: '/' },
    { label: validLocale === 'nl' ? 'Diensten' : 'Services' }
  ];

  return (
    <>
      <ServiceSchema 
        name="Tuinonderhoud"
        description="Professioneel tuinonderhoud voor het hele jaar door in Friesland. Gras maaien, hagen knippen, onkruidbestrijding en seizoensklussen door ervaren tuinspecialisten."
        provider={{ name: "Hovenier.frl", url: "https://hovenier.frl" }}
        areaServed="Friesland, Nederland"
        priceRange="€35-€50"
      />
      <ServiceSchema 
        name="Tuinontwerp"
        description="Creatieve tuinontwerpen op maat in Friesland. 3D visualisaties, plantenschema's en complete tuinconcepten die perfect aansluiten bij uw wensen en budget."
        provider={{ name: "Hovenier.frl", url: "https://hovenier.frl" }}
        areaServed="Friesland, Nederland"
        priceRange="€750-€2500"
      />
      <ServiceSchema 
        name="Tuin Aanleggen"
        description="Complete tuinaanleg van A tot Z in Friesland. Van concept tot realisatie met kwalitatieve materialen, grondwerkzaamheden, beplanting en verharding."
        provider={{ name: "Hovenier.frl", url: "https://hovenier.frl" }}
        areaServed="Friesland, Nederland"
        priceRange="€8000-€35000"
      />
      <ServiceSchema 
        name="Bestrating"
        description="Duurzame bestratingswerken in Friesland. Terrassen, opritten en tuinpaden met keramische tegels, natuursteen en betonstraat door vakkundige stratenmakers."
        provider={{ name: "Hovenier.frl", url: "https://hovenier.frl" }}
        areaServed="Friesland, Nederland"
        priceRange="€45-€85"
      />
      <ServiceSchema 
        name="Groendaken"
        description="Extensieve en intensieve groendaken in Friesland. Duurzame dakoverdekking met expertise in waterafvoer, isolatie en beplanting voor een groenere leefomgeving."
        provider={{ name: "Hovenier.frl", url: "https://hovenier.frl" }}
        areaServed="Friesland, Nederland"
        priceRange="€85-€150"
      />
      <Navigation locale={validLocale as "nl" | "en"} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, var(--cream-light), var(--sage-light))' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          
          {/* Hero Section */}
          <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ 
              maxWidth: '64rem', 
              margin: '0 auto', 
              textAlign: 'center', 
              marginBottom: '4rem' 
            }}>
              <h1 style={{ 
                fontSize: '3rem', 
                fontFamily: 'var(--serif)', 
                fontWeight: '600', 
                color: 'var(--forest)', 
                marginBottom: '1.5rem', 
                lineHeight: '1.1' 
              }}>
                Onze Hovendiensten
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--forest-mid)', 
                marginBottom: '2rem', 
                lineHeight: '1.6' 
              }}>
                Professionele tuinspecialisten voor al uw groene dromen in Friesland
              </p>
            </div>

            {/* Services Grid */}
            <section style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '4rem' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
                gap: '2rem' 
              }}>
                {services.map((service) => (
                  <div key={service.id} style={{ 
                    background: 'var(--white)', 
                    borderRadius: '16px', 
                    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)', 
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <div style={{ padding: '2rem' }}>
                      {/* Service Icon */}
                      <div style={{ 
                        background: 'var(--sage-light)', 
                        width: '72px', 
                        height: '72px', 
                        borderRadius: '16px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginBottom: '1.5rem' 
                      }}>
                        {service.icon}
                      </div>

                      {/* Service Header */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: '700', 
                          color: 'var(--forest)', 
                          marginBottom: '0.5rem',
                          fontFamily: 'var(--serif)'
                        }}>
                          {service.title}
                        </h3>
                        <p style={{ 
                          fontSize: '1rem', 
                          color: 'var(--sage)', 
                          fontWeight: '500',
                          marginBottom: '0.75rem'
                        }}>
                          {service.subtitle}
                        </p>
                        <p style={{ 
                          color: 'var(--forest-mid)', 
                          fontSize: '15px', 
                          lineHeight: '1.6' 
                        }}>
                          {service.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <ul style={{ 
                          listStyle: 'none', 
                          padding: '0', 
                          margin: '0',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.5rem'
                        }}>
                          {service.features.map((feature, index) => (
                            <li key={index} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              color: 'var(--forest-mid)',
                              fontSize: '14px'
                            }}>
                              <span style={{ 
                                width: '6px', 
                                height: '6px', 
                                background: 'var(--sage)', 
                                borderRadius: '50%', 
                                marginRight: '0.5rem', 
                                flexShrink: '0' 
                              }}></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price & CTA */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid var(--sage-light)'
                      }}>
                        <div>
                          <span style={{ 
                            fontSize: '1.125rem', 
                            fontWeight: '600', 
                            color: 'var(--forest)' 
                          }}>
                            {service.price}
                          </span>
                        </div>
                        <Link 
                          href={localizePath(`/diensten/${service.id}`, validLocale as SupportedLocale)}
                          style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'var(--sage)', 
                            color: 'var(--white)', 
                            padding: '0.75rem 1.5rem', 
                            borderRadius: '8px', 
                            fontSize: '14px',
                            fontWeight: '600', 
                            textDecoration: 'none',
                            transition: 'background-color 0.2s ease'
                          }}
                        >
                          Meer Info →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section style={{ maxWidth: '64rem', margin: '0 auto', marginBottom: '4rem' }}>
              <div style={{ 
                background: 'var(--white)', 
                borderRadius: '16px', 
                boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)', 
                padding: '3rem' 
              }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: 'var(--forest)', 
                  marginBottom: '2rem', 
                  textAlign: 'center',
                  fontFamily: 'var(--serif)'
                }}>
                  Waarom Kiezen voor Onze Hoveniers?
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '2rem' 
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'var(--forest-light)', 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      margin: '0 auto 1rem' 
                    }}>
                      <svg style={{ width: '28px', height: '28px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      color: 'var(--forest)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Gecertificeerd & Verzekerd
                    </h3>
                    <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>
                      Alle hoveniers zijn vakbekwaam, gecertificeerd en volledig verzekerd voor uw veiligheid
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'var(--sage-light)', 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      margin: '0 auto 1rem' 
                    }}>
                      <svg style={{ width: '28px', height: '28px', color: 'var(--sage)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      color: 'var(--forest)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Kwaliteitsgarantie
                    </h3>
                    <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>
                      Tevredenheid gegarandeerd met naservice en advies voor optimaal tuinresultaat
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      background: 'var(--forest-light)', 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      margin: '0 auto 1rem' 
                    }}>
                      <svg style={{ width: '28px', height: '28px', color: 'var(--forest)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      color: 'var(--forest)', 
                      marginBottom: '0.5rem' 
                    }}>
                      Snelle Reactie
                    </h3>
                    <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>
                      Binnen 24 uur reactie op uw aanvraag en flexibele planning voor uw gemak
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quote Section */}
            <section style={{ maxWidth: '64rem', margin: '0 auto' }}>
              <div style={{ 
                background: 'var(--white)', 
                borderRadius: '16px', 
                boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)', 
                padding: '3rem' 
              }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ 
                    fontSize: '2rem', 
                    fontWeight: '700', 
                    color: 'var(--forest)', 
                    marginBottom: '1rem',
                    fontFamily: 'var(--serif)'
                  }}>
                    Klaar om te Beginnen?
                  </h2>
                  <p style={{ 
                    fontSize: '1.125rem', 
                    color: 'var(--forest-mid)', 
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}>
                    Vraag vandaag nog een vrijblijvende offerte aan en ontdek wat onze hoveniers voor uw tuin kunnen betekenen.
                  </p>
                </div>
                
                <NewLeadForm 
                  translations={formTranslations}
                  locale={validLocale}
                />
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
