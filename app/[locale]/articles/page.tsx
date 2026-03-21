import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string }>;
};

// Sample articles data - in a real application, this would come from a CMS or database
const sampleArticles = [
  {
    id: 1,
    slug: 'tuinonderhoud-friesland-jaarrond',
    title: 'Tuinonderhoud in Friesland: Jaarrond schema',
    excerpt: 'Een complete gids voor tuinonderhoud in het Friese klimaat. Van voorjaar tot winter, dit is wat uw tuin nodig heeft.',
    content: '',
    publishedAt: '2024-03-20',
    category: 'Onderhoud',
    tags: ['tuinonderhoud', 'friesland', 'seizoenen'],
    readTime: 8,
    author: 'Jan de Hovenier',
    featured: true,
    image: '/blog/tuinonderhoud-schema.jpg'
  },
  {
    id: 2,
    slug: 'beste-planten-friese-klei',
    title: 'De beste planten voor Friese kleigrond',
    excerpt: 'Ontdek welke planten het beste gedijen in de karakteristieke kleigrond van Friesland en hoe u ze moet verzorgen.',
    content: '',
    publishedAt: '2024-03-18',
    category: 'Planten',
    tags: ['kleigrond', 'planten', 'friesland'],
    readTime: 6,
    author: 'Maria Dijkstra',
    featured: true,
    image: '/blog/friese-kleigrond-planten.jpg'
  },
  {
    id: 3,
    slug: 'groendak-subsidies-friesland-2024',
    title: 'Groendak subsidies Friesland 2024: Complete gids',
    excerpt: 'Overzicht van alle beschikbare subsidies voor groendaken in Friese gemeenten. Van aanvraag tot uitbetaling.',
    content: '',
    publishedAt: '2024-03-15',
    category: 'Subsidies',
    tags: ['groendak', 'subsidie', 'friesland', '2024'],
    readTime: 10,
    author: 'Pieter de Jong',
    featured: false,
    image: '/blog/groendak-subsidies.jpg'
  },
  {
    id: 4,
    slug: 'tuinontwerp-trends-2024',
    title: 'Tuinontwerp trends 2024: Wat is populair?',
    excerpt: 'De nieuwste trends in tuinontwerp voor 2024. Van duurzame materialen tot klimaatbestendige beplanting.',
    content: '',
    publishedAt: '2024-03-12',
    category: 'Ontwerp',
    tags: ['tuinontwerp', 'trends', '2024'],
    readTime: 7,
    author: 'Lisa van der Berg',
    featured: false,
    image: '/blog/tuinontwerp-trends.jpg'
  },
  {
    id: 5,
    slug: 'bomen-snoeien-wanneer-hoe',
    title: 'Bomen snoeien: wanneer en hoe doe je dat?',
    excerpt: 'Praktische gids voor het snoeien van bomen. Leer de juiste technieken en het beste tijdstip voor verschillende boomsoorten.',
    content: '',
    publishedAt: '2024-03-10',
    category: 'Onderhoud',
    tags: ['bomen', 'snoeien', 'onderhoud'],
    readTime: 9,
    author: 'Kees Boersma',
    featured: false,
    image: '/blog/bomen-snoeien.jpg'
  },
  {
    id: 6,
    slug: 'wateroverlast-tuin-voorkomen',
    title: 'Wateroverlast in de tuin voorkomen en oplossen',
    excerpt: 'Praktische tips om wateroverlast in uw tuin te voorkomen. Van drainage tot plantenkeuze.',
    content: '',
    publishedAt: '2024-03-08',
    category: 'Problemen',
    tags: ['wateroverlast', 'drainage', 'problemen'],
    readTime: 6,
    author: 'Anne Visser',
    featured: false,
    image: '/blog/wateroverlast-tuin.jpg'
  }
];

