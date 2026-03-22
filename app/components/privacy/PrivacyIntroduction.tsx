import styles from '../../styles/Privacy.module.css';

const PrivacyIntroduction = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>1. Inleiding</h2>
      <p className={styles.privacyIntroText}>
        "Uw privacy is de basis van ons vertrouwen"
      </p>
      <p className={styles.legalText}>
        Hovenier.frl ("wij", "ons", "onze") respecteert uw privacy en zet zich in voor de bescherming 
        van uw persoonlijke gegevens. Dit privacybeleid legt uit hoe wij uw gegevens verzamelen, 
        gebruiken en beschermen wanneer u onze website gebruikt.
      </p>
    </section>
  );
};

export default PrivacyIntroduction;