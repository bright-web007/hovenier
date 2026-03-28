# One-Shot Website Development Framework

**Complete Requirements Gathering System for Building Websites Without Iterations**

Based on learnings from the Hovenier.frl project and analysis of common development bottlenecks that cause time delays and multiple revision cycles.

## Executive Summary

This framework addresses the primary causes of development delays by capturing comprehensive requirements upfront, enabling true one-shot website development with minimal back-and-forth iterations.

### Key Time-Saving Benefits:
- **Schema & SEO Issues**: Prevents post-deployment audit failures
- **Testing Gaps**: Avoids runtime boundary violations and accessibility issues  
- **Business Data**: Eliminates incomplete configuration iterations
- **UI/UX Decisions**: Removes design decision bottlenecks
- **Technical Architecture**: Prevents integration and performance issues
- **Content Strategy**: Avoids content hierarchy and conversion optimization delays

---

## Time-Consuming Discovery Issues Identified

### 1. **Schema & SEO Requirements Discovery**
- **Problem**: LocalBusiness schema missing fields caught only post-deployment via SEMrush audit
- **Time Lost**: Multiple debugging sessions, schema investigation, validation across tools
- **Root Cause**: Business data completeness wasn't validated against all SEO audit tools upfront

### 2. **Testing Strategy Gaps**
- **Problem**: Jest tests (95% pass rate) didn't catch Server Component onClick violations causing 500 errors  
- **Time Lost**: Runtime debugging, discovering App Router boundary violations after deployment
- **Root Cause**: Next.js 14 App Router testing requirements weren't understood upfront

### 3. **Business Configuration Completeness**
- **Problem**: Missing business details (street address, complete contact info, service descriptions)
- **Time Lost**: Multiple iterations to flesh out business config
- **Root Cause**: Business stakeholder interview wasn't comprehensive enough

### 4. **Visual Design & Component Decisions**
- **Problem**: Converting provided HTML/CSS into component system without complete design specifications
- **Time Lost**: Multiple iterations on component styling, responsive breakpoints, visual hierarchy
- **Root Cause**: No design system specification, missing component states/variants

### 5. **Sitemap & URL Architecture**
- **Problem**: Non-canonical URLs in sitemap, hreflang implementation, locale-specific routing
- **Time Lost**: Multiple sitemap rebuilds, URL structure documentation, canonical tag fixes
- **Root Cause**: No upfront URL architecture strategy or sitemap requirements

### 6. **Digital Asset Collection**
- **Problem**: Missing logos, images, icons in various formats and sizes needed for different contexts
- **Time Lost**: Asset hunting, format conversion, optimization, placeholder creation
- **Root Cause**: No comprehensive asset inventory or specification

---

## One-Shot Build Prompt Template

```
Build a complete [BUSINESS_TYPE] website with the following specifications:

BUSINESS PROFILE:
- Legal Name: [NAME]
- Trading Name: [TRADING_NAME]  
- Complete Address: [STREET, CITY, POSTAL, REGION, COUNTRY]
- Contact: [PHONE, EMAIL, WEBSITE]
- Service Area: [RADIUS/REGIONS]
- Business Hours: [SCHEDULE]
- Services: [DETAILED_SERVICE_LIST_WITH_PRICING]

TECHNICAL REQUIREMENTS:
- Framework: [Next.js 14, React 18, etc.]
- Languages: [Primary/Secondary with i18n scope]
- CMS: [Headless CMS choice and API details]
- Monitoring: [Sentry, GA4, etc. with account details]
- Performance: [Core Web Vitals targets, audit scores]
- SEO: [Schema types, audit tools, specific requirements]

UI/UX SPECIFICATIONS:
- Design System: [Brand guidelines, component library, responsive strategy]
- User Flows: [Complete conversion paths and user journeys]
- Accessibility: [WCAG level, assistive technology support]
- Content Strategy: [Hierarchy, copywriting, multimedia requirements]

TECHNICAL ARCHITECTURE:
- URL Structure: [Multilingual strategy, canonical approach]
- Sitemap Strategy: [Inclusion/exclusion rules, hreflang implementation]
- Asset Requirements: [Formats, optimization, CDN strategy]
- Integrations: [CRM, analytics, payment, communication tools]

BUILD DELIVERABLES:
1. Complete Next.js application with production-ready deployment
2. Full schema implementation validated against [AUDIT_TOOLS]
3. Comprehensive testing suite including App Router boundary validation  
4. Environment configuration with validation scripts
5. Documentation for content management and deployment
6. SEO optimization for [TARGET_SCORES] across [AUDIT_PLATFORMS]
```

