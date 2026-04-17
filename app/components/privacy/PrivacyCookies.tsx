import styles from '../../styles/Privacy.module.css';

const PrivacyCookies = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>10. Cookies</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'Our website uses different types of cookies:'
          : 'Onze website gebruikt verschillende soorten cookies:'}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{isEn ? 'Necessary cookies:' : 'Noodzakelijke cookies:'}</strong> {isEn ? 'For basic functionality' : 'Voor basisfunctionaliteit'}</li>
        <li><strong>{isEn ? 'Analytical cookies:' : 'Analytische cookies:'}</strong> {isEn ? 'For website statistics (Google Analytics)' : 'Voor websitestatistieken (Google Analytics)'}</li>
        <li><strong>{isEn ? 'Marketing cookies:' : 'Marketing cookies:'}</strong> {isEn ? 'For personalised advertisements (with consent)' : 'Voor gepersonaliseerde advertenties (met toestemming)'}</li>
      </ul>
      <p className={styles.legalText}>
        {isEn
          ? 'You can manage cookies through your browser settings.'
          : 'U kunt cookies beheren via uw browserinstellingen.'}
      </p>
    </section>
  );
};

export default PrivacyCookies;