const categories = [
  { name: 'Onderhoud', count: 12 },
  { name: 'Ontwerp', count: 8 },
  { name: 'Planten', count: 15 },
  { name: 'Subsidies', count: 4 },
  { name: 'Problemen', count: 7 }
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale } = await params;
    const validLocale = locale || defaultLocale;
    
    return {
      title: 'Tuinartikelen & Hoveniers Blog | Hovenier.frl - Tips & Advies',
      description: 'Ontdek nuttige tuintips, seizoensadvies en hoveniers expertise. Artikelen over tuinonderhoud, plantenkeuze en tuinontwerp in Friesland.',
      keywords: [
        'tuintips',
        'hoveniers blog',
        'tuinonderhoud',
        'tuinontwerp',
        'friesland',
        'seizoensadvies',
        'plantenkeuze'
      ],
      openGraph: {
        title: 'Tuinartikelen & Hoveniers Blog - Hovenier.frl',
        description: 'Nuttige tuintips en hoveniers expertise uit Friesland',
        type: 'website',
        url: 'https://hovenier.frl/articles'
      }
    };
  } catch (error) {
    return {
      title: 'Artikelen - Hovenier.frl',
      description: 'Tuinartikelen en hoveniers tips.'
    };
  }
}

export default async function ArticlesPage({ params }: Props) {
  let validLocale = defaultLocale;
  
  try {
    const { locale } = await params;
    validLocale = locale || defaultLocale;
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Artikelen' }
  ];

  const featuredArticles = sampleArticles.filter(article => article.featured);
  const regularArticles = sampleArticles.filter(article => !article.featured);

  return (
    <>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main>
        <section className="section">
          <div className="section-inner">
            <div className="articles-header">
              <h1 className="articles-title">Tuintips & Hoveniers Blog</h1>
              <p className="articles-subtitle">
                Ontdek nuttige tips, seizoensadvies en expertise van professionele hoveniers uit Friesland. 
                Van tuinonderhoud tot complete tuinontwerpen.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="section section-alt">
            <div className="section-inner">
              <h2 className="section-title">Uitgelichte artikelen</h2>
              <div className="featured-articles-grid">
                {featuredArticles.map(article => (
                  <article key={article.id} className="featured-article-card">
                    <div className="featured-article-image">
                      <div className="article-image-placeholder">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="featured-article-content">
                      <div className="article-meta">
                        <span className="article-category">{article.category}</span>
                        <span className="article-date">
                          {new Date(article.publishedAt).toLocaleDateString('nl-NL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="featured-article-title">
                        <Link href={`/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="featured-article-excerpt">{article.excerpt}</p>
                      <div className="article-footer">
                        <span className="article-author">Door {article.author}</span>
                        <span className="article-read-time">{article.readTime} min lezen</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles */}
        <section className="section">
          <div className="section-inner">
            <div className="articles-content">
              {/* Sidebar - Categories */}
              <aside className="articles-sidebar">
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Categorieën</h3>
                  <ul className="category-list">
                    {categories.map(category => (
                      <li key={category.name} className="category-item">
                        <Link href={`/articles/category/${category.name.toLowerCase()}`} className="category-link">
                          <span className="category-name">{category.name}</span>
                          <span className="category-count">({category.count})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sidebar-section">
                  <h3 className="sidebar-title">Recent Tips</h3>
                  <ul className="recent-articles-list">
                    {sampleArticles.slice(0, 3).map(article => (
                      <li key={article.id} className="recent-article-item">
                        <Link href={`/articles/${article.slug}`} className="recent-article-link">
                          <span className="recent-article-title">{article.title}</span>
                          <span className="recent-article-date">
                            {new Date(article.publishedAt).toLocaleDateString('nl-NL')}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Main Articles Grid */}
              <div className="articles-main">
                <h2 className="section-title">Alle artikelen</h2>
                <div className="articles-grid">
                  {sampleArticles.map(article => (
                    <article key={article.id} className="article-card">
                      <div className="article-image">
                        <div className="article-image-placeholder">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="article-content">
                        <div className="article-meta">
                          <span className="article-category">{article.category}</span>
                          <span className="article-read-time">{article.readTime} min</span>
                        </div>
                        <h3 className="article-title">
                          <Link href={`/articles/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="article-excerpt">{article.excerpt}</p>
                        <div className="article-footer">
                          <span className="article-author">{article.author}</span>
                          <span className="article-date">
                            {new Date(article.publishedAt).toLocaleDateString('nl-NL')}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
