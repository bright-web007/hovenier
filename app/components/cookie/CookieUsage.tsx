import styles from '../../styles/Cookie.module.css';

export default function CookieUsage() {
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>3. Waarom gebruiken wij cookies?</h2>
      <p className={styles.legalText}>
        Hovenier.frl gebruikt cookies voor verschillende doeleinden om u de best mogelijke 
        en meest relevante ervaring op onze website te bieden. Onze cookies dienen de volgende doelen:
      </p>
      <ul className={styles.legalList}>
        <li><strong>Essentiële functionaliteit:</strong> Voor het correct functioneren van de website en beveiligingsdoeleinden</li>
        <li><strong>Gebruikerservaring:</strong> Om uw voorkeuren en instellingen te onthouden voor toekomstige bezoeken</li>
        <li><strong>Website analyse:</strong> Om te begrijpen hoe bezoekers onze website gebruiken en deze te verbeteren</li>
        <li><strong>Gepersonaliseerde content:</strong> Om relevante content en aanbiedingen te tonen</li>
        <li><strong>Marketing doeleinden:</strong> Voor het tonen van relevante advertenties en het meten van campagne-effectiviteit</li>
        <li><strong>Sociale media integratie:</strong> Voor het mogelijk maken van functies zoals delen en inloggen via sociale media</li>
        <li><strong>Performance monitoring:</strong> Om de snelheid en prestaties van onze website te monitoren en optimaliseren</li>
      </ul>
      <p className={styles.legalText}>
        Wij gebruiken alleen cookies die noodzakelijk zijn voor onze dienstverlening of waarvoor 
        u uitdrukkelijke toestemming hebt gegeven, conform de geldende privacy- en cookiewetgeving.
      </p>
    </section>
  );
}