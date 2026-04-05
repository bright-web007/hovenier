#!/usr/bin/env node
/**
 * Submit all site URLs to IndexNow after a deploy.
 *
 * Usage:
 *   INDEXNOW_KEY=<key> node scripts/indexnow-submit.js
 *   node scripts/indexnow-submit.js   # reads from .env.local automatically
 *
 * Returns exit code 0 on success, 1 on failure.
 */

require('dotenv').config({ path: '.env.local' });

const KEY = process.env.INDEXNOW_KEY;
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://hovenier.frl').replace(/\/$/, '');
const HOST = new URL(BASE_URL).hostname;

if (!KEY) {
  console.error('Error: INDEXNOW_KEY environment variable is not set.');
  process.exit(1);
}

// Mirror the URL list from app/sitemap.ts (Dutch canonical paths only —
// IndexNow only needs one URL per page; hreflang tells engines about /en/).
const PATHS = [
  '/',
  '/diensten',
  '/diensten/tuinonderhoud',
  '/diensten/tuinontwerp',
  '/diensten/groendak',
  '/diensten/tuin-aanleggen',
  '/diensten/stratenmaker',
  '/kosten',
  '/kosten/hovenier-per-uur',
  '/kosten/tuin-aanleggen',
  '/kosten/tuinonderhoud',
  '/kosten/tuinontwerp',
  '/kosten/groendak',
  '/regio',
  '/hoveniers',
  '/hoveniers/tuinservice-friesland',
  '/nieuws',
  '/contact',
  '/over-ons',
  '/samenwerking',
];

const urls = PATHS.map(p => `${BASE_URL}${p === '/' ? '' : p}`);
// Root needs to be the bare domain (no trailing slash)
urls[0] = BASE_URL || `${BASE_URL}/`;

async function submit() {
  console.log(`Submitting ${urls.length} URLs to IndexNow (host: ${HOST})…`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${BASE_URL}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`✓ IndexNow accepted ${urls.length} URLs (HTTP ${res.status})`);
    urls.forEach(u => console.log(`  ${u}`));
    process.exit(0);
  } else {
    const body = await res.text();
    console.error(`✗ IndexNow returned HTTP ${res.status}: ${body}`);
    process.exit(1);
  }
}

submit().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
