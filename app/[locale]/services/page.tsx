import { getTranslator, locales, defaultLocale } from '../../../i18n';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = params?.locale || defaultLocale;
  if (!locales.includes(locale as any)) notFound();
  const t = getTranslator(locale as "nl" | "en");
  return (
    <main>
      <Navigation locale={locale as "nl" | "en"} />
      <h1>{t('services')}</h1>
      <p>Service overview and cards will go here.</p>
    </main>
  );
}
