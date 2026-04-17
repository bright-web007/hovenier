import styles from '../../styles/Privacy.module.css';

const PrivacyLegalBasis = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '5. Legal basis for processing' : '5. Rechtsgrond voor verwerking'}</h2>
      <p className={styles.legalText}>
        {isEn ? 'We process your data based on:' : 'Wij verwerken uw gegevens op basis van:'}
      </p>
      <ul className={styles.legalList}>
        <li><strong>{isEn ? 'Contract performance:' : 'Uitvoering overeenkomst:'}</strong> {isEn ? 'For providing our services' : 'Voor het verlenen van onze diensten'}</li>
        <li><strong>{isEn ? 'Legitimate interest:' : 'Gerechtvaardigd belang:'}</strong> {isEn ? 'For improving our services' : 'Voor het verbeteren van onze diensten'}</li>
        <li><strong>{isEn ? 'Consent:' : 'Toestemming:'}</strong> {isEn ? 'For newsletters and marketing' : 'Voor nieuwsbrieven en marketing'}</li>
        <li><strong>{isEn ? 'Legal obligation:' : 'Wettelijke verplichting:'}</strong> {isEn ? 'For administrative purposes' : 'Voor administratieve doeleinden'}</li>
      </ul>
    </section>
  );
};

export default PrivacyLegalBasis;