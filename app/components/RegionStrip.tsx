import Link from 'next/link';
import { getRegionSlugByGemeenteSlug, gemeentesData } from '@/lib/regions-hierarchy';

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
  locale?: string;
  translations?: {
    contact_us: string;
    all_municipalities?: string;
    subtitle?: string;
    gardeners?: string;
    not_listed?: string;
  };
}

// Generate regions from the actual gemeente data
function generateRegionsFromGemeenten(): Region[] {
  return gemeentesData
    .map((gemeente) => ({
      name: gemeente.name,
      slug: gemeente.slug,
      // Estimate hoveniers based on population (roughly 1 per 2000 residents, min 3, max 30)
      count: Math.max(3, Math.min(30, Math.round(gemeente.population / 2000)))
    }))
    // Sort by population (largest first) to show major cities first
    .sort((a, b) => (b.count || 0) - (a.count || 0));
}

// Fallback for when gemeente data is not available
const fallbackRegions: Region[] = [
  { name: 'Leeuwarden', slug: 'leeuwarden', count: 28 },
  { name: 'Heerenveen', slug: 'heerenveen', count: 19 },
  { name: 'Smallingerland', slug: 'smallingerland', count: 15 },
  { name: 'Súdwest-Fryslân', slug: 'sudwest-fryslan', count: 12 },
  { name: 'De Fryske Marren', slug: 'de-fryske-marren', count: 11 },
  { name: 'Noardeast-Fryslân', slug: 'noardeast-fryslan', count: 9 },
  { name: 'Achtkarspelen', slug: 'achtkarspelen', count: 8 },
  { name: 'Tietjerksteradeel', slug: 'tietjerksteradeel', count: 7 },
  { name: 'Dantumadeel', slug: 'dantumadeel', count: 6 },
  { name: 'Waadhoeke', slug: 'waadhoeke', count: 5 },
  { name: 'Harlingen', slug: 'harlingen', count: 4 }
];

export default function RegionStrip({
  title,
  regions,
  showCounts = true,
  className = '',
  locale = 'nl',
  translations
}: RegionStripProps) {
  // Use provided regions, or generate from gemeente data, or use fallback
  const displayRegions = regions || (gemeentesData.length > 0 ? generateRegionsFromGemeenten() : fallbackRegions);
  const displayTitle = title || 'Hoveniers in Friesland';

  return (
    <section className={`region-strip ${className}`}>
      <div className="region-strip-inner">
        {/* Section Header */}
        <div className="region-strip-header">
          <p className="section-eyebrow section-eyebrow-centered">
            {translations?.all_municipalities || 'ALLE GEMEENTEN'}
          </p>
          <h2 className="section-title section-title-centered">
            {displayTitle}
          </h2>
          <p className="section-sub section-sub-centered">
            {translations?.subtitle || 'Klik op een gemeente om hoveniers in uw regio te bekijken.'}
          </p>
        </div>
        
        {/* Regions Grid */}
        <div className="region-grid">
          {displayRegions.map((region) => {
            const regionSlug = getRegionSlugByGemeenteSlug(region.slug);
            const href = regionSlug && regionSlug !== region.slug
              ? `/regio/${regionSlug}/${region.slug}`
              : `/regio/${region.slug}`;
            
            // Debug logging for development
            if (process.env.NODE_ENV === 'development' && !regionSlug) {
              console.warn(`⚠️  No region found for gemeente: ${region.slug} (${region.name})`);
            }
            
            return (
              <Link
                key={region.slug}
                href={href}
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
                      {region.count} {translations?.gardeners || 'hoveniers'}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="region-strip-footer">
          <p className="region-strip-cta-text">
            {translations?.not_listed || 'Staat uw gemeente er niet bij?'}
          </p>
          <Link 
            href="/contact"
            className="region-strip-cta"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {translations?.contact_us || 'Contact us'}
          </Link>
        </div>
      </div>
    </section>
  );
}