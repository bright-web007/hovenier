import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsDefinitions({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('terms_extra.definitions_title')}</h2>
      <ul className={styles.legalList}>
        <li><strong>Hovenier.frl:</strong> {t('terms_extra.definitions_platform_desc')}</li>
        <li><strong>{t('terms_extra.definitions_user_label')}:</strong> {t('terms_extra.definitions_user_desc')}</li>
        <li><strong>{t('terms_extra.definitions_provider_label')}:</strong> {t('terms_extra.definitions_provider_desc')}</li>
        <li><strong>{t('terms_extra.definitions_platform_label')}:</strong> {t('terms_extra.definitions_platform_value')}</li>
      </ul>
    </section>
  );
}