'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './GardenerCard.module.css';

interface GardenerCardProps {
  name: string;
  company: string;
  slug: string;
  profileImage?: string;
  location: string;
  specialties: string[];
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  responseTime?: string;
  startingPrice?: number;
  availability?: 'available' | 'busy' | 'unavailable';
  className?: string;
}

export default function GardenerCard({
  name,
  company,
  slug,
  profileImage,
  location,
  specialties,
  rating,
  reviewCount = 0,
  verified = false,
  responseTime,
  startingPrice,
  availability = 'available',
  className = ''
}: GardenerCardProps) {
  const gardenerHref = `/hovenier/${slug}`;
  
  const availabilityConfig = {
    available: { color: styles.available, text: 'Beschikbaar' },
    busy: { color: styles.busy, text: 'Beperkt beschikbaar' },
    unavailable: { color: styles.unavailable, text: 'Niet beschikbaar' }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={styles.star}
        style={{ color: i < Math.floor(rating) ? 'var(--gold)' : 'var(--text-faint)' }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`${styles.card} ${className}`}>
      {/* Verified Badge */}
      {verified && (
        <div className={styles.verifiedBadge}>
          <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Geverifieerd
        </div>
      )}
      
      {/* Header with Profile */}
      <div className={styles.header}>
        <div className={styles.headerRow}>
          {/* Profile Image */}
          <div className={styles.profileImageWrapper}>
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name}
                fill
                className={styles.profileImage}
                sizes="64px"
              />
            ) : (
              <div className={styles.profileImageFallback}>
                <svg style={{ width: '32px', height: '32px', color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            {/* Availability Indicator */}
            <div className={styles.availabilityIndicator}>
              <div className={styles.availabilityDot} style={{ background: availability === 'available' ? 'var(--sage)' : availability === 'busy' ? 'var(--gold)' : 'var(--text-muted)' }} />
            </div>
          </div>
          
          {/* Profile Info */}
          <div className={styles.info}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.company}>{company}</p>
            <p className={styles.location}>
              <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
        </div>
        
        {/* Rating */}
        {rating && (
          <div className={styles.ratingRow}>
            <div className={styles.stars}>{renderStars(rating)}</div>
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
            <span className={styles.reviewCount}>({reviewCount} reviews)</span>
          </div>
        )}
      </div>
      
      {/* Specialties */}
      <div className={styles.specialties}>
        <div className={styles.specialtyList}>
          {specialties.slice(0, 3).map((specialty, index) => (
            <span key={index} className={styles.specialty}>{specialty}</span>
          ))}
          {specialties.length > 3 && (
            <span className={styles.specialtyMore}>+{specialties.length - 3}</span>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerRow}>
          <div className={styles.footerInfo}>
            {responseTime && (
              <div className={styles.responseTime}>
                <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{responseTime}</span>
              </div>
            )}
            {startingPrice && (
              <div className={styles.startingPrice}>
                <span className={styles.startingPriceLabel}>Vanaf</span>
                <span className={styles.startingPriceValue}>€{startingPrice}</span>
              </div>
            )}
          </div>
          <div className={styles.footerActions}>
            <Link href={gardenerHref} className={styles.profileLink}>Profiel</Link>
            <button className={styles.contactBtn}>Contact</button>
          </div>
        </div>
      </div>
      
      {/* Link Overlay */}
      <Link href={gardenerHref} className={styles.linkOverlay} tabIndex={-1} aria-hidden="true">
        <span className={styles.srOnly}>Bekijk profiel van {name}</span>
      </Link>
    </div>
  );
}