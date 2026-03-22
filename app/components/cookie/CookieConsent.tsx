import styles from '../../styles/Cookie.module.css';

export default function CookieConsent() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>6. Toestemming en rechtsgrondslagen</h2>
      <p className={styles.legalText}>
        Het plaatsen van cookies op uw apparaat vereist onder de AVG (Algemene Verordening 
        Gegevensbescherming) en de Nederlandse telecommunicatiewet een geldige rechtsgrondslag. 
        Wij hanteren verschillende rechtsgrondslagen afhankelijk van het type cookie.
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>6.1 Rechtsgrondslagen per cookiecategorie</h3>
      <ul className={styles.legalList}>
        <li><strong>Noodzakelijke cookies:</strong> Gerechtvaardigd belang - essentieel voor de werking van de website</li>
        <li><strong>Functionele cookies:</strong> Toestemming - u geeft hiervoor expliciete toestemming</li>
        <li><strong>Analytische cookies:</strong> Toestemming - alleen geplaatst na uw uitdrukkelijke instemming</li>
        <li><strong>Marketing cookies:</strong> Toestemming - vereist uw actieve en specifieke toestemming</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>6.2 Toestemming geven en intrekken</h3>
      <p className={styles.legalText}>
        Bij uw eerste bezoek aan onze website krijgt u een cookiebanner te zien waarin u 
        kunt kiezen welke cookiecategorieën u wilt accepteren. Uw toestemming is:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Vrijwillig:</strong> U kunt onze website gebruiken zonder marketing cookies</li>
        <li><strong>Specifiek:</strong> U kunt per categorie kiezen wat u wel/niet accepteert</li>
        <li><strong>Geïnformeerd:</strong> Dit beleid legt uit wat elke cookie doet</li>
        <li><strong>Herroepbaar:</strong> U kunt uw toestemming te allen tijde intrekken</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>6.3 Geldigheidsduur van toestemming</h3>
      <p className={styles.legalText}>
        Uw cookietoestemming is geldig voor een periode van 12 maanden. Na afloop van deze 
        periode vragen wij u opnieuw om toestemming. U ontvangt dan weer de cookiebanner 
        om uw voorkeuren opnieuw in te stellen.
      </p>
      <p className={styles.legalText}>
        Tussentijds kunt u uw toestemming altijd wijzigen of intrekken via de 
        "Cookie Instellingen" link in de footer van elke pagina, of door contact met 
        ons op te nemen.
      </p>
      
      <div className={styles.legalContact}>
        <p>
          <strong>Toestemming intrekken?</strong><br />
          E-mail: <a href="mailto:privacy@hovenier.frl" className={styles.legalLink}>privacy@hovenier.frl</a><br />
          Of gebruik de cookie-instellingen onderaan deze pagina.
        </p>
      </div>
    </section>
  );
}