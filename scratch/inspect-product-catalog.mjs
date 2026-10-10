import fs from 'node:fs';

// Let's read products from src/content/products
const files = fs.readdirSync('src/content/products').filter(f => f.endsWith('.ts') && f !== 'index.ts');

const productData = [];
for (const file of files) {
  const content = fs.readFileSync('src/content/products/' + file, 'utf8');
  const slug = file.replace(/\.ts$/, '');
  const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
  const tagMatch = content.match(/tagline:\s*["']([^"']+)["']/);
  const catMatch = content.match(/category:\s*["']([^"']+)["']/);
  const colorMatch = content.match(/accentColor:\s*["']([^"']+)["']/);
  
  productData.push({
    slug,
    name: nameMatch ? nameMatch[1] : slug,
    tagline: tagMatch ? tagMatch[1] : '',
    category: catMatch ? catMatch[1] : '',
    accent: colorMatch ? colorMatch[1] : '#2563EB'
  });
}

console.log('Found', productData.length, 'products:');
for (const p of productData) {
  console.log(`${p.slug}: ${p.name} (${p.category}) [${p.accent}]`);
}
