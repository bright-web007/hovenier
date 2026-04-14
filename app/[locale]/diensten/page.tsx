import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import NewLeadForm from '@/app/components/NewLeadForm';
import Link from 'next/link';
import ServiceSchema from '../../components/schemas/ServiceSchema';
import { localizePath, getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils';
import ImageComponent from '@/app/components/ImageComponent';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

// Simple translation function that loads from static JSON
function createTranslator(locale: string) {
  let messages: Record<string, any> = {};
  
  try {
    if (locale === 'nl') {
      messages = require(`../../../locales/nl/common.json`);
    } else {
      messages = require(`../../../locales/en/common.json`);
    }
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    messages = {};
  }
  
  return (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };
}

// ISR: Never revalidate (static service listings, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  
  return {
    title: validLocale === 'nl' ? 'Hoveniersdiensten in Friesland | Tuinonderhoud & Tuinaanleg | Hovenier.frl' : 'Garden Services in Friesland | Maintenance & Design | Hovenier.frl',
    description: validLocale === 'nl' ? 'Professionele hoveniersdiensten in Friesland. Van tuinonderhoud tot complete tuinaanleg. Betrouwbare specialisten voor alle tuinwerkzaamheden. Vraag gratis offerte aan.' : 'Professional garden services in Friesland. From garden maintenance to complete garden design. Reliable specialists for all garden work. Request free quote.',
    keywords: validLocale === 'nl' ? ['hoveniersdiensten', 'tuinonderhoud', 'tuinaanleg', 'tuinontwerp', 'friesland', 'hovenier'] : ['garden services', 'garden maintenance', 'garden design', 'landscaping', 'friesland'],
    alternates: getLocaleAlternates('/diensten', validLocale as SupportedLocale),
  };
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
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
        {icon}
      </div>
      <h3 style={{ 
        fontSize: '1.125rem', 
        fontWeight: '600', 
        color: 'var(--forest)', 
        marginBottom: '0.5rem' 
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>
        {description}
      </p>
    </div>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;
  if (!locales.includes(validLocale as any)) notFound();
  const t = createTranslator(validLocale);

  // Service data
  const services = [
    {
      id: 'tuinonderhoud',
      title: 'Tuinonderhoud',
      subtitle: 'Regulier onderhoud & verzorging',
      description: 'Professioneel tuinonderhoud om uw tuin het hele jaar door in topconditie te houden. Van gras maaien tot hagen knippen.',
      features: ['Gras maaien', 'Hagen knippen', 'Onkruidbestrijding', 'Seizoensklussen'],
      price: 'Vanaf €35/uur',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80'
    },
    {
      id: 'tuinontwerp',
      title: 'Tuinontwerp',
      subtitle: 'Creatieve tuinconcepten',
      description: 'Op maat gemaakte tuinontwerpen die perfect aansluiten bij uw wensen, stijl en budget. Van compact tot expansief.',
      features: ['3D visualisaties', 'Plantenschema\'s', 'Stijladvies', 'Budget planning'],
      price: 'Vanaf €750',
      image: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80'
    },
    {
      id: 'tuin-aanleggen',
      title: 'Tuin Aanleggen',
      subtitle: 'Complete tuinrealisatie',
      description: 'Van concept tot realisatie: wij leggen uw droomtuin volledig aan met kwalitatieve materialen en vakmanschap.',
      features: ['Grondwerkzaamheden', 'Beplanting', 'Verharding', 'Irrigatiesystemen'],
      price: 'Op maat',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    },
    {
      id: 'stratenmaker',
      title: 'Bestrating',
      subtitle: 'Terrassen & tuinpaden',
      description: 'Duurzame bestratingswerken voor terrassen, opritten en tuinpaden. Verschillende materialen en stijlen mogelijk.',
      features: ['Keramische tegels', 'Natuursteen', 'Betonstraat', 'Drainage systemen'],
      price: 'Vanaf €45/m²',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80'
    },
    {
      id: 'groendak',
      title: 'Groendaken',
      subtitle: 'Duurzame dakoverdekking',
      description: 'Extensieve en intensieve groendaken voor een duurzamere leefomgeving. Expertise in waterafvoer en beplanting.',
      features: ['Waterafvoer', 'Isolatie verbetering', 'Biodiversiteit', 'Energiebesparing'],
      price: 'Vanaf €85/m²',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          
          {/* Hero Section */}
          <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ 
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
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '1rem' 
              }}>
                {services.map((service) => (
                  <div key={service.id} style={{ 
                    background: 'var(--white)', 
                    borderRadius: '16px', 
                    boxShadow: '0px 4px 20px 0px #0000000F', 
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '200px',
                      position: 'relative',
                    }}>
                      <ImageComponent sizes='376px' fill style={{ objectFit: 'cover' }} loading='lazy' src={service.image} alt={`image of ${service.title}`} />
                    </div>
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '20px 24px 24px 24px',
                      gap: '12px',
                    }}>
                      <div style={{ backgroundColor: '#16423C14', padding: '4px 10px', borderRadius: '4px', width: 'fit-content' }}>
                        <p style={{ fontSize: '11px', lineHeight: '100%', color: '#16423C', fontWeight: 600,  }}>{service.subtitle}</p>
                      </div>  
                      <p style={{ fontWeight: 700, fontSize: '22px', color: '#1F2937', lineHeight: '100%', letterSpacing: '-0.3px' }}>{service.title}</p>
                      <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '22px', fontWeight: 400 }}>{service.description}</p>
                      <Link href={`/diensten/${service.id}`} className="service-learn-more">Learn more →</Link>
                    </div>  
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section style={{ marginBottom: '4rem' }}>
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
                  <FeatureCard
                    icon={
                      <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    }
                    title="Gecertificeerd & Verzekerd"
                    description="Alle hoveniers zijn vakbekwaam, gecertificeerd en volledig verzekerd voor uw veiligheid"
                  />
                  <FeatureCard
                    icon={
                      <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    }
                    title="Kwaliteitsgarantie"
                    description="Tevredenheid gegarandeerd met naservice en advies voor optimaal tuinresultaat"
                  />
                  <FeatureCard
                    icon={
                      <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    }
                    title="Snelle Reactie"
                    description="Binnen 24 uur reactie op uw aanvraag en flexibele planning voor uw gemak"
                  />
                </div>
              </div>
            </section>

            {/* Quote Section */}
            <section>
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
