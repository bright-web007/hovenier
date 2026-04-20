'use client';

import Link from 'next/link';
import Image from 'next/image';
import { createTranslator } from '@/i18n';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
  price?: {
    from: number;
    unit: string;
  };
  features?: string[];
  popular?: boolean;
  className?: string;
  locale?: string;
}

export default function ServiceCard({
  title,
  description,
  imageUrl,
  href,
  price,
  features = [],
  popular = false,
  className = '',
  locale = 'nl'
}: ServiceCardProps) {
  const t = createTranslator(locale);

  return (
    <div className={`service-card ${className}`}>
      {/* Popular Badge */}
      {popular && (
        <div className="service-card-popular">
          {t('service_card.popular')}
        </div>
      )}
      
      {/* Service Image */}
      {imageUrl ? (
        <div className="service-card-image">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1200px) calc(50vw - 3rem), 380px"
          />
        </div>
      ) : (
        <div className="service-card-image service-card-image-placeholder">
          <div className="service-card-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Card Content */}
      <div className="service-card-content">
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>
        
        {/* Features List */}
        {features.length > 0 && (
          <ul className="service-card-features">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
            {features.length > 4 && (
              <li className="service-card-features-more">
                +{features.length - 4} {t('service_card.more_features')}
              </li>
            )}
          </ul>
        )}
        
        {/* Price & CTA */}
        <div className="service-card-footer">
          {price ? (
            <div className="service-card-price">
              {t('service_card.from')}
              <span className="service-card-price-amount">
                €{price.from}
              </span>
              /{price.unit}
            </div>
          ) : (
            <div className="service-card-price">
              {t('service_card.on_request')}
            </div>
          )}
          
          <Link
            href={href}
            className="service-card-link"
            aria-label={`${t('service_card.more_info_about')} ${title}`}
            prefetch={false}
          >
            {t('service_card.more_info')}
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
