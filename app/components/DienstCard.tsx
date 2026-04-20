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
    <div className="dienst-card">
      <div className="dienst-card-image">
        <ImageComponent sizes="376px" fill style={{ objectFit: 'cover' }} loading="lazy" src={image} alt={`image of ${title}`} />
      </div>
      <div className="dienst-card-content">
        <div className="dienst-card-badge">
          <p className="dienst-card-badge-text">{subtitle}</p>
        </div>
        <p className="dienst-card-title">{title}</p>
        <p className="dienst-card-description">{description}</p>
        <Link href={localizePath(`/diensten/${id}`, locale as SupportedLocale)} className="service-learn-more">{t('dienst_card.learn_more')}</Link>
      </div>
    </div>
  );
}
