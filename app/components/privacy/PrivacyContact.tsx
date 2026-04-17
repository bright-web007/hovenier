import styles from '../../styles/Privacy.module.css';

const PrivacyContact = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>13. Contact</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'If you have questions about this privacy policy, you can contact us:'
          : 'Voor vragen over dit privacybeleid kunt u contact met ons opnemen:'}
      </p>
      
      <div className={styles.contactHighlight}>
        <h3>Privacy Officer</h3>
        <address>
          {isEn ? 'Email' : 'E-mail'}: <a href="mailto:privacy@hovenier.frl">privacy@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
      </div>
    </section>
  );
};

export default PrivacyContact;