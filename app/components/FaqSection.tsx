interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  faqs: FaqItem[];
}

export default function FaqSection({ title, faqs }: FaqSectionProps) {
  return (
    <section style={{ backgroundColor: 'var(--cream)', width: '100%' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '80px 1rem', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <h2 style={{
          fontFamily: 'var(--heading-font)',
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--forest-deep)',
          margin: 0,
          letterSpacing: '-0.44px',
          textAlign: 'center',
        }}>
          {title}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              border: '1px solid #2A3E201F',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
            }}>
              <p style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--forest)',
                margin: 0,
              }}>
                {faq.question}
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '24px',
                color: 'var(--text-mid)',
                margin: 0,
                fontWeight: 400,
              }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