---

# Comprehensive Requirements Questionnaire

## Section 1: Business Foundation

### 1. **Business Identity**
- What is your legal business name?
- What trading name do you use publicly?
- What is your complete physical address (street, city, postal code, region, country)?
- What are all your contact methods (phone, email, social media)?
- What are your business operating hours?
- Do you have multiple locations? List all addresses.

### 2. **Service & Pricing Strategy**
- List all services you offer with detailed descriptions
- What are your pricing ranges for each service?
- What geographic area do you serve (radius/specific regions)?
- Who are your top 3 competitors?
- What makes you different from competitors?
- What seasonal variations affect your business?

### 3. **Business Goals & Metrics**  
- How many leads do you want per month?
- What's your average customer value?
- What's your primary conversion action (call, form, booking)?
- What business metrics matter most to you?
- What's your customer acquisition cost target?

## Section 2: Technical Requirements

### 4. **Performance & SEO Expectations**
- What Core Web Vitals scores do you need? (default: 90+ Lighthouse)
- Which SEO audit tools will you use? (SEMrush, Screaming Frog, etc.)
- What's your target organic traffic growth?
- Do you need structured data for rich snippets?
- What's your target page load time? (<3 seconds, <1 second)

### 5. **Content Management**
- Who will update website content?
- How often will you add new content?
- Do you need a CMS? Which one?
- What approval process exists for content changes?
- What content types do you need? (blog, case studies, FAQs)

### 6. **Integrations & Tools**
- What analytics platform? (GA4, etc.)
- Do you need error monitoring? (Sentry, etc.)  
- What CRM system do you use?
- Do you need payment processing?
- What email marketing platform?
- Do you need booking/scheduling integration?

## Section 3: Visual Design System

### 7. **Brand Identity & Assets**
- Do you have existing brand guidelines? (colors, fonts, logos, imagery style)
- What's your brand personality? (professional, friendly, modern, traditional, etc.)
- Provide all brand assets: logos (SVG preferred), color codes (hex/RGB), font files
- What websites do you admire? Provide 5 reference URLs with specific elements you like
- What websites do your competitors use? What do you want to do differently?

### 8. **Visual Hierarchy & Layout**
- What's the most important action on each page type? (call, form, booking, etc.)  
- How should information be prioritized on your homepage? (services, about, testimonials, etc.)
- Do you prefer grid-based layouts, card-based designs, or full-width sections?
- What's your preferred approach to imagery? (hero images, background videos, product photos, illustrations)
- How much white space do you prefer? (minimal/compact vs. spacious/modern)

### 9. **Component Specifications**
- **Navigation**: Horizontal/vertical menu? Mega menu needed? Mobile hamburger or drawer?
- **Forms**: Single-page or multi-step? Required fields? Inline validation style?
- **Cards**: Shadow/border style? Image placement? Content structure?  
- **Buttons**: Primary/secondary styles? Button sizes? Hover effects?
- **Typography**: Heading hierarchy needs? Body text size preferences? Link styling?

## Section 4: User Experience Design

### 10. **Target Audience**
- Who are your ideal customers?
- What devices do they primarily use?
- What languages do they speak?
- What's their technical comfort level?
- What are their primary pain points?

### 11. **User Journey Mapping**
- Map your ideal customer path: Awareness → Consideration → Decision → Action
- What content do users need at each stage?
- What are the main conversion points? (contact form, phone call, quote request)
- What information reduces friction? (pricing, availability, credentials, reviews)
- What objections need addressing? (cost concerns, reliability, availability)

