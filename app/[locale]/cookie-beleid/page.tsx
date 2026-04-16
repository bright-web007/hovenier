import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';
import styles from '../../styles/Cookie.module.css';

// Cookie Policy Components
import CookieHero from '../../components/cookie/CookieHero';
import CookieIntroduction from '../../components/cookie/CookieIntroduction';
import CookieDefinition from '../../components/cookie/CookieDefinition';
import CookieUsage from '../../components/cookie/CookieUsage';
import CookieTypes from '../../components/cookie/CookieTypes';
import CookieConsent from '../../components/cookie/CookieConsent';
import CookieManagement from '../../components/cookie/CookieManagement';
import CookieThirdParty from '../../components/cookie/CookieThirdParty';
import CookieSecurity from '../../components/cookie/CookieSecurity';
import CookieChanges from '../../components/cookie/CookieChanges';
import CookieContact from '../../components/cookie/CookieContact';
import CookieSchema from '../../components/cookie/CookieSchema';
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
      title: t('cookie_policy.meta_title'),
      description: t('cookie_policy.meta_description'),
      robots: {
        index: true,
        follow: true
      },
      alternates: getLocaleAlternates('/cookie-beleid', validLocale as SupportedLocale),
    };
  } catch (error) {
    return {
      title: 'Cookiebeleid - Hovenier.frl',
      description: 'Cookiebeleid en informatie over tracking.'
    };
  }
}

