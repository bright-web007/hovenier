import { getTranslator, locales, defaultLocale } from '../../../i18n';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';

export default function GemeentePage({ params }: { params: { locale: string } }) {
  const locale = params?.locale || defaultLocale;
  if (!locales.includes(locale as any)) notFound();
  const t = getTranslator(locale as "nl" | "en");
  return (
    <main>
      <Navigation locale={locale as "nl" | "en"} />
      <h1>Gemeente</h1>
      <p>Static gemeente page content will go here.</p>
    </main>
  );
}
