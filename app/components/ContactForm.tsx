'use client'

import styles from './Contact.module.css'

interface ContactFormProps {
  locale: string
}

export default function ContactForm({ locale }: ContactFormProps) {
  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>
        Stuur ons een bericht
      </h2>
      <form className={styles.formGrid}>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label htmlFor="firstName" className={styles.formLabel}>
              Voornaam *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="lastName" className={styles.formLabel}>
              Achternaam *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className={styles.formInput}
            />
          </div>
        </div>
        
        <div className={styles.formField}>
          <label htmlFor="email" className={styles.formLabel}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="subject" className={styles.formLabel}>
            Onderwerp *
          </label>
          <select
            id="subject"
            name="subject"
            required
            className={styles.formSelect}
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

        <div className={styles.formField}>
          <label htmlFor="message" className={styles.formLabel}>
            Bericht *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className={styles.formTextarea}
            placeholder="Beschrijf je vraag of opmerking..."
          ></textarea>
        </div>

        <button
          type="submit"
          className={styles.formButton}
        >
          Verstuur Bericht
        </button>
      </form>

      <p className={styles.formNote}>
        * Verplichte velden. We respecteren je privacy - zie ons{' '}
        <a href="/privacy-beleid">privacybeleid</a>.
      </p>
    </div>
  )
}