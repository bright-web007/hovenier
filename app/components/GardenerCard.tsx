'use client'

import Link from 'next/link'
import { Gardener } from '../../lib/gardeners-data'
import styles from './GardenerDirectory.module.css'

interface GardenerCardProps {
  gardener: Gardener
  locale: string
}

export default function GardenerCard({ gardener, locale }: GardenerCardProps) {
  return (
    <div className={styles.gardenerCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardImage}>
          {gardener.name.charAt(0)}
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardName}>{gardener.name}</h3>
          <p className={styles.cardCompany}>{gardener.company}</p>
        </div>
      </div>

      <div className={styles.cardBadges}>
        {gardener.verified && (
          <span className={`${styles.badge} ${styles.badgeVerified}`}>
            ✓ Geverifieerd
          </span>
        )}
        <span className={`${styles.badge} ${gardener.availability === 'available' ? styles.badgeAvailable : styles.badgeBusy}`}>
          {gardener.availability === 'available' ? 'Beschikbaar' : 'Bezet'}
        </span>
      </div>

      <div className={styles.cardMeta}>
        <div className={styles.metaItem}>
          <div className={styles.metaValue}>{gardener.rating}/5</div>
          <div className={styles.metaLabel}>{gardener.reviewCount} reviews</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaValue}>€{gardener.startingPrice}</div>
          <div className={styles.metaLabel}>per uur</div>
        </div>
      </div>

      <div className={styles.cardSpecialties}>
        <div className={styles.specialtiesLabel}>Specialisaties:</div>
        <div className={styles.specialtiesList}>
          {gardener.specialties.join(' • ')}
        </div>
      </div>

      <div className={styles.cardActions}>
        <Link 
          href={`/${locale}/hoveniers/${gardener.slug}`}
          className={styles.viewButton}
        >
          Bekijk Profiel
        </Link>
        <button className={styles.contactButton}>
          Direct Contact
        </button>
      </div>
    </div>
  )
}