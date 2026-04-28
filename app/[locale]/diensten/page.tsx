import "../../styles/dienst-card.css";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import NewLeadForm from '@/app/components/NewLeadForm';
import ServiceSchema from '../../components/schemas/ServiceSchema';
import { getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils';
import DienstCard from '@/app/components/DienstCard';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

function isSupportedPageLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

type Props = {
  params: Promise<{ locale: string }>;
};

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
  if (!isSupportedPageLocale(validLocale)) notFound();
  const isEn = validLocale === 'en';

  // Service data
  const services = [
    {
      id: 'tuinonderhoud',
      title: isEn ? 'Garden Maintenance' : 'Tuinonderhoud',
      subtitle: isEn ? 'Regular maintenance & care' : 'Regulier onderhoud & verzorging',
      description: isEn ? 'Professional garden maintenance to keep your garden in top condition all year round. From mowing lawns to trimming hedges.' : 'Professioneel tuinonderhoud om uw tuin het hele jaar door in topconditie te houden. Van gras maaien tot hagen knippen.',
      features: isEn ? ['Lawn mowing', 'Hedge trimming', 'Weed control', 'Seasonal tasks'] : ['Gras maaien', 'Hagen knippen', 'Onkruidbestrijding', 'Seizoensklussen'],
      price: isEn ? 'From €35/hour' : 'Vanaf €35/uur',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80'
    },
    {
      id: 'tuinontwerp',
      title: isEn ? 'Garden Design' : 'Tuinontwerp',
      subtitle: isEn ? 'Creative garden concepts' : 'Creatieve tuinconcepten',
      description: isEn ? 'Custom garden designs that perfectly match your wishes, style and budget. From compact to expansive.' : 'Op maat gemaakte tuinontwerpen die perfect aansluiten bij uw wensen, stijl en budget. Van compact tot expansief.',
      features: isEn ? ['3D visualizations', 'Plant schemes', 'Style advice', 'Budget planning'] : ['3D visualisaties', 'Plantenschema\'s', 'Stijladvies', 'Budget planning'],
      price: isEn ? 'From €750' : 'Vanaf €750',
      image: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80'
    },
    {
      id: 'tuin-aanleggen',
      title: isEn ? 'Garden Construction' : 'Tuin Aanleggen',
      subtitle: isEn ? 'Complete garden realization' : 'Complete tuinrealisatie',
      description: isEn ? 'From concept to realization: we build your dream garden with quality materials and craftsmanship.' : 'Van concept tot realisatie: wij leggen uw droomtuin volledig aan met kwalitatieve materialen en vakmanschap.',
      features: isEn ? ['Groundwork', 'Planting', 'Paving', 'Irrigation systems'] : ['Grondwerkzaamheden', 'Beplanting', 'Verharding', 'Irrigatiesystemen'],
      price: isEn ? 'Custom' : 'Op maat',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    },
    {
      id: 'stratenmaker',
      title: isEn ? 'Paving' : 'Bestrating',
      subtitle: isEn ? 'Patios & garden paths' : 'Terrassen & tuinpaden',
      description: isEn ? 'Durable paving work for patios, driveways and garden paths. Various materials and styles available.' : 'Duurzame bestratingswerken voor terrassen, opritten en tuinpaden. Verschillende materialen en stijlen mogelijk.',
      features: isEn ? ['Ceramic tiles', 'Natural stone', 'Concrete paving', 'Drainage systems'] : ['Keramische tegels', 'Natuursteen', 'Betonstraat', 'Drainage systemen'],
      price: isEn ? 'From €45/m²' : 'Vanaf €45/m²',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80'
    },
    {
      id: 'groendak',
      title: isEn ? 'Green Roofs' : 'Groendaken',
      subtitle: isEn ? 'Sustainable roof covering' : 'Duurzame dakoverdekking',
      description: isEn ? 'Extensive and intensive green roofs for a more sustainable living environment. Expertise in water drainage and planting.' : 'Extensieve en intensieve groendaken voor een duurzamere leefomgeving. Expertise in waterafvoer en beplanting.',
      features: isEn ? ['Water drainage', 'Insulation improvement', 'Biodiversity', 'Energy savings'] : ['Waterafvoer', 'Isolatie verbetering', 'Biodiversiteit', 'Energiebesparing'],
      price: isEn ? 'From €85/m²' : 'Vanaf €85/m²',
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
                fontFamily: 'var(--heading-font)',
                fontWeight: '600',
                color: 'var(--forest)',
                marginBottom: '1.5rem',
                lineHeight: '1.1'
              }}>
                {isEn ? 'Our Garden Services' : 'Onze Hovendiensten'}
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'var(--forest-mid)',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                {isEn ? 'Professional garden specialists for all your green dreams in Friesland' : 'Professionele tuinspecialisten voor al uw groene dromen in Friesland'}
              </p>
            </div>

            {/* Services Grid */}
            <section style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '4rem' }}>
              <div className="diensten-grid">
                {services.map((service) => (
                  <DienstCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    subtitle={service.subtitle}
                    description={service.description}
                    image={service.image}
                    locale={validLocale}
                  />
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
                  fontFamily: 'var(--heading-font)'
                }}>
                  {isEn ? 'Why Choose Our Gardeners?' : 'Waarom Kiezen voor Onze Hoveniers?'}
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
                    title={isEn ? 'Certified & Insured' : 'Gecertificeerd & Verzekerd'}
                    description={isEn ? 'All gardeners are qualified, certified and fully insured for your safety' : 'Alle hoveniers zijn vakbekwaam, gecertificeerd en volledig verzekerd voor uw veiligheid'}
                  />
                  <FeatureCard
                    icon={
                      <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    }
                    title={isEn ? 'Quality Guarantee' : 'Kwaliteitsgarantie'}
                    description={isEn ? 'Satisfaction guaranteed with aftercare and advice for optimal garden results' : 'Tevredenheid gegarandeerd met naservice en advies voor optimaal tuinresultaat'}
                  />
                  <FeatureCard
                    icon={
                      <svg style={{ width: '28px', height: '28px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    }
                    title={isEn ? 'Fast Response' : 'Snelle Reactie'}
                    description={isEn ? 'Response within 24 hours and flexible scheduling for your convenience' : 'Binnen 24 uur reactie op uw aanvraag en flexibele planning voor uw gemak'}
                  />
                </div>
              </div>
            </section>

            {/* Quote Section */}
            <section id="quote-form">
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
                    fontFamily: 'var(--heading-font)'
                  }}>
                    {isEn ? 'Ready to Get Started?' : 'Klaar om te Beginnen?'}
                  </h2>
                  <p style={{
                    fontSize: '1.125rem',
                    color: 'var(--forest-mid)',
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}>
                    {isEn ? 'Request a free quote today and discover what our gardeners can do for your garden.' : 'Vraag vandaag nog een vrijblijvende offerte aan en ontdek wat onze hoveniers voor uw tuin kunnen betekenen.'}
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
