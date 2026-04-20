import Navigation from "@/app/components/Navigation";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import DienstCard from "@/app/components/DienstCard";
import ReviewCard from "@/app/components/ReviewCard";
import LeadFormSection from "@/app/components/LeadFormSection";
import { getLocaleAlternates, SupportedLocale } from "@/lib/locale-utils";
import { getRegionHubBySlug, getGemeenteBySlug } from "@/lib/regions-hierarchy";
import { createTranslator } from '@/i18n';
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
  const t = createTranslator(validLocale);

  const formatName = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const cityName = formatName(citySlug);
  const i = (s: string) => s.replace(/\{cityName\}/g, cityName);

  return {
    title: i(t('city_page.meta_title')),
    description: i(t('city_page.meta_description')),
    keywords: validLocale === 'en'
      ? [`gardener ${cityName.toLowerCase()}`, 'garden maintenance', 'garden design', 'landscaping', 'friesland']
      : [`hovenier ${cityName.toLowerCase()}`, 'tuinonderhoud', 'tuinaanleg', 'tuinontwerp', 'friesland'],
    alternates: getLocaleAlternates(`/regio/${slug}/${gemeente}/${citySlug}`, validLocale as SupportedLocale),
  };
}

const Page = async ({ params }: Props) => {
    const { locale, slug, gemeente, 'city-slug': citySlug } = await params;
    const validLocale = locale || defaultLocale;

    const t = createTranslator(validLocale);

    const regionHub = getRegionHubBySlug(slug);
    const gemeenteData = getGemeenteBySlug(gemeente);

    const formatLabel = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const cityName = formatLabel(citySlug);

    // Interpolate {cityName} placeholders in translation strings
    const i = (s: string) => s.replace(/\{cityName\}/g, cityName);

    // Navigation translations
    const navTranslations = {
      gardeners: t('gardeners'),
      services: t('services'),
      regions: t('regions'),
      request_quote: t('request_quote'),
    };

    // Lead form translations
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
        overig: t('form.services.overig'),
      },
    };

    const breadcrumbItems = [
        { label: t('breadcrumb_home'), href: `/${validLocale}` },
        { label: t('regio_page.breadcrumb_regions'), href: `/${validLocale}/regio` },
        { label: regionHub?.name || formatLabel(slug), href: `/${validLocale}/regio/${slug}` },
        { label: gemeenteData?.name || formatLabel(gemeente), href: `/${validLocale}/regio/${slug}/${gemeente}` },
        { label: cityName },
    ];

    return (
        <>
        <Navigation locale={validLocale} translations={navTranslations} />
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
              {i(t('city_page.hero_title'))}
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
              <p>{i(t('city_page.hero_intro_1'))}</p>
              <p>{i(t('city_page.hero_intro_2'))}</p>
            </div>


            <p style={{
              color: '#F4F0E8',
              fontSize: '15px',
              fontWeight: '500',
              lineHeight: '25px',
            }}>
              {i(t('city_page.hero_cta'))}
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
                {t('no_obligations')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13.3 4L6 11.3 2.7 8" stroke="#8AB87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('city_page.multiple_quotes')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13.3 4L6 11.3 2.7 8" stroke="#8AB87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {t('city_page.local_specialists')}
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
                {i(t('city_page.services_title'))}
              </h2>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '15px',
                lineHeight: '100%',
              }}>
                {i(t('city_page.services_subtitle'))}
              </p>
            </div>

            <div className="grid-responsive-3" style={{ gap: '1rem' }}>
              <DienstCard
                id="tuinonderhoud"
                title={i(t('city_page.tuinonderhoud_title'))}
                subtitle={t('city_page.tuinonderhoud_subtitle')}
                description={i(t('city_page.tuinonderhoud_desc'))}
                image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                locale={validLocale}
                href={`/${validLocale}/regio/${slug}/${gemeente}/${citySlug}/tuinonderhoud`}
              />
              <DienstCard
                id="tuinontwerp"
                title={i(t('city_page.tuinontwerp_title'))}
                subtitle={t('city_page.tuinontwerp_subtitle')}
                description={i(t('city_page.tuinontwerp_desc'))}
                image="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80"
                locale={validLocale}
                href={`/${validLocale}/regio/${slug}/${gemeente}/${citySlug}/tuinontwerp`}
              />
              <DienstCard
                id="groendak"
                title={i(t('city_page.groendak_title'))}
                subtitle={t('city_page.groendak_subtitle')}
                description={i(t('city_page.groendak_desc'))}
                image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
                locale={validLocale}
                href={`/${validLocale}/regio/${slug}/${gemeente}/${citySlug}/groendak`}
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
                {t('city_page.reviews_title')}
              </h2>
              <p style={{
                color: 'var(--forest-mid)',
                fontSize: '15px',
                lineHeight: '26px',
                fontWeight: 400
              }}>
                {i(t('city_page.reviews_subtitle'))}
              </p>
            </div>

            <div className="grid-responsive-3">
              <ReviewCard
                quote={t('city_page.review_1_quote')}
                name="Marieke de Boer"
                image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                subtitle={cityName}
              />
              <ReviewCard
                quote={t('city_page.review_2_quote')}
                name="Jan Willem Visser"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                subtitle={i(t('city_page.review_2_subtitle'))}
              />
              <ReviewCard
                quote={t('city_page.review_3_quote')}
                name="Sietske Dijkstra"
                image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                subtitle={i(t('city_page.review_3_subtitle'))}
              />
            </div>
          </div>
        </section>

        <LeadFormSection
          title={i(t('city_page.lead_title'))}
          subtitle={t('city_page.lead_subtitle')}
          locale={validLocale}
          backgroundColor="#FFFFFF"
          translations={translations}
        />
        </>
    )
}

export default Page;