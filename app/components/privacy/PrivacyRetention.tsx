import styles from '../../styles/Privacy.module.css';

const PrivacyRetention = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>8. Bewaartermijnen</h2>
      <ul className={styles.legalList}>
        <li><strong>Contactaanvragen:</strong> 2 jaar na laatste contact</li>
        <li><strong>Nieuwsbrief registraties:</strong> Tot uitschrijving</li>
        <li><strong>Website analytics:</strong> 26 maanden</li>
        <li><strong>Administratie:</strong> 7 jaar conform fiscale wetgeving</li>
      </ul>
    </section>
  );
};

export default PrivacyRetention;