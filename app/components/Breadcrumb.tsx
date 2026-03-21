'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const t = useTranslations();
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname, t);
  
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
      aria-label={t('breadcrumb.label') || 'Breadcrumb navigatie'}
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
function generateBreadcrumbsFromPath(pathname: string, t: any): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Always start with home
  breadcrumbs.push({
    label: t('breadcrumb.home') || 'Home',
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
    const label = getSegmentLabel(segment, t);
    
    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
      current: isLast
    });
  });
  
  return breadcrumbs;
}

// Helper function to map segments to readable labels
function getSegmentLabel(segment: string, t: any): string {
  const segmentMap: Record<string, string> = {
    'services': t('breadcrumb.services') || 'Diensten',
    'artikelen': t('breadcrumb.articles') || 'Artikelen',
    'articles': t('breadcrumb.articles') || 'Articles',
    'regio': t('breadcrumb.region') || 'Regio',
    'region': t('breadcrumb.region') || 'Region',
    'hovenier': t('breadcrumb.gardener') || 'Hovenier',
    'gardener': t('breadcrumb.gardener') || 'Gardener',
    'contact': t('breadcrumb.contact') || 'Contact',
    'over-ons': t('breadcrumb.about') || 'Over ons',
    'about': t('breadcrumb.about') || 'About',
    'privacy-beleid': t('breadcrumb.privacy') || 'Privacybeleid',
    'privacy-policy': t('breadcrumb.privacy') || 'Privacy Policy',
    'tuinonderhoud': t('services.maintenance') || 'Tuinonderhoud',
    'garden-maintenance': t('services.maintenance') || 'Garden Maintenance',
    'tuinontwerp': t('services.design') || 'Tuinontwerp',
    'garden-design': t('services.design') || 'Garden Design',
    'groendak': t('services.green_roof') || 'Groendak',
    'green-roof': t('services.green_roof') || 'Green Roof'
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