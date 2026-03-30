import HeroLeadForm from './HeroLeadForm';

interface HeroProps {
  translations: {
    hero_eyebrow: string;
    hero_subtitle: string;
    free_quote: string;
    no_obligations: string;
    certified_gardeners: string;
    form_eyebrow: string;
    form_title: string;
    form_subtitle: string;
    your_name: string;
    municipality: string;
    service: string;
    phone_number: string;
    send_request: string;
    form_note: string;
    select_municipality: string;
    what_do_you_need: string;
    your_company: string;
    loading: string;
    privacy_agreement: string;
    privacy_link: string;
    privacy_consent: string;
    services: {
      tuinonderhoud: string;
      tuinontwerp: string;
      'tuin-aanleggen': string;
      stratenmaker: string;
      groendak: string;
      overig: string;
    };
    stats_gardeners: string;
    stats_municipalities: string;
    stats_rating: string;
  };
  locale: string;
}

export default function Hero({ translations, locale }: HeroProps) {
  return (
    <section className="hero" aria-label="Hovenier vinden in Friesland">
      <div className="hero-left">
        <div className="hero-texture" aria-hidden="true"></div>
        <div className="hero-leaf" aria-hidden="true"></div>
        <div className="hero-leaf2" aria-hidden="true"></div>
        <div>
          <p className="hero-eyebrow">{translations.hero_eyebrow}</p>
          <h1 className="hero-h1">
            {locale === 'nl' ? (
              <>Uw droomtuin<br />begint met de<br /><em>juiste hovenier</em></>
            ) : (
              <>Your dream garden<br />starts with the<br /><em>right gardener</em></>
            )}
          </h1>
          <p className="hero-sub">{translations.hero_subtitle}</p>
          <div className="hero-badges" role="list">
            <div className="hero-badge" role="listitem">
              <span className="badge-dot" aria-hidden="true"></span>
              {translations.free_quote}
            </div>
            <div className="hero-badge" role="listitem">
              <span className="badge-dot" aria-hidden="true"></span>
              {translations.no_obligations}
            </div>
            <div className="hero-badge" role="listitem">
              <span className="badge-dot" aria-hidden="true"></span>
              {translations.certified_gardeners}
            </div>
          </div>
        </div>
        <div className="hero-stats" aria-label="Statistieken">
          <div><div className="stat-num">150+</div><div className="stat-label">{translations.stats_gardeners}</div></div>
          <div><div className="stat-num">18</div><div className="stat-label">{translations.stats_municipalities}</div></div>
          <div><div className="stat-num">4.8</div><div className="stat-label">{translations.stats_rating}</div></div>
        </div>
      </div>

      <div className="hero-right" id="quote-form">
        <HeroLeadForm translations={translations} locale={locale} />
      </div>
    </section>
  );
}
