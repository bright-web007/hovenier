import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import { getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

// Simple translation function
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
    // Fallback messages
    messages = {
      thank_you_page_title: "Bedankt voor uw aanvraag!",
      thank_you_page_subtitle: "Wij hebben uw aanvraag ontvangen en nemen binnen 24 uur contact met u op.",
      thank_you_page_what_happens_next: "Wat gebeurt er nu?",
      thank_you_page_step_1: "Binnen 24 uur nemen wij contact met u op",
      thank_you_page_step_2: "Wij koppelen u aan de beste hovenier in uw regio", 
      thank_you_page_step_3: "U ontvangt binnen 48 uur een offerte op maat",
      thank_you_page_back_home: "Terug naar home",
      thank_you_page_view_services: "Bekijk onze diensten"
    };
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Bedankt - Uw aanvraag is ontvangen | Hovenier.frl',
      description: 'Bedankt voor uw aanvraag. Wij nemen binnen 24 uur contact met u op en koppelen u aan de beste hovenier in uw regio.',
      robots: 'noindex, nofollow', // Don't index thank you pages
      alternates: getLocaleAlternates('/bedankt', validLocale as SupportedLocale),
    };
  } catch (error) {
    return {
      title: 'Bedankt - Hovenier.frl',
      description: 'Bedankt voor uw aanvraag.'
    };
  }
}

export default async function BedanktPage({ params }: Props) {
  let validLocale = defaultLocale;
  
  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const t = createTranslator(validLocale);

  return (
    <>
      <Navigation locale={validLocale} />
      
      <main>
        <section className="section">
          <div className="section-inner">
            <div className="section-header-row section-centered">
              <div className="thank-you-content">
                <div className="thank-you-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="success-icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                
                <h1 className="section-title section-title-centered thank-you-title">
                  {t('thank_you_page_title') || 'Bedankt voor uw aanvraag!'}
                </h1>
                
                <p className="section-sub section-sub-centered thank-you-subtitle">
                  {t('thank_you_page_subtitle') || 'Wij hebben uw aanvraag ontvangen en nemen binnen 24 uur contact met u op.'}
                </p>
              </div>
            </div>

            <div className="thank-you-steps">
              <h2 className="steps-title">
                {t('thank_you_page_what_happens_next') || 'Wat gebeurt er nu?'}
              </h2>
              
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <p className="step-text">
                    {t('thank_you_page_step_1') || 'Binnen 24 uur nemen wij contact met u op'}
                  </p>
                </div>
                
                <div className="step-card">
                  <div className="step-number">2</div>
                  <p className="step-text">
                    {t('thank_you_page_step_2') || 'Wij koppelen u aan de beste hovenier in uw regio'}
                  </p>
                </div>
                
                <div className="step-card">
                  <div className="step-number">3</div>
                  <p className="step-text">
                    {t('thank_you_page_step_3') || 'U ontvangt binnen 48 uur een offerte op maat'}
                  </p>
                </div>
              </div>
            </div>

            <div className="thank-you-actions section-centered">
              <Link href={localizePath('/', validLocale as SupportedLocale)} className="nav-cta nav-cta-large">
                {t('thank_you_page_back_home') || 'Terug naar home'}
              </Link>
              
              <Link href={localizePath('/services', validLocale as SupportedLocale)} className="nav-cta nav-cta-outline">
                {t('thank_you_page_view_services') || 'Bekijk onze diensten'}
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* GA4 Conversion Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof gtag !== 'undefined') {
              gtag('event', 'conversion', {
                'send_to': 'GA_MEASUREMENT_ID/CONVERSION_ID',
                'transaction_id': '',
                'value': 1.0,
                'currency': 'EUR'
              });
            }
          `,
        }}
      />
    </>
  );
}