### 12. **Page-Specific Requirements**
- **Homepage**: Hero message? Key sections? Call-to-action placement?
- **Service Pages**: Content structure? Pricing display? Booking integration?
- **About Page**: Team photos? Credentials? Company story emphasis?
- **Contact Page**: Form fields? Map integration? Multiple contact methods?
- **Blog/News**: List vs. grid layout? Categories? Search functionality?

### 13. **Interaction Design**
- What micro-interactions do you want? (hover effects, form animations, scroll transitions)
- How should users navigate between related content? (breadcrumbs, related links, tags)
- What feedback should users get? (form submission, loading states, error messages)  
- Do you need any advanced interactions? (calculators, booking widgets, live chat)

## Section 5: Responsive & Device Experience

### 14. **Device Strategy**
- What percentage of your traffic is mobile? Desktop? Tablet?
- What's your mobile-first approach? (mobile-optimized vs mobile-equal)
- What screen sizes must be supported? (320px+ smartphones, tablets, desktop)
- Do you need touch-optimized interactions? (larger buttons, swipe gestures)
- Any device-specific features? (click-to-call, location services, camera access)

### 15. **Performance Requirements**
- What's your page load time target? (<3 seconds, <1 second)
- How important is offline functionality?
- Do you need progressive web app features?
- What's your image optimization strategy? (WebP, lazy loading, responsive images)
- Any third-party widgets that might impact performance?

## Section 6: Accessibility & Compliance

### 16. **Accessibility Standards**
- What WCAG level do you need? (A, AA, AAA)
- Do you serve users with specific accessibility needs?
- What assistive technologies must be supported? (screen readers, keyboard navigation)
- Do you need high contrast mode support?
- Any industry-specific accessibility requirements?

### 17. **Legal & Compliance**
- What privacy laws apply? (GDPR, CCPA, local regulations)
- Do you need cookie consent management?
- What terms of service/privacy policy requirements?
- Any industry certifications to display?
- Required disclaimers or legal notices?

## Section 7: Conversion Optimization

### 18. **Lead Generation Strategy**
- What's your primary conversion goal? (form submission, phone call, booking)
- What information do you need from leads? (contact info, project details, timeline, budget)
- How many form fields maximum? What's acceptable vs. ideal?
- What social proof do you have? (testimonials, reviews, certifications, before/after photos)
- What urgency/scarcity elements? (limited time offers, availability calendars)

### 19. **Trust & Credibility**
- What credentials should be prominently displayed?
- Do you have customer reviews/testimonials to showcase?
- What security badges or certifications to display?
- How should you handle pricing transparency? (display prices, "starting from", quote-based)
- What guarantees or warranties to highlight?

## Section 8: Content Strategy & Information Architecture

### 20. **Content Hierarchy**
- What's the order of importance for homepage content?
- How should services be categorized and organized?
- What supporting content is needed? (FAQs, case studies, blog posts)
- How should local/regional content be structured?
- What internal linking strategy for SEO?

### 21. **Multimedia Requirements**
- What photography do you have/need? (team, projects, facilities, equipment)
- Do you need video content? (testimonials, explainer videos, project showcases)
- What infographics or illustrations would help explain your services?
- Do you need interactive elements? (before/after sliders, progress indicators)

## Section 9: URL Structure & Sitemap Strategy

### 22. **URL Architecture**
- What's your preferred URL structure? (`/services/garden-design` vs `/garden-design-services`)
- Do you need multilingual URLs? (`/en/services` vs `/services-en` vs subdomains)
- What's your approach to trailing slashes? (with or without)
- How should you handle URL redirects from old site?
- What URL parameters do you need? (utm tracking, filtering, pagination)

### 23. **Sitemap & SEO Technical**
- What pages should be included in XML sitemap?
- What pages should be excluded? (admin, login, thank-you pages)
- Do you need image sitemaps? Video sitemaps? News sitemaps?
- What's your canonical URL strategy? (www vs non-www, http vs https)
- How should hreflang be implemented? (HTML tags, sitemap, HTTP headers)

### 24. **robots.txt & Crawling**
- What should be blocked from search engines? (admin areas, duplicate content)
- What crawl budget considerations? (large site, frequent updates)
- Do you need specific user-agent rules? (Google, Bing, social crawlers)
- What's your sitemap location preference? (root domain, subdirectory)

