import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Navigation from '../../../components/Navigation';
import Breadcrumbs from '../../../components/Breadcrumbs';
import BreadcrumbSchema from '../../../components/schemas/BreadcrumbSchema';
import ArticleSchema from '../../../components/schemas/ArticleSchema';
import AdSlot from '../../../components/AdSlot';
import styles from '../../../components/Blog.module.css';
import {
  formatArticleDate,
  getArticleBySlug,
  getArticleParagraphs,
  getArticlePath,
  getArticles,
  getRelatedArticles,
} from '@/lib/articles';
import { getAbsoluteUrl, getLocaleAlternates, localizePath, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/i18n';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);
  const t = createTranslator(locale);

  if (!article) {
    return {
      title: t('nieuws_page.article_not_found_title'),
      description: t('nieuws_page.article_not_found_description'),
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [article.category.name, ...article.tags, 'hovenier', 'tuintips', 'Friesland'],
    alternates: getLocaleAlternates(getArticlePath(slug), locale as SupportedLocale),
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [{ url: article.image }],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = createTranslator(locale);

  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  const paragraphs = getArticleParagraphs(article.body, article.excerpt);
  const relatedArticles = await getRelatedArticles(article.slug, article.category.slug);
  const articlePath = getArticlePath(article.slug);
  const articleUrl = getAbsoluteUrl(articlePath, locale as SupportedLocale);

  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('nieuws_page.breadcrumb'), href: '/nieuws' },
    { label: article.title },
  ];

  const breadcrumbSchemaItems = [
    { name: 'Home', url: getAbsoluteUrl('/', locale as SupportedLocale) },
    { name: t('nieuws_page.breadcrumb'), url: getAbsoluteUrl('/nieuws', locale as SupportedLocale) },
    { name: article.title, url: articleUrl },
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      <ArticleSchema article={article} locale={locale} url={articleUrl} />

      <main className={styles.articlePage}>
        <div className={styles.articleWrap}>
          <article className={styles.articleShell}>
            <header className={styles.articleHeader}>
              <div className={styles.articleMetaRow}>
              <Link
                href={localizePath(`/nieuws/categorie/${article.category.slug}`, locale as SupportedLocale)}
                className={styles.articlePill}
              >
                {article.category.name}
              </Link>
              <span className={styles.articleMetaText}>
                {formatArticleDate(article.publishedAt, locale)} · {article.readTime} {t('blog.min_read')}
              </span>
              </div>

              <h1 className={styles.articleHeroTitle}>{article.title}</h1>

              <p className={styles.articleLead}>{article.excerpt}</p>
            </header>

            <div className={styles.articleBody}>
            {paragraphs.map((paragraph, index) => (
                <div key={`${article.slug}-section-${index}`} className={styles.articleSection}>
                  <p className={styles.articleParagraph}>{paragraph}</p>
                {(index === 1 || index === 4) && (
                    <div className={styles.adSpacer}>
                    <AdSlot
                      slot={
                        index === 1
                          ? process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT || ''
                          : process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_INLINE_SLOT || ''
                      }
                      format="horizontal"
                    />
                  </div>
                )}
              </div>
            ))}
            </div>

            <section className={styles.articleFooterPanel}>
              <h2 className={styles.sectionTitle}>{t('nieuws_page.continue_reading')}</h2>
              <div className={styles.relatedGrid}>
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={localizePath(getArticlePath(relatedArticle.slug), locale as SupportedLocale)}
                  className={styles.relatedCard}
                >
                    <div className={styles.relatedCategory}>{relatedArticle.category.name}</div>
                    <h3 className={styles.relatedTitle}>{relatedArticle.title}</h3>
                    <p className={styles.relatedExcerpt}>{relatedArticle.excerpt}</p>
                </Link>
              ))}
              </div>
              <div className={styles.adSpacer}>
              <AdSlot
                slot={process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT || ''}
                format="rectangle"
              />
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
