import styles from '../../styles/Privacy.module.css';

const PrivacyContact = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>13. Contact</h2>
      <p className={styles.legalText}>
        Voor vragen over dit privacybeleid kunt u contact met ons opnemen:
      </p>
      
      <div className={styles.contactHighlight}>
        <h3>Privacy Officer</h3>
        <address>
          E-mail: <a href="mailto:privacy@hovenier.frl">privacy@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
      </div>
    </section>
  );
};

export default PrivacyContact;