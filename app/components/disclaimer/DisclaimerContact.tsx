import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerContact() {
  return (
    <section className={styles.legalSection}>
      <div className={styles.contactHighlight}>
        <h3>6. Contact</h3>
        <p>
          Heeft u vragen over deze disclaimer of wilt u meer informatie over onze 
          aansprakelijkheidsbeperkingen? Neem contact met ons op.
        </p>
        
        <address>
          <strong>Hovenier.frl</strong><br />
          E-mail: <a href="mailto:info@hovenier.frl">info@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
        
        <p>
          Wij streven ernaar binnen 2 werkdagen te reageren op uw vragen over deze disclaimer.
        </p>
      </div>
      
      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>Let op:</strong> Deze disclaimer vormt een integraal onderdeel van onze 
          algemene voorwaarden. Door gebruik van ons platform gaat u akkoord met zowel 
          onze voorwaarden als deze disclaimer.
        </p>
      </div>
    </section>
  );
}