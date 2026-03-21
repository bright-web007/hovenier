'use client';

import { useTranslations } from 'next-intl';
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
  const t = useTranslations();
  
  const gardenerHref = `/hovenier/${slug}`;
  
  const availabilityConfig = {
    available: { color: 'text-green-600', bg: 'bg-green-50', text: t('cards.available') || 'Beschikbaar' },
    busy: { color: 'text-yellow-600', bg: 'bg-yellow-50', text: t('cards.busy') || 'Beperkt beschikbaar' },
    unavailable: { color: 'text-red-600', bg: 'bg-red-50', text: t('cards.unavailable') || 'Niet beschikbaar' }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-neutral-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`group relative bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-200 overflow-hidden ${className}`}>
      {/* Verified Badge */}
      {verified && (
        <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t('cards.verified') || 'Geverifieerd'}
        </div>
      )}
      
      {/* Header with Profile */}
      <div className="p-6 pr-16"> {/* Extra padding for badge */}
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="relative w-16 h-16 flex-shrink-0">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name}
                fill
                className="object-cover rounded-full"
                sizes="64px"
              />
            ) : (
              <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            
            {/* Availability Indicator */}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${availabilityConfig[availability].bg} border-2 border-white rounded-full flex items-center justify-center`}>
              <div className={`w-2 h-2 ${availability === 'available' ? 'bg-green-500' : availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full`} />
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-neutral-600 mb-1">{company}</p>
            <p className="text-xs text-neutral-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
        </div>
        
        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex">
              {renderStars(rating)}
            </div>
            <span className="text-sm font-medium text-neutral-900">{rating.toFixed(1)}</span>
            <span className="text-xs text-neutral-500">({reviewCount} {t('cards.reviews') || 'reviews'})</span>
          </div>
        )}
      </div>
      
      {/* Specialties */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-1">
          {specialties.slice(0, 3).map((specialty, index) => (
            <span 
              key={index}
              className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded font-medium"
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 3 && (
            <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
              +{specialties.length - 3}
            </span>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
        <div className="flex items-center justify-between text-sm">
          <div className="space-y-1">
            {responseTime && (
              <div className="flex items-center gap-1 text-neutral-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">{responseTime}</span>
              </div>
            )}
            {startingPrice && (
              <div className="text-neutral-900">
                <span className="text-xs text-neutral-500">{t('cards.from') || 'Vanaf'}</span>
                <span className="font-semibold ml-1">€{startingPrice}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Link
              href={gardenerHref}
              className="px-3 py-1.5 text-primary-600 hover:text-primary-700 border border-primary-200 hover:border-primary-300 rounded text-xs font-medium transition-colors"
            >
              {t('cards.view_profile') || 'Profiel'}
            </Link>
            <button className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded text-xs font-medium transition-colors">
              {t('cards.contact') || 'Contact'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Link Overlay */}
      <Link href={gardenerHref} className="absolute inset-0 z-0">
        <span className="sr-only">{t('cards.view_gardener', { name }) || `Bekijk profiel van ${name}`}</span>
      </Link>
    </div>
  );
}