# HOVENIER.FRL — EXTERNAL TASKS REMAINING

## 📋 **External Tasks Status**
🔶 **EXTERNAL** - Requires external service setup/configuration  

This document contains all remaining external tasks that require setup with third-party services, manual verification, or external integrations that cannot be completed through code alone.

---

## Sprint 01 — Foundation & Infrastructure

### Repository & Version Control
- [ ] 🔶 **EXTERNAL** - Set up GitHub repo with main + develop branches
- [ ] 🔶 **EXTERNAL** - Configure branch protection on main branch
- [ ] 🔶 **EXTERNAL** - Set up CI for lint/test/build

### Monitoring & Analytics Verification
- [ ] 🔶 **EXTERNAL** - Verify Sentry test error appears in dashboard
- [ ] 🔶 **EXTERNAL** - Create GA4 property, install via gtag in Next.js
- [ ] 🔶 **EXTERNAL** - Confirm GA4 tracking is working properly

---

## Sprint 02 — Technical SEO & Site Architecture

### Search Engine Verification & Setup
- [ ] 🔶 **EXTERNAL** - Verify domain in Google Search Console (Manual - post deployment)
- [ ] 🔶 **EXTERNAL** - Submit sitemap to Google Search Console (Manual - post deployment)
- [ ] 🔶 **EXTERNAL** - Verify domain in Bing Webmaster Tools (Manual - post deployment)
- [ ] 🔶 **EXTERNAL** - Confirm hreflang in Google Search Console (Manual - post deployment)

### Performance & Schema Testing
- [ ] 🔶 **EXTERNAL** - Run PageSpeed Insights baseline, document scores
- [ ] 🔶 **EXTERNAL** - Test all schema with Google Rich Results Test

---

## Sprint 03 — Design System & Core Components

### Security Configuration
- [ ] 🔶 **EXTERNAL** - Configure Cloudflare Turnstile keys for spam protection

---

## Sprint 04 — Core Pages: Homepage, Services & Gemeente

### SEO Auditing & Indexing
- [ ] 🔶 **EXTERNAL** - Run Screaming Frog crawl, confirm no orphan pages
- [ ] 🔶 **EXTERNAL** - Submit all new URLs to GSC for indexing

---

## Sprint 05 — Content Engine: Articles & AEO

### Content Indexing
- [ ] 🔶 **EXTERNAL** - Submit all article URLs to GSC

---

## Sprint 06 — Monetisation Infrastructure

### Data Storage & Lead Management
- [ ] 🔶 **EXTERNAL** - Set up Airtable base: Leads table (naam, gemeente, klus, tel, datum) *(Note: Currently using Prometheus API)*

### Affiliate Program Applications
- [ ] 🔶 **EXTERNAL** - Apply for bol.com affiliate programme
- [ ] 🔶 **EXTERNAL** - Apply for Hornbach affiliate programme
- [ ] 🔶 **EXTERNAL** - Apply for Intratuin affiliate programme

### Payment Infrastructure
- [ ] 🔶 **EXTERNAL** - Set up Stripe for future direct payments (foundation only)

---

## Sprint 07 — GDPR, Legal & Trust

### Legal Compliance
- [ ] 🔶 **EXTERNAL** - Sign data processing agreements with third parties

---

## Sprint 08 — Performance, QA & Pre-Launch

### Performance Testing & Auditing
- [ ] 🔶 **EXTERNAL** - Run PageSpeed Insights on homepage, gemeente page, article page
- [ ] 🔶 **EXTERNAL** - Run Screaming Frog full site crawl — zero 404s
- [ ] 🔶 **EXTERNAL** - Run axe DevTools — fix any critical accessibility failures
- [ ] 🔶 **EXTERNAL** - Confirm monitoring alert works
- [ ] 🔶 **EXTERNAL** - Final GSC coverage check — no errors

---

## Sprint 09 — Launch & Off-Page SEO

### Domain & Launch Configuration
- [ ] 🔶 **EXTERNAL** - Remove any staging/noindex flags from production
- [ ] 🔶 **EXTERNAL** - Force-crawl homepage in GSC (Request Indexing)

