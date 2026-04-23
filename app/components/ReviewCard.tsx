import Image from 'next/image';

type ReviewCardProps = {
  quote: string;
  name: string;
  subtitle: string;
  image?: string;
  rating?: number;
};

export default function ReviewCard({ quote, name, subtitle, image, rating = 5 }: ReviewCardProps) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      border: '1px solid #2A3E201F',
    }}>
      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#E5A100">
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.68l5.34-.78L10 1z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        color: 'var(--text-mid)',
        fontSize: '15px',
        lineHeight: '24px',
        fontWeight: 400,
        margin: 0,
        flex: 1,
      }}>
        &ldquo;{quote}&rdquo;
      </p>

      <div style={{ width: '100%', height: '1px', backgroundColor: '#2A3E2014' }}/>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {image ? (
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            style={{ borderRadius: '50%', objectFit: 'cover', width: '48px', height: '48px' }}
          />
        ) : (
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--forest-light, #D5DDD0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--forest)',
          }}>
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--forest)' }}>{name}</p>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
