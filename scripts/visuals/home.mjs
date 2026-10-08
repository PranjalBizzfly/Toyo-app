import fs from "node:fs";
import path from "node:path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function generateHomeVisuals() {
  ensureDir(path.join("public", "images", "home"));

  const homeVisuals = [
    {
      file: "hero.svg",
      width: 1200,
      height: 420,
      render: () => `
        <rect width="1200" height="420" rx="16" fill="#0A1124"/>
        <rect x="24" y="24" width="1152" height="372" rx="12" fill="#111D3B" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8D99AE" font-size="13" font-family="system-ui, sans-serif" font-weight="600">ToyoApps · Unified Business Software Workspace</text>
        <rect x="990" y="38" width="160" height="24" rx="12" fill="#2563EB" fill-opacity="0.2"/>
        <text x="1070" y="54" fill="#60A5FA" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">16 Integrated SaaS Tools</text>

        <!-- Ecosystem Dashboard Layout -->
        <!-- App Dock / Launcher Top Bar -->
        <g transform="translate(48, 76)">
          <rect width="1104" height="48" rx="8" fill="#0A1329" stroke="#1D3366" stroke-width="1"/>
          
          <!-- Dock Items -->
          <g transform="translate(16, 8)">
            <rect width="150" height="32" rx="6" fill="#1D4ED8"/>
            <text x="16" y="20" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">📇 Cardizo (Sales)</text>
          </g>

          <g transform="translate(176, 8)">
            <rect width="160" height="32" rx="6" fill="#1E293B"/>
            <text x="16" y="20" fill="#94A3B8" font-size="12" font-weight="bold" font-family="system-ui">💼 HRMagix (Payroll)</text>
          </g>

          <g transform="translate(346, 8)">
            <rect width="170" height="32" rx="6" fill="#1E293B"/>
            <text x="16" y="20" fill="#94A3B8" font-size="12" font-weight="bold" font-family="system-ui">✉ SigChanger (Email)</text>
          </g>

          <g transform="translate(526, 8)">
            <rect width="170" height="32" rx="6" fill="#1E293B"/>
            <text x="16" y="20" fill="#94A3B8" font-size="12" font-weight="bold" font-family="system-ui">⚖ TrackySuite (CA)</text>
          </g>

          <g transform="translate(706, 8)">
            <rect width="150" height="32" rx="6" fill="#1E293B"/>
            <text x="16" y="20" fill="#94A3B8" font-size="12" font-weight="bold" font-family="system-ui">🎬 Sibu (Media)</text>
          </g>

          <g transform="translate(866, 8)">
            <rect width="150" height="32" rx="6" fill="#1E293B"/>
            <text x="16" y="20" fill="#94A3B8" font-size="12" font-weight="bold" font-family="system-ui">⚡ ZapBuzzer (Ops)</text>
          </g>
        </g>

        <!-- 3 Interactive App Panes Side-by-Side -->
        <g transform="translate(48, 138)">
          <!-- Pane 1: Cardizo Live Scanner -->
          <g transform="translate(0, 0)">
            <rect width="350" height="236" rx="8" fill="#0A1329" stroke="#1D3366" stroke-width="1"/>
            <text x="16" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Cardizo · Contact Scanner</text>
            <rect x="250" y="14" width="85" height="18" rx="4" fill="#3B82F6" fill-opacity="0.2"/>
            <text x="292" y="26" fill="#60A5FA" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">AI SCAN ACTIVE</text>
            
            <g transform="translate(16, 44)">
              <rect width="318" height="60" rx="6" fill="#14244D"/>
              <text x="12" y="24" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Elena Rostova · CloudTech</text>
              <text x="12" y="42" fill="#93C5FD" font-size="10" font-family="system-ui">Scanned from business card · 1.2s OCR</text>
            </g>

            <g transform="translate(16, 114)">
              <rect width="154" height="32" rx="6" fill="#25D366"/>
              <text x="77" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">💬 WhatsApp Follow-up</text>

              <rect x="164" width="154" height="32" rx="6" fill="#2563EB"/>
              <text x="241" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">➔ Google Contacts</text>
            </g>

            <g transform="translate(16, 160)">
              <text x="0" y="14" fill="#8D99AE" font-size="10" font-family="system-ui">Recent contacts: 14 captured this week</text>
              <text x="0" y="32" fill="#10B981" font-size="10" font-weight="600" font-family="system-ui">● Auto-tagged: #Enterprise #Conference2026</text>
            </g>
          </g>

          <!-- Pane 2: TrackySuite Compliance Calendar -->
          <g transform="translate(376, 0)">
            <rect width="350" height="236" rx="8" fill="#0A1329" stroke="#1D3366" stroke-width="1"/>
            <text x="16" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">TrackySuite · Statutory Calendar</text>
            <rect x="250" y="14" width="85" height="18" rx="4" fill="#0D9488" fill-opacity="0.2"/>
            <text x="292" y="26" fill="#5EEAD4" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">CA & CS SYNC</text>

            <g transform="translate(16, 44)">
              <rect width="318" height="42" rx="6" fill="#0A272C"/>
              <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">GSTR-3B Filing · Due 20th Oct</text>
              <text x="12" y="32" fill="#94A3B8" font-size="9" font-family="system-ui">14 Clients Pending · 24 Completed</text>
            </g>

            <g transform="translate(16, 94)">
              <rect width="318" height="42" rx="6" fill="#0A272C"/>
              <text x="12" y="18" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">TDS 26Q Quarterly · Due 31st Oct</text>
              <text x="12" y="32" fill="#94A3B8" font-size="9" font-family="system-ui">Challans matched with TRACES</text>
            </g>

            <g transform="translate(16, 146)">
              <rect width="318" height="34" rx="6" fill="#0D9488"/>
              <text x="159" y="21" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Open Practice Management Portal</text>
            </g>
          </g>

          <!-- Pane 3: SigChanger & Workspace Rollout -->
          <g transform="translate(752, 0)">
            <rect width="352" height="236" rx="8" fill="#0A1329" stroke="#1D3366" stroke-width="1"/>
            <text x="16" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">SigChanger · Gmail Signature</text>
            <rect x="250" y="14" width="85" height="18" rx="4" fill="#1A73E8" fill-opacity="0.2"/>
            <text x="292" y="26" fill="#60A5FA" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">WORKSPACE</text>

            <g transform="translate(16, 44)">
              <rect width="320" height="74" rx="6" fill="#11274F" stroke="#1A73E8" stroke-width="1"/>
              <rect x="10" y="10" width="30" height="30" rx="15" fill="#1A73E8"/>
              <text x="25" y="29" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">DM</text>
              <text x="48" y="20" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">David Miller</text>
              <text x="48" y="32" fill="#93C5FD" font-size="9" font-family="system-ui">VP Engineering · ToyoApps Suite</text>
              <rect x="10" y="46" width="300" height="18" rx="3" fill="#1E40AF"/>
              <text x="160" y="58" fill="#FFFFFF" font-size="8" font-weight="bold" font-family="system-ui" text-anchor="middle">Centralized Server-side Signature Rollout</text>
            </g>

            <g transform="translate(16, 130)">
              <text x="0" y="14" fill="#8D99AE" font-size="10" font-family="system-ui">Domain status: 185 mailboxes updated</text>
              <text x="0" y="32" fill="#10B981" font-size="10" font-weight="600" font-family="system-ui">● Google Workspace Directory Synced</text>
            </g>

            <g transform="translate(16, 175)">
              <rect width="320" height="34" rx="6" fill="#1A73E8"/>
              <text x="160" y="21" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Manage Signatures</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "spotlight.svg",
      width: 960,
      height: 600,
      render: () => `
        <rect width="960" height="600" rx="16" fill="#0B132B"/>
        <rect x="24" y="24" width="912" height="552" rx="12" fill="#152445" stroke="#3A86FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8D99AE" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Spotlight · Cardizo: Turn Business Cards into Searchable Contacts with AI</text>
        <rect x="760" y="38" width="150" height="24" rx="12" fill="#3A86FF" fill-opacity="0.2"/>
        <text x="835" y="54" fill="#3A86FF" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">AI OCR Precision: 99.8%</text>

        <!-- Left: Scanning Camera / Viewfinder Visual -->
        <g transform="translate(48, 80)">
          <rect width="420" height="470" rx="10" fill="#0B132B" stroke="#253866" stroke-width="1"/>
          <text x="24" y="36" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Camera Scanner Viewfinder</text>
          
          <!-- Scanner Camera Area -->
          <g transform="translate(24, 56)">
            <rect width="372" height="260" rx="8" fill="#1A2748" stroke="#3A86FF" stroke-width="2" stroke-dasharray="8 6"/>
            
            <!-- Target Card -->
            <rect x="24" y="24" width="324" height="212" rx="8" fill="#2A3B66" stroke="#485F99" stroke-width="1"/>
            
            <!-- OCR Scan Laser Line -->
            <line x1="24" y1="120" x2="348" y2="120" stroke="#00F0FF" stroke-width="2.5" stroke-opacity="0.9"/>
            
            <!-- Card Details -->
            <circle cx="60" cy="65" r="22" fill="#3A86FF"/>
            <text x="60" y="72" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">SJ</text>
            <text x="96" y="60" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Sarah Jenkins</text>
            <text x="96" y="78" fill="#93C5FD" font-size="12" font-family="system-ui">VP Partnerships · NovaTech Labs</text>

            <!-- Detected Bounding Boxes -->
            <rect x="36" y="104" width="280" height="24" rx="4" fill="#00F0FF" fill-opacity="0.15" stroke="#00F0FF" stroke-width="1"/>
            <text x="44" y="120" fill="#00F0FF" font-size="10" font-family="monospace">✉ sarah.jenkins@novatechlabs.com [100%]</text>

            <rect x="36" y="136" width="220" height="24" rx="4" fill="#00F0FF" fill-opacity="0.15" stroke="#00F0FF" stroke-width="1"/>
            <text x="44" y="152" fill="#00F0FF" font-size="10" font-family="monospace">✆ +1 (650) 492-8190 [99.8%]</text>

            <rect x="36" y="168" width="240" height="24" rx="4" fill="#00F0FF" fill-opacity="0.15" stroke="#00F0FF" stroke-width="1"/>
            <text x="44" y="184" fill="#00F0FF" font-size="10" font-family="monospace">📍 San Francisco, CA · novatechlabs.com</text>
          </g>

          <!-- Detection status badge -->
          <g transform="translate(24, 334)">
            <rect width="372" height="42" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="1"/>
            <circle cx="20" cy="21" r="5" fill="#10B981"/>
            <text x="34" y="25" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">Card Captured in 1.1s · All Fields Extracted</text>
          </g>

          <g transform="translate(24, 390)">
            <text x="0" y="16" fill="#8D99AE" font-size="11" font-family="system-ui">Instant tags applied: #TechSummit2026 #VIP_Lead</text>
            <text x="0" y="34" fill="#8D99AE" font-size="11" font-family="system-ui">Physical card filed into digital binder automatically</text>
          </g>
        </g>

        <!-- Right: Processed Contact & Instant Outreach Suite -->
        <g transform="translate(492, 80)">
          <rect width="420" height="470" rx="10" fill="#0B132B" stroke="#253866" stroke-width="1"/>
          <text x="24" y="36" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Structured Contact Profile</text>
          <rect x="310" y="22" width="85" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
          <text x="352" y="36" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">VERIFIED</text>

          <!-- Contact Data Cards -->
          <g transform="translate(24, 56)">
            <rect width="372" height="44" rx="6" fill="#18274C"/>
            <text x="14" y="18" fill="#8D99AE" font-size="10" font-family="system-ui">Full Name & Title</text>
            <text x="14" y="34" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Sarah Jenkins · VP Partnerships</text>
          </g>

          <g transform="translate(24, 110)">
            <rect width="372" height="44" rx="6" fill="#18274C"/>
            <text x="14" y="18" fill="#8D99AE" font-size="10" font-family="system-ui">Company & Website</text>
            <text x="14" y="34" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">NovaTech Labs Inc. (novatechlabs.com)</text>
          </g>

          <g transform="translate(24, 164)">
            <rect width="372" height="44" rx="6" fill="#18274C"/>
            <text x="14" y="18" fill="#8D99AE" font-size="10" font-family="system-ui">Work Email</text>
            <text x="14" y="34" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">sarah.jenkins@novatechlabs.com</text>
          </g>

          <g transform="translate(24, 218)">
            <rect width="372" height="44" rx="6" fill="#18274C"/>
            <text x="14" y="18" fill="#8D99AE" font-size="10" font-family="system-ui">Mobile Phone</text>
            <text x="14" y="34" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">+1 (650) 492-8190</text>
          </g>

          <!-- Action Buttons -->
          <g transform="translate(24, 280)">
            <!-- WhatsApp Action -->
            <rect width="180" height="42" rx="6" fill="#25D366"/>
            <text x="90" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui" text-anchor="middle">💬 WhatsApp Follow-up</text>

            <!-- Email Action -->
            <rect x="192" width="180" height="42" rx="6" fill="#3A86FF"/>
            <text x="282" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui" text-anchor="middle">✉ Send Intro Email</text>
          </g>

          <!-- Export Actions -->
          <g transform="translate(24, 334)">
            <rect width="372" height="38" rx="6" fill="#203460" stroke="#3A86FF" stroke-width="1"/>
            <text x="186" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">➔ Push to Google Contacts (Connected)</text>
          </g>

          <g transform="translate(24, 384)">
            <rect width="372" height="38" rx="6" fill="#18274C"/>
            <text x="186" y="24" fill="#94A3B8" font-size="11" font-family="system-ui" text-anchor="middle">Download as VCF / CSV / Excel</text>
          </g>
        </g>
      `
    },
    {
      file: "how-it-works.svg",
      width: 1200,
      height: 360,
      render: () => `
        <rect width="1200" height="360" rx="16" fill="#0A1224"/>
        <rect x="24" y="24" width="1152" height="312" rx="12" fill="#122040" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">How ToyoApps Works · Discover, Compare, Connect & Scale</text>
        <rect x="990" y="38" width="160" height="24" rx="12" fill="#3B82F6" fill-opacity="0.2"/>
        <text x="1070" y="54" fill="#60A5FA" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">4-Step Evaluation</text>

        <!-- 4 Process Stages -->
        <!-- Step 1 -->
        <g transform="translate(48, 80)">
          <rect width="250" height="236" rx="10" fill="#091326" stroke="#1D3366" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#3B82F6"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui">01</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Discover</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#14264F"/>
          <text x="12" y="90" fill="#93C5FD" font-size="11" font-weight="bold" font-family="system-ui">Browse by Job & Task</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">5 functional categories,</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">cross-product solutions & industries.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Start from your problem</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Task-specific directories</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Instant search with filters</text>
          </g>
        </g>

        <!-- Step 2 -->
        <g transform="translate(328, 80)">
          <rect width="250" height="236" rx="10" fill="#091326" stroke="#1D3366" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#10B981"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui">02</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Choose</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#0C2D23"/>
          <text x="12" y="90" fill="#6EE7B7" font-size="11" font-weight="bold" font-family="system-ui">Audited Information</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">Every feature, plan and price</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">audited from official sites.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Transparent pricing tiers</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Feature detail pages</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Zero unverifiable claims</text>
          </g>
        </g>

        <!-- Step 3 -->
        <g transform="translate(608, 80)">
          <rect width="250" height="236" rx="10" fill="#091326" stroke="#1D3366" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#F59E0B"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui">03</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Connect</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#3D2808"/>
          <text x="12" y="90" fill="#FDE68A" font-size="11" font-weight="bold" font-family="system-ui">Tools You Already Use</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">Google Workspace, WhatsApp,</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">Drive, S3, Slack & Telegram.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Named product integrations</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● Documented sync flows</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Connected data pipelines</text>
          </g>
        </g>

        <!-- Step 4 -->
        <g transform="translate(888, 80)">
          <rect width="250" height="236" rx="10" fill="#091326" stroke="#1D3366" stroke-width="1"/>
          <circle cx="36" cy="36" r="16" fill="#A855F7"/>
          <text x="36" y="41" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui">04</text>
          <text x="64" y="40" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Grow</text>

          <rect x="16" y="70" width="218" height="60" rx="6" fill="#28113F"/>
          <text x="12" y="90" fill="#E9D5FF" font-size="11" font-weight="bold" font-family="system-ui">One Scalable Hub</text>
          <text x="12" y="106" fill="#E2E8F0" font-size="9" font-family="system-ui">Adopt one tool now and add</text>
          <text x="12" y="118" fill="#E2E8F0" font-size="9" font-family="system-ui">more as your team expands.</text>

          <g transform="translate(16, 145)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">● Consistent UI layouts</text>
            <text x="0" y="32" fill="#94A3B8" font-size="10" font-family="system-ui">● No re-learning overhead</text>
            <text x="0" y="50" fill="#94A3B8" font-size="10" font-family="system-ui">● Unified ecosystem support</text>
          </g>
        </g>
      `
    },
    {
      file: "integrations.svg",
      width: 560,
      height: 420,
      render: () => `
        <rect width="560" height="420" rx="16" fill="#0A1326"/>
        <rect x="20" y="20" width="520" height="380" rx="12" fill="#122040" stroke="#00D2FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="44" cy="44" r="5" fill="#EF4444"/>
        <circle cx="60" cy="44" r="5" fill="#F59E0B"/>
        <circle cx="76" cy="44" r="5" fill="#10B981"/>
        <text x="96" y="48" fill="#7DD3FC" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Integrations · Connected Ecosystem Hub</text>

        <!-- Mesh Network Diagram -->
        <g transform="translate(40, 70)">
          <!-- Center Box: ToyoApps -->
          <g transform="translate(160, 110)">
            <rect width="160" height="80" rx="10" fill="#00D2FF" fill-opacity="0.15" stroke="#00D2FF" stroke-width="2"/>
            <text x="80" y="36" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle" font-family="system-ui">ToyoApps Suite</text>
            <text x="80" y="56" fill="#00D2FF" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">API Sync Core</text>
          </g>

          <!-- Connected Tools -->
          <!-- Google Workspace -->
          <g transform="translate(0, 10)">
            <line x1="130" y1="30" x2="200" y2="110" stroke="#00D2FF" stroke-width="1.5" stroke-dasharray="3 3"/>
            <rect width="130" height="46" rx="6" fill="#0B162C" stroke="#253E66" stroke-width="1"/>
            <text x="12" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Google Workspace</text>
            <text x="12" y="34" fill="#38BDF8" font-size="9" font-family="system-ui">SigChanger Gmail</text>
          </g>

          <!-- WhatsApp & Telegram -->
          <g transform="translate(0, 220)">
            <line x1="130" y1="20" x2="200" y2="190" stroke="#00D2FF" stroke-width="1.5" stroke-dasharray="3 3"/>
            <rect width="130" height="46" rx="6" fill="#0B162C" stroke="#253E66" stroke-width="1"/>
            <text x="12" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">WhatsApp & Tele</text>
            <text x="12" y="34" fill="#10B981" font-size="9" font-family="system-ui">Alerts & Status</text>
          </g>

          <!-- AWS S3 & Cloud Storage -->
          <g transform="translate(350, 10)">
            <line x1="0" y1="30" x2="-70" y2="110" stroke="#00D2FF" stroke-width="1.5" stroke-dasharray="3 3"/>
            <rect width="130" height="46" rx="6" fill="#0B162C" stroke="#253E66" stroke-width="1"/>
            <text x="12" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">AWS S3 & Drive</text>
            <text x="12" y="34" fill="#F59E0B" font-size="9" font-family="system-ui">Sibu Media Sync</text>
          </g>

          <!-- Slack & Webhooks -->
          <g transform="translate(350, 220)">
            <line x1="0" y1="20" x2="-70" y2="190" stroke="#00D2FF" stroke-width="1.5" stroke-dasharray="3 3"/>
            <rect width="130" height="46" rx="6" fill="#0B162C" stroke="#253E66" stroke-width="1"/>
            <text x="12" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Slack & Webhooks</text>
            <text x="12" y="34" fill="#A855F7" font-size="9" font-family="system-ui">Live Notifications</text>
          </g>
        </g>

        <!-- Bottom Status -->
        <g transform="translate(40, 345)">
          <rect width="480" height="34" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="1"/>
          <circle cx="20" cy="17" r="5" fill="#10B981"/>
          <text x="34" y="21" fill="#10B981" font-size="11" font-weight="bold" font-family="system-ui">All Integrations Named by Products Themselves</text>
        </g>
      `
    },
    {
      file: "why.svg",
      width: 1200,
      height: 400,
      render: () => `
        <rect width="1200" height="400" rx="16" fill="#0A1122"/>
        <rect x="24" y="24" width="1152" height="352" rx="12" fill="#13203C" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Why ToyoApps · Fragmented Tool Sprawl vs. Unified Ecosystem</text>
        <rect x="990" y="38" width="160" height="24" rx="12" fill="#38BDF8" fill-opacity="0.2"/>
        <text x="1070" y="54" fill="#38BDF8" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Architectural Contrast</text>

        <!-- Left: Fragmented Traditional SaaS Sprawl (Chaos) -->
        <g transform="translate(48, 80)">
          <rect width="520" height="280" rx="10" fill="#170A0F" stroke="#4C1D28" stroke-width="1"/>
          <text x="24" y="32" fill="#F87171" font-size="14" font-weight="bold" font-family="system-ui">✕ The Problem: Fragmented SaaS Sprawl</text>

          <g transform="translate(24, 52)">
            <rect width="472" height="46" rx="6" fill="#2E121A"/>
            <text x="14" y="20" fill="#FDA4AF" font-size="11" font-weight="bold" font-family="system-ui">Disjointed Logins & Fragmented Tools</text>
            <text x="14" y="34" fill="#9CA3AF" font-size="10" font-family="system-ui">Separate passwords, mismatched billing dates, multiple admin panels</text>
          </g>

          <g transform="translate(24, 110)">
            <rect width="472" height="46" rx="6" fill="#2E121A"/>
            <text x="14" y="20" fill="#FDA4AF" font-size="11" font-weight="bold" font-family="system-ui">Unverifiable Marketing Vanity Metrics</text>
            <text x="14" y="34" fill="#9CA3AF" font-size="10" font-family="system-ui">Fake customer logos, inflated statistics, pricing hidden behind sales calls</text>
          </g>

          <g transform="translate(24, 168)">
            <rect width="472" height="46" rx="6" fill="#2E121A"/>
            <text x="14" y="20" fill="#FDA4AF" font-size="11" font-weight="bold" font-family="system-ui">Siloed Data & Broken Handoffs</text>
            <text x="14" y="34" fill="#9CA3AF" font-size="10" font-family="system-ui">No visibility between sales, operations, HR, and compliance workflows</text>
          </g>
        </g>

        <!-- Right: The ToyoApps Ecosystem (Order & Integration) -->
        <g transform="translate(632, 80)">
          <rect width="520" height="280" rx="10" fill="#07191E" stroke="#134D57" stroke-width="1"/>
          <text x="24" y="32" fill="#34D399" font-size="14" font-weight="bold" font-family="system-ui">✓ The ToyoApps Solution: Cohesive Ecosystem</text>

          <g transform="translate(24, 52)">
            <rect width="472" height="46" rx="6" fill="#0C2F36"/>
            <text x="14" y="20" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">16 Products Organized by Business Function</text>
            <text x="14" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">Discover by categories, feature pages, solutions, or industry verticals</text>
          </g>

          <g transform="translate(24, 110)">
            <rect width="472" height="46" rx="6" fill="#0C2F36"/>
            <text x="14" y="20" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">Strict Data Provenance & Real Technical Specs</text>
            <text x="14" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">Everything audited from official product records with verified pricing</text>
          </g>

          <g transform="translate(24, 168)">
            <rect width="472" height="46" rx="6" fill="#0C2F36"/>
            <text x="14" y="20" fill="#5EEAD4" font-size="11" font-weight="bold" font-family="system-ui">Shared Workflows & Standardized Interface</text>
            <text x="14" y="34" fill="#E2E8F0" font-size="10" font-family="system-ui">Zero re-learning curve when moving from one business tool to the next</text>
          </g>
        </g>
      `
    },
    {
      file: "team-band.svg",
      width: 1440,
      height: 550,
      render: () => `
        <rect width="1440" height="550" rx="20" fill="#070E1C"/>
        <rect x="32" y="32" width="1376" height="486" rx="16" fill="#0F1B36" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="64" cy="64" r="7" fill="#EF4444"/>
        <circle cx="86" cy="64" r="7" fill="#F59E0B"/>
        <circle cx="108" cy="64" r="7" fill="#10B981"/>
        <text x="140" y="70" fill="#94A3B8" font-size="16" font-family="system-ui, sans-serif" font-weight="600">The Principles Behind ToyoApps · Platform Integrity & Maker Economics</text>
        <rect x="1160" y="50" width="220" height="30" rx="15" fill="#2563EB" fill-opacity="0.2"/>
        <text x="1270" y="70" fill="#60A5FA" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Founding Principles</text>

        <!-- 4 Principle Pillars Cards -->
        <g transform="translate(96, 120)">
          <!-- Pillar 1 -->
          <g transform="translate(0, 0)">
            <rect width="290" height="350" rx="10" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
            <circle cx="40" cy="40" r="20" fill="#2563EB"/>
            <text x="40" y="46" fill="#FFFFFF" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">01</text>
            <text x="74" y="44" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Many Products, One Home</text>
            
            <rect x="20" y="80" width="250" height="70" rx="6" fill="#14264F"/>
            <text x="14" y="104" fill="#93C5FD" font-size="12" font-weight="bold" font-family="system-ui">Curated SaaS Marketplace</text>
            <text x="14" y="122" fill="#E2E8F0" font-size="11" font-family="system-ui">Business tools organized by the</text>
            <text x="14" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">actual job each product accomplishes.</text>

            <g transform="translate(20, 170)">
              <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="system-ui">● Sales & Marketing</text>
              <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">● HR & Workforce</text>
              <text x="0" y="60" fill="#94A3B8" font-size="11" font-family="system-ui">● Operations & Facilities</text>
              <text x="0" y="82" fill="#94A3B8" font-size="11" font-family="system-ui">● Finance & CA Compliance</text>
              <text x="0" y="104" fill="#94A3B8" font-size="11" font-family="system-ui">● Market Research & Sizing</text>
            </g>
          </g>

          <!-- Pillar 2 -->
          <g transform="translate(318, 0)">
            <rect width="290" height="350" rx="10" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
            <circle cx="40" cy="40" r="20" fill="#10B981"/>
            <text x="40" y="46" fill="#FFFFFF" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">02</text>
            <text x="74" y="44" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Find by What You Need</text>

            <rect x="20" y="80" width="250" height="70" rx="6" fill="#0C2F24"/>
            <text x="14" y="104" fill="#6EE7B7" font-size="12" font-weight="bold" font-family="system-ui">Task-Centric Discovery</text>
            <text x="14" y="122" fill="#E2E8F0" font-size="11" font-family="system-ui">Stop guessing software vendors.</text>
            <text x="14" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">Search by problem statement.</text>

            <g transform="translate(20, 170)">
              <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="system-ui">● 4 distinct discovery paths</text>
              <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">● Deep capability tagging</text>
              <text x="0" y="60" fill="#94A3B8" font-size="11" font-family="system-ui">● Objective feature comparisons</text>
              <text x="0" y="82" fill="#94A3B8" font-size="11" font-family="system-ui">● Industry-tailored views</text>
            </g>
          </g>

          <!-- Pillar 3 -->
          <g transform="translate(636, 0)">
            <rect width="290" height="350" rx="10" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
            <circle cx="40" cy="40" r="20" fill="#F59E0B"/>
            <text x="40" y="46" fill="#FFFFFF" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">03</text>
            <text x="74" y="44" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Verified Product Specs</text>

            <rect x="20" y="80" width="250" height="70" rx="6" fill="#3D2909"/>
            <text x="14" y="104" fill="#FDE68A" font-size="12" font-weight="bold" font-family="system-ui">Zero Vanity Inflation</text>
            <text x="14" y="122" fill="#E2E8F0" font-size="11" font-family="system-ui">Every price and capability is</text>
            <text x="14" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">audited from official releases.</text>

            <g transform="translate(20, 170)">
              <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="system-ui">● Timestamped pricing data</text>
              <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">● Documented integrations only</text>
              <text x="0" y="60" fill="#94A3B8" font-size="11" font-family="system-ui">● Real screenshots & workflows</text>
              <text x="0" y="82" fill="#94A3B8" font-size="11" font-family="system-ui">● Transparent trial details</text>
            </g>
          </g>

          <!-- Pillar 4 -->
          <g transform="translate(954, 0)">
            <rect width="294" height="350" rx="10" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
            <circle cx="40" cy="40" r="20" fill="#A855F7"/>
            <text x="40" y="46" fill="#FFFFFF" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui">04</text>
            <text x="74" y="44" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Open to SaaS Makers</text>

            <rect x="20" y="80" width="254" height="70" rx="6" fill="#2E1247"/>
            <text x="14" y="104" fill="#E9D5FF" font-size="12" font-weight="bold" font-family="system-ui">Distribution & Billing</text>
            <text x="14" y="122" fill="#E2E8F0" font-size="11" font-family="system-ui">Software founders publish,</text>
            <text x="14" y="136" fill="#E2E8F0" font-size="11" font-family="system-ui">monetize, and scale globally.</text>

            <g transform="translate(20, 170)">
              <text x="0" y="16" fill="#94A3B8" font-size="11" font-family="system-ui">● Zero storefront code to build</text>
              <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">● Integrated recurring payouts</text>
              <text x="0" y="60" fill="#94A3B8" font-size="11" font-family="system-ui">● Curated marketplace reach</text>
              <text x="0" y="82" fill="#94A3B8" font-size="11" font-family="system-ui">● Publisher growth analytics</text>
            </g>
          </g>
        </g>
      `
    }
  ];

  for (const h of homeVisuals) {
    const filePath = path.join("public", "images", "home", h.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${h.width}" height="${h.height}" viewBox="0 0 ${h.width} ${h.height}" fill="none">
  ${h.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }
}
