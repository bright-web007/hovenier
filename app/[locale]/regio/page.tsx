import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LocalBusinessSchema } from '../../components/StructuredData';
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { regionHubs, standaloneRegions } from '@/lib/regions-hierarchy';
import Link from 'next/link';
import ImageComponent from '@/app/components/ImageComponent';

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--forest-mid)' }}>
      <span style={{ width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', marginRight: '0.75rem', flexShrink: '0' }} />
      {children}
    </li>
  );
}

function ServiceCategory({ title, subtitle, items }: { title: string; subtitle: string; items: string[] }) {
  return (
    <div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>{title}</h3>
      <p style={{ color: 'var(--forest-mid)', fontSize: '14px', marginBottom: '0.75rem' }}>{subtitle}</p>
      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
        {items.map((item) => <BulletItem key={item}>{item}</BulletItem>)}
      </ul>
    </div>
  );
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '2rem', fontWeight: '600', color, marginBottom: '0.5rem', fontFamily: 'var(--serif)' }}>{value}</p>
      <p style={{ color: 'var(--forest-mid)', fontWeight: '500', fontSize: '14px' }}>{label}</p>
    </div>
  );
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
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--forest-mid)', fontSize: '14px' }}>{description}</p>
    </div>
  );
}

const translations = {
  nl: {
    metaTitle: 'Hoveniers per Regio in Friesland | Hovenier.frl',
    metaDescription: "Vind lokale hoveniers in alle regio's van Friesland. Van Noordwest-Friesland tot Zuidwest-Friesland - ontdek welke tuinspecialisten actief zijn in jouw regio.",
    metaKeywords: 'hovenier per regio, Friesland hoveniers, lokale tuinman, regio hovenier, Friese gemeenten',
    schemaContext: 'Hoveniers per Gemeente Friesland',
    heroTitle: 'Hoveniers per Regio in Friesland',
    heroSubtitle: 'Ontdek hoveniers georganiseerd per Friese regio. Van de kust tot het binnenland.',
    whyLocalTitle: 'Waarom Lokale Hoveniers?',
    shortDistance: 'Korte Afstand',
    shortDistanceDesc: 'Lagere reiskosten en snellere service door nabijheid',
    localKnowledge: 'Lokale Kennis',
    localKnowledgeDesc: 'Bekend met bodemsoort, klimaat en lokale voorschriften',
    personalService: 'Persoonlijke Service',
    personalServiceDesc: 'Nabije relatie, beter begrip van uw wensen',
    chooseRegion: 'Kies uw Regio',
    municipalities: 'gemeenten',
    municipalitiesInRegion: 'Gemeenten in deze regio:',
    more: 'meer',
    discoverGardeners: 'Ontdek hoveniers →',
    residents: 'inwoners',
    capitalOfFriesland: '📍Hoofdstad van Friesland',
    popularServicesTitle: 'Populaire Diensten per Regio',
    coastalAreas: 'Kustgebieden',
    coastalAreasSubtitle: '(Noordwest & Noordoost-Friesland)',
    coastalItems: ['Zoutbestendige beplanting', 'Windschermen & haagaanleg', 'Kusttuinen & natuurlijke uitstraling'],
    inland: 'Binnenland',
    inlandSubtitle: '(Centraal & Zuidwest-Friesland)',
    inlandItems: ['Landelijke & natuurlijke tuinen', 'Boomgaarden & fruittuin aanleg', 'Waterpartijen & natuurvijvers'],
    urbanAreas: 'Stedelijke Gebieden',
    urbanAreasSubtitle: '(Leeuwarden & Heerenveen)',
    urbanItems: ['Kleine tuinen & achtertuinen', 'Tuinverbouwing & modernisering', 'Groendaken & duurzaamheid'],
    statsTitle: 'Hoveniers in Friesland',
    affiliatedGardeners: 'Aangesloten Hoveniers',
    municipalityCoverage: 'Gemeenten Dekking',
    avgResponseTime: 'Gemiddelde Reactietijd',
    avgRating: 'Gemiddelde Beoordeling',
    responseTimeValue: '24u',
  },
  en: {
    metaTitle: 'Gardeners by Region in Friesland | Hovenier.frl',
    metaDescription: 'Find local gardeners in all regions of Friesland. From Northwest Friesland to Southwest Friesland - discover which garden specialists are active in your region.',
    metaKeywords: 'gardener by region, Friesland gardeners, local gardener, region gardener, Frisian municipalities',
    schemaContext: 'Gardeners by Municipality Friesland',
    heroTitle: 'Gardeners by Region in Friesland',
    heroSubtitle: 'Discover gardeners organized by Frisian region. From the coast to the inland.',
    whyLocalTitle: 'Why Local Gardeners?',
    shortDistance: 'Short Distance',
    shortDistanceDesc: 'Lower travel costs and faster service through proximity',
    localKnowledge: 'Local Knowledge',
    localKnowledgeDesc: 'Familiar with soil type, climate and local regulations',
    personalService: 'Personal Service',
    personalServiceDesc: 'Close relationship, better understanding of your wishes',
    chooseRegion: 'Choose your Region',
    municipalities: 'municipalities',
    municipalitiesInRegion: 'Municipalities in this region:',
    more: 'more',
    discoverGardeners: 'Discover gardeners →',
    residents: 'residents',
    capitalOfFriesland: '📍Capital of Friesland',
    popularServicesTitle: 'Popular Services by Region',
    coastalAreas: 'Coastal Areas',
    coastalAreasSubtitle: '(Northwest & Northeast Friesland)',
    coastalItems: ['Salt-resistant planting', 'Windbreaks & hedge installation', 'Coastal gardens & natural appearance'],
    inland: 'Inland',
    inlandSubtitle: '(Central & Southwest Friesland)',
    inlandItems: ['Rural & natural gardens', 'Orchards & fruit garden installation', 'Water features & natural ponds'],
    urbanAreas: 'Urban Areas',
    urbanAreasSubtitle: '(Leeuwarden & Heerenveen)',
    urbanItems: ['Small gardens & backyards', 'Garden renovation & modernization', 'Green roofs & sustainability'],
    statsTitle: 'Gardeners in Friesland',
    affiliatedGardeners: 'Affiliated Gardeners',
    municipalityCoverage: 'Municipality Coverage',
    avgResponseTime: 'Average Response Time',
    avgRating: 'Average Rating',
    responseTimeValue: '24h',
  },
};

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = translations[(locale as 'nl' | 'en')] ?? translations.nl;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.metaKeywords,
    alternates: getLocaleAlternates('/regio', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static regional data, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function RegioLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale)

  const t = translations[(locale as 'nl' | 'en')] ?? translations.nl;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: localizePath('/', locale as SupportedLocale) },
    { label: locale === 'en' ? 'Regions' : 'Regio\'s', href: localizePath('/regio', locale as SupportedLocale) }
  ];

  return (
    <>
      <LocalBusinessSchema 
        url={getAbsoluteUrl('/regio', locale as SupportedLocale)}
        nameContext={t.schemaContext}
      />
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--cream-light), var(--forest-light))' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          {/* Hero Section */}
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '3rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              {t.heroTitle}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6' }}>
              {t.heroSubtitle}
            </p>
          </div>

          {/* Friesland Map or Visual */}
          <section style={{ maxWidth: '1280px', margin: '0 auto', marginBottom: '4rem' }}>
            <div style={{ background: 'var(--white)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', textAlign: 'center', fontFamily: 'var(--serif)' }}>
                {t.whyLocalTitle}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <FeatureCard
                  icon={
                    <svg style={{ width: '32px', height: '32px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  }
                  title={t.shortDistance}
                  description={t.shortDistanceDesc}
                />
                <FeatureCard
                  icon={
                    <svg style={{ width: '32px', height: '32px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.5 17a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-.5h-3v.5zM8 19.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" />
                    </svg>
                  }
                  title={t.localKnowledge}
                  description={t.localKnowledgeDesc}
                />
                <FeatureCard
                  icon={
                    <svg style={{ width: '32px', height: '32px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  }
                  title={t.personalService}
                  description={t.personalServiceDesc}
                />
              </div>
            </div>
          </section>

          {/* Regional Hubs Grid */}
          <section style={{ maxWidth: '80rem', margin: '0 auto', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '3rem', textAlign: 'center' }}>
              {t.chooseRegion}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {/* Region Hubs */}
              {regionHubs.map((hub) => (
                <Link key={hub.slug} href={localizePath(`/regio/${hub.slug}`, locale as SupportedLocale)}>
                  <div className="region-hub-card">
                    <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                      <ImageComponent fill src={hub.image} alt={`${hub.name} image`} style={{ objectFit: 'cover'}} />
                    </div>
                    <div style={{ padding: '20px 24px 24px 24px', gap: '8px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '100%', color: '#1F2937' }}>{`${hub.name}`}</p>
                      <p style={{ fontSize: '14px', lineHeight: '100%', color: '#6B7280', marginBottom: '0.5rem' }}>{hub.gemeentes.length} {t.municipalities}</p>
                      <p style={{ color: '#6B7280', fontSize: '15px', marginBottom: '0.5rem', lineHeight: '1.6' }}>{locale === 'en' ? hub.descriptionEn : hub.description}</p>
                      <p style={{ fontSize: '14px', lineHeight: '100%', color: '#6B7280', fontWeight: '600' }}>{t.municipalitiesInRegion}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem', }}>
                        {hub.gemeentes.slice(0, 4).map((gemeente) => (
                          <span key={gemeente.slug} style={{ 
                            background: '#F5F0E8', 
                            color: '#5C4033', 
                            padding: '3px 8px', 
                            borderRadius: '4px', 
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {gemeente.name}
                          </span>
                        ))}
                        {hub.gemeentes.length > 4 && (
                          <span style={{ 
                            color: '#5C4033', 
                            fontSize: '11px',
                            fontWeight: '500',
                            padding: '3px 8px', 
                          }}>
                            +{hub.gemeentes.length - 4} {t.more}
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '1rem', 
                        background: '#16423C', 
                        borderRadius: '8px', 
                        marginTop: 'auto',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: 'white', fontWeight: '600', fontSize: '13px' }}>
                          Ontdek hoveniers →
                        </p>
                        <p style={{ fontSize: '13px', color: 'white', fontWeight: '600' }}>
                          {hub.totalPopulation.toLocaleString()} inwoners
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Standalone Leeuwarden */}
              {standaloneRegions.map((gemeente) => (
                <Link key={gemeente.slug} href={localizePath(`/regio/leeuwarden/${gemeente.slug}`, locale as SupportedLocale)}>
                  <div className="region-standalone-card">
                    <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                      <ImageComponent fill src={gemeente.image ?? ""} alt={`${gemeente.name} image`} style={{ objectFit: 'cover'}} />
                    </div>
                    <div style={{ padding: '20px 24px 24px 24px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '100%', color: '#1F2937' }}>{`${gemeente.name}`}</p>
                      <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '100%', color: '#000000', marginBottom: '0.5rem' }}>{t.capitalOfFriesland}</p>
                      <p style={{ color: '#6B7280', fontSize: '15px', marginBottom: '0.5rem', lineHeight: '1.6' }}>{locale === 'en' ? gemeente.introEn : gemeente.intro}</p>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '1rem', 
                        background: '#16423C', 
                        borderRadius: '8px', 
                        marginTop: 'auto',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: 'white', fontWeight: '600', fontSize: '13px' }}>
                          Bekijk hoveniers →
                        </p>
                        <p style={{ fontSize: '13px', color: 'white', fontWeight: '600' }}>
                          {gemeente.population.toLocaleString()} inwoners
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Services by Region */}
          <section style={{ maxWidth: '1280px', margin: '0 auto', marginBottom: '4rem' }}>
            <div style={{ background: 'var(--cream-dark)', borderRadius: '12px', padding: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
                {t.popularServicesTitle}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                <ServiceCategory
                  title={t.coastalAreas}
                  subtitle={t.coastalAreasSubtitle}
                  items={t.coastalItems}
                />
                <ServiceCategory
                  title={t.inland}
                  subtitle={t.inlandSubtitle}
                  items={t.inlandItems}
                />
                <ServiceCategory
                  title={t.urbanAreas}
                  subtitle={t.urbanAreasSubtitle}
                  items={t.urbanItems}
                />
              </div>
            </div>
          </section>

          {/* Regional Statistics */}
          <section style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ background: 'var(--white)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', textAlign: 'center' }}>
                {t.statsTitle}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                <StatCard value="150+" label={t.affiliatedGardeners} color="var(--sage)" />
                <StatCard value="11" label={t.municipalityCoverage} color="var(--forest)" />
                <StatCard value={t.responseTimeValue} label={t.avgResponseTime} color="var(--sage)" />
                <StatCard value="4.8/5" label={t.avgRating} color="var(--gold)" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    </>
  )
}
