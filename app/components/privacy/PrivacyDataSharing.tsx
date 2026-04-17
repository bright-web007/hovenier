import styles from '../../styles/Privacy.module.css';

const PrivacyDataSharing = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '6. Sharing of data' : '6. Delen van gegevens'}</h2>
      <p className={styles.legalText}>
        {isEn ? 'We only share your data with:' : 'Wij delen uw gegevens uitsluitend met:'}
      </p>
      <ul className={styles.legalList}>
        <li>{isEn ? 'Affiliated gardeners for sending quotes' : 'Aangesloten hoveniers voor het versturen van offertes'}</li>
        <li>{isEn ? 'Technical service providers for website maintenance' : 'Technische dienstverleners voor websiteonderhoud'}</li>
        <li>{isEn ? 'Authorities when legally required' : 'Autoriteiten wanneer dit wettelijk verplicht is'}</li>
      </ul>
      <p className={styles.legalText}>
        {isEn ? 'We never sell your data to third parties for marketing purposes.' : 'Wij verkopen nooit uw gegevens aan derden voor marketing doeleinden.'}
      </p>
    </section>
  );
};

export default PrivacyDataSharing;