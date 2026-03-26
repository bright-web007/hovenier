// Quick test to check if regions data functions are working
import { regionHubs, standaloneRegions, getRegionHubBySlug, getGemeenteBySlug } from './lib/regions-hierarchy.js';

console.log('Testing region data functions...\n');

// Test region hubs
console.log('Region Hubs:');
regionHubs.forEach(hub => {
  console.log(`  ${hub.slug} → ${hub.name} (${hub.gemeentes.length} gemeentes)`);
});

console.log('\nStandalone Regions:');
standaloneRegions.forEach(region => {
  console.log(`  ${region.slug} → ${region.name}`);
});

console.log('\nTesting lookup functions:');
const testSlugs = ['leeuwarden', 'noordwest-friesland', 'noordoost-friesland', 'centraal-friesland', 'zuidwest-friesland'];

testSlugs.forEach(slug => {
  const regionHub = getRegionHubBySlug(slug);
  const gemeente = getGemeenteBySlug(slug);
  
  console.log(`${slug}:`);
  console.log(`  Hub found: ${regionHub ? regionHub.name : 'No'}`);
  console.log(`  Gemeente found: ${gemeente ? gemeente.name : 'No'}`);
});