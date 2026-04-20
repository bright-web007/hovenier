'use client'

import styles from './Contact.module.css'
import { createTranslator } from '@/i18n'

interface ContactFormProps {
  locale: string
}

export default function ContactForm({ locale }: ContactFormProps) {
  const isEn = locale === 'en';
  const t = createTranslator(locale);

  return (
    <div className={styles.form}>
      <div className="form-eyebrow">{t('contact_page.form_eyebrow')}</div>
      <h2 className="form-title">
        {t('contact_page.form_title')}
      </h2>
      <p className="form-sub">
        {t('contact_page.form_subtitle')}
      </p>
      <form>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="firstName" className="form-label">
              {t('contact_page.first_name')}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="lastName" className="form-label">
              {t('contact_page.last_name')}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="subject" className="form-label">
            {t('contact_page.subject_label')}
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="form-select"
          >
            <option value="">{t('contact_page.subject_placeholder')}</option>
            <option value="general">{t('contact_page.subject_general')}</option>
            <option value="partnership">{t('contact_page.subject_partnership')}</option>
            <option value="press">{t('contact_page.subject_press')}</option>
            <option value="technical">{t('contact_page.subject_technical')}</option>
            <option value="feedback">{t('contact_page.subject_feedback')}</option>
            <option value="other">{t('contact_page.subject_other')}</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="message" className="form-label">
            {t('contact_page.message_label')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="form-input"
            placeholder={t('contact_page.message_placeholder')}
          ></textarea>
        </div>

        <button
          type="submit"
          className="form-btn"
        >
          {t('contact_page.send_button')}
        </button>
      </form>

      <p className="form-note">
        {isEn
          ? '* Required fields. We respect your privacy - see our '
          : '* Verplichte velden. We respecteren je privacy - zie ons '}
        <a href={isEn ? '/en/privacy-beleid' : '/privacy-beleid'}>
          {t('contact_page.privacy_link')}
        </a>.
      </p>
    </div>
  )
}