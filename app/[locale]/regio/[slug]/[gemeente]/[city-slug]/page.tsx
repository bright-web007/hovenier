import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getLocaleAlternates, SupportedLocale } from "@/lib/locale-utils";
import { Metadata } from 'next';


type Props = {
  params: Promise<{ locale: string }>;
};


export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale || defaultLocale;

  return {
    title: validLocale === 'nl' ? 'Hoveniersdiensten in Friesland | Tuinonderhoud & Tuinaanleg | Hovenier.frl' : 'Garden Services in Friesland | Maintenance & Design | Hovenier.frl',
    description: validLocale === 'nl' ? 'Professionele hoveniersdiensten in Friesland. Van tuinonderhoud tot complete tuinaanleg. Betrouwbare specialisten voor alle tuinwerkzaamheden. Vraag gratis offerte aan.' : 'Professional garden services in Friesland. From garden maintenance to complete garden design. Reliable specialists for all garden work. Request free quote.',
    keywords: validLocale === 'nl' ? ['hoveniersdiensten', 'tuinonderhoud', 'tuinaanleg', 'tuinontwerp', 'friesland', 'hovenier'] : ['garden services', 'garden maintenance', 'garden design', 'landscaping', 'friesland'],
    alternates: getLocaleAlternates('/diensten', validLocale as SupportedLocale),
  };
}

const Page = async ({ params }: Props) => {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const breadcrumbItems = [
        { label: validLocale === 'nl' ? 'Home' : 'Home', href: '/' },
        { label: validLocale === 'nl' ? 'Diensten' : 'Services' }
    ];

    return (
        <>
        <Breadcrumbs items={breadcrumbItems} />
        </>
    )
}

export default Page;