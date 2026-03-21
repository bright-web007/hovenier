import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '../../../components/Navigation';
import Breadcrumbs from '../../../components/Breadcrumbs';
import RelatedArticles from '../../../components/RelatedArticles';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'nl';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Sample article data - in a real app this would come from CMS/database
const sampleArticles = [
  {
    id: 1,
    slug: 'tuinonderhoud-friesland-jaarrond',
    title: 'Tuinonderhoud in Friesland: Jaarrond schema',
    excerpt: 'Een complete gids voor tuinonderhoud in het Friese klimaat. Van voorjaar tot winter, dit is wat uw tuin nodig heeft.',
    content: `
      <p>Het Friese klimaat stelt specifieke eisen aan tuinonderhoud. Door de zeeinvloed, de kleigrond en de weersomstandigheden hebben tuinen in Friesland bijzondere verzorging nodig. In deze uitgebreide gids bespreken we alle seizoenen.</p>
      
      <h2>Voorjaar (maart-mei)</h2>
      <p>Het voorjaar is het belangrijkste seizoen voor tuinonderhoud in Friesland. Door de late winter kunnen vorst en wind veel schade hebben aangericht.</p>
      
      <h3>Belangrijkste taken:</h3>
      <ul>
        <li>Controleer planten op winterschade en snoei beschadigde takken</li>
        <li>Begin met bemesten vanaf half maart</li>
        <li>Zaai gras bij in kale plekken</li>
        <li>Plant nieuwe struiken en bomen (best goed)</li>
        <li>Start met onkruidbestrijding</li>
      </ul>
      
      <h2>Zomer (juni-augustus)</h2>
      <p>De zomermaanden vragen veel aandacht voor waterhuishouding en groeibeheersing.</p>
      
      <h3>Focus op:</h3>
      <ul>
        <li>Regelmatig water geven, vooral bij droge perioden</li>
        <li>Hagen snoeien na de broedperiode (na 15 juli)</li>
        <li>Gazon maaien (niet te kort door hitte)</li>
        <li>Onkruid wieden</li>
        <li>Dode bloemen wegknippen</li>
      </ul>
      
      <h2>Herfst (september-november)</h2>
      <p>De herfst is cruciaal voor voorbereiding op de Friese winter.</p>
      
      <h3>Voorbereiden op winter:</h3>
      <ul>
        <li>Bladeren harken en composteren</li>
        <li>Planten winterklaar maken</li>
        <li>Laatste keer gras maaien</li>
        <li>Bollen planten voor het voorjaar</li>
        <li>Tuinmeubelen opslaan</li>
      </ul>
      
      <h2>Winter (december-februari)</h2>
      <p>Ook in de winter is er onderhoud mogelijk en nodig.</p>
      
      <h3>Winter taken:</h3>
      <ul>
        <li>Bescherm gevoelige planten tegen vorst</li>
        <li>Strooi paden bij ijzel (niet met zout op planten)</li>
        <li>Plan verbeteringen voor het komende seizoen</li>
        <li>Onderhoud gereedschap</li>
        <li>Vogelvoer bijvullen</li>
      </ul>
      
      <h2>Specifiek voor Friese omstandigheden</h2>
      <p>De kleigrond in Friesland heeft speciale aandacht nodig:</p>
      <ul>
        <li>Verbeter drainage bij zware kleigrond</li>
        <li>Werk bij voorkeur bij droge grond</li>
        <li>Gebruik compost om de grondstructuur te verbeteren</li>
        <li>Plant zouttolerante soorten in kustgebieden</li>
      </ul>
    `,
    publishedAt: '2024-03-20',
    category: 'Onderhoud',
    tags: ['tuinonderhoud', 'friesland', 'seizoenen'],
    readTime: 8,
    author: 'Jan de Hovenier',
    image: '/blog/tuinonderhoud-schema.jpg'
  },
  {
    id: 2,
    slug: 'beste-planten-friese-klei',
    title: 'De beste planten voor Friese kleigrond',
    excerpt: 'Ontdek welke planten het beste gedijen in de karakteristieke kleigrond van Friesland.',
    content: `
      <p>Friese kleigrond kan uitdagend zijn voor tuiniers, maar met de juiste plantenkeuze creëert u een prachtige tuin die perfect past bij de lokale omstandigheden.</p>
      
      <h2>Kenmerken van Friese kleigrond</h2>
      <p>Kleigrond in Friesland heeft bijzondere eigenschappen:</p>
      <ul>
        <li>Hoge voedingswaarde</li>
        <li>Houdt vocht goed vast</li>
        <li>Kan compact worden</li>
        <li>Langzame opwarming in het voorjaar</li>
        <li>Kan wateroverlast geven</li>
      </ul>
      
      <h2>Beste planten voor kleigrond</h2>
      
      <h3>Bomen die kleigrond verdragen:</h3>
      <ul>
        <li>Wilg (Salix) - houdt van vochtige grond</li>
        <li>Esdoorn (Acer) - sterke wortels</li>
        <li>Linde (Tilia) - past zich goed aan</li>
        <li>Populier (Populus) - groeit snel</li>
      </ul>
      
      <h3>Struiken voor kleigrond:</h3>
      <ul>
        <li>Vlierbessen (Sambucus) - bloeit prachtig</li>
        <li>Kornoelje (Cornus) - winterbloei</li>
        <li>Gele kornoelje - heldergeel hout</li>
        <li>Liguster - groenblijvende haag</li>
      </ul>
      
      <h2>Grondverbetering</h2>
      <p>Verbeter zware kleigrond door:</p>
      <ul>
        <li>Compost mengen (jaarlijks)</li>
        <li>Grof zand toevoegen voor drainage</li>
        <li>Niet bewerken bij natte grond</li>
        <li>Mulchen om bodenleven te stimuleren</li>
      </ul>
    `,
    publishedAt: '2024-03-18',
    category: 'Planten',
    tags: ['kleigrond', 'planten', 'friesland'],
    readTime: 6,
    author: 'Maria Dijkstra',
    image: '/blog/friese-kleigrond-planten.jpg'
  },
  // Add more articles as needed...
];

