'use client';

import { setCookieLocale, type SupportedLocale } from '@/lib/locale-utils';

interface LocaleLinkProps {
  href: string;
  locale: SupportedLocale;
  className?: string;
  ariaCurrent?: 'true';
  'data-testid'?: string;
  children: React.ReactNode;
}

export default function LocaleLink({ href, locale, className, ariaCurrent, children, ...rest }: LocaleLinkProps) {
  const handleClick = () => {
    setCookieLocale(locale);
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
