import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scratch/audit-results.json', 'utf8'));

const imageUsage = new Map();

for (const page of data) {
  for (const img of page.images) {
    const src = img.src;
    if (!imageUsage.has(src)) {
      imageUsage.set(src, []);
    }
    imageUsage.get(src).push({
      page: page.path,
      alt: img.alt,
      heading: img.heading,
      context: img.context,
      dimensions: `${img.naturalWidth}x${img.naturalHeight}`
    });
  }
}

console.log(`=== UNIQUE IMAGES RENDERED ON INNER PAGES (${imageUsage.size} unique image srcs) ===\n`);

for (const [src, uses] of imageUsage.entries()) {
  console.log(`SRC: ${src}`);
  console.log(`  Rendered on ${uses.length} page(s):`);
  for (const u of uses) {
    console.log(`    - Page: ${u.page} | Heading: "${u.heading}" | Alt: "${u.alt}" | Dim: ${u.dimensions}`);
  }
  console.log('');
}
