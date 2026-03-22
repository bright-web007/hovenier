import styles from '../../styles/Privacy.module.css';

const PrivacySecurity = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>7. Gegevensbeveiliging</h2>
      <p className={styles.legalText}>
        Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen:
      </p>
      <ul className={styles.legalList}>
        <li>Ongeautoriseerde toegang</li>
        <li>Verlies of vernietiging</li>
        <li>Onrechtmatige verwerking</li>
        <li>Accidentele beschadiging</li>
      </ul>
    </section>
  );
};

export default PrivacySecurity;