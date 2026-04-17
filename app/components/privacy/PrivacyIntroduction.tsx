import styles from '../../styles/Privacy.module.css';

const PrivacyIntroduction = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '1. Introduction' : '1. Inleiding'}</h2>
      <p className={styles.privacyIntroText}>
        {isEn ? '"Your privacy is the foundation of our trust"' : '"Uw privacy is de basis van ons vertrouwen"'}
      </p>
      <p className={styles.legalText}>
        {isEn
          ? 'Hovenier.frl ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use and protect your data when you use our website.'
          : 'Hovenier.frl ("wij", "ons", "onze") respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens. Dit privacybeleid legt uit hoe wij uw gegevens verzamelen, gebruiken en beschermen wanneer u onze website gebruikt.'}
      </p>
    </section>
  );
};

export default PrivacyIntroduction;