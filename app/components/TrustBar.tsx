'use client';

interface TrustBarProps {
  trustBarTranslations?: {
    gardeners: string;
    projects: string;
    satisfied: string;
    cities: string;
    verified: string;
    secure: string;
    reviews: string;
  };
  stats?: {
    gardeners: number;
    projects: number;
    satisfied: number;
    cities: number;
  };
  className?: string;
}

export default function TrustBar({ 
  trustBarTranslations = {
    gardeners: 'Hoveniers',
    projects: 'Projecten',
    satisfied: 'Tevreden klanten',
    cities: 'Gemeenten',
    verified: 'Geverifieerde hoveniers',
    secure: '100% veilig & betrouwbaar',
    reviews: 'Beoordeeld door klanten'
  },
  stats = {
    gardeners: 150,
    projects: 2300,
    satisfied: 98,
    cities: 18
  },
  className = ''
}: TrustBarProps) {
  
  const trustStats = [
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      value: stats.gardeners.toLocaleString(),
      label: trustBarTranslations.gardeners
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      value: stats.projects.toLocaleString(),
      label: trustBarTranslations.projects
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      value: `${stats.satisfied}%`,
      label: trustBarTranslations.satisfied
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      value: stats.cities.toLocaleString(),
      label: trustBarTranslations.cities
    }
  ];

  return (
    <div className={`trust-bar ${className}`}>
      <div className="trust-bar-inner">
        <div className="trust-stats-grid">
          {trustStats.map((stat, index) => (
            <div key={index} className="trust-stat">
              <div className="trust-stat-icon">
                {stat.icon}
              </div>
              <div className="trust-stat-value">
                {stat.value}
              </div>
              <div className="trust-stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-indicators-grid">
            <div className="trust-indicator">
              <svg className="trust-indicator-icon trust-indicator-icon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{trustBarTranslations.verified}</span>
            </div>
            <div className="trust-indicator">
              <svg className="trust-indicator-icon trust-indicator-icon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{trustBarTranslations.secure}</span>
            </div>
            <div className="trust-indicator">
              <svg className="trust-indicator-icon trust-indicator-icon-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>{trustBarTranslations.reviews}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}