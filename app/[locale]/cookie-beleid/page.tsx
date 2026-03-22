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
      title: 'Cookiebeleid | Hovenier.frl - Cookies & Tracking',
      description: 'Cookiebeleid van Hovenier.frl. Informatie over welke cookies wij gebruiken en hoe u uw cookie-instellingen kunt beheren.',
      robots: {
        index: true,
        follow: true
      }
    };
  } catch (error) {
    return {
      title: 'Cookiebeleid - Hovenier.frl',
      description: 'Cookiebeleid en informatie over tracking.'
    };
  }
}

export default async function CookiePolicyPage({ params }: Props) {
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
    { label: 'Cookiebeleid' }
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
                <h1 className="legal-title">Cookiebeleid</h1>
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
                  <h2 className="legal-section-title">1. Wat zijn cookies?</h2>
                  <p className="legal-text">
                    Cookies zijn kleine tekstbestanden die op uw computer of mobiele apparaat worden geplaatst 
                    wanneer u onze website bezoekt. Cookies bevatten informatie die later opnieuw kan worden 
                    uitgelezen door onze website of door andere websites.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">2. Waarom gebruiken wij cookies?</h2>
                  <p className="legal-text">
                    Hovenier.frl gebruikt cookies voor verschillende doeleinden:
                  </p>
                  <ul className="legal-list">
                    <li>Het verbeteren van de functionaliteit van de website</li>
                    <li>Het analyseren van websiteverkeer en gebruikersgedrag</li>
                    <li>Het personaliseren van uw ervaring</li>
                    <li>Het mogelijk maken van sociale media functies</li>
                    <li>Het tonen van relevante advertenties</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">3. Welke cookies gebruiken wij?</h2>
                  
                  <h3 className="legal-subsection-title">3.1 Noodzakelijke cookies</h3>
                  <p className="legal-text">
                    Deze cookies zijn essentieel voor de werking van onze website en kunnen niet worden uitgeschakeld.
                  </p>
                  <div className="cookie-table">
                    <div className="cookie-entry">
                      <strong>Cookie naam:</strong> _session<br />
                      <strong>Doel:</strong> Sessie beheer<br />
                      <strong>Bewaartijd:</strong> Tot einde browsersessie<br />
                      <strong>Type:</strong> Eerste partij
                    </div>
                    <div className="cookie-entry">
                      <strong>Cookie naam:</strong> csrf_token<br />
                      <strong>Doel:</strong> Beveiliging tegen CSRF aanvallen<br />
                      <strong>Bewaartijd:</strong> 24 uur<br />
                      <strong>Type:</strong> Eerste partij
                    </div>
                  </div>

                  <h3 className="legal-subsection-title">3.2 Analytische cookies</h3>
                  <p className="legal-text">
                    Deze cookies helpen ons begrijpen hoe bezoekers onze website gebruiken. Alle data wordt 
                    geanonimiseerd verzameld.
                  </p>
                  <div className="cookie-table">
                    <div className="cookie-entry">
                      <strong>Cookie naam:</strong> _ga, _ga_*<br />
                      <strong>Doel:</strong> Google Analytics tracking<br />
                      <strong>Bewaartijd:</strong> 2 jaar<br />
                      <strong>Type:</strong> Derde partij (Google)
                    </div>
                    <div className="cookie-entry">
                      <strong>Cookie naam:</strong> _gid<br />
                      <strong>Doel:</strong> Google Analytics gebruiker identificatie<br />
                      <strong>Bewaartijd:</strong> 24 uur<br />
                      <strong>Type:</strong> Derde partij (Google)
                    </div>
                  </div>

                  <h3 className="legal-subsection-title">3.3 Marketing cookies</h3>
                  <p className="legal-text">
                    Deze cookies worden gebruikt voor het tonen van relevante advertenties en het meten van 
                    advertentie-effectiviteit. Deze cookies vereisen uw toestemming.
                  </p>
                  <div className="cookie-table">
                    <div className="cookie-entry">
                      <strong>Cookie naam:</strong> _fbp<br />
                      <strong>Doel:</strong> Facebook Pixel tracking<br />
                      <strong>Bewaartijd:</strong> 90 dagen<br />
                      <strong>Type:</strong> Derde partij (Facebook)
                    </div>
                  </div>

                  <h3 className="legal-subsection-title">3.4 Functionele cookies</h3>
                  <p className="legal-text">
                    Deze cookies verbeteren de functionaliteit van de website en zorgen voor een gepersonaliseerde ervaring.
                  </p>
                  <div className="cookie-table">
                    <div className="cookie-entry">
                      <strong>Cookie naam:</strong> lang_preference<br />
                      <strong>Doel:</strong> Taalvoorkeur onthouden<br />
                      <strong>Bewaartijd:</strong> 1 jaar<br />
                      <strong>Type:</strong> Eerste partij
                    </div>
                    <div className="cookie-entry">
                      <strong>Cookie naam:</strong> cookie_consent<br />
                      <strong>Doel:</strong> Cookie toestemming onthouden<br />
                      <strong>Bewaartijd:</strong> 1 jaar<br />
                      <strong>Type:</strong> Eerste partij
                    </div>
                  </div>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">4. Toestemming voor cookies</h2>
                  <p className="legal-text">
                    Wanneer u onze website voor het eerst bezoekt, vragen wij uw toestemming voor het plaatsen 
                    van niet-noodzakelijke cookies. U kunt uw keuze op elk moment wijzigen via de cookie-instellingen 
                    onderaan elke pagina.
                  </p>
                  
                  <h3 className="legal-subsection-title">4.1 Toestemming categorieën</h3>
                  <ul className="legal-list">
                    <li><strong>Noodzakelijk:</strong> Altijd geactiveerd (kan niet worden uitgeschakeld)</li>
                    <li><strong>Analytisch:</strong> Optioneel (helpt ons de website te verbeteren)</li>
                    <li><strong>Marketing:</strong> Optioneel (voor gepersonaliseerde advertenties)</li>
                    <li><strong>Functioneel:</strong> Optioneel (voor extra functionaliteiten)</li>
                  </ul>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">5. Cookies beheren en verwijderen</h2>
                  
                  <h3 className="legal-subsection-title">5.1 Via ons cookie-centrum</h3>
                  <p className="legal-text">
                    U kunt uw cookie-voorkeuren wijzigen via het cookie-centrum dat beschikbaar is via 
                    de link onderaan elke pagina van onze website.
                  </p>

                  <h3 className="legal-subsection-title">5.2 Via uw browser</h3>
                  <p className="legal-text">
                    U kunt cookies ook beheren via de instellingen van uw webbrowser. Hieronder vindt u 
                    instructies voor de meest gebruikte browsers:
                  </p>
                  <ul className="legal-list">
                    <li><a href="https://support.google.com/chrome/answer/95647" className="legal-link" target="_blank">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/nl/kb/cookies-informatie-websites" className="legal-link" target="_blank">Mozilla Firefox</a></li>
                    <li><a href="https://support.microsoft.com/nl-nl/help/17442/windows-internet-explorer-delete-manage-cookies" className="legal-link" target="_blank">Internet Explorer</a></li>
                    <li><a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" className="legal-link" target="_blank">Safari</a></li>
                  </ul>

                  <h3 className="legal-subsection-title">5.3 Gevolgen van uitschakelen</h3>
                  <p className="legal-text">
                    Het uitschakelen van cookies kan invloed hebben op de functionaliteit van onze website. 
                    Sommige functies werken mogelijk niet (meer) naar verwachting.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">6. Third-party diensten</h2>
                  
                  <h3 className="legal-subsection-title">6.1 Google Analytics</h3>
                  <p className="legal-text">
                    Wij gebruiken Google Analytics om websiteverkeer te analyseren. Google kan deze gegevens 
                    gebruiken conform hun privacybeleid. IP-adressen worden geanonimiseerd.
                  </p>

                  <h3 className="legal-subsection-title">6.2 Social Media</h3>
                  <p className="legal-text">
                    Onze website bevat social media knoppen van Facebook, Instagram en Twitter. Deze diensten 
                    kunnen cookies plaatsen conform hun eigen cookiebeleid.
                  </p>

                  <h3 className="legal-subsection-title">6.3 Cloudflare</h3>
                  <p className="legal-text">
                    Wij gebruiken Cloudflare voor beveiliging en performance. Cloudflare kan technische cookies 
                    plaatsen voor deze doeleinden.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">7. Beveiliging</h2>
                  <p className="legal-text">
                    Wij nemen passende technische en organisatorische maatregelen om cookies en de verzamelde 
                    gegevens te beschermen tegen ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">8. Wijzigingen in het cookiebeleid</h2>
                  <p className="legal-text">
                    Wij kunnen dit cookiebeleid van tijd tot tijd bijwerken. Wijzigingen worden gepubliceerd op 
                    deze pagina. Wij adviseren u dit beleid regelmatig te raadplegen om op de hoogte te blijven 
                    van eventuele wijzigingen.
                  </p>
                </section>

                <section className="legal-section">
                  <h2 className="legal-section-title">9. Contact</h2>
                  <p className="legal-text">
                    Voor vragen over ons cookiebeleid kunt u contact met ons opnemen:
                  </p>
                  <address className="legal-contact">
                    <strong>Hovenier.frl</strong><br />
                    E-mail: privacy@hovenier.frl<br />
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