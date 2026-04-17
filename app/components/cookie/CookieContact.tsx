import styles from '../../styles/Cookie.module.css';

interface CookieContactProps {
  translations: Record<string, string>;
}

export default function CookieContact({ translations }: CookieContactProps) {
  return (
    <section className={styles.legalSection}>
      <div className={styles.contactHighlight}>
        <h3>{translations.contact_title}</h3>
        <p>
          {translations.contact_text}
        </p>
        
        <address>
          <strong>{translations.contact_company}</strong><br />
          E-mail: <a href="mailto:privacy@hovenier.frl">privacy@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
        
        <p>
          {translations.contact_response}
        </p>
      </div>
    </section>
  );
}