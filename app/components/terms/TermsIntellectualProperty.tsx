import styles from '../../styles/Terms.module.css';

export default function TermsIntellectualProperty({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{isEn ? '6. Intellectual Property' : '6. Intellectueel Eigendom'}</h2>
      <p className={styles.legalText}>
        {isEn
          ? 'All content on the platform, including texts, images, logos, and software, is the property of Hovenier.frl or its licensors. It is not permitted to copy or distribute content without permission.'
          : 'Alle content op het platform, inclusief teksten, afbeeldingen, logo\'s en software, is eigendom van Hovenier.frl of haar licentiegevers. Het is niet toegestaan content te kopiëren of te distribueren zonder toestemming.'}
      </p>
    </section>
  );
}