export async function generateStaticParams() {
  return sampleArticles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { locale, slug } = await params;
    const article = sampleArticles.find(a => a.slug === slug);
    
    if (!article) {
      return {
        title: 'Artikel niet gevonden - Hovenier.frl',
        description: 'Het gevraagde artikel kon niet worden gevonden.'
      };
    }
    
    return {
      title: `${article.title} | Hovenier.frl`,
      description: article.excerpt,
      keywords: article.tags,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: 'article',
        url: `https://hovenier.frl/articles/${slug}`,
        publishedTime: article.publishedAt,
        authors: [article.author],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
      }
    };
  } catch (error) {
    return {
      title: 'Artikel - Hovenier.frl',
      description: 'Lees de nieuwste tuintips en hoveniers advies.'
    };
  }
}

export default async function ArticlePage({ params }: Props) {
  let validLocale = defaultLocale;
  let slug = '';
  
  try {
    const resolvedParams = await params;
    validLocale = resolvedParams.locale || defaultLocale;
    slug = resolvedParams.slug;
    
    if (!locales.includes(validLocale as any)) {
      validLocale = defaultLocale;
    }
  } catch (error) {
    console.error('Error parsing params:', error);
    notFound();
  }

  const article = sampleArticles.find(a => a.slug === slug);
  
  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Artikelen', href: '/articles' },
    { label: article.title }
  ];

  // Related articles (exclude current article)
  const relatedArticles = sampleArticles
    .filter(a => a.slug !== slug && (a.category === article.category || a.tags.some(tag => article.tags.includes(tag))))
    .slice(0, 3)
    .map(a => ({
      id: a.id.toString(),
      title: a.title,
      excerpt: a.excerpt,
      slug: a.slug,
      category: a.category,
      readTime: a.readTime,
      publishedAt: a.publishedAt
    }));

  return (
    <>
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <main>
        <article className="article-page">
          <header className="article-header">
            <div className="section-inner">
              <div className="article-header-content">
                <div className="article-meta-header">
                  <span className="article-category-header">{article.category}</span>
                  <span className="article-date-header">
                    {new Date(article.publishedAt).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h1 className="article-page-title">{article.title}</h1>
                <p className="article-page-excerpt">{article.excerpt}</p>
                <div className="article-author-info">
                  <span className="article-author-header">Door {article.author}</span>
                  <span className="article-read-time-header">{article.readTime} minuten lezen</span>
                </div>
              </div>
            </div>
          </header>

          <section className="article-content-section">
            <div className="section-inner">
              <div className="article-page-content">
                <div className="article-image-header">
                  <div className="article-image-placeholder-large">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <div 
                  className="article-text-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                <div className="article-tags">
                  <span className="article-tags-label">Tags:</span>
                  {article.tags.map(tag => (
                    <Link key={tag} href={`/articles/tag/${tag}`} className="article-tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <RelatedArticles 
          articles={relatedArticles} 
          title="Gerelateerde artikelen" 
        />
      )}

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Hovenier.frl",
              "logo": {
                "@type": "ImageObject",
                "url": "https://hovenier.frl/assets/logo-light.svg"
              }
            },
            "datePublished": article.publishedAt,
            "dateModified": article.publishedAt,
            "keywords": article.tags.join(", "),
            "articleSection": article.category,
            "wordCount": article.content.replace(/<[^>]*>/g, '').split(' ').length,
            "timeRequired": `PT${article.readTime}M`
          }),
        }}
      />
    </>
  );
}