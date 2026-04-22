'use client'

import styles from './Contact.module.css'
import { createTranslator } from '@/i18n'
import { localizePath, type SupportedLocale } from '@/lib/locale-utils'

interface ContactFAQProps {
  locale: string
}

export default function ContactFAQ({ locale }: ContactFAQProps) {
  const t = createTranslator(locale);

  return (
    <div className={styles.faqCard}>
      <h3 className={styles.contactCardTitle}>
        {t('contact_page.faq_title')}
      </h3>
      <div className={styles.faqItems}>
        <div className={styles.faqItem}>
          <h4>{t('contact_page.faq_homeowners_title')}</h4>
          <p>{t('contact_page.faq_homeowners_question')}</p>
          <a href={localizePath('/over-ons', locale as SupportedLocale)}>{t('contact_page.faq_homeowners_link')}</a>
        </div>
        <div className={styles.faqItem}>
          <h4>{t('contact_page.faq_gardeners_title')}</h4>
          <p>{t('contact_page.faq_gardeners_question')}</p>
          <a href={localizePath('/samenwerking', locale as SupportedLocale)}>{t('contact_page.faq_gardeners_link')}</a>
        </div>
        <div className={styles.faqItem}>
          <h4>{t('contact_page.faq_costs_title')}</h4>
          <p>{t('contact_page.faq_costs_question')}</p>
          <a href={localizePath('/kosten', locale as SupportedLocale)}>{t('contact_page.faq_costs_link')}</a>
        </div>
      </div>
    </div>
  )
}