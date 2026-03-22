import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerInformation() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>3. Informatie en Content</h2>
      
      <h3 className={styles.legalSubsectionTitle}>3.1 Nauwkeurigheid van Informatie</h3>
      <p className={styles.legalText}>
        Wij streven ernaar de informatie op onze website zo accuraat en actueel mogelijk te houden. 
        Echter, wij kunnen niet garanderen dat alle informatie te allen tijde juist, volledig 
        of up-to-date is.
      </p>
      
      <ul className={styles.legalList}>
        <li>Prijzen kunnen zonder voorafgaande kennisgeving wijzigen</li>
        <li>Beschikbaarheid van hoveniers kan variëren</li>
        <li>Servicegebieden kunnen wijzigen per hovenier</li>
        <li>Certificeringen en kwalificaties worden door derden verstrekt</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>3.2 Content van Derden</h3>
      <p className={styles.legalText}>
        Veel informatie op ons platform wordt aangeleverd door aangesloten hoveniers en andere derden. 
        Wij controleren deze informatie niet volledig en zijn niet verantwoordelijk voor:
      </p>
      
      <ul className={styles.legalList}>
        <li>Onjuiste of misleidende bedrijfsinformatie</li>
        <li>Verouderde prijzen of serviceaanbiedingen</li>
        <li>Onjuiste contactgegevens of beschikbaarheid</li>
        <li>Claims over kwalificaties of ervaring</li>
      </ul>
    </section>
  );
}