export default async function CookiePolicyPage({ params }: Props) {
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
    { label: t('cookie_policy.breadcrumb_home'), href: '/' },
    { label: t('cookie_policy.breadcrumb_cookie') }
  ];

  // Breadcrumb data for schema
  const breadcrumbSchemaData = [
    { name: t('cookie_policy.breadcrumb_home'), url: getAbsoluteUrl('/', validLocale as SupportedLocale) },
    { name: t('cookie_policy.breadcrumb_cookie'), url: getAbsoluteUrl('/cookie-beleid', validLocale as SupportedLocale) }
  ];

  // Build translations object for cookie components
  const translations = {
    hero_title: t('cookie_policy.hero_title'),
    hero_subtitle: t('cookie_policy.hero_subtitle'),
    hero_last_updated: t('cookie_policy.hero_last_updated'),
    intro_text: t('cookie_policy.intro_text'),
    intro_detail: t('cookie_policy.intro_detail'),
    definition_title: t('cookie_policy.definition_title'),
    definition_text_1: t('cookie_policy.definition_text_1'),
    definition_text_2: t('cookie_policy.definition_text_2'),
    definition_text_3: t('cookie_policy.definition_text_3'),
    usage_title: t('cookie_policy.usage_title'),
    usage_text: t('cookie_policy.usage_text'),
    usage_essential: t('cookie_policy.usage_essential'),
    usage_essential_desc: t('cookie_policy.usage_essential_desc'),
    usage_experience: t('cookie_policy.usage_experience'),
    usage_experience_desc: t('cookie_policy.usage_experience_desc'),
    usage_analytics: t('cookie_policy.usage_analytics'),
    usage_analytics_desc: t('cookie_policy.usage_analytics_desc'),
    usage_personalized: t('cookie_policy.usage_personalized'),
    usage_personalized_desc: t('cookie_policy.usage_personalized_desc'),
    usage_marketing: t('cookie_policy.usage_marketing'),
    usage_marketing_desc: t('cookie_policy.usage_marketing_desc'),
    usage_social: t('cookie_policy.usage_social'),
    usage_social_desc: t('cookie_policy.usage_social_desc'),
    usage_performance: t('cookie_policy.usage_performance'),
    usage_performance_desc: t('cookie_policy.usage_performance_desc'),
    usage_footer: t('cookie_policy.usage_footer'),
    types_title: t('cookie_policy.types_title'),
    types_text: t('cookie_policy.types_text'),
    types_necessary_title: t('cookie_policy.types_necessary_title'),
    types_necessary_text: t('cookie_policy.types_necessary_text'),
    types_session_name: t('cookie_policy.types_session_name'),
    types_session_purpose: t('cookie_policy.types_session_purpose'),
    types_session_duration: t('cookie_policy.types_session_duration'),
    types_session_type: t('cookie_policy.types_session_type'),
    types_csrf_name: t('cookie_policy.types_csrf_name'),
    types_csrf_purpose: t('cookie_policy.types_csrf_purpose'),
    types_csrf_duration: t('cookie_policy.types_csrf_duration'),
    types_csrf_type: t('cookie_policy.types_csrf_type'),
    types_consent_name: t('cookie_policy.types_consent_name'),
    types_consent_purpose: t('cookie_policy.types_consent_purpose'),
    types_consent_duration: t('cookie_policy.types_consent_duration'),
    types_consent_type: t('cookie_policy.types_consent_type'),
    types_analytical_title: t('cookie_policy.types_analytical_title'),
    types_analytical_text: t('cookie_policy.types_analytical_text'),
    types_ga_name: t('cookie_policy.types_ga_name'),
    types_ga_purpose: t('cookie_policy.types_ga_purpose'),
    types_ga_duration: t('cookie_policy.types_ga_duration'),
    types_ga_type: t('cookie_policy.types_ga_type'),
    types_gid_name: t('cookie_policy.types_gid_name'),
    types_gid_purpose: t('cookie_policy.types_gid_purpose'),
    types_gid_duration: t('cookie_policy.types_gid_duration'),
    types_gid_type: t('cookie_policy.types_gid_type'),
    types_gat_name: t('cookie_policy.types_gat_name'),
    types_gat_purpose: t('cookie_policy.types_gat_purpose'),
    types_gat_duration: t('cookie_policy.types_gat_duration'),
    types_gat_type: t('cookie_policy.types_gat_type'),
    types_functional_title: t('cookie_policy.types_functional_title'),
    types_functional_text: t('cookie_policy.types_functional_text'),
    types_lang_name: t('cookie_policy.types_lang_name'),
    types_lang_purpose: t('cookie_policy.types_lang_purpose'),
    types_lang_duration: t('cookie_policy.types_lang_duration'),
    types_lang_type: t('cookie_policy.types_lang_type'),
    types_region_name: t('cookie_policy.types_region_name'),
    types_region_purpose: t('cookie_policy.types_region_purpose'),
    types_region_duration: t('cookie_policy.types_region_duration'),
    types_region_type: t('cookie_policy.types_region_type'),
    types_marketing_title: t('cookie_policy.types_marketing_title'),
    types_marketing_text: t('cookie_policy.types_marketing_text'),
    types_fb_name: t('cookie_policy.types_fb_name'),
    types_fb_purpose: t('cookie_policy.types_fb_purpose'),
    types_fb_duration: t('cookie_policy.types_fb_duration'),
    types_fb_type: t('cookie_policy.types_fb_type'),
    types_ads_name: t('cookie_policy.types_ads_name'),
    types_ads_purpose: t('cookie_policy.types_ads_purpose'),
    types_ads_duration: t('cookie_policy.types_ads_duration'),
    types_ads_type: t('cookie_policy.types_ads_type'),
    management_title: t('cookie_policy.management_title'),
    management_text: t('cookie_policy.management_text'),
    management_center_title: t('cookie_policy.management_center_title'),
    management_center_text: t('cookie_policy.management_center_text'),
    management_center_banner: t('cookie_policy.management_center_banner'),
    management_center_footer: t('cookie_policy.management_center_footer'),
    management_center_email: t('cookie_policy.management_center_email'),
    management_center_note: t('cookie_policy.management_center_note'),
    management_browser_title: t('cookie_policy.management_browser_title'),
    management_browser_text: t('cookie_policy.management_browser_text'),
    management_chrome: t('cookie_policy.management_chrome'),
    management_chrome_desc: t('cookie_policy.management_chrome_desc'),
    management_firefox: t('cookie_policy.management_firefox'),
    management_firefox_desc: t('cookie_policy.management_firefox_desc'),
    management_edge: t('cookie_policy.management_edge'),
    management_edge_desc: t('cookie_policy.management_edge_desc'),
    management_safari: t('cookie_policy.management_safari'),
    management_safari_desc: t('cookie_policy.management_safari_desc'),
    management_browser_note: t('cookie_policy.management_browser_note'),
    management_optout_title: t('cookie_policy.management_optout_title'),
    management_optout_text: t('cookie_policy.management_optout_text'),
    management_optout_ga: t('cookie_policy.management_optout_ga'),
    management_optout_fb: t('cookie_policy.management_optout_fb'),
    management_optout_daa: t('cookie_policy.management_optout_daa'),
    management_consequences_title: t('cookie_policy.management_consequences_title'),
    management_consequences_text: t('cookie_policy.management_consequences_text'),
    management_consequences_necessary: t('cookie_policy.management_consequences_necessary'),
    management_consequences_necessary_desc: t('cookie_policy.management_consequences_necessary_desc'),
    management_consequences_functional: t('cookie_policy.management_consequences_functional'),
    management_consequences_functional_desc: t('cookie_policy.management_consequences_functional_desc'),
    management_consequences_analytical: t('cookie_policy.management_consequences_analytical'),
    management_consequences_analytical_desc: t('cookie_policy.management_consequences_analytical_desc'),
    management_consequences_marketing: t('cookie_policy.management_consequences_marketing'),
    management_consequences_marketing_desc: t('cookie_policy.management_consequences_marketing_desc'),
    management_consequences_footer: t('cookie_policy.management_consequences_footer'),
    management_warning: t('cookie_policy.management_warning'),
    management_warning_text: t('cookie_policy.management_warning_text'),
    consent_title: t('cookie_policy.consent_title'),
    consent_text: t('cookie_policy.consent_text'),
    consent_legal_title: t('cookie_policy.consent_legal_title'),
    consent_legal_necessary: t('cookie_policy.consent_legal_necessary'),
    consent_legal_necessary_desc: t('cookie_policy.consent_legal_necessary_desc'),
    consent_legal_functional: t('cookie_policy.consent_legal_functional'),
    consent_legal_functional_desc: t('cookie_policy.consent_legal_functional_desc'),
    consent_legal_analytical: t('cookie_policy.consent_legal_analytical'),
    consent_legal_analytical_desc: t('cookie_policy.consent_legal_analytical_desc'),
    consent_legal_marketing: t('cookie_policy.consent_legal_marketing'),
    consent_legal_marketing_desc: t('cookie_policy.consent_legal_marketing_desc'),
    consent_give_title: t('cookie_policy.consent_give_title'),
    consent_give_text: t('cookie_policy.consent_give_text'),
    consent_voluntary: t('cookie_policy.consent_voluntary'),
    consent_voluntary_desc: t('cookie_policy.consent_voluntary_desc'),
    consent_specific: t('cookie_policy.consent_specific'),
    consent_specific_desc: t('cookie_policy.consent_specific_desc'),
    consent_informed: t('cookie_policy.consent_informed'),
    consent_informed_desc: t('cookie_policy.consent_informed_desc'),
    consent_revocable: t('cookie_policy.consent_revocable'),
    consent_revocable_desc: t('cookie_policy.consent_revocable_desc'),
    consent_validity_title: t('cookie_policy.consent_validity_title'),
    consent_validity_text: t('cookie_policy.consent_validity_text'),
    consent_validity_change: t('cookie_policy.consent_validity_change'),
    consent_revoke_label: t('cookie_policy.consent_revoke_label'),
    consent_revoke_footer: t('cookie_policy.consent_revoke_footer'),
    thirdparty_title: t('cookie_policy.thirdparty_title'),
    thirdparty_text: t('cookie_policy.thirdparty_text'),
    thirdparty_google_title: t('cookie_policy.thirdparty_google_title'),
    thirdparty_google_text: t('cookie_policy.thirdparty_google_text'),
    thirdparty_google_analytics: t('cookie_policy.thirdparty_google_analytics'),
    thirdparty_google_analytics_desc: t('cookie_policy.thirdparty_google_analytics_desc'),
    thirdparty_google_ads: t('cookie_policy.thirdparty_google_ads'),
    thirdparty_google_ads_desc: t('cookie_policy.thirdparty_google_ads_desc'),
    thirdparty_google_maps: t('cookie_policy.thirdparty_google_maps'),
    thirdparty_google_maps_desc: t('cookie_policy.thirdparty_google_maps_desc'),
    thirdparty_google_recaptcha: t('cookie_policy.thirdparty_google_recaptcha'),
    thirdparty_google_recaptcha_desc: t('cookie_policy.thirdparty_google_recaptcha_desc'),
    thirdparty_google_privacy: t('cookie_policy.thirdparty_google_privacy'),
    thirdparty_social_title: t('cookie_policy.thirdparty_social_title'),
    thirdparty_social_text: t('cookie_policy.thirdparty_social_text'),
    thirdparty_facebook: t('cookie_policy.thirdparty_facebook'),
    thirdparty_facebook_desc: t('cookie_policy.thirdparty_facebook_desc'),
    thirdparty_instagram: t('cookie_policy.thirdparty_instagram'),
    thirdparty_instagram_desc: t('cookie_policy.thirdparty_instagram_desc'),
    thirdparty_linkedin: t('cookie_policy.thirdparty_linkedin'),
    thirdparty_linkedin_desc: t('cookie_policy.thirdparty_linkedin_desc'),
    thirdparty_whatsapp: t('cookie_policy.thirdparty_whatsapp'),
    thirdparty_whatsapp_desc: t('cookie_policy.thirdparty_whatsapp_desc'),
    thirdparty_social_note: t('cookie_policy.thirdparty_social_note'),
    thirdparty_security_title: t('cookie_policy.thirdparty_security_title'),
    thirdparty_security_text: t('cookie_policy.thirdparty_security_text'),
    thirdparty_cloudflare: t('cookie_policy.thirdparty_cloudflare'),
    thirdparty_cloudflare_desc: t('cookie_policy.thirdparty_cloudflare_desc'),
    thirdparty_sentry: t('cookie_policy.thirdparty_sentry'),
    thirdparty_sentry_desc: t('cookie_policy.thirdparty_sentry_desc'),
    thirdparty_warning: t('cookie_policy.thirdparty_warning'),
    thirdparty_warning_text: t('cookie_policy.thirdparty_warning_text'),
    changes_title: t('cookie_policy.changes_title'),
    changes_text: t('cookie_policy.changes_text'),
    changes_notification_title: t('cookie_policy.changes_notification_title'),
    changes_notification_text: t('cookie_policy.changes_notification_text'),
    changes_notification_banner: t('cookie_policy.changes_notification_banner'),
    changes_notification_date: t('cookie_policy.changes_notification_date'),
    changes_notification_email: t('cookie_policy.changes_notification_email'),
    changes_notification_social: t('cookie_policy.changes_notification_social'),
    changes_new_consent_title: t('cookie_policy.changes_new_consent_title'),
    changes_new_consent_text: t('cookie_policy.changes_new_consent_text'),
    changes_review_title: t('cookie_policy.changes_review_title'),
    changes_review_text: t('cookie_policy.changes_review_text'),
    changes_advice: t('cookie_policy.changes_advice'),
    changes_questions_label: t('cookie_policy.changes_questions_label'),
    changes_questions_text: t('cookie_policy.changes_questions_text'),
    changes_questions_suffix: t('cookie_policy.changes_questions_suffix'),
    security_title: t('cookie_policy.security_title'),
    security_text: t('cookie_policy.security_text'),
    security_technical_title: t('cookie_policy.security_technical_title'),
    security_encryption: t('cookie_policy.security_encryption'),
    security_encryption_desc: t('cookie_policy.security_encryption_desc'),
    security_access: t('cookie_policy.security_access'),
    security_access_desc: t('cookie_policy.security_access_desc'),
    security_firewall: t('cookie_policy.security_firewall'),
    security_firewall_desc: t('cookie_policy.security_firewall_desc'),
    security_updates: t('cookie_policy.security_updates'),
    security_updates_desc: t('cookie_policy.security_updates_desc'),
    security_backup: t('cookie_policy.security_backup'),
    security_backup_desc: t('cookie_policy.security_backup_desc'),
    security_org_title: t('cookie_policy.security_org_title'),
    security_training: t('cookie_policy.security_training'),
    security_training_desc: t('cookie_policy.security_training_desc'),
    security_access_mgmt: t('cookie_policy.security_access_mgmt'),
    security_access_mgmt_desc: t('cookie_policy.security_access_mgmt_desc'),
    security_incident: t('cookie_policy.security_incident'),
    security_incident_desc: t('cookie_policy.security_incident_desc'),
    security_audit: t('cookie_policy.security_audit'),
    security_audit_desc: t('cookie_policy.security_audit_desc'),
    security_cookie_title: t('cookie_policy.security_cookie_title'),
    security_cookie_text: t('cookie_policy.security_cookie_text'),
    security_secure_flag: t('cookie_policy.security_secure_flag'),
    security_secure_flag_desc: t('cookie_policy.security_secure_flag_desc'),
    security_httponly: t('cookie_policy.security_httponly'),
    security_httponly_desc: t('cookie_policy.security_httponly_desc'),
    security_samesite: t('cookie_policy.security_samesite'),
    security_samesite_desc: t('cookie_policy.security_samesite_desc'),
    security_minimal: t('cookie_policy.security_minimal'),
    security_minimal_desc: t('cookie_policy.security_minimal_desc'),
    security_retention: t('cookie_policy.security_retention'),
    security_retention_desc: t('cookie_policy.security_retention_desc'),
    security_breach_label: t('cookie_policy.security_breach_label'),
    security_breach_text: t('cookie_policy.security_breach_text'),
    security_role_title: t('cookie_policy.security_role_title'),
    security_role_text: t('cookie_policy.security_role_text'),
    security_role_browser: t('cookie_policy.security_role_browser'),
    security_role_settings: t('cookie_policy.security_role_settings'),
    security_role_report: t('cookie_policy.security_role_report'),
    security_role_credentials: t('cookie_policy.security_role_credentials'),
    contact_title: t('cookie_policy.contact_title'),
    contact_text: t('cookie_policy.contact_text'),
    contact_company: t('cookie_policy.contact_company'),
    contact_response: t('cookie_policy.contact_response'),
    schema_name: t('cookie_policy.schema_name'),
    schema_description: t('cookie_policy.schema_description'),
    schema_language: t('cookie_policy.schema_language'),
    schema_main_name: t('cookie_policy.schema_main_name'),
    schema_main_description: t('cookie_policy.schema_main_description'),
  };

  return (
    <div className={styles.cookiePage}>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaData} />

      <main>
        <section className="section">
          <div className="section-inner">
            <CookieHero translations={translations} locale={validLocale} />
            
            <div className={styles.content}>
              <div className={styles.contentInner}>
                <CookieIntroduction translations={translations} />
                <CookieDefinition translations={translations} />
                <CookieUsage translations={translations} />
                <CookieTypes translations={translations} />
                <CookieConsent translations={translations} />
                <CookieManagement translations={translations} />
                <CookieThirdParty translations={translations} />
                <CookieSecurity translations={translations} />
                <CookieChanges translations={translations} />
                <CookieContact translations={translations} />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <CookieSchema translations={translations} />
    </div>
  );
}
