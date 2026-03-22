import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerGeneral() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>1. Algemene Disclaimer</h2>
      
      <div className={styles.warningBox}>
        <h3 className={styles.warningTitle}>
          ⚠️ Belangrijke Kennisgeving
        </h3>
        <p className={styles.warningText}>
          De informatie op deze website wordt verstrekt "zoals deze er staat" zonder enige garantie 
          omtrent de juistheid, volledigheid of geschiktheid voor specifieke doeleinden.
        </p>
      </div>

      <p className={styles.legalText}>
        Hovenier.frl fungeert als bemiddelingsplatform tussen klanten en hoveniers. Wij verlenen 
        zelf geen tuindiensten en zijn niet verantwoordelijk voor de kwaliteit, uitvoering 
        of resultaten van diensten geleverd door aangesloten hoveniers.
      </p>
      
      <p className={styles.legalText}>
        Alle informatie op deze website, inclusief prijzen, beschrijvingen en contactgegevens 
        van hoveniers, wordt door derden verstrekt. Wij kunnen niet garanderen dat deze 
        informatie te allen tijde juist, volledig of actueel is.
      </p>
    </section>
  );
}