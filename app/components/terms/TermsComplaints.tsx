import styles from '../../styles/Terms.module.css';

export default function TermsComplaints() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>9. Klachten en Geschillen</h2>
      
      <h3 className={styles.legalSubsectionTitle}>9.1 Klachtenprocedure</h3>
      <p className={styles.legalText}>
        Klachten over onze dienstverlening kunnen worden ingediend via info@hovenier.frl. 
        Wij streven ernaar alle klachten binnen 14 dagen te behandelen.
      </p>

      <h3 className={styles.legalSubsectionTitle}>9.2 Geschillen tussen gebruikers</h3>
      <p className={styles.legalText}>
        Geschillen tussen klanten en hoveniers worden door partijen zelf opgelost. Hovenier.frl 
        kan bemiddelen maar is niet verplicht dit te doen.
      </p>
    </section>
  );
}