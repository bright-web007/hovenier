import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerUsageProps {
  translations: Record<string, string>;
}

export default function DisclaimerUsage({ translations }: DisclaimerUsageProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.usage_title}</h2>
      
      <div className={styles.warningBox}>
        <h3 className={styles.warningTitle}>
          {translations.usage_warning_title}
        </h3>
        <p className={styles.warningText}>
          {translations.usage_warning_text}
        </p>
      </div>

      <h3 className={styles.legalSubsectionTitle}>{translations.usage_due_diligence_title}</h3>
      <p className={styles.legalText}>
        {translations.usage_due_diligence_text}
      </p>
      
      <ul className={styles.legalList}>
        <li>{translations.usage_dd_quotes}</li>
        <li>{translations.usage_dd_references}</li>
        <li>{translations.usage_dd_insurance}</li>
        <li>{translations.usage_dd_agreements}</li>
        <li>{translations.usage_dd_contracts}</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{translations.usage_responsibility_title}</h3>
      <p className={styles.legalText}>
        {translations.usage_responsibility_text}
      </p>
      
      <ul className={styles.legalList}>
        <li>{translations.usage_resp_selection}</li>
        <li>{translations.usage_resp_negotiation}</li>
        <li>{translations.usage_resp_quality}</li>
        <li>{translations.usage_resp_disputes}</li>
      </ul>
    </section>
  );
}