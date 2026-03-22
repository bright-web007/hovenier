'use client'

import styles from './Partnership.module.css'

interface PartnershipRequirementsProps {
  requirements: string[]
}

export default function PartnershipRequirements({ requirements }: PartnershipRequirementsProps) {
  return (
    <section className="section section-alt">
      <div className="section-inner">
        <div className={styles.requirements}>
          <h2 className={styles.requirementsTitle}>Partner vereisten</h2>
          <p className={styles.requirementsDescription}>
            Wij werken alleen samen met professionele hoveniers die voldoen aan onze kwaliteitseisen.
          </p>
          
          <div className={styles.requirementsList}>
            {requirements.map((requirement, index) => (
              <div key={index} className={styles.requirementItem}>
                <div className={styles.requirementIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={styles.requirementText}>{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}