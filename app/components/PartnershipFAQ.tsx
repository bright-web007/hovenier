'use client'

import styles from './Partnership.module.css'

interface FAQ {
  question: string
  answer: string
}

interface PartnershipFAQProps {
  faqs: FAQ[]
  locale?: string
}

export default function PartnershipFAQ({ faqs, locale = 'nl' }: PartnershipFAQProps) {
  const isEn = locale === 'en';
  return (
    <section className="section section-alt">
      <div className="section-inner">
        <div className="section-header-row section-centered">
          <h2 className="section-title">{isEn ? 'Frequently asked questions' : 'Veelgestelde vragen'}</h2>
        </div>
        
        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>{faq.question}</h3>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}