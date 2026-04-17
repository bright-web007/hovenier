import styles from '../../styles/Cookie.module.css';

interface CookieChangesProps {
  translations: Record<string, string>;
}

export default function CookieChanges({ translations }: CookieChangesProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.changes_title}</h2>
      <p className={styles.legalText}>
        {translations.changes_text}
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.changes_notification_title}</h3>
      <p className={styles.legalText}>
        {translations.changes_notification_text}
      </p>
      <ul className={styles.legalList}>
        <li>{translations.changes_notification_banner}</li>
        <li>{translations.changes_notification_date}</li>
        <li>{translations.changes_notification_email}</li>
        <li>{translations.changes_notification_social}</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.changes_new_consent_title}</h3>
      <p className={styles.legalText}>
        {translations.changes_new_consent_text}
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.changes_review_title}</h3>
      <p className={styles.legalText}>
        {translations.changes_review_text}
      </p>
      
      <p className={styles.legalText}>
        {translations.changes_advice}
      </p>
      
      <div className={styles.legalContact}>
        <p>
          <strong>{translations.changes_questions_label}</strong><br />
          {translations.changes_questions_text} <a href="mailto:privacy@hovenier.frl" className={styles.legalLink}>privacy@hovenier.frl</a> {translations.changes_questions_suffix}
        </p>
      </div>
    </section>
  );
}