import { Metadata } from 'next';
import LocalBusinessSchema from '@/app/components/schemas/LocalBusinessSchema';
import ServiceSchema from '@/app/components/schemas/ServiceSchema';
import FAQSchema from '@/app/components/schemas/FAQSchema';
import ArticleSchema from '@/app/components/schemas/ArticleSchema';
import BreadcrumbSchema from '@/app/components/schemas/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Schema Test Page - Development Only',
  robots: 'noindex, nofollow',
};

// Sample data for testing all schema types
const testData = {
  faqs: [
    {
      question: 'Wat kost tuinonderhoud per maand?',
      answer: 'De kosten voor tuinonderhoud variëren tussen €50-150 per maand,afhankelijk van de grootte van uw tuin en gewenste diensten.'
    },
    {
      question: 'Hoe vaak moet mijn tuin onderhouden worden?',
      answer: 'Voor optimale resultaten raden we maandelijks onderhoud aan tijdens het groeiseizoen (maart-oktober).'
    }
  ],
  breadcrumbs: [
    { name: 'Home', url: 'https://hovenier.frl' },
    { name: 'Services', url: 'https://hovenier.frl/services' },
    { name: 'Tuinonderhoud', url: 'https://hovenier.frl/services/tuinonderhoud' }
  ]
};

export default function SchemaTestPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* All Schema Implementations for Testing */}
      <LocalBusinessSchema 
        name="Hovenier.frl - Professionele Hoveniers Friesland"
        description="Vind de beste hovenier in Friesland. Professionele hoveniers voor tuinonderhoud, tuinontwerp en groendaken. Gratis offertes van gecertificeerde hoveniers."
        url="https://hovenier.frl"
        areaServed={['Leeuwarden', 'Heerenveen', 'Smallingerland', 'Súdwest-Fryslân']}
        serviceTypes={['Tuinonderhoud', 'Tuinontwerp', 'Groendaken', 'Boomverzorging']}
      />
      
      <ServiceSchema
        name="Professioneel Tuinonderhoud"
        description="Complete tuinonderhoud service met maandelijkse verzorging, snoeien en seizoensgebonden werkzaamheden"
        provider={{
          name: "Hovenier.frl",
          url: "https://hovenier.frl"
        }}
        areaServed="Friesland"
        priceRange="€50-150"
      />
      
      <FAQSchema faqs={testData.faqs} />
      
      <ArticleSchema
        headline="Complete Gids voor Tuinonderhoud in Friesland"
        description="Alles wat je moet weten over professioneel tuinonderhoud. Tips, kosten en het vinden van de juiste hovenier."
        author={{ name: "Hovenier Expert" }}
        publisher={{
          name: "Hovenier.frl",
          url: "https://hovenier.frl"
        }}
        datePublished="2024-03-21"
        url="https://hovenier.frl/artikelen/tuinonderhoud-gids"
      />
      
      <BreadcrumbSchema items={testData.breadcrumbs} />

      {/* Visual Test Content */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">Schema.org Test Page</h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">🔬 Development Testing</h2>
          <p className="text-blue-700 mb-4">
            This page tests all Schema.org implementations. Use these tools to validate:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-blue-700">
            <li>
              <strong>Google Rich Results Test:</strong>{' '}
              <a 
                href="https://search.google.com/test/rich-results" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                search.google.com/test/rich-results
              </a>
            </li>
            <li>
              <strong>Schema Markup Validator:</strong>{' '}
              <a 
                href="https://validator.schema.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                validator.schema.org
              </a>
            </li>
            <li>
              <strong>Google Search Console:</strong> Monitor actual search appearance
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">✅ Schema Types Tested</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                LocalBusiness (Organization)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Service (Individual Services)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                FAQPage (Q&A Content)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Article (Blog Content)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                BreadcrumbList (Navigation)
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🚀 Performance Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Security Headers (CSP, HSTS, XSS)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Image Optimization (WebP, AVIF)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Compression & Caching
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Bundle Optimization
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Note</h3>
          <p className="text-yellow-700">
            This test page is excluded from search engines via robots meta tag and should only be used during development.
            Remove or restrict access before production deployment.
          </p>
        </div>
      </div>
    </div>
  );
}