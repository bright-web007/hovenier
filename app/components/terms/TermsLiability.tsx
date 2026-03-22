import styles from '../../styles/Terms.module.css';

export default function TermsLiability() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>7. Aansprakelijkheid</h2>
      
      <h3 className={styles.legalSubsectionTitle}>7.1 Beperkte aansprakelijkheid</h3>
      <p className={styles.legalText}>
        Hovenier.frl is uitsluitend aansprakelijk voor directe schade die aantoonbaar en uitsluitend 
        het gevolg is van een toerekenbare tekortkoming in de nakoming van de overeenkomst.
      </p>

      <h3 className={styles.legalSubsectionTitle}>7.2 Uitgesloten aansprakelijkheid</h3>
      <p className={styles.legalText}>
        Hovenier.frl is niet aansprakelijk voor:
      </p>
      <ul className={styles.list}>
        <li>De kwaliteit van diensten geleverd door aangesloten hoveniers</li>
        <li>Indirecte schade, gevolgschade of bedrijfsschade</li>
        <li>Schade door aangeboden offertes of uitgevoerde werkzaamheden</li>
        <li>Technische storingen of uitval van het platform</li>
      </ul>
    </section>
  );
}