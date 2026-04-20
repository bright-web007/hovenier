import Navigation from "@/app/components/Navigation";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import DienstCard from "@/app/components/DienstCard";
import ReviewCard from "@/app/components/ReviewCard";
import LeadFormSection from "@/app/components/LeadFormSection";
import { getLocaleAlternates, getAbsoluteUrl, localizePath, SupportedLocale } from "@/lib/locale-utils";
import { getRegionHubBySlug, getGemeenteBySlug } from "@/lib/regions-hierarchy";
import { Metadata } from 'next';


type Props = {
  params: Promise<{ locale: string; slug: string; gemeente: string; 'city-slug': string }>;
};


export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, gemeente, 'city-slug': citySlug } = await params;
  const validLocale = locale || defaultLocale;
  const isEn = validLocale === 'en';

  const formatName = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const cityName = formatName(citySlug);

  const title = isEn
    ? `Gardener in ${cityName} | Hovenier.frl`
    : `Hovenier in ${cityName} | Hovenier.frl`;
  const description = isEn
    ? `Find a reliable gardener in ${cityName}. Via Hovenier.frl you can easily find experienced gardeners in ${cityName} and surroundings. Compare multiple quotes from local specialists.`
    : `Een betrouwbare hovenier in ${cityName} vinden hoeft niet ingewikkeld te zijn. Via Hovenier.frl wordt u eenvoudig gekoppeld aan ervaren hoveniers in ${cityName} en omgeving. Vergelijk meerdere offertes van lokale vakmensen.`;

  return {
    title,
    description,
    keywords: isEn
      ? [`gardener ${cityName.toLowerCase()}`, 'garden maintenance', 'garden design', 'landscaping', 'friesland']
      : [`hovenier ${cityName.toLowerCase()}`, 'tuinonderhoud', 'tuinaanleg', 'tuinontwerp', 'friesland'],
    alternates: getLocaleAlternates(`/regio/${slug}/${gemeente}/${citySlug}`, validLocale as SupportedLocale),
  };
}

