'use client'

import Link from 'next/link'
import { Gardener } from '../../lib/gardeners-data'
import styles from './GardenerDirectory.module.css'
import { localizePath, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

interface GardenerCardProps {
  gardener: Gardener
  locale: string
}

export default function GardenerCard({ gardener, locale }: GardenerCardProps) {
  const isEn = locale === 'en'
  const t = createTranslator(locale);

  const specialtyTranslations: Record<string, string> = {
    'Tuinonderhoud': 'Garden Maintenance',
    'Tuinontwerp': 'Garden Design',
    'Groendak': 'Green Roof',
    'Stratenmaker': 'Paving',
    'Tuin Aanleggen': 'Garden Construction',
  }

  const translateSpecialty = (s: string) => isEn ? (specialtyTranslations[s] || s) : s
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
            ✓ {t('gardener_card.verified')}
          </span>
        )}
        <span className={`${styles.badge} ${gardener.availability === 'available' ? styles.badgeAvailable : styles.badgeBusy}`}>
          ✓ {gardener.availability === 'available' ? t('gardener_card.available') : t('gardener_card.busy')}
        </span>
      </div>

      <div className={styles.cardMeta}>
        <div className={styles.metaItem}>
          <div className={styles.metaValue}>{gardener.rating}/5</div>
          <div className={styles.metaLabel}>{gardener.reviewCount} reviews</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaValue}>€{gardener.startingPrice}</div>
          <div className={styles.metaLabel}>{t('gardener_card.per_hour')}</div>
        </div>
      </div>

      <div style={{ width: '100%', height: '1px', backgroundColor: '#CECECE', marginBottom: '16px' }}></div>

      <div className={styles.cardSpecialties}>
        <div className={styles.specialtiesLabel}>{t('gardener_card.specialties')}</div>
        <div className={styles.specialtiesList}>
          {gardener.specialties.map(translateSpecialty).join(' • ')}
        </div>
      </div>

      <div className={styles.cardActions}>
        <Link
          href={localizePath(`/hoveniers/${gardener.slug}`, locale as SupportedLocale)}
          className={styles.viewButton}
        >
          {t('gardener_card.view_profile')}
        </Link>
        <button className={styles.contactButton}>
          {t('gardener_card.direct_contact')}
        </button>
      </div>
    </div>
  )
}
