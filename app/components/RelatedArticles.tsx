'use client';
import Link from 'next/link';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  readTime: number;
  publishedAt: string;
  imageUrl?: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
  className?: string;
  maxItems?: number;
}

export default function RelatedArticles({ 
  articles, 
  title = "Gerelateerde artikelen",
  className = "",
  maxItems = 3 
}: RelatedArticlesProps) {
  
  const displayedArticles = articles.slice(0, maxItems);

  if (displayedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`related-articles ${className}`}>
      <div className="related-articles-header">
        <h2 className="related-articles-title">{title}</h2>
      </div>
      
      <div className="related-articles-grid">
        {displayedArticles.map((article) => (
          <article key={article.id} className="related-article-card">
            <Link href={`/articles/${article.slug}`} className="related-article-link">
              <div className="related-article-image">
                {article.imageUrl ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="related-article-img"
                  />
                ) : (
                  <div className="related-article-placeholder">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="related-article-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
                <div className="related-article-category">
                  {article.category}
                </div>
              </div>
              
              <div className="related-article-content">
                <h3 className="related-article-title">{article.title}</h3>
                <p className="related-article-excerpt">{article.excerpt}</p>
                
                <div className="related-article-meta">
                  <span className="related-article-read-time">
                    {article.readTime} min lezen
                  </span>
                  <span className="related-article-date">
                    {new Date(article.publishedAt).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}