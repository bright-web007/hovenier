import styles from '../../styles/Terms.module.css';

export default function TermsServices() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>3. Onze Diensten</h2>
      
      <div className={styles.serviceFeatures}>
        <div className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>🌐 Platform diensten</h3>
          <p className={styles.serviceDescription}>
            Online platform voor het verbinden van klanten en hoveniers
          </p>
        </div>
        <div className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>🤝 Facilitatie</h3>
          <p className={styles.serviceDescription}>
            Wij faciliteren contact maar zijn geen contractspartij
          </p>
        </div>
      </div>

      <h3 className={styles.legalSubsectionTitle}>3.1 Platformdiensten</h3>
      <p className={styles.legalText}>
        Hovenier.frl biedt een online platform waar klanten hoveniers kunnen vinden en contact kunnen opnemen 
        voor offertes en dienstverlening. Wij faciliteren de verbinding tussen klanten en dienstverleners.
      </p>

      <h3 className={styles.legalSubsectionTitle}>3.2 Geen contractspartij</h3>
      <p className={styles.legalText}>
        Hovenier.frl is geen partij bij de overeenkomsten tussen klanten en hoveniers. Alle afspraken, 
        prijzen, en voorwaarden worden direct tussen klant en hovenier overeengekomen.
      </p>
    </section>
  );
}