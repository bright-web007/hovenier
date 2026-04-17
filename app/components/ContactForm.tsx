'use client'

import styles from './Contact.module.css'

interface ContactFormProps {
  locale: string
}

export default function ContactForm({ locale }: ContactFormProps) {
  const isEn = locale === 'en';

  return (
    <div className={styles.form}>
      <div className="form-eyebrow">{isEn ? 'Free & no obligation' : 'Gratis & vrijblijvend'}</div>
      <h2 className="form-title">
        {isEn ? 'Send us a message' : 'Stuur ons een bericht'}
      </h2>
      <p className="form-sub">
        {isEn ? 'We will get back to you within 24 hours.' : 'We nemen binnen 24 uur contact met je op.'}
      </p>
      <form>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="firstName" className="form-label">
              {isEn ? 'First name *' : 'Voornaam *'}
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
              {isEn ? 'Last name *' : 'Achternaam *'}
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
            {isEn ? 'Subject *' : 'Onderwerp *'}
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="form-select"
          >
            <option value="">{isEn ? 'Select subject...' : 'Selecteer onderwerp...'}</option>
            <option value="general">{isEn ? 'General question' : 'Algemene vraag'}</option>
            <option value="partnership">{isEn ? 'Partnership/Collaboration' : 'Partnership/Samenwerking'}</option>
            <option value="press">{isEn ? 'Press' : 'Pers'}</option>
            <option value="technical">{isEn ? 'Technical support' : 'Technische ondersteuning'}</option>
            <option value="feedback">{isEn ? 'Feedback/Suggestion' : 'Feedback/Suggestie'}</option>
            <option value="other">{isEn ? 'Other' : 'Anders'}</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="message" className="form-label">
            {isEn ? 'Message *' : 'Bericht *'}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="form-input"
            placeholder={isEn ? 'Describe your question or comment...' : 'Beschrijf je vraag of opmerking...'}
          ></textarea>
        </div>

        <button
          type="submit"
          className="form-btn"
        >
          {isEn ? 'Send Message' : 'Verstuur Bericht'}
        </button>
      </form>

      <p className="form-note">
        {isEn
          ? '* Required fields. We respect your privacy - see our '
          : '* Verplichte velden. We respecteren je privacy - zie ons '}
        <a href={isEn ? '/en/privacy-beleid' : '/privacy-beleid'}>
          {isEn ? 'privacy policy' : 'privacybeleid'}
        </a>.
      </p>
    </div>
  )
}