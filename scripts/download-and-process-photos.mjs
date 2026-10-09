import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Curated high-resolution professional photography matching the exact content requirements
const photoTasks = [
  // Products
  {
    key: 'sibu',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=85',
    path: 'public/images/products/sibu/card.webp',
    width: 640,
    height: 360,
    alt: 'Creative video editor and post-production artist wearing studio headphones editing multi-track footage on monitors'
  },
  {
    key: 'zapbuzzer',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=85',
    path: 'public/images/products/zapbuzzer/card.webp',
    width: 640,
    height: 360,
    alt: 'Operations specialist managing real-time system alerts, automated triggers and incidents at high-tech workstation'
  },
  {
    key: 'meetingmind',
    url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&q=85',
    path: 'public/images/products/meetingmind/card.webp',
    width: 640,
    height: 360,
    alt: 'Diverse Indian business professionals in an active conference room meeting taking notes and sharing ideas'
  },
  {
    key: 'getbenj',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85',
    path: 'public/images/products/getbenj/card.webp',
    width: 640,
    height: 360,
    alt: 'Growth marketing specialist strategizing multi-channel campaign outreach on a modern laptop in a creative hub'
  },
  {
    key: 'oda7',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=85',
    path: 'public/images/products/oda7/card.webp',
    width: 640,
    height: 360,
    alt: 'Professional sales executive with telephone headset smiling during an enterprise client discovery call'
  },
  {
    key: 'fantom',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85',
    path: 'public/images/products/fantom/card.webp',
    width: 640,
    height: 360,
    alt: 'Cybersecurity and IT systems engineer monitoring verified identity authentication and cloud security'
  },
  {
    key: 'zorfly',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85',
    path: 'public/images/products/zorfly/card.webp',
    width: 640,
    height: 360,
    alt: 'Digital brand manager and content specialist scheduling social media posts and media campaigns on a tablet'
  },
  {
    key: 'zuzu',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85',
    path: 'public/images/products/zuzu/card.webp',
    width: 640,
    height: 360,
    alt: 'Cross-functional engineering and product team collaborating in a huddle booth reviewing agile sprint tasks'
  },
  {
    key: 'tracksuit',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=85',
    path: 'public/images/products/tracksuit/card.webp',
    width: 640,
    height: 360,
    alt: 'Project manager and software engineer analyzing milestone delivery progress and sprint roadmaps'
  },

  // Industries
  {
    key: 'media-creative-agencies',
    url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=85',
    path: 'public/images/industries/media-creative-agencies.webp',
    width: 640,
    height: 360,
    alt: 'Vibrant creative agency team brainstorming campaign concepts in an art studio with design moodboards'
  },
  {
    key: 'startups-and-investors',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85',
    path: 'public/images/industries/startups-and-investors.webp',
    width: 640,
    height: 360,
    alt: 'Indian startup founder presenting growth metrics to venture capital partners in a modern boardroom'
  },

  // Categories
  {
    key: 'sales-marketing',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85',
    path: 'public/images/categories/sales-marketing.webp',
    width: 960,
    height: 360,
    alt: 'Collaborative sales and marketing professionals reviewing high-growth lead generation pipelines on laptops'
  },
  {
    key: 'operations-it',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85',
    path: 'public/images/categories/operations-it.webp',
    width: 960,
    height: 360,
    alt: 'IT operations specialists and cloud engineers managing enterprise system uptime and infrastructure'
  },

  // Catalog & Company
  {
    key: 'products-hero',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85',
    path: 'public/images/catalog/products-hero.webp',
    width: 960,
    height: 360,
    alt: 'Cross-functional team collaborating seamlessly across business departments in modern innovation center'
  },
  {
    key: 'integrations-hero',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=85',
    path: 'public/images/catalog/integrations-hero.webp',
    width: 960,
    height: 360,
    alt: 'Software engineers and product managers discussing API connectivity and business tool integrations'
  },
  {
    key: 'compare-hero',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85',
    path: 'public/images/catalog/compare-hero.webp',
    width: 840,
    height: 370,
    alt: 'Two business leaders analyzing side-by-side software capabilities on a laptop over coffee'
  },
  {
    key: 'publish-hero',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=85',
    path: 'public/images/company/publish-hero.webp',
    width: 1200,
    height: 420,
    alt: 'SaaS founder and software developer smiling confidently in modern loft office after listing their product'
  },
  {
    key: 'publish-steps',
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=85',
    path: 'public/images/company/publish-steps.webp',
    width: 1200,
    height: 360,
    alt: 'Business partners shaking hands across desk sealing software publication and partnership agreement'
  },
  {
    key: 'support-hero',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=85',
    path: 'public/images/company/support-hero.webp',
    width: 840,
    height: 320,
    alt: 'Support specialist with headset smiling warmly ready to provide customer assistance and technical guidance'
  },
  {
    key: 'contact-publish',
    url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=85',
    path: 'public/images/company/contact-publish.webp',
    width: 380,
    height: 340,
    alt: 'ToyoApps publisher relationships manager smiling welcomingly in bright contemporary office lobby'
  },

  // Product Features & Highlights
  {
    key: 'spotlight-1',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1000&q=85',
    path: 'public/images/product/spotlight-1.webp',
    width: 580,
    height: 520,
    alt: 'Professional businesswoman analyzing records and customer data efficiently on a laptop'
  },
  {
    key: 'spotlight-2',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=85',
    path: 'public/images/product/spotlight-2.webp',
    width: 580,
    height: 520,
    alt: 'Product engineer designing automated workflow logic and business triggers on an interactive screen'
  },
  {
    key: 'spotlight-3',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&q=85',
    path: 'public/images/product/spotlight-3.webp',
    width: 580,
    height: 520,
    alt: 'Senior operations leader reviewing performance analytics and statutory compliance audit metrics'
  },
  {
    key: 'section-card',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85',
    path: 'public/images/product/section-card.webp',
    width: 370,
    height: 172,
    alt: 'Team members collaborating on software feature delivery and integration capabilities'
  },

  // Feature templates
  {
    key: 'feature-hero',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=85',
    path: 'public/images/features/feature-hero.webp',
    width: 1000,
    height: 560,
    alt: 'Focused tech professional working productively on software feature execution in bright modern office'
  },
  {
    key: 'feature-screen',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85',
    path: 'public/images/features/feature-screen.webp',
    width: 960,
    height: 540,
    alt: 'Colleagues reviewing feature screen interfaces and discussing end-user experience improvements'
  },
  {
    key: 'group-hero',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&q=85',
    path: 'public/images/features/group-hero.webp',
    width: 560,
    height: 480,
    alt: 'Engineering team leader demonstrating feature capabilities and best practices to teammates'
  },
  {
    key: 'group-feature',
    url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=85',
    path: 'public/images/features/group-feature.webp',
    width: 960,
    height: 540,
    alt: 'Product presentation in glass-walled boardroom highlighting key feature modules'
  },
  {
    key: 'area-illustration',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=85',
    path: 'public/images/features/area-illustration.webp',
    width: 450,
    height: 450,
    alt: 'Professional working focused at standing desk in airy, modern workplace'
  },
  {
    key: 'area-band',
    url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=85',
    path: 'public/images/features/area-band.webp',
    width: 360,
    height: 480,
    alt: 'Specialist reviewing business reports and operational checklists on digital tablet'
  },
  {
    key: 'item-hero',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=85',
    path: 'public/images/features/item-hero.webp',
    width: 1200,
    height: 400,
    alt: 'Executive reviewing strategic software requirements in modern corporate setting'
  },
  {
    key: 'item-screen',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85',
    path: 'public/images/features/item-screen.webp',
    width: 960,
    height: 540,
    alt: 'Specialists discussing specific software capabilities and client use cases'
  },

  // Entity Templates
  {
    key: 'solution-hero',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85',
    path: 'public/images/entity/solution-hero.webp',
    width: 318,
    height: 440,
    alt: 'Confident business executive standing in modern office lobby ready to drive solution transformation'
  },
  {
    key: 'industry-hero',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85',
    path: 'public/images/entity/industry-hero.webp',
    width: 1200,
    height: 320,
    alt: 'Industry professionals collaborating on sector-specific software solutions'
  },
  {
    key: 'integration-hero',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85',
    path: 'public/images/entity/integration-hero.webp',
    width: 960,
    height: 360,
    alt: 'Technical team reviewing integrated cloud systems and API data synchronization'
  },
  {
    key: 'product-tile',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=85',
    path: 'public/images/entity/product-tile.webp',
    width: 400,
    height: 260,
    alt: 'Professional managing day-to-day operations on business software laptop'
  },
  {
    key: 'hub-card',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85',
    path: 'public/images/entity/hub-card.webp',
    width: 370,
    height: 172,
    alt: 'Collaborative team in working session solving business operations'
  },
  {
    key: 'resource-featured',
    url: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1200&q=85',
    path: 'public/images/entity/resource-featured.webp',
    width: 845,
    height: 475,
    alt: 'Professional writing detailed business insights and strategic notes at modern work table'
  },
  {
    key: 'resource-card',
    url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&q=85',
    path: 'public/images/entity/resource-card.webp',
    width: 290,
    height: 163,
    alt: 'Professional reading technical resource guide and best practices on tablet'
  },
  {
    key: 'resource-cover',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85',
    path: 'public/images/entity/resource-cover.webp',
    width: 860,
    height: 484,
    alt: 'Thought leader delivering an impactful presentation to engaged team audience'
  }
];

async function processAll() {
  console.log(`Processing ${photoTasks.length} photographic visuals...`);
  let count = 0;

  for (const t of photoTasks) {
    try {
      const dir = path.dirname(t.path);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const res = await fetch(t.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await sharp(buffer)
        .resize(t.width, t.height, { fit: 'cover', position: 'attention' })
        .webp({ quality: 90, effort: 4 })
        .toFile(t.path);

      count++;
      console.log(`✓ Processed ${t.path} (${t.width}x${t.height})`);
    } catch (err) {
      console.error(`✗ Error processing ${t.path}:`, err.message);
    }
  }

  console.log(`Successfully completed ${count} of ${photoTasks.length} photo tasks.`);
}

processAll();
