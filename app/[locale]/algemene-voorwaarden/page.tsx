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
      title: 'Algemene Voorwaarden | Hovenier.frl - Gebruiksvoorwaarden',
      description: 'Algemene voorwaarden van Hovenier.frl. Voorwaarden voor het gebruik van onze hoveniersvergelijkingsdienst en platform.',
      robots: {
        index: true,
        follow: true
      }
    };
  } catch (error) {
    return {
      title: 'Algemene Voorwaarden - Hovenier.frl',
      description: 'Algemene voorwaarden en gebruiksvoorwaarden.'
    };
  }
}

export default async function TermsPage({ params }: Props) {
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
    { label: 'Algemene Voorwaarden' }
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
                <h1 className="legal-title">Algemene Voorwaarden</h1>
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
                  <h2 className="legal-section-title">1. Definities</h2>
                  <ul className="legal-list">
                    <li><strong>Hovenier.frl:</strong> Het platform beheerd door Hovenier.frl, geregistreerd in Nederland</li>
                    <li><strong>Gebruiker:</strong> Iedere natuurlijke of rechtspersoon die gebruik maakt van onze diensten</li>
                    <li><strong>Dienstverlener:</strong> Hoveniers aangesloten bij ons platform</li>
                    <li><strong>Platform:</strong> De website en bijbehorende diensten van Hovenier.frl</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">2. Toepasselijkheid</h2>
                  <p className="legal-text">
                    Deze algemene voorwaarden zijn van toepassing op alle diensten aangeboden door Hovenier.frl 
                    en op alle overeenkomsten tussen Hovenier.frl en gebruikers van het platform.
                  </p>
                  <p className="legal-text">
                    Door gebruik te maken van onze website en diensten, gaat u akkoord met deze voorwaarden.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">3. Onze Diensten</h2>
                  
                  <h3 className="legal-subsection-title">3.1 Platformdiensten</h3>
                  <p className="legal-text">
                    Hovenier.frl biedt een online platform waar klanten hoveniers kunnen vinden en contact kunnen opnemen 
                    voor offertes en dienstverlening. Wij faciliteren de verbinding tussen klanten en dienstverleners.
                  </p>

                  <h3 className="legal-subsection-title">3.2 Geen contractspartij</h3>
                  <p className="legal-text">
                    Hovenier.frl is geen partij bij de overeenkomsten tussen klanten en hoveniers. Alle afspraken, 
                    prijzen, en voorwaarden worden direct tussen klant en hovenier overeengekomen.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">4. Gebruik van het Platform</h2>
                  
                  <h3 className="legal-subsection-title">4.1 Toegestaan gebruik</h3>
                  <ul className="legal-list">
                    <li>Het platform mag alleen gebruikt worden voor het vinden van hoveniers</li>
                    <li>Alle verstrekte informatie moet juist en volledig zijn</li>
                    <li>U mag niet handelen in strijd met de wet of goede zeden</li>
                  </ul>

                  <h3 className="legal-subsection-title">4.2 Verboden gebruik</h3>
                  <ul className="legal-list">
                    <li>Het versturen van spam of ongewenste berichten</li>
                    <li>Het gebruik van geautomatiseerde systemen zonder toestemming</li>
                    <li>Het verstrekken van valse of misleidende informatie</li>
                    <li>Activiteiten die de werking van het platform kunnen verstoren</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">5. Registratie en Accounts</h2>
                  
                  <h3 className="legal-subsection-title">5.1 Voor Klanten</h3>
                  <p className="legal-text">
                    Klanten kunnen zonder registratie gebruik maken van de basisfunctionaliteiten van het platform.
                  </p>

                  <h3 className="legal-subsection-title">5.2 Voor Hoveniers</h3>
                  <p className="legal-text">
                    Hoveniers die zich willen aansluiten bij het platform doorlopen een screening proces waarbij 
                    certificaten, verzekeringen en referenties worden gecontroleerd.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">6. Intellectueel Eigendom</h2>
                  <p className="legal-text">
                    Alle content op het platform, inclusief teksten, afbeeldingen, logo's en software, is eigendom 
                    van Hovenier.frl of haar licentiegevers. Het is niet toegestaan content te kopiëren of te 
                    distribueren zonder toestemming.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">7. Aansprakelijkheid</h2>
                  
                  <h3 className="legal-subsection-title">7.1 Beperkte aansprakelijkheid</h3>
                  <p className="legal-text">
                    Hovenier.frl is uitsluitend aansprakelijk voor directe schade die aantoonbaar en uitsluitend 
                    het gevolg is van een toerekenbare tekortkoming in de nakoming van de overeenkomst.
                  </p>

                  <h3 className="legal-subsection-title">7.2 Uitgesloten aansprakelijkheid</h3>
                  <p className="legal-text">
                    Hovenier.frl is niet aansprakelijk voor:
                  </p>
                  <ul className="legal-list">
                    <li>De kwaliteit van diensten geleverd door aangesloten hoveniers</li>
                    <li>Indirecte schade, gevolgschade of bedrijfsschade</li>
                    <li>Schade door aangeboden offertes of uitgevoerde werkzaamheden</li>
                    <li>Technische storingen of uitval van het platform</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">8. Kosten en Betaling</h2>
                  
                  <h3 className="legal-subsection-title">8.1 Voor Klanten</h3>
                  <p className="legal-text">
                    Het gebruik van het platform is voor klanten kosteloos. Alle kosten voor uitgevoerde 
                    werkzaamheden worden direct tussen klant en hovenier afgehandeld.
                  </p>

                  <h3 className="legal-subsection-title">8.2 Voor Hoveniers</h3>
                  <p className="legal-text">
                    Hoveniers betalen geen kosten voor deelname aan het platform. Er worden geen commissies 
                    gerekend over verkregen opdrachten.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">9. Klachten en Geschillen</h2>
                  
                  <h3 className="legal-subsection-title">9.1 Klachtenprocedure</h3>
                  <p className="legal-text">
                    Klachten over onze dienstverlening kunnen worden ingediend via info@hovenier.frl. 
                    Wij streven ernaar alle klachten binnen 14 dagen te behandelen.
                  </p>

                  <h3 className="legal-subsection-title">9.2 Geschillen tussen gebruikers</h3>
                  <p className="legal-text">
                    Geschillen tussen klanten en hoveniers worden door partijen zelf opgelost. Hovenier.frl 
                    kan bemiddelen maar is niet verplicht dit te doen.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">10. Beëindiging</h2>
                  <p className="legal-text">
                    Hovenier.frl behoudt zich het recht voor toegang tot het platform te weigeren of te beëindigen 
                    bij overtreding van deze voorwaarden of bij misbruik van het platform.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">11. Wijzigingen</h2>
                  <p className="legal-text">
                    Hovenier.frl kan deze algemene voorwaarden te allen tijde wijzigen. Wijzigingen worden 
                    bekendgemaakt op de website en treden in werking 30 dagen na publicatie.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">12. Toepasselijk Recht</h2>
                  <p className="legal-text">
                    Op deze algemene voorwaarden en alle overeenkomsten met Hovenier.frl is Nederlands recht 
                    van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">13. Contact</h2>
                  <p className="legal-text">
                    Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:
                  </p>
                  <address className="legal-contact">
                    <strong>Hovenier.frl</strong><br />
                    E-mail: info@hovenier.frl<br />
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