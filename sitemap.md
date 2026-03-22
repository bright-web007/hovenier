# Hovenier.frl — Sitemap Page Summaries

---

## Core Pages

### `/` — Homepage
The primary landing page. Introduces hovenier.frl as Friesland's gardener directory. Contains the lead capture form (name, gemeente, job type, phone), trust signals, service previews, featured gardeners, and latest articles. Primary conversion goal: form submission.

### `/bedankt/` — Thank You (noindex)
Shown after a successful lead form submission. Confirms receipt and sets expectations (24hr response). This page fires the GA4 conversion event. Not indexed by search engines.

### `/over-ons/` — About
Explains what hovenier.frl is, how the platform works for homeowners, and how gardeners can join. Builds trust and transparency. Includes the three-step process: submit → match → receive quotes.

### `/contact/` — Contact
Simple contact form for general enquiries — not lead gen. Covers press, partnership, and technical issues. Routes to a shared inbox.

### `/samenwerking/` — Partnership
Commercial page targeting gardening businesses. Explains the three listing tiers (Free, Standard, Featured), pricing, and what gardeners get. Includes a partner registration form. This is the B2B sales page.

### `/privacy/` — Privacy Policy
GDPR-compliant Dutch-language privacy policy. Covers data collected via lead forms, cookies, analytics, and affiliate tracking. Required by Dutch law.

### `/cookies/` — Cookie Policy
Lists all cookies set by the site, categorised by type (functional, analytics, marketing). Links to cookie consent settings.

### `/voorwaarden/` — Terms & Conditions
Terms covering gardener directory listings, sponsored content arrangements, and lead gen service. Protects both parties legally.

---

## Diensten (Services)

### `/diensten/` — Services Index
Overview of all gardening service types covered. Links to each service pillar page. Includes a short intro and lead form. Acts as a hub for service-level SEO.

### `/diensten/tuinonderhoud/` — Garden Maintenance
Covers regular garden upkeep: mowing, pruning, weeding, seasonal tidying. Explains what's included, average costs, and how to find a maintenance gardener. Includes FAQ schema and lead form.

### `/diensten/tuinontwerp/` — Garden Design
Covers new garden layouts and redesigns. Explains the design process, what to expect, and typical costs. Targets homeowners planning a new garden. Includes FAQ schema and lead form.

### `/diensten/groendak/` — Green Roof
Covers sedum and living roof installation for homes and businesses. Explains subsidy options, costs, and benefits. Highest-value service — leads here are worth most to gardeners. Includes FAQ schema and lead form.

### `/diensten/tuin-aanleggen/` — Garden Installation
Covers full garden build projects from scratch. Targets homeowners with a new build or major renovation. Includes FAQ schema and lead form.

### `/diensten/stratenmaker/` — Paving & Landscaping
Covers hard landscaping: patios, paths, driveways. Complementary to gardening services. Includes FAQ schema and lead form.

---

## Regio (Gemeente Pages)

### `/regio/` — Region Index
Overview of all Frisian municipalities covered. Map or pill-based navigation to each gemeente page. Short intro copy about Friesland gardening market.

### `/regio/[gemeente]/` — Individual Gemeente Page (×11)
One page per Frisian municipality. Contains: localised intro copy, featured local gardeners, lead form, links to service combo pages, and FAQ schema. Targets "[gemeente] hovenier" search queries. The 11 municipalities are: Leeuwarden, Súdwest-Fryslân, Smallingerland, Heerenveen, Achtkarspelen, Tietjerksteradeel, Dantumadiel, De Fryske Marren, Waadhoeke, Noardeast-Fryslân, Harlingen.

### `/regio/[gemeente]/[dienst]/` — Gemeente × Service Combo Pages (×55)
High-intent combination pages targeting queries like "tuinonderhoud leeuwarden". One page per municipality × service type (11 × 5 = 55 pages). Generated from data — not hand-built. Each contains localised content, a lead form, and LocalBusiness schema. These are the highest-converting SEO pages on the site.

---

## Kosten (Cost Guides)

### `/kosten/` — Cost Guides Hub
Index page linking to all cost guide articles. Targets users researching prices before hiring. High traffic potential based on keyword data (1,740 vol/mo across cost cluster).

### `/kosten/hovenier-per-uur/` — Hourly Rate Guide
Answers "wat kost een hovenier per uur?" — the highest-volume keyword on the site (390/mo, KD 14%). Covers average rates, regional variation, factors affecting price. Opens with a 40-word direct answer for AEO. Includes FAQ schema.

### `/kosten/tuinonderhoud/` — Maintenance Cost Guide
Covers monthly and annual maintenance costs. Targets "kosten hovenier onderhoud" cluster. Includes FAQ schema and inline lead form CTA.

### `/kosten/tuin-aanleggen/` — Garden Installation Cost Guide
Covers full garden build costs by size and complexity. Targets "kosten hovenier tuinaanleg" (40/mo, KD 31%). Includes FAQ schema.

### `/kosten/groendak/` — Green Roof Cost Guide
Covers sedum roof installation costs, subsidy deductions, and ROI. High-value content for a high-value service. Includes FAQ schema.

### `/kosten/tuinontwerp/` — Garden Design Cost Guide
Covers design consultation and project costs. Targets homeowners budgeting for a full garden redesign. Includes FAQ schema.

---

## Hoveniers (Directory)

### `/hoveniers/` — Gardener Search & Directory
Dynamic search page. Users filter by gemeente, service type, and rating to find a local gardener. Results pull from the live gardener database. Not statically generated — client-side filtered. Optional noindex depending on thin content risk.

### `/hoveniers/[slug]/` — Individual Gardener Profile
One page per registered gardener. Contains: name, photo, services offered, gemeente coverage, reviews, and a contact/quote form. Statically generated at build time, revalidated when profile is updated. Includes LocalBusiness and Review schema. These pages are indexed and build long-tail SEO value over time.

---

## Nieuws (Blog / CMS)

### `/nieuws/` — Blog Index
Paginated list of all published articles. Filterable by category. CMS-driven — updates automatically when new content is published. Includes featured article at top.

### `/nieuws/[slug]/` — Individual Article
CMS-driven article pages. Each includes: bilingual content (NL default, EN toggle), Article schema, Author schema, FAQ block, related articles, and contextual affiliate links. Target: 1 new article per week.

### `/nieuws/categorie/[categorie]/` — Category Index
Groups articles by topic: kosten, seizoen, tips, groendak, tuinontwerp. Helps users browse by interest. Included in sitemap, indexed.