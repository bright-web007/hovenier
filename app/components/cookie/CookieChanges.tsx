import styles from '../../styles/Cookie.module.css';

export default function CookieChanges() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>8. Wijzigingen in dit cookiebeleid</h2>
      <p className={styles.legalText}>
        Wij behouden ons het recht voor om dit cookiebeleid van tijd tot tijd bij te werken 
        om wijzigingen in ons gebruik van cookies, technologische ontwikkelingen, of 
        wijzigingen in de wet- en regelgeving te reflecteren.
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>8.1 Kennisgeving van wijzigingen</h3>
      <p className={styles.legalText}>
        Bij belangrijke wijzigingen in dit cookiebeleid zullen wij u daarvan op de hoogte 
        stellen via:
      </p>
      <ul className={styles.legalList}>
        <li>Een kennisgeving op onze website (banner of pop-up)</li>
        <li>Een update van de "laatst bijgewerkt" datum bovenaan dit beleid</li>
        <li>Een e-mail naar geregistreerde gebruikers (indien van toepassing)</li>
        <li>Via onze sociale media kanalen voor significante wijzigingen</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>8.2 Nieuwe toestemming</h3>
      <p className={styles.legalText}>
        Wanneer wij nieuwe soorten cookies introduceren die uw toestemming vereisen, 
        zullen wij u daar expliciet om vragen via onze cookiebanner of een aparte 
        toestemmingsprompt.
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>8.3 Regelmatige controle</h3>
      <p className={styles.legalText}>
        Wij controleren dit cookiebeleid minstens jaarlijks om ervoor te zorgen dat 
        het accuraat en up-to-date blijft. De laatste herzieningsdatum staat vermeld 
        bovenaan dit document.
      </p>
      
      <p className={styles.legalText}>
        Wij adviseren u om dit cookiebeleid regelmatig te raadplegen om op de hoogte 
        te blijven van eventuele wijzigingen. Uw voortgezette gebruik van onze website 
        na publicatie van wijzigingen betekent dat u akkoord gaat met het bijgewerkte beleid.
      </p>
      
      <div className={styles.legalContact}>
        <p>
          <strong>Vragen over wijzigingen?</strong><br />
          Neem contact met ons op via <a href="mailto:privacy@hovenier.frl" className={styles.legalLink}>privacy@hovenier.frl</a> 
          als u vragen heeft over wijzigingen in dit cookiebeleid.
        </p>
      </div>
    </section>
  );
}