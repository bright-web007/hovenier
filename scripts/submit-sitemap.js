#!/usr/bin/env node

/**
 * Submit sitemap to Google/Bing via ping endpoint
 * Usage: node scripts/submit-sitemap.js
 */

const https = require('https');

function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://hovenier.frl';
  return envUrl.replace(/\/$/, '');
}

function ping(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        res.resume();
        resolve({ statusCode });
      })
      .on('error', (err) => reject(err));
  });
}

async function main() {
  const base = getBaseUrl();
  const sitemapUrl = `${base}/sitemap.xml`;

  console.log('Submitting sitemap:', sitemapUrl);

  // Google removed/soft-deprecated the public ping endpoint; pinging Google may
  // either fail or return an error. We'll skip Google and only ping Bing here.
  const bingPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  try {
    const bRes = await ping(bingPing);
    console.log('Bing response status:', bRes.statusCode);
  } catch (err) {
    console.error('Bing ping failed:', err.message || err);
  }

  console.log('Done. If you host the site, allow a few minutes for crawlers to fetch the sitemap.');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Submission script failed:', err);
    process.exit(1);
  });
}
