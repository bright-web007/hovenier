import Link from 'next/link';
import ImageComponent from '@/app/components/ImageComponent';
import { localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/i18n';

interface DienstCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  locale?: string;
}

export default function DienstCard({ id, title, subtitle, description, image, locale = 'nl' }: DienstCardProps) {
  const t = createTranslator(locale);

  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: '16px',
      boxShadow: '0px 4px 20px 0px #0000000F',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        width: '100%',
        height: '200px',
        position: 'relative',
      }}>
        <ImageComponent sizes="376px" fill style={{ objectFit: 'cover' }} loading="lazy" src={image} alt={`image of ${title}`} />
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 24px 24px 24px',
        gap: '12px',
      }}>
        <div style={{ backgroundColor: '#16423C14', padding: '4px 10px', borderRadius: '4px', width: 'fit-content' }}>
          <p style={{ fontSize: '11px', lineHeight: '100%', color: '#16423C', fontWeight: 600 }}>{subtitle}</p>
        </div>
        <p style={{ fontWeight: 700, fontSize: '22px', color: '#1F2937', lineHeight: '100%', letterSpacing: '-0.3px' }}>{title}</p>
        <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '22px', fontWeight: 400 }}>{description}</p>
        <Link href={localizePath(`/diensten/${id}`, locale as SupportedLocale)} className="service-learn-more">{t('dienst_card.learn_more')}</Link>
      </div>
    </div>
  );
}
