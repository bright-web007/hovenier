import styles from '../../styles/Terms.module.css';

export default function TermsLiability({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '7. Liability' : '7. Aansprakelijkheid'}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{isEn ? '7.1 Limited liability' : '7.1 Beperkte aansprakelijkheid'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Hovenier.frl is only liable for direct damage that is demonstrably and exclusively the result of an attributable failure in the performance of the agreement.'
          : 'Hovenier.frl is uitsluitend aansprakelijk voor directe schade die aantoonbaar en uitsluitend het gevolg is van een toerekenbare tekortkoming in de nakoming van de overeenkomst.'}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '7.2 Excluded liability' : '7.2 Uitgesloten aansprakelijkheid'}</h3>
      <p className={styles.legalText}>
        {isEn ? 'Hovenier.frl is not liable for:' : 'Hovenier.frl is niet aansprakelijk voor:'}
      </p>
      <ul className={styles.list}>
        <li>{isEn ? 'The quality of services provided by affiliated gardeners' : 'De kwaliteit van diensten geleverd door aangesloten hoveniers'}</li>
        <li>{isEn ? 'Indirect damage, consequential damage, or business losses' : 'Indirecte schade, gevolgschade of bedrijfsschade'}</li>
        <li>{isEn ? 'Damage from offered quotes or performed work' : 'Schade door aangeboden offertes of uitgevoerde werkzaamheden'}</li>
        <li>{isEn ? 'Technical malfunctions or downtime of the platform' : 'Technische storingen of uitval van het platform'}</li>
      </ul>
    </section>
  );
}