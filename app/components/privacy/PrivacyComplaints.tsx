import styles from '../../styles/Privacy.module.css';

const PrivacyComplaints = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '11. Complaints' : '11. Klachten'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'If you have complaints about the processing of your personal data, you can contact us at privacy@hovenier.frl. You also have the right to file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).'
          : 'Bij klachten over de verwerking van uw persoonlijke gegevens kunt u contact opnemen met privacy@hovenier.frl. U heeft ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP).'}
      </p>
    </section>
  );
};

export default PrivacyComplaints;