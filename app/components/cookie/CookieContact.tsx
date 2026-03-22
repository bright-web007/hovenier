import styles from '../../styles/Cookie.module.css';

export default function CookieContact() {
  return (
    <section className={styles.legalSection}>
      <div className={styles.contactHighlight}>
        <h3>9. Contact</h3>
        <p>
          Heeft u vragen over ons cookiebeleid of wilt u uw cookie-voorkeuren wijzigen? 
          Neem gerust contact met ons op.
        </p>
        
        <address>
          <strong>Hovenier.frl</strong><br />
          E-mail: <a href="mailto:privacy@hovenier.frl">privacy@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
        
        <p>
          Wij streven ernaar binnen 48 uur te reageren op uw vragen over cookies en privacy.
        </p>
      </div>
    </section>
  );
}