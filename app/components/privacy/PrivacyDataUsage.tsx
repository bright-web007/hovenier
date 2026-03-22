import styles from '../../styles/Privacy.module.css';

const PrivacyDataUsage = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>4. Waarvoor gebruiken wij uw gegevens?</h2>
      <ul className={styles.legalList}>
        <li>Het koppelen van klanten aan geschikte hoveniers</li>
        <li>Het versturen van offertes en communicatie</li>
        <li>Het verbeteren van onze dienstverlening</li>
        <li>Het naleven van wettelijke verplichtingen</li>
        <li>Het verzenden van nieuwsbrieven (met toestemming)</li>
      </ul>
    </section>
  );
};

export default PrivacyDataUsage;