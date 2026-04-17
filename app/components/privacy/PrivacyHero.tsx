import styles from '../../styles/Privacy.module.css';

const PrivacyHero = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <header className={styles.legalHeader}>
      <h1 className={styles.legalTitle}>{isEn ? 'Privacy Policy' : 'Privacybeleid'}</h1>
      <p className={styles.legalSubtitle}>
        {isEn ? 'Last updated: ' : 'Laatst bijgewerkt: '}{new Date().toLocaleDateString(isEn ? 'en-US' : 'nl-NL', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </header>
  );
};

export default PrivacyHero;