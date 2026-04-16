import styles from '../../styles/Privacy.module.css';

const PrivacyRetention = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '8. Retention periods' : '8. Bewaartermijnen'}</h2>
      <ul className={styles.legalList}>
        <li><strong>{isEn ? 'Contact requests:' : 'Contactaanvragen:'}</strong> {isEn ? '2 years after last contact' : '2 jaar na laatste contact'}</li>
        <li><strong>{isEn ? 'Newsletter registrations:' : 'Nieuwsbrief registraties:'}</strong> {isEn ? 'Until unsubscription' : 'Tot uitschrijving'}</li>
        <li><strong>{isEn ? 'Website analytics:' : 'Website analytics:'}</strong> {isEn ? '26 months' : '26 maanden'}</li>
        <li><strong>{isEn ? 'Administration:' : 'Administratie:'}</strong> {isEn ? '7 years in accordance with tax legislation' : '7 jaar conform fiscale wetgeving'}</li>
      </ul>
    </section>
  );
};

export default PrivacyRetention;