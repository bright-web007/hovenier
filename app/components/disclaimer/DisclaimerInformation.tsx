import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerInformationProps {
  translations: Record<string, string>;
}

export default function DisclaimerInformation({ translations }: DisclaimerInformationProps) {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{translations.information_title}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{translations.information_accuracy_title}</h3>
      <p className={styles.legalText}>
        {translations.information_accuracy_text}
      </p>
      
      <ul className={styles.legalList}>
        <li>{translations.information_accuracy_prices}</li>
        <li>{translations.information_accuracy_availability}</li>
        <li>{translations.information_accuracy_areas}</li>
        <li>{translations.information_accuracy_certs}</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{translations.information_thirdparty_title}</h3>
      <p className={styles.legalText}>
        {translations.information_thirdparty_text}
      </p>
      
      <ul className={styles.legalList}>
        <li>{translations.information_thirdparty_incorrect}</li>
        <li>{translations.information_thirdparty_outdated}</li>
        <li>{translations.information_thirdparty_contact}</li>
        <li>{translations.information_thirdparty_claims}</li>
      </ul>
    </section>
  );
}