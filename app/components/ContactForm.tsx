'use client'

import styles from './Contact.module.css'

interface ContactFormProps {
  locale: string
}

export default function ContactForm({ locale }: ContactFormProps) {
  return (
    <div className={styles.form}>
      <div className="form-eyebrow">Gratis & vrijblijvend</div>
      <h2 className="form-title">
        Stuur ons een bericht
      </h2>
      <p className="form-sub">
        We nemen binnen 24 uur contact met je op.
      </p>
      <form>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="firstName" className="form-label">
              Voornaam *
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
              Achternaam *
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
            Onderwerp *
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="form-select"
          >
            <option value="">Selecteer onderwerp...</option>
            <option value="general">Algemene vraag</option>
            <option value="partnership">Partnership/Samenwerking</option>
            <option value="press">Pers</option>
            <option value="technical">Technische ondersteuning</option>
            <option value="feedback">Feedback/Suggestie</option>
            <option value="other">Anders</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="message" className="form-label">
            Bericht *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="form-input"
            placeholder="Beschrijf je vraag of opmerking..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="form-btn"
        >
          Verstuur Bericht
        </button>
      </form>

      <p className="form-note">
        * Verplichte velden. We respecteren je privacy - zie ons{' '}
        <a href="/privacy-beleid">privacybeleid</a>.
      </p>
    </div>
  )
}