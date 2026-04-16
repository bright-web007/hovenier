import styles from '../../styles/Terms.module.css';

export default function TermsHero({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <header className={styles.legalHeader}>
      <div className="section-inner">
        <div className={styles.legalContent}>
          <h1 className={styles.legalTitle}>{isEn ? 'Terms and Conditions' : 'Algemene Voorwaarden'}</h1>
          <p className={styles.legalSubtitle}>
            {isEn
              ? 'Transparent terms for the use of Hovenier.frl and our services'
              : 'Transparante voorwaarden voor het gebruik van Hovenier.frl en onze dienstverlening'}
          </p>
          <p className={styles.legalSubtitle}>
            {isEn ? 'Last updated: ' : 'Laatst bijgewerkt: '}
            {new Date().toLocaleDateString(isEn ? 'en-US' : 'nl-NL', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </header>
  );
}