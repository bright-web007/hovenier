import styles from '../../styles/Privacy.module.css';

const PrivacyResponsibilities = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '2. Responsibilities' : '2. Verantwoordelijkheden'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'Hovenier.frl is the data controller for the processing of your personal data. Our contact details are:'
          : 'Hovenier.frl is de verwerkingsverantwoordelijke voor de verwerking van uw persoonlijke gegevens. Onze contactgegevens zijn:'}
      </p>
      <address className={styles.legalContact}>
        <strong>Hovenier.frl</strong><br />
        E-mail: privacy@hovenier.frl
      </address>
    </section>
  );
};

export default PrivacyResponsibilities;