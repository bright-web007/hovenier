import styles from '../../styles/Privacy.module.css';

const PrivacyDataCollection = ({ locale = 'nl' }: { locale?: string }) => {
  const isEn = locale === 'en';
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '3. What data do we collect?' : '3. Welke gegevens verzamelen wij?'}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{isEn ? '3.1 Data you provide to us' : '3.1 Gegevens die u ons verstrekt'}</h3>
      <ul className={styles.legalList}>
        <li>{isEn ? 'Name and contact details (email, phone number)' : 'Naam en contactgegevens (e-mail, telefoonnummer)'}</li>
        <li>{isEn ? 'Municipality/place of residence' : 'Gemeente/woonplaats'}</li>
        <li>{isEn ? 'Desired services' : 'Gewenste diensten'}</li>
        <li>{isEn ? 'Any specifics about your request' : 'Eventuele bijzonderheden over uw aanvraag'}</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '3.2 Automatically collected data' : '3.2 Automatisch verzamelde gegevens'}</h3>
      <ul className={styles.legalList}>
        <li>{isEn ? 'IP address' : 'IP-adres'}</li>
        <li>{isEn ? 'Browser information' : 'Browser informatie'}</li>
        <li>{isEn ? 'Page visits and click behavior' : 'Paginabezoeken en klikgedrag'}</li>
        <li>{isEn ? 'Date and time of visit' : 'Datum en tijd van bezoek'}</li>
      </ul>
    </section>
  );
};

export default PrivacyDataCollection;