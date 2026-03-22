import { notFound } from 'next/navigation';
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

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

// Simple translation function
function createTranslator(locale: string) {
  let messages: Record<string, any> = {};
  
  try {
    if (locale === 'nl') {
      messages = require(`../../../locales/nl/common.json`);
    } else {
      messages = require(`../../../locales/en/common.json`);
    }
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    messages = {
      form_eyebrow: "Gratis & vrijblijvend",
      form_title: "Word partner",
      form_subtitle: "Sluit je aan bij ons netwerk van professionele hoveniers."
    };
  }
  
  return (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Word Partner | Hovenier.frl - Voor Professionele Hoveniers',
      description: 'Sluit je aan bij Hovenier.frl en krijg toegang tot klanten in heel Friesland. Voor gecertificeerde hoveniers met ervaring. Vergroot je klantenkring!',
      keywords: ['hovenier partner', 'samenwerking', 'friesland', 'klanten', 'hoveniersbedrijf'],
    };
  } catch (error) {
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
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const t = createTranslator(validLocale);

  // Partner benefits data
  const benefits: Array<{
    title: string;
    description: string;
    icon: 'users' | 'money' | 'location' | 'badge';
  }> = [
    {
      title: "Meer klanten",
      description: "Krijg toegang tot klanten in heel Friesland die op zoek zijn naar betrouwbare hoveniers.",
      icon: "users"
    },
    {
      title: "Geen commissie",
      description: "Wij rekenen geen commissie af. Direct contact tussen jou en de klant.",
      icon: "money"
    },
    {
      title: "Lokale focus",
      description: "Word gekoppeld aan klanten in jouw werkgebied voor optimale efficiency.",
      icon: "location"
    },
    {
      title: "Kwaliteitsnetwerk",
      description: "Onderdeel worden van een selecte groep gecertificeerde hoveniers.",
      icon: "badge"
    }
  ];

  // Requirements list
  const requirements = [
    "Minimaal 3 jaar ervaring als hovenier",
    "KvK inschrijving en BTW nummer",
    "Geldige WA-verzekering",
    "Relevante certificaten (VCA, groendaken, etc.)",
    "Positieve referenties van eerdere klanten",
    "Werkgebied in Friesland of omliggende provincies"
  ];

  // FAQ data
  const faqs = [
    {
      question: "Wat kost het om partner te worden?",
      answer: "Het partnerschap is volledig gratis. Wij verdienen alleen geld als onze partners succesvol zijn. Er zijn geen aanmeldkosten, maandelijkse kosten of commissies op opdrachten."
    },
    {
      question: "Hoe worden klanten aan partners gekoppeld?",
      answer: "Klanten geven hun locatie en gewenste dienst op. Wij koppelen hen aan de meest geschikte partners in hun gebied op basis van specialisatie, beschikbaarheid en reviews."
    },
    {
      question: "Krijg ik gegarandeerd werk?",
      answer: "We kunnen geen werk garanderen, maar we zorgen ervoor dat je kiesbrieven krijgt toegestuurd die passen bij jouw diensten en werkgebied. De kwaliteit van je diensten bepaalt je succes."
    },
    {
      question: "Wat gebeurt er na de aanmelding?",
      answer: "We nemen binnen 48 uur contact met je op voor een kennismakingsgesprek. Daarna voeren we een referentiecheck uit en bekijken we je certificaten en verzekeringen."
    },
    {
      question: "Kan ik zelf bepalen welke opdrachten ik aannneem?",
      answer: "Ja, absoluut. Je bent altijd vrij om kiesbrieven af te slaan die niet passen bij je planning, specialisatie of werkgebied."
    }
  ];

  // Success stories data
  const successStories = [
    {
      name: "Jan Verhoeven",
      company: "Tuin & Bouw Heerenveen",
      quote: "Sinds ik partner ben bij Hovenier.frl is mijn klantenkring met 40% gegroeid. Vooral de groendak specialists vragen maken het verschil.",
      years: "2 jaar partner"
    },
    {
      name: "Maria Dijkstra",
      company: "Groene Vingers Leeuwarden", 
      quote: "De klanten die ik via het platform krijg zijn serieus en weten wat ze willen. Dat scheelt veel tijd en zorgt voor betere opdrachten.",
      years: "1.5 jaar partner"
    },
    {
      name: "Pieter de Jong",
      company: "Landschapshoven Smallingerland",
      quote: "Het partnerschap heeft me geholpen om me te specialiseren in tuinontwerp. De klanten waarderen de professionele aanpak.",
      years: "3 jaar partner"
    }
  ];

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: "Aanmelden",
      description: "Vul het partnerformulier in met je bedrijfsgegevens en ervaring."
    },
    {
      step: 2,
      title: "Screening",
      description: "Wij controleren je certificaten, verzekering en referenties."
    },
    {
      step: 3, 
      title: "Kennismaking",
      description: "Persoonlijk gesprek over jouw specialisaties en werkgebied."
    },
    {
      step: 4,
      title: "Live gaan",
      description: "Na goedkeuring ontvang je direct kiesbrieven van potentiële klanten."
    }
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
    form_note: t('form_note')
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: validLocale === 'en' ? 'Home' : 'Home', href: '/' },
    { label: validLocale === 'en' ? 'Partnership' : 'Samenwerking' }
  ];

  // Transform breadcrumbs for schema
  const breadcrumbSchemaItems = breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? `https://hovenier.frl${item.href}` : `https://hovenier.frl/${validLocale}/samenwerking`
  }));

  return (
    <>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <main>
        <PartnershipHero locale={validLocale} />
        <PartnershipBenefits benefits={benefits} />
        <PartnershipProcess processSteps={processSteps} />
        <PartnershipRequirements requirements={requirements} />
        <PartnershipTestimonials successStories={successStories} />
        <PartnershipFAQ faqs={faqs} />
        <PartnershipCTA translations={translations} locale={validLocale} />
      </main>

      <PartnershipSchema 
        locale={validLocale}
        faqs={faqs}
        url={`https://hovenier.frl/${validLocale}/samenwerking`}
      />
    </>
  );
}