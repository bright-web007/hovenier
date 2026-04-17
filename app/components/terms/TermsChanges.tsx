import styles from '../../styles/Terms.module.css';

export default function TermsChanges({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '11. Changes' : '11. Wijzigingen'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'Hovenier.frl may amend these terms and conditions at any time. Changes will be announced on the website and take effect 30 days after publication.'
          : 'Hovenier.frl kan deze algemene voorwaarden te allen tijde wijzigen. Wijzigingen worden bekendgemaakt op de website en treden in werking 30 dagen na publicatie.'}
      </p>
      <p className={styles.legalText}>
        {isEn
          ? 'In case of significant changes, users will be notified via email (if applicable).'
          : 'Bij belangrijke wijzigingen zullen gebruikers hiervan op de hoogte worden gesteld via e-mail (indien van toepassing).'}
      </p>
    </section>
  );
}