## Section 10: Digital Assets Inventory

### 25. **Brand Assets & Logos**
- Provide logo in these formats: SVG, PNG (transparent), JPG, ICO
- Logo variations needed: horizontal, vertical, icon-only, monochrome, reversed
- What sizes required? (16x16 favicon up to 512x512 app icon)
- Do you have a brand style guide document?
- Any logo usage restrictions or guidelines?

### 26. **Photography & Imagery**
- What photos do you have? (team, workspace, projects, products)
- Photo specifications: resolution, style, subjects needed
- Do you need stock photography? What style/tone?
- Hero image requirements: dimensions, content, call-to-action overlay
- Before/after project photos available?

### 27. **Icons & Graphics** 
- Do you need custom icons? What style? (line, filled, outlined)  
- App icons for PWA: sizes 192x192, 512x512, maskable versions
- Social media icons: which platforms? Custom or standard style?
- Favicon requirements: ICO, PNG, SVG formats
- Any infographics, diagrams, or illustrations needed?

## Section 11: Content Assets & Copy

### 28. **Written Content Inventory**
- Do you have existing website copy? (provide all text content)
- What new content needs writing? (page copy, blog posts, service descriptions)
- Legal documents: Privacy Policy, Terms of Service, Cookie Policy (existing or need creation)
- Contact information: complete address, phone, email, social media links
- About content: company history, team bios, mission statement

### 29. **Social Media & Marketing Content**
- Social media profiles to link to: Facebook, Instagram, LinkedIn, etc.
- Open Graph content: titles, descriptions, images for social sharing
- Email marketing copy: newsletter signup text, welcome messages
- Marketing materials: brochures, flyers, business cards (for consistency)

## Section 12: Technical Files & Configuration

### 30. **Progressive Web App (PWA)**
- Do you want PWA functionality? (offline access, app-like experience)
- App manifest requirements: name, colors, icons, display mode
- Service worker needs: caching strategy, offline pages, push notifications
- Installation prompts: when and how to show install banner

### 31. **Server Configuration & Performance**
- Hosting platform requirements: shared, VPS, CDN needs
- Caching strategy: browser cache headers, CDN settings
- Compression: Gzip/Brotli requirements
- Security headers: HTTPS redirect, HSTS, CSP, referrer policy
- Error page requirements: 404, 500, maintenance page design

### 32. **Analytics & Tracking**
- Google Analytics: GA4 setup, goals, e-commerce tracking
- Google Search Console: verification, sitemap submission  
- Facebook Pixel, LinkedIn Insight Tag, other marketing pixels
- Heat mapping tools: Hotjar, Crazy Egg requirements
- Call tracking: phone number tracking for marketing attribution

## Section 13: Legal & Compliance Documents

### 33. **Required Legal Pages**
- Privacy Policy: GDPR compliance, data collection practices
- Terms of Service: service terms, limitations, user responsibilities
- Cookie Policy: what cookies used, consent management
- Accessibility Statement: WCAG compliance level, contact info
- Disclaimer: service limitations, liability restrictions

### 34. **Business Credentials & Certifications**
- Business licenses: scan/photos of relevant licenses
- Industry certifications: logos and verification links
- Insurance information: liability, bonding documentation
- Awards or recognition: certificates, media mentions
- Professional memberships: association logos and details

## Section 14: Third-Party Integrations & APIs

### 35. **CRM & Lead Management**
- CRM platform: Salesforce, HubSpot, Pipedrive integration requirements
- Lead routing: how leads should be distributed, notification methods
- Email integration: automated follow-ups, email templates
- Calendar booking: Calendly, Acuity, custom booking system

### 36. **Payment & E-commerce**
- Payment processing: Stripe, PayPal, Square integration needs
- E-commerce requirements: product catalog, checkout process
- Invoicing systems: QuickBooks, FreshBooks integration
- Subscription management: recurring payments, plan changes

### 37. **Communication Tools**
- Live chat: Intercom, Zendesk Chat, custom solution
- Email marketing: Mailchimp, Constant Contact integration  
- SMS capabilities: Twilio integration for notifications
- Video conferencing: Zoom, Google Meet embed requirements

## Section 15: Launch & Post-Launch Assets

