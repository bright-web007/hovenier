'use client'

import styles from './Partnership.module.css'

interface ProcessStep {
  step: number
  title: string
  description: string
}

interface PartnershipProcessProps {
  processSteps: ProcessStep[]
  locale?: string
}

export default function PartnershipProcess({ processSteps, locale = 'nl' }: PartnershipProcessProps) {
  const isEn = locale === 'en';
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-header-row section-centered">
          <h2 className="section-title">{isEn ? 'How does it work?' : 'Hoe werkt het?'}</h2>
          <p className="section-sub">{isEn ? 'Become a partner in 4 steps' : 'In 4 stappen partner worden'}</p>
        </div>
        
        <div className={styles.processGrid}>
          {processSteps.map((step, index) => (
            <div key={index} className={styles.processStep}>
              <div className={styles.processNumber}>{step.step}</div>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}