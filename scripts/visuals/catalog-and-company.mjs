import fs from "node:fs";
import path from "node:path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function generateCatalogAndCompany() {
  ensureDir(path.join("public", "images", "catalog"));
  ensureDir(path.join("public", "images", "company"));

  // 1. Catalog Visuals
  const catalog = [
    {
      file: "products-hero.svg",
      width: 960,
      height: 360,
      render: () => `
        <rect width="960" height="360" rx="16" fill="#0B132B"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#152444" stroke="#3A86FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8D99AE" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Unified Business Software Directory</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#3A86FF" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#3A86FF" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">16 Verified Products</text>

        <!-- Search & Filter Bar -->
        <g transform="translate(48, 76)">
          <rect width="864" height="42" rx="8" fill="#0B132B" stroke="#253A66" stroke-width="1"/>
          <text x="20" y="26" fill="#8D99AE" font-size="14" font-family="system-ui">🔍 Search apps by business function, task, or integration...</text>
          <rect x="710" y="8" width="140" height="26" rx="6" fill="#3A86FF"/>
          <text x="780" y="25" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Browse All Apps</text>
        </g>

        <!-- Category Filter Pills -->
        <g transform="translate(48, 130)">
          <rect width="130" height="26" rx="13" fill="#3A86FF"/>
          <text x="65" y="17" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">● All Categories</text>

          <rect x="140" width="145" height="26" rx="13" fill="#1C2E54"/>
          <text x="212" y="17" fill="#8D99AE" font-size="10" font-family="system-ui" text-anchor="middle">Sales & Marketing (4)</text>

          <rect x="295" width="130" height="26" rx="13" fill="#1C2E54"/>
          <text x="360" y="17" fill="#8D99AE" font-size="10" font-family="system-ui" text-anchor="middle">HR & People (3)</text>

          <rect x="435" width="145" height="26" rx="13" fill="#1C2E54"/>
          <text x="507" y="17" fill="#8D99AE" font-size="10" font-family="system-ui" text-anchor="middle">Operations & IT (3)</text>

          <rect x="590" width="165" height="26" rx="13" fill="#1C2E54"/>
          <text x="672" y="17" fill="#8D99AE" font-size="10" font-family="system-ui" text-anchor="middle">Finance & Compliance (1)</text>

          <rect x="765" width="147" height="26" rx="13" fill="#1C2E54"/>
          <text x="838" y="17" fill="#8D99AE" font-size="10" font-family="system-ui" text-anchor="middle">Insights & Research (3)</text>
        </g>

        <!-- Product Cards Showcase Row -->
        <g transform="translate(48, 172)">
          <!-- Card 1: Cardizo -->
          <g transform="translate(0, 0)">
            <rect width="204" height="140" rx="8" fill="#0B132B" stroke="#253A66" stroke-width="1"/>
            <text x="14" y="24" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Cardizo</text>
            <rect x="135" y="12" width="55" height="16" rx="4" fill="#3A86FF" fill-opacity="0.2"/>
            <text x="162" y="24" fill="#3A86FF" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">AI SCAN</text>
            <text x="14" y="44" fill="#8D99AE" font-size="10" font-family="system-ui">Business cards ➔ contacts</text>
            <line x1="14" y1="56" x2="190" y2="56" stroke="#1C2E54" stroke-width="1"/>
            <text x="14" y="74" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ Instant WhatsApp link</text>
            <text x="14" y="90" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ Google Contacts export</text>
            <text x="14" y="120" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Free trial available</text>
          </g>

          <!-- Card 2: SigChanger -->
          <g transform="translate(220, 0)">
            <rect width="204" height="140" rx="8" fill="#0B132B" stroke="#253A66" stroke-width="1"/>
            <text x="14" y="24" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">SigChanger</text>
            <rect x="135" y="12" width="55" height="16" rx="4" fill="#1A73E8" fill-opacity="0.2"/>
            <text x="162" y="24" fill="#60A5FA" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">G-SUITE</text>
            <text x="14" y="44" fill="#8D99AE" font-size="10" font-family="system-ui">Workspace Gmail signatures</text>
            <line x1="14" y1="56" x2="190" y2="56" stroke="#1C2E54" stroke-width="1"/>
            <text x="14" y="74" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ Server-side rollout</text>
            <text x="14" y="90" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ Centralized drag & drop</text>
            <text x="14" y="120" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Free trial available</text>
          </g>

          <!-- Card 3: TrackySuite -->
          <g transform="translate(440, 0)">
            <rect width="204" height="140" rx="8" fill="#0B132B" stroke="#253A66" stroke-width="1"/>
            <text x="14" y="24" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">TrackySuite</text>
            <rect x="135" y="12" width="55" height="16" rx="4" fill="#0D9488" fill-opacity="0.2"/>
            <text x="162" y="24" fill="#5EEAD4" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">CA & CS</text>
            <text x="14" y="44" fill="#8D99AE" font-size="10" font-family="system-ui">Statutory practice calendar</text>
            <line x1="14" y1="56" x2="190" y2="56" stroke="#1C2E54" stroke-width="1"/>
            <text x="14" y="74" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ GST, TDS, ROC deadlines</text>
            <text x="14" y="90" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ Client document portal</text>
            <text x="14" y="120" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Free trial available</text>
          </g>

          <!-- Card 4: HRMagix -->
          <g transform="translate(660, 0)">
            <rect width="204" height="140" rx="8" fill="#0B132B" stroke="#253A66" stroke-width="1"/>
            <text x="14" y="24" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">HRMagix</text>
            <rect x="135" y="12" width="55" height="16" rx="4" fill="#2563EB" fill-opacity="0.2"/>
            <text x="162" y="24" fill="#93C5FD" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">PAYROLL</text>
            <text x="14" y="44" fill="#8D99AE" font-size="10" font-family="system-ui">Indian HRMS & statutory slips</text>
            <line x1="14" y1="56" x2="190" y2="56" stroke="#1C2E54" stroke-width="1"/>
            <text x="14" y="74" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ PF, ESI, PT, TDS</text>
            <text x="14" y="90" fill="#E2E8F0" font-size="9" font-family="system-ui">✓ Biometrics & shifts</text>
            <text x="14" y="120" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Free trial available</text>
          </g>
        </g>
      `
    },
    {
      file: "integrations-hero.svg",
      width: 960,
      height: 360,
      render: () => `
        <rect width="960" height="360" rx="16" fill="#0C1527"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#15243F" stroke="#00D2FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#7DD3FC" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Connected Ecosystem & Integrations Mesh</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#00D2FF" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#00D2FF" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Live Data Pipelines</text>

        <!-- Central Hub Diagram -->
        <!-- Center Hub -->
        <g transform="translate(410, 140)">
          <rect width="140" height="90" rx="12" fill="#00D2FF" fill-opacity="0.15" stroke="#00D2FF" stroke-width="2"/>
          <circle cx="70" cy="35" r="18" fill="#00D2FF"/>
          <text x="70" y="41" fill="#0C1527" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">⚡</text>
          <text x="70" y="70" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">ToyoApps Hub</text>
        </g>

        <!-- Surrounding Integration Nodes -->
        <!-- Node 1: Google Workspace (Top Left) -->
        <g transform="translate(80, 80)">
          <line x1="180" y1="40" x2="330" y2="80" stroke="#00D2FF" stroke-width="2" stroke-dasharray="4 2"/>
          <rect width="180" height="60" rx="8" fill="#0B1321" stroke="#253E66" stroke-width="1"/>
          <circle cx="28" cy="30" r="14" fill="#1A73E8"/>
          <text x="28" y="35" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">G</text>
          <text x="52" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Google Workspace</text>
          <text x="52" y="42" fill="#7DD3FC" font-size="10" font-family="system-ui">SigChanger Gmail API</text>
        </g>

        <!-- Node 2: WhatsApp & Telegram (Bottom Left) -->
        <g transform="translate(80, 220)">
          <line x1="180" y1="30" x2="330" y2="0" stroke="#00D2FF" stroke-width="2" stroke-dasharray="4 2"/>
          <rect width="180" height="60" rx="8" fill="#0B1321" stroke="#253E66" stroke-width="1"/>
          <circle cx="28" cy="30" r="14" fill="#25D366"/>
          <text x="28" y="35" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">W</text>
          <text x="52" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">WhatsApp & Telegram</text>
          <text x="52" y="42" fill="#7DD3FC" font-size="10" font-family="system-ui">ZapBuzzer, Cardizo, Fantom</text>
        </g>

        <!-- Node 3: Cloud Storage - Drive, Dropbox, AWS S3 (Top Right) -->
        <g transform="translate(700, 80)">
          <line x1="0" y1="40" x2="-150" y2="80" stroke="#00D2FF" stroke-width="2" stroke-dasharray="4 2"/>
          <rect width="180" height="60" rx="8" fill="#0B1321" stroke="#253E66" stroke-width="1"/>
          <circle cx="28" cy="30" r="14" fill="#F59E0B"/>
          <text x="28" y="35" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">☁</text>
          <text x="52" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">AWS S3, Drive, Dropbox</text>
          <text x="52" y="42" fill="#7DD3FC" font-size="10" font-family="system-ui">Sibu Asset Ingestion</text>
        </g>

        <!-- Node 4: Creative & Slack Tools (Bottom Right) -->
        <g transform="translate(700, 220)">
          <line x1="0" y1="30" x2="-150" y2="0" stroke="#00D2FF" stroke-width="2" stroke-dasharray="4 2"/>
          <rect width="180" height="60" rx="8" fill="#0B1321" stroke="#253E66" stroke-width="1"/>
          <circle cx="28" cy="30" r="14" fill="#A855F7"/>
          <text x="28" y="35" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">#</text>
          <text x="52" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Slack, Figma & Premiere</text>
          <text x="52" y="42" fill="#7DD3FC" font-size="10" font-family="system-ui">Creative Ops & Webhooks</text>
        </g>
      `
    },
    {
      file: "compare-hero.svg",
      width: 840,
      height: 370,
      render: () => `
        <rect width="840" height="370" rx="16" fill="#0F172A"/>
        <rect x="24" y="24" width="792" height="322" rx="12" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Side-by-Side Product Comparison Matrix</text>
        <rect x="660" y="38" width="130" height="24" rx="12" fill="#38BDF8" fill-opacity="0.2"/>
        <text x="725" y="54" fill="#38BDF8" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Objective Criteria</text>

        <!-- Comparison Table Frame -->
        <g transform="translate(48, 80)">
          <rect width="744" height="246" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
          <!-- Table Header -->
          <rect width="744" height="42" rx="8" fill="#1E293B"/>
          <text x="20" y="26" fill="#94A3B8" font-size="11" font-weight="bold" font-family="system-ui">COMPARISON CRITERION</text>
          <text x="320" y="26" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">ToyoApps Solution</text>
          <text x="560" y="26" fill="#94A3B8" font-size="12" font-weight="bold" font-family="system-ui">Fragmented Point Tools</text>

          <!-- Row 1 -->
          <line x1="0" y1="42" x2="744" y2="42" stroke="#334155" stroke-width="1"/>
          <text x="20" y="70" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Information Source & Accuracy</text>
          <text x="20" y="84" fill="#94A3B8" font-size="10" font-family="system-ui">Real capabilities vs marketing spin</text>
          <rect x="320" y="58" width="180" height="26" rx="4" fill="#10B981" fill-opacity="0.15"/>
          <text x="330" y="75" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">✓ Audited from Official Records</text>
          <text x="560" y="75" fill="#EF4444" font-size="10" font-family="system-ui">✕ Unverifiable vanity claims</text>

          <!-- Row 2 -->
          <line x1="0" y1="102" x2="744" y2="102" stroke="#334155" stroke-width="1"/>
          <text x="20" y="130" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Discovery Architecture</text>
          <text x="20" y="144" fill="#94A3B8" font-size="10" font-family="system-ui">Finding the right tool for the job</text>
          <rect x="320" y="118" width="180" height="26" rx="4" fill="#10B981" fill-opacity="0.15"/>
          <text x="330" y="135" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">✓ 4 Entry Vectors (Job First)</text>
          <text x="560" y="135" fill="#EF4444" font-size="10" font-family="system-ui">✕ Unsorted flat app directory</text>

          <!-- Row 3 -->
          <line x1="0" y1="162" x2="744" y2="162" stroke="#334155" stroke-width="1"/>
          <text x="20" y="190" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Pricing & Plan Transparency</text>
          <text x="20" y="204" fill="#94A3B8" font-size="10" font-family="system-ui">Clear tier breakdown without sales calls</text>
          <rect x="320" y="178" width="180" height="26" rx="4" fill="#10B981" fill-opacity="0.15"/>
          <text x="330" y="195" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">✓ Exact as-of Date & Currency</text>
          <text x="560" y="195" fill="#EF4444" font-size="10" font-family="system-ui">✕ Hidden pricing behind sales gates</text>
        </g>
      `
    }
  ];

  for (const c of catalog) {
    const filePath = path.join("public", "images", "catalog", c.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${c.width}" height="${c.height}" viewBox="0 0 ${c.width} ${c.height}" fill="none">
  ${c.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }

  // 2. Company Visuals
  const company = [
    {
      file: "about-team.svg",
      width: 1440,
      height: 720,
      render: () => `
        <rect width="1440" height="720" rx="20" fill="#080F1E"/>
        <rect x="32" y="32" width="1376" height="656" rx="16" fill="#0F1C36" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="64" cy="64" r="7" fill="#EF4444"/>
        <circle cx="86" cy="64" r="7" fill="#F59E0B"/>
        <circle cx="108" cy="64" r="7" fill="#10B981"/>
        <text x="140" y="70" fill="#94A3B8" font-size="16" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Platform Architecture & Ecosystem Infrastructure</text>
        <rect x="1160" y="50" width="220" height="30" rx="15" fill="#2563EB" fill-opacity="0.2"/>
        <text x="1270" y="70" fill="#60A5FA" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">One Home for Business Software</text>

        <!-- Platform Architecture Diagram -->
        <!-- Top Tier: Buyers & Software Makers -->
        <g transform="translate(96, 120)">
          <rect width="1248" height="90" rx="10" fill="#15264A" stroke="#2D4D8E" stroke-width="1"/>
          <text x="32" y="36" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="system-ui">1. Discovery & Publisher Experience Layer</text>
          <text x="32" y="62" fill="#94A3B8" font-size="13" font-family="system-ui">Unified Navigation · Category Taxonomy · Verified Technical Specifications · Maker Listing Workbench</text>
          <rect x="1050" y="25" width="160" height="40" rx="8" fill="#2563EB"/>
          <text x="1130" y="50" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui" text-anchor="middle">Browse & Publish</text>
        </g>

        <!-- Mid Tier: The 5 Functional Ecosystem Hubs -->
        <g transform="translate(96, 240)">
          <!-- Box 1 -->
          <g transform="translate(0, 0)">
            <rect width="230" height="200" rx="10" fill="#0A162D" stroke="#1E3766" stroke-width="1"/>
            <rect x="16" y="16" width="36" height="36" rx="8" fill="#3A86FF" fill-opacity="0.2"/>
            <text x="34" y="40" fill="#3A86FF" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui">📈</text>
            <text x="64" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Sales & Marketing</text>
            <text x="64" y="48" fill="#8D99AE" font-size="11" font-family="system-ui">4 Active Tools</text>
            <line x1="16" y1="64" x2="214" y2="64" stroke="#1E3766" stroke-width="1"/>
            <text x="16" y="88" fill="#E2E8F0" font-size="11" font-family="system-ui">● Cardizo (AI Card Scan)</text>
            <text x="16" y="112" fill="#E2E8F0" font-size="11" font-family="system-ui">● ODA7 (Sales Dialer)</text>
            <text x="16" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">● GetBenj (Marketing Plan)</text>
            <text x="16" y="160" fill="#E2E8F0" font-size="11" font-family="system-ui">● Sibu (Video DAM)</text>
          </g>

          <!-- Box 2 -->
          <g transform="translate(254, 0)">
            <rect width="230" height="200" rx="10" fill="#0A162D" stroke="#1E3766" stroke-width="1"/>
            <rect x="16" y="16" width="36" height="36" rx="8" fill="#2563EB" fill-opacity="0.2"/>
            <text x="34" y="40" fill="#2563EB" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui">👥</text>
            <text x="64" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">HR & People</text>
            <text x="64" y="48" fill="#93C5FD" font-size="11" font-family="system-ui">3 Active Tools</text>
            <line x1="16" y1="64" x2="214" y2="64" stroke="#1E3766" stroke-width="1"/>
            <text x="16" y="88" fill="#E2E8F0" font-size="11" font-family="system-ui">● HRMagix (Indian HRMS)</text>
            <text x="16" y="112" fill="#E2E8F0" font-size="11" font-family="system-ui">● ZUZU (Workday Insight)</text>
            <text x="16" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">● Zorfly (Daily Missions)</text>
            <text x="16" y="160" fill="#10B981" font-size="11" font-family="system-ui">Statutory PF/ESI Ready</text>
          </g>

          <!-- Box 3 -->
          <g transform="translate(508, 0)">
            <rect width="230" height="200" rx="10" fill="#0A162D" stroke="#1E3766" stroke-width="1"/>
            <rect x="16" y="16" width="36" height="36" rx="8" fill="#06B6D4" fill-opacity="0.2"/>
            <text x="34" y="40" fill="#06B6D4" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui">⚙</text>
            <text x="64" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Operations & IT</text>
            <text x="64" y="48" fill="#7DD3FC" font-size="11" font-family="system-ui">3 Active Tools</text>
            <line x1="16" y1="64" x2="214" y2="64" stroke="#1E3766" stroke-width="1"/>
            <text x="16" y="88" fill="#E2E8F0" font-size="11" font-family="system-ui">● ZapBuzzer (SLA Buzzer)</text>
            <text x="16" y="112" fill="#E2E8F0" font-size="11" font-family="system-ui">● SigChanger (Gmail Signatures)</text>
            <text x="16" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">● Fantom (Cloud SIM Tracker)</text>
            <text x="16" y="160" fill="#F59E0B" font-size="11" font-family="system-ui">Fleetras Ops Ready</text>
          </g>

          <!-- Box 4 -->
          <g transform="translate(762, 0)">
            <rect width="230" height="200" rx="10" fill="#0A162D" stroke="#1E3766" stroke-width="1"/>
            <rect x="16" y="16" width="36" height="36" rx="8" fill="#0D9488" fill-opacity="0.2"/>
            <text x="34" y="40" fill="#0D9488" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui">⚖</text>
            <text x="64" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Finance & Compliance</text>
            <text x="64" y="48" fill="#5EEAD4" font-size="11" font-family="system-ui">Indian CA/CS Focus</text>
            <line x1="16" y1="64" x2="214" y2="64" stroke="#1E3766" stroke-width="1"/>
            <text x="16" y="88" fill="#E2E8F0" font-size="11" font-family="system-ui">● TrackySuite Practice Hub</text>
            <text x="16" y="112" fill="#E2E8F0" font-size="11" font-family="system-ui">● GST 3B & TDS Deadlines</text>
            <text x="16" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">● Client Document Portal</text>
            <text x="16" y="160" fill="#10B981" font-size="11" font-family="system-ui">Zero Penalty SLA</text>
          </g>

          <!-- Box 5 -->
          <g transform="translate(1016, 0)">
            <rect width="232" height="200" rx="10" fill="#0A162D" stroke="#1E3766" stroke-width="1"/>
            <rect x="16" y="16" width="36" height="36" rx="8" fill="#10B981" fill-opacity="0.2"/>
            <text x="34" y="40" fill="#10B981" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui">🔍</text>
            <text x="64" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Insights & Research</text>
            <text x="64" y="48" fill="#6EE7B7" font-size="11" font-family="system-ui">3 Active Tools</text>
            <line x1="16" y1="64" x2="216" y2="64" stroke="#1E3766" stroke-width="1"/>
            <text x="16" y="88" fill="#E2E8F0" font-size="11" font-family="system-ui">● Sizoru (TAM/SAM/SOM)</text>
            <text x="16" y="112" fill="#E2E8F0" font-size="11" font-family="system-ui">● GetBenj (Strategy PDF)</text>
            <text x="16" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">● ZUZU (Activity Reports)</text>
            <text x="16" y="160" fill="#38BDF8" font-size="11" font-family="system-ui">Tier-1 Verified Sources</text>
          </g>
        </g>

        <!-- Bottom Tier: Shared Infrastructure & Security Core -->
        <g transform="translate(96, 470)">
          <rect width="1248" height="170" rx="10" fill="#060C18" stroke="#16294C" stroke-width="1"/>
          <text x="32" y="36" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Platform Foundation & Verification Pipeline</text>
          <text x="32" y="58" fill="#94A3B8" font-size="12" font-family="system-ui">Every claim, feature and pricing tier is audited directly against official sources before publication.</text>
          
          <g transform="translate(32, 80)">
            <rect width="280" height="60" rx="8" fill="#0F1C36"/>
            <text x="16" y="24" fill="#60A5FA" font-size="12" font-weight="bold" font-family="system-ui">1. Provenance Audit</text>
            <text x="16" y="44" fill="#94A3B8" font-size="10" font-family="system-ui">Zero unverified stats or fake reviews</text>
          </g>
          <g transform="translate(340, 80)">
            <rect width="280" height="60" rx="8" fill="#0F1C36"/>
            <text x="16" y="24" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">2. Single-Sign-On Ready</text>
            <text x="16" y="44" fill="#94A3B8" font-size="10" font-family="system-ui">Unified account access across SaaS suite</text>
          </g>
          <g transform="translate(648, 80)">
            <rect width="280" height="60" rx="8" fill="#0F1C36"/>
            <text x="16" y="24" fill="#F59E0B" font-size="12" font-weight="bold" font-family="system-ui">3. Automated Publisher Payouts</text>
            <text x="16" y="44" fill="#94A3B8" font-size="10" font-family="system-ui">Subscription billing without building a store</text>
          </g>
          <g transform="translate(956, 80)">
            <rect width="260" height="60" rx="8" fill="#0F1C36"/>
            <text x="16" y="24" fill="#A855F7" font-size="12" font-weight="bold" font-family="system-ui">4. SOC-2 / Privacy Protocols</text>
            <text x="16" y="44" fill="#94A3B8" font-size="10" font-family="system-ui">On-device privacy masking & security</text>
          </g>
        </g>
      `
    },
    {
      file: "publish-hero.svg",
      width: 1200,
      height: 420,
      render: () => `
        <rect width="1200" height="420" rx="16" fill="#0D1117"/>
        <rect x="24" y="24" width="1152" height="372" rx="12" fill="#161B22" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8B949E" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Software Maker Publisher Portal</text>
        <rect x="990" y="38" width="160" height="24" rx="12" fill="#10B981" fill-opacity="0.2"/>
        <text x="1070" y="54" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Publisher Console Live</text>

        <!-- Left: Listing Configuration Console -->
        <g transform="translate(48, 76)">
          <rect width="580" height="300" rx="8" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="20" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Product Listing Configuration</text>

          <g transform="translate(20, 44)">
            <text x="0" y="16" fill="#8B949E" font-size="10" font-family="system-ui">PRODUCT NAME</text>
            <rect y="24" width="260" height="32" rx="4" fill="#21262D"/>
            <text x="12" y="44" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">CloudScale Monitor Pro</text>

            <text x="280" y="16" fill="#8B949E" font-size="10" font-family="system-ui">PRIMARY BUSINESS FUNCTION</text>
            <rect x="280" y="24" width="260" height="32" rx="4" fill="#21262D"/>
            <text x="292" y="44" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Operations & IT</text>
          </g>

          <g transform="translate(20, 116)">
            <text x="0" y="16" fill="#8B949E" font-size="10" font-family="system-ui">PRICING MODELS & BILLING</text>
            <rect y="24" width="540" height="48" rx="6" fill="#21262D"/>
            <text x="12" y="44" fill="#10B981" font-size="11" font-weight="bold" font-family="system-ui">● Starter ($29/mo)</text>
            <text x="180" y="44" fill="#38BDF8" font-size="11" font-weight="bold" font-family="system-ui">● Pro ($79/mo)</text>
            <text x="340" y="44" fill="#A855F7" font-size="11" font-weight="bold" font-family="system-ui">● Enterprise (Custom)</text>
            <text x="12" y="60" fill="#8B949E" font-size="9" font-family="system-ui">Subscriptions & payouts managed automatically by ToyoApps</text>
          </g>

          <g transform="translate(20, 196)">
            <rect width="540" height="84" rx="6" fill="#1C2128" stroke="#30363D" stroke-width="1"/>
            <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Listing Checklist</text>
            <text x="16" y="42" fill="#10B981" font-size="10" font-family="system-ui">✓ Screenshots uploaded (6 HD visuals)</text>
            <text x="16" y="58" fill="#10B981" font-size="10" font-family="system-ui">✓ Core feature capabilities specified</text>
            <text x="16" y="74" fill="#10B981" font-size="10" font-family="system-ui">✓ Verified website URL linked</text>
          </g>
        </g>

        <!-- Right: Real-time Revenue & Growth HUD -->
        <g transform="translate(650, 76)">
          <rect width="502" height="300" rx="8" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="20" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Publisher Revenue & Payouts</text>

          <g transform="translate(20, 44)">
            <rect width="220" height="70" rx="6" fill="#21262D"/>
            <text x="14" y="24" fill="#8B949E" font-size="10" font-family="system-ui">MONTHLY NET REVENUE</text>
            <text x="14" y="52" fill="#10B981" font-size="22" font-weight="bold" font-family="system-ui">$34,820.00</text>

            <rect x="240" width="220" height="70" rx="6" fill="#21262D"/>
            <text x="254" y="24" fill="#8B949E" font-size="10" font-family="system-ui">ACTIVE BUSINESS SUBSCRIBERS</text>
            <text x="254" y="52" fill="#38BDF8" font-size="22" font-weight="bold" font-family="system-ui">1,248 Teams</text>
          </g>

          <g transform="translate(20, 130)">
            <rect width="462" height="80" rx="6" fill="#1F2937"/>
            <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Automatic Payout Schedule</text>
            <text x="14" y="44" fill="#9CA3AF" font-size="10" font-family="system-ui">Next deposit: October 15, 2026 to Primary Business Account</text>
            <text x="14" y="62" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">● Zero payment processor setup needed</text>
          </g>

          <g transform="translate(20, 226)">
            <rect width="462" height="42" rx="6" fill="#2563EB"/>
            <text x="231" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui" text-anchor="middle">Publish New SaaS Product ➔</text>
          </g>
        </g>
      `
    },
    {
      file: "publish-steps.svg",
      width: 1200,
      height: 360,
      render: () => `
        <rect width="1200" height="360" rx="16" fill="#0B1324"/>
        <rect x="24" y="24" width="1152" height="312" rx="12" fill="#13203C" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">From Listing to Growth · The 4-Step Publisher Journey</text>
        <rect x="990" y="38" width="160" height="24" rx="12" fill="#3B82F6" fill-opacity="0.2"/>
        <text x="1070" y="54" fill="#60A5FA" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Complete Lifecycle</text>

        <!-- 4 Step Boxes with Connectors -->
        <!-- Step 1 -->
        <g transform="translate(48, 80)">
          <rect width="250" height="236" rx="10" fill="#0A1220" stroke="#1D2E4D" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#3B82F6"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">1</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Create Listing</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#152442"/>
          <text x="12" y="90" fill="#93C5FD" font-size="10" font-weight="bold" font-family="system-ui">Pricing & Demos</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">Add screenshots, plans, and</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">core product capabilities.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● No storefront to design</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Standardized SaaS format</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Ready in under 15 minutes</text>
          </g>
        </g>

        <!-- Step 2 -->
        <g transform="translate(328, 80)">
          <rect width="250" height="236" rx="10" fill="#0A1220" stroke="#1D2E4D" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#10B981"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">2</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Go Live</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#0E2D22"/>
          <text x="12" y="90" fill="#6EE7B7" font-size="10" font-weight="bold" font-family="system-ui">Instant Catalog Index</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">Visible across categories,</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">solutions and industries.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● High-intent B2B audience</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● SEO indexed immediately</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Included in search filters</text>
          </g>
        </g>

        <!-- Step 3 -->
        <g transform="translate(608, 80)">
          <rect width="250" height="236" rx="10" fill="#0A1220" stroke="#1D2E4D" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#F59E0B"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">3</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Get Paid</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#3D290A"/>
          <text x="12" y="90" fill="#FDE68A" font-size="10" font-weight="bold" font-family="system-ui">Automated Billing</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">Recurring subscriptions &</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">one-time payments collected.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Automatic maker payouts</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Global currency handling</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Tax & receipt generation</text>
          </g>
        </g>

        <!-- Step 4 -->
        <g transform="translate(888, 80)">
          <rect width="250" height="236" rx="10" fill="#0A1220" stroke="#1D2E4D" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#A855F7"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">4</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Scale & Grow</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#2D1245"/>
          <text x="12" y="90" fill="#E9D5FF" font-size="10" font-weight="bold" font-family="system-ui">Analytics & Insights</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">Track conversion metrics,</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">ratings & expansion ARR.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Buyer engagement metrics</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Ecosystem co-marketing</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Verified review reputation</text>
          </g>
        </g>
      `
    },
    {
      file: "support-hero.svg",
      width: 840,
      height: 320,
      render: () => `
        <rect width="840" height="320" rx="16" fill="#0C1527"/>
        <rect x="24" y="24" width="792" height="272" rx="12" fill="#15243F" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Customer Support & Documentation Center</text>
        <rect x="660" y="38" width="130" height="24" rx="12" fill="#10B981" fill-opacity="0.2"/>
        <text x="725" y="54" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Average SLA: 4m</text>

        <!-- Search Knowledge Base Bar -->
        <g transform="translate(48, 76)">
          <rect width="744" height="42" rx="8" fill="#0C1527" stroke="#253E66" stroke-width="1"/>
          <text x="20" y="26" fill="#94A3B8" font-size="13" font-family="system-ui">🔍 Search guides, setup steps, billing help or API documentation...</text>
        </g>

        <!-- Support Channels 3 Cards -->
        <g transform="translate(48, 134)">
          <!-- Channel 1: Product Guides -->
          <g transform="translate(0, 0)">
            <rect width="236" height="136" rx="8" fill="#0C1527" stroke="#253E66" stroke-width="1"/>
            <text x="16" y="26" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Product Setup Guides</text>
            <text x="16" y="46" fill="#94A3B8" font-size="10" font-family="system-ui">Dedicated help articles per app</text>
            <text x="16" y="70" fill="#38BDF8" font-size="10" font-family="system-ui">● SigChanger Google Workspace</text>
            <text x="16" y="88" fill="#38BDF8" font-size="10" font-family="system-ui">● TrackySuite Indian CA Setup</text>
            <text x="16" y="114" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Browse 16 App Hubs ➔</text>
          </g>

          <!-- Channel 2: Billing & Accounts -->
          <g transform="translate(254, 0)">
            <rect width="236" height="136" rx="8" fill="#0C1527" stroke="#253E66" stroke-width="1"/>
            <text x="16" y="26" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Billing & Subscriptions</text>
            <text x="16" y="46" fill="#94A3B8" font-size="10" font-family="system-ui">Invoices, seat changes & tax receipts</text>
            <text x="16" y="70" fill="#38BDF8" font-size="10" font-family="system-ui">● Download GST Invoices</text>
            <text x="16" y="88" fill="#38BDF8" font-size="10" font-family="system-ui">● Manage team licenses</text>
            <text x="16" y="114" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Account Portal ➔</text>
          </g>

          <!-- Channel 3: Direct Engineering Support -->
          <g transform="translate(508, 0)">
            <rect width="236" height="136" rx="8" fill="#0C1527" stroke="#253E66" stroke-width="1"/>
            <text x="16" y="26" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Direct Team Contact</text>
            <text x="16" y="46" fill="#94A3B8" font-size="10" font-family="system-ui">Live escalation for verified issues</text>
            <text x="16" y="70" fill="#38BDF8" font-size="10" font-family="system-ui">● Fast email turnaround</text>
            <text x="16" y="88" fill="#38BDF8" font-size="10" font-family="system-ui">● Priority enterprise SLA</text>
            <text x="16" y="114" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Contact Support ➔</text>
          </g>
        </g>
      `
    },
    {
      file: "contact-publish.svg",
      width: 380,
      height: 340,
      render: () => `
        <rect width="380" height="340" rx="16" fill="#0D1117"/>
        <rect x="16" y="16" width="348" height="308" rx="12" fill="#161B22" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="36" cy="36" r="4" fill="#EF4444"/>
        <circle cx="50" cy="36" r="4" fill="#F59E0B"/>
        <circle cx="64" cy="36" r="4" fill="#10B981"/>
        <text x="85" y="40" fill="#8B949E" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Publish Your Software</text>
        
        <!-- Showcase Listing Preview -->
        <g transform="translate(32, 60)">
          <rect width="316" height="150" rx="8" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <rect x="12" y="12" width="36" height="36" rx="8" fill="#2563EB"/>
          <text x="30" y="35" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">⚡</text>
          <text x="56" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Your SaaS Product</text>
          <text x="56" y="40" fill="#8B949E" font-size="10" font-family="system-ui">Listed on ToyoApps Marketplace</text>
          
          <rect x="12" y="60" width="292" height="40" rx="4" fill="#1C2128"/>
          <text x="20" y="78" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Automated Recurring Billing</text>
          <text x="20" y="92" fill="#9CA3AF" font-size="9" font-family="system-ui">Zero payment code to write · Automatic payouts</text>

          <text x="12" y="124" fill="#60A5FA" font-size="9" font-family="system-ui">✓ Instant distribution to B2B buyers</text>
          <text x="12" y="138" fill="#60A5FA" font-size="9" font-family="system-ui">✓ Dedicated product, feature & pricing pages</text>
        </g>

        <!-- Stats row -->
        <g transform="translate(32, 224)">
          <rect width="150" height="50" rx="6" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="12" y="22" fill="#8B949E" font-size="9" font-family="system-ui">PAYOUT MODEL</text>
          <text x="12" y="40" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">Direct Bank Deposit</text>

          <rect x="166" width="150" height="50" rx="6" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="178" y="22" fill="#8B949E" font-size="9" font-family="system-ui">SETUP TIME</text>
          <text x="178" y="40" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">&lt; 15 Minutes</text>
        </g>

        <rect x="32" y="286" width="316" height="26" rx="6" fill="#2563EB"/>
        <text x="190" y="303" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Join ToyoApps Marketplace</text>
      `
    }
  ];

  for (const co of company) {
    const filePath = path.join("public", "images", "company", co.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${co.width}" height="${co.height}" viewBox="0 0 ${co.width} ${co.height}" fill="none">
  ${co.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }
}
