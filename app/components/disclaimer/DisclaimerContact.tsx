import styles from '../../styles/Disclaimer.module.css';

interface DisclaimerContactProps {
  translations: Record<string, string>;
}

export default function DisclaimerContact({ translations }: DisclaimerContactProps) {
  return (
    <section className={styles.legalSection}>
      <div className={styles.contactHighlight}>
        <h3>{translations.contact_title}</h3>
        <p>
          {translations.contact_text}
        </p>
        
        <address>
          <strong>{translations.contact_company}</strong><br />
          E-mail: <a href="mailto:info@hovenier.frl">info@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
        
        <p>
          {translations.contact_response}
        </p>
      </div>
      
      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>{translations.contact_warning}</strong> {translations.contact_warning_text}
        </p>
      </div>
    </section>
  );
}