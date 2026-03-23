
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Navigation from '@/app/components/Navigation';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import LocalBusinessSchema from '@/app/components/schemas/LocalBusinessSchema';
import FAQAccordion from '@/app/components/FAQAccordion';
import { getAbsoluteUrl, getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils';
import { regions } from '@/lib/regions';
import { services } from '@/lib/services';

interface RegionPageProps {
  params: Promise<{
    locale: string;
    regio: string;
  }>;
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { locale, regio } = await params;
  const region = regions.find(r => r.slug === regio);
  return {
    title: region ? `Hovenier in ${region.name} | Hovenier.frl` : `Hovenier in ${regio} | Hovenier.frl`,
    description: region ? region.intro : `Vind hoveniers en tuinspecialisten in ${regio}.`,
    alternates: getLocaleAlternates(`/hovenier-${regio}`, locale as SupportedLocale),
  };
}

export async function generateStaticParams() {
  // Example: only Dutch for now, expand as needed
  const locales = ['nl', 'en'];
  return locales.flatMap(locale => regions.map(r => ({ locale, regio: r.slug })));
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { locale, regio } = await params;
  setRequestLocale(locale);
  const region = regions.find(r => r.slug === regio);
  // TODO: Replace with real data
  const gardeners: any[] = [];
  const recentJobs: any[] = [];
  // Collect all FAQs for this region from all services
  const faqs = services.flatMap(service =>
    service.faqs.map(faq => ({
      question: faq.q.replace('[regio]', region ? region.name : regio),
      answer: faq.a.replace('[regio]', region ? region.name : regio),
    }))
  );

  if (!region) {
    return <div>Regio niet gevonden</div>;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'Regions' : 'Regio', href: '/hovenier-friesland' },
    { label: region.name }
  ];

  return (
    <>
      {/* Schema markup for LocalBusiness */}
      <LocalBusinessSchema 
        name={`Hovenier in ${region.name}`}
        description={region.intro}
        url={getAbsoluteUrl(`/hovenier-${region.slug}`, locale as SupportedLocale)}
        areaServed={region.name}
        serviceTypes={["Lokale Hoveniers", "Gemeente Tuinspecialisten", "Regionale Tuinservices"]}
        ratingValue="4.8"
        reviewCount="47"
      />
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, var(--cream-light), var(--sage-light))' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem' }}>
          {/* Unique H1 and intro paragraph */}
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--serif)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Hovenier in {region.name}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6' }}>
            {region.intro}
          </p>

          {/* Dynamic: List of gardeners in this region */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Beschikbare hoveniers in {region.name}</h2>
            {gardeners.length > 0 ? (
              <div>
                {/* TODO: Map over gardeners array */}
                [GardenerCard components]
              </div>
            ) : (
              <div style={{ color: 'var(--forest-mid)', fontSize: '1rem', margin: '1rem 0' }}>
                Er zijn momenteel geen hoveniers getoond voor deze regio. Vraag gerust een offerte aan!
              </div>
            )}
          </section>

          {/* Dynamic: Recent jobs completed in this region */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Recente projecten in {region.name}</h2>
            {recentJobs.length > 0 ? (
              <div>
                {/* TODO: Map over recentJobs array */}
                [RecentJobCard components]
              </div>
            ) : (
              <div style={{ color: 'var(--forest-mid)', fontSize: '1rem', margin: '1rem 0' }}>
                Nog geen afgeronde projecten getoond voor deze regio.
              </div>
            )}
          </section>

          {/* FAQ Section with schema markup */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Veelgestelde vragen over hoveniers in {region.name}</h2>
            <FAQAccordion faqs={faqs} />
          </section>

          {/* Service cards linking to city+service pages */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Populaire diensten in {region.name}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {services.map(service => (
                <a
                  key={service.slug}
                  href={`/hovenier-${region.slug}/${service.slug}`}
                  style={{
                    display: 'block',
                    background: 'var(--white)',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                    padding: '1rem 1.5rem',
                    color: 'var(--forest)',
                    textDecoration: 'none',
                    minWidth: '180px',
                    fontWeight: 500,
                  }}
                >
                  {service.name}
                </a>
              ))}
            </div>
          </section>

          {/* Prometheus job request form, pre-filled with region */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Vraag direct een offerte aan</h2>
            {/* TODO: Insert Prometheus/NewLeadForm with region pre-filled */}
            <div>[NewLeadForm regio={region.name}]</div>
          </section>

          {/* Trust signals: reviews, jobs completed, etc. */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>Waarom kiezen voor Hovenier.frl?</h2>
            {/* TODO: Insert trust signals, stats, reviews */}
            <div>[Trust signals, reviews, stats]</div>
          </section>
        </div>
      </main>
    </>
  );
}
