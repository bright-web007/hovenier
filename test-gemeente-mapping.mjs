// Test script to verify gemeente link mapping
import { getRegionSlugByGemeenteSlug } from './lib/regions-hierarchy.js';

const defaultRegions = [
  { name: 'Leeuwarden', slug: 'leeuwarden', count: 28 },
  { name: 'Heerenveen', slug: 'heerenveen', count: 19 },
  { name: 'Smallingerland', slug: 'smallingerland', count: 15 },
  { name: 'Súdwest-Fryslân', slug: 'sudwest-fryslan', count: 12 },
  { name: 'Achtkarspelen', slug: 'achtkarspelen', count: 8 },
  { name: 'Tietjerksteradeel', slug: 'tietjerksteradeel', count: 7 },
  { name: 'Dantumadeel', slug: 'dantumadeel', count: 6 },
  { name: 'De Fryske Marren', slug: 'de-fryske-marren', count: 11 },
  { name: 'Waadhoeke', slug: 'waadhoeke', count: 5 },
  { name: 'Noardeast-Fryslân', slug: 'noardeast-fryslan', count: 9 },
  { name: 'Harlingen', slug: 'harlingen', count: 4 }
];

console.log('🔍 Testing gemeente → region mapping:\n');

let allMapped = true;

defaultRegions.forEach((region) => {
  const regionSlug = getRegionSlugByGemeenteSlug(region.slug);
  const href = regionSlug ? `/regio/${regionSlug}/${region.slug}` : `/regio/${region.slug}`;
  
  console.log(`${region.name} (${region.slug})`);
  console.log(`  → Region: ${regionSlug || '❌ NOT FOUND'}`);
  console.log(`  → Link: ${href}`);
  console.log('');
  
  if (!regionSlug) {
    allMapped = false;
  }
});

console.log(allMapped ? '✅ ALL GEMEENTE LINKS MAPPED CORRECTLY!' : '❌ Some gemeente links are not mapped correctly');