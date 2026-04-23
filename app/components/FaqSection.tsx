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
    <section className="section section-alt">
      <div className="section-inner">
        <div className="section-header-row section-centered">
          <h2 className="section-title section-title-centered">{title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #2A3E201F',
              padding: '24px',
            }}>
              <h3 style={{ fontFamily: 'var(--heading-font)', fontSize: '18px', fontWeight: '700', color: 'var(--forest)', margin: '0 0 12px 0' }}>
                {faq.question}
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '23px', color: 'var(--text-mid)', margin: 0 }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
