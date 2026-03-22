import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerHero() {
  return (
    <header className={styles.legalHeader}>
      <div className="section-inner">
        <div className={styles.legalContent}>
          <h1 className={styles.legalTitle}>Aansprakelijkheid</h1>
          <p className={styles.legalSubtitle}>
            Belangrijke informatie over onze aansprakelijkheid en de voorwaarden voor het gebruik van Hovenier.frl
          </p>
          <p className={styles.legalSubtitle}>
            Laatst bijgewerkt: 22 maart 2026
          </p>
        </div>
      </div>
    </header>
  );
}