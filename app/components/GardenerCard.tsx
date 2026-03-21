'use client';

import Link from 'next/link';
import Image from 'next/image';

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
    available: { color: 'text-green-600', bg: 'bg-green-50', text: 'Beschikbaar' },
    busy: { color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Beperkt beschikbaar' },
    unavailable: { color: 'text-red-600', bg: 'bg-red-50', text: 'Niet beschikbaar' }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        style={{ width: '16px', height: '16px', color: i < Math.floor(rating) ? 'var(--gold)' : 'var(--text-faint)' }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`group relative bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-200 overflow-hidden ${className}`} style={{ 
      background: 'var(--white)', 
      border: '0.5px solid var(--border)',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      {/* Verified Badge */}
      {verified && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'var(--forest)',
          color: 'var(--cream)',
          fontSize: '11px',
          fontWeight: '500',
          padding: '4px 8px',
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Geverifieerd
        </div>
      )}
      
      {/* Header with Profile */}
      <div style={{ padding: '1.5rem', paddingRight: '4rem' }}> {/* Extra padding for badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          {/* Profile Image */}
          <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover rounded-full"
                sizes="64px"
              />
            ) : (
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'var(--sage-light)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <svg style={{ width: '32px', height: '32px', color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            
            {/* Availability Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '20px',
              height: '20px',
              background: 'var(--cream)',
              border: '2px solid var(--white)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: availability === 'available' ? 'var(--sage)' : availability === 'busy' ? 'var(--gold)' : 'var(--text-muted)',
                borderRadius: '50%'
              }} />
            </div>
          </div>
          
          {/* Profile Info */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: 'var(--forest-deep)', 
              fontSize: '16px',
              marginBottom: '4px' 
            }}>
              {name}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-mid)', marginBottom: '4px' }}>{company}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <div style={{ display: 'flex' }}>
              {renderStars(rating)}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--forest-deep)' }}>{rating.toFixed(1)}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({reviewCount} reviews)</span>
          </div>
        )}
      </div>
      
      {/* Specialties */}
      <div style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {specialties.slice(0, 3).map((specialty, index) => (
            <span 
              key={index}
              style={{
                display: 'inline-block',
                padding: '4px 8px',
                background: 'var(--sage)',
                color: 'var(--white)',
                fontSize: '11px',
                borderRadius: '3px',
                fontWeight: '500'
              }}
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 3 && (
            <span style={{
              display: 'inline-block',
              padding: '4px 8px',
              background: 'var(--cream-dark)',
              color: 'var(--text-mid)',
              fontSize: '11px',
              borderRadius: '3px'
            }}>
              +{specialties.length - 3}
            </span>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div style={{ 
        padding: '1rem 1.5rem', 
        background: 'var(--cream-dark)', 
        borderTop: '0.5px solid var(--border)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {responseTime && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-mid)' }}>
                <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '12px' }}>{responseTime}</span>
              </div>
            )}
            {startingPrice && (
              <div style={{ color: 'var(--forest-deep)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Vanaf</span>
                <span style={{ fontWeight: '600', marginLeft: '4px' }}>€{startingPrice}</span>
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              href={gardenerHref}
              style={{
                padding: '6px 12px',
                color: 'var(--forest)',
                border: '0.5px solid var(--forest)',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              Profiel
            </Link>
            <button style={{
              padding: '6px 12px',
              background: 'var(--forest)',
              color: 'var(--cream)',
              border: 'none',
              borderRadius: '3px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              Contact
            </button>
          </div>
        </div>
      </div>
      
      {/* Link Overlay */}
      <Link href={gardenerHref} style={{ position: 'absolute', inset: '0', zIndex: '0' }}>
        <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: '0' }}>
          Bekijk profiel van {name}
        </span>
      </Link>
    </div>
  );
}