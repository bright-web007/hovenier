import styles from '../../styles/Terms.module.css';
import { createTranslator } from '@/i18n';

export default function TermsContact({ locale = 'nl' }: { locale?: string }) {
  const t = createTranslator(locale);

  return (
    <section className={styles.legalSection}>
      <div className={styles.contactHighlight}>
        <h3>13. Contact</h3>
        <p>
          {t('terms_extra.contact_question_text')}
        </p>
        
        <address>
          <strong>Hovenier.frl</strong><br />
          {t('terms_extra.contact_email_label')}: <a href="mailto:info@hovenier.frl">info@hovenier.frl</a><br />
          Website: <a href="https://hovenier.frl">https://hovenier.frl</a>
        </address>
        
        <p>
          {t('terms_extra.contact_response_text')}
        </p>
      </div>
    </section>
  );
}