const Page = async ({ params }: Props) => {
    const { locale, slug, gemeente, 'city-slug': citySlug } = await params;
    const validLocale = locale || defaultLocale;
    const isEn = validLocale === 'en';

    const regionHub = getRegionHubBySlug(slug);
    const gemeenteData = getGemeenteBySlug(gemeente);

    const formatLabel = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const cityName = formatLabel(citySlug);

    const breadcrumbItems = [
        { label: 'Home', href: `/${validLocale}` },
        { label: isEn ? 'Regions' : "Regio's", href: `/${validLocale}/regio` },
        { label: regionHub?.name || formatLabel(slug), href: `/${validLocale}/regio/${slug}` },
        { label: gemeenteData?.name || formatLabel(gemeente), href: `/${validLocale}/regio/${slug}/${gemeente}` },
        { label: cityName },
    ];

    return (
        <>
        <Navigation locale={validLocale} />
        <Breadcrumbs items={breadcrumbItems} />
        {/* Hero Section */}
        <section style={{ backgroundColor: '#2A3E20EB', width: '100%' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '56px 1rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{
              fontFamily: 'var(--heading-font)',
              fontSize: '48px',
              fontWeight: '600',
              color: '#F4F0E8',
              lineHeight: '52px',
              margin: 0,
            }}>
              {isEn ? `Gardener in ${cityName}` : `Hovenier in ${cityName}`}
            </h1>

            <div style={{
              color: '#FFFFFFCC',
              fontSize: '15px',
              lineHeight: '25px',
              margin: 0,
              maxWidth: '720px',
              padding: '1rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <p>{isEn
                ? `Finding a reliable gardener in ${cityName} doesn't have to be complicated. Via Hovenier.frl you can easily find experienced gardeners in ${cityName} and surroundings. Whether it's garden maintenance, garden design or a complete makeover, you will receive and compare multiple quotes from local specialists that suit your project.`
                : `Een betrouwbare hovenier in ${cityName} vinden hoeft niet ingewikkeld te zijn. Via Hovenier.frl wordt u eenvoudig gekoppeld aan ervaren hoveniers in ${cityName} en omgeving. Of het nu gaat om tuinonderhoud, tuinontwerp of een grondige renovatie, u ontvangt en vergelijkt meerdere offertes van vakmensen die passen bij uw project.`
              }</p>
              <p>
                {isEn
                  ? `Thanks to our local network, we know the conditions in ${cityName} well, such as the soil type, high water table and the influence of wind. This way you will find a specialist who delivers work that fits perfectly with your garden and the surroundings.`
                  : `Dankzij ons lokale netwerk zijn de omstandigheden in ${cityName} goed bekend, zoals de bodemgesteldheid, hoge grondwaterstand en de invloed van water en wind. Hierdoor wordt u gekoppeld aan een specialist die werk levert dat perfect aansluit op uw tuin en de omgeving.`
                }
              </p>
            </div>


            <p style={{
              color: '#F4F0E8',
              fontSize: '15px',
              fontWeight: '500',
              lineHeight: '25px',
            }}>
              {isEn
                ? `Request free quotes now and receive a response within 24 hours from gardeners in ${cityName}.`
                : `Vraag direct gratis offertes aan en ontvang binnen 24 uur reacties van hoveniers in ${cityName}.`
              }
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              marginTop: '.5rem',
              color: '#B8C4B0',
              fontSize: '14px',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13.3 4L6 11.3 2.7 8" stroke="#8AB87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {isEn ? 'No obligation' : 'Vrijblijvend'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13.3 4L6 11.3 2.7 8" stroke="#8AB87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {isEn ? 'Multiple quotes' : 'Meerdere offertes'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13.3 4L6 11.3 2.7 8" stroke="#8AB87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {isEn ? 'Local specialists' : 'Lokale vakmensen'}
              </span>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#EDE9E0', width: '100%' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem 112px 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: 'var(--heading-font)',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--forest)',
                marginBottom: '0.5rem',
              }}>
                {isEn ? `Our services in ${cityName}` : `Onze diensten in ${cityName}`}
              </h2>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '15px',
                lineHeight: '100%',
              }}>
                {isEn
                  ? `Professional garden services tailored to the ${cityName} area`
                  : `Professionele tuindiensten afgestemd op de ${cityName}er omgeving`
                }
              </p>
            </div>

            <div className="grid-responsive-3" style={{ gap: '1rem' }}>
              <DienstCard
                id="tuinonderhoud"
                title={isEn ? `Garden maintenance in ${cityName}` : `Tuinonderhoud in ${cityName}`}
                subtitle={isEn ? 'Regular maintenance & care' : 'Regulier onderhoud & verzorging'}
                description={isEn
                  ? `We connect you with gardeners in ${cityName} for professional garden maintenance, tailored to the soil type and the Frisian climate.`
                  : `Wij koppelen u aan hoveniers in ${cityName} voor professioneel tuinonderhoud, afgestemd op de bodemgesteldheid en het Friese klimaat.`
                }
                image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                locale={validLocale}
              />
              <DienstCard
                id="tuinontwerp"
                title={isEn ? `Garden design in ${cityName}` : `Tuinontwerp in ${cityName}`}
                subtitle={isEn ? 'Creative garden concepts' : 'Creatieve tuinconcepten'}
                description={isEn
                  ? `Get help from creative landscapers who know what works best for a practical and attractive garden design that suits your garden and the surroundings.`
                  : `Krijg hulp van creatieve tuinarchitecten die weten wat het beste werkt voor een praktisch en aantrekkelijk tuinontwerp dat past bij uw tuin en omgeving.`
                }
                image="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80"
                locale={validLocale}
              />
              <DienstCard
                id="groendak"
                title={isEn ? `Green roofs in ${cityName}` : `Groendaken in ${cityName}`}
                subtitle={isEn ? 'Sustainable roof covering' : 'Duurzame dakoverdekking'}
                description={isEn
                  ? `We connect you with specialists in green roofs for durable coverings with expertise in water drainage, insulation and a longer lifespan for your roof.`
                  : `Wij koppelen u aan specialisten in groendaken voor duurzame dakbedekkingen met expertise in waterafvoer, isolatie en een langere levensduur van uw dak.`
                }
                image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
                locale={validLocale}
              />
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'var(--cream)', width: '100%' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{
                fontFamily: 'var(--heading-font)',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--forest)',
              }}>
                {isEn ? 'What our customers say' : 'Wat onze klanten zeggen'}
              </h2>
              <p style={{
                color: 'var(--forest-mid)',
                fontSize: '15px',
                lineHeight: '26px',
                fontWeight: 400
              }}>
                {isEn
                  ? `Experiences from garden owners in ${cityName} and surroundings`
                  : `Ervaringen van tuineigenaren in ${cityName} en omgeving`
                }
              </p>
            </div>

            <div className="grid-responsive-3">
              <ReviewCard
                quote={isEn
                  ? `Via Hovenier FRL we were able to get three quotes within one day. The gardener we chose understood exactly what we wanted and made our garden beautifully maintained. Highly recommended!`
                  : `Via Hovenier FRL hadden we binnen een dag drie offertes. De hovenier die we kozen begreep precies wat we wilden en heeft onze tuin prachtig onderhouden. Heel blij mee!`
                }
                name="Marieke de Boer"
                image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                subtitle={isEn ? 'Sneek' : 'Sneek'}
              />
              <ReviewCard
                quote={isEn
                  ? `Finally a platform where you can find a reliable gardener. The person who designed our garden really understood what we needed. The design fits the neighbourhood perfectly. The result is fantastic.`
                  : `Eindelijk een platform waar je snel betrouwbare hoveniers kunt vergelijken. De vakman die onze tuin heeft ontworpen kende de kleigrond en het weer perfect. Resultaat is fantastisch.`
                }
                name="Jan Willem Visser"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                subtitle={isEn ? 'Sneek · Front yard' : 'Sneek · Voortuin'}
              />
              <ReviewCard
                quote={isEn
                  ? `Very pleased that via Hovenier FRL it is arranged so easily! The work exceeded our expectations. Professional advice, fair price and neatly finished. Definitely recommended!`
                  : `Het groendak dat via Hovenier FRL is geregeld overtreft onze verwachtingen. Professioneel advies, eerlijke prijs en netjes opgeleverd. Zeker een aanrader!`
                }
                name="Sietske Dijkstra"
                image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                subtitle={isEn ? 'Sneek · Green roof' : 'Sneek · Groendak'}
              />
            </div>
          </div>
        </section>

        <LeadFormSection
          title={isEn ? `Request free quotes in ${cityName}` : `Gratis offerte aanvragen in ${cityName}`}
          subtitle={isEn ? `Receive within 24 hours responses from local gardener specialists` : `Ontvang binnen 24 uur reacties van lokale hovenier specialisten`}
          locale={validLocale}
          backgroundColor="#FFFFFF"
          translations={{
            form_eyebrow: isEn ? 'Free Quote' : 'Gratis Offerte',
            form_title: isEn ? 'Request a quote' : 'Vraag een offerte aan',
            form_subtitle: isEn ? `Receive within 24 hours responses from gardeners in your area` : `Ontvang binnen 24 uur reacties van hoveniers in uw regio`,
            your_name: isEn ? 'Your name' : 'Uw naam',
            municipality: isEn ? 'Municipality' : 'Gemeente',
            service: isEn ? 'Desired service' : 'Gewenste dienst',
            phone_number: isEn ? 'Phone number' : 'Telefoonnummer',
            send_request: isEn ? 'Send request' : 'Verstuur aanvraag',
            form_note: isEn ? 'By submitting this form you agree to our terms' : 'Door dit formulier te versturen gaat u akkoord met onze voorwaarden',
            select_municipality: isEn ? 'Select municipality' : 'Selecteer gemeente',
            what_do_you_need: isEn ? 'What do you need?' : 'Wat heeft u nodig?',
            your_company: isEn ? 'Your company' : 'Uw bedrijf',
            loading: isEn ? 'Sending...' : 'Versturen...',
            privacy_agreement: isEn ? 'I agree to the' : 'Ik ga akkoord met het',
            privacy_link: isEn ? 'privacy policy' : 'privacybeleid',
            privacy_consent: isEn ? 'and consent to processing my data.' : 'en geef toestemming voor het verwerken van mijn gegevens.',
            services: {
              tuinonderhoud: isEn ? 'Garden Maintenance' : 'Tuinonderhoud',
              tuinontwerp: isEn ? 'Garden Design' : 'Tuinontwerp',
              'tuin-aanleggen': isEn ? 'Garden Installation' : 'Tuin Aanleggen',
              stratenmaker: isEn ? 'Paving' : 'Bestrating',
              groendak: isEn ? 'Green Roof' : 'Groendak',
              overig: isEn ? 'Other' : 'Overig',
            },
          }}
        />
        </>
    )
}

export default Page;