import type { ArticleRecord } from '@/lib/articles';

interface ArticleSchemaProps {
  article: ArticleRecord;
  locale: string;
  url: string;
}

export default function ArticleSchema({ article, locale, url }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: locale === 'en' ? 'en-US' : 'nl-NL',
    url,
    articleSection: article.category.name,
    image: [`https://hovenier.frl${article.image}`],
    keywords: article.tags,
    author: {
      '@type': 'Organization',
      name: 'Hovenier.frl',
      url: 'https://hovenier.frl',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hovenier.frl',
      url: 'https://hovenier.frl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hovenier.frl/assets/logo-favicon.svg',
      },
    },
    mainEntityOfPage: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
