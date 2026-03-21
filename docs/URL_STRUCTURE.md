# URL Structure & SEO Strategy - Hovenier.frl

## Domain & Base Configuration
- **Primary Domain**: hovenier.frl
- **Base URL**: https://hovenier.frl
- **Default Locale**: Dutch (nl) - served at root path
- **Secondary Locale**: English (en) - served at /en/ prefix

## URL Structure Patterns

### Homepage
- Dutch: `https://hovenier.frl/`
- English: `https://hovenier.frl/en/`

### Core Service Pages
- Dutch: `https://hovenier.frl/{service-slug}`
- English: `https://hovenier.frl/en/{service-slug}`

Examples:
- `https://hovenier.frl/tuinonderhoud`
- `https://hovenier.frl/en/garden-maintenance`

### Regional Pages
- Dutch: `https://hovenier.frl/regio/{gemeente-slug}`
- English: `https://hovenier.frl/en/region/{gemeente-slug}`

Examples:
- `https://hovenier.frl/regio/leeuwarden`
- `https://hovenier.frl/en/region/leeuwarden`

### Service + Region Combinations
- Dutch: `https://hovenier.frl/{service-slug}/{gemeente-slug}`
- English: `https://hovenier.frl/en/{service-slug}/{gemeente-slug}`

Examples:
- `https://hovenier.frl/tuinonderhoud/leeuwarden`
- `https://hovenier.frl/en/garden-maintenance/leeuwarden`

### Articles/Blog Content
- Dutch: `https://hovenier.frl/artikelen/{article-slug}`
- English: `https://hovenier.frl/en/articles/{article-slug}`

### Gardener Profiles
- Dutch: `https://hovenier.frl/hovenier/{gardener-slug}`
- English: `https://hovenier.frl/en/gardener/{gardener-slug}`

### Static Pages
- Dutch: `https://hovenier.frl/{page-slug}`
- English: `https://hovenier.frl/en/{page-slug}`

Examples:
- `https://hovenier.frl/privacy-beleid`
- `https://hovenier.frl/en/privacy-policy`

## SEO Implementation Strategy

### Canonical URLs
- Each page has a canonical URL pointing to the primary version
- Dutch (nl) is the primary locale served at root
- English (en) pages canonical to /en/ prefixed URLs
- Prevents duplicate content issues

### Hreflang Implementation
- `hreflang="nl"` for Dutch content at root paths
- `hreflang="en"` for English content at /en/ paths  
- `hreflang="x-default"` points to Dutch (primary market)
- Self-referencing hreflang tags on each page

### XML Sitemaps
- `/sitemap.xml` - Main sitemap index
- `/sitemap-0.xml` - Pages sitemap with hreflang attributes
- Generated via next-sitemap with locale support
- Submitted to Google Search Console & Bing Webmaster Tools

### robots.txt Configuration
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://hovenier.frl/sitemap.xml
```

## Technical SEO Features

### Structured Data (Schema.org)
- **LocalBusiness**: Organization markup on homepage
- **Service**: Individual service pages
- **Article**: Blog/article content
- **FAQPage**: FAQ sections
- **BreadcrumbList**: Navigation breadcrumbs

### Meta Tags & OpenGraph
- Localized title and description via i18n
- OpenGraph social sharing optimization
- Twitter Card support
- Proper viewport and charset declarations

### Performance Optimization
- Next.js App Router for optimal loading
- Image optimization via Next.js Image component
- Critical CSS inlined
- JavaScript code splitting by route

### Core Web Vitals Strategy  
- Largest Contentful Paint (LCP): Hero images optimized
- First Input Delay (FID): Minimal JavaScript on initial load
- Cumulative Layout Shift (CLS): Reserved space for dynamic elements

## URL Parameter Strategy

### Query Parameters - Allowed
- `?page=N` - Pagination (canonical to page 1)
- `?utm_*` - Marketing tracking (canonical ignores)
- `?ref=*` - Referral tracking (canonical ignores)

### URL Fragments - SEO Safe
- `#section` - Page anchors (ignored by search engines)
- `#tabs` - UI state (ignored by search engines)

## Redirects & Error Handling

### 301 Redirects
- Old URLs to new structure when migrating
- Trailing slash normalization (add trailing slash)
- Lowercase URL enforcement

### 404 Error Pages
- Localized 404 pages with navigation
- Suggest similar pages/services
- Search functionality for content discovery

### 500 Error Pages
- Graceful error boundaries with Sentry logging
- User-friendly error messages
- Retry/reload functionality

## Monitoring & Analytics

### Search Console Properties
- Primary property: hovenier.frl
- Separate properties for /en/ if needed
- Core Web Vitals monitoring
- Mobile usability tracking

### Analytics Implementation  
- Google Analytics 4 with Enhanced eCommerce
- Lead form conversion tracking
- Page performance monitoring
- Search query analysis

## Future Expansion Considerations

### Multi-regional Scaling
- Subdomain structure for other countries (.be, .de)
- ccTLD strategy for international expansion
- Geo-targeted content delivery

### API Documentation URLs
- `/api/docs` - Private API documentation  
- Excluded from sitemaps and search indexing
- Basic auth protection for development APIs

This URL structure provides strong SEO foundation while maintaining clean, user-friendly URLs that scale with business growth.