import { Suspense } from 'react';
import HeroLeadForm from './HeroLeadForm';
import Image from 'next/image';

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
        <div className="hero-overlay" style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.6, zIndex: 5, inset: 0 }} />
        <Image fetchPriority="high" loading="eager" sizes="(max-width: 768px) 100vw, 1280px" src="/images/bg.jpg" alt="A beautiful garden with greenery" fill quality={50} style={{ objectFit: 'cover' }} />
        <div style={{ zIndex: 10, position: 'relative' }}>
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
        <div style={{ zIndex: 10, position: 'relative' }} className="hero-stats" aria-label="Statistieken">
          <div><div className="stat-num">150+</div><div className="stat-label">{translations.stats_gardeners}</div></div>
          <div><div className="stat-num">18</div><div className="stat-label">{translations.stats_municipalities}</div></div>
          <div><div className="stat-num">4.8</div><div className="stat-label">{translations.stats_rating}</div></div>
        </div>
      </div>

      <div className="hero-right" id="quote-form">
        <Suspense fallback={
          <div className="lead-form" style={{ minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: 'var(--forest-mid)' }}>
              <p style={{ fontFamily: 'var(--heading-font)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                {translations.form_title}
              </p>
              <p style={{ fontSize: '0.875rem' }}>{translations.loading || 'Laden...'}</p>
            </div>
          </div>
        }>
          <HeroLeadForm translations={translations} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
