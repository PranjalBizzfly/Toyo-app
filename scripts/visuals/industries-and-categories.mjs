import fs from "node:fs";
import path from "node:path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function generateIndustriesAndCategories() {
  ensureDir(path.join("public", "images", "industries"));
  ensureDir(path.join("public", "images", "categories"));

  // 1. Industries (640x360)
  const industries = [
    {
      file: "accounting-tax-practices.svg",
      title: "Accounting & Tax Practices",
      render: () => `
        <rect width="640" height="360" rx="16" fill="#06181C"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#0C2E35" stroke="#0D9488" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#5EEAD4" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Accounting & Tax Practices · Indian CA & CS Compliance Suite</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#0D9488" fill-opacity="0.25"/>
        <text x="545" y="53" fill="#5EEAD4" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">TrackySuite Hub</text>

        <!-- Main Workspace -->
        <g transform="translate(44, 74)">
          <rect width="320" height="240" rx="8" fill="#041215" stroke="#164E59" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">MULTI-CLIENT STATUTORY CALENDAR</text>

          <g transform="translate(16, 40)">
            <rect width="288" height="46" rx="6" fill="#113F49"/>
            <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">GSTR-3B & GSTR-1 Filings</text>
            <text x="12" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">24 Clients Filed · 6 Pending Review</text>
            <rect x="210" y="14" width="66" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
            <text x="243" y="28" fill="#34D399" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">92% Done</text>
          </g>

          <g transform="translate(16, 96)">
            <rect width="288" height="46" rx="6" fill="#113F49"/>
            <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">TDS 26Q & 24Q Quarterly Return</text>
            <text x="12" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">Challan matching verified with TRACES</text>
            <rect x="210" y="14" width="66" height="20" rx="4" fill="#F59E0B" fill-opacity="0.2"/>
            <text x="243" y="28" fill="#FBBF24" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">Due in 5d</text>
          </g>

          <g transform="translate(16, 152)">
            <rect width="288" height="46" rx="6" fill="#113F49"/>
            <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">ROC / MCA AOC-4 & MGT-7</text>
            <text x="12" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">Director KYC & Board resolutions uploaded</text>
            <rect x="210" y="14" width="66" height="20" rx="4" fill="#38BDF8" fill-opacity="0.2"/>
            <text x="243" y="28" fill="#38BDF8" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">In Queue</text>
          </g>
          <text x="16" y="222" fill="#5EEAD4" font-size="10" font-family="system-ui">Automated SMS & WhatsApp reminders to 85 clients</text>
        </g>

        <!-- Right: Practice Pipeline -->
        <g transform="translate(380, 74)">
          <rect width="220" height="240" rx="8" fill="#041215" stroke="#164E59" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">PRACTICE WORKFLOW</text>

          <g transform="translate(16, 42)">
            <rect width="188" height="48" rx="6" fill="#113F49"/>
            <text x="10" y="18" fill="#E2E8F0" font-size="10" font-family="system-ui">1. Client Doc Upload Portal</text>
            <text x="10" y="34" fill="#10B981" font-size="11" font-weight="bold" font-family="system-ui">142 Invoices Ingested</text>
          </g>
          <g transform="translate(16, 98)">
            <rect width="188" height="48" rx="6" fill="#113F49"/>
            <text x="10" y="18" fill="#E2E8F0" font-size="10" font-family="system-ui">2. Article Staff Prep</text>
            <text x="10" y="34" fill="#38BDF8" font-size="11" font-weight="bold" font-family="system-ui">8 Drafts in Review</text>
          </g>
          <g transform="translate(16, 154)">
            <rect width="188" height="48" rx="6" fill="#113F49"/>
            <text x="10" y="18" fill="#E2E8F0" font-size="10" font-family="system-ui">3. Partner Sign-off & DSC</text>
            <text x="10" y="34" fill="#F59E0B" font-size="11" font-weight="bold" font-family="system-ui">Zero Penalty SLA</text>
          </g>
        </g>
      `
    },
    {
      file: "media-creative-agencies.svg",
      title: "Media, Creative & Agencies",
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0B1322"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#13233D" stroke="#00D2FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#7DD3FC" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Media & Creative Agencies · Digital Asset Library & Campaign Strategy</text>
        <rect x="475" y="38" width="125" height="22" rx="11" fill="#00D2FF" fill-opacity="0.2"/>
        <text x="537" y="53" fill="#00D2FF" font-size="10" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Sibu + GetBenj</text>

        <!-- Left: Sibu DAM Video Timeline Review -->
        <g transform="translate(44, 74)">
          <rect width="320" height="240" rx="8" fill="#070D18" stroke="#1D3860" stroke-width="1"/>
          <!-- Video preview window -->
          <rect x="12" y="12" width="296" height="135" rx="6" fill="#0F243E"/>
          <circle cx="160" cy="68" r="24" fill="#00D2FF" fill-opacity="0.3"/>
          <polygon points="154,58 172,68 154,78" fill="#00D2FF"/>
          <text x="24" y="30" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Agency_Spot_Cut_V4_Final.mp4</text>
          
          <!-- Scrubber and marker pin -->
          <g transform="translate(12, 156)">
            <rect width="296" height="6" rx="3" fill="#1E385C"/>
            <rect width="160" height="6" rx="3" fill="#00D2FF"/>
            <circle cx="160" cy="3" r="5" fill="#00F0FF"/>
            <text x="0" y="20" fill="#7DD3FC" font-size="9" font-family="monospace">00:34.12</text>
            <text x="255" y="20" fill="#7DD3FC" font-size="9" font-family="monospace">01:00.00</text>
          </g>

          <!-- Comment pin -->
          <g transform="translate(12, 184)">
            <rect width="296" height="38" rx="6" fill="#132B4A" stroke="#00D2FF" stroke-width="1"/>
            <text x="12" y="16" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Art Director @ 00:34</text>
            <text x="12" y="29" fill="#93C5FD" font-size="9" font-family="system-ui">"Approved by client. Ready for high-res delivery."</text>
          </g>
        </g>

        <!-- Right: Agency Campaign & Asset Tags -->
        <g transform="translate(380, 74)">
          <rect width="220" height="240" rx="8" fill="#070D18" stroke="#1D3860" stroke-width="1"/>
          <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">AI TAGGED ASSETS</text>

          <g transform="translate(14, 38)">
            <rect width="84" height="20" rx="4" fill="#17355C"/>
            <text x="42" y="14" fill="#38BDF8" font-size="9" text-anchor="middle" font-family="system-ui">#BrandFilm</text>
            <rect x="90" width="88" height="20" rx="4" fill="#17355C"/>
            <text x="134" y="14" fill="#38BDF8" font-size="9" text-anchor="middle" font-family="system-ui">#ClientSocial</text>
          </g>

          <text x="14" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">CLIENT MARKETING PLAN</text>
          <g transform="translate(14, 98)">
            <rect width="192" height="60" rx="6" fill="#191033" stroke="#A855F7" stroke-width="1"/>
            <text x="10" y="20" fill="#E9D5FF" font-size="10" font-weight="bold" font-family="system-ui">GetBenj Agency Pack</text>
            <text x="10" y="36" fill="#C084FC" font-size="9" font-family="system-ui">Budget: 45% Video / 35% Search</text>
            <text x="10" y="50" fill="#10B981" font-size="9" font-family="system-ui">Strategy PDF ready to export</text>
          </g>

          <g transform="translate(14, 172)">
            <rect width="192" height="48" rx="6" fill="#102540"/>
            <text x="10" y="18" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Cloud Ingestion</text>
            <text x="10" y="34" fill="#7DD3FC" font-size="9" font-family="system-ui">Dropbox, Drive & AWS S3 Synced</text>
          </g>
        </g>
      `
    },
    {
      file: "startups-and-investors.svg",
      title: "Startups & Investors",
      render: () => `
        <rect width="640" height="360" rx="16" fill="#051610"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#0C2B20" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#6EE7B7" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Startups & Investors · TAM / SAM / SOM Research & Go-to-Market</text>
        <rect x="475" y="38" width="125" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="537" y="53" fill="#10B981" font-size="10" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Sizoru + GetBenj</text>

        <!-- Left: TAM / SAM / SOM Sizing -->
        <g transform="translate(44, 74)">
          <rect width="300" height="240" rx="8" fill="#03100B" stroke="#144634" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">INVESTOR-DEFENSIBLE MARKET SIZING</text>

          <g transform="translate(16, 40)">
            <rect width="268" height="46" rx="6" fill="#0D3528" stroke="#10B981" stroke-width="1"/>
            <text x="12" y="18" fill="#6EE7B7" font-size="10" font-family="system-ui">TAM (Top-Down Global)</text>
            <text x="12" y="34" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">$18.4 Billion</text>
            <text x="180" y="34" fill="#A7F3D0" font-size="9" font-family="system-ui">Gartner 2026</text>
          </g>

          <g transform="translate(16, 94)">
            <rect width="268" height="46" rx="6" fill="#124534" stroke="#34D399" stroke-width="1"/>
            <text x="12" y="18" fill="#A7F3D0" font-size="10" font-family="system-ui">SAM (Serviceable Market)</text>
            <text x="12" y="34" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">$4.2 Billion</text>
            <text x="180" y="34" fill="#A7F3D0" font-size="9" font-family="system-ui">Mid-Market B2B</text>
          </g>

          <g transform="translate(16, 148)">
            <rect width="268" height="46" rx="6" fill="#059669"/>
            <text x="12" y="18" fill="#FFFFFF" font-size="10" font-family="system-ui">SOM (3-Year Capturable)</text>
            <text x="12" y="34" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">$520 Million</text>
            <text x="180" y="34" fill="#E6FFFA" font-size="9" font-family="system-ui">Bottom-Up Model</text>
          </g>
          <text x="16" y="220" fill="#6EE7B7" font-size="10" font-family="system-ui">Variance between models: 3.2% · Tier-1 Citations verified</text>
        </g>

        <!-- Right: AI Launch Plan Preview -->
        <g transform="translate(360, 74)">
          <rect width="240" height="240" rx="8" fill="#03100B" stroke="#144634" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">FOUNDER LAUNCH STRATEGY</text>

          <g transform="translate(16, 40)">
            <rect width="208" height="60" rx="6" fill="#1C1033" stroke="#A855F7" stroke-width="1"/>
            <text x="10" y="18" fill="#D8B4FE" font-size="10" font-weight="bold" font-family="system-ui">GetBenj GTM Report</text>
            <text x="10" y="34" fill="#FFFFFF" font-size="10" font-family="system-ui">Target: US & EU Series A ICP</text>
            <text x="10" y="48" fill="#10B981" font-size="9" font-family="system-ui">Channel: LinkedIn + Intent Search</text>
          </g>

          <g transform="translate(16, 112)">
            <rect width="208" height="60" rx="6" fill="#0C2B20"/>
            <text x="10" y="18" fill="#6EE7B7" font-size="10" font-weight="bold" font-family="system-ui">Pitch Deck Materials</text>
            <text x="10" y="34" fill="#E2E8F0" font-size="9" font-family="system-ui">Export print-ready PDF</text>
            <text x="10" y="48" fill="#E2E8F0" font-size="9" font-family="system-ui">With cited sources bibliography</text>
          </g>

          <rect x="16" y="184" width="208" height="34" rx="6" fill="#10B981"/>
          <text x="120" y="205" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Generate Pitch Reports</text>
        </g>
      `
    }
  ];

  for (const ind of industries) {
    const filePath = path.join("public", "images", "industries", ind.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="none">
  ${ind.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }

  // 2. Category Heroes (960x360)
  const categories = [
    {
      file: "sales-marketing.svg",
      title: "Sales & Marketing",
      render: () => `
        <rect width="960" height="360" rx="16" fill="#0B132B"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#152244" stroke="#3A86FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8D99AE" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Sales & Marketing Software Category</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#3A86FF" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#3A86FF" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">4 Integrated Products</text>

        <!-- 4 Pillars Grid -->
        <!-- Cardizo -->
        <g transform="translate(48, 80)">
          <rect width="200" height="236" rx="8" fill="#0B132B" stroke="#253866" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#3A86FF" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#3A86FF" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">📇</text>
          <text x="60" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Cardizo</text>
          <text x="60" y="46" fill="#8D99AE" font-size="10" font-family="system-ui">AI Card Scanner</text>

          <rect x="16" y="66" width="168" height="50" rx="6" fill="#18274C"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Card ➔ Contact OCR</text>
          <text x="24" y="102" fill="#38BDF8" font-size="9" font-family="system-ui">1-Click WhatsApp & Export</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#8D99AE" font-size="10" font-family="system-ui">● 99.8% Extraction accuracy</text>
            <text x="0" y="32" fill="#8D99AE" font-size="10" font-family="system-ui">● Google Contacts sync</text>
            <text x="0" y="50" fill="#8D99AE" font-size="10" font-family="system-ui">● Instant CSV & Excel export</text>
          </g>
          <rect x="16" y="190" width="168" height="28" rx="6" fill="#3A86FF"/>
          <text x="100" y="208" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore Cardizo</text>
        </g>

        <!-- ODA7 -->
        <g transform="translate(268, 80)">
          <rect width="200" height="236" rx="8" fill="#0B132B" stroke="#253866" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#E11D48" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#E11D48" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">📞</text>
          <text x="60" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">ODA7</text>
          <text x="60" y="46" fill="#FDA4AF" font-size="10" font-family="system-ui">Sales Floor Platform</text>

          <rect x="16" y="66" width="168" height="50" rx="6" fill="#2E1220"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Auto-Dialer & Queue</text>
          <text x="24" y="102" fill="#FB7185" font-size="9" font-family="system-ui">Live Rep Leaderboards</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#8D99AE" font-size="10" font-family="system-ui">● Smart lead distribution</text>
            <text x="0" y="32" fill="#8D99AE" font-size="10" font-family="system-ui">● Sales script prompt cards</text>
            <text x="0" y="50" fill="#8D99AE" font-size="10" font-family="system-ui">● Real-time commissions</text>
          </g>
          <rect x="16" y="190" width="168" height="28" rx="6" fill="#E11D48"/>
          <text x="100" y="208" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore ODA7</text>
        </g>

        <!-- GetBenj -->
        <g transform="translate(488, 80)">
          <rect width="200" height="236" rx="8" fill="#0B132B" stroke="#253866" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#A855F7" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#A855F7" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">🎯</text>
          <text x="60" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">GetBenj</text>
          <text x="60" y="46" fill="#D8B4FE" font-size="10" font-family="system-ui">AI Strategy Planner</text>

          <rect x="16" y="66" width="168" height="50" rx="6" fill="#24133F"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">GTM Strategy from Specs</text>
          <text x="24" y="102" fill="#C084FC" font-size="9" font-family="system-ui">Target Personas & Channels</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#8D99AE" font-size="10" font-family="system-ui">● Hyperlocal ad budget map</text>
            <text x="0" y="32" fill="#8D99AE" font-size="10" font-family="system-ui">● Meta & Google ad split</text>
            <text x="0" y="50" fill="#8D99AE" font-size="10" font-family="system-ui">● Print-ready PDF reports</text>
          </g>
          <rect x="16" y="190" width="168" height="28" rx="6" fill="#A855F7"/>
          <text x="100" y="208" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore GetBenj</text>
        </g>

        <!-- Sibu -->
        <g transform="translate(708, 80)">
          <rect width="200" height="236" rx="8" fill="#0B132B" stroke="#253866" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#00D2FF" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#00D2FF" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">🎬</text>
          <text x="60" y="32" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Sibu</text>
          <text x="60" y="46" fill="#7DD3FC" font-size="10" font-family="system-ui">Digital Asset DAM</text>

          <rect x="16" y="66" width="168" height="50" rx="6" fill="#0D2644"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Video Timeline Reviews</text>
          <text x="24" y="102" fill="#38BDF8" font-size="9" font-family="system-ui">AI Scene & OCR Tagging</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#8D99AE" font-size="10" font-family="system-ui">● Timeline frame comments</text>
            <text x="0" y="32" fill="#8D99AE" font-size="10" font-family="system-ui">● Google Drive & S3 sync</text>
            <text x="0" y="50" fill="#8D99AE" font-size="10" font-family="system-ui">● Creative team approvals</text>
          </g>
          <rect x="16" y="190" width="168" height="28" rx="6" fill="#00D2FF"/>
          <text x="100" y="208" fill="#0B132B" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore Sibu</text>
        </g>
      `
    },
    {
      file: "hr-people.svg",
      title: "HR & People",
      render: () => `
        <rect width="960" height="360" rx="16" fill="#0A1830"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#132B52" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#93C5FD" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · HR, People & Workforce Operations</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#2563EB" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#93C5FD" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">3 Core Platforms</text>

        <!-- 3 Pillars Grid -->
        <!-- HRMagix -->
        <g transform="translate(56, 80)">
          <rect width="260" height="236" rx="8" fill="#0A1830" stroke="#1D3E78" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#2563EB" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#2563EB" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">💼</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">HRMagix</text>
          <text x="62" y="46" fill="#93C5FD" font-size="10" font-family="system-ui">Indian HRMS & Statutory Payroll</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#143160"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">PF, ESI, PT, TDS Compliance</text>
          <text x="24" y="102" fill="#10B981" font-size="10" font-family="system-ui">Automated Payslip & Form 16</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Biometric & shift attendance tracking</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Leave policies, balances & approvals</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Employee self-service mobile app</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#2563EB"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore HRMagix</text>
        </g>

        <!-- ZUZU -->
        <g transform="translate(350, 80)">
          <rect width="260" height="236" rx="8" fill="#0A1830" stroke="#1D3E78" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#10B981" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#10B981" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">🛡</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">ZUZU</text>
          <text x="62" y="46" fill="#6EE7B7" font-size="10" font-family="system-ui">Workday Activity & Privacy</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#0D3528"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">On-Device Privacy Redaction</text>
          <text x="24" y="102" fill="#34D399" font-size="10" font-family="system-ui">Passwords & Banking Masked</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Windows desktop lightweight agent</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● AI daily summaries for managers</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Active vs idle time tracking</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#10B981"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore ZUZU</text>
        </g>

        <!-- Zorfly -->
        <g transform="translate(644, 80)">
          <rect width="260" height="236" rx="8" fill="#0A1830" stroke="#1D3E78" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#38BDF8" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#38BDF8" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">🚀</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Zorfly</text>
          <text x="62" y="46" fill="#7DD3FC" font-size="10" font-family="system-ui">Daily Communication Missions</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#122A4E"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">5-Minute Daily Habit</text>
          <text x="24" y="102" fill="#38BDF8" font-size="10" font-family="system-ui">AI Speech & Grammar Feedback</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Real-world executive scenarios</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Team communication score trends</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Measurable workplace clarity</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#3B82F6"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore Zorfly</text>
        </g>
      `
    },
    {
      file: "operations-it.svg",
      title: "Operations & IT",
      render: () => `
        <rect width="960" height="360" rx="16" fill="#0C1524"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#16253D" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#7DD3FC" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Operations & IT Infrastructure Suite</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#06B6D4" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#38BDF8" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">3 Essential Tools</text>

        <!-- 3 Pillars Grid -->
        <!-- ZapBuzzer -->
        <g transform="translate(56, 80)">
          <rect width="260" height="236" rx="8" fill="#0C1524" stroke="#223C63" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#EA580C" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#EA580C" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">⚡</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">ZapBuzzer</text>
          <text x="62" y="46" fill="#FDBA74" font-size="10" font-family="system-ui">Office Requests & SLA Routing</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#351909"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Pantry, IT & Facilities Tickets</text>
          <text x="24" y="102" fill="#F97316" font-size="10" font-family="system-ui">SLA Countdown & Escalation</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Instant 1-tap request broadcast</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Telegram & WhatsApp team alerts</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Staff resolution ratings & audit</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#EA580C"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore ZapBuzzer</text>
        </g>

        <!-- SigChanger -->
        <g transform="translate(350, 80)">
          <rect width="260" height="236" rx="8" fill="#0C1524" stroke="#223C63" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#1A73E8" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#1A73E8" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">✉</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">SigChanger</text>
          <text x="62" y="46" fill="#93C5FD" font-size="10" font-family="system-ui">Google Workspace Signatures</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#11274F"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Server-Side Gmail Rollout</text>
          <text x="24" y="102" fill="#38BDF8" font-size="10" font-family="system-ui">No Browser Plugins Required</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Syncs Workspace user directory</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Drag-and-drop template designer</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Department banners & campaigns</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#1A73E8"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore SigChanger</text>
        </g>

        <!-- Fantom -->
        <g transform="translate(644, 80)">
          <rect width="260" height="236" rx="8" fill="#0C1524" stroke="#223C63" stroke-width="1"/>
          <text x="34" y="39" fill="#06B6D4" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">📱</text>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#06B6D4" fill-opacity="0.2"/>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Fantom</text>
          <text x="62" y="46" fill="#7DD3FC" font-size="10" font-family="system-ui">Cloud SIM & Device Manager</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#0E2D3A"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Recharge & Call Log Dashboard</text>
          <text x="24" y="102" fill="#22D3EE" font-size="10" font-family="system-ui">WhatsApp & Telegram Tracking</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Android call logs cloud sync</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● SIM expiry & recharge alerts</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Central telecom inventory</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#06B6D4"/>
          <text x="130" y="208" fill="#0B132B" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore Fantom</text>
        </g>
      `
    },
    {
      file: "finance-compliance.svg",
      title: "Finance & Compliance",
      render: () => `
        <rect width="960" height="360" rx="16" fill="#041416"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#0A272C" stroke="#0D9488" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#5EEAD4" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Finance & Statutory Compliance Suite</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#0D9488" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#5EEAD4" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">TrackySuite Powered</text>

        <!-- Main Banner -->
        <g transform="translate(48, 80)">
          <!-- Left feature overview -->
          <rect width="440" height="236" rx="8" fill="#031012" stroke="#13474F" stroke-width="1"/>
          <text x="20" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Indian Statutory Practice Management</text>
          <text x="20" y="46" fill="#5EEAD4" font-size="11" font-family="system-ui">Built specifically for CA, CS and Tax consulting firms</text>

          <g transform="translate(20, 64)">
            <rect width="400" height="44" rx="6" fill="#0B3037"/>
            <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">Automatic Statutory Deadlines</text>
            <text x="12" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">GST (GSTR-1, 3B), Income Tax (ITR), TDS (24Q, 26Q), ROC (AOC-4)</text>
          </g>

          <g transform="translate(20, 118)">
            <rect width="400" height="44" rx="6" fill="#0B3037"/>
            <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">Prepare - Review - File Pipeline</text>
            <text x="12" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">Article staff draft ➔ Partner review ➔ ARN receipt generated</text>
          </g>

          <g transform="translate(20, 172)">
            <rect width="400" height="44" rx="6" fill="#0B3037"/>
            <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">Dedicated Client Document Portal</text>
            <text x="12" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">Eliminate WhatsApp & email document chase with direct upload</text>
          </g>
        </g>

        <!-- Right: Live Compliance Metrics -->
        <g transform="translate(510, 80)">
          <rect width="402" height="236" rx="8" fill="#031012" stroke="#13474F" stroke-width="1"/>
          <text x="20" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Live Practice Health Dashboard</text>

          <g transform="translate(20, 48)">
            <rect width="170" height="68" rx="6" fill="#0B3037"/>
            <text x="12" y="22" fill="#94A3B8" font-size="10" font-family="system-ui">Clients Managed</text>
            <text x="12" y="48" fill="#5EEAD4" font-size="22" font-weight="bold" font-family="system-ui">148 Active</text>

            <rect x="190" width="170" height="68" rx="6" fill="#0B3037"/>
            <text x="202" y="22" fill="#94A3B8" font-size="10" font-family="system-ui">Statutory Accuracy</text>
            <text x="202" y="48" fill="#10B981" font-size="22" font-weight="bold" font-family="system-ui">100% On-Time</text>
          </g>

          <g transform="translate(20, 130)">
            <rect width="362" height="74" rx="6" fill="#082328"/>
            <text x="14" y="22" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Upcoming Statutory Cycle: October 2026</text>
            <text x="14" y="40" fill="#E2E8F0" font-size="10" font-family="system-ui">GSTR-3B: 20th Oct · TDS 26Q: 31st Oct</text>
            <rect x="14" y="50" width="334" height="6" rx="3" fill="#041215"/>
            <rect x="14" y="50" width="270" height="6" rx="3" fill="#0D9488"/>
          </g>
        </g>
      `
    },
    {
      file: "insights-research.svg",
      title: "Insights & Research",
      render: () => `
        <rect width="960" height="360" rx="16" fill="#08140F"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#0E261E" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#6EE7B7" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Insights, Market Research & Intelligence</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#10B981" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#6EE7B7" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Sizoru · GetBenj · ZUZU</text>

        <!-- 3 Pillars Grid -->
        <!-- Sizoru -->
        <g transform="translate(56, 80)">
          <rect width="260" height="236" rx="8" fill="#05120D" stroke="#164032" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#10B981" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#10B981" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">📊</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Sizoru</text>
          <text x="62" y="46" fill="#6EE7B7" font-size="10" font-family="system-ui">Market Sizing Engine</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#0A3326"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">TAM / SAM / SOM Research</text>
          <text x="24" y="102" fill="#34D399" font-size="10" font-family="system-ui">Tier-1 Rated Source Citations</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Top-down & bottom-up models</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Bull, base & bear scenarios</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Investor-grade PDF export</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#10B981"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore Sizoru</text>
        </g>

        <!-- GetBenj -->
        <g transform="translate(350, 80)">
          <rect width="260" height="236" rx="8" fill="#05120D" stroke="#164032" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#A855F7" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#A855F7" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">🎯</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">GetBenj</text>
          <text x="62" y="46" fill="#D8B4FE" font-size="10" font-family="system-ui">Marketing Plan Generator</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#24133F"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Product ➔ Go-To-Market Plan</text>
          <text x="24" y="102" fill="#C084FC" font-size="10" font-family="system-ui">Persona & Channel Budget Split</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Hyperlocal ad target mapping</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Channel CAC & ROAS projections</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Agency pack multi-brand reports</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#A855F7"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore GetBenj</text>
        </g>

        <!-- ZUZU -->
        <g transform="translate(644, 80)">
          <rect width="260" height="236" rx="8" fill="#05120D" stroke="#164032" stroke-width="1"/>
          <rect x="16" y="16" width="36" height="36" rx="8" fill="#2563EB" fill-opacity="0.2"/>
          <text x="34" y="39" fill="#2563EB" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">📈</text>
          <text x="62" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">ZUZU</text>
          <text x="62" y="46" fill="#93C5FD" font-size="10" font-family="system-ui">Workday Activity Insight</text>

          <rect x="16" y="66" width="228" height="48" rx="6" fill="#142B52"/>
          <text x="24" y="86" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">AI-Written Daily Work Reports</text>
          <text x="24" y="102" fill="#60A5FA" font-size="10" font-family="system-ui">Activity Insight with Privacy</text>

          <g transform="translate(16, 126)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Application usage distributions</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● On-device sensitive data redaction</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Manager insight portals</text>
          </g>
          <rect x="16" y="190" width="228" height="28" rx="6" fill="#2563EB"/>
          <text x="130" y="208" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore ZUZU</text>
        </g>
      `
    }
  ];

  for (const cat of categories) {
    const filePath = path.join("public", "images", "categories", cat.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="360" viewBox="0 0 960 360" fill="none">
  ${cat.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }
}
