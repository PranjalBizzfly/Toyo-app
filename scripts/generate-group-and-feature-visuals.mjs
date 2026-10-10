import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function sanitize(svg) {
  return svg.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+|#x[0-9a-fA-F]+;)/g, '&amp;');
}

const groupsData = [
  // HRMagix groups
  {
    productSlug: 'hrmagix',
    productName: 'HRMagix',
    theme: { bg: '#0B1D3A', nav: '#172E54', accent: '#2563EB', accentLight: '#60A5FA', border: '#2B4C85' },
    groups: [
      { slug: 'people', name: 'People Records & Onboarding', desc: 'Central employee directory, digital dossiers, and lifecycle status' },
      { slug: 'time-and-work', name: 'Time, Attendance & Shifts', desc: 'Biometric capture, geofenced clock-in, and leave policy management' },
      { slug: 'performance', name: 'Performance & OKRs', desc: 'Quarterly reviews, goal progress tracking, and 9-box talent matrix' },
      { slug: 'payroll', name: 'Statutory Payroll & Compliance', desc: 'PF, ESI, Professional Tax, TDS auto-deduction, and salary slips' },
      { slug: 'recruitment', name: 'Talent Acquisition & Hiring', desc: 'Applicant pipeline, interview scheduling, and candidate offer letters' },
      { slug: 'analytics', name: 'HR Insights & Workday Metrics', desc: 'Attrition forecasting, headcount budgets, and diversity analytics' }
    ]
  },
  // Sibu groups
  {
    productSlug: 'sibu',
    productName: 'Sibu',
    theme: { bg: '#140D2B', nav: '#241747', accent: '#8B5CF6', accentLight: '#A78BFA', border: '#3B2770' },
    groups: [
      { slug: 'search-discovery', name: 'Semantic Search & Discovery', desc: 'Instant search across filenames, OCR text, and AI audio transcripts' },
      { slug: 'ai', name: 'AI Vision & Auto-Tagging', desc: 'Automatic face detection, object tagging, and duplicate video matching' },
      { slug: 'collaboration', name: 'Timeline Notes & Reviews', desc: 'Frame-accurate video markers, client approval links, and feedback threads' },
      { slug: 'storage-library', name: 'Cloud Drive Ingestion & Vault', desc: 'Automated indexing from Google Drive, Dropbox, and Amazon S3' },
      { slug: 'integrations-workflows', name: 'NLE & Production Workflows', desc: 'Direct plugins for Adobe Premiere, DaVinci Resolve, and Final Cut' }
    ]
  }
];

