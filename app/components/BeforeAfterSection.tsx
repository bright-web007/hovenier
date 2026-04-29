import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';

interface MetadataItem {
  label: string;
  value: string;
}

interface BeforeAfterSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  metadata: MetadataItem[];
}

export default function BeforeAfterSection({
  eyebrow,
  title,
  description,
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  metadata,
}: BeforeAfterSectionProps) {
  return (
    <section style={{ backgroundColor: 'var(--cream-dark)', width: '100%' }}>
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '80px 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {/* Eyebrow with dashes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                width: '28px',
                height: '0.5px',
                backgroundColor: 'var(--sage)',
                display: 'block',
              }}
            />
            <span
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--sage)',
              }}
            >
              {eyebrow}
            </span>
            <span
              style={{
                width: '28px',
                height: '0.5px',
                backgroundColor: 'var(--sage)',
                display: 'block',
              }}
            />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'var(--heading-font)',
              fontSize: 'clamp(32px, 5vw, 44px)',
              fontWeight: 700,
              color: 'var(--forest-deep)',
              margin: 0,
              letterSpacing: '-0.44px',
              lineHeight: '1.1',
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-muted)',
              lineHeight: '26px',
              margin: 0,
              fontWeight: 400,
              maxWidth: '560px',
            }}
          >
            {description}
          </p>
        </div>

        {/* Slider */}
        <BeforeAfterSlider
          beforeImage={beforeImage}
          afterImage={afterImage}
          beforeLabel={beforeLabel}
          afterLabel={afterLabel}
        />

        {/* Metadata row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 24px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {metadata.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span
                  style={{
                    color: 'var(--text-faint)',
                    fontSize: '13px',
                    userSelect: 'none',
                  }}
                >
                  ·
                </span>
              )}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-mid)',
                    lineHeight: '100%',
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'var(--text-muted)',
                    lineHeight: '100%',
                  }}
                >
                  {item.value}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
