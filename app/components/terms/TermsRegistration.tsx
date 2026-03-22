import styles from '../../styles/Terms.module.css';

export default function TermsRegistration() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>5. Registratie en Account</h2>
      
      <h3 className={styles.legalSubsectionTitle}>5.1 Voor Klanten</h3>
      <p className={styles.legalText}>
        Klanten kunnen zonder registratie gebruik maken van de basisfunctionaliteiten van het platform.
      </p>

      <h3 className={styles.legalSubsectionTitle}>5.2 Voor Hoveniers</h3>
      <p className={styles.legalText}>
        Hoveniers die zich willen aansluiten bij het platform doorlopen een screening proces waarbij 
        certificaten, verzekeringen en referenties worden gecontroleerd.
      </p>
    </section>
  );
}