### 38. **Testing & Validation Assets**
- Test data: sample content, user accounts for testing
- Staging environment: requirements, access permissions
- Browser testing: devices and browsers for QA checklist
- Performance testing: load testing requirements, benchmarks

### 39. **Documentation & Training**
- User manuals: content management, admin functions
- Training materials: video tutorials, step-by-step guides
- Technical documentation: API docs, server setup guides
- Maintenance procedures: backup, updates, security monitoring

---

## Asset Delivery Specifications

### **File Formats & Standards**
- **Images**: WebP primary, PNG/JPG fallbacks, SVG for logos/icons
- **Documents**: PDF for forms/brochures, accessible formats for legal docs
- **Video**: MP4 H.264, multiple resolutions for responsive loading
- **Audio**: MP3 for compatibility, OGG for size optimization

### **Naming Conventions & Organization**
- **File naming**: Clear, SEO-friendly names (`hero-image-landscaping.webp`)
- **Folder structure**: `/images/hero/`, `/images/services/`, `/documents/legal/`
- **Version control**: How to handle asset updates, archival of old versions

### **Performance & Optimization Standards**  
- **Image optimization**: Target file sizes, compression levels
- **Lazy loading**: Which images load immediately vs. on scroll
- **CDN strategy**: Which assets served via CDN vs. local server
- **Caching policies**: Browser cache duration for different asset types

---

## Component Library Specification

### **For Each Component, Specify:**
- **Visual states**: Default, hover, active, disabled, loading, error
- **Size variants**: Small, medium, large, full-width  
- **Content variations**: With/without icons, long/short text, single/multiple lines
- **Responsive behavior**: How it adapts across breakpoints
- **Accessibility requirements**: Keyboard navigation, screen reader support, focus indicators

### **Layout System Requirements**
- **Grid system**: 12-column, flexbox, CSS Grid preferences
- **Spacing scale**: Consistent spacing units (4px, 8px, 16px system)
- **Breakpoint strategy**: Mobile-first, specific pixel breakpoints
- **Container widths**: Max-width constraints, full-width vs contained sections

### **Animation & Motion Design**
- **Transition preferences**: Duration, easing functions, what elements animate
- **Loading states**: Skeleton screens, spinners, progress indicators
- **Scroll behaviors**: Parallax effects, sticky elements, scroll-triggered animations
- **Micro-interactions**: Button feedback, form validation, hover states

---

## Implementation Success Factors

### **Critical Success Requirements**
1. **Complete Requirements Gathering**: All sections of this questionnaire completed before development begins
2. **Stakeholder Alignment**: All decision-makers interviewed and signed off on requirements
3. **Asset Completeness**: All digital assets provided in required formats before development
4. **Testing Strategy**: Comprehensive testing plan including Next.js App Router boundary validation
5. **Performance Budgets**: Specific performance targets defined and validated

### **Quality Assurance Checklist**
- [ ] All SEO requirements validated against specified audit tools
- [ ] Complete accessibility testing per specified WCAG level
- [ ] Cross-browser testing complete per device/browser matrix
- [ ] Performance testing meets specified Core Web Vitals targets
- [ ] All integrations tested with staging/sandbox accounts
- [ ] Content management workflows validated with actual users
- [ ] Legal compliance verified per applicable regulations
- [ ] Analytics and tracking implementation validated

### **Deployment Readiness Criteria**
- [ ] Production environment configured with all required services
- [ ] DNS and SSL certificates configured
- [ ] All third-party integrations configured with production keys
- [ ] Backup and monitoring systems operational
- [ ] Content migration completed (if applicable)
- [ ] Team training completed for content management
- [ ] Post-launch support procedures documented

---

## Conclusion

This framework eliminates the iterative discovery process that causes development delays by capturing comprehensive requirements upfront. The key insight is that most development time is lost on **assumptions about completeness** rather than actual coding complexity.

By using this complete questionnaire system, websites can be built in a truly one-shot manner with minimal back-and-forth, resulting in faster delivery times, better stakeholder satisfaction, and more predictable project outcomes.

**Next Steps:** Use this questionnaire as a discovery workshop framework before any website project begins.