### Business Directory Submissions
- [ ] 🔶 **EXTERNAL** - Submit to Gouden Gids (goudengids.nl)
- [ ] 🔶 **EXTERNAL** - Submit to Localsearch.nl
- [ ] 🔶 **EXTERNAL** - Submit to Startpagina.nl gardening category
- [ ] 🔶 **EXTERNAL** - Submit to local Frisian business directories

### Local Business Setup
- [ ] 🔶 **EXTERNAL** - Create/claim Google Business Profile for hovenier.frl

### SEO & Backlink Management
- [ ] 🔶 **EXTERNAL** - Export all 317 backlinks from Ahrefs/Semrush
- [ ] 🔶 **EXTERNAL** - Audit each domain: keep, ignore, or disavow
- [ ] 🔶 **EXTERNAL** - Create disavow.txt and upload to GSC

### Business Outreach
- [ ] 🔶 **EXTERNAL** - Send first 10 outreach emails
- [ ] 🔶 **EXTERNAL** - Set up outreach tracking spreadsheet (sent / replied / signed)

---

## Sprint 10 — Monitoring, Optimisation & Growth

### Analytics & Monitoring Setup
- [ ] 🔶 **EXTERNAL** - Install Microsoft Clarity (free heatmaps + session recordings)
- [ ] 🔶 **EXTERNAL** - Build GA4 custom dashboard: sessions, conversions, top pages, CWV
- [ ] 🔶 **EXTERNAL** - Set up GSC weekly performance email digest
- [ ] 🔶 **EXTERNAL** - Configure keyword rank tracking for 20 target terms

### Ongoing Monitoring Tasks
- [ ] 🔶 **EXTERNAL** - Weekly: check Sentry for any new errors
- [ ] 🔶 **EXTERNAL** - Weekly: review Clarity heatmaps for form drop-off
- [ ] 🔶 **EXTERNAL** - Monthly: Screaming Frog crawl for new broken links
- [ ] 🔶 **EXTERNAL** - Monthly: review affiliate revenue and optimise placement
- [ ] 🔶 **EXTERNAL** - Set up review collection email flow (post-job)
- [ ] 🔶 **EXTERNAL** - A/B test lead form headline after 500 visits

---

## 🎯 **Priority Groups for Implementation**

### **HIGH PRIORITY - Pre-Launch Critical**
1. **Google Search Console** - Domain verification & sitemap submission
2. **GA4 Setup** - Property creation & tracking verification
3. **Cloudflare Turnstile** - Spam protection configuration
4. **PageSpeed Insights** - Performance baseline testing

### **MEDIUM PRIORITY - Post-Launch**
1. **Business Directory Submissions** - Local SEO foundation
2. **Google Business Profile** - Local search presence
3. **Affiliate Program Applications** - Revenue stream setup
4. **Microsoft Clarity** - User behavior analytics

### **LOW PRIORITY - Growth Phase**
1. **Backlink Audit** - SEO cleanup and optimization
2. **Advanced Analytics Dashboards** - Performance monitoring
3. **Outreach Campaigns** - Business development
4. **A/B Testing Setup** - Conversion optimization

---

## 📝 **Implementation Notes**

### **Service Dependencies**
- **Sentry**: Already configured in code, needs dashboard verification
- **Prometheus API**: Already implemented, using custom service instead of Airtable
- **GA4**: Code implemented, needs property setup and verification
- **Turnstile**: Component ready, needs key configuration

### **Post-Deployment Requirements**
Most external tasks require the website to be deployed to production domain before they can be completed. Priority should be:
1. Deploy to production domain
2. Complete Google Search Console verification
3. Set up GA4 property and verify tracking
4. Configure Turnstile spam protection
5. Begin performance testing and optimization

### **Ongoing Maintenance**
Several tasks are recurring (weekly/monthly) and should be scheduled as part of regular maintenance workflow once the site is live and traffic grows.

---

**Total External Tasks Remaining: ~45 tasks across all sprints**  
**Critical for Launch: 8 tasks (GSC, GA4, Turnstile, PageSpeed testing)**  
**Business Development: 15 tasks (directories, outreach, affiliate programs)**  
**Ongoing Monitoring: 12 tasks (weekly/monthly maintenance)**