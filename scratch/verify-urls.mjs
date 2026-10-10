const testUrls = [
  { key: 'about-team', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&q=80' },
  { key: 'vendors-hero', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&q=80' },
  { key: 'publish-hero', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&q=80' },
  { key: 'publish-steps', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&q=80' },
  { key: 'support-hero', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80' },
  { key: 'blog-hero', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&q=80' },
  { key: 'careers-hero', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&q=80' },
  { key: 'media-hero', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&q=80' },
  { key: 'press-kit-hero', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100&q=80' },
  { key: 'products-hero', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&q=80' },
  { key: 'compare-hero', url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=100&q=80' },
  { key: 'integrations-hero', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80' },
  { key: 'sales-marketing', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&q=80' },
  { key: 'operations-it', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&q=80' },
  { key: 'hr-people', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80' },
  { key: 'finance-compliance', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&q=80' },
  { key: 'insights-research', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&q=80' },
  { key: 'hub-card', url: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=100&q=80' },
  { key: 'p4', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=100&q=80' },
  { key: 'p7', url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=100&q=80' },
  { key: 'p6', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&q=80' },
  { key: 'tour', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&q=80' },
  { key: 'area-illustration', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&q=80' },
  { key: 'area-band', url: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=100&q=80' },
  { key: 'group-hero', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&q=80' },
  { key: 'group-feature', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&q=80' },
  { key: 'feature-hero', url: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=100&q=80' },
  { key: 'feature-screen', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&q=80' },
  { key: 'item-hero', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80' },
  { key: 'item-screen', url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&q=80' },
  { key: 'product-tile', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&q=80' },
  { key: 'solution-hero', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  { key: 'industry-hero', url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=100&q=80' },
  { key: 'resource-featured', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=100&q=80' },
  { key: 'resource-card', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&q=80' },
  { key: 'resource-cover', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=100&q=80' }
];

async function verifyAll() {
  console.log(`Verifying ${testUrls.length} candidate URLs...`);
  let passed = 0;
  for (const t of testUrls) {
    try {
      const res = await fetch(t.url);
      if (res.ok) {
        passed++;
        console.log(`✓ ${t.key}: HTTP ${res.status}`);
      } else {
        console.error(`✗ ${t.key}: HTTP ${res.status}`);
      }
    } catch (e) {
      console.error(`✗ ${t.key}: ${e.message}`);
    }
  }
  console.log(`Passed ${passed} of ${testUrls.length}`);
}

verifyAll();
