import styles from '../../styles/Cookie.module.css';

export default function CookieIntroduction() {
  return (
    <section className={styles.legalSection}>
      <p className={styles.privacyIntroText}>
        Bij Hovenier.frl respecteren wij uw privacy en willen wij transparant zijn over ons gebruik van cookies en vergelijkbare technologieën.
      </p>
      <p className={styles.legalText}>
        Dit cookiebeleid legt uit welke cookies wij gebruiken, waarom wij deze gebruiken, 
        en hoe u uw cookievoorkeuren kunt beheren. Door onze website te gebruiken, 
        gaat u akkoord met het gebruik van cookies zoals beschreven in dit beleid.
      </p>
    </section>
  );
}