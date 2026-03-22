import styles from '../../styles/Cookie.module.css';

export default function CookieHero() {
  return (
    <header className={styles.legalHeader}>
      <div className="section-inner">
        <div className={styles.legalContent}>
          <h1 className={styles.legalTitle}>Cookiebeleid</h1>
          <p className={styles.legalSubtitle}>
            Transparante informatie over hoe wij cookies gebruiken om uw ervaring op Hovenier.frl te verbeteren
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