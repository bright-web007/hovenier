import styles from '../../styles/Privacy.module.css';

const PrivacyHero = () => {
  return (
    <header className={styles.legalHeader}>
      <h1 className={styles.legalTitle}>Privacybeleid</h1>
      <p className={styles.legalSubtitle}>
        Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </header>
  );
};

export default PrivacyHero;