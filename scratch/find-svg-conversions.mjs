import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.webp')) {
      results.push(full.replace(/\\/g, '/'));
    }
  }
  return results;
}

const files = walk('public/images');
for (const f of files) {
  const stat = fs.statSync(f);
  const svg = f.replace(/\.webp$/, '.svg');
  const hasSvg = fs.existsSync(svg);
  if (hasSvg && stat.size < 20000) {
    console.log(`Likely SVG-vector placeholder: ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
}
