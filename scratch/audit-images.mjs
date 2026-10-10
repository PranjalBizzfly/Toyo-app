import fs from 'node:fs';

const pages = [
  { url: '/about-toyoapps', file: 'src/app/about-toyoapps/page.tsx' },
  { url: '/become-a-toyoapps-vendor', file: 'src/app/become-a-toyoapps-vendor/page.tsx' },
  { url: '/blog', file: 'src/app/blog/page.tsx' },
  { url: '/careers', file: 'src/app/careers/page.tsx' },
  { url: '/compare-products', file: 'src/app/compare-products/page.tsx' },
  { url: '/media-and-news', file: 'src/app/media-and-news/page.tsx' },
  { url: '/press-kit', file: 'src/app/press-kit/page.tsx' },
  { url: '/products', file: 'src/app/products/page.tsx' },
  { url: '/publish-and-sell-your-saas', file: 'src/app/publish-and-sell-your-saas/page.tsx' },
  { url: '/support', file: 'src/app/support/page.tsx' },
  { url: '/products/category/[category]', file: 'src/app/products/category/[category]/page.tsx' },
  { url: '/products/[product]/features', file: 'src/app/products/[product]/features/page.tsx' },
  { url: '/products/[product]/features/group/[group]', file: 'src/app/products/[product]/features/group/[group]/page.tsx' },
  { url: 'EntityTemplates', file: 'src/components/templates/EntityTemplates.tsx' },
  { url: 'FeaturePageTemplate', file: 'src/components/templates/FeaturePageTemplate.tsx' },
  { url: 'ProductItemTemplate', file: 'src/components/templates/ProductItemTemplate.tsx' },
  { url: 'ProductPageTemplate', file: 'src/components/templates/ProductPageTemplate.tsx' }
];

for (const p of pages) {
  const content = fs.readFileSync(p.file, 'utf8');
  const imgMatches = [...content.matchAll(/src=["'`](\/[^"'`]+)["'`]/g)].map(m => m[1]);
  console.log(`${p.url} (${p.file}):\n  ${imgMatches.join('\n  ')}`);
}
