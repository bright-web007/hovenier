# Hovenier.frl

A comprehensive gardener directory and lead generation platform for Friesland, Netherlands. This modernized website connects homeowners with qualified gardeners and landscapers throughout the province.

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

- **Framework**: Next.js 16.2.1 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Custom CSS with CSS Variables
- **Internationalization**: next-intl for Dutch/English support
- **Analytics**: Google Analytics 4
- **Security**: Cloudflare Turnstile
- **Deployment**: Optimized for Vercel

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
   Create a `.env.local` file with required environment variables:
   ```bash
   # Analytics
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   
   # Security
   NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_turnstile_site_key
   ```

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
│   │   ├── kosten/           # Pricing pages
│   │   ├── services/         # Service category pages
│   │   ├── gemeente/         # Municipality pages
│   │   └── page.tsx          # Homepage
│   ├── components/           # Reusable React components
│   │   ├── Navigation.tsx    # Main navigation
│   │   ├── Hero.tsx         # Homepage hero section
│   │   ├── TrustBar.tsx     # Trust indicators
│   │   ├── Breadcrumbs.tsx  # Navigation breadcrumbs
│   │   └── Footer.tsx       # Site footer
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── locales/
│   ├── nl/common.json       # Dutch translations
│   └── en/common.json       # English translations
├── public/
│   ├── images/              # Static images
│   └── assets/              # Logos and icons
└── i18n.ts                  # Internationalization config
```

## 🎨 Recent Improvements

### Navigation & UX
- ✅ Implemented breadcrumb navigation across all pages  
- ✅ Fixed duplicate breadcrumb issues on pricing pages
- ✅ Enhanced mobile navigation experience

### Internationalization  
- ✅ Fixed TrustBar translations on homepage
- ✅ Proper server-side translation handling for client components
- ✅ Consistent bilingual support throughout the platform

### Performance & Quality
- ✅ Optimized component imports and bundle size
- ✅ Enhanced error handling and user feedback
- ✅ Improved semantic HTML structure

## 🌍 Supported Municipalities

The platform covers all 11 municipalities in Friesland:
- Leeuwarden (28 gardeners)
- Heerenveen (19 gardeners) 
- Smallingerland (15 gardeners)
- Súdwest-Fryslân (12 gardeners)
- De Fryske Marren (11 gardeners)
- Noardeast-Fryslân (9 gardeners)
- Achtkarspelen (8 gardeners)
- Tietjerksteradiel (7 gardeners)
- Dantumadiel (6 gardeners)
- Waadhoeke (5 gardeners)
- Harlingen (4 gardeners)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

### Key Commands
```bash
# Clean build and restart
rm -rf .next && npm run dev

# Kill existing dev servers
pkill -f "next dev" && sleep 2 && npm run dev
```

## 📈 Analytics & Performance

- Integrated Google Analytics 4 for user behavior tracking
- Core Web Vitals monitoring
- Performance optimizations for mobile users
- SEO optimization with structured data

## 🔒 Security & Privacy

- GDPR-compliant cookie handling
- Cloudflare Turnstile for form protection
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
