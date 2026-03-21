import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Privacybeleid | Hovenier.frl - Gegevensbescherming & Privacy',
      description: 'Privacybeleid van Hovenier.frl. Hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen conform GDPR wetgeving.',
      robots: {
        index: true,
        follow: true
      }
    };
  } catch (error) {
    return {
      title: 'Privacybeleid - Hovenier.frl',
      description: 'Privacybeleid en gegevensbescherming informatie.'
    };
  }
}

export default async function PrivacyPolicyPage({ params }: Props) {
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

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacybeleid' }
  ];

  return (
    <>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main>
        <section className="section">
          <div className="section-inner">
            <div className="legal-content">
              <header className="legal-header">
                <h1 className="legal-title">Privacybeleid</h1>
                <p className="legal-subtitle">
                  Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </header>

              <div className="legal-sections">
                <section className="legal-section">
                  <h2 className="legal-section-title">1. Inleiding</h2>
                  <p className="legal-text">
                    Hovenier.frl ("wij", "ons", "onze") respecteert uw privacy en zet zich in voor de bescherming 
                    van uw persoonlijke gegevens. Dit privacybeleid legt uit hoe wij uw gegevens verzamelen, 
                    gebruiken en beschermen wanneer u onze website gebruikt.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">2. Verantwoordelijkheden</h2>
                  <p className="legal-text">
                    Hovenier.frl is de verwerkingsverantwoordelijke voor de verwerking van uw persoonlijke gegevens. 
                    Onze contactgegevens zijn:
                  </p>
                  <address className="legal-contact">
                    <strong>Hovenier.frl</strong><br />
                    E-mail: privacy@hovenier.frl<br />
                    Telefoon: +31 (0)515-123456
                  </address>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">3. Welke gegevens verzamelen wij?</h2>
                  
                  <h3 className="legal-subsection-title">3.1 Gegevens die u ons verstrekt</h3>
                  <ul className="legal-list">
                    <li>Naam en contactgegevens (e-mail, telefoonnummer)</li>
                    <li>Gemeente/woonplaats</li>
                    <li>Gewenste diensten</li>
                    <li>Eventuele bijzonderheden over uw aanvraag</li>
                  </ul>

                  <h3 className="legal-subsection-title">3.2 Automatisch verzamelde gegevens</h3>
                  <ul className="legal-list">
                    <li>IP-adres</li>
                    <li>Browser informatie</li>
                    <li>Paginabezoeken en klikgedrag</li>
                    <li>Datum en tijd van bezoek</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">4. Waarvoor gebruiken wij uw gegevens?</h2>
                  <ul className="legal-list">
                    <li>Het koppelen van klanten aan geschikte hoveniers</li>
                    <li>Het versturen van offertes en communicatie</li>
                    <li>Het verbeteren van onze dienstverlening</li>
                    <li>Het naleven van wettelijke verplichtingen</li>
                    <li>Het verzenden van nieuwsbrieven (met toestemming)</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">5. Rechtsgrond voor verwerking</h2>
                  <p className="legal-text">
                    Wij verwerken uw gegevens op basis van:
                  </p>
                  <ul className="legal-list">
                    <li><strong>Uitvoering overeenkomst:</strong> Voor het verlenen van onze diensten</li>
                    <li><strong>Gerechtvaardigd belang:</strong> Voor het verbeteren van onze diensten</li>
                    <li><strong>Toestemming:</strong> Voor nieuwsbrieven en marketing</li>
                    <li><strong>Wettelijke verplichting:</strong> Voor administratieve doeleinden</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">6. Delen van gegevens</h2>
                  <p className="legal-text">
                    Wij delen uw gegevens uitsluitend met:
                  </p>
                  <ul className="legal-list">
                    <li>Aangesloten hoveniers voor het versturen van offertes</li>
                    <li>Technische dienstverleners voor websiteonderhoud</li>
                    <li>Autoriteiten wanneer dit wettelijk verplicht is</li>
                  </ul>
                  <p className="legal-text">
                    Wij verkopen nooit uw gegevens aan derden voor marketing doeleinden.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">7. Gegevensbeveiliging</h2>
                  <p className="legal-text">
                    Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen:
                  </p>
                  <ul className="legal-list">
                    <li>Ongeautoriseerde toegang</li>
                    <li>Verlies of vernietiging</li>
                    <li>Onrechtmatige verwerking</li>
                    <li>Accidentele beschadiging</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">8. Bewaartermijnen</h2>
                  <ul className="legal-list">
                    <li><strong>Contactaanvragen:</strong> 2 jaar na laatste contact</li>
                    <li><strong>Nieuwsbrief registraties:</strong> Tot uitschrijving</li>
                    <li><strong>Website analytice:</strong> 26 maanden</li>
                    <li><strong>Administratie:</strong> 7 jaar conform fiscale wetgeving</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">9. Uw rechten</h2>
                  <p className="legal-text">
                    U heeft de volgende rechten betreffende uw persoonlijke gegevens:
                  </p>
                  <ul className="legal-list">
                    <li><strong>Inzagerecht:</strong> Opvragen welke gegevens wij van u hebben</li>
                    <li><strong>Rectificatie:</strong> Correctie van onjuiste gegevens</li>
                    <li><strong>Verwijdering:</strong> Het recht om vergeten te worden</li>
                    <li><strong>Beperking:</strong> Beperking van de verwerking</li>
                    <li><strong>Overdraagbaarheid:</strong> Overzetten van gegevens naar andere dienstverlener</li>
                    <li><strong>Bezwaar:</strong> Bezwaar maken tegen verwerking</li>
                  </ul>
                  <p className="legal-text">
                    Voor het uitoefenen van uw rechten kunt u contact met ons opnemen via privacy@hovenier.frl
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">10. Cookies</h2>
                  <p className="legal-text">
                    Onze website gebruikt verschillende soorten cookies:
                  </p>
                  <ul className="legal-list">
                    <li><strong>Noodzakelijke cookies:</strong> Voor basisfunctionaliteit</li>
                    <li><strong>Analytische cookies:</strong> Voor websitestatistieken (Google Analytics)</li>
                    <li><strong>Marketing cookies:</strong> Voor gepersonaliseerde advertenties (met toestemming)</li>
                  </ul>
                  <p className="legal-text">
                    U kunt cookies beheren via uw browserinstellingen.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">11. Klachten</h2>
                  <p className="legal-text">
                    Bij klachten over de verwerking van uw persoonlijke gegevens kunt u contact opnemen met 
                    privacy@hovenier.frl. U heeft ook het recht om een klacht in te dienen bij de Autoriteit 
                    Persoonsgegevens (AP).
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">12. Wijzigingen</h2>
                  <p className="legal-text">
                    Wij behouden ons het recht voor dit privacybeleid te wijzigen. Wijzigingen worden 
                    gepubliceerd op deze pagina. Wij adviseren u dit beleid regelmatig te raadplegen.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">13. Contact</h2>
                  <p className="legal-text">
                    Voor vragen over dit privacybeleid kunt u contact met ons opnemen:
                  </p>
                  <address className="legal-contact">
                    <strong>Privacy Officer</strong><br />
                    E-mail: privacy@hovenier.frl<br />
                    Telefoon: +31 (0)515-123456<br />
                    Website: <a href="https://hovenier.frl" className="legal-link">https://hovenier.frl</a>
                  </address>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}