import styles from '../../styles/Terms.module.css';

export default function TermsContact() {
  return (
    <section className={styles.legalSection}>
      <div className={styles.contactHighlight}>
        <h3>13. Contact</h3>
        <p>
          Heeft u vragen over deze algemene voorwaarden? Neem gerust contact met ons op.
        </p>
        
        <address>
          <strong>Hovenier.frl</strong><br />
          E-mail: <a href="mailto:info@hovenier.frl">info@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
        
        <p>
          Wij streven ernaar binnen 2 werkdagen te reageren op uw vragen.
        </p>
      </div>
    </section>
  );
}