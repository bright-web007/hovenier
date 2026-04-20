import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import PartnershipHero from '../../components/PartnershipHero';
import PartnershipBenefits from '../../components/PartnershipBenefits';
import PartnershipProcess from '../../components/PartnershipProcess';
import PartnershipRequirements from '../../components/PartnershipRequirements';
import PartnershipTestimonials from '../../components/PartnershipTestimonials';
import PartnershipFAQ from '../../components/PartnershipFAQ';
import PartnershipCTA from '../../components/PartnershipCTA';
import PartnershipSchema from '../../components/schemas/PartnershipSchema';
import BreadcrumbSchema from '../../components/schemas/BreadcrumbSchema';
import { getAbsoluteUrl, getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/i18n';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

function isSupportedPageLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    const t = createTranslator(validLocale);
    
    return {
      title: t('partnership.meta_title'),
      description: t('partnership.meta_description'),
      keywords: t('partnership.meta_keywords_list').split(', '),
      alternates: getLocaleAlternates('/samenwerking', validLocale as SupportedLocale),
    };
  } catch {
    return {
      title: 'Word Partner - Hovenier.frl',
      description: 'Word partner van Hovenier.frl en vergroot je klantenkring.'
    };
  }
}

export default async function SamenwerkingPage({ params }: Props) {
  let validLocale = defaultLocale;
  
  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!isSupportedPageLocale(validLocale)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const t = createTranslator(validLocale);
  const isEn = validLocale === 'en';

  // Partner benefits data
  const benefits: Array<{
    title: string;
    description: string;
    icon: 'users' | 'money' | 'location' | 'badge';
  }> = [
    {
      title: t('partnership.benefit_clients_title'),
      description: t('partnership.benefit_clients_desc'),
      icon: 'users'
    },
    {
      title: t('partnership.benefit_commission_title'),
      description: t('partnership.benefit_commission_desc'),
      icon: 'money'
    },
    {
      title: t('partnership.benefit_local_title'),
      description: t('partnership.benefit_local_desc'),
      icon: 'location'
    },
    {
      title: t('partnership.benefit_quality_title'),
      description: t('partnership.benefit_quality_desc'),
      icon: 'badge'
    }
  ];

  // Requirements list
  const requirements = isEn ? [
    'Minimum 3 years experience as a gardener',
    'Chamber of Commerce registration and VAT number',
    'Valid liability insurance',
    'Relevant certificates (VCA, green roofs, etc.)',
    'Positive references from previous clients',
    'Work area in Friesland or surrounding provinces'
  ] : [
    'Minimaal 3 jaar ervaring als hovenier',
    'KvK inschrijving en BTW nummer',
    'Geldige WA-verzekering',
    'Relevante certificaten (VCA, groendaken, etc.)',
    'Positieve referenties van eerdere klanten',
    'Werkgebied in Friesland of omliggende provincies'
  ];

  // FAQ data
  const faqs = isEn ? [
    {
      question: 'What does it cost to become a partner?',
      answer: 'The partnership is completely free. We only earn money when our partners are successful. There are no registration fees, monthly costs or commissions on assignments.'
    },
    {
      question: 'How are clients matched with partners?',
      answer: 'Clients provide their location and desired service. We match them with the most suitable partners in their area based on specialization, availability and reviews.'
    },
    {
      question: 'Am I guaranteed work?',
      answer: "We cannot guarantee work, but we ensure you receive leads that match your services and work area. The quality of your services determines your success."
    },
    {
      question: 'What happens after registration?',
      answer: 'We will contact you within 48 hours for an introductory meeting. Then we conduct a reference check and review your certificates and insurance.'
    },
    {
      question: 'Can I choose which assignments I accept?',
      answer: 'Yes, absolutely. You are always free to decline leads that do not fit your schedule, specialization or work area.'
    }
  ] : [
    {
      question: 'Wat kost het om partner te worden?',
      answer: 'Het partnerschap is volledig gratis. Wij verdienen alleen geld als onze partners succesvol zijn. Er zijn geen aanmeldkosten, maandelijkse kosten of commissies op opdrachten.'
    },
    {
      question: 'Hoe worden klanten aan partners gekoppeld?',
      answer: 'Klanten geven hun locatie en gewenste dienst op. Wij koppelen hen aan de meest geschikte partners in hun gebied op basis van specialisatie, beschikbaarheid en reviews.'
    },
    {
      question: 'Krijg ik gegarandeerd werk?',
      answer: 'We kunnen geen werk garanderen, maar we zorgen ervoor dat je kiesbrieven krijgt toegestuurd die passen bij jouw diensten en werkgebied. De kwaliteit van je diensten bepaalt je succes.'
    },
    {
      question: 'Wat gebeurt er na de aanmelding?',
      answer: 'We nemen binnen 48 uur contact met je op voor een kennismakingsgesprek. Daarna voeren we een referentiecheck uit en bekijken we je certificaten en verzekeringen.'
    },
    {
      question: 'Kan ik zelf bepalen welke opdrachten ik aannneem?',
      answer: 'Ja, absoluut. Je bent altijd vrij om kiesbrieven af te slaan die niet passen bij je planning, specialisatie of werkgebied.'
    }
  ];

  // Success stories data
  const successStories = isEn ? [
    {
      name: 'Jan Verhoeven',
      company: 'Tuin & Bouw Heerenveen',
      quote: "Since I became a partner at Hovenier.frl, my client base has grown by 40%. Especially the green roof specialist requests make the difference.",
      years: '2 years partner'
    },
    {
      name: 'Maria Dijkstra',
      company: 'Groene Vingers Leeuwarden',
      quote: 'The clients I get through the platform are serious and know what they want. That saves a lot of time and leads to better assignments.',
      years: '1.5 years partner'
    },
    {
      name: 'Pieter de Jong',
      company: 'Landschapshoven Smallingerland',
      quote: 'The partnership has helped me specialize in garden design. The clients appreciate the professional approach.',
      years: '3 years partner'
    }
  ] : [
    {
      name: 'Jan Verhoeven',
      company: 'Tuin & Bouw Heerenveen',
      quote: 'Sinds ik partner ben bij Hovenier.frl is mijn klantenkring met 40% gegroeid. Vooral de groendak specialists vragen maken het verschil.',
      years: '2 jaar partner'
    },
    {
      name: 'Maria Dijkstra',
      company: 'Groene Vingers Leeuwarden',
      quote: 'De klanten die ik via het platform krijg zijn serieus en weten wat ze willen. Dat scheelt veel tijd en zorgt voor betere opdrachten.',
      years: '1.5 jaar partner'
    },
    {
      name: 'Pieter de Jong',
      company: 'Landschapshoven Smallingerland',
      quote: 'Het partnerschap heeft me geholpen om me te specialiseren in tuinontwerp. De klanten waarderen de professionele aanpak.',
      years: '3 jaar partner'
    }
  ];

  // Process steps
  const processSteps = isEn ? [
    { step: 1, title: 'Sign up', description: 'Fill in the partner form with your business details and experience.' },
    { step: 2, title: 'Screening', description: 'We check your certificates, insurance and references.' },
    { step: 3, title: 'Introduction', description: 'Personal meeting about your specializations and work area.' },
    { step: 4, title: 'Go live', description: 'After approval you immediately receive leads from potential clients.' }
  ] : [
    { step: 1, title: 'Aanmelden', description: 'Vul het partnerformulier in met je bedrijfsgegevens en ervaring.' },
    { step: 2, title: 'Screening', description: 'Wij controleren je certificaten, verzekering en referenties.' },
    { step: 3, title: 'Kennismaking', description: 'Persoonlijk gesprek over jouw specialisaties en werkgebied.' },
    { step: 4, title: 'Live gaan', description: 'Na goedkeuring ontvang je direct kiesbrieven van potentiële klanten.' }
  ];

  // Prepare translations for the lead form
  const translations = {
    form_eyebrow: t('form_eyebrow'),
    form_title: t('form_title'),
    form_subtitle: t('form_subtitle'),
    your_name: t('your_name'),
    municipality: t('municipality'),
    service: t('service'),
    phone_number: t('phone_number'),
    send_request: t('send_request'),
    form_note: t('form_note'),
    select_municipality: t('form.select_municipality'),
    what_do_you_need: t('form.what_do_you_need'),
    your_company: t('form.your_company'),
    loading: t('form.loading'),
    privacy_agreement: t('form.privacy_agreement'),
    privacy_link: t('form.privacy_link'),
    privacy_consent: t('form.privacy_consent'),
    services: {
      tuinonderhoud: validLocale === 'nl' ? 'Tuinonderhoud' : 'Garden Maintenance',
      tuinontwerp: validLocale === 'nl' ? 'Tuinontwerp' : 'Garden Design',
      'tuin-aanleggen': validLocale === 'nl' ? 'Tuin Aanleggen' : 'Garden Installation',
      stratenmaker: validLocale === 'nl' ? 'Bestrating' : 'Paving',
      groendak: validLocale === 'nl' ? 'Groendak' : 'Green Roof',
      overig: validLocale === 'nl' ? 'Overig' : 'Other'
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('partnership.breadcrumb_partnership') }
  ];

  // Transform breadcrumbs for schema
  const breadcrumbSchemaItems = breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? getAbsoluteUrl(item.href, validLocale as SupportedLocale) : getAbsoluteUrl('/samenwerking', validLocale as SupportedLocale)
  }));

  return (
    <>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <main>
        <PartnershipHero locale={validLocale} />
        <PartnershipBenefits benefits={benefits} locale={validLocale} />
        <PartnershipProcess processSteps={processSteps} locale={validLocale} />
        <PartnershipRequirements requirements={requirements} locale={validLocale} />
        <PartnershipTestimonials successStories={successStories} locale={validLocale} />
        <PartnershipFAQ faqs={faqs} locale={validLocale} />
        <PartnershipCTA translations={translations} locale={validLocale} />
      </main>

      <PartnershipSchema 
        locale={validLocale}
        faqs={faqs}
        url={getAbsoluteUrl('/samenwerking', validLocale as SupportedLocale)}
      />
    </>
  );
}
