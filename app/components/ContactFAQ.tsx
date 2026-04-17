'use client'

import styles from './Contact.module.css'

interface ContactFAQProps {
  locale: string
}

export default function ContactFAQ({ locale }: ContactFAQProps) {
  const isEn = locale === 'en';

  return (
    <div className={styles.faqCard}>
      <h3 className={styles.contactCardTitle}>
        {isEn ? 'Frequently Asked Questions' : 'Veelgestelde Vragen'}
      </h3>
      <div className={styles.faqItems}>
        <div className={styles.faqItem}>
          <h4>{isEn ? 'For Homeowners:' : 'Voor Huiseigenaren:'}</h4>
          <p>{isEn ? 'How does the matching service work?' : 'Hoe werkt de matching service?'}</p>
          <a href={isEn ? '/en/over-ons' : '/over-ons'}>{isEn ? '→ Read more' : '→ Lees meer'}</a>
        </div>
        <div className={styles.faqItem}>
          <h4>{isEn ? 'For Gardeners:' : 'Voor Hoveniers:'}</h4>
          <p>{isEn ? 'How do I join the platform?' : 'Hoe word ik lid van het platform?'}</p>
          <a href={isEn ? '/en/samenwerking' : '/samenwerking'}>{isEn ? '→ Partnership info' : '→ Partnership info'}</a>
        </div>
        <div className={styles.faqItem}>
          <h4>{isEn ? 'Costs & Prices:' : 'Kosten & Prijzen:'}</h4>
          <p>{isEn ? 'What do gardener services cost?' : 'Wat kosten hovenier diensten?'}</p>
          <a href={isEn ? '/en/kosten' : '/kosten'}>{isEn ? '→ Cost guide' : '→ Kostengids'}</a>
        </div>
      </div>
    </div>
  )
}