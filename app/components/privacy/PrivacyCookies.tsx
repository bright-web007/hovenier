import styles from '../../styles/Privacy.module.css';

const PrivacyCookies = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>10. Cookies</h2>
      <p className={styles.legalText}>
        Onze website gebruikt verschillende soorten cookies:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Noodzakelijke cookies:</strong> Voor basisfunctionaliteit</li>
        <li><strong>Analytische cookies:</strong> Voor websitestatistieken (Google Analytics)</li>
        <li><strong>Marketing cookies:</strong> Voor gepersonaliseerde advertenties (met toestemming)</li>
      </ul>
      <p className={styles.legalText}>
        U kunt cookies beheren via uw browserinstellingen.
      </p>
    </section>
  );
};

export default PrivacyCookies;