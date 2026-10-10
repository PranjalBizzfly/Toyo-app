import fs from 'node:fs';

const crawlData = JSON.parse(fs.readFileSync('scratch/audit-results.json', 'utf8'));
const map = new Map();

for (const p of crawlData) {
  const route = p.path;
  if (!route || route === '/' || route === '') continue; // strictly exclude homepage
  for (const img of p.images) {
    if (!img.src || img.src.startsWith('data:') || img.src.includes('logo')) continue;
    if (!map.has(img.src)) map.set(img.src, []);
    map.get(img.src).push(route);
  }
}

console.log('REPEATED IMAGES REPORT:');
let totalRepeatedInstances = 0;
for (const [src, routes] of map.entries()) {
  const uniqueRoutes = [...new Set(routes)];
  if (uniqueRoutes.length > 1) {
    console.log(`\nImage: ${src}`);
    console.log(`Used on ${uniqueRoutes.length} pages (${routes.length} total occurrences)`);
    console.log(`Sample routes:`, uniqueRoutes.slice(0, 5));
    totalRepeatedInstances += routes.length;
  }
}
console.log(`\nTotal repeated occurrences: ${totalRepeatedInstances}`);
