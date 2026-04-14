'use client'

import styles from './Partnership.module.css'

interface Benefit {
  title: string
  description: string
  icon: 'users' | 'money' | 'location' | 'badge'
}

interface PartnershipBenefitsProps {
  benefits: Benefit[]
  locale?: string
}

export default function PartnershipBenefits({ benefits, locale = 'nl' }: PartnershipBenefitsProps) {
  const isEn = locale === 'en';
  return (
    <section className="section section-alt">
      <div className="section-inner">
        <div className="section-header-row section-centered">
          <h2 className="section-title">{isEn ? 'Why become a partner?' : 'Waarom partner worden?'}</h2>
          <p className="section-sub">{isEn ? 'The benefits of partnering with Hovenier.frl' : 'De voordelen van samenwerken met Hovenier.frl'}</p>
        </div>
        
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {benefit.icon === 'users' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  )}
                  {benefit.icon === 'money' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  )}
                  {benefit.icon === 'location' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  )}
                  {benefit.icon === 'badge' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}