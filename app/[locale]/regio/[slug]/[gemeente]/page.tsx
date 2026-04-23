import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '../../../../components/Navigation'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import NewLeadForm from "@/app/components/NewLeadForm"
import RelatedArticles from '../../../../components/RelatedArticles'
import { LocalBusinessSchema, BreadcrumbSchema } from '../../../../components/StructuredData'
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { env } from '@/lib/env';
import { createTranslator } from '@/i18n'
import { regionHubs, getRegionHubBySlug, getGemeenteBySlug, getRegionSlugByGemeenteSlug } from '@/lib/regions-hierarchy'
import DienstCard from '../../../../components/DienstCard'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string; slug: string; gemeente: string }>
}

/** Simple interpolation: replaces {key} tokens in a translated string */
function interp(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll(`{${k}}`, String(v)),
    template
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, gemeente } = await params;
  const regionHub = getRegionHubBySlug(slug);
  const gemeenteData = getGemeenteBySlug(gemeente);
  const t = createTranslator(locale);

  if (!regionHub || !gemeenteData) {
    return {
      title: t('regio_page.gemeente_not_found_title')
    };
  }

  const vars = {
    gemeenteName: gemeenteData.name,
    gemeenteNameLower: gemeenteData.name.toLowerCase(),
    regionName: regionHub.name,
    regionNameLower: regionHub.name.toLowerCase(),
    intro: (locale === 'en' ? (gemeenteData.introEn || gemeenteData.intro) : gemeenteData.intro),
  };

  const title = interp(t('gemeente_page.meta_title'), vars);
  const description = interp(t('gemeente_page.meta_description'), vars);

  return {
    title,
    description,
    keywords: interp(t('gemeente_page.meta_keywords'), vars),
    alternates: getLocaleAlternates(`/regio/${slug}/${gemeente}`, locale as SupportedLocale),
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/regio/${slug}/${gemeente}`, locale as SupportedLocale),
      siteName: 'Hovenier.frl',
      locale: locale,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string; gemeente: string }[] = [];

  for (const hub of regionHubs) {
    for (const gemeente of hub.gemeentes) {
      params.push(
        { locale: 'nl', slug: hub.slug, gemeente: gemeente.slug },
        { locale: 'en', slug: hub.slug, gemeente: gemeente.slug }
      );
    }
  }

  // Special case: Add leeuwarden as both region and gemeente
  params.push(
    { locale: 'nl', slug: 'leeuwarden', gemeente: 'leeuwarden' },
    { locale: 'en', slug: 'leeuwarden', gemeente: 'leeuwarden' }
  );

  return params;
}

export default async function GemeentePage({ params }: Props) {
  const { locale, slug, gemeente } = await params;
  setRequestLocale(locale);

  const regionHub = getRegionHubBySlug(slug);
  const gemeenteData = getGemeenteBySlug(gemeente);

  if (!regionHub || !gemeenteData) {
    notFound();
  }

  // Verify gemeente belongs to this region
  const gemeenteInRegion = regionHub.gemeentes.find(g => g.slug === gemeente);
  if (!gemeenteInRegion) {
    notFound();
  }

  const validLocale = locale as SupportedLocale;

  // Create translator function
  const t = createTranslator(validLocale);

  // Common interpolation variables
  const vars = {
    gemeenteName: gemeenteData.name,
    regionName: regionHub.name,
    population: gemeenteData.population.toLocaleString(),
    count: String(regionHub.gemeentes.length),
  };

  // Navigation translations
  const navTranslations = {
    gardeners: t('gardeners'),
    services: t('services'),
    regions: t('regions'),
    inspiration: t('inspiration'),
    request_quote: t('request_quote')
  };

  // Prepare translations for the lead form
  const translations = {
    form_eyebrow: t('form_eyebrow'),
    form_title: t('form_title'),
    form_subtitle: t('form_subtitle'),
    your_name: t('your_name'),
    municipality: t('municipality'),
    service: t('service'),
    phone_number: t('phone_number'),
    send_request: t('send_request'),
    form_note: t('form_note'),
    select_municipality: t('form.select_municipality'),
    what_do_you_need: t('form.what_do_you_need'),
    your_company: t('form.your_company'),
    loading: t('form.loading'),
    privacy_agreement: t('form.privacy_agreement'),
    privacy_link: t('form.privacy_link'),
    privacy_consent: t('form.privacy_consent'),
    services: {
      tuinonderhoud: t('form.services.tuinonderhoud'),
      tuinontwerp: t('form.services.tuinontwerp'),
      'tuin-aanleggen': t('form.services.tuin-aanleggen'),
      stratenmaker: t('form.services.stratenmaker'),
      groendak: t('form.services.groendak'),
      overig: t('form.services.overig')
    }
  };

  // Sample related articles data
  const relatedArticles = [
    {
      id: "1",
      title: interp(t('gemeente_page.article_1_title'), vars),
      excerpt: interp(t('gemeente_page.article_1_excerpt'), vars),
      slug: `tuinonderhoud-${gemeente}`,
      category: t('gemeente_page.article_1_category'),
      readTime: 5,
      publishedAt: "2024-03-20",
    },
    {
      id: "2",
      title: interp(t('gemeente_page.article_2_title'), vars),
      excerpt: interp(t('gemeente_page.article_2_excerpt'), vars),
      slug: `tuinaanleg-timing-${slug}`,
      category: t('gemeente_page.article_2_category'),
      readTime: 7,
      publishedAt: "2024-03-15",
    },
    {
      id: "3",
      title: t('gemeente_page.article_3_title'),
      excerpt: t('gemeente_page.article_3_excerpt'),
      slug: "kosten-hovenierdiensten-friesland-2024",
      category: t('gemeente_page.article_3_category'),
      readTime: 6,
      publishedAt: "2024-03-10",
    }
  ];

  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('regio_page.breadcrumb_regions'), href: localizePath('/regio', locale as SupportedLocale) },
    { label: regionHub.name, href: localizePath(`/regio/${slug}`, locale as SupportedLocale) },
    { label: gemeenteData.name, href: localizePath(`/regio/${slug}/${gemeente}`, locale as SupportedLocale) }
  ];

  return (
    <div className="page-container">
      <LocalBusinessSchema
        url={`${env.NEXT_PUBLIC_BASE_URL}${localizePath(`/regio/${slug}/${gemeente}`, validLocale)}`}
        nameContext={interp(t('gemeente_page.schema_name_context'), vars)}
        services={t.raw('gemeente_page.services_list') as string[]}
      />

      <BreadcrumbSchema
        items={breadcrumbItems.map((item, index) => ({
          position: index + 1,
          name: item.label,
          url: item.href ? `${env.NEXT_PUBLIC_BASE_URL}${item.href}` : `${env.NEXT_PUBLIC_BASE_URL}${localizePath(`/regio/${slug}/${gemeente}`, validLocale)}`
        }))}
      />

      <Navigation locale={validLocale} translations={navTranslations} />

      <main>
        {/* Breadcrumbs */}
        <section style={{ background: 'var(--cream-light)', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Hero Section */}
        <section style={{ background: 'var(--white)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div className='region-hero'>
              <div>
                <div className="gemeente-hero-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                  <div style={{
                    background: 'var(--forest-light)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg style={{ width: '32px', height: '32px', color: 'var(--white)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h1 style={{ fontSize: '3rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem', lineHeight: '1.1' }}>
                      {interp(t('gemeente_page.hero_title'), vars)}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', margin: '0' }}>
                      {interp(t('gemeente_page.hero_subtitle'), vars)}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '1.25rem', color: 'var(--forest-mid)', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {validLocale === 'en' ? (gemeenteData.introEn || gemeenteData.intro) : gemeenteData.intro}
                </p>

                {/* Municipality Stats */}
                <div className="gemeente-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {gemeenteData.population.toLocaleString()}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('gemeente_page.stat_residents')}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {gemeenteData.nearby.length}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('gemeente_page.stat_nearby')}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                      {regionHub.gemeentes.length}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--forest-mid)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{interp(t('gemeente_page.stat_in_region'), vars)}</p>
                  </div>
                </div>

                {/* Cities within this municipality */}
                {gemeenteData.cities && gemeenteData.cities.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
                      {interp(t('gemeente_page.cities_title'), vars)}
                    </h3>
                    <div style={{ marginBottom: '2rem' }} className="city-grid">
                      {gemeenteData.cities.map((city) => (
                        <Link
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: "24px 1rem",
                            border: '1px solid #2A3E201F',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '252px'
                          }}
                          key={city.slug}
                          href={localizePath(`/regio/${slug}/${gemeente}/${city.slug}`, validLocale)}
                        >
                          <div style={{ borderRadius: '50%', width: '48px', height: '48px', backgroundColor: 'var(--forest-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M6.05997 4.85984C7.63536 3.28446 9.77204 2.39941 12 2.39941C14.2279 2.39941 16.3646 3.28446 17.94 4.85984C19.5154 6.43523 20.4004 8.57191 20.4004 10.7998C20.4004 13.0278 19.5154 15.1645 17.94 16.7398L12 22.6798L6.05997 16.7398C5.27987 15.9598 4.66105 15.0338 4.23886 14.0146C3.81667 12.9954 3.59937 11.903 3.59937 10.7998C3.59937 9.69667 3.81667 8.6043 4.23886 7.5851C4.66105 6.56591 5.27987 5.63987 6.05997 4.85984ZM12 13.1998C12.6365 13.1998 13.2469 12.947 13.697 12.4969C14.1471 12.0468 14.4 11.4364 14.4 10.7998C14.4 10.1633 14.1471 9.55287 13.697 9.10279C13.2469 8.6527 12.6365 8.39984 12 8.39984C11.3635 8.39984 10.753 8.6527 10.3029 9.10279C9.85283 9.55287 9.59997 10.1633 9.59997 10.7998C9.59997 11.4364 9.85283 12.0468 10.3029 12.4969C10.753 12.947 11.3635 13.1998 12 13.1998Z" fill="white" />
                            </svg>
                          </div>
                          <p style={{ color: '#1C3A12', fontSize: '15px', lineHeight: '19.5px', fontWeight: 600, marginBottom: '4px' }}>{city.name}</p>
                          <p style={{ color: 'var(--forest-mid)', fontSize: '13px', lineHeight: '16px' }}>{t('gemeente_page.cities_gardeners')}</p>
                        </Link>
                      ))}
                    </div>
                    <Link href={localizePath('/contact', validLocale)} className="contact-link" style={{ color: '#16423C', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>
                      {t('gemeente_page.cities_not_listed')}{' '}
                      {t('gemeente_page.cities_contact')}
                    </Link>
                  </div>
                )}
              </div>

              {/* Lead Form */}
              <div style={{ background: 'var(--cream-light)', borderRadius: '12px', padding: '2rem' }}>
                <NewLeadForm
                  translations={translations}
                  locale={validLocale}
                  prefillMunicipality={gemeenteData.name}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local Services */}
        <section style={{ background: 'var(--cream-dark)', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '2rem', textAlign: 'center' }}>
              {interp(t('gemeente_page.services_title'), vars)}
            </h2>

            <div className="gemeente-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
              <DienstCard
                id="tuinonderhoud"
                title={t('gemeente_page.tuinonderhoud_title')}
                subtitle={t('gemeente_page.tuinonderhoud_subtitle')}
                description={t('gemeente_page.tuinonderhoud_desc')}
                image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                locale={validLocale}
              />
              <DienstCard
                id="tuinontwerp"
                title={t('gemeente_page.tuinontwerp_title')}
                subtitle={t('gemeente_page.tuinontwerp_subtitle')}
                description={t('gemeente_page.tuinontwerp_desc')}
                image="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80"
                locale={validLocale}
              />
              <DienstCard
                id="stratenmaker"
                title={t('gemeente_page.stratenmaker_title')}
                subtitle={t('gemeente_page.stratenmaker_subtitle')}
                description={t('gemeente_page.stratenmaker_desc')}
                image="https://images.unsplash.com/photo-1722953529218-7ade56b81293?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                locale={validLocale}
              />
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section style={{ background: 'var(--white)', }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
                {interp(t('gemeente_page.lead_title'), vars)}
              </h2>
              <p style={{ color: 'var(--forest-mid)', fontSize: '1.125rem' }}>
                {t('gemeente_page.lead_subtitle')}
              </p>
            </div>

            {/* Lead Form */}
            <div style={{ background: 'var(--cream-light)', borderRadius: '12px', padding: '2rem' }}>
              <NewLeadForm
                translations={translations}
                locale={validLocale}
                prefillMunicipality={gemeenteData.name}
              />
            </div>
          </div>
        </section>

        {/* Navigation to Region */}
        <section style={{ background: 'var(--cream-light)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--heading-font)', fontWeight: '600', color: 'var(--forest)', marginBottom: '1rem' }}>
              {interp(t('gemeente_page.nav_more_title'), vars)}
            </h2>
            <p style={{ color: 'var(--forest-mid)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              {interp(t('gemeente_page.nav_more_subtitle'), vars)}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={localizePath(`/regio/${slug}`, validLocale)} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--forest)',
                border: '1px solid var(--forest)',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: 'var(--white)'
              }} className="back-to-regions-btn">
                ← {regionHub.name}
              </a>
              <a href={localizePath('/regio', validLocale)} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--white)',
                background: 'var(--forest)',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}>
                {t('gemeente_page.all_regions')}
              </a>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <RelatedArticles
          articles={relatedArticles}
          title={interp(t('gemeente_page.related_title'), vars)}
        />
      </main>
    </div>
  )
}