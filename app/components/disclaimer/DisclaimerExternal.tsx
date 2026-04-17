import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerExternalProps {
  translations: Record<string, string>;
}

export default function DisclaimerExternal({ translations }: DisclaimerExternalProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.external_title}</h2>

      <h3 className={styles.legalSubsectionTitle}>{translations.external_websites_title}</h3>
      <p className={styles.legalText}>
        {translations.external_websites_text}
      </p>
      
      <ul className={styles.legalList}>
        <li>{translations.external_websites_accuracy}</li>
        <li>{translations.external_websites_privacy}</li>
        <li>{translations.external_websites_liability}</li>
        <li>{translations.external_websites_endorsement}</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{translations.external_thirdparty_title}</h3>
      <p className={styles.legalText}>
        {translations.external_thirdparty_text}
      </p>
      
      <p className={styles.legalText}>
        {translations.external_thirdparty_note}
      </p>
    </section>
  );
}