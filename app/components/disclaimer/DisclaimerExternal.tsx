import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerExternal() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>5. Externe Links en Diensten</h2>

      <h3 className={styles.legalSubsectionTitle}>5.1 External Websites</h3>
      <p className={styles.legalText}>
        Onze website kan links bevatten naar externe websites van hoveniers, leveranciers 
        of andere partijen. Deze links worden verstrekt voor uw gemak, maar wij zijn niet 
        verantwoordelijk voor de inhoud of diensten van deze externe websites.
      </p>
      
      <ul className={styles.legalList}>
        <li>Wij controleren externe websites niet op nauwkeurigheid</li>
        <li>Externe websites hebben hun eigen privacybeleid en voorwaarden</li>
        <li>Wij zijn niet aansprakelijk voor schade door externe websites</li>
        <li>Links naar externe websites betekenen geen endorsement</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>5.2 Derde Partij Diensten</h3>
      <p className={styles.legalText}>
        Wij maken gebruik van verschillende derde partij diensten voor analytische doeleinden, 
        betalingsverwerking en communicatie. Deze diensten hebben hun eigen voorwaarden 
        en privacybeleid.
      </p>
      
      <p className={styles.legalText}>
        Voor meer informatie over hoe wij omgaan met uw gegevens en welke derde partijen 
        wij gebruiken, raadpleeg ons privacybeleid.
      </p>
    </section>
  );
}