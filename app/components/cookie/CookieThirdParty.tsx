import styles from '../../styles/Cookie.module.css';

export default function CookieThirdParty() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>7. Derde partij cookies en diensten</h2>
      <p className={styles.legalText}>
        Onze website maakt gebruik van verschillende externe diensten die hun eigen cookies 
        kunnen plaatsen. Deze "derde partij cookies" worden geregeerd door de privacybeleiden 
        van de respectievelijke dienstverleners.
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>7.1 Google diensten</h3>
      <p className={styles.legalText}>
        Wij maken gebruik van verschillende Google diensten:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Google Analytics:</strong> Voor websiteverkeer analyse en gebruikersgedrag inzichten</li>
        <li><strong>Google Ads:</strong> Voor advertentiecampagnes en conversietracking</li>
        <li><strong>Google Maps:</strong> Voor locatiediensten en routekaarten naar hoveniers</li>
        <li><strong>reCAPTCHA:</strong> Voor spam- en botbescherming op onze contactformulieren</li>
      </ul>
      <p className={styles.legalText}>
        Google's Privacy Beleid: <a href="https://policies.google.com/privacy" className={styles.legalLink} target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>7.2 Social Media platformen</h3>
      <p className={styles.legalText}>
        Onze website bevat knoppen en widgets van sociale media platformen:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Facebook/Meta:</strong> Voor het delen van content en Facebook Pixel tracking</li>
        <li><strong>Instagram:</strong> Voor het tonen van onze Instagram posts</li>
        <li><strong>LinkedIn:</strong> Voor zakelijke netwerk functionaliteiten</li>
        <li><strong>WhatsApp:</strong> Voor directe communicatie mogelijkheden</li>
      </ul>
      <p className={styles.legalText}>
        Deze diensten kunnen informatie over uw bezoek verzamelen, ook als u niet ingelogd 
        bent bij hun dienst. Raadpleeg hun privacybeleiden voor meer informatie.
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>7.3 Beveiligings- en performance diensten</h3>
      <p className={styles.legalText}>
        Voor de beveiliging en optimalisatie van onze website gebruiken wij:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Cloudflare:</strong> Voor DDoS bescherming, CDN diensten en website performance</li>
        <li><strong>Sentry:</strong> Voor error monitoring en performance tracking</li>
      </ul>
      
      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>Belangrijk:</strong> Elke derde partij heeft zijn eigen privacybeleid 
          en cookiebeleid. Wij raden u aan deze door te lezen om te begrijpen hoe 
          uw gegevens door deze partijen worden gebruikt.
        </p>
      </div>
    </section>
  );
}