'use client'

import styles from './Partnership.module.css'

interface SuccessStory {
  name: string
  company: string
  quote: string
  years: string
}

interface PartnershipTestimonialsProps {
  successStories: SuccessStory[]
}

export default function PartnershipTestimonials({ successStories }: PartnershipTestimonialsProps) {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-header-row section-centered">
          <h2 className="section-title">Succesverhalen</h2>
          <p className="section-sub">Wat onze partners zeggen</p>
        </div>
        
        <div className={styles.testimonialsGrid}>
          {successStories.map((story, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className="partnership-testimonial-content">
                <p className={styles.testimonialQuote}>"{story.quote}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className="partnership-testimonial-info">
                    <h4 className={styles.testimonialName}>{story.name}</h4>
                    <p className={styles.testimonialCompany}>{story.company}</p>
                    <p className={styles.testimonialYears}>{story.years}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}