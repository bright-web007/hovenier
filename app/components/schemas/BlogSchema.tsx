import React from 'react';
import type { ArticleRecord } from '@/lib/articles';
import { getArticlePath } from '@/lib/articles';
import { getAbsoluteUrl, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/i18n';

interface BlogSchemaProps {
  locale: string
  articles: ArticleRecord[]
  url: string
}

export default function BlogSchema({ locale, articles, url }: BlogSchemaProps) {
  const t = createTranslator(locale);
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Tuinnieuws & Tips - Hovenier.frl",
    "description": "Expert advies, tuintrends en seizoenstips van professionele hoveniers in Friesland",
    "url": url,
    "image": "https://hovenier.frl/images/blog-hero.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hovenier.frl/images/logo.png"
      }
    },
    "author": {
      "@type": "Organization",
      "name": "Hovenier.frl Expert Team",
      "url": "https://hovenier.frl/over-ons"
    },
    "inLanguage": locale === 'en' ? 'en-US' : 'nl-NL',
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "url": getAbsoluteUrl(getArticlePath(article.slug), locale as SupportedLocale),
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt,
      "author": {
        "@type": "Organization",
        "name": "Hovenier.frl"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hovenier.frl",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hovenier.frl/images/logo.png"
        }
      },
      "image": article.image || "https://hovenier.frl/images/default-article.jpg",
      "articleSection": article.category.name,
      "wordCount": article.readTime * 200,
      "timeRequired": `PT${article.readTime}M`,
      "keywords": [article.category.name, "tuinonderhoud", "hovenier", "friesland", "tuintips"]
    }))
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hovenier.frl Blog",
    "description": "Tuinnieuws, tips en expert advies van professionele hoveniers",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hovenier.frl",
      "url": "https://hovenier.frl"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://hovenier.frl"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('nieuws_page.breadcrumb'),
        "item": url
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2)
        }}
      />
    </>
  );
}
