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
  params: Promise<{ locale: string; slug: string; gemeente: string; 'city-slug': string; 'city-service-slug': string }>;
};


export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, gemeente, 'city-slug': citySlug, 'city-service-slug': serviceSlug } = await params;
  const validLocale = locale || defaultLocale;
  const isEn = validLocale === 'en';
  const t = createTranslator(validLocale);

  const formatName = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const cityName = formatName(citySlug);
  const serviceName = formatName(serviceSlug);

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
    const { locale, slug, gemeente, 'city-slug': citySlug, 'city-service-slug': serviceSlug } = await params;
    const validLocale = locale || defaultLocale;
    const isEn = validLocale === 'en';

    const t = createTranslator(validLocale);

    const regionHub = getRegionHubBySlug(slug);
    const gemeenteData = getGemeenteBySlug(gemeente);

    const formatLabel = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const cityName = formatLabel(citySlug);
    const serviceName = formatLabel(serviceSlug);

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
        { label: cityName, href: `/${validLocale}/regio/${slug}/${gemeente}/${citySlug}` },
        { label: serviceName },
    ];

    // Helper to interpolate {cityName} and {gemeenteName} placeholders in translation strings
    const interpolate = (str: string) =>
      str.replace(/\{cityName\}/g, cityName).replace(/\{gemeenteName\}/g, gemeenteData?.name || cityName);

    const serviceTitle = interpolate(t(`city_service_page.${serviceSlug}.title`));
    const serviceDesc = interpolate(t(`city_service_page.${serviceSlug}.description`));
    const eyebrow = t('city_service_page.eyebrow');

    return (
        <>
        <Navigation locale={validLocale} translations={navTranslations} />
        <Breadcrumbs items={breadcrumbItems} />

        <section style={{ backgroundColor: '#2A3E20EB', width: '100%' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '56px 1rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '32px', height: '1px', backgroundColor: '#F4F0E880' }} />
                <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8C4B0' }}>
                  {eyebrow}
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--heading-font)',
                fontSize: '48px',
                fontWeight: '600',
                color: '#F4F0E8',
                lineHeight: '52px',
                margin: 0,
              }}>
                {serviceTitle}
              </h1>

              <p style={{
                color: '#C8DFC0',
                fontSize: '15px',
                lineHeight: '25px',
                margin: 0,
                borderLeft: '2px solid var(--sage',
                padding: '16px 20px',
                backgroundColor: '#FFFFFF0F'
              }}>
                {serviceDesc}
              </p>
            </div>
        </section>    


        <section style={{ backgroundColor: '#2A3E20EB', width: '100%' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '56px 1rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            </div>
        </section>    
        </>
    )
}

export default Page;