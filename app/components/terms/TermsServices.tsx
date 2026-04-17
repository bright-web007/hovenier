import styles from '../../styles/Terms.module.css';

export default function TermsServices({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '3. Our Services' : '3. Onze Diensten'}</h2>
      
      <div className={styles.serviceFeatures}>
        <div className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>{isEn ? '🌐 Platform services' : '🌐 Platform diensten'}</h3>
          <p className={styles.serviceDescription}>
            {isEn
              ? 'Online platform for connecting customers and gardeners'
              : 'Online platform voor het verbinden van klanten en hoveniers'}
          </p>
        </div>
        <div className={styles.serviceCard}>
          <h3 className={styles.serviceTitle}>{isEn ? '🤝 Facilitation' : '🤝 Facilitatie'}</h3>
          <p className={styles.serviceDescription}>
            {isEn
              ? 'We facilitate contact but are not a contracting party'
              : 'Wij faciliteren contact maar zijn geen contractspartij'}
          </p>
        </div>
      </div>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '3.1 Platform services' : '3.1 Platformdiensten'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Hovenier.frl offers an online platform where customers can find gardeners and get in touch for quotes and services. We facilitate the connection between customers and service providers.'
          : 'Hovenier.frl biedt een online platform waar klanten hoveniers kunnen vinden en contact kunnen opnemen voor offertes en dienstverlening. Wij faciliteren de verbinding tussen klanten en dienstverleners.'}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '3.2 No contracting party' : '3.2 Geen contractspartij'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Hovenier.frl is not a party to the agreements between customers and gardeners. All arrangements, prices, and conditions are agreed upon directly between the customer and gardener.'
          : 'Hovenier.frl is geen partij bij de overeenkomsten tussen klanten en hoveniers. Alle afspraken, prijzen, en voorwaarden worden direct tussen klant en hovenier overeengekomen.'}
      </p>
    </section>
  );
}