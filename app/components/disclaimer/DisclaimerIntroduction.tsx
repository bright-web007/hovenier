import styles from '../../styles/Disclaimer.module.css';

export default function DisclaimerIntroduction() {
  return (
    <section className={styles.legalSection}>
      <p className={styles.legalText}>
        Deze aansprakelijkheidsverklaring bevat belangrijke informatie over het gebruik van Hovenier.frl. 
        Door gebruik te maken van onze website en diensten, erkent u kennis te hebben 
        genomen van deze verklaring en de daarin beschreven beperkingen.
      </p>
      <p className={styles.legalText}>
        Hovenier.frl is een bemiddelingsplatform dat klanten verbindt met professionele hoveniers. 
        Wij zijn geen leverancier van tuindiensten maar faciliteren de verbinding tussen 
        vraag en aanbod in de tuinbranche.
      </p>
    </section>
  );
}