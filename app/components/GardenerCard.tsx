
import Link from 'next/link'
import { Gardener } from '../../lib/gardeners-data'
import styles from './GardenerDirectory.module.css'
import { localizePath, type SupportedLocale } from '@/lib/locale-utils'

interface GardenerCardProps {
  gardener: Gardener
  locale: string
  translations: {
    verified: string
    available: string
    busy: string
    per_hour: string
    specialties: string
    view_profile: string
    direct_contact: string
    service_tuinonderhoud: string
    service_tuinontwerp: string
    service_groendak: string
    service_stratenmaker: string
    service_tuin_aanleggen: string
  }
}

export default function GardenerCard({ gardener, locale, translations }: GardenerCardProps) {
  const specialtyKeyMap: Record<string, string> = {
    'Tuinonderhoud': translations.service_tuinonderhoud,
    'Tuinontwerp': translations.service_tuinontwerp,
    'Groendak': translations.service_groendak,
    'Stratenmaker': translations.service_stratenmaker,
    'Tuin Aanleggen': translations.service_tuin_aanleggen,
  }

  const translateSpecialty = (s: string) => specialtyKeyMap[s] ?? s
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
            ✓ {translations.verified}
          </span>
        )}
        <span className={`${styles.badge} ${gardener.availability === 'available' ? styles.badgeAvailable : styles.badgeBusy}`}>
          ✓ {gardener.availability === 'available' ? translations.available : translations.busy}
        </span>
      </div>

      <div className={styles.cardMeta}>
        <div className={styles.metaItem}>
          <div className={styles.metaValue}>{gardener.rating}/5</div>
          <div className={styles.metaLabel}>{gardener.reviewCount} reviews</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaValue}>€{gardener.startingPrice}</div>
          <div className={styles.metaLabel}>{translations.per_hour}</div>
        </div>
      </div>

      <div style={{ width: '100%', height: '1px', backgroundColor: '#CECECE', marginBottom: '16px' }}></div>

      <div className={styles.cardSpecialties}>
        <div className={styles.specialtiesLabel}>{translations.specialties}</div>
        <div className={styles.specialtiesList}>
          {gardener.specialties.map(translateSpecialty).join(' • ')}
        </div>
      </div>

      <div className={styles.cardActions}>
        <Link
          href={localizePath(`/hoveniers/${gardener.slug}`, locale as SupportedLocale)}
          className={styles.viewButton}
        >
          {translations.view_profile}
        </Link>
        <button className={styles.contactButton}>
          {translations.direct_contact}
        </button>
      </div>
    </div>
  )
}
