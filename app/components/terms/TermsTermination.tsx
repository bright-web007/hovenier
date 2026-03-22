import styles from '../../styles/Terms.module.css';

export default function TermsTermination() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>10. Beëindiging</h2>
      <p className={styles.legalText}>
        Hovenier.frl behoudt zich het recht voor toegang tot het platform te weigeren of te beëindigen 
        bij overtreding van deze voorwaarden of bij misbruik van het platform.
      </p>
      <p className={styles.legalText}>
        Gebruikers kunnen hun account op elk moment beëindigen door contact op te nemen met onze 
        klantenservice.
      </p>
    </section>
  );
}