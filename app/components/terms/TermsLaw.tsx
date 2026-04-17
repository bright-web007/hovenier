import styles from '../../styles/Terms.module.css';

export default function TermsLaw({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '12. Applicable Law' : '12. Toepasselijk Recht'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'These terms and conditions and all agreements with Hovenier.frl are governed by Dutch law. Disputes will be submitted to the competent court in the Netherlands.'
          : 'Op deze algemene voorwaarden en alle overeenkomsten met Hovenier.frl is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.'}
      </p>
      <p className={styles.legalText}>
        {isEn
          ? 'These terms have been drawn up in Dutch. In case of differences between translations, the Dutch text shall prevail.'
          : 'Deze voorwaarden zijn opgesteld in het Nederlands. Bij verschillen tussen vertalingen prevaleert de Nederlandse tekst.'}
      </p>
    </section>
  );
}