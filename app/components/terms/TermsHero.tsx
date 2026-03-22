import styles from '../../styles/Terms.module.css';

export default function TermsHero() {
  return (
    <header className={styles.legalHeader}>
      <div className="section-inner">
        <div className={styles.legalContent}>
          <h1 className={styles.legalTitle}>Algemene Voorwaarden</h1>
          <p className={styles.legalSubtitle}>
            Transparante voorwaarden voor het gebruik van Hovenier.frl en onze dienstverlening
          </p>
          <p className={styles.legalSubtitle}>
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { 
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