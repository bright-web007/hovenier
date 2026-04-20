import { ReactNode } from 'react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieConsentBanner from '../components/CookieConsentBanner';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

function isSupportedPageLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  let validLocale = defaultLocale;
  
  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!isSupportedPageLocale(validLocale)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing locale params:', error);
  }
  
  return (
    <div className="page-container">
      {children}
      <Footer locale={validLocale} />
      <WhatsAppButton className="whatsapp-floating" />
      <CookieConsentBanner locale={validLocale} />
    </div>
  );
}
