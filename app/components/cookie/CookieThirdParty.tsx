import styles from '../../styles/Cookie.module.css';

interface CookieThirdPartyProps {
  translations: Record<string, string>;
}

export default function CookieThirdParty({ translations }: CookieThirdPartyProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.thirdparty_title}</h2>
      <p className={styles.legalText}>
        {translations.thirdparty_text}
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.thirdparty_google_title}</h3>
      <p className={styles.legalText}>
        {translations.thirdparty_google_text}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{translations.thirdparty_google_analytics}</strong> {translations.thirdparty_google_analytics_desc}</li>
        <li><strong>{translations.thirdparty_google_ads}</strong> {translations.thirdparty_google_ads_desc}</li>
        <li><strong>{translations.thirdparty_google_maps}</strong> {translations.thirdparty_google_maps_desc}</li>
        <li><strong>{translations.thirdparty_google_recaptcha}</strong> {translations.thirdparty_google_recaptcha_desc}</li>
      </ul>
      <p className={styles.legalText}>
        {translations.thirdparty_google_privacy} <a href="https://policies.google.com/privacy" className={styles.legalLink} target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.thirdparty_social_title}</h3>
      <p className={styles.legalText}>
        {translations.thirdparty_social_text}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{translations.thirdparty_facebook}</strong> {translations.thirdparty_facebook_desc}</li>
        <li><strong>{translations.thirdparty_instagram}</strong> {translations.thirdparty_instagram_desc}</li>
        <li><strong>{translations.thirdparty_linkedin}</strong> {translations.thirdparty_linkedin_desc}</li>
        <li><strong>{translations.thirdparty_whatsapp}</strong> {translations.thirdparty_whatsapp_desc}</li>
      </ul>
      <p className={styles.legalText}>
        {translations.thirdparty_social_note}
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.thirdparty_security_title}</h3>
      <p className={styles.legalText}>
        {translations.thirdparty_security_text}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{translations.thirdparty_cloudflare}</strong> {translations.thirdparty_cloudflare_desc}</li>
        <li><strong>{translations.thirdparty_sentry}</strong> {translations.thirdparty_sentry_desc}</li>
      </ul>
      
      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>{translations.thirdparty_warning}</strong> {translations.thirdparty_warning_text}
        </p>
      </div>
    </section>
  );
}