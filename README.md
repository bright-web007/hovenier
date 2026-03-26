# Hovenier.frl

A complete Next.js website for the Dutch landscaping service directory with lead generation. Following a 10-sprint roadmap for maximum monetization, currently in **Sprint 3** with foundation, technical SEO, and core components completed.

## 🚀 Project Status

### ✅ Sprint 1 - Foundation & Infrastructure (COMPLETE)
- Complete Next.js 14 setup with Docker and TypeScript
- Full i18n implementation with next-intl (EN/NL)
- Muse CMS integration with GraphQL authentication  
- Complete design system implementation from provided HTML/CSS
- Sentry error monitoring fully configured and tested
- Google Analytics 4 integration active
- Core components: Navigation, Hero, NewLeadForm

### ✅ Sprint 2 - Technical SEO & Architecture (COMPLETE)
- Complete URL structure documentation and implementation
- XML sitemap with next-sitemap and hreflang support
- robots.txt configuration blocking admin/API routes
- Complete Schema.org structured data library (5 types)
- MetadataManager component for canonical URLs and hreflang
- Security headers: CSP, HSTS, XSS protection in next.config.ts
- Middleware for routing and noindex on appropriate routes
- Performance optimizations: image formats, compression, bundling
- i18n request configuration and locale detection
- Schema test page for validation during development

### 🟡 Sprint 3 - Design System & Core Components (IN PROGRESS)
- ✅ Design tokens and CSS variables implemented
- ✅ Navigation component with mobile menu
- ✅ Hero section with lead form integration
- ✅ Lead capture form with validation
- ✅ Custom favicon with plant theme
- ✅ Structured data investigation completed (100% compliant)
- ⏳ Footer component with GDPR links
- ⏳ Card components (Service, Article, Gardener)  
- ⏳ Additional UI components and mobile audit

## 🌱 Features

### Core Platform
- **Gardener Directory**: Browse and search 150+ certified gardeners across 11 Frisian municipalities
- **Lead Generation**: Advanced quote request system with municipality-specific routing
- **Service Listings**: Comprehensive coverage of garden maintenance, design, and green roof services
- **Regional Focus**: Dedicated pages for all Frisian municipalities from Leeuwarden to Harlingen

### User Experience
- **Bilingual Support**: Full Dutch/English internationalization with next-intl
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Trust Indicators**: Statistics and verification badges to build user confidence
- **Navigation**: Breadcrumb navigation system across all pages for better UX

### Technical Features
- **Performance**: Server-side rendering with Next.js App Router
- **SEO Optimized**: Structured data, meta tags, and semantic HTML
- **Analytics**: Google Analytics 4 integration with GDPR compliance
- **Forms**: Cloudflare Turnstile for spam protection
- **Styling**: Custom CSS with CSS variables for consistent theming

## 🛠️ Technology Stack

- **Framework**: Next.js 16.2.1 with Turbopack and App Router
- **Language**: TypeScript for type safety
- **Styling**: Custom CSS with CSS Variables and design tokens
- **Internationalization**: next-intl for Dutch/English support  
- **CMS**: Muse CMS with GraphQL API integration
- **Analytics**: Google Analytics 4 with GDPR compliance
- **Monitoring**: Sentry for error tracking and performance
- **Security**: Cloudflare Turnstile + comprehensive security headers
- **SEO**: Complete Schema.org structured data (5 types)
- **Deployment**: Docker-ready with Vercel optimization
- **Development**: Turbopack dev server with hot reload

## 🎯 Technical Achievements

### SEO & Structured Data
- **Schema.org Compliance**: 100% validated structured data
  - LocalBusiness schemas with complete addresses
  - Service schemas with LocalBusiness providers
  - FAQPage and BreadcrumbList schemas
  - All schemas verified with official Schema.org validator
- **Technical SEO**: Complete XML sitemap, robots.txt, canonical URLs
- **Security Headers**: A-grade security with CSP, HSTS, XSS protection

### Environment Configuration  
- **38 Environment Variables**: 100% validation with automated setup
- **Environment Management**: Automated validation and setup tools
- **Development Tools**: Complete testing and debugging suite
- **Docker Support**: Production-ready containerization

