import styles from '../../styles/Privacy.module.css';
import { createTranslator } from '@/i18n';

const PrivacyDataCollection = ({ locale = 'nl' }: { locale?: string }) => {
  const t = createTranslator(locale);
  return (
    <section className={styles.legalSection}>
      <h2 className={styles.legalSectionTitle}>{t('privacy_page_extra.data_collection_title')}</h2>
      
      <h3 className={styles.legalSubsectionTitle}>{t('privacy_page_extra.data_collection_provided_title')}</h3>
      <ul className={styles.legalList}>
        <li>{t('privacy_page_extra.data_collection_provided_1')}</li>
        <li>{t('privacy_page_extra.data_collection_provided_2')}</li>
        <li>{t('privacy_page_extra.data_collection_provided_3')}</li>
        <li>{t('privacy_page_extra.data_collection_provided_4')}</li>
      </ul>

      <h3 className={styles.legalSubsectionTitle}>{t('privacy_page_extra.data_collection_auto_title')}</h3>
      <ul className={styles.legalList}>
        <li>{t('privacy_page_extra.data_collection_auto_1')}</li>
        <li>{t('privacy_page_extra.data_collection_auto_2')}</li>
        <li>{t('privacy_page_extra.data_collection_auto_3')}</li>
        <li>{t('privacy_page_extra.data_collection_auto_4')}</li>
      </ul>
    </section>
  );
};

export default PrivacyDataCollection;