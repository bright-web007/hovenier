'use client'

import { useDeferredValue, useState } from 'react'
import GardenerCard from './GardenerCard'
import CustomSelect from './CustomSelect'
import styles from './GardenerDirectory.module.css'
import type { Gardener } from '../../lib/gardeners-data'

interface GardenerDirectoryClientProps {
  gardeners: Gardener[]
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

function getResponseTimeMinutes(responseTime: string): number {
  const match = responseTime.match(/(\d+)/)

  if (!match) {
    return Number.MAX_SAFE_INTEGER
  }

  const amount = Number(match[1])

  if (responseTime.includes('uur')) {
    return amount * 60
  }

  return amount
}

export default function GardenerDirectoryClient({
  gardeners,
  locale,
  translations,
}: GardenerDirectoryClientProps) {
  const isEnglish = locale === 'en'
  const [query, setQuery] = useState('')
  const [municipality, setMunicipality] = useState('')
  const [service, setService] = useState('')
  const [minRating, setMinRating] = useState('')
  const [availability, setAvailability] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const deferredQuery = useDeferredValue(query)

  const municipalityOptions = Array.from(new Set(gardeners.map((gardener) => gardener.location))).sort()
  const serviceOptions = Array.from(
    new Set(
      gardeners.flatMap((gardener) =>
        gardener.specialties.map((specialty) => specialty.toLowerCase())
      )
    )
  ).sort()

  const filteredGardeners = gardeners
    .filter((gardener) => {
      const searchTarget = [
        gardener.name,
        gardener.company,
        gardener.location,
        ...gardener.specialties,
        ...gardener.services,
      ]
        .join(' ')
        .toLowerCase()

      const normalizedQuery = deferredQuery.trim().toLowerCase()
      const matchesQuery = normalizedQuery === '' || searchTarget.includes(normalizedQuery)
      const matchesMunicipality = municipality === '' || gardener.location === municipality
      const matchesService =
        service === '' ||
        gardener.specialties.some((specialty) => specialty.toLowerCase() === service)
      const matchesRating = minRating === '' || gardener.rating >= Number(minRating)
      const matchesAvailability =
        availability === '' ||
        (availability === 'verified' ? gardener.verified : gardener.availability === availability)

      return (
        matchesQuery &&
        matchesMunicipality &&
        matchesService &&
        matchesRating &&
        matchesAvailability
      )
    })
    .sort((left, right) => {
      switch (sortBy) {
        case 'price':
          return left.startingPrice - right.startingPrice
        case 'response':
          return getResponseTimeMinutes(left.responseTime) - getResponseTimeMinutes(right.responseTime)
        case 'location':
          return left.location.localeCompare(right.location)
        case 'rating':
        default:
          return right.rating - left.rating
      }
    })

  return (
    <>
      <div className={styles.searchSection}>
        <h2 className={styles.searchTitle}>
          {isEnglish ? 'Search Gardeners' : 'Zoek & Filter Hoveniers'}
        </h2>
        <div className={styles.filterGrid}>
          <div className={styles.filterGroup}>
            <label htmlFor="directory-query" className={styles.filterLabel}>
              {isEnglish ? 'Search term' : 'Zoekterm'}
            </label>
            <input
              id="directory-query"
              className={`${styles.filterSelect} ${styles.filterInput}`}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isEnglish ? 'Name, company or service' : 'Naam, bedrijf of dienst'}
            />
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="gemeente" className={styles.filterLabel}>
              {isEnglish ? 'Municipality' : 'Gemeente'}
            </label>
            <CustomSelect
              id="gemeente"
              label={isEnglish ? 'All municipalities' : 'Alle gemeenten'}
              value={municipality}
              onChange={setMunicipality}
              options={[
                { value: '', label: isEnglish ? 'All municipalities' : 'Alle gemeenten' },
                ...municipalityOptions.map((o) => ({ value: o, label: o })),
              ]}
            />
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="service" className={styles.filterLabel}>
              {isEnglish ? 'Service type' : 'Service Type'}
            </label>
            <CustomSelect
              id="service"
              label={isEnglish ? 'All services' : 'Alle diensten'}
              value={service}
              onChange={setService}
              options={[
                { value: '', label: isEnglish ? 'All services' : 'Alle diensten' },
                ...serviceOptions.map((o) => ({ value: o, label: o })),
              ]}
            />
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="rating" className={styles.filterLabel}>
              {isEnglish ? 'Minimum rating' : 'Minimale Rating'}
            </label>
            <CustomSelect
              id="rating"
              label={isEnglish ? 'All ratings' : 'Alle ratings'}
              value={minRating}
              onChange={setMinRating}
              options={[
                { value: '', label: isEnglish ? 'All ratings' : 'Alle ratings' },
                { value: '4.5', label: isEnglish ? '4.5+ stars' : '4.5+ sterren' },
                { value: '4.0', label: isEnglish ? '4.0+ stars' : '4.0+ sterren' },
                { value: '3.5', label: isEnglish ? '3.5+ stars' : '3.5+ sterren' },
              ]}
            />
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="availability" className={styles.filterLabel}>
              {isEnglish ? 'Availability' : 'Beschikbaarheid'}
            </label>
            <CustomSelect
              id="availability"
              label={isEnglish ? 'All gardeners' : 'Alle hoveniers'}
              value={availability}
              onChange={setAvailability}
              options={[
                { value: '', label: isEnglish ? 'All gardeners' : 'Alle hoveniers' },
                { value: 'available', label: isEnglish ? 'Available' : 'Beschikbaar' },
                { value: 'busy', label: isEnglish ? 'Busy' : 'Bezet' },
                { value: 'verified', label: isEnglish ? 'Verified only' : 'Alleen geverifieerd' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={styles.resultsHeader}>
        <span className={styles.resultsCount}>
          {filteredGardeners.length} {isEnglish ? 'gardeners found' : 'hoveniers gevonden'}
        </span>
        <CustomSelect
          className={styles.sortSelect}
          outerClassName={styles.customSelectTwo}
          id="sortBy"
          label={isEnglish ? 'Sort by rating' : 'Sorteer op rating'}
          value={sortBy}
          onChange={setSortBy}
          options={[
            { value: 'rating', label: isEnglish ? 'Sort by rating' : 'Sorteer op rating' },
            { value: 'price', label: isEnglish ? 'Sort by price' : 'Sorteer op prijs' },
            { value: 'response', label: isEnglish ? 'Sort by response time' : 'Sorteer op reactietijd' },
            { value: 'location', label: isEnglish ? 'Sort by location' : 'Sorteer op locatie' },
          ]}
        />
      </div>

      {filteredGardeners.length > 0 ? (
        <div className={styles.gardenersGrid}>
          {filteredGardeners.map((gardener) => (
            <GardenerCard key={gardener.slug} gardener={gardener} locale={locale} translations={translations} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyStateTitle}>
            {isEnglish ? 'No matching gardeners found' : 'Geen passende hoveniers gevonden'}
          </h3>
          <p className={styles.emptyStateText}>
            {isEnglish
              ? 'Adjust your filters or search for another municipality or service.'
              : 'Pas uw filters aan of zoek op een andere gemeente of dienst.'}
          </p>
        </div>
      )}
    </>
  )
}
