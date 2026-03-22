import styles from '../../styles/Cookie.module.css';

export default function CookieManagement() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>5. Cookies beheren en verwijderen</h2>
      <p className={styles.legalText}>
        U heeft verschillende opties om uw cookievoorkeuren te beheren. U kunt te allen tijde 
        uw toestemming voor niet-noodzakelijke cookies intrekken of wijzigen.
      </p>

      <h3 className={styles.legalSubsectionTitle}>5.1 Via ons Cookie Centrum</h3>
      <p className={styles.legalText}>
        De eenvoudigste manier om uw cookievoorkeuren te wijzigen is via ons Cookie Centrum. 
        Dit centrum kunt u bereiken via:
      </p>
      <ul className={styles.legalList}>
        <li>De cookie banner die verschijnt bij uw eerste bezoek</li>
        <li>De link "Cookie Instellingen" in de footer van elke pagina</li>
        <li>Door contact met ons op te nemen via <a href="mailto:privacy@hovenier.frl" className={styles.legalLink}>privacy@hovenier.frl</a></li>
      </ul>
      <p className={styles.legalText}>
        In het Cookie Centrum kunt u per categorie aangeven of u deze cookies wilt accepteren 
        of weigeren. Noodzakelijke cookies kunnen niet worden uitgeschakeld.
      </p>

      <h3 className={styles.legalSubsectionTitle}>5.2 Via uw webbrowser</h3>
      <p className={styles.legalText}>
        U kunt cookies ook rechtstreeks beheren via de instellingen van uw webbrowser. 
        Elke browser heeft zijn eigen methode voor cookiebeheer:
      </p>
      <ul className={styles.legalList}>
        <li><a href="https://support.google.com/chrome/answer/95647" className={styles.legalLink} target="_blank" rel="noopener noreferrer">Google Chrome</a> - Cookies beheren in Chrome</li>
        <li><a href="https://support.mozilla.org/nl/kb/cookies-informatie-websites" className={styles.legalLink} target="_blank" rel="noopener noreferrer">Mozilla Firefox</a> - Firefox privacy en beveiligingsinstellingen</li>
        <li><a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-in-microsoft-edge-verwijderen" className={styles.legalLink} target="_blank" rel="noopener noreferrer">Microsoft Edge</a> - Edge cookiebeheer</li>
        <li><a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" className={styles.legalLink} target="_blank" rel="noopener noreferrer">Safari</a> - Safari privacy instellingen</li>
      </ul>
      <p className={styles.legalText}>
        Let op: het blokkeren van cookies via uw browser blokkeert alle cookies voor alle websites, 
        niet alleen voor Hovenier.frl.
      </p>

      <h3 className={styles.legalSubsectionTitle}>5.3 Derde partij opt-out tools</h3>
      <p className={styles.legalText}>
        Voor sommige derde partij cookies kunt u gebruik maken van specifieke opt-out tools:
      </p>
      <ul className={styles.legalList}>
        <li><a href="https://tools.google.com/dlpage/gaoptout" className={styles.legalLink} target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
        <li><a href="https://www.facebook.com/ads/preferences" className={styles.legalLink} target="_blank" rel="noopener noreferrer">Facebook Advertentievoorkeuren</a></li>
        <li><a href="https://optout.aboutads.info" className={styles.legalLink} target="_blank" rel="noopener noreferrer">Digital Advertising Alliance Opt-out Page</a></li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>5.4 Gevolgen van het uitschakelen van cookies</h3>
      <p className={styles.legalText}>
        Het uitschakelen van bepaalde cookies kan invloed hebben op uw ervaring op onze website:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Noodzakelijke cookies:</strong> Kunnen niet worden uitgeschakeld zonder verlies van basisfunctionaliteit</li>
        <li><strong>Functionele cookies:</strong> Uw voorkeuren worden niet onthouden (taal, regio, etc.)</li>
        <li><strong>Analytische cookies:</strong> Wij kunnen de website minder goed optimaliseren voor gebruikers</li>
        <li><strong>Marketing cookies:</strong> Advertenties kunnen minder relevant zijn voor uw interesses</li>
      </ul>
      <p className={styles.legalText}>
        Ook na het uitschakelen van cookies blijft de basisfunctionaliteit van onze website 
        gewoon beschikbaar. U kunt nog steeds hoveniers zoeken, contact opnemen en offertes aanvragen.
      </p>

      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>Belangrijk:</strong> Wanneer u cookies verwijdert uit uw browser, 
          worden ook uw cookievoorkeuren gewist. Bij een volgend bezoek zult u 
          opnieuw gevraagd worden om uw voorkeuren in te stellen.
        </p>
      </div>
    </section>
  );
}