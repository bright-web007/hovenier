import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';
import styles from '../../styles/Disclaimer.module.css';

// Disclaimer Components
import DisclaimerHero from '../../components/disclaimer/DisclaimerHero';
import DisclaimerIntroduction from '../../components/disclaimer/DisclaimerIntroduction';
import DisclaimerGeneral from '../../components/disclaimer/DisclaimerGeneral';
import DisclaimerLimitations from '../../components/disclaimer/DisclaimerLimitations';
import DisclaimerInformation from '../../components/disclaimer/DisclaimerInformation';
import DisclaimerUsage from '../../components/disclaimer/DisclaimerUsage';
import DisclaimerExternal from '../../components/disclaimer/DisclaimerExternal';
import DisclaimerContact from '../../components/disclaimer/DisclaimerContact';
import DisclaimerSchema from '../../components/disclaimer/DisclaimerSchema';
import { getLocaleAlternates, getAbsoluteUrl, type SupportedLocale } from '@/lib/locale-utils';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

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

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const t = createTranslator(validLocale);
    
    return {
      title: t('disclaimer.meta_title'),
      description: t('disclaimer.meta_description'),
      robots: {
        index: true,
        follow: true
      },
      alternates: getLocaleAlternates('/aansprakelijkheid', validLocale as SupportedLocale),
    };
  } catch (error) {
    return {
      title: 'Aansprakelijkheid - Hovenier.frl',
      description: 'Disclaimer en aansprakelijkheidsinformatie.'
    };
  }
}

