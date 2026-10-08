import fs from "node:fs";
import path from "node:path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function generateProductFeaturesEntity() {
  ensureDir(path.join("public", "images", "product"));
  ensureDir(path.join("public", "images", "features"));
  ensureDir(path.join("public", "images", "entity"));

  // 1. Product Tour & Spotlights
  const productVisuals = [
    {
      file: "spotlight-1.svg",
      width: 580,
      height: 520,
      dir: "product",
      render: () => `
        <rect width="580" height="520" rx="14" fill="#0A1224"/>
        <rect x="16" y="16" width="548" height="488" rx="10" fill="#111E3B" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="36" cy="36" r="4" fill="#EF4444"/>
        <circle cx="50" cy="36" r="4" fill="#F59E0B"/>
        <circle cx="64" cy="36" r="4" fill="#10B981"/>
        <text x="82" y="40" fill="#94A3B8" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Records & Data Management Console</text>
        <rect x="440" y="26" width="110" height="20" rx="10" fill="#10B981" fill-opacity="0.2"/>
        <text x="495" y="39" fill="#10B981" font-size="10" font-family="system-ui" font-weight="bold" text-anchor="middle">Live Sync Active</text>

        <!-- Search & Action Toolbar -->
        <g transform="translate(32, 60)">
          <rect width="516" height="38" rx="6" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
          <text x="14" y="24" fill="#8D99AE" font-size="11" font-family="system-ui">🔍 Filter records by status, owner, or date range...</text>
          <rect x="420" y="7" width="84" height="24" rx="4" fill="#2563EB"/>
          <text x="462" y="23" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">+ New Record</text>
        </g>

        <!-- Data Table Container -->
        <g transform="translate(32, 110)">
          <rect width="516" height="270" rx="8" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
          <rect width="516" height="32" rx="8" fill="#16274D"/>
          <text x="16" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">ITEM IDENTIFIER</text>
          <text x="180" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">ASSIGNED OWNER</text>
          <text x="320" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">STATUS / SLA</text>
          <text x="440" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">ACTION</text>

          <!-- Row 1 -->
          <line x1="0" y1="32" x2="516" y2="32" stroke="#16274D" stroke-width="1"/>
          <text x="16" y="54" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">#REC-1082 · Enterprise Contract</text>
          <text x="16" y="68" fill="#64748B" font-size="9" font-family="system-ui">CloudTech Global Inc.</text>
          <text x="180" y="60" fill="#93C5FD" font-size="10" font-family="system-ui">David Miller (VP)</text>
          <rect x="320" y="46" width="70" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
          <text x="355" y="60" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">APPROVED</text>
          <text x="440" y="60" fill="#3B82F6" font-size="10" font-family="system-ui">View ›</text>

          <!-- Row 2 -->
          <line x1="0" y1="80" x2="516" y2="80" stroke="#16274D" stroke-width="1"/>
          <text x="16" y="102" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">#REC-1083 · Compliance Audit</text>
          <text x="16" y="116" fill="#64748B" font-size="9" font-family="system-ui">GSTR-3B Tax Filing Cycle</text>
          <text x="180" y="108" fill="#93C5FD" font-size="10" font-family="system-ui">Ananya Sen (CA)</text>
          <rect x="320" y="94" width="70" height="20" rx="4" fill="#F59E0B" fill-opacity="0.2"/>
          <text x="355" y="108" fill="#F59E0B" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">IN REVIEW</text>
          <text x="440" y="108" fill="#3B82F6" font-size="10" font-family="system-ui">View ›</text>

          <!-- Row 3 -->
          <line x1="0" y1="128" x2="516" y2="128" stroke="#16274D" stroke-width="1"/>
          <text x="16" y="150" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">#REC-1084 · SIM Line Renewal</text>
          <text x="16" y="164" fill="#64748B" font-size="9" font-family="system-ui">+91 98201 44102 (Airtel 5G)</text>
          <text x="180" y="156" fill="#93C5FD" font-size="10" font-family="system-ui">IT Telecom Fleet</text>
          <rect x="320" y="142" width="70" height="20" rx="4" fill="#3B82F6" fill-opacity="0.2"/>
          <text x="355" y="156" fill="#60A5FA" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">SYNCED</text>
          <text x="440" y="156" fill="#3B82F6" font-size="10" font-family="system-ui">View ›</text>

          <!-- Row 4 -->
          <line x1="0" y1="176" x2="516" y2="176" stroke="#16274D" stroke-width="1"/>
          <text x="16" y="198" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">#REC-1085 · Video Asset Approval</text>
          <text x="16" y="212" fill="#64748B" font-size="9" font-family="system-ui">Keynote_Promo_4K.mp4</text>
          <text x="180" y="204" fill="#93C5FD" font-size="10" font-family="system-ui">Marcus Cole (Director)</text>
          <rect x="320" y="190" width="70" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
          <text x="355" y="204" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">APPROVED</text>
          <text x="440" y="204" fill="#3B82F6" font-size="10" font-family="system-ui">View ›</text>

          <!-- Pagination Bar -->
          <line x1="0" y1="228" x2="516" y2="228" stroke="#16274D" stroke-width="1"/>
          <text x="16" y="250" fill="#8D99AE" font-size="10" font-family="system-ui">Showing 1-4 of 128 verified items</text>
          <text x="440" y="250" fill="#93C5FD" font-size="10" font-family="system-ui">Next Page ›</text>
        </g>

        <!-- Bottom Insights Strip -->
        <g transform="translate(32, 396)">
          <rect width="250" height="84" rx="6" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
          <text x="14" y="24" fill="#8D99AE" font-size="10" font-family="system-ui">BATCH ACTIONS</text>
          <text x="14" y="44" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Export to Google Sheets & CSV</text>
          <text x="14" y="62" fill="#10B981" font-size="10" font-family="system-ui">● Instant two-way data sync</text>

          <rect x="266" width="250" height="84" rx="6" fill="#0A1326" stroke="#1E3360" stroke-width="1"/>
          <text x="14" y="24" fill="#8D99AE" font-size="10" font-family="system-ui">AUDIT TRAIL</text>
          <text x="14" y="44" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">SOC-2 Compliant Change Log</text>
          <text x="14" y="62" fill="#38BDF8" font-size="10" font-family="system-ui">● Every edit timestamped</text>
        </g>
      `
    },
    {
      file: "spotlight-2.svg",
      width: 580,
      height: 520,
      dir: "product",
      render: () => `
        <rect width="580" height="520" rx="14" fill="#0E0D24"/>
        <rect x="16" y="16" width="548" height="488" rx="10" fill="#18153A" stroke="#8B5CF6" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="36" cy="36" r="4" fill="#EF4444"/>
        <circle cx="50" cy="36" r="4" fill="#F59E0B"/>
        <circle cx="64" cy="48" r="4" fill="#10B981"/>
        <text x="82" y="40" fill="#C4B5FD" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Visual Workflow & Automation Pipeline Builder</text>
        <rect x="440" y="26" width="110" height="20" rx="10" fill="#8B5CF6" fill-opacity="0.2"/>
        <text x="495" y="39" fill="#C4B5FD" font-size="10" font-family="system-ui" font-weight="bold" text-anchor="middle">Flow Active</text>

        <!-- Visual Flow Graph Steps -->
        <g transform="translate(32, 66)">
          <!-- Node 1: Trigger -->
          <rect width="516" height="74" rx="8" fill="#0D0B1F" stroke="#8B5CF6" stroke-width="1.5"/>
          <circle cx="36" cy="37" r="16" fill="#8B5CF6"/>
          <text x="36" y="42" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">⚡</text>
          <text x="68" y="28" fill="#C4B5FD" font-size="10" font-weight="bold" font-family="system-ui">TRIGGER EVENT</text>
          <text x="68" y="44" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">When New Business Card or Lead is Ingested</text>
          <text x="68" y="58" fill="#9CA3AF" font-size="10" font-family="system-ui">Webhook received from Cardizo Mobile OCR Scanner</text>
          <rect x="430" y="27" width="70" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
          <text x="465" y="40" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">PASSED</text>
        </g>

        <!-- Downward Connector -->
        <line x1="290" y1="140" x2="290" y2="162" stroke="#8B5CF6" stroke-width="2"/>
        <polygon points="286,160 290,166 294,160" fill="#8B5CF6"/>

        <g transform="translate(32, 166)">
          <!-- Node 2: Logic Condition -->
          <rect width="516" height="74" rx="8" fill="#0D0B1F" stroke="#3B82F6" stroke-width="1.5"/>
          <circle cx="36" cy="37" r="16" fill="#3B82F6"/>
          <text x="36" y="42" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">⚙</text>
          <text x="68" y="28" fill="#93C5FD" font-size="10" font-weight="bold" font-family="system-ui">CONDITION & ENRICHMENT</text>
          <text x="68" y="44" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">If Contact Has Valid Mobile Phone & Email</text>
          <text x="68" y="58" fill="#9CA3AF" font-size="10" font-family="system-ui">Match company against ICP taxonomy & LinkedIn domain</text>
          <rect x="430" y="27" width="70" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
          <text x="465" y="40" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">TRUE</text>
        </g>

        <!-- Downward Connector -->
        <line x1="290" y1="240" x2="290" y2="262" stroke="#8B5CF6" stroke-width="2"/>
        <polygon points="286,260 290,266 294,260" fill="#8B5CF6"/>

        <g transform="translate(32, 266)">
          <!-- Node 3: Execution Actions -->
          <rect width="516" height="74" rx="8" fill="#0D0B1F" stroke="#10B981" stroke-width="1.5"/>
          <circle cx="36" cy="37" r="16" fill="#10B981"/>
          <text x="36" y="42" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">➔</text>
          <text x="68" y="28" fill="#6EE7B7" font-size="10" font-weight="bold" font-family="system-ui">MULTI-CHANNEL ACTION</text>
          <text x="68" y="44" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Dispatch WhatsApp Follow-up & Push to Google Contacts</text>
          <text x="68" y="58" fill="#9CA3AF" font-size="10" font-family="system-ui">Prefilled greeting link dispatched; internal SLA timer set</text>
          <rect x="430" y="27" width="70" height="20" rx="4" fill="#10B981" fill-opacity="0.2"/>
          <text x="465" y="40" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">EXECUTED</text>
        </g>

        <!-- Flow Execution Statistics Container -->
        <g transform="translate(32, 366)">
          <rect width="516" height="114" rx="8" fill="#0D0B1F" stroke="#251F4D" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">PIPELINE EXECUTION METRICS</text>

          <g transform="translate(16, 40)">
            <text x="0" y="14" fill="#8B5CF6" font-size="18" font-weight="bold" font-family="system-ui">1,842 Runs</text>
            <text x="0" y="30" fill="#9CA3AF" font-size="9" font-family="system-ui">Total automated triggers</text>

            <text x="170" y="14" fill="#10B981" font-size="18" font-weight="bold" font-family="system-ui">99.9% Success</text>
            <text x="170" y="30" fill="#9CA3AF" font-size="9" font-family="system-ui">Zero webhook retries</text>

            <text x="340" y="14" fill="#38BDF8" font-size="18" font-weight="bold" font-family="system-ui">320ms Latency</text>
            <text x="340" y="30" fill="#9CA3AF" font-size="9" font-family="system-ui">Avg execution time</text>
          </g>

          <rect x="16" y="80" width="484" height="22" rx="4" fill="#1C1842"/>
          <text x="242" y="95" fill="#C4B5FD" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">Live Webhook Listener: https://api.toyoapps.com/v1/flow/active</text>
        </g>
      `
    },
    {
      file: "spotlight-3.svg",
      width: 580,
      height: 520,
      dir: "product",
      render: () => `
        <rect width="580" height="520" rx="14" fill="#071518"/>
        <rect x="16" y="16" width="548" height="488" rx="10" fill="#0F242A" stroke="#0D9488" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="36" cy="36" r="4" fill="#EF4444"/>
        <circle cx="50" cy="36" r="4" fill="#F59E0B"/>
        <circle cx="64" cy="36" r="4" fill="#10B981"/>
        <text x="82" y="40" fill="#5EEAD4" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Analytics, Performance Trends & Compliance Audits</text>
        <rect x="440" y="26" width="110" height="20" rx="10" fill="#0D9488" fill-opacity="0.2"/>
        <text x="495" y="39" fill="#5EEAD4" font-size="10" font-family="system-ui" font-weight="bold" text-anchor="middle">Audit Clean</text>

        <!-- KPI Summary Cards -->
        <g transform="translate(32, 60)">
          <rect width="164" height="74" rx="8" fill="#061214" stroke="#16383F" stroke-width="1"/>
          <text x="14" y="24" fill="#9CA3AF" font-size="10" font-family="system-ui">TEAM PERFORMANCE</text>
          <text x="14" y="50" fill="#5EEAD4" font-size="20" font-weight="bold" font-family="system-ui">98.4%</text>
          <text x="80" y="50" fill="#10B981" font-size="10" font-family="system-ui">+3.2% vs Q3</text>

          <rect x="176" width="164" height="74" rx="8" fill="#061214" stroke="#16383F" stroke-width="1"/>
          <text x="14" y="24" fill="#9CA3AF" font-size="10" font-family="system-ui">ACTIVE COMPLIANCE</text>
          <text x="14" y="50" fill="#FFFFFF" font-size="20" font-weight="bold" font-family="system-ui">142/142</text>
          <text x="85" y="50" fill="#10B981" font-size="10" font-family="system-ui">100% Filed</text>

          <rect x="352" width="164" height="74" rx="8" fill="#061214" stroke="#16383F" stroke-width="1"/>
          <text x="14" y="24" fill="#9CA3AF" font-size="10" font-family="system-ui">REVENUE PIPELINE</text>
          <text x="14" y="50" fill="#F59E0B" font-size="20" font-weight="bold" font-family="system-ui">$18.4K</text>
          <text x="80" y="50" fill="#F59E0B" font-size="10" font-family="system-ui">MRR Growth</text>
        </g>

        <!-- Main Trend Line Graph Frame -->
        <g transform="translate(32, 146)">
          <rect width="516" height="190" rx="8" fill="#061214" stroke="#16383F" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">OPERATIONAL EFFICIENCY OVER TIME</text>
          
          <!-- Graph Grid Lines -->
          <line x1="16" y1="140" x2="500" y2="140" stroke="#122B30" stroke-width="1"/>
          <line x1="16" y1="90" x2="500" y2="90" stroke="#122B30" stroke-width="1"/>
          <line x1="16" y1="40" x2="500" y2="40" stroke="#122B30" stroke-width="1"/>

          <!-- Trend curve line -->
          <path d="M 20 130 Q 140 110 260 70 T 490 35" fill="none" stroke="#0D9488" stroke-width="3"/>
          <path d="M 20 130 Q 140 110 260 70 T 490 35 L 490 140 L 20 140 Z" fill="#0D9488" fill-opacity="0.1"/>

          <!-- Data Points -->
          <circle cx="140" cy="110" r="4" fill="#5EEAD4"/>
          <circle cx="260" cy="70" r="4" fill="#5EEAD4"/>
          <circle cx="490" cy="35" r="5" fill="#10B981"/>

          <!-- X axis labels -->
          <text x="20" y="160" fill="#64748B" font-size="9" font-family="system-ui">Week 1</text>
          <text x="135" y="160" fill="#64748B" font-size="9" font-family="system-ui">Week 2</text>
          <text x="255" y="160" fill="#64748B" font-size="9" font-family="system-ui">Week 3</text>
          <text x="375" y="160" fill="#64748B" font-size="9" font-family="system-ui">Week 4</text>
          <text x="470" y="160" fill="#5EEAD4" font-size="9" font-weight="bold" font-family="system-ui">Current (+34%)</text>
        </g>

        <!-- Compliance & Export Controls -->
        <g transform="translate(32, 348)">
          <rect width="516" height="132" rx="8" fill="#061214" stroke="#16383F" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">STATUTORY VERIFICATION & EXPORTS</text>

          <g transform="translate(16, 38)">
            <rect width="236" height="42" rx="4" fill="#0C252B"/>
            <text x="10" y="18" fill="#5EEAD4" font-size="10" font-weight="bold" font-family="system-ui">✓ Indian Statutory Tax Trail</text>
            <text x="10" y="32" fill="#94A3B8" font-size="9" font-family="system-ui">PF, ESI, TDS 26Q receipts validated</text>

            <rect x="248" width="236" height="42" rx="4" fill="#0C252B"/>
            <text x="10" y="18" fill="#5EEAD4" font-size="10" font-weight="bold" font-family="system-ui">✓ Single-Click Audit Report</text>
            <text x="10" y="32" fill="#94A3B8" font-size="9" font-family="system-ui">Download board-ready PDF package</text>
          </g>

          <rect x="16" y="90" width="484" height="30" rx="6" fill="#0D9488"/>
          <text x="258" y="109" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Generate Official Compliance Audit Certificate</text>
        </g>
      `
    },
    {
      file: "tour.svg",
      width: 1100,
      height: 560,
      dir: "product",
      render: () => `
        <rect width="1100" height="560" rx="16" fill="#091122"/>
        <rect x="24" y="24" width="1052" height="512" rx="12" fill="#0F1B36" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Product Tour · Interactive Application Console & Live Interface</text>
        <rect x="890" y="38" width="160" height="24" rx="12" fill="#2563EB" fill-opacity="0.2"/>
        <text x="970" y="54" fill="#60A5FA" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Production Environment</text>

        <!-- Sidebar Navigation (Left) -->
        <g transform="translate(48, 76)">
          <rect width="210" height="440" rx="8" fill="#0A1326" stroke="#1D3360" stroke-width="1"/>
          <rect x="16" y="16" width="32" height="32" rx="6" fill="#2563EB"/>
          <text x="32" y="37" fill="#FFFFFF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">⚡</text>
          <text x="56" y="28" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">ToyoApps</text>
          <text x="56" y="42" fill="#8D99AE" font-size="9" font-family="system-ui">Workspace v2.4</text>
          <line x1="16" y1="58" x2="194" y2="58" stroke="#1D3360" stroke-width="1"/>

          <!-- Nav Items -->
          <g transform="translate(16, 72)">
            <rect width="178" height="32" rx="4" fill="#2563EB"/>
            <text x="12" y="20" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">📊 Overview & Activity</text>

            <rect y="40" width="178" height="32" rx="4" fill="#0A1326"/>
            <text x="12" y="60" fill="#94A3B8" font-size="11" font-family="system-ui">📁 Product Features</text>

            <rect y="80" width="178" height="32" rx="4" fill="#0A1326"/>
            <text x="12" y="100" fill="#94A3B8" font-size="11" font-family="system-ui">🔄 Automations</text>

            <rect y="120" width="178" height="32" rx="4" fill="#0A1326"/>
            <text x="12" y="140" fill="#94A3B8" font-size="11" font-family="system-ui">🔗 Integrations</text>

            <rect y="160" width="178" height="32" rx="4" fill="#0A1326"/>
            <text x="12" y="180" fill="#94A3B8" font-size="11" font-family="system-ui">👥 Team & Roles</text>

            <rect y="200" width="178" height="32" rx="4" fill="#0A1326"/>
            <text x="12" y="220" fill="#94A3B8" font-size="11" font-family="system-ui">⚙ Settings & API</text>
          </g>

          <g transform="translate(16, 360)">
            <rect width="178" height="60" rx="6" fill="#14264F"/>
            <text x="12" y="20" fill="#60A5FA" font-size="10" font-weight="bold" font-family="system-ui">Active Tier</text>
            <text x="12" y="36" fill="#FFFFFF" font-size="11" font-family="system-ui">Professional Plan</text>
            <text x="12" y="50" fill="#10B981" font-size="9" font-family="system-ui">● All features unlocked</text>
          </g>
        </g>

        <!-- Main Workspace (Center + Right) -->
        <g transform="translate(274, 76)">
          <rect width="802" height="440" rx="8" fill="#0A1326" stroke="#1D3360" stroke-width="1"/>
          
          <!-- Top Header -->
          <g transform="translate(24, 20)">
            <text x="0" y="20" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Application Workspace & Real-Time Records</text>
            <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">Connected across ToyoApps business suite</text>
            <rect x="630" y="4" width="120" height="32" rx="6" fill="#2563EB"/>
            <text x="690" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">+ Trigger Action</text>
          </g>

          <!-- 3 Stats Cards -->
          <g transform="translate(24, 70)">
            <rect width="234" height="68" rx="6" fill="#14244A"/>
            <text x="14" y="22" fill="#94A3B8" font-size="10" font-family="system-ui">TOTAL PROCESSED</text>
            <text x="14" y="48" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="system-ui">48,290 Items</text>
            <text x="140" y="48" fill="#10B981" font-size="10" font-family="system-ui">99.8% OK</text>

            <rect x="258" width="234" height="68" rx="6" fill="#14244A"/>
            <text x="14" y="22" fill="#94A3B8" font-size="10" font-family="system-ui">AVG RESPONSE TIME</text>
            <text x="14" y="48" fill="#38BDF8" font-size="18" font-weight="bold" font-family="system-ui">1.2 Seconds</text>
            <text x="140" y="48" fill="#38BDF8" font-size="10" font-family="system-ui">Low Latency</text>

            <rect x="516" width="234" height="68" rx="6" fill="#14244A"/>
            <text x="14" y="22" fill="#94A3B8" font-size="10" font-family="system-ui">CONNECTED TOOLS</text>
            <text x="14" y="48" fill="#10B981" font-size="18" font-weight="bold" font-family="system-ui">8 Live Syncs</text>
            <text x="140" y="48" fill="#10B981" font-size="10" font-family="system-ui">Healthy</text>
          </g>

          <!-- Live Activity Feed Table -->
          <g transform="translate(24, 154)">
            <rect width="754" height="260" rx="8" fill="#0F1B36" stroke="#22396B" stroke-width="1"/>
            <rect width="754" height="32" rx="8" fill="#182A54"/>
            <text x="16" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">EVENT NAME</text>
            <text x="240" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">PAYLOAD / DETAILS</text>
            <text x="500" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">STATUS</text>
            <text x="640" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">TIMESTAMP</text>

            <line x1="0" y1="32" x2="754" y2="32" stroke="#22396B" stroke-width="1"/>
            <text x="16" y="58" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Card OCR Extraction</text>
            <text x="240" y="58" fill="#E2E8F0" font-size="10" font-family="system-ui">Sarah Jenkins ➔ Google Contacts</text>
            <rect x="500" y="46" width="60" height="18" rx="4" fill="#10B981" fill-opacity="0.2"/>
            <text x="530" y="59" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">SUCCESS</text>
            <text x="640" y="58" fill="#8D99AE" font-size="10" font-family="system-ui">1m ago</text>

            <line x1="0" y1="78" x2="754" y2="78" stroke="#22396B" stroke-width="1"/>
            <text x="16" y="104" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Workspace Signature Sync</text>
            <text x="240" y="104" fill="#E2E8F0" font-size="10" font-family="system-ui">185 Gmail mailboxes updated server-side</text>
            <rect x="500" y="92" width="60" height="18" rx="4" fill="#10B981" fill-opacity="0.2"/>
            <text x="530" y="105" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">SUCCESS</text>
            <text x="640" y="104" fill="#8D99AE" font-size="10" font-family="system-ui">14m ago</text>

            <line x1="0" y1="124" x2="754" y2="124" stroke="#22396B" stroke-width="1"/>
            <text x="16" y="150" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">CA Statutory Filing</text>
            <text x="240" y="150" fill="#E2E8F0" font-size="10" font-family="system-ui">GSTR-3B ARN Receipt Generated</text>
            <rect x="500" y="138" width="60" height="18" rx="4" fill="#10B981" fill-opacity="0.2"/>
            <text x="530" y="151" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">SUCCESS</text>
            <text x="640" y="150" fill="#8D99AE" font-size="10" font-family="system-ui">42m ago</text>

            <line x1="0" y1="170" x2="754" y2="170" stroke="#22396B" stroke-width="1"/>
            <text x="16" y="196" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Cloud SIM Recharge Alert</text>
            <text x="240" y="196" fill="#E2E8F0" font-size="10" font-family="system-ui">SIM-01 recharge due in 48h (Airtel)</text>
            <rect x="500" y="184" width="60" height="18" rx="4" fill="#F59E0B" fill-opacity="0.2"/>
            <text x="530" y="197" fill="#F59E0B" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">ALERT</text>
            <text x="640" y="196" fill="#8D99AE" font-size="10" font-family="system-ui">1h ago</text>
          </g>
        </g>
      `
    },
    {
      file: "section-card.svg",
      width: 370,
      height: 172,
      dir: "product",
      render: () => `
        <rect width="370" height="172" rx="10" fill="#0C1527"/>
        <rect x="8" y="8" width="354" height="156" rx="8" fill="#14223E" stroke="#3A86FF" stroke-width="1" stroke-opacity="0.3"/>
        <circle cx="24" cy="24" r="3" fill="#EF4444"/>
        <circle cx="34" cy="24" r="3" fill="#F59E0B"/>
        <circle cx="44" cy="24" r="3" fill="#10B981"/>
        <text x="58" y="27" fill="#8D99AE" font-size="9" font-family="system-ui, sans-serif" font-weight="600">Product Capability Module</text>

        <!-- Mini Interface Mockup -->
        <g transform="translate(20, 42)">
          <rect width="330" height="42" rx="6" fill="#0A1222"/>
          <circle cx="20" cy="21" r="10" fill="#3A86FF"/>
          <text x="20" y="25" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">✓</text>
          <text x="38" y="18" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Verified Functional Specification</text>
          <text x="38" y="32" fill="#93C5FD" font-size="9" font-family="system-ui">Audited against official vendor documentation</text>
        </g>

        <g transform="translate(20, 94)">
          <rect width="160" height="52" rx="4" fill="#0A1222"/>
          <text x="10" y="20" fill="#8D99AE" font-size="8" font-family="system-ui">FEATURE CAPABILITIES</text>
          <text x="10" y="38" fill="#10B981" font-size="11" font-weight="bold" font-family="system-ui">Production Ready</text>

          <rect x="170" width="160" height="52" rx="4" fill="#0A1222"/>
          <text x="10" y="20" fill="#8D99AE" font-size="8" font-family="system-ui">INTEGRATION COMPATIBILITY</text>
          <text x="10" y="38" fill="#38BDF8" font-size="11" font-weight="bold" font-family="system-ui">Full API Support</text>
        </g>
      `
    }
  ];

  for (const pv of productVisuals) {
    const filePath = path.join("public", "images", pv.dir, pv.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${pv.width}" height="${pv.height}" viewBox="0 0 ${pv.width} ${pv.height}" fill="none">
  ${pv.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }

  // 2. Feature Visuals
  const featureVisuals = [
    {
      file: "feature-hero.svg",
      width: 1000,
      height: 560,
      render: () => `
        <rect width="1000" height="560" rx="16" fill="#0A1224"/>
        <rect x="24" y="24" width="952" height="512" rx="12" fill="#111F3C" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Feature Workbench · Deep-Dive Capability Architecture</text>
        <rect x="800" y="38" width="150" height="24" rx="12" fill="#2563EB" fill-opacity="0.2"/>
        <text x="875" y="54" fill="#60A5FA" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Official Specification</text>

        <!-- Feature Main Workspace -->
        <g transform="translate(48, 80)">
          <rect width="904" height="436" rx="8" fill="#091326" stroke="#1D3360" stroke-width="1"/>
          
          <!-- Top Tool Strip -->
          <rect width="904" height="44" rx="8" fill="#15244A"/>
          <text x="20" y="27" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Primary Feature Workspace & Inspector</text>
          <rect x="740" y="8" width="144" height="28" rx="6" fill="#2563EB"/>
          <text x="812" y="26" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Configure Feature</text>

          <!-- Left Interactive Area -->
          <g transform="translate(20, 64)">
            <rect width="520" height="350" rx="6" fill="#0F1C38"/>
            <text x="20" y="30" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Operational Execution Canvas</text>
            <text x="20" y="48" fill="#94A3B8" font-size="11" font-family="system-ui">Real-time parameters, automated verification and status telemetry</text>

            <g transform="translate(20, 68)">
              <rect width="480" height="60" rx="6" fill="#162A54"/>
              <text x="14" y="24" fill="#60A5FA" font-size="11" font-weight="bold" font-family="system-ui">Active Configuration Node</text>
              <text x="14" y="42" fill="#E2E8F0" font-size="10" font-family="system-ui">Automated triggers, retry logic, error handling, audit export</text>
            </g>

            <g transform="translate(20, 140)">
              <rect width="480" height="60" rx="6" fill="#162A54"/>
              <text x="14" y="24" fill="#10B981" font-size="11" font-weight="bold" font-family="system-ui">Data Pipeline Validator</text>
              <text x="14" y="42" fill="#E2E8F0" font-size="10" font-family="system-ui">Schema checked against official technical requirements</text>
            </g>

            <g transform="translate(20, 212)">
              <rect width="480" height="60" rx="6" fill="#162A54"/>
              <text x="14" y="24" fill="#F59E0B" font-size="11" font-weight="bold" font-family="system-ui">Live Health Monitor</text>
              <text x="14" y="42" fill="#E2E8F0" font-size="10" font-family="system-ui">Continuous uptime telemetry · 99.99% availability index</text>
            </g>
          </g>

          <!-- Right Inspector Panel -->
          <g transform="translate(560, 64)">
            <rect width="324" height="350" rx="6" fill="#0F1C38"/>
            <text x="20" y="30" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Feature Metadata</text>

            <g transform="translate(20, 50)">
              <text x="0" y="14" fill="#8D99AE" font-size="10" font-family="system-ui">TARGET AUDIENCE</text>
              <text x="0" y="32" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Department Leads & Operators</text>

              <text x="0" y="64" fill="#8D99AE" font-size="10" font-family="system-ui">DEPLOYMENT SCOPE</text>
              <text x="0" y="82" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">Cloud-Hosted SaaS · API Accessible</text>

              <text x="0" y="114" fill="#8D99AE" font-size="10" font-family="system-ui">SECURITY & AUDIT</text>
              <text x="0" y="132" fill="#10B981" font-size="11" font-weight="bold" font-family="system-ui">Encrypted · Zero Data Leakage</text>
            </g>

            <rect x="20" y="270" width="284" height="36" rx="6" fill="#2563EB"/>
            <text x="162" y="293" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">View Full Documentation</text>
          </g>
        </g>
      `
    },
    {
      file: "feature-screen.svg",
      width: 960,
      height: 540,
      render: () => `
        <rect width="960" height="540" rx="16" fill="#0C1527"/>
        <rect x="24" y="24" width="912" height="492" rx="12" fill="#13233E" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Feature Details & Practical Application Screen</text>
        
        <!-- Screen Content Container -->
        <g transform="translate(48, 76)">
          <rect width="864" height="416" rx="8" fill="#0A1326" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(30, 30)">
            <text x="0" y="20" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Operational Execution Breakdown</text>
            <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">Step-by-step workflow capabilities audited from official releases</text>

            <g transform="translate(0, 60)">
              <rect width="804" height="70" rx="6" fill="#14244A"/>
              <circle cx="28" cy="35" r="14" fill="#38BDF8"/>
              <text x="28" y="40" fill="#0A1326" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">1</text>
              <text x="56" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Input & Data Ingestion</text>
              <text x="56" y="46" fill="#93C5FD" font-size="10" font-family="system-ui">Files, cameras, webhooks, or directory sync bring data into the product</text>
            </g>

            <g transform="translate(0, 145)">
              <rect width="804" height="70" rx="6" fill="#14244A"/>
              <circle cx="28" cy="35" r="14" fill="#10B981"/>
              <text x="28" y="40" fill="#0A1326" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">2</text>
              <text x="56" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Automated Processing & Rule Execution</text>
              <text x="56" y="46" fill="#93C5FD" font-size="10" font-family="system-ui">AI OCR extraction, payroll calculations, statutory deadline matching, SLA routing</text>
            </g>

            <g transform="translate(0, 230)">
              <rect width="804" height="70" rx="6" fill="#14244A"/>
              <circle cx="28" cy="35" r="14" fill="#F59E0B"/>
              <text x="28" y="40" fill="#0A1326" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">3</text>
              <text x="56" y="28" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Action, Notification & Export</text>
              <text x="56" y="46" fill="#93C5FD" font-size="10" font-family="system-ui">Push to Google Contacts, Gmail API rollout, PDF generation, or WhatsApp alerts</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "group-hero.svg",
      width: 560,
      height: 480,
      render: () => `
        <rect width="560" height="480" rx="14" fill="#0A1326"/>
        <rect x="16" y="16" width="528" height="448" rx="10" fill="#122040" stroke="#3A86FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="36" cy="36" r="4" fill="#EF4444"/>
        <circle cx="50" cy="36" r="4" fill="#F59E0B"/>
        <circle cx="64" cy="36" r="4" fill="#10B981"/>
        <text x="82" y="40" fill="#94A3B8" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Feature Group Capability Cluster</text>

        <!-- Cluster Diagram -->
        <g transform="translate(32, 64)">
          <rect width="496" height="380" rx="8" fill="#091122" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(20, 20)">
            <text x="0" y="20" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui">Cohesive Feature Capabilities</text>
            <text x="0" y="38" fill="#93C5FD" font-size="10" font-family="system-ui">Multiple tools working together under one roof</text>

            <g transform="translate(0, 56)">
              <rect width="456" height="66" rx="6" fill="#15244A"/>
              <text x="14" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">● Core Engine & Processing</text>
              <text x="14" y="44" fill="#94A3B8" font-size="10" font-family="system-ui">High-throughput task execution with verifiable audits</text>
            </g>

            <g transform="translate(0, 134)">
              <rect width="456" height="66" rx="6" fill="#15244A"/>
              <text x="14" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">● Admin Governance & Control</text>
              <text x="14" y="44" fill="#94A3B8" font-size="10" font-family="system-ui">Role-based access, domain synchronization and privacy filters</text>
            </g>

            <g transform="translate(0, 212)">
              <rect width="456" height="66" rx="6" fill="#15244A"/>
              <text x="14" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">● Data Export & Integration</text>
              <text x="14" y="44" fill="#94A3B8" font-size="10" font-family="system-ui">Two-way API connections, webhook feeds, and scheduled PDF reports</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "group-feature.svg",
      width: 960,
      height: 540,
      render: () => `
        <rect width="960" height="540" rx="16" fill="#0A1326"/>
        <rect x="24" y="24" width="912" height="492" rx="12" fill="#13233E" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Feature Cluster Interactive Demonstration</text>

        <g transform="translate(48, 76)">
          <rect width="864" height="416" rx="8" fill="#080F1E" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(30, 30)">
            <text x="0" y="20" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Capability Workflows in Action</text>
            <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">Unified controls designed for business speed and reliability</text>

            <g transform="translate(0, 60)">
              <rect width="804" height="84" rx="6" fill="#132244"/>
              <text x="20" y="30" fill="#38BDF8" font-size="13" font-weight="bold" font-family="system-ui">Real-Time Data Capture</text>
              <text x="20" y="50" fill="#E2E8F0" font-size="11" font-family="system-ui">Instant OCR scan, active window tracking, telemetry logging, or direct API webhooks.</text>
              <text x="20" y="68" fill="#10B981" font-size="10" font-family="system-ui">✓ Tested and verified with real enterprise loads</text>
            </g>

            <g transform="translate(0, 160)">
              <rect width="804" height="84" rx="6" fill="#132244"/>
              <text x="20" y="30" fill="#38BDF8" font-size="13" font-weight="bold" font-family="system-ui">Statutory & Procedural Accuracy</text>
              <text x="20" y="50" fill="#E2E8F0" font-size="11" font-family="system-ui">Calculations match statutory standards (PF, ESI, TDS, ROC, SLA timers).</text>
              <text x="20" y="68" fill="#10B981" font-size="10" font-family="system-ui">✓ Zero unverified claims · Official documentation only</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "area-illustration.svg",
      width: 450,
      height: 450,
      render: () => `
        <rect width="450" height="450" rx="14" fill="#0A1326"/>
        <rect x="14" y="14" width="422" height="422" rx="10" fill="#122040" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="32" cy="32" r="4" fill="#EF4444"/>
        <circle cx="44" cy="32" r="4" fill="#F59E0B"/>
        <circle cx="56" cy="32" r="4" fill="#10B981"/>
        <text x="72" y="36" fill="#94A3B8" font-size="11" font-family="system-ui, sans-serif" font-weight="600">Product Capability Architecture</text>

        <!-- Circular or Node Illustration -->
        <g transform="translate(25, 55)">
          <rect width="400" height="360" rx="8" fill="#080F1E" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(20, 20)">
            <rect width="360" height="80" rx="6" fill="#14244A"/>
            <text x="16" y="28" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">Core Functional Domain</text>
            <text x="16" y="46" fill="#E2E8F0" font-size="10" font-family="system-ui">Dedicated specialized SaaS module</text>
            <text x="16" y="62" fill="#10B981" font-size="9" font-family="system-ui">● Audited official feature set</text>
          </g>

          <g transform="translate(20, 115)">
            <rect width="360" height="80" rx="6" fill="#14244A"/>
            <text x="16" y="28" fill="#F59E0B" font-size="12" font-weight="bold" font-family="system-ui">Integration Touchpoints</text>
            <text x="16" y="46" fill="#E2E8F0" font-size="10" font-family="system-ui">Connects with existing software stack</text>
            <text x="16" y="62" fill="#F59E0B" font-size="9" font-family="system-ui">● Google Workspace, WhatsApp, Drive</text>
          </g>

          <g transform="translate(20, 210)">
            <rect width="360" height="80" rx="6" fill="#14244A"/>
            <text x="16" y="28" fill="#A855F7" font-size="12" font-weight="bold" font-family="system-ui">Business Outcomes</text>
            <text x="16" y="46" fill="#E2E8F0" font-size="10" font-family="system-ui">Zero manual friction · Measurable ROI</text>
            <text x="16" y="62" fill="#A855F7" font-size="9" font-family="system-ui">● Built for fast team adoption</text>
          </g>
        </g>
      `
    },
    {
      file: "area-band.svg",
      width: 360,
      height: 480,
      render: () => `
        <rect width="360" height="480" rx="12" fill="#0A1326"/>
        <rect x="12" y="12" width="336" height="456" rx="8" fill="#122040" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="28" cy="28" r="4" fill="#EF4444"/>
        <circle cx="40" cy="28" r="4" fill="#F59E0B"/>
        <circle cx="52" cy="28" r="4" fill="#10B981"/>
        <text x="68" y="32" fill="#94A3B8" font-size="10" font-family="system-ui, sans-serif" font-weight="600">Feature Band Module</text>

        <g transform="translate(20, 50)">
          <rect width="320" height="400" rx="6" fill="#080F1E" stroke="#1D3360" stroke-width="1"/>

          <g transform="translate(16, 20)">
            <text x="0" y="20" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Capability Overview</text>
            <text x="0" y="38" fill="#93C5FD" font-size="10" font-family="system-ui">Production verified software features</text>

            <rect y="54" width="288" height="60" rx="4" fill="#14244A"/>
            <text x="10" y="24" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Data Security & Privacy</text>
            <text x="10" y="40" fill="#10B981" font-size="9" font-family="system-ui">On-device masking & encryption</text>

            <rect y="126" width="288" height="60" rx="4" fill="#14244A"/>
            <text x="10" y="24" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Export & Interoperability</text>
            <text x="10" y="40" fill="#38BDF8" font-size="9" font-family="system-ui">Google Contacts, CSV, PDF, Webhooks</text>

            <rect y="198" width="288" height="60" rx="4" fill="#14244A"/>
            <text x="10" y="24" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">SLA & Notification Chain</text>
            <text x="10" y="40" fill="#F59E0B" font-size="9" font-family="system-ui">Immediate team escalation</text>

            <rect y="270" width="288" height="32" rx="4" fill="#2563EB"/>
            <text x="144" y="289" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Explore Features</text>
          </g>
        </g>
      `
    },
    {
      file: "item-hero.svg",
      width: 1200,
      height: 400,
      render: () => `
        <rect width="1200" height="400" rx="16" fill="#0A1224"/>
        <rect x="24" y="24" width="1152" height="352" rx="12" fill="#122040" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Product Guide & Documentation Resource</text>

        <g transform="translate(48, 76)">
          <rect width="1104" height="276" rx="8" fill="#080F1E" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(30, 30)">
            <text x="0" y="24" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="system-ui">Official Product Guide & Implementation Guide</text>
            <text x="0" y="46" fill="#93C5FD" font-size="12" font-family="system-ui">Technical setup steps, workflows, and best practice guidelines</text>

            <g transform="translate(0, 70)">
              <rect width="330" height="120" rx="6" fill="#132244"/>
              <text x="16" y="28" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">1. Fast Installation & Setup</text>
              <text x="16" y="48" fill="#E2E8F0" font-size="10" font-family="system-ui">Zero-friction account creation</text>
              <text x="16" y="64" fill="#E2E8F0" font-size="10" font-family="system-ui">Connect domain or upload credentials</text>
              <text x="16" y="90" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Takes &lt; 5 minutes</text>

              <rect x="350" width="330" height="120" rx="6" fill="#132244"/>
              <text x="16" y="28" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">2. Workflow Configuration</text>
              <text x="16" y="48" fill="#E2E8F0" font-size="10" font-family="system-ui">Define rules, teams, and alerts</text>
              <text x="16" y="64" fill="#E2E8F0" font-size="10" font-family="system-ui">Set statutory deadlines or escalation SLAs</text>
              <text x="16" y="90" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Fully customizable</text>

              <rect x="700" width="330" height="120" rx="6" fill="#132244"/>
              <text x="16" y="28" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">3. Live Production Use</text>
              <text x="16" y="48" fill="#E2E8F0" font-size="10" font-family="system-ui">Real-time team collaboration</text>
              <text x="16" y="64" fill="#E2E8F0" font-size="10" font-family="system-ui">Automated daily reports & exports</text>
              <text x="16" y="90" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">SOC-2 & audit ready</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "item-screen.svg",
      width: 960,
      height: 540,
      render: () => `
        <rect width="960" height="540" rx="16" fill="#0C1527"/>
        <rect x="24" y="24" width="912" height="492" rx="12" fill="#13233E" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Resource Walkthrough Console Screen</text>

        <g transform="translate(48, 76)">
          <rect width="864" height="416" rx="8" fill="#0A1326" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(30, 30)">
            <text x="0" y="20" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Implementation Scenario & Live Test Console</text>
            <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">Step-by-step verified instructions from product documentation</text>

            <g transform="translate(0, 60)">
              <rect width="804" height="180" rx="6" fill="#122040"/>
              <text x="20" y="28" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">CONFIGURATION CHECKLIST</text>
              
              <text x="20" y="54" fill="#FFFFFF" font-size="11" font-family="system-ui">✓ Step 1: Authentication & single-sign-on verification</text>
              <text x="20" y="80" fill="#FFFFFF" font-size="11" font-family="system-ui">✓ Step 2: Employee directory and contact list ingestion</text>
              <text x="20" y="106" fill="#FFFFFF" font-size="11" font-family="system-ui">✓ Step 3: Trigger rules, SLA escalation and webhook notifications</text>
              <text x="20" y="132" fill="#FFFFFF" font-size="11" font-family="system-ui">✓ Step 4: Verification test payload executed successfully</text>
              <text x="20" y="156" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Status: All 4 verification stages passing</text>
            </g>

            <rect y="260" width="804" height="40" rx="6" fill="#2563EB"/>
            <text x="402" y="285" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui" text-anchor="middle">Deploy to Production Environment ➔</text>
          </g>
        </g>
      `
    }
  ];

  for (const fv of featureVisuals) {
    const filePath = path.join("public", "images", "features", fv.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${fv.width}" height="${fv.height}" viewBox="0 0 ${fv.width} ${fv.height}" fill="none">
  ${fv.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }

  // 3. Entity & Hub Visuals
  const entityVisuals = [
    {
      file: "solution-hero.svg",
      width: 318,
      height: 440,
      render: () => `
        <rect width="318" height="440" rx="14" fill="#0A1326"/>
        <rect x="10" y="10" width="298" height="420" rx="10" fill="#122040" stroke="#3A86FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="26" cy="26" r="3" fill="#EF4444"/>
        <circle cx="36" cy="26" r="3" fill="#F59E0B"/>
        <circle cx="46" cy="26" r="3" fill="#10B981"/>
        <text x="58" y="29" fill="#94A3B8" font-size="9" font-family="system-ui, sans-serif" font-weight="600">Cross-Product Solution</text>

        <g transform="translate(20, 46)">
          <rect width="278" height="364" rx="6" fill="#080F1E" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(14, 18)">
            <text x="0" y="16" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Unified Business Workflow</text>
            <text x="0" y="32" fill="#93C5FD" font-size="9" font-family="system-ui">Multiple tools solving one problem</text>

            <rect y="46" width="250" height="66" rx="4" fill="#132244"/>
            <text x="10" y="22" fill="#38BDF8" font-size="10" font-weight="bold" font-family="system-ui">1. Task Initiation</text>
            <text x="10" y="38" fill="#E2E8F0" font-size="9" font-family="system-ui">One tap request or automated trigger</text>
            <text x="10" y="52" fill="#10B981" font-size="8" font-family="system-ui">● Instant owner assignment</text>

            <rect y="122" width="250" height="66" rx="4" fill="#132244"/>
            <text x="10" y="22" fill="#38BDF8" font-size="10" font-weight="bold" font-family="system-ui">2. Cross-Tool Pipeline</text>
            <text x="10" y="38" fill="#E2E8F0" font-size="9" font-family="system-ui">Shared state across specialized apps</text>
            <text x="10" y="52" fill="#10B981" font-size="8" font-family="system-ui">● Zero manual re-entry</text>

            <rect y="198" width="250" height="66" rx="4" fill="#132244"/>
            <text x="10" y="22" fill="#38BDF8" font-size="10" font-weight="bold" font-family="system-ui">3. Final Resolution</text>
            <text x="10" y="38" fill="#E2E8F0" font-size="9" font-family="system-ui">Complete audit trail & PDF receipt</text>
            <text x="10" y="52" fill="#10B981" font-size="8" font-family="system-ui">● Compliance verified</text>

            <rect y="276" width="250" height="28" rx="4" fill="#2563EB"/>
            <text x="125" y="294" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Adopt Solution</text>
          </g>
        </g>
      `
    },
    {
      file: "industry-hero.svg",
      width: 1200,
      height: 320,
      render: () => `
        <rect width="1200" height="320" rx="16" fill="#0A1326"/>
        <rect x="24" y="24" width="1152" height="272" rx="12" fill="#122040" stroke="#0D9488" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#5EEAD4" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Industry Vertical Architecture & Domain Compliance</text>
        <rect x="990" y="38" width="160" height="24" rx="12" fill="#0D9488" fill-opacity="0.2"/>
        <text x="1070" y="54" fill="#5EEAD4" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Domain Tailored</text>

        <g transform="translate(48, 76)">
          <rect width="1104" height="200" rx="8" fill="#080F1E" stroke="#143D3F" stroke-width="1"/>
          
          <g transform="translate(24, 24)">
            <text x="0" y="20" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Specialized Vertical Toolsets & Regulatory Workflows</text>
            <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">Built to handle industry-specific statutory obligations, data models, and team roles</text>

            <g transform="translate(0, 54)">
              <rect width="330" height="84" rx="6" fill="#0C262C"/>
              <text x="14" y="24" fill="#5EEAD4" font-size="12" font-weight="bold" font-family="system-ui">Statutory & Domain Rules</text>
              <text x="14" y="44" fill="#E2E8F0" font-size="10" font-family="system-ui">Compliance calendars, statutory codes &</text>
              <text x="14" y="58" fill="#E2E8F0" font-size="10" font-family="system-ui">automated due-date tracking</text>

              <rect x="350" width="330" height="84" rx="6" fill="#0C262C"/>
              <text x="14" y="24" fill="#5EEAD4" font-size="12" font-weight="bold" font-family="system-ui">Client & Partner Portals</text>
              <text x="14" y="44" fill="#E2E8F0" font-size="10" font-family="system-ui">Self-service document collection,</text>
              <text x="14" y="58" fill="#E2E8F0" font-size="10" font-family="system-ui">status visibility and secure uploads</text>

              <rect x="700" width="356" height="84" rx="6" fill="#0C262C"/>
              <text x="14" y="24" fill="#5EEAD4" font-size="12" font-weight="bold" font-family="system-ui">Zero Penalty Guarantee</text>
              <text x="14" y="44" fill="#E2E8F0" font-size="10" font-family="system-ui">Prepare-review-file pipelines verify</text>
              <text x="14" y="58" fill="#E2E8F0" font-size="10" font-family="system-ui">every detail before submission</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "integration-hero.svg",
      width: 960,
      height: 360,
      render: () => `
        <rect width="960" height="360" rx="16" fill="#0C1527"/>
        <rect x="24" y="24" width="912" height="312" rx="12" fill="#15243F" stroke="#00D2FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#7DD3FC" font-size="13" font-family="system-ui, sans-serif" font-weight="600">Integration Architecture · Direct API Handshake</text>

        <g transform="translate(48, 76)">
          <rect width="864" height="236" rx="8" fill="#0B1321" stroke="#253E66" stroke-width="1"/>
          
          <g transform="translate(30, 24)">
            <text x="0" y="20" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">Live API Synchronization & Data Scope</text>
            <text x="0" y="38" fill="#94A3B8" font-size="11" font-family="system-ui">Documented connections as stated in official product technical specifications</text>

            <g transform="translate(0, 56)">
              <rect width="250" height="110" rx="6" fill="#132742"/>
              <text x="14" y="24" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">Authentication & Scope</text>
              <text x="14" y="44" fill="#E2E8F0" font-size="10" font-family="system-ui">OAuth 2.0 / Service Account Key</text>
              <text x="14" y="60" fill="#E2E8F0" font-size="10" font-family="system-ui">Immediate revocation supported</text>
              <text x="14" y="86" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">● Zero stored master credentials</text>

              <rect x="270" width="250" height="110" rx="6" fill="#132742"/>
              <text x="14" y="24" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">Sync Cadence</text>
              <text x="14" y="44" fill="#E2E8F0" font-size="10" font-family="system-ui">Real-time webhooks & periodic sync</text>
              <text x="14" y="60" fill="#E2E8F0" font-size="10" font-family="system-ui">Changes reflected within minutes</text>
              <text x="14" y="86" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">● Bidirectional health monitor</text>

              <rect x="540" width="264" height="110" rx="6" fill="#132742"/>
              <text x="14" y="24" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">Supported Products</text>
              <text x="14" y="44" fill="#E2E8F0" font-size="10" font-family="system-ui">SigChanger, Sibu, Cardizo,</text>
              <text x="14" y="60" fill="#E2E8F0" font-size="10" font-family="system-ui">ZapBuzzer, Fantom</text>
              <text x="14" y="86" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">● Official integrations only</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "product-tile.svg",
      width: 400,
      height: 260,
      render: () => `
        <rect width="400" height="260" rx="12" fill="#0C1527"/>
        <rect x="12" y="12" width="376" height="236" rx="8" fill="#15243F" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="28" cy="28" r="4" fill="#EF4444"/>
        <circle cx="40" cy="28" r="4" fill="#F59E0B"/>
        <circle cx="52" cy="28" r="4" fill="#10B981"/>
        <text x="68" y="32" fill="#94A3B8" font-size="10" font-family="system-ui, sans-serif" font-weight="600">Product Snapshot Console</text>

        <g transform="translate(24, 48)">
          <rect width="352" height="184" rx="6" fill="#0A1222" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(16, 16)">
            <text x="0" y="16" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Active Product Interface</text>
            <text x="0" y="32" fill="#38BDF8" font-size="10" font-family="system-ui">Verified capabilities & live specs</text>

            <rect y="44" width="320" height="40" rx="4" fill="#14244A"/>
            <text x="12" y="24" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">✓ Official Feature Set Available</text>

            <rect y="92" width="320" height="40" rx="4" fill="#14244A"/>
            <text x="12" y="24" fill="#60A5FA" font-size="10" font-weight="bold" font-family="system-ui">✓ Audited Pricing & Free Trial Ready</text>
          </g>
        </g>
      `
    },
    {
      file: "hub-card.svg",
      width: 370,
      height: 172,
      render: () => `
        <rect width="370" height="172" rx="10" fill="#0A1326"/>
        <rect x="8" y="8" width="354" height="156" rx="8" fill="#122040" stroke="#3A86FF" stroke-width="1" stroke-opacity="0.3"/>
        <circle cx="24" cy="24" r="3" fill="#EF4444"/>
        <circle cx="34" cy="24" r="3" fill="#F59E0B"/>
        <circle cx="44" cy="24" r="3" fill="#10B981"/>
        <text x="58" y="27" fill="#8D99AE" font-size="9" font-family="system-ui, sans-serif" font-weight="600">Entity Hub Card</text>

        <g transform="translate(20, 42)">
          <rect width="330" height="106" rx="6" fill="#080F1E"/>
          <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Cross-Functional SaaS Solution</text>
          <text x="14" y="42" fill="#93C5FD" font-size="10" font-family="system-ui">Multiple tools working together seamlessly</text>
          <text x="14" y="64" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui">● Audited official features & pricing</text>
          <text x="14" y="82" fill="#38BDF8" font-size="9" font-family="system-ui">● Connected data workflows</text>
        </g>
      `
    },
    {
      file: "resource-featured.svg",
      width: 845,
      height: 475,
      render: () => `
        <rect width="845" height="475" rx="14" fill="#0A1326"/>
        <rect x="18" y="18" width="809" height="439" rx="10" fill="#122040" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="40" cy="40" r="4" fill="#EF4444"/>
        <circle cx="52" cy="40" r="4" fill="#F59E0B"/>
        <circle cx="64" cy="40" r="4" fill="#10B981"/>
        <text x="82" y="44" fill="#94A3B8" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Featured Technical Resource & Implementation Guide</text>

        <g transform="translate(40, 70)">
          <rect width="765" height="365" rx="8" fill="#080F1E" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(30, 30)">
            <text x="0" y="24" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="system-ui">Selecting & Operationalizing Business SaaS</text>
            <text x="0" y="48" fill="#93C5FD" font-size="12" font-family="system-ui">A practitioner guide to avoiding software sprawl and choosing tools with clear ROI</text>

            <g transform="translate(0, 76)">
              <rect width="705" height="70" rx="6" fill="#132244"/>
              <text x="16" y="28" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">1. Evaluating True Capability vs Marketing Fluff</text>
              <text x="16" y="48" fill="#E2E8F0" font-size="10" font-family="system-ui">How to read technical specs, verify actual API support, and check Indian statutory readiness</text>
            </g>

            <g transform="translate(0, 160)">
              <rect width="705" height="70" rx="6" fill="#132244"/>
              <text x="16" y="28" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">2. Cross-Product Interoperability Patterns</text>
              <text x="16" y="48" fill="#E2E8F0" font-size="10" font-family="system-ui">Connecting Google Workspace, WhatsApp alerts, and cloud asset storage without duct tape</text>
            </g>
          </g>
        </g>
      `
    },
    {
      file: "resource-card.svg",
      width: 290,
      height: 163,
      render: () => `
        <rect width="290" height="163" rx="8" fill="#0A1326"/>
        <rect x="6" y="6" width="278" height="151" rx="6" fill="#122040" stroke="#3A86FF" stroke-width="1" stroke-opacity="0.3"/>
        <circle cx="20" cy="20" r="3" fill="#EF4444"/>
        <circle cx="30" cy="20" r="3" fill="#F59E0B"/>
        <circle cx="40" cy="20" r="3" fill="#10B981"/>
        <text x="52" y="23" fill="#8D99AE" font-size="8" font-family="system-ui, sans-serif" font-weight="600">Resource Guide</text>

        <g transform="translate(16, 36)">
          <rect width="258" height="108" rx="4" fill="#080F1E"/>
          <text x="10" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Technical Implementation Note</text>
          <text x="10" y="36" fill="#93C5FD" font-size="8" font-family="system-ui">Configuration instructions & best practices</text>
          <text x="10" y="60" fill="#10B981" font-size="8" font-weight="bold" font-family="system-ui">✓ Step-by-step setup walkthrough</text>
          <text x="10" y="78" fill="#38BDF8" font-size="8" font-family="system-ui">✓ Verified against official records</text>
        </g>
      `
    },
    {
      file: "resource-cover.svg",
      width: 860,
      height: 484,
      render: () => `
        <rect width="860" height="484" rx="14" fill="#0A1326"/>
        <rect x="20" y="20" width="820" height="444" rx="10" fill="#122040" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="42" cy="42" r="4" fill="#EF4444"/>
        <circle cx="54" cy="42" r="4" fill="#F59E0B"/>
        <circle cx="66" cy="42" r="4" fill="#10B981"/>
        <text x="84" y="46" fill="#94A3B8" font-size="12" font-family="system-ui, sans-serif" font-weight="600">ToyoApps Technical Guide & Documentation Article</text>

        <g transform="translate(40, 70)">
          <rect width="780" height="374" rx="8" fill="#080F1E" stroke="#1D3360" stroke-width="1"/>
          
          <g transform="translate(30, 30)">
            <text x="0" y="24" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="system-ui">SaaS Operations & Business Architecture</text>
            <text x="0" y="48" fill="#93C5FD" font-size="12" font-family="system-ui">In-depth guide for founders, department heads and operations leaders</text>

            <g transform="translate(0, 76)">
              <rect width="720" height="74" rx="6" fill="#132244"/>
              <text x="16" y="28" fill="#38BDF8" font-size="12" font-weight="bold" font-family="system-ui">Audited Technical Specifications</text>
              <text x="16" y="48" fill="#E2E8F0" font-size="10" font-family="system-ui">Understanding exact product capabilities without marketing spin</text>
            </g>

            <g transform="translate(0, 168)">
              <rect width="720" height="74" rx="6" fill="#132244"/>
              <text x="16" y="28" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">Connected Workplace Workflows</text>
              <text x="16" y="48" fill="#E2E8F0" font-size="10" font-family="system-ui">How Cardizo, SigChanger, TrackySuite and HRMagix operate together</text>
            </g>
          </g>
        </g>
      `
    }
  ];

  for (const ev of entityVisuals) {
    const filePath = path.join("public", "images", "entity", ev.file);
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${ev.width}" height="${ev.height}" viewBox="0 0 ${ev.width} ${ev.height}" fill="none">
  ${ev.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated: ${filePath}`);
  }
}
