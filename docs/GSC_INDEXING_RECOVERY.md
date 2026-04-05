# Google Search Console Indexing Recovery Guide

## Critical Issue Summary

Based on Google Search Console analysis, 72 pages are not indexed with only 9 indexed. This is primarily due to:

1. **New Site Status**: Sitemap submitted March 28, 2026 - very recent from Google's perspective 
2. **Domain Variant Confusion**: Google found multiple domain variants (www/non-www, http/https)
3. **Old WordPress URLs**: Legacy category and blog URLs consuming crawl budget
4. **Low Crawl Budget**: No external authority/backlinks means low crawl priority

## Fixes Implemented

### ✅ 1. Domain Variant Correction
- **Fixed**: Sitemap now uses `hovenier.frl` (not `www.hovenier.frl`)
- **Added**: Middleware for www → non-www redirects (301)
- **Added**: HTTP → HTTPS redirects in middleware

### ✅ 2. Legacy URL Cleanup  
- **Added**: 301 redirects for old WordPress category pages
- **Added**: 301 redirects for old blog post URLs
- **Target**: `/category/tuinverlichting/` → `/diensten/tuinverlichting`

### ✅ 3. Robots.txt Enhancement
- **Added**: Proper sitemap declarations
- **References**: `https://hovenier.frl/sitemap.xml`

### ✅ 4. Hreflang Verification
- **Confirmed**: Next.js metadata API properly implements hreflang tags
- **Languages**: Dutch (nl-NL) and English (en-US) alternates

## Priority Actions for GSC Recovery

### Immediate (Next 24 hours)
1. **Deploy Changes**: Deploy all fixes to production
2. **Request Indexing**: Use URL Inspection for top 10 pages (listed below)
3. **Sitemap Resubmission**: Force-refresh sitemap in GSC

### Priority URLs for Manual Indexing Request

Request indexing for these critical pages via GSC URL Inspection tool:

```
1. https://hovenier.frl/
2. https://hovenier.frl/diensten
3. https://hovenier.frl/contact
4. https://hovenier.frl/hoveniers
5. https://hovenier.frl/kosten
6. https://hovenier.frl/regio
7. https://hovenier.frl/regio/leeuwarden
8. https://hovenier.frl/diensten/tuinonderhoud
9. https://hovenier.frl/algemene-voorwaarden
10. https://hovenier.frl/cookie-beleid
```

### Weekly Monitoring (Next 4 weeks)

**Week 1**: Check daily for indexing progress on priority URLs
**Week 2**: Monitor for 404 errors from old redirected URLs  
**Week 3**: Request indexing for remaining unindexed pages
**Week 4**: Full coverage audit and performance review

## Expected Recovery Timeline

- **24-48 hours**: Priority pages begin appearing in index
- **1-2 weeks**: Significant improvement in indexed page count  
- **3-4 weeks**: Full recovery with 80%+ pages indexed

## Monitoring Commands

Check indexing status:
```bash
# Check total indexed pages
site:hovenier.frl

# Check specific page indexing
site:hovenier.frl/diensten

# Monitor for old URLs still in index (should decrease)  
site:hovenier.frl/category
```

## Root Cause Prevention

1. **External Link Building**: Build authority to increase crawl budget
2. **Internal Linking**: Ensure all pages reachable within 3 clicks from homepage
3. **Content Quality**: Focus on unique, valuable content for better indexing priority
4. **Technical SEO**: Monitor for new crawl errors monthly

---

**Status**: Implementation complete - Deploy and execute indexing requests
**Next Review**: April 12, 2026 (1 week post-implementation)