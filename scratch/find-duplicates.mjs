import fs from 'node:fs';
import path from 'node:path';
import crypto from 'crypto';

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
const hashes = new Map();

for (const f of files) {
  const buf = fs.readFileSync(f);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  if (!hashes.has(hash)) hashes.set(hash, []);
  hashes.get(hash).push(f);
}

console.log('--- DUPLICATE IMAGES (Identical file content) ---');
for (const [hash, group] of hashes.entries()) {
  if (group.length > 1) {
    console.log(`Hash ${hash.slice(0, 8)} (${group.length} files):`);
    group.forEach(g => console.log(`  - ${g}`));
  }
}
