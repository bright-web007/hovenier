import styles from '../../styles/Terms.module.css';

export default function TermsCosts({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '8. Costs and Payments' : '8. Kosten en Betalingen'}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{isEn ? '8.1 For Customers' : '8.1 Voor Klanten'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'The use of the platform is free of charge for customers. All costs for work performed are handled directly between the customer and the gardener.'
          : 'Het gebruik van het platform is voor klanten kosteloos. Alle kosten voor uitgevoerde werkzaamheden worden direct tussen klant en hovenier afgehandeld.'}
      </p>

      <h3 className={styles.legalSubsectionTitle}>{isEn ? '8.2 For Gardeners' : '8.2 Voor Hoveniers'}</h3>
      <p className={styles.legalText}>
        {isEn
          ? 'Gardeners do not pay any fees for participation on the platform. No commissions are charged on obtained assignments.'
          : 'Hoveniers betalen geen kosten voor deelname aan het platform. Er worden geen commissies gerekend over verkregen opdrachten.'}
      </p>
    </section>
  );
}