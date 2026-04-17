import styles from '../../styles/Privacy.module.css';

const PrivacySecurity = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '7. Data security' : '7. Gegevensbeveiliging'}</h2>
      <p className={styles.legalText}>
        {isEn ? 'We take appropriate technical and organizational measures to protect your data against:' : 'Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen:'}
      </p>
      <ul className={styles.legalList}>
        <li>{isEn ? 'Unauthorized access' : 'Ongeautoriseerde toegang'}</li>
        <li>{isEn ? 'Loss or destruction' : 'Verlies of vernietiging'}</li>
        <li>{isEn ? 'Unlawful processing' : 'Onrechtmatige verwerking'}</li>
        <li>{isEn ? 'Accidental damage' : 'Accidentele beschadiging'}</li>
      </ul>
    </section>
  );
};

export default PrivacySecurity;