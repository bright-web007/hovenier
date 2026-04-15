'use client';

import { setCookieLocale, switchLocalePath, stripLocalePrefix, type SupportedLocale } from '@/lib/locale-utils';

interface LocaleLinkProps {
  href: string;
  locale: SupportedLocale;
  className?: string;
  ariaCurrent?: 'true';
  'data-testid'?: string;
  children: React.ReactNode;
}

export default function LocaleLink({ href, locale, className, ariaCurrent, children, ...rest }: LocaleLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCookieLocale(locale);
    // Build the equivalent path in the target locale from the current page
    const currentPath = window.location.pathname;
    const neutralPath = stripLocalePrefix(currentPath);
    const targetPath = switchLocalePath(neutralPath, locale);
    window.location.href = targetPath;
  };

  return (
    <a
      href={href}
      className={className}
      aria-current={ariaCurrent}
      data-testid={rest['data-testid']}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
