import styles from '../../styles/Privacy.module.css';

const PrivacyDataSharing = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>6. Delen van gegevens</h2>
      <p className={styles.legalText}>
        Wij delen uw gegevens uitsluitend met:
      </p>
      <ul className={styles.legalList}>
        <li>Aangesloten hoveniers voor het versturen van offertes</li>
        <li>Technische dienstverleners voor websiteonderhoud</li>
        <li>Autoriteiten wanneer dit wettelijk verplicht is</li>
      </ul>
      <p className={styles.legalText}>
        Wij verkopen nooit uw gegevens aan derden voor marketing doeleinden.
      </p>
    </section>
  );
};

export default PrivacyDataSharing;