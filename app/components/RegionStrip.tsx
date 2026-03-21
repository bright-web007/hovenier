'use client';

import Link from 'next/link';

interface Region {
  name: string;
  slug: string;
  count?: number;
}

interface RegionStripProps {
  title?: string;
  regions?: Region[];
  showCounts?: boolean;
  className?: string;
}

const defaultRegions: Region[] = [
  { name: 'Leeuwarden', slug: 'leeuwarden', count: 28 },
  { name: 'Heerenveen', slug: 'heerenveen', count: 19 },
  { name: 'Smallingerland', slug: 'smallingerland', count: 15 },
  { name: 'Súdwest-Fryslân', slug: 'sudwest-fryslan', count: 12 },
  { name: 'Achtkarspelen', slug: 'achtkarspelen', count: 8 },
  { name: 'Tietjerksteradiel', slug: 'tietjerksteradiel', count: 7 },
  { name: 'Dantumadiel', slug: 'dantumadiel', count: 6 },
  { name: 'De Fryske Marren', slug: 'de-fryske-marren', count: 11 },
  { name: 'Waadhoeke', slug: 'waadhoeke', count: 5 },
  { name: 'Noardeast-Fryslân', slug: 'noardeast-fryslan', count: 9 },
  { name: 'Harlingen', slug: 'harlingen', count: 4 }
];

export default function RegionStrip({
  title,
  regions = defaultRegions,
  showCounts = true,
  className = ''
}: RegionStripProps) {
  
  const displayTitle = title || 'Hoveniers in elke Friese gemeente';

  return (
    <section className={`region-strip ${className}`}>
      <div className="region-strip-inner">
        {/* Section Header */}
        <div className="region-strip-header">
          <p className="section-eyebrow section-eyebrow-centered">
            ALLE GEMEENTEN
          </p>
          <h2 className="section-title section-title-centered">
            {displayTitle}
          </h2>
          <p className="section-sub section-sub-centered">
            Vind vakkundige hoveniers in elke Friese gemeente. Lokale expertise voor uw tuin.
          </p>
        </div>
        
        {/* Regions Grid */}
        <div className="region-grid">
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/regio/${region.slug}`}
              className="region-card"
            >
              <div className="region-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <div className="region-card-content">
                <h3 className="region-card-name">
                  {region.name}
                </h3>
                {showCounts && region.count && (
                  <p className="region-card-count">
                    {region.count} hoveniers
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="region-strip-footer">
          <p className="region-strip-cta-text">
            Niet uw gemeente erbij? We helpen u graag verder.
          </p>
          <Link 
            href="/contact"
            className="region-strip-cta"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Neem contact op
          </Link>
        </div>
      </div>
    </section>
  );
}