import styles from '../../styles/Cookie.module.css';

export default function CookieSecurity() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>9. Beveiliging van uw gegevens</h2>
      <p className={styles.legalText}>
        Wij nemen de beveiliging van uw persoonlijke gegevens en cookie-informatie 
        zeer serieus. Wij implementeren passende technische en organisatorische 
        maatregelen om uw gegevens te beschermen.
      </p>
      
      <h3 className={styles.legalSubsectionTitle}>9.1 Technische beveiligingsmaatregelen</h3>
      <ul className={styles.legalList}>
        <li><strong>Encryptie:</strong> Alle gegevens worden beveiligd met SSL/TLS encryptie tijdens overdracht</li>
        <li><strong>Toegangscontrole:</strong> Beperkte toegang tot systemen op basis van functievereisten</li>
        <li><strong>Firewalls & Monitoring:</strong> 24/7 monitoring van onze systemen en netwerken</li>
        <li><strong>Regelmatige Updates:</strong> Systemen worden regelmatig bijgewerkt met beveiligingspatches</li>
        <li><strong>Backup & Recovery:</strong> Regelmatige back-ups met beveiligde opslag</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>9.2 Organisatorische maatregelen</h3>
      <ul className={styles.legalList}>
        <li><strong>Privacy Training:</strong> Alle medewerkers ontvangen training over gegevensbescherming</li>
        <li><strong>Toegangsbeheer:</strong> Strikte procedures voor toegang tot persoonlijke gegevens</li>
        <li><strong>Incident Response:</strong> Procedures voor het afhandelen van datalekken</li>
        <li><strong>Audit & Controle:</strong> Regelmatige controles van onze beveiligingsprocedures</li>
      </ul>
      
      <h3 className={styles.legalSubsectionTitle}>9.3 Cookie-specifieke beveiliging</h3>
      <p className={styles.legalText}>
        Voor cookies implementeren wij specifieke beveiligingsmaatregelen:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Secure flag:</strong> Cookies worden alleen verzonden via beveiligde HTTPS-verbindingen</li>
        <li><strong>HttpOnly flag:</strong> Functionele cookies zijn beschermd tegen client-side scripts</li>
        <li><strong>SameSite:</strong> Beveiliging tegen CSRF-aanvallen via SameSite cookie attributen</li>
        <li><strong>Minimale gegevens:</strong> Wij verzamelen alleen de minimaal noodzakelijke informatie</li>
        <li><strong>Retentiebeleid:</strong> Cookies worden automatisch verwijderd na de vastgestelde periode</li>
      </ul>
      
      <div className={styles.warningBox}>
        <p className={styles.warningText}>
          <strong>Datalek melding:</strong> In het onwaarschijnlijke geval van een datalek 
          dat uw persoonlijke gegevens betreft, zullen wij u binnen 72 uur informeren 
          conform de AVG-vereisten.
        </p>
      </div>
      
      <h3 className={styles.legalSubsectionTitle}>9.4 Uw rol in beveiliging</h3>
      <p className={styles.legalText}>
        U kunt ook bijdragen aan de beveiliging van uw gegevens door:
      </p>
      <ul className={styles.legalList}>
        <li>Een actuele browser te gebruiken met de nieuwste beveiligingsupdates</li>
        <li>Uw browserinstellingen te configureren voor optimale privacy</li>
        <li>Verdachte activiteiten op uw account te melden</li>
        <li>Uw login gegevens (indien van toepassing) veilig te bewaren</li>
      </ul>
    </section>
  );
}