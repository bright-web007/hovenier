'use client'

import { Gardener } from '../../lib/gardeners-data'
import styles from './GardenerProfile.module.css'

interface GardenerProfileProps {
  gardener: Gardener
  locale: string
}

export default function GardenerProfile({ gardener, locale }: GardenerProfileProps) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {/* Profile Image Placeholder */}
            <div className={styles.profileImage}>
              {gardener.name.charAt(0)}
            </div>
            
            <div className={styles.badges}>
              {gardener.verified && (
                <span className={`${styles.badge} ${styles.badgeVerified}`}>
                  ✓ Geverifieerd
                </span>
              )}
              <span className={`${styles.badge} ${gardener.availability === 'available' ? styles.badgeAvailable : styles.badgeBusy}`}>
                {gardener.availability === 'available' ? 'Beschikbaar' : 'Bezet'}
              </span>
            </div>
            
            <h1 className={styles.name}>
              {gardener.name}
            </h1>
            <p className={styles.company}>
              {gardener.company}
            </p>
            <p className={styles.location}>
              {gardener.location} • {gardener.specialties.join(' • ')}
            </p>
          </div>

          {/* Stats Row */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {gardener.rating}/5
              </div>
              <div className={styles.statLabel}>
                {gardener.reviewCount} beoordelingen
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                €{gardener.startingPrice}
              </div>
              <div className={styles.statLabel}>
                Vanaf / uur
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {gardener.responseTime}
              </div>
              <div className={styles.statLabel}>
                Reactietijd
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.contentGrid}>
          {/* Left Column */}
          <div className={styles.mainContent}>
            {/* About */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Over {gardener.name}
              </h2>
              <p className={styles.description}>
                {gardener.description}
              </p>
            </section>

            {/* Services */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Diensten
              </h2>
              <ul className={styles.servicesList}>
                {gardener.services.map((service, index) => (
                  <li key={index} className={styles.serviceItem}>
                    <span className={styles.serviceIcon}>✓</span>
                    {service}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className={styles.sidebar}>
            <section className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>
                Direct Contact
              </h3>
              <div className={styles.contactInfo}>
                <p className={styles.contactItem}>
                  <span>📞</span> {gardener.contact.phone}
                </p>
                <p className={styles.contactItem}>
                  <span>✉️</span> {gardener.contact.email}
                </p>
                <p className={styles.contactItem}>
                  <span>🌐</span> Website
                </p>
              </div>
              <button className={styles.quoteButton}>
                Vraag Offerte Aan
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}