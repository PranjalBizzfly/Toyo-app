import fs from 'node:fs';

// Check if any script references p0.webp or pool
const files = fs.readdirSync('scripts');
for (const f of files) {
  if (f.endsWith('.mjs') || f.endsWith('.ps1')) {
    const content = fs.readFileSync('scripts/' + f, 'utf8');
    if (content.includes('pool') || content.includes('p0')) {
      console.log(`Found pool reference in scripts/${f}`);
    }
  }
}
