import styles from '../../styles/Privacy.module.css';

const PrivacyChanges = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '12. Changes' : '12. Wijzigingen'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'We reserve the right to modify this privacy policy. Changes will be published on this page. We recommend that you review this policy regularly.'
          : 'Wij behouden ons het recht voor dit privacybeleid te wijzigen. Wijzigingen worden gepubliceerd op deze pagina. Wij adviseren u dit beleid regelmatig te raadplegen.'}
      </p>
    </section>
  );
};

export default PrivacyChanges;