### Performance & Monitoring
- **Core Web Vitals**: Optimized for performance scores
- **Error Monitoring**: Complete Sentry integration with source maps
- **Analytics**: GA4 with custom events and conversion tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hovenier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Copy the example environment file and configure:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Run environment validation:
   ```bash
   node scripts/validate-env.js
   ```
   
   Key environment variables (38 total):
   ```bash
   # Core Application
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_DEFAULT_LOCALE=nl
   
   # CMS Integration  
   MUSE_GRAPHQL_ENDPOINT=your_muse_endpoint
   MUSE_API_TOKEN=your_muse_token
   
   # Analytics & Monitoring
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   SENTRY_DSN=your_sentry_dsn
   
   # Security
   NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_turnstile_key
   ```
   
   See `.env.local.example` for complete configuration

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
hovenier/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── kosten/            # Cost/pricing pages
│   │   ├── diensten/          # Service category pages
│   │   ├── hoveniers/         # Gardener directory pages
│   │   ├── regio/             # Regional/municipality pages
│   │   └── page.tsx           # Homepage
│   ├── api/                   # API routes  
│   ├── components/            # Reusable React components
│   ├── schemas/               # Schema.org structured data
│   ├── globals.css           # Global styles and design tokens
│   ├── icon.svg              # Custom favicon
│   └── layout.tsx            # Root layout
├── docs/                      # Project documentation
│   ├── ENVIRONMENT_SETUP.md   # Environment configuration guide
│   ├── SPRINT_2_COMPLETE.md   # Technical SEO completion report
│   ├── URL_STRUCTURE.md       # Complete URL architecture
│   └── seo_copy.md           # SEO copy and content strategy
├── lib/                       # Utility libraries
│   ├── seo-utils.ts          # SEO helpers and metadata
│   ├── business-config.ts    # Business configuration
│   └── regions.ts            # Frisian municipalities data
├── locales/
│   ├── nl/common.json        # Dutch translations
│   └── en/common.json        # English translations  
├── scripts/                   # Development and build scripts
│   ├── validate-env.js       # Environment validation
│   └── connectivity-test.js  # API connectivity testing
├── public/
│   ├── images/               # Static images and assets
│   ├── robots.txt           # Search engine directives
│   └── manifest.json        # PWA manifest
├── i18n.ts                   # Internationalization config
├── next-sitemap.config.js    # XML sitemap generation
└── middleware.ts             # Request routing and headers
```

## 🎨 Recent Accomplishments

### Sprint 3 Achievements (Current)
- ✅ Custom favicon implementation with plant-themed SVG design
- ✅ Comprehensive structured data investigation and validation
- ✅ 100% Schema.org compliance confirmation across all pages  
- ✅ Codebase cleanup and organization (28 temporary files removed)
- ✅ Documentation organization into `/docs` folder structure
- ✅ Root directory cleanup for professional presentation

### Technical SEO Deep Dive  
- ✅ **Structured Data Validation**: Complete investigation of SEMrush "155 errors"
- ✅ **Root Cause Analysis**: Identified errors as SEMrush crawler cache issues, not code problems
- ✅ **Official Validation**: All schemas validated with Schema.org official validator
- ✅ **Production Verification**: Local vs production comparison confirmed identical schemas
- ✅ **Address Compliance**: All LocalBusiness schemas have complete address data

### Development Environment  
- ✅ **Environment Management**: 38 environment variables with 100% validation
- ✅ **Testing Suite**: Comprehensive debugging and validation scripts
- ✅ **Docker Integration**: Production-ready containerization setup  
- ✅ **Code Quality**: ESLint configuration and automated validation

## 🌍 Supported Municipalities

The platform covers all 18 municipalities in Friesland:
- Leeuwarden, Heerenveen, Smallingerland, Súdwest-Fryslân
- De Fryske Marren, Noardeast-Fryslân, Achtkarspelen  
- Tietjerksteradiel, Dantumadiel, Waadhoeke, and more

Complete municipality coverage with dedicated regional pages and local gardener directories.

---

*Updated March 2026 - Sprint 3 in progress*
- Secure environment variable management
- Content Security Policy implementation

## 📱 Mobile Experience

Fully responsive design optimized for:
- Mobile form submissions
- Touch-friendly navigation
- Fast loading on mobile networks
- Progressive enhancement

---

**Built with ❤️ for the gardening community in Friesland**
