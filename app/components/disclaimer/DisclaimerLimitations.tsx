import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerLimitationsProps {
  translations: Record<string, string>;
}

export default function DisclaimerLimitations({ translations }: DisclaimerLimitationsProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.limitations_title}</h2>
      
      <div className={styles.disclaimerTypes}>
        <div className={styles.disclaimerCard}>
          <h3 className={styles.disclaimerCardTitle}>{translations.limitations_no_guarantees_title}</h3>
          <p className={styles.disclaimerCardText}>
            {translations.limitations_no_guarantees_text}
          </p>
        </div>
        
        <div className={styles.disclaimerCard}>
          <h3 className={styles.disclaimerCardTitle}>{translations.limitations_no_liability_title}</h3>
          <p className={styles.disclaimerCardText}>
            {translations.limitations_no_liability_text}
          </p>
        </div>
        
        <div className={styles.disclaimerCard}>
          <h3 className={styles.disclaimerCardTitle}>{translations.limitations_own_research_title}</h3>
          <p className={styles.disclaimerCardText}>
            {translations.limitations_own_research_text}
          </p>
        </div>
      </div>

      <div className={styles.limitationGrid}>
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            {translations.limitations_services_title}
          </h3>
          <p className={styles.limitationDescription}>
            {translations.limitations_services_text}
          </p>
        </div>
        
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            {translations.limitations_technical_title}
          </h3>
          <p className={styles.limitationDescription}>
            {translations.limitations_technical_text}
          </p>
        </div>
        
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            {translations.limitations_financial_title}
          </h3>
          <p className={styles.limitationDescription}>
            {translations.limitations_financial_text}
          </p>
        </div>
        
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            {translations.limitations_external_title}
          </h3>
          <p className={styles.limitationDescription}>
            {translations.limitations_external_text}
          </p>
        </div>
      </div>
    </section>
  );
}