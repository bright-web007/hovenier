import styles from '../../styles/Privacy.module.css';

const PrivacyDataCollection = () => {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>3. Welke gegevens verzamelen wij?</h2>
      
      <h3 className={styles.legalSubsectionTitle}>3.1 Gegevens die u ons verstrekt</h3>
      <ul className={styles.legalList}>
        <li>Naam en contactgegevens (e-mail, telefoonnummer)</li>
        <li>Gemeente/woonplaats</li>
        <li>Gewenste diensten</li>
        <li>Eventuele bijzonderheden over uw aanvraag</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>3.2 Automatisch verzamelde gegevens</h3>
      <ul className={styles.legalList}>
        <li>IP-adres</li>
        <li>Browser informatie</li>
        <li>Paginabezoeken en klikgedrag</li>
        <li>Datum en tijd van bezoek</li>
      </ul>
    </section>
  );
};

export default PrivacyDataCollection;