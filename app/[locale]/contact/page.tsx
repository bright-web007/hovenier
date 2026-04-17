import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'
import ContactHero from '../../components/ContactHero'
import ContactForm from '../../components/ContactForm'
import ContactInfo from '../../components/ContactInfo'
import ContactFAQ from '../../components/ContactFAQ'
import ContactResponseTime from '../../components/ContactResponseTime'
import ContactSchema from '../../components/schemas/ContactSchema'
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema'
import styles from '../../components/Contact.module.css'
import { getAbsoluteUrl, getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = createTranslator(locale)

  return {
    title: t('contact_page.meta_title'),
    description: t('contact_page.meta_description'),
    alternates: getLocaleAlternates('/contact', locale as SupportedLocale),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact' }
  ];

  // Transform breadcrumbs for schema
  const breadcrumbSchemaItems = breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? getAbsoluteUrl(item.href, locale as SupportedLocale) : getAbsoluteUrl('/contact', locale as SupportedLocale)
  }));

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <main className="section section-alt">
        <div className="section-inner">
          <ContactHero locale={locale} />
          
          <div className={styles.layout}>
            <ContactForm locale={locale} />
            
            <div className={styles.contactInfo}>
              <ContactInfo locale={locale} />
              <ContactFAQ locale={locale} />
              <ContactResponseTime locale={locale} />
            </div>
          </div>
        </div>
      </main>

      <ContactSchema 
        locale={locale}
        url={getAbsoluteUrl('/contact', locale as SupportedLocale)}
      />
    </>
  )
}
