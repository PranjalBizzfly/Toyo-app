import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (full.endsWith('.svg')) {
      results.push(full);
    }
  }
  return results;
}

const svgs = walk('public/images');
console.log(`Found ${svgs.length} SVGs`);

let errors = [];
let angleErrors = [];

for (const file of svgs) {
  const content = fs.readFileSync(file, 'utf8');
  // Check for bare ampersands
  const bareAmpRegex = /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g;
  let match;
  while ((match = bareAmpRegex.exec(content)) !== null) {
    errors.push({ file, snippet: content.slice(Math.max(0, match.index - 20), match.index + 25) });
  }

  // Check for unescaped < inside text elements: <text[^>]*>([^<]*<[^/][^<]*)</text>
  const textTagRegex = /<text[^>]*>([\s\S]*?)<\/text>/gi;
  let textMatch;
  while ((textMatch = textTagRegex.exec(content)) !== null) {
    const textBody = textMatch[1];
    // if text body contains '<' not as part of a tag like <tspan>
    if (textBody.includes('<') && !textBody.includes('<tspan')) {
      angleErrors.push({ file, text: textBody });
    }
  }
}

console.log('Bare ampersands found:', errors.length);
console.log('Angle bracket text errors found:', angleErrors.length);
if (errors.length > 0) {
  console.log('Sample bare ampersands:', errors.slice(0, 10));
}
if (angleErrors.length > 0) {
  console.log('Sample angle brackets:', angleErrors.slice(0, 10));
}

