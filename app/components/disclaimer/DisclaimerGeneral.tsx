import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerGeneralProps {
  translations: Record<string, string>;
}

export default function DisclaimerGeneral({ translations }: DisclaimerGeneralProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.general_title}</h2>
      
      <div className={styles.warningBox}>
        <h3 className={styles.warningTitle}>
          {translations.general_warning_title}
        </h3>
        <p className={styles.warningText}>
          {translations.general_warning_text}
        </p>
      </div>

      <p className={styles.legalText}>
        {translations.general_text_1}
      </p>
      
      <p className={styles.legalText}>
        {translations.general_text_2}
      </p>
    </section>
  );
}