function generateGroupIllustrationSvg(p, g) {
  const t = p.theme;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450" width="450" height="450">
      <rect width="450" height="450" rx="16" fill="${t.bg}"/>
      <rect x="16" y="16" width="418" height="418" rx="12" fill="${t.nav}" stroke="${t.border}" stroke-width="1.5"/>
      <circle cx="36" cy="36" r="4" fill="#EF4444"/>
      <circle cx="48" cy="36" r="4" fill="#F59E0B"/>
      <circle cx="60" cy="36" r="4" fill="#10B981"/>
      <text x="76" y="40" fill="#94A3B8" font-size="10" font-family="system-ui" font-weight="bold">${p.productName.toUpperCase()} · ${g.slug.toUpperCase()}</text>

      <g transform="translate(32, 64)">
        <rect width="386" height="74" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        <text x="16" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">${g.name}</text>
        <text x="16" y="48" fill="#94A3B8" font-size="10" font-family="system-ui">${g.desc}</text>
        <rect x="290" y="20" width="80" height="20" rx="4" fill="${t.accent}" fill-opacity="0.25"/>
        <text x="330" y="34" fill="${t.accentLight}" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">ACTIVE HUB</text>
      </g>

      <g transform="translate(32, 150)">
        <rect width="386" height="254" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        <!-- Metric box 1 -->
        <rect x="16" y="16" width="168" height="64" rx="6" fill="${t.nav}"/>
        <text x="26" y="34" fill="#94A3B8" font-size="9" font-family="system-ui">STATUS CHECK</text>
        <text x="26" y="56" fill="#10B981" font-size="14" font-weight="bold" font-family="system-ui">✓ Operational</text>

        <!-- Metric box 2 -->
        <rect x="202" y="16" width="168" height="64" rx="6" fill="${t.nav}"/>
        <text x="212" y="34" fill="#94A3B8" font-size="9" font-family="system-ui">DATA SYNC</text>
        <text x="212" y="56" fill="${t.accentLight}" font-size="14" font-weight="bold" font-family="system-ui">Sub-second</text>

        <!-- Process items -->
        <g transform="translate(16, 92)">
          <rect width="354" height="40" rx="6" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
          <circle cx="20" cy="20" r="6" fill="${t.accent}"/>
          <text x="36" y="24" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Verified Enterprise Workflow Policy</text>

          <rect y="48" width="354" height="40" rx="6" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
          <circle cx="20" cy="68" r="6" fill="${t.accent}"/>
          <text x="36" y="72" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Audited Regulatory Record History</text>

          <rect y="96" width="354" height="40" rx="6" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
          <circle cx="20" cy="116" r="6" fill="${t.accent}"/>
          <text x="36" y="120" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Encrypted Automated API Handlers</text>
        </g>
      </g>
    </svg>
  `;
}

function generateGroupBandSvg(p, g) {
  const t = p.theme;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width="360" height="480">
      <rect width="360" height="480" rx="14" fill="${t.bg}"/>
      <rect x="12" y="12" width="336" height="456" rx="10" fill="${t.nav}" stroke="${t.border}" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="3" fill="#EF4444"/>
      <circle cx="38" cy="28" r="3" fill="#F59E0B"/>
      <circle cx="48" cy="28" r="3" fill="#10B981"/>
      <text x="60" y="31" fill="#94A3B8" font-size="9" font-family="system-ui" font-weight="bold">${p.productName.toUpperCase()}</text>

      <g transform="translate(24, 52)">
        <rect width="312" height="64" rx="6" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        <text x="14" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">${g.name}</text>
        <text x="14" y="44" fill="${t.accentLight}" font-size="10" font-family="system-ui">Feature Capability Matrix</text>
      </g>

      <g transform="translate(24, 126)">
        <rect width="312" height="318" rx="6" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        
        <!-- Feature items list -->
        <g transform="translate(14, 14)">
          <rect width="284" height="46" rx="4" fill="${t.nav}"/>
          <text x="12" y="24" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Module 1 · Intake &amp; Validation</text>
          <text x="12" y="38" fill="#10B981" font-size="9" font-family="system-ui">✓ Instant Rule Check</text>

          <rect y="56" width="284" height="46" rx="4" fill="${t.nav}"/>
          <text x="12" y="80" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Module 2 · Processing Pipeline</text>
          <text x="12" y="94" fill="${t.accentLight}" font-size="9" font-family="system-ui">✓ Automated Execution</text>

          <rect y="112" width="284" height="46" rx="4" fill="${t.nav}"/>
          <text x="12" y="136" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Module 3 · Event Logging &amp; SLA</text>
          <text x="12" y="150" fill="#10B981" font-size="9" font-family="system-ui">✓ Zero-Latency Dispatch</text>

          <rect y="168" width="284" height="110" rx="4" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
          <text x="14" y="190" fill="#94A3B8" font-size="9" font-family="system-ui">COMPLIANCE / UPTIME</text>
          <text x="14" y="214" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="system-ui">99.98% SLA</text>
          <text x="14" y="234" fill="${t.accentLight}" font-size="10" font-family="system-ui">Continuous Real-Time Monitoring</text>
          <text x="14" y="254" fill="#10B981" font-size="9" font-family="system-ui">✓ Verified System Pass</text>
        </g>
      </g>
    </svg>
  `;
}

async function run() {
  console.log('Generating group visuals for HRMagix and Sibu...');
  let count = 0;

  for (const p of groupsData) {
    const groupDir = path.join('public', 'images', 'products', p.productSlug, 'groups');
    ensureDir(groupDir);

    for (const g of p.groups) {
      // 1. Illustration (450x450)
      const illSvg = sanitize(generateGroupIllustrationSvg(p, g));
      const illDest = path.join(groupDir, `${g.slug}-illustration.webp`);
      await sharp(Buffer.from(illSvg), { density: 144 })
        .webp({ quality: 92, effort: 4 })
        .toFile(illDest);
      count++;

      // 2. Band (360x480)
      const bandSvg = sanitize(generateGroupBandSvg(p, g));
      const bandDest = path.join(groupDir, `${g.slug}-band.webp`);
      await sharp(Buffer.from(bandSvg), { density: 144 })
        .webp({ quality: 92, effort: 4 })
        .toFile(bandDest);
      count++;
    }
  }

  console.log(`Generated ${count} unique feature group visuals!`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
