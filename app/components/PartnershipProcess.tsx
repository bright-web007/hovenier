'use client'

import styles from './Partnership.module.css'

interface ProcessStep {
  step: number
  title: string
  description: string
}

interface PartnershipProcessProps {
  processSteps: ProcessStep[]
}

export default function PartnershipProcess({ processSteps }: PartnershipProcessProps) {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-header-row section-centered">
          <h2 className="section-title">Hoe werkt het?</h2>
          <p className="section-sub">In 4 stappen partner worden</p>
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