export default async function DisclaimerPage({ params }: Props) {
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

  // Breadcrumb data for display
  const breadcrumbItems = [
    { label: t('disclaimer.breadcrumb_home'), href: '/' },
    { label: t('disclaimer.breadcrumb_disclaimer') }
  ];

  // Breadcrumb data for schema
  const breadcrumbSchemaData = [
    { name: t('disclaimer.breadcrumb_home'), url: getAbsoluteUrl('/', validLocale as SupportedLocale) },
    { name: t('disclaimer.breadcrumb_disclaimer'), url: getAbsoluteUrl('/aansprakelijkheid', validLocale as SupportedLocale) }
  ];

  const translations = {
    hero_title: t('disclaimer.hero_title'),
    hero_subtitle: t('disclaimer.hero_subtitle'),
    hero_last_updated: t('disclaimer.hero_last_updated'),
    intro_text_1: t('disclaimer.intro_text_1'),
    intro_text_2: t('disclaimer.intro_text_2'),
    general_title: t('disclaimer.general_title'),
    general_warning_title: t('disclaimer.general_warning_title'),
    general_warning_text: t('disclaimer.general_warning_text'),
    general_text_1: t('disclaimer.general_text_1'),
    general_text_2: t('disclaimer.general_text_2'),
    limitations_title: t('disclaimer.limitations_title'),
    limitations_no_guarantees_title: t('disclaimer.limitations_no_guarantees_title'),
    limitations_no_guarantees_text: t('disclaimer.limitations_no_guarantees_text'),
    limitations_no_liability_title: t('disclaimer.limitations_no_liability_title'),
    limitations_no_liability_text: t('disclaimer.limitations_no_liability_text'),
    limitations_own_research_title: t('disclaimer.limitations_own_research_title'),
    limitations_own_research_text: t('disclaimer.limitations_own_research_text'),
    limitations_services_title: t('disclaimer.limitations_services_title'),
    limitations_services_text: t('disclaimer.limitations_services_text'),
    limitations_technical_title: t('disclaimer.limitations_technical_title'),
    limitations_technical_text: t('disclaimer.limitations_technical_text'),
    limitations_financial_title: t('disclaimer.limitations_financial_title'),
    limitations_financial_text: t('disclaimer.limitations_financial_text'),
    limitations_external_title: t('disclaimer.limitations_external_title'),
    limitations_external_text: t('disclaimer.limitations_external_text'),
    information_title: t('disclaimer.information_title'),
    information_accuracy_title: t('disclaimer.information_accuracy_title'),
    information_accuracy_text: t('disclaimer.information_accuracy_text'),
    information_accuracy_prices: t('disclaimer.information_accuracy_prices'),
    information_accuracy_availability: t('disclaimer.information_accuracy_availability'),
    information_accuracy_areas: t('disclaimer.information_accuracy_areas'),
    information_accuracy_certs: t('disclaimer.information_accuracy_certs'),
    information_thirdparty_title: t('disclaimer.information_thirdparty_title'),
    information_thirdparty_text: t('disclaimer.information_thirdparty_text'),
    information_thirdparty_incorrect: t('disclaimer.information_thirdparty_incorrect'),
    information_thirdparty_outdated: t('disclaimer.information_thirdparty_outdated'),
    information_thirdparty_contact: t('disclaimer.information_thirdparty_contact'),
    information_thirdparty_claims: t('disclaimer.information_thirdparty_claims'),
    usage_title: t('disclaimer.usage_title'),
    usage_warning_title: t('disclaimer.usage_warning_title'),
    usage_warning_text: t('disclaimer.usage_warning_text'),
    usage_due_diligence_title: t('disclaimer.usage_due_diligence_title'),
    usage_due_diligence_text: t('disclaimer.usage_due_diligence_text'),
    usage_dd_quotes: t('disclaimer.usage_dd_quotes'),
    usage_dd_references: t('disclaimer.usage_dd_references'),
    usage_dd_insurance: t('disclaimer.usage_dd_insurance'),
    usage_dd_agreements: t('disclaimer.usage_dd_agreements'),
    usage_dd_contracts: t('disclaimer.usage_dd_contracts'),
    usage_responsibility_title: t('disclaimer.usage_responsibility_title'),
    usage_responsibility_text: t('disclaimer.usage_responsibility_text'),
    usage_resp_selection: t('disclaimer.usage_resp_selection'),
    usage_resp_negotiation: t('disclaimer.usage_resp_negotiation'),
    usage_resp_quality: t('disclaimer.usage_resp_quality'),
    usage_resp_disputes: t('disclaimer.usage_resp_disputes'),
    external_title: t('disclaimer.external_title'),
    external_websites_title: t('disclaimer.external_websites_title'),
    external_websites_text: t('disclaimer.external_websites_text'),
    external_websites_accuracy: t('disclaimer.external_websites_accuracy'),
    external_websites_privacy: t('disclaimer.external_websites_privacy'),
    external_websites_liability: t('disclaimer.external_websites_liability'),
    external_websites_endorsement: t('disclaimer.external_websites_endorsement'),
    external_thirdparty_title: t('disclaimer.external_thirdparty_title'),
    external_thirdparty_text: t('disclaimer.external_thirdparty_text'),
    external_thirdparty_note: t('disclaimer.external_thirdparty_note'),
    contact_title: t('disclaimer.contact_title'),
    contact_text: t('disclaimer.contact_text'),
    contact_company: t('disclaimer.contact_company'),
    contact_response: t('disclaimer.contact_response'),
    contact_warning: t('disclaimer.contact_warning'),
    contact_warning_text: t('disclaimer.contact_warning_text'),
    schema_name: t('disclaimer.schema_name'),
    schema_description: t('disclaimer.schema_description'),
    schema_language: t('disclaimer.schema_language'),
    schema_main_name: t('disclaimer.schema_main_name'),
    schema_main_description: t('disclaimer.schema_main_description'),
    schema_about_liability: t('disclaimer.schema_about_liability'),
    schema_about_accuracy: t('disclaimer.schema_about_accuracy'),
    schema_about_services: t('disclaimer.schema_about_services'),
    schema_about_links: t('disclaimer.schema_about_links'),
  };

  return (
    <div className={styles.disclaimerPage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaData} />

      <main>
        <section className="section">
          <div className="section-inner">
            <DisclaimerHero translations={translations} />
            
            <div className={styles.content}>
              <div className={styles.contentInner}>
                <DisclaimerIntroduction translations={translations} />
                <DisclaimerGeneral translations={translations} />
                <DisclaimerLimitations translations={translations} />
                <DisclaimerInformation translations={translations} />
                <DisclaimerUsage translations={translations} />
                <DisclaimerExternal translations={translations} />
                <DisclaimerContact translations={translations} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <DisclaimerSchema translations={translations} />
    </div>
  );
}
