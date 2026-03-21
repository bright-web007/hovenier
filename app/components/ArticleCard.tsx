'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  category?: {
    name: string;
    slug: string;
    color?: string;
  };
  author?: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  className?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  slug,
  imageUrl,
  category,
  author,
  publishedAt,
  readingTime,
  featured = false,
  className = ''
}: ArticleCardProps) {
  const t = useTranslations();
  
  const articleHref = `/artikelen/${slug}`;
  const categoryHref = category ? `/categorie/${category.slug}` : '#';
  
  // Format date
  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(publishedAt));

  return (
    <article className={`group bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-200 overflow-hidden ${featured ? 'ring-1 ring-primary-200' : ''} ${className}`}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
          {t('cards.featured') || 'Uitgelicht'}
        </div>
      )}
      
      {/* Article Image */}
      <div className="relative h-48 bg-neutral-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 right-3">
            <Link
              href={categoryHref}
              className={`inline-block px-2 py-1 text-xs font-medium rounded text-white transition-opacity hover:opacity-80`}
              style={{ backgroundColor: category.color || '#10b981' }}
            >
              {category.name}
            </Link>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
            <Link href={articleHref}>
              {title}
            </Link>
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        {/* Article Meta */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            {author && (
              <div className="flex items-center gap-2">
                {author.avatar ? (
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <span>{author.name}</span>
              </div>
            )}
            
            <time dateTime={publishedAt}>
              {formattedDate}
            </time>
            
            {readingTime && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} {t('cards.min_read') || 'min'}
              </span>
            )}
          </div>
          
          <Link
            href={articleHref}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors flex items-center gap-1"
          >
            {t('cards.read_more') || 'Lees meer'}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}