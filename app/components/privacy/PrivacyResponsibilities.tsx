import styles from '../../styles/Privacy.module.css';

const PrivacyResponsibilities = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>2. Verantwoordelijkheden</h2>
      <p className={styles.legalText}>
        Hovenier.frl is de verwerkingsverantwoordelijke voor de verwerking van uw persoonlijke gegevens. 
        Onze contactgegevens zijn:
      </p>
      <address className={styles.legalContact}>
        <strong>Hovenier.frl</strong><br />
        E-mail: privacy@hovenier.frl<br />
        Telefoon: +31 (0)515-123456
      </address>
    </section>
  );
};

export default PrivacyResponsibilities;