import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerLimitations() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>2. Beperkingen van Aansprakelijkheid</h2>
      
      <div className={styles.disclaimerTypes}>
        <div className={styles.disclaimerCard}>
          <h3 className={styles.disclaimerCardTitle}>🚫 Geen Garanties</h3>
          <p className={styles.disclaimerCardText}>
            Wij bieden geen garanties op resultaten of tevredenheid
          </p>
        </div>
        
        <div className={styles.disclaimerCard}>
          <h3 className={styles.disclaimerCardTitle}>⚡ Geen Aansprakelijkheid</h3>
          <p className={styles.disclaimerCardText}>
            Beperkte aansprakelijkheid voor schade of tekortkomingen
          </p>
        </div>
        
        <div className={styles.disclaimerCard}>
          <h3 className={styles.disclaimerCardTitle}>🔍 Eigen Onderzoek</h3>
          <p className={styles.disclaimerCardText}>
            Klanten zijn zelf verantwoordelijk voor due diligence
          </p>
        </div>
      </div>

      <div className={styles.limitationGrid}>
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            💼 Dienstverlening
          </h3>
          <p className={styles.limitationDescription}>
            Hovenier.frl is niet verantwoordelijk voor de kwaliteit, tijdigheid, kosten 
            of resultaten van diensten geleverd door aangesloten hoveniers.
          </p>
        </div>
        
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            🔧 Technische Problemen
          </h3>
          <p className={styles.limitationDescription}>
            Wij zijn niet aansprakelijk voor technische storingen, uitval van de website 
            of verlies van gegevens.
          </p>
        </div>
        
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            💰 Financiële Schade
          </h3>
          <p className={styles.limitationDescription}>
            Geen aansprakelijkheid voor directe of indirecte financiële schade als gevolg 
            van het gebruik van ons platform.
          </p>
        </div>
        
        <div className={styles.limitationCard}>
          <h3 className={styles.limitationTitle}>
            🔗 Externe Links
          </h3>
          <p className={styles.limitationDescription}>
            Wij zijn niet verantwoordelijk voor de inhoud van externe websites 
            waarnaar wij linken.
          </p>
        </div>
      </div>
    </section>
  );
}