import Navigation from "@/app/components/Navigation";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getLocaleAlternates, getAbsoluteUrl, SupportedLocale } from "@/lib/locale-utils";
import { getRegionHubBySlug, getGemeenteBySlug } from "@/lib/regions-hierarchy";
import { createTranslator } from '@/i18n';
import { Metadata } from 'next';
import Link from "next/link";
import { Cormorant_Garamond } from 'next/font/google';
import LeadFormSection from "@/app/components/LeadFormSection";
import { BreadcrumbSchema } from "@/app/components/StructuredData";
import FaqSection from "@/app/components/FaqSection";

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap' });

function SubcategoryCard({ title, description }: { title: string; description: string }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #2A3E201F',
      padding: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        backgroundColor: 'var(--forest-light)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 style={{
        fontFamily: 'var(--heading-font)',
        fontSize: '18px',
        fontWeight: '700',
        color: 'var(--forest)',
        margin: 0,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '15px',
        lineHeight: '23px',
        color: 'var(--text-mid)',
        fontWeight: 400,
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  );
}


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

  const formatName = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const cityName = formatName(citySlug);
  const serviceName = formatName(serviceSlug);

  const title = isEn
    ? `${serviceName} in ${cityName} | Hovenier.frl`
    : `${serviceName} in ${cityName} | Hovenier.frl`;
  const description = isEn
    ? `Find a reliable specialist for ${serviceName.toLowerCase()} in ${cityName}. Via Hovenier.frl you can easily find experienced gardeners in ${cityName} and surroundings. Compare multiple quotes from local specialists.`
    : `Een betrouwbare specialist voor ${serviceName.toLowerCase()} in ${cityName} vinden hoeft niet ingewikkeld te zijn. Via Hovenier.frl wordt u eenvoudig gekoppeld aan ervaren hoveniers in ${cityName} en omgeving.`;

  const pageUrl = getAbsoluteUrl(`/regio/${slug}/${gemeente}/${citySlug}/${serviceSlug}`, validLocale as SupportedLocale);

  return {
    title,
    description,
    keywords: isEn
      ? [`gardener ${cityName.toLowerCase()}`, serviceName.toLowerCase(), 'garden maintenance', 'landscaping', 'friesland']
      : [`hovenier ${cityName.toLowerCase()}`, serviceName.toLowerCase(), 'tuinonderhoud', 'tuinontwerp', 'friesland'],
    alternates: getLocaleAlternates(`/regio/${slug}/${gemeente}/${citySlug}/${serviceSlug}`, validLocale as SupportedLocale),
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Hovenier.frl',
      locale: isEn ? 'en_US' : 'nl_NL',
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${serviceName} in ${cityName} - Hovenier.frl` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 },
    },
  };
}

const Page = async ({ params }: Props) => {
    const { locale, slug, gemeente, 'city-slug': citySlug, 'city-service-slug': serviceSlug } = await params;
    const validLocale = locale || defaultLocale;

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

    // Helper to interpolate {cityName}, {gemeenteName} and {serviceName} placeholders in translation strings
    const interpolate = (str: string) =>
      str.replace(/\{cityName\}/g, cityName).replace(/\{gemeenteName\}/g, gemeenteData?.name || cityName).replace(/\{serviceName\}/g, serviceName.toLowerCase());

    const serviceTitle = interpolate(t(`city_service_page.${serviceSlug}.title`));
    const eyebrow = t('city_service_page.eyebrow');

    // Helper to get city-specific service overrides
    type CityServiceOverride = {
      description?: string;
      section_title?: string;
      section_subtitle?: string;
      sub_1_title?: string;
      sub_1_desc?: string;
      // Add more sub sections as needed
    };

    function getCityServiceOverride(t: ReturnType<typeof createTranslator>, citySlug: string, serviceSlug: string): CityServiceOverride | null {
      const override = t.raw(`city_service_overrides.${citySlug}.${serviceSlug}`);
      return override || null;
    }

    const cityServiceOverride = getCityServiceOverride(t, citySlug, serviceSlug);

    // Override-aware translation: use city-specific override if available, else fall back to generic template
    const ov = (field: string, templateKey: string) => {
      const overrideVal = cityServiceOverride?.[field as keyof CityServiceOverride];
      return interpolate(overrideVal ?? t(templateKey));
    };

    // Dynamic counts: check how many items exist in override (or use defaults)
    const ovRecord = cityServiceOverride as Record<string, string> | null;
    const countOverride = (prefix: string, suffix: string, max: number, fallback: number) => {
      if (ovRecord) {
        let count = 0;
        for (let i = 1; i <= max; i++) {
          if (ovRecord[`${prefix}${i}${suffix}`]) count = i;
          else break;
        }
        if (count > 0) return count;
      }
      return fallback;
    };

    const faqCount = countOverride('faq_', '_q', 10, 5);
    const whyCount = countOverride('why_', '', 10, 5);
    const subCount = countOverride('sub_', '_title', 12, 6);

    const serviceDesc = ov('description', `city_service_page.${serviceSlug}.description`);

    return (
        <>
        <Navigation locale={validLocale} translations={navTranslations} />
        <BreadcrumbSchema
          items={breadcrumbItems.map((item, idx) => ({
            position: idx + 1,
            name: item.label,
            url: item.href
              ? getAbsoluteUrl(item.href.replace(`/${validLocale}`, ''), validLocale as SupportedLocale)
              : getAbsoluteUrl(`/regio/${slug}/${gemeente}/${citySlug}/${serviceSlug}`, validLocale as SupportedLocale),
          }))}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Array.from({ length: faqCount }, (_, i) => i + 1).map((n) => ({
              "@type": "Question",
              "name": ov(`faq_${n}_q`, `city_service_page.${serviceSlug}.faq_${n}_q`),
              "acceptedAnswer": {
                "@type": "Answer",
                "text": ov(`faq_${n}_a`, `city_service_page.${serviceSlug}.faq_${n}_a`),
              },
            })),
          }) }}
        />
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


        <section style={{ backgroundColor: '#EDE9E0', width: '100%' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '80px 1rem', display: 'flex', flexDirection: 'column', gap: '48px', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '823px' }}>
                <h2 style={{
                  fontFamily: 'var(--heading-font)',
                  fontSize: '44px',
                  fontWeight: '700',
                  color: 'var(--forest-deep)',
                  letterSpacing: '-0.44px',
                  margin: 0,
                  lineHeight: '40px',
                }}>
                  {ov('section_title', `city_service_page.${serviceSlug}.section_title`)}
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '26px',
                  color: 'var(--text-muted)',
                  margin: 0,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '531px',
                }}>
                  {ov('section_subtitle', `city_service_page.${serviceSlug}.section_subtitle`)}
                </p>
              </div>

              <div className="grid-responsive-3-sm" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                rowGap: '48px',
                columnGap: '16px',
              }}>
                {Array.from({ length: subCount }, (_, i) => i + 1).map((n) => (
                  <SubcategoryCard
                    key={n}
                    title={ov(`sub_${n}_title`, `city_service_page.${serviceSlug}.sub_${n}_title`)}
                    description={ov(`sub_${n}_desc`, `city_service_page.${serviceSlug}.sub_${n}_desc`)}
                  />
                ))}
              </div>
            </div>
        </section>    


        <section style={{ backgroundColor: '#F5F2EC', width: '100%' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '80px 1rem', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{
                  fontFamily: 'var(--heading-font)',
                  fontSize: '32px',
                  fontWeight: '600',
                  color: 'var(--forest-deep)',
                  margin: 0,
                  lineHeight: '48px',
                  letterSpacing: '-0.44px',
                }}>
                  {ov('why_title', 'city_service_page.why_title')}
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '25px',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}>
                  {ov('why_subtitle', 'city_service_page.why_subtitle')}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Array.from({ length: whyCount }, (_, i) => i + 1).map((n) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="11" cy="11" r="11" fill="#8AB87A33" />
                      <path d="M7 11.5L9.5 14L15 8.5" stroke="#8AB87A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p
                      style={{ fontSize: '16px', lineHeight: '24px', color: 'var(--text-mid)', margin: 0 }}
                      dangerouslySetInnerHTML={{ __html: ov(`why_${n}`, `city_service_page.why_${n}`) }}
                    />
                  </div>
                ))}
              </div>
            </div>
        </section>    

        <section style={{ backgroundColor: 'var(--cream-dark)', width: '100%' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '80px 1rem', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{
                  fontFamily: 'var(--heading-font)',
                  fontSize: '32px',
                  fontWeight: '700',
                  color: 'var(--forest-deep)',
                  margin: 0,
                  lineHeight: '48px',
                }}>
                  {interpolate(t('city_service_page.cost_title'))}
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '25px',
                  color: 'var(--text-mid)',
                  margin: 0,
                  fontWeight: 400
                }}>
                  {interpolate(t('city_service_page.cost_intro'))}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: 'var(--text-mid)',
                  margin: 0,
                }}>
                  {interpolate(t('city_service_page.cost_factors_title'))}
                </p>
                <div className="grid-responsive-2-sm" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                }}>
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #2A3E201F',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--heading-font)',
                        fontSize: '17px',
                        fontWeight: '700',
                        color: 'var(--forest)',
                        margin: 0,
                      }}>
                        {ov(`cost_${n}_title`, `city_service_page.${serviceSlug}.cost_${n}_title`)}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        lineHeight: '22px',
                        color: 'var(--text-mid)',
                        margin: 0,
                      }}>
                        {ov(`cost_${n}_desc`, `city_service_page.${serviceSlug}.cost_${n}_desc`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </section>  

        <section style={{ backgroundColor: 'var(--cream)', width: '100%' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '80px 1rem 48px 1rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #2A3E201F',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <p style={{
                  fontFamily: 'var(--heading-font)',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--forest-deep)',
                  margin: 0,
                  lineHeight: '32px',
                }}>
                  {interpolate(t('city_service_page.crosslinks_title'))}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(['tuinonderhoud', 'tuinontwerp', 'groendak', 'stratenmaker', 'tuin-aanleggen'] as const)
                    .filter((s) => s !== serviceSlug)
                    .slice(0, 2)
                    .map((s) => (
                      <Link
                        key={s}
                        href={`/${validLocale}/regio/${slug}/${gemeente}/${citySlug}/${s}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#3F6D2E', fontWeight: '700', textDecoration: 'none' }}
                      >
                        <span>👉</span>
                        <span className="crosslink-text" style={{ textDecoration: 'underline', fontFamily: cormorant.style.fontFamily }}>{interpolate(t(`city_service_page.${s}.title`))}</span>
                      </Link>
                    ))}
                  <Link
                    href={`/${validLocale}/regio/${slug}/${gemeente}/${citySlug}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#3F6D2E', fontWeight: '700', textDecoration: 'none' }}
                  >
                    <span>👉</span>
                    <span className="crosslink-text" style={{ textDecoration: 'underline', fontFamily: cormorant.style.fontFamily }}>{interpolate(t('city_service_page.crosslinks_city'))}</span>
                  </Link>
                </div>
              </div>
            </div>
        </section>  

        <FaqSection
          title={interpolate(t('city_service_page.faq_title'))}
          faqs={Array.from({ length: faqCount }, (_, i) => i + 1).map((n) => ({
            question: ov(`faq_${n}_q`, `city_service_page.${serviceSlug}.faq_${n}_q`),
            answer: ov(`faq_${n}_a`, `city_service_page.${serviceSlug}.faq_${n}_a`),
          }))}
        />

        <LeadFormSection
          title={interpolate(t('city_service_page.lead_title'))}
          subtitle={t('city_service_page.lead_subtitle')}
          locale={validLocale}
          backgroundColor="#FFFFFF"
          prefillMunicipality={gemeenteData?.name}
          translations={translations}
        />
        </>
    )
}

export default Page;