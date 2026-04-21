import React from 'react';

type Benefit = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type BenefitsSectionProps = {
  title: string;
  subtitle: string;
  benefits: Benefit[];
  backgroundColor?: string;
};

export default function BenefitsSection({
  title,
  subtitle,
  benefits,
  backgroundColor = 'var(--cream-dark)',
}: BenefitsSectionProps) {
  return (
    <section style={{ backgroundColor, width: '100%' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '113px 1rem 80px 1rem', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontFamily: 'var(--heading-font)', fontSize: '44px', fontWeight: 700, color: 'var(--forest-deep)', margin: 0, letterSpacing: '-0.44px' }}>
            {title}
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '26px', margin: 0, fontWeight: 400 }}>
            {subtitle}
          </p>
        </div>

        <div className="grid-responsive-2-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {benefits.map((benefit, index) => (
            <div key={index} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #2A3E201F', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--forest-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {benefit.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--forest)', margin: 0 }}>{index + 1}.</p>
                <h3 style={{ fontFamily: 'var(--heading-font)', fontSize: '18px', fontWeight: 700, color: 'var(--forest)', margin: 0 }}>
                  {benefit.title}
                </h3>
              </div>
              <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: '22.5px', color: 'var(--text-mid)', maxWidth: '338px', margin: 0 }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
