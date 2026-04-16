import styles from '../../styles/Cookie.module.css';

interface CookieConsentProps {
  translations: Record<string, string>;
}

export default function CookieConsent({ translations }: CookieConsentProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.consent_title}</h2>
      <p className={styles.legalText}>
        {translations.consent_text}
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.consent_legal_title}</h3>
      <ul className={styles.legalList}>
        <li><strong>{translations.consent_legal_necessary}</strong> {translations.consent_legal_necessary_desc}</li>
        <li><strong>{translations.consent_legal_functional}</strong> {translations.consent_legal_functional_desc}</li>
        <li><strong>{translations.consent_legal_analytical}</strong> {translations.consent_legal_analytical_desc}</li>
        <li><strong>{translations.consent_legal_marketing}</strong> {translations.consent_legal_marketing_desc}</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.consent_give_title}</h3>
      <p className={styles.legalText}>
        {translations.consent_give_text}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{translations.consent_voluntary}</strong> {translations.consent_voluntary_desc}</li>
        <li><strong>{translations.consent_specific}</strong> {translations.consent_specific_desc}</li>
        <li><strong>{translations.consent_informed}</strong> {translations.consent_informed_desc}</li>
        <li><strong>{translations.consent_revocable}</strong> {translations.consent_revocable_desc}</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.consent_validity_title}</h3>
      <p className={styles.legalText}>
        {translations.consent_validity_text}
      </p>
      <p className={styles.legalText}>
        {translations.consent_validity_change}
      </p>
      
      <div className={styles.legalContact}>
        <p>
          <strong>{translations.consent_revoke_label}</strong><br />
          E-mail: <a href="mailto:privacy@hovenier.frl" className={styles.legalLink}>privacy@hovenier.frl</a><br />
          {translations.consent_revoke_footer}
        </p>
      </div>
    </section>
  );
}