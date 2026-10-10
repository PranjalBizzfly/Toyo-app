import fs from 'node:fs';

// Read categories, solutions, comparisons, resources
const categoriesFile = fs.readFileSync('src/content/categories.ts', 'utf8');
const registriesFile = fs.readFileSync('src/content/registries.ts', 'utf8');

console.log('--- Categories ---');
const catMatches = [...categoriesFile.matchAll(/slug:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["']/g)];
for (const m of catMatches) console.log(`Category: ${m[1]} (${m[2]})`);

console.log('--- Solutions ---');
const solMatches = [...registriesFile.matchAll(/slug:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["']/g)];
for (const m of solMatches) console.log(`Entry: ${m[1]} (${m[2]})`);
