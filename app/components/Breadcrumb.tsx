'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Static translations for breadcrumbs
function getBreadcrumbTranslation(key: string): string {
  const translations: Record<string, string> = {
    'breadcrumb.label': 'Breadcrumb navigatie',
    'breadcrumb.home': 'Home',
    'breadcrumb.services': 'Diensten',
    'breadcrumb.articles': 'Artikelen',
    'breadcrumb.region': 'Regio',
    'breadcrumb.gardener': 'Hovenier',
    'breadcrumb.contact': 'Contact',
    'breadcrumb.about': 'Over ons',
    'breadcrumb.privacy': 'Privacybeleid',
    'services.maintenance': 'Tuinonderhoud',
    'services.design': 'Tuinontwerp',
    'services.green_roof': 'Groendak'
  };
  return translations[key] || key;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export default function Breadcrumb({ 
  items, 
  separator, 
  className = '' 
}: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);
  
  const defaultSeparator = (
    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label={getBreadcrumbTranslation('breadcrumb.label')}
      className={`${className}`}
    >
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mr-2">
                {separator || defaultSeparator}
              </span>
            )}
            
            {item.current || !item.href ? (
              <span 
                className="text-neutral-500 font-medium"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-neutral-600 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Always start with home
  breadcrumbs.push({
    label: getBreadcrumbTranslation('breadcrumb.home'),
    href: '/'
  });
  
  // Build path progressively
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    // Skip locale segment
    if (segment === 'en') {
      return;
    }
    
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Map common segments to readable labels
    const label = getSegmentLabel(segment);
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
      current: isLast
    });
  });
  
  return breadcrumbs;
}

// Helper function to map segments to readable labels
function getSegmentLabel(segment: string): string {
  const segmentMap: Record<string, string> = {
    'services': getBreadcrumbTranslation('breadcrumb.services'),
    'diensten': getBreadcrumbTranslation('breadcrumb.services'),
    'artikelen': getBreadcrumbTranslation('breadcrumb.articles'),
    'articles': 'Articles',
    'regio': getBreadcrumbTranslation('breadcrumb.region'),
    'region': 'Region',
    'hovenier': getBreadcrumbTranslation('breadcrumb.gardener'),
    'gardener': 'Gardener',
    'contact': getBreadcrumbTranslation('breadcrumb.contact'),
    'over-ons': getBreadcrumbTranslation('breadcrumb.about'),
    'about': 'About',
    'privacy-beleid': getBreadcrumbTranslation('breadcrumb.privacy'),
    'privacy-policy': 'Privacy Policy',
    'tuinonderhoud': getBreadcrumbTranslation('services.maintenance'),
    'garden-maintenance': 'Garden Maintenance',
    'tuinontwerp': getBreadcrumbTranslation('services.design'),
    'garden-design': 'Garden Design',
    'groendak': getBreadcrumbTranslation('services.green_roof'),
    'green-roof': 'Green Roof'
  };
  
  return segmentMap[segment] || formatSegmentName(segment);
}

// Helper function to format segment names
function formatSegmentName(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
