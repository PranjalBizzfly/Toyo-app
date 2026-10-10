import fs from 'node:fs';

const hrmagix = fs.readFileSync('src/content/products/hrmagix.ts', 'utf8');
const sibu = fs.readFileSync('src/content/products/sibu.ts', 'utf8');

function getGroups(c) {
  const matches = [...c.matchAll(/group:\s*\{\s*slug:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["']/g)];
  const seen = new Set();
  return matches.map(m => ({ slug: m[1], name: m[2] })).filter(g => {
    if (seen.has(g.slug)) return false;
    seen.add(g.slug);
    return true;
  });
}

console.log('HRMagix groups:', getGroups(hrmagix));
console.log('Sibu groups:', getGroups(sibu));
