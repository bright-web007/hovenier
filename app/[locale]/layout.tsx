import { ReactNode } from 'react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieConsentBanner from '../components/CookieConsentBanner';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  let validLocale = defaultLocale;
  
  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!locales.includes(validLocale as any)) {
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
