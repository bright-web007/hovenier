import NewLeadForm from '@/app/components/NewLeadForm';

type LeadFormSectionProps = {
  title: string;
  subtitle: string;
  locale: string;
  translations: {
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
  };
  prefillMunicipality?: string;
  backgroundColor?: string;
};

export default function LeadFormSection({
  title,
  subtitle,
  locale,
  translations,
  prefillMunicipality,
  backgroundColor = 'var(--cream-light, #F5F1EA)',
}: LeadFormSectionProps) {
  return (
    <section style={{ backgroundColor, width: '100%' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--heading-font)',
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--forest)',
            marginBottom: '1rem',
          }}>
            {title}
          </h2>
          <p style={{
            color: 'var(--forest-mid)',
            fontSize: '18px',
          }}>
            {subtitle}
          </p>
        </div>

        <div style={{
          background: '#F9F7F2',
          borderRadius: '12px',
          padding: '32px',
          margin: '0 auto',
          width: '100%',
        }}>
          <NewLeadForm
            translations={translations}
            locale={locale}
            prefillMunicipality={prefillMunicipality}
          />
        </div>
      </div>
    </section>
  );
}
