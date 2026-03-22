import styles from '../../styles/Privacy.module.css';

const PrivacyLegalBasis = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>5. Rechtsgrond voor verwerking</h2>
      <p className={styles.legalText}>
        Wij verwerken uw gegevens op basis van:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Uitvoering overeenkomst:</strong> Voor het verlenen van onze diensten</li>
        <li><strong>Gerechtvaardigd belang:</strong> Voor het verbeteren van onze diensten</li>
        <li><strong>Toestemming:</strong> Voor nieuwsbrieven en marketing</li>
        <li><strong>Wettelijke verplichting:</strong> Voor administratieve doeleinden</li>
      </ul>
    </section>
  );
};

export default PrivacyLegalBasis;