import { getTranslator, locales, defaultLocale } from '../../../i18n';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';

export default function GemeentePage({ params }: { params: { locale: string } }) {
  const locale = params?.locale || defaultLocale;
  if (!locales.includes(locale)) notFound();
  const t = getTranslator(locale);
  return (
    <main>
      <Navigation t={t} locale={locale} />
      <h1>Gemeente</h1>
      <p>Static gemeente page content will go here.</p>
    </main>
  );
}
