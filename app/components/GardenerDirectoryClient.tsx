'use client'

import { useDeferredValue, useState } from 'react'
import GardenerCard from './GardenerCard'
import styles from './GardenerDirectory.module.css'
import type { Gardener } from '../../lib/gardeners-data'

interface GardenerDirectoryClientProps {
  gardeners: Gardener[]
  locale: string
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
              className={styles.filterSelect}
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
            <select
              id="gemeente"
              className={styles.filterSelect}
              value={municipality}
              onChange={(event) => setMunicipality(event.target.value)}
            >
              <option value="">{isEnglish ? 'All municipalities' : 'Alle gemeenten'}</option>
              {municipalityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="service" className={styles.filterLabel}>
              {isEnglish ? 'Service type' : 'Service Type'}
            </label>
            <select
              id="service"
              className={styles.filterSelect}
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              <option value="">{isEnglish ? 'All services' : 'Alle diensten'}</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="rating" className={styles.filterLabel}>
              {isEnglish ? 'Minimum rating' : 'Minimale Rating'}
            </label>
            <select
              id="rating"
              className={styles.filterSelect}
              value={minRating}
              onChange={(event) => setMinRating(event.target.value)}
            >
              <option value="">{isEnglish ? 'All ratings' : 'Alle ratings'}</option>
              <option value="4.5">4.5+ sterren</option>
              <option value="4.0">4.0+ sterren</option>
              <option value="3.5">3.5+ sterren</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="availability" className={styles.filterLabel}>
              {isEnglish ? 'Availability' : 'Beschikbaarheid'}
            </label>
            <select
              id="availability"
              className={styles.filterSelect}
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
            >
              <option value="">{isEnglish ? 'All gardeners' : 'Alle hoveniers'}</option>
              <option value="available">{isEnglish ? 'Available' : 'Beschikbaar'}</option>
              <option value="busy">{isEnglish ? 'Busy' : 'Bezet'}</option>
              <option value="verified">{isEnglish ? 'Verified only' : 'Alleen geverifieerd'}</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.resultsHeader}>
        <span className={styles.resultsCount}>
          {filteredGardeners.length} {isEnglish ? 'gardeners found' : 'hoveniers gevonden'}
        </span>
        <select
          className={styles.sortSelect}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="rating">{isEnglish ? 'Sort by rating' : 'Sorteer op rating'}</option>
          <option value="price">{isEnglish ? 'Sort by price' : 'Sorteer op prijs'}</option>
          <option value="response">{isEnglish ? 'Sort by response time' : 'Sorteer op reactietijd'}</option>
          <option value="location">{isEnglish ? 'Sort by location' : 'Sorteer op locatie'}</option>
        </select>
      </div>

      {filteredGardeners.length > 0 ? (
        <div className={styles.gardenersGrid}>
          {filteredGardeners.map((gardener) => (
            <GardenerCard key={gardener.slug} gardener={gardener} locale={locale} />
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
