import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Tuinnieuws & Tips - Blog | Hovenier.frl',
  description: 'Ontdek de nieuwste tuintrends, seizoenstips en expert advies. Blijf op de hoogte van alles over tuinonderhoud en landschapsdesign in Friesland.',
  keywords: 'tuinnieuws, tuintips, hovenier blog, seizoen tuinadvies, tuinonderhoud tips, Friesland',
}

const exampleArticles = [
  {
    id: 1,
    title: 'Voorjaar 2024: 5 Essentiële Tuinklussen voor Maart',
    excerpt: 'De lente staat voor de deur! Ontdek welke werkzaamheden nu prioriteit hebben om je tuin klaar te maken voor het groeiseizoen.',
    category: 'seizoen',
    readTime: '4 min',
    publishDate: '2024-03-15',
    image: '/images/spring-garden-prep.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'Kosten Groendak: Subsidies & Besparingen in 2024',
    excerpt: 'Alles wat je moet weten over groendak subsidies, installatie kosten en lange termijn voordelen voor je portemonnee.',
    category: 'groendak',
    readTime: '6 min',
    publishDate: '2024-03-12',
    image: '/images/green-roof-costs.jpg',
    featured: false
  },
  {
    id: 3,
    title: '10 Onderhoudsarme Planten voor de Friese Tuin',
    excerpt: 'Weinig tijd voor tuinonderhoud? Deze planten gedijen perfect in het Friese klimaat met minimale zorg.',
    category: 'tips',
    readTime: '5 min',
    publishDate: '2024-03-08',
    image: '/images/low-maintenance-plants.jpg',
    featured: false
  }
]

const categories = [
  { name: 'Kosten', slug: 'kosten', count: 12 },
  { name: 'Seizoen', slug: 'seizoen', count: 18 },
  { name: 'Tips', slug: 'tips', count: 24 },
  { name: 'Groendak', slug: 'groendak', count: 8 },
  { name: 'Tuinontwerp', slug: 'tuinontwerp', count: 15 }
]

export default function NieuwsHubPage({ params: { locale } }: Props) {
  setRequestLocale(locale)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: locale === 'en' ? 'News' : 'Nieuws' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
            Tuinnieuws & Tips
          </h1>
          <p className="text-xl text-forest-700 mb-8">
            Expert advies en laatste trends voor uw tuin
          </p>
        </div>

        {/* Featured Article */}
        {exampleArticles.filter(article => article.featured).map(article => (
          <section key={article.id} className="max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-sage-600 text-white text-sm px-3 py-1 rounded-full">Uitgelicht</span>
                    <span className="ml-3 text-forest-600 text-sm">{article.category}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-forest-900 mb-4">
                    {article.title}
                  </h2>
                  <p className="text-forest-700 mb-6 text-lg">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-forest-600">
                      {article.readTime} leestijd • {article.publishDate}
                    </div>
                    <a 
                      href={`/nieuws/artikel-${article.id}`}
                      className="bg-sage-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-sage-700 transition-colors"
                    >
                      Lees Verder →
                    </a>
                  </div>
                </div>
                <div className="md:w-1/3 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Featured Image</p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-forest-900 mb-8">Recente Artikelen</h2>
            <div className="space-y-8">
              {exampleArticles.filter(article => !article.featured).map(article => (
                <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-200 p-4 flex items-center justify-center">
                      <p className="text-gray-500">Article Image</p>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-forest-100 text-forest-700 text-xs px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span className="ml-3 text-forest-600 text-sm">
                          {article.readTime} leestijd
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-forest-900 mb-3">
                        {article.title}
                      </h3>
                      <p className="text-forest-700 mb-4 text-sm">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-forest-600">{article.publishDate}</span>
                        <a 
                          href={`/nieuws/artikel-${article.id}`}
                          className="text-sage-600 font-medium hover:underline"
                        >
                          Lees meer →
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 text-center">
              <p className="text-forest-600 mb-4">Dit is een CMS-gedreven pagina</p>
              <p className="text-sm text-forest-500">
                Artikelen worden automatisch ingeladen van Muse CMS
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-forest-900 mb-4">Categorieën</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <a 
                    key={category.slug}
                    href={`/nieuws/categorie/${category.slug}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-sage-50 transition-colors"
                  >
                    <span className="text-forest-700">{category.name}</span>
                    <span className="bg-sage-100 text-sage-700 text-sm px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-sage-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-forest-900 mb-4">Tuinnieuwsbrief</h3>
              <p className="text-forest-700 text-sm mb-4">
                Ontvang maandelijks de beste tuintips en seizoensadvies in je inbox.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Je email adres"
                  className="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <button className="w-full bg-sage-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-sage-700 transition-colors">
                  Aanmelden
                </button>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-forest-900 mb-4">Populaire Artikelen</h3>
              <div className="space-y-4">
                <a href="#" className="block hover:bg-sage-50 p-2 rounded-lg transition-colors">
                  <h4 className="font-medium text-forest-900 text-sm mb-1">
                    Wat kost een hovenier per uur?
                  </h4>
                  <p className="text-forest-600 text-xs">15 maart 2024</p>
                </a>
                <a href="#" className="block hover:bg-sage-50 p-2 rounded-lg transition-colors">
                  <h4 className="font-medium text-forest-900 text-sm mb-1">
                    5 fouten bij tuinonderhoud
                  </h4>
                  <p className="text-forest-600 text-xs">10 maart 2024</p>
                </a>
                <a href="#" className="block hover:bg-sage-50 p-2 rounded-lg transition-colors">
                  <h4 className="font-medium text-forest-900 text-sm mb-1">
                    Groendak subsidies 2024
                  </h4>
                  <p className="text-forest-600 text-xs">8 maart 2024</p>
                </a>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-forest-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-forest-900 mb-4">Advies Nodig?</h3>
              <p className="text-forest-700 text-sm mb-4">
                Krijg direct antwoord op je tuinvragen van lokale experts.
              </p>
              <a 
                href="/#lead-form"
                className="block text-center bg-forest-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-forest-700 transition-colors"
              >
                Gratis Advies →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}