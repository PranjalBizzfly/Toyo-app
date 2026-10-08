async function checkUrls() {
  const urls = [
    'http://localhost:3000/',
    'http://localhost:3000/products',
    'http://localhost:3000/products/cardizo',
    'http://localhost:3000/products/category/sales-marketing',
    'http://localhost:3000/company',
    'http://localhost:3000/publish',
    'http://localhost:3000/support',
    'http://localhost:3000/compare',
    'http://localhost:3000/integrations'
  ];

  console.log('Testing pages for WebP image sources:');
  const imageRegex = /<img\b[^>]*?src="(\/images\/[^"]+)"/g;
  const webpUrlsFound = new Set();

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      let match;
      let count = 0;
      while ((match = imageRegex.exec(text)) !== null) {
        webpUrlsFound.add(match[1]);
        count++;
      }
      console.log(`- ${url}: HTTP ${res.status}, found ${count} image slot(s)`);
    } catch (err) {
      console.error(`- ${url}: ERROR - ${err.message}`);
    }
  }

  console.log('\nChecking unique image URLs found:');
  for (const img of webpUrlsFound) {
    const fullImgUrl = `http://localhost:3000${img}`;
    const imgRes = await fetch(fullImgUrl);
    const contentType = imgRes.headers.get('content-type');
    const isWebp = img.endsWith('.webp') && contentType === 'image/webp';
    if (isWebp && imgRes.status === 200) {
      console.log(`  ✓ ${img} -> HTTP 200 (Content-Type: ${contentType})`);
    } else {
      console.error(`  ✗ ${img} -> HTTP ${imgRes.status} (Content-Type: ${contentType})`);
    }
  }
}

checkUrls();
