import styles from '../../styles/Cookie.module.css';

interface CookieSecurityProps {
  translations: Record<string, string>;
}

export default function CookieSecurity({ translations }: CookieSecurityProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.security_title}</h2>
      <p className={styles.legalText}>
        {translations.security_text}
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.security_technical_title}</h3>
      <ul className={styles.legalList}>
        <li><strong>{translations.security_encryption}</strong> {translations.security_encryption_desc}</li>
        <li><strong>{translations.security_access}</strong> {translations.security_access_desc}</li>
        <li><strong>{translations.security_firewall}</strong> {translations.security_firewall_desc}</li>
        <li><strong>{translations.security_updates}</strong> {translations.security_updates_desc}</li>
        <li><strong>{translations.security_backup}</strong> {translations.security_backup_desc}</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.security_org_title}</h3>
      <ul className={styles.legalList}>
        <li><strong>{translations.security_training}</strong> {translations.security_training_desc}</li>
        <li><strong>{translations.security_access_mgmt}</strong> {translations.security_access_mgmt_desc}</li>
        <li><strong>{translations.security_incident}</strong> {translations.security_incident_desc}</li>
        <li><strong>{translations.security_audit}</strong> {translations.security_audit_desc}</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.security_cookie_title}</h3>
      <p className={styles.legalText}>
        {translations.security_cookie_text}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{translations.security_secure_flag}</strong> {translations.security_secure_flag_desc}</li>
        <li><strong>{translations.security_httponly}</strong> {translations.security_httponly_desc}</li>
        <li><strong>{translations.security_samesite}</strong> {translations.security_samesite_desc}</li>
        <li><strong>{translations.security_minimal}</strong> {translations.security_minimal_desc}</li>
        <li><strong>{translations.security_retention}</strong> {translations.security_retention_desc}</li>
      </ul>
      
      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>{translations.security_breach_label}</strong> {translations.security_breach_text}
        </p>
      </div>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.security_role_title}</h3>
      <p className={styles.legalText}>
        {translations.security_role_text}
      </p>
      <ul className={styles.legalList}>
        <li>{translations.security_role_browser}</li>
        <li>{translations.security_role_settings}</li>
        <li>{translations.security_role_report}</li>
        <li>{translations.security_role_credentials}</li>
      </ul>
    </section>
  );
}