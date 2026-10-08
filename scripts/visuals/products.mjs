import fs from "node:fs";
import path from "node:path";

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function generateProductCards() {
  const products = [
    {
      slug: "cardizo",
      name: "Cardizo",
      theme: { bg: "#0B132B", cardBg: "#1C2541", accent: "#3A86FF", text: "#FFFFFF", muted: "#8D99AE" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0B132B"/>
        <!-- Window frame -->
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#1C2541" stroke="#3A86FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8D99AE" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Cardizo · AI Business Card Scanner</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#3A86FF" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#3A86FF" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">AI OCR Active</text>

        <!-- Left: Card Scan Frame -->
        <rect x="44" y="74" width="240" height="240" rx="8" fill="#0B132B" stroke="#3A86FF" stroke-width="1.5" stroke-dasharray="4 4"/>
        <!-- Card visual inside frame -->
        <rect x="60" y="94" width="208" height="130" rx="6" fill="#2E3856" stroke="#48567A" stroke-width="1"/>
        <!-- OCR scan line -->
        <line x1="60" y1="140" x2="268" y2="140" stroke="#00F0FF" stroke-width="2" stroke-opacity="0.8"/>
        <!-- Card contents -->
        <rect x="74" y="110" width="36" height="36" rx="18" fill="#3A86FF" fill-opacity="0.3"/>
        <text x="92" y="132" fill="#3A86FF" font-size="14" font-weight="bold" text-anchor="middle" font-family="system-ui">ER</text>
        <text x="120" y="122" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Elena Rostova</text>
        <text x="120" y="136" fill="#8D99AE" font-size="10" font-family="system-ui">VP Product · CloudTech</text>
        <!-- OCR bounding boxes -->
        <rect x="72" y="156" width="184" height="18" rx="3" fill="#00F0FF" fill-opacity="0.15" stroke="#00F0FF" stroke-width="1"/>
        <text x="78" y="169" fill="#00F0FF" font-size="9" font-family="monospace">✉ elena.r@cloudtech.io [99.8%]</text>
        <rect x="72" y="178" width="140" height="18" rx="3" fill="#00F0FF" fill-opacity="0.15" stroke="#00F0FF" stroke-width="1"/>
        <text x="78" y="191" fill="#00F0FF" font-size="9" font-family="monospace">✆ +1 (415) 890-2341</text>
        <!-- Live status -->
        <rect x="80" y="244" width="168" height="24" rx="12" fill="#10B981" fill-opacity="0.2"/>
        <circle cx="94" cy="256" r="4" fill="#10B981"/>
        <text x="106" y="260" fill="#10B981" font-size="11" font-weight="600" font-family="system-ui">Scanned in 1.2s</text>
        <text x="64" y="295" fill="#8D99AE" font-size="10" font-family="system-ui">Auto-tagged: #TechSummit #KeyLead</text>

        <!-- Right: Processed Contact & Instant Follow-up -->
        <rect x="304" y="74" width="296" height="240" rx="8" fill="#161E36" stroke="#2E3856" stroke-width="1"/>
        <text x="320" y="98" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">Verified Contact Record</text>
        <rect x="520" y="86" width="65" height="18" rx="4" fill="#10B981" fill-opacity="0.2"/>
        <text x="552" y="99" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">VERIFIED</text>
        
        <!-- Contact fields -->
        <g transform="translate(320, 112)">
          <rect width="264" height="28" rx="4" fill="#1C2541"/>
          <text x="10" y="18" fill="#8D99AE" font-size="10" font-family="system-ui">Company</text>
          <text x="90" y="18" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">CloudTech Global Inc.</text>
        </g>
        <g transform="translate(320, 146)">
          <rect width="264" height="28" rx="4" fill="#1C2541"/>
          <text x="10" y="18" fill="#8D99AE" font-size="10" font-family="system-ui">Email</text>
          <text x="90" y="18" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">elena.r@cloudtech.io</text>
        </g>
        <g transform="translate(320, 180)">
          <rect width="264" height="28" rx="4" fill="#1C2541"/>
          <text x="10" y="18" fill="#8D99AE" font-size="10" font-family="system-ui">Phone</text>
          <text x="90" y="18" fill="#FFFFFF" font-size="11" font-weight="600" font-family="system-ui">+1 (415) 890-2341</text>
        </g>

        <!-- Actions -->
        <g transform="translate(320, 222)">
          <!-- WhatsApp button -->
          <rect width="126" height="34" rx="6" fill="#25D366"/>
          <text x="63" y="21" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">💬 WhatsApp</text>
          <!-- Email button -->
          <rect x="138" width="126" height="34" rx="6" fill="#3A86FF"/>
          <text x="201" y="21" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">✉ Email Follow-up</text>
        </g>
        <g transform="translate(320, 266)">
          <rect width="264" height="32" rx="6" fill="#2E3856" stroke="#48567A" stroke-width="1"/>
          <text x="132" y="20" fill="#E2E8F0" font-size="11" font-weight="600" font-family="system-ui" text-anchor="middle">➔ Export to Google Contacts & CSV</text>
        </g>
      `
    },
    {
      slug: "fantom",
      name: "Fantom",
      theme: { bg: "#0F172A", cardBg: "#1E293B", accent: "#06B6D4", text: "#FFFFFF", muted: "#94A3B8" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0F172A"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Fantom · Company SIM & Telecom Fleet Manager</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#06B6D4" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#06B6D4" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">14 SIMs Synced</text>

        <!-- KPI Strip -->
        <g transform="translate(44, 72)">
          <rect width="170" height="54" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
          <text x="16" y="22" fill="#94A3B8" font-size="11" font-family="system-ui">Active Numbers</text>
          <text x="16" y="44" fill="#38BDF8" font-size="18" font-weight="bold" font-family="system-ui">24 / 26</text>

          <rect x="185" width="170" height="54" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
          <text x="201" y="22" fill="#94A3B8" font-size="11" font-family="system-ui">Recharges Due (7d)</text>
          <text x="201" y="44" fill="#F59E0B" font-size="18" font-weight="bold" font-family="system-ui">3 Due Soon</text>

          <rect x="370" width="170" height="54" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
          <text x="386" y="22" fill="#94A3B8" font-size="11" font-family="system-ui">Android Logs Synced</text>
          <text x="386" y="44" fill="#10B981" font-size="18" font-weight="bold" font-family="system-ui">1,420 Today</text>
        </g>

        <!-- SIM Table -->
        <g transform="translate(44, 138)">
          <rect width="552" height="178" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
          <!-- Table header -->
          <rect width="552" height="30" rx="8" fill="#1E293B"/>
          <text x="16" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">SIM / PHONE</text>
          <text x="160" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">CARRIER</text>
          <text x="260" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">RECHARGE DUE</text>
          <text x="390" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">WHATSAPP</text>
          <text x="480" y="20" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">TELEGRAM</text>

          <!-- Row 1 -->
          <line x1="0" y1="30" x2="552" y2="30" stroke="#1E293B" stroke-width="1"/>
          <text x="16" y="52" fill="#F8FAFC" font-size="11" font-weight="600" font-family="system-ui">SIM-01 · +91 98201 44102</text>
          <text x="16" y="66" fill="#64748B" font-size="10" font-family="system-ui">Assigned: Sales Team North</text>
          <rect x="160" y="44" width="55" height="18" rx="4" fill="#0284C7" fill-opacity="0.2"/>
          <text x="187" y="57" fill="#38BDF8" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">Airtel 5G</text>
          <rect x="260" y="44" width="75" height="18" rx="4" fill="#EF4444" fill-opacity="0.2"/>
          <text x="297" y="57" fill="#F87171" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">In 2 Days</text>
          <circle cx="410" cy="53" r="4" fill="#10B981"/>
          <text x="420" y="57" fill="#10B981" font-size="10" font-family="system-ui">Active</text>
          <circle cx="500" cy="53" r="4" fill="#10B981"/>
          <text x="510" y="57" fill="#10B981" font-size="10" font-family="system-ui">Active</text>

          <!-- Row 2 -->
          <line x1="0" y1="80" x2="552" y2="80" stroke="#1E293B" stroke-width="1"/>
          <text x="16" y="102" fill="#F8FAFC" font-size="11" font-weight="600" font-family="system-ui">SIM-02 · +91 98202 88319</text>
          <text x="16" y="116" fill="#64748B" font-size="10" font-family="system-ui">Assigned: Support Desk</text>
          <rect x="160" y="94" width="55" height="18" rx="4" fill="#3B82F6" fill-opacity="0.2"/>
          <text x="187" y="107" fill="#60A5FA" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">Jio 5G</text>
          <text x="260" y="107" fill="#94A3B8" font-size="11" font-family="system-ui">In 28 Days</text>
          <circle cx="410" cy="103" r="4" fill="#10B981"/>
          <text x="420" y="107" fill="#10B981" font-size="10" font-family="system-ui">Active</text>
          <circle cx="500" cy="103" r="4" fill="#64748B"/>
          <text x="510" y="107" fill="#64748B" font-size="10" font-family="system-ui">Off</text>

          <!-- Row 3 -->
          <line x1="0" y1="130" x2="552" y2="130" stroke="#1E293B" stroke-width="1"/>
          <text x="16" y="152" fill="#F8FAFC" font-size="11" font-weight="600" font-family="system-ui">SIM-03 · +91 98204 11904</text>
          <text x="16" y="166" fill="#64748B" font-size="10" font-family="system-ui">Assigned: Logistics Ops</text>
          <rect x="160" y="144" width="55" height="18" rx="4" fill="#F97316" fill-opacity="0.2"/>
          <text x="187" y="157" fill="#FB923C" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">Vi Max</text>
          <text x="260" y="157" fill="#94A3B8" font-size="11" font-family="system-ui">In 14 Days</text>
          <circle cx="410" cy="153" r="4" fill="#10B981"/>
          <text x="420" y="157" fill="#10B981" font-size="10" font-family="system-ui">Active</text>
          <circle cx="500" cy="153" r="4" fill="#10B981"/>
          <text x="510" y="157" fill="#10B981" font-size="10" font-family="system-ui">Active</text>
        </g>
      `
    },
    {
      slug: "fleetras",
      name: "Fleetras",
      theme: { bg: "#0B1528", cardBg: "#172A45", accent: "#F59E0B", text: "#FFFFFF", muted: "#94A3B8" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0B1528"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#172A45" stroke="#F59E0B" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Fleetras · Fleet Operations & Vehicle Dispatch</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">18 Vehicles Live</text>

        <!-- Left: GPS Map Simulation -->
        <g transform="translate(44, 74)">
          <rect width="300" height="240" rx="8" fill="#08101E" stroke="#253856" stroke-width="1"/>
          <!-- Map Grid Lines -->
          <line x1="0" y1="60" x2="300" y2="60" stroke="#13233A" stroke-width="1"/>
          <line x1="0" y1="120" x2="300" y2="120" stroke="#13233A" stroke-width="1"/>
          <line x1="0" y1="180" x2="300" y2="180" stroke="#13233A" stroke-width="1"/>
          <line x1="75" y1="0" x2="75" y2="240" stroke="#13233A" stroke-width="1"/>
          <line x1="150" y1="0" x2="150" y2="240" stroke="#13233A" stroke-width="1"/>
          <line x1="225" y1="0" x2="225" y2="240" stroke="#13233A" stroke-width="1"/>
          <!-- Route Path -->
          <path d="M 40 180 Q 90 120 140 130 T 250 60" fill="none" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6 3"/>
          <!-- Vehicle Markers -->
          <circle cx="40" cy="180" r="7" fill="#3B82F6"/>
          <circle cx="140" cy="130" r="9" fill="#10B981"/>
          <circle cx="140" cy="130" r="14" fill="#10B981" fill-opacity="0.3"/>
          <circle cx="250" cy="60" r="7" fill="#EF4444"/>
          <!-- Vehicle Tag Tooltip -->
          <rect x="110" y="86" width="130" height="34" rx="6" fill="#1E293B" stroke="#F59E0B" stroke-width="1"/>
          <text x="120" y="101" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">TRUCK-108 · 64 km/h</text>
          <text x="120" y="114" fill="#10B981" font-size="9" font-family="system-ui">ETA Mumbai Hub: 42m</text>
        </g>

        <!-- Right: Telemetry & Vehicle Cards -->
        <g transform="translate(360, 74)">
          <rect width="240" height="74" rx="8" fill="#08101E" stroke="#253856" stroke-width="1"/>
          <text x="14" y="24" fill="#94A3B8" font-size="10" font-family="system-ui">FLEET FUEL & EFFICIENCY</text>
          <text x="14" y="50" fill="#F59E0B" font-size="20" font-weight="bold" font-family="system-ui">8.4 km/L</text>
          <text x="110" y="50" fill="#10B981" font-size="11" font-family="system-ui">+6.2% optimal</text>

          <rect y="84" width="240" height="74" rx="8" fill="#08101E" stroke="#253856" stroke-width="1"/>
          <text x="14" y="108" fill="#94A3B8" font-size="10" font-family="system-ui">SCHEDULED MAINTENANCE</text>
          <text x="14" y="134" fill="#38BDF8" font-size="18" font-weight="bold" font-family="system-ui">Van #04 Service</text>
          <text x="160" y="134" fill="#F59E0B" font-size="11" font-weight="bold" font-family="system-ui">Due 300km</text>

          <rect y="168" width="240" height="72" rx="8" fill="#08101E" stroke="#253856" stroke-width="1"/>
          <text x="14" y="192" fill="#94A3B8" font-size="10" font-family="system-ui">DISPATCH STATUS</text>
          <text x="14" y="216" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">14 En Route · 3 Loading · 1 Idle</text>
          <rect x="14" y="226" width="212" height="6" rx="3" fill="#1E293B"/>
          <rect x="14" y="226" width="165" height="6" rx="3" fill="#10B981"/>
        </g>
      `
    },
    {
      slug: "getbenj",
      name: "GetBenj",
      theme: { bg: "#130A2A", cardBg: "#221244", accent: "#A855F7", text: "#FFFFFF", muted: "#C084FC" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#130A2A"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#221244" stroke="#A855F7" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#D8B4FE" font-size="12" font-family="system-ui, sans-serif" font-weight="600">GetBenj · AI Go-To-Market Plan Generator</text>
        <rect x="480" y="38" width="120" height="22" rx="11" fill="#A855F7" fill-opacity="0.25"/>
        <text x="540" y="53" fill="#E9D5FF" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Export PDF Plan</text>

        <!-- Left: Input & Buyer Persona -->
        <g transform="translate(44, 74)">
          <rect width="260" height="240" rx="8" fill="#170B33" stroke="#3B1C70" stroke-width="1"/>
          <text x="14" y="24" fill="#E9D5FF" font-size="11" font-weight="bold" font-family="system-ui">GENERATED BUYER PERSONA</text>
          
          <g transform="translate(14, 38)">
            <rect width="232" height="60" rx="6" fill="#291552"/>
            <circle cx="26" cy="30" r="16" fill="#A855F7"/>
            <text x="26" y="34" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">DK</text>
            <text x="52" y="24" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">D2C Brand Founder</text>
            <text x="52" y="38" fill="#C084FC" font-size="10" font-family="system-ui">Target: $1M - $5M ARR</text>
            <text x="52" y="50" fill="#E9D5FF" font-size="9" font-family="system-ui">Core Pain: Scaling ROAS</text>
          </g>

          <text x="14" y="122" fill="#E9D5FF" font-size="11" font-weight="bold" font-family="system-ui">RECOMMENDED CHANNELS</text>
          <g transform="translate(14, 134)">
            <rect width="232" height="26" rx="4" fill="#291552"/>
            <text x="10" y="17" fill="#FFFFFF" font-size="11" font-family="system-ui">1. Meta Hyperlocal Video Ads</text>
            <text x="195" y="17" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">4.2x ROAS</text>
          </g>
          <g transform="translate(14, 166)">
            <rect width="232" height="26" rx="4" fill="#291552"/>
            <text x="10" y="17" fill="#FFFFFF" font-size="11" font-family="system-ui">2. Google Intent Search</text>
            <text x="195" y="17" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">3.8x ROAS</text>
          </g>
          <g transform="translate(14, 198)">
            <rect width="232" height="26" rx="4" fill="#291552"/>
            <text x="10" y="17" fill="#FFFFFF" font-size="11" font-family="system-ui">3. Creator Whitelisting</text>
            <text x="195" y="17" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">5.1x ROAS</text>
          </g>
        </g>

        <!-- Right: Budget Split & Strategy Breakdown -->
        <g transform="translate(320, 74)">
          <rect width="280" height="240" rx="8" fill="#170B33" stroke="#3B1C70" stroke-width="1"/>
          <text x="16" y="24" fill="#E9D5FF" font-size="11" font-weight="bold" font-family="system-ui">RECOMMENDED BUDGET SPLIT</text>
          
          <!-- Bar Graph Breakdown -->
          <g transform="translate(16, 44)">
            <text x="0" y="14" fill="#D8B4FE" font-size="10" font-family="system-ui">Meta Ads (40%)</text>
            <rect x="100" y="4" width="150" height="12" rx="6" fill="#291552"/>
            <rect x="100" y="4" width="60" height="12" rx="6" fill="#A855F7"/>

            <text x="0" y="40" fill="#D8B4FE" font-size="10" font-family="system-ui">Google Search (30%)</text>
            <rect x="100" y="30" width="150" height="12" rx="6" fill="#291552"/>
            <rect x="100" y="30" width="45" height="12" rx="6" fill="#EC4899"/>

            <text x="0" y="66" fill="#D8B4FE" font-size="10" font-family="system-ui">Influencers (20%)</text>
            <rect x="100" y="56" width="150" height="12" rx="6" fill="#291552"/>
            <rect x="100" y="56" width="30" height="12" rx="6" fill="#3B82F6"/>

            <text x="0" y="92" fill="#D8B4FE" font-size="10" font-family="system-ui">Retention/Email (10%)</text>
            <rect x="100" y="82" width="150" height="12" rx="6" fill="#291552"/>
            <rect x="100" y="82" width="15" height="12" rx="6" fill="#10B981"/>
          </g>

          <!-- Strategy Outcome Box -->
          <g transform="translate(16, 160)">
            <rect width="248" height="66" rx="6" fill="#291552" stroke="#A855F7" stroke-width="1"/>
            <text x="12" y="22" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Hyperlocal Ad Targeting</text>
            <text x="12" y="38" fill="#C084FC" font-size="10" font-family="system-ui">Tier-1 Metros · High intent consumer clusters</text>
            <text x="12" y="52" fill="#E9D5FF" font-size="9" font-family="system-ui">Estimated Customer CAC: $24.50</text>
          </g>
        </g>
      `
    },
    {
      slug: "hrmagix",
      name: "HRMagix",
      theme: { bg: "#0C1E3C", cardBg: "#173360", accent: "#2563EB", text: "#FFFFFF", muted: "#93C5FD" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0C1E3C"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#173360" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#93C5FD" font-size="12" font-family="system-ui, sans-serif" font-weight="600">HRMagix · Indian HRMS & Statutory Payroll (PF, ESI, PT, TDS)</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Payroll Processed</text>

        <!-- Salary Slip Card -->
        <g transform="translate(44, 74)">
          <rect width="320" height="240" rx="8" fill="#0A1830" stroke="#254B8C" stroke-width="1"/>
          <text x="16" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Salary Slip · October 2026</text>
          <text x="16" y="42" fill="#93C5FD" font-size="10" font-family="system-ui">Employee: Vikram Sharma (EMP-104)</text>

          <!-- Component Table -->
          <g transform="translate(16, 54)">
            <rect width="288" height="24" rx="4" fill="#173360"/>
            <text x="8" y="16" fill="#93C5FD" font-size="10" font-family="system-ui">EARNINGS</text>
            <text x="120" y="16" fill="#93C5FD" font-size="10" font-family="system-ui">AMOUNT</text>
            <text x="175" y="16" fill="#93C5FD" font-size="10" font-family="system-ui">DEDUCTIONS</text>
            <text x="250" y="16" fill="#93C5FD" font-size="10" font-family="system-ui">AMOUNT</text>
          </g>
          <g transform="translate(16, 84)">
            <text x="8" y="14" fill="#FFFFFF" font-size="10" font-family="system-ui">Basic Salary</text>
            <text x="120" y="14" fill="#FFFFFF" font-size="10" font-weight="600" font-family="system-ui">₹45,000</text>
            <text x="175" y="14" fill="#FFFFFF" font-size="10" font-family="system-ui">Provident Fund (PF)</text>
            <text x="250" y="14" fill="#EF4444" font-size="10" font-weight="600" font-family="system-ui">-₹1,800</text>

            <text x="8" y="34" fill="#FFFFFF" font-size="10" font-family="system-ui">HRA Allowance</text>
            <text x="120" y="34" fill="#FFFFFF" font-size="10" font-weight="600" font-family="system-ui">₹22,500</text>
            <text x="175" y="34" fill="#FFFFFF" font-size="10" font-family="system-ui">Prof. Tax (PT)</text>
            <text x="250" y="34" fill="#EF4444" font-size="10" font-weight="600" font-family="system-ui">-₹200</text>

            <text x="8" y="54" fill="#FFFFFF" font-size="10" font-family="system-ui">Special Allow.</text>
            <text x="120" y="54" fill="#FFFFFF" font-size="10" font-weight="600" font-family="system-ui">₹17,500</text>
            <text x="175" y="54" fill="#FFFFFF" font-size="10" font-family="system-ui">TDS (Income Tax)</text>
            <text x="250" y="54" fill="#EF4444" font-size="10" font-weight="600" font-family="system-ui">-₹4,500</text>

            <line x1="0" y1="66" x2="288" y2="66" stroke="#254B8C" stroke-width="1"/>
            <text x="8" y="84" fill="#93C5FD" font-size="11" font-weight="bold" font-family="system-ui">Gross: ₹85,000</text>
            <text x="175" y="84" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">Net Pay: ₹78,500</text>
          </g>
          <rect x="16" y="196" width="288" height="30" rx="6" fill="#2563EB"/>
          <text x="160" y="215" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Disburse Net Salary & Generate Form 16</text>
        </g>

        <!-- Attendance & Leave Panel -->
        <g transform="translate(380, 74)">
          <rect width="220" height="114" rx="8" fill="#0A1830" stroke="#254B8C" stroke-width="1"/>
          <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">ATTENDANCE & SHIFTS</text>
          <text x="14" y="46" fill="#10B981" font-size="18" font-weight="bold" font-family="system-ui">96.8% Present</text>
          <text x="14" y="64" fill="#93C5FD" font-size="10" font-family="system-ui">Biometric Sync: 09:14 AM</text>
          <rect x="14" y="78" width="192" height="22" rx="4" fill="#173360"/>
          <text x="24" y="93" fill="#93C5FD" font-size="9" font-family="system-ui">Leave Bal: 14 PL · 6 SL · 2 CL</text>

          <rect y="126" width="220" height="114" rx="8" fill="#0A1830" stroke="#254B8C" stroke-width="1"/>
          <text x="14" y="148" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">STATUTORY COMPLIANCE</text>
          <g transform="translate(14, 160)">
            <text x="0" y="14" fill="#10B981" font-size="10" font-family="system-ui">✓ PF ECR Challan Ready</text>
            <text x="0" y="30" fill="#10B981" font-size="10" font-family="system-ui">✓ ESIC Contribution Synced</text>
            <text x="0" y="46" fill="#10B981" font-size="10" font-family="system-ui">✓ 24Q Quarterly TDS Computed</text>
          </g>
        </g>
      `
    },
    {
      slug: "meetingmind",
      name: "MeetingMind",
      theme: { bg: "#0D1117", cardBg: "#161B22", accent: "#6366F1", text: "#FFFFFF", muted: "#8B949E" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0D1117"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#161B22" stroke="#6366F1" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8B949E" font-size="12" font-family="system-ui, sans-serif" font-weight="600">MeetingMind · AI Meeting Transcription & Action Items</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#EF4444" fill-opacity="0.2"/>
        <circle cx="505" cy="49" r="4" fill="#EF4444"/>
        <text x="548" y="53" fill="#F87171" font-size="10" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Live Audio · 24:18</text>

        <!-- Left: Live Transcription View -->
        <g transform="translate(44, 74)">
          <rect width="310" height="240" rx="8" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="16" y="24" fill="#F0F6FC" font-size="11" font-weight="bold" font-family="system-ui">REAL-TIME SPEAKER TRANSCRIPTION</text>

          <!-- Speaker 1 -->
          <g transform="translate(16, 38)">
            <circle cx="12" cy="12" r="10" fill="#6366F1"/>
            <text x="12" y="16" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui">AR</text>
            <text x="30" y="12" fill="#58A6FF" font-size="10" font-weight="bold" font-family="system-ui">Alex Rivera (Product)</text>
            <text x="150" y="12" fill="#8B949E" font-size="9" font-family="system-ui">14:22</text>
            <text x="30" y="28" fill="#C9D1D9" font-size="10" font-family="system-ui">"Let's make sure the client compliance export is</text>
            <text x="30" y="42" fill="#C9D1D9" font-size="10" font-family="system-ui">ready before Monday's launch."</text>
          </g>

          <!-- Speaker 2 -->
          <g transform="translate(16, 96)">
            <circle cx="12" cy="12" r="10" fill="#10B981"/>
            <text x="12" y="16" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui">PS</text>
            <text x="30" y="12" fill="#3FB950" font-size="10" font-weight="bold" font-family="system-ui">Priya Sharma (Eng)</text>
            <text x="150" y="12" fill="#8B949E" font-size="9" font-family="system-ui">14:35</text>
            <text x="30" y="28" fill="#C9D1D9" font-size="10" font-family="system-ui">"Agreed. I will finalize the webhook retries</text>
            <text x="30" y="42" fill="#C9D1D9" font-size="10" font-family="system-ui">and send the test payload by tomorrow 3 PM."</text>
          </g>

          <!-- Audio Waveform -->
          <g transform="translate(16, 175)">
            <rect width="278" height="48" rx="6" fill="#161B22" stroke="#30363D" stroke-width="1"/>
            <text x="12" y="18" fill="#8B949E" font-size="9" font-family="system-ui">Audio Speech Diarization</text>
            <!-- bars -->
            <rect x="12" y="26" width="3" height="14" fill="#6366F1"/>
            <rect x="18" y="22" width="3" height="20" fill="#6366F1"/>
            <rect x="24" y="20" width="3" height="24" fill="#6366F1"/>
            <rect x="30" y="28" width="3" height="10" fill="#6366F1"/>
            <rect x="36" y="24" width="3" height="18" fill="#6366F1"/>
            <rect x="42" y="21" width="3" height="22" fill="#10B981"/>
            <rect x="48" y="25" width="3" height="16" fill="#10B981"/>
            <rect x="54" y="19" width="3" height="26" fill="#10B981"/>
            <rect x="60" y="27" width="3" height="12" fill="#10B981"/>
            <rect x="66" y="23" width="3" height="19" fill="#10B981"/>
            <text x="210" y="38" fill="#58A6FF" font-size="10" font-weight="bold" font-family="system-ui">99.4% Accurate</text>
          </g>
        </g>

        <!-- Right: AI Extracted Action Items -->
        <g transform="translate(370, 74)">
          <rect width="230" height="240" rx="8" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="14" y="24" fill="#F0F6FC" font-size="11" font-weight="bold" font-family="system-ui">AI DETECTED ACTION ITEMS</text>

          <g transform="translate(14, 38)">
            <rect width="202" height="54" rx="6" fill="#161B22" stroke="#6366F1" stroke-width="1"/>
            <text x="10" y="18" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Finalize webhook retries</text>
            <rect x="10" y="26" width="55" height="16" rx="4" fill="#10B981" fill-opacity="0.2"/>
            <text x="37" y="38" fill="#3FB950" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">@Priya</text>
            <text x="80" y="38" fill="#8B949E" font-size="9" font-family="system-ui">Due: Tomorrow 3 PM</text>
          </g>

          <g transform="translate(14, 102)">
            <rect width="202" height="54" rx="6" fill="#161B22" stroke="#30363D" stroke-width="1"/>
            <text x="10" y="18" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Compliance export review</text>
            <rect x="10" y="26" width="55" height="16" rx="4" fill="#6366F1" fill-opacity="0.2"/>
            <text x="37" y="38" fill="#818CF8" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">@Alex</text>
            <text x="80" y="38" fill="#8B949E" font-size="9" font-family="system-ui">Due: Monday 10 AM</text>
          </g>

          <g transform="translate(14, 168)">
            <rect width="202" height="58" rx="6" fill="#21262D"/>
            <text x="10" y="18" fill="#F0F6FC" font-size="10" font-weight="bold" font-family="system-ui">Meeting Summary</text>
            <text x="10" y="32" fill="#8B949E" font-size="9" font-family="system-ui">Key decision: Launch date locked for</text>
            <text x="10" y="46" fill="#8B949E" font-size="9" font-family="system-ui">next Tuesday. Summary sent to Slack.</text>
          </g>
        </g>
      `
    },
    {
      slug: "oda7",
      name: "ODA7",
      theme: { bg: "#180C14", cardBg: "#2B1423", accent: "#E11D48", text: "#FFFFFF", muted: "#FDA4AF" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#180C14"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#2B1423" stroke="#E11D48" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#FDA4AF" font-size="12" font-family="system-ui, sans-serif" font-weight="600">ODA7 · Sales Floor Command: Dialer, Queue & Commission</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">16 Calls Active</text>

        <!-- KPI Strip -->
        <g transform="translate(44, 72)">
          <rect width="170" height="54" rx="8" fill="#180C14" stroke="#4C1D38" stroke-width="1"/>
          <text x="16" y="22" fill="#FDA4AF" font-size="11" font-family="system-ui">Floor Dials Today</text>
          <text x="16" y="44" fill="#FFFFFF" font-size="18" font-weight="bold" font-family="system-ui">384 Calls</text>

          <rect x="185" width="170" height="54" rx="8" fill="#180C14" stroke="#4C1D38" stroke-width="1"/>
          <text x="201" y="22" fill="#FDA4AF" font-size="11" font-family="system-ui">Qualified Leads</text>
          <text x="201" y="44" fill="#F43F5E" font-size="18" font-weight="bold" font-family="system-ui">48 Deals</text>

          <rect x="370" width="170" height="54" rx="8" fill="#180C14" stroke="#4C1D38" stroke-width="1"/>
          <text x="386" y="22" fill="#FDA4AF" font-size="11" font-family="system-ui">Rep Commission Pool</text>
          <text x="386" y="44" fill="#10B981" font-size="18" font-weight="bold" font-family="system-ui">₹1,42,800</text>
        </g>

        <!-- Left: Live Dialer & Lead Queue -->
        <g transform="translate(44, 138)">
          <rect width="280" height="178" rx="8" fill="#180C14" stroke="#4C1D38" stroke-width="1"/>
          <text x="14" y="22" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">ACTIVE AUTO-DIALER QUEUE</text>
          
          <g transform="translate(14, 32)">
            <rect width="252" height="40" rx="6" fill="#3D182E" stroke="#E11D48" stroke-width="1"/>
            <circle cx="20" cy="20" r="10" fill="#E11D48"/>
            <text x="20" y="24" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">📞</text>
            <text x="40" y="16" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Rahul Kapoor · TechServe</text>
            <text x="40" y="30" fill="#FDA4AF" font-size="9" font-family="system-ui">In Call · 02:44 · Script: Objection #2</text>
          </g>

          <g transform="translate(14, 78)">
            <rect width="252" height="34" rx="6" fill="#25101E"/>
            <text x="12" y="14" fill="#FFFFFF" font-size="10" font-family="system-ui">Next: Ananya Sen (Enterprise CRM)</text>
            <text x="12" y="26" fill="#9CA3AF" font-size="9" font-family="system-ui">Lead Score: 94 · Auto-dial in 8s</text>
          </g>

          <g transform="translate(14, 118)">
            <rect width="252" height="34" rx="6" fill="#25101E"/>
            <text x="12" y="14" fill="#FFFFFF" font-size="10" font-family="system-ui">Next: Deepak Verma (Retail Chain)</text>
            <text x="12" y="26" fill="#9CA3AF" font-size="9" font-family="system-ui">Lead Score: 88 · Scheduled Callback</text>
          </g>
        </g>

        <!-- Right: Sales Rep Leaderboard -->
        <g transform="translate(340, 138)">
          <rect width="256" height="178" rx="8" fill="#180C14" stroke="#4C1D38" stroke-width="1"/>
          <text x="14" y="22" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">REP CONVERSION LEADERBOARD</text>
          
          <g transform="translate(14, 34)">
            <text x="0" y="14" fill="#F59E0B" font-size="11" font-weight="bold" font-family="system-ui">#1 Karan M.</text>
            <text x="100" y="14" fill="#FFFFFF" font-size="10" font-family="system-ui">52 Dials · 8 Closes</text>
            <text x="200" y="14" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">₹24,000</text>
          </g>
          <g transform="translate(14, 66)">
            <text x="0" y="14" fill="#D1D5DB" font-size="11" font-weight="bold" font-family="system-ui">#2 Sneha R.</text>
            <text x="100" y="14" fill="#FFFFFF" font-size="10" font-family="system-ui">48 Dials · 6 Closes</text>
            <text x="200" y="14" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">₹18,000</text>
          </g>
          <g transform="translate(14, 98)">
            <text x="0" y="14" fill="#D97706" font-size="11" font-weight="bold" font-family="system-ui">#3 Tarun S.</text>
            <text x="100" y="14" fill="#FFFFFF" font-size="10" font-family="system-ui">44 Dials · 5 Closes</text>
            <text x="200" y="14" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">₹15,000</text>
          </g>

          <rect x="14" y="128" width="228" height="34" rx="6" fill="#E11D48"/>
          <text x="128" y="150" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Payout Monthly Commissions</text>
        </g>
      `
    },
    {
      slug: "sibu",
      name: "Sibu",
      theme: { bg: "#09121E", cardBg: "#122036", accent: "#00D2FF", text: "#FFFFFF", muted: "#7DD3FC" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#09121E"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#122036" stroke="#00D2FF" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#7DD3FC" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Sibu · Digital Asset Management & Video Timeline Review</text>
        <rect x="475" y="38" width="125" height="22" rx="11" fill="#00D2FF" fill-opacity="0.2"/>
        <text x="537" y="53" fill="#00D2FF" font-size="10" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Drive & S3 Connected</text>

        <!-- Left: Video Player with Timeline Scrubber & Comments -->
        <g transform="translate(44, 74)">
          <rect width="320" height="240" rx="8" fill="#060C14" stroke="#1E385C" stroke-width="1"/>
          <!-- Video Screen Preview -->
          <rect x="12" y="12" width="296" height="140" rx="6" fill="#0F243E"/>
          <!-- Video Scene Visual -->
          <circle cx="160" cy="70" r="30" fill="#00D2FF" fill-opacity="0.3"/>
          <polygon points="152,58 174,70 152,82" fill="#00D2FF"/>
          <text x="24" y="32" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Keynote_Hero_Final_4K.mp4</text>
          <rect x="238" y="22" width="60" height="18" rx="4" fill="#000000" fill-opacity="0.6"/>
          <text x="268" y="35" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">APPROVED</text>

          <!-- Scrubber Bar -->
          <g transform="translate(12, 162)">
            <rect width="296" height="6" rx="3" fill="#1E385C"/>
            <rect width="180" height="6" rx="3" fill="#00D2FF"/>
            <!-- Marker Pin -->
            <circle cx="180" cy="3" r="5" fill="#00F0FF"/>
            <text x="0" y="22" fill="#7DD3FC" font-size="9" font-family="monospace">01:42.10</text>
            <text x="255" y="22" fill="#7DD3FC" font-size="9" font-family="monospace">04:15.00</text>
          </g>

          <!-- Pinned Timeline Comment -->
          <g transform="translate(12, 192)">
            <rect width="296" height="36" rx="6" fill="#132B4A" stroke="#00D2FF" stroke-width="1"/>
            <circle cx="22" cy="18" r="8" fill="#F59E0B"/>
            <text x="36" y="16" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Marcus Cole @ 01:42</text>
            <text x="36" y="28" fill="#93C5FD" font-size="9" font-family="system-ui">"Contrast looks perfect here. Ship it!"</text>
          </g>
        </g>

        <!-- Right: AI Tagging & Asset Metadata -->
        <g transform="translate(380, 74)">
          <rect width="220" height="240" rx="8" fill="#060C14" stroke="#1E385C" stroke-width="1"/>
          <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">AI SCENE & OCR TAGS</text>

          <g transform="translate(14, 38)">
            <rect width="88" height="22" rx="4" fill="#17355C"/>
            <text x="44" y="15" fill="#38BDF8" font-size="9" font-weight="600" font-family="system-ui" text-anchor="middle">#ProductLaunch</text>

            <rect x="96" width="60" height="22" rx="4" fill="#17355C"/>
            <text x="126" y="15" fill="#38BDF8" font-size="9" font-weight="600" font-family="system-ui" text-anchor="middle">#4K_UHD</text>
          </g>
          <g transform="translate(14, 66)">
            <rect width="70" height="22" rx="4" fill="#17355C"/>
            <text x="35" y="15" fill="#38BDF8" font-size="9" font-weight="600" font-family="system-ui" text-anchor="middle">#Keynote</text>

            <rect x="78" width="85" height="22" rx="4" fill="#17355C"/>
            <text x="120" y="15" fill="#38BDF8" font-size="9" font-weight="600" font-family="system-ui" text-anchor="middle">#MotionGraphic</text>
          </g>

          <text x="14" y="114" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">EXTRACTED ON-SCREEN TEXT</text>
          <g transform="translate(14, 126)">
            <rect width="192" height="38" rx="6" fill="#102540"/>
            <text x="10" y="16" fill="#E2E8F0" font-size="9" font-family="system-ui">"ToyoApps Cloud Engine 2026"</text>
            <text x="10" y="30" fill="#7DD3FC" font-size="8" font-family="system-ui">Indexed for semantic search</text>
          </g>

          <text x="14" y="186" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">INTEGRATED STORAGE</text>
          <g transform="translate(14, 198)">
            <rect width="192" height="28" rx="6" fill="#102540"/>
            <text x="10" y="18" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui">● Google Drive & AWS S3 Synced</text>
          </g>
        </g>
      `
    },
    {
      slug: "sigchanger",
      name: "SigChanger",
      theme: { bg: "#0B1728", cardBg: "#15263F", accent: "#1A73E8", text: "#FFFFFF", muted: "#94A3B8" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0B1728"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#15263F" stroke="#1A73E8" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#94A3B8" font-size="12" font-family="system-ui, sans-serif" font-weight="600">SigChanger · Centralized Google Workspace Gmail Signatures</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">185 Mailboxes Synced</text>

        <!-- Left: Gmail Compose Window with Branded Signature -->
        <g transform="translate(44, 74)">
          <rect width="330" height="240" rx="8" fill="#0B1321" stroke="#253E66" stroke-width="1"/>
          <!-- Compose Header -->
          <rect width="330" height="30" rx="8" fill="#192F4F"/>
          <text x="14" y="20" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">New Message · Gmail</text>
          
          <g transform="translate(14, 40)">
            <text x="0" y="14" fill="#94A3B8" font-size="10" font-family="system-ui">To: partners@acmeenterprise.com</text>
            <line x1="0" y1="20" x2="302" y2="20" stroke="#1F3A63" stroke-width="1"/>
            <text x="0" y="36" fill="#94A3B8" font-size="10" font-family="system-ui">Subject: Partnership Agreement & Q4 Strategy</text>
            <line x1="0" y1="42" x2="302" y2="42" stroke="#1F3A63" stroke-width="1"/>
          </g>

          <!-- Email Body -->
          <g transform="translate(14, 95)">
            <text x="0" y="14" fill="#E2E8F0" font-size="10" font-family="system-ui">Hi Team, attaching the confirmed release notes below.</text>
          </g>

          <!-- Deployed Corporate Signature -->
          <g transform="translate(14, 126)">
            <rect width="302" height="96" rx="6" fill="#132742" stroke="#1A73E8" stroke-width="1"/>
            <rect x="12" y="14" width="40" height="40" rx="20" fill="#1A73E8"/>
            <text x="32" y="38" fill="#FFFFFF" font-size="14" font-weight="bold" font-family="system-ui" text-anchor="middle">DM</text>
            <text x="62" y="26" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">David Miller</text>
            <text x="62" y="40" fill="#60A5FA" font-size="10" font-family="system-ui">VP Engineering · ToyoApps Group</text>
            <text x="62" y="54" fill="#94A3B8" font-size="9" font-family="system-ui">david.m@toyoapps.com · +1 (555) 492-0192</text>
            <!-- Banner inside signature -->
            <rect x="12" y="66" width="278" height="20" rx="4" fill="#1E40AF"/>
            <text x="151" y="80" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">🚀 ToyoApps 2026 Summit · Register Now</text>
          </g>
        </g>

        <!-- Right: Admin Workspace Controls -->
        <g transform="translate(390, 74)">
          <rect width="210" height="240" rx="8" fill="#0B1321" stroke="#253E66" stroke-width="1"/>
          <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">WORKSPACE DIRECTORY</text>

          <g transform="translate(14, 38)">
            <rect width="182" height="32" rx="4" fill="#15263F"/>
            <text x="10" y="20" fill="#FFFFFF" font-size="10" font-family="system-ui">Engineering (48 users)</text>
          </g>
          <g transform="translate(14, 76)">
            <rect width="182" height="32" rx="4" fill="#15263F"/>
            <text x="10" y="20" fill="#FFFFFF" font-size="10" font-family="system-ui">Sales & BizDev (62 users)</text>
          </g>
          <g transform="translate(14, 114)">
            <rect width="182" height="32" rx="4" fill="#15263F"/>
            <text x="10" y="20" fill="#FFFFFF" font-size="10" font-family="system-ui">Customer Support (75 users)</text>
          </g>

          <g transform="translate(14, 160)">
            <rect width="182" height="60" rx="6" fill="#1E3A8A"/>
            <text x="10" y="22" fill="#93C5FD" font-size="10" font-family="system-ui">Google API Status</text>
            <text x="10" y="38" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Zero-click Server-Side Sync</text>
            <text x="10" y="52" fill="#10B981" font-size="9" font-family="system-ui">✓ No browser extension required</text>
          </g>
        </g>
      `
    },
    {
      slug: "sizoru",
      name: "Sizoru",
      theme: { bg: "#061A14", cardBg: "#0D2E24", accent: "#10B981", text: "#FFFFFF", muted: "#6EE7B7" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#061A14"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#0D2E24" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#6EE7B7" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Sizoru · TAM / SAM / SOM Market Sizing & Cited Research</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Tier-1 Sources</text>

        <!-- Left: TAM / SAM / SOM Pyramid / Rings -->
        <g transform="translate(44, 74)">
          <rect width="280" height="240" rx="8" fill="#04120E" stroke="#1A4D3D" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">MARKET SIZING PYRAMID</text>

          <!-- Concentric or tiered bars -->
          <g transform="translate(16, 42)">
            <!-- TAM -->
            <rect width="248" height="50" rx="6" fill="#09382B" stroke="#10B981" stroke-width="1"/>
            <text x="14" y="22" fill="#6EE7B7" font-size="10" font-weight="bold" font-family="system-ui">TAM · Total Addressable Market</text>
            <text x="14" y="40" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">$18.4 Billion</text>
            <text x="175" y="40" fill="#6EE7B7" font-size="10" font-family="system-ui">CAGR 14.8%</text>

            <!-- SAM -->
            <rect y="58" width="248" height="50" rx="6" fill="#0E4A39" stroke="#34D399" stroke-width="1"/>
            <text x="14" y="78" fill="#A7F3D0" font-size="10" font-weight="bold" font-family="system-ui">SAM · Serviceable Available Market</text>
            <text x="14" y="98" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">$4.2 Billion</text>
            <text x="175" y="98" fill="#A7F3D0" font-size="10" font-family="system-ui">SaaS Mid-Market</text>

            <!-- SOM -->
            <rect y="116" width="248" height="50" rx="6" fill="#059669"/>
            <text x="14" y="136" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">SOM · Serviceable Obtainable Market</text>
            <text x="14" y="156" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">$520 Million</text>
            <text x="175" y="156" fill="#E6FFFA" font-size="10" font-weight="bold" font-family="system-ui">3-Yr Target</text>
          </g>
        </g>

        <!-- Right: Top-Down vs Bottom-Up Validation & Citations -->
        <g transform="translate(340, 74)">
          <rect width="260" height="240" rx="8" fill="#04120E" stroke="#1A4D3D" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">TOP-DOWN VS BOTTOM-UP</text>

          <g transform="translate(16, 40)">
            <rect width="228" height="34" rx="4" fill="#0D2E24"/>
            <text x="10" y="16" fill="#6EE7B7" font-size="10" font-family="system-ui">Top-down (Industry Analysis)</text>
            <text x="10" y="28" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">$18.4B estimate (Gartner, Statista)</text>
          </g>

          <g transform="translate(16, 82)">
            <rect width="228" height="34" rx="4" fill="#0D2E24"/>
            <text x="10" y="16" fill="#6EE7B7" font-size="10" font-family="system-ui">Bottom-up (ARPU × Qualified ICP)</text>
            <text x="10" y="28" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">$17.8B estimate (Variance: 3.2%)</text>
          </g>

          <text x="16" y="142" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">TIER-1 SOURCE CITATIONS</text>
          <g transform="translate(16, 154)">
            <rect width="228" height="66" rx="6" fill="#064E3B"/>
            <text x="10" y="18" fill="#A7F3D0" font-size="9" font-family="system-ui">✓ Gartner Magic Quadrant 2026</text>
            <text x="10" y="34" fill="#A7F3D0" font-size="9" font-family="system-ui">✓ World Bank Enterprise Survey</text>
            <text x="10" y="50" fill="#A7F3D0" font-size="9" font-family="system-ui">✓ IDC Global SaaS Spending Forecast</text>
          </g>
        </g>
      `
    },
    {
      slug: "taskmagic",
      name: "TaskMagic",
      theme: { bg: "#130826", cardBg: "#210F3F", accent: "#9333EA", text: "#FFFFFF", muted: "#D8B4FE" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#130826"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#210F3F" stroke="#9333EA" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#D8B4FE" font-size="12" font-family="system-ui, sans-serif" font-weight="600">TaskMagic · Browser Automation & Visual Web Scraper</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Flow Completed</text>

        <!-- Visual Flow Graph -->
        <g transform="translate(44, 74)">
          <rect width="320" height="240" rx="8" fill="#0C051A" stroke="#371A66" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">AUTOMATION WORKFLOW RUNNER</text>

          <!-- Step 1 -->
          <g transform="translate(16, 38)">
            <rect width="288" height="38" rx="6" fill="#2E1256" stroke="#9333EA" stroke-width="1"/>
            <circle cx="20" cy="19" r="10" fill="#9333EA"/>
            <text x="20" y="23" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui">1</text>
            <text x="40" y="17" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Navigate to Web Directory</text>
            <text x="40" y="30" fill="#D8B4FE" font-size="9" font-family="system-ui">URL: https://app.marketplace.com/leads</text>
          </g>
          <!-- Connector -->
          <line x1="160" y1="76" x2="160" y2="88" stroke="#9333EA" stroke-width="2"/>

          <!-- Step 2 -->
          <g transform="translate(16, 88)">
            <rect width="288" height="38" rx="6" fill="#2E1256" stroke="#9333EA" stroke-width="1"/>
            <circle cx="20" cy="19" r="10" fill="#9333EA"/>
            <text x="20" y="23" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui">2</text>
            <text x="40" y="17" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Scrape Structured Table Data</text>
            <text x="40" y="30" fill="#D8B4FE" font-size="9" font-family="system-ui">Extract: Company, Contact, Phone, Revenue</text>
          </g>
          <!-- Connector -->
          <line x1="160" y1="126" x2="160" y2="138" stroke="#9333EA" stroke-width="2"/>

          <!-- Step 3 -->
          <g transform="translate(16, 138)">
            <rect width="288" height="38" rx="6" fill="#2E1256" stroke="#9333EA" stroke-width="1"/>
            <circle cx="20" cy="19" r="10" fill="#10B981"/>
            <text x="20" y="23" fill="#FFFFFF" font-size="9" font-weight="bold" text-anchor="middle" font-family="system-ui">3</text>
            <text x="40" y="17" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Webhook & Google Sheets Export</text>
            <text x="40" y="30" fill="#10B981" font-size="9" font-family="system-ui">Status: 120 Rows synced successfully</text>
          </g>

          <g transform="translate(16, 188)">
            <rect width="288" height="36" rx="6" fill="#16082C"/>
            <text x="12" y="16" fill="#A855F7" font-size="9" font-family="monospace">Execution Time: 3.8s</text>
            <text x="12" y="28" fill="#10B981" font-size="9" font-family="monospace">Captcha Solved: Bypass Engine Active</text>
          </g>
        </g>

        <!-- Right: Execution Log -->
        <g transform="translate(380, 74)">
          <rect width="220" height="240" rx="8" fill="#0C051A" stroke="#371A66" stroke-width="1"/>
          <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">LIVE AUTOMATION LOGS</text>

          <g transform="translate(14, 38)">
            <text x="0" y="14" fill="#10B981" font-size="9" font-family="monospace">[00:01] Browser init chrome-headless</text>
            <text x="0" y="32" fill="#10B981" font-size="9" font-family="monospace">[00:02] Page DOM loaded (200 OK)</text>
            <text x="0" y="50" fill="#10B981" font-size="9" font-family="monospace">[00:03] Scraped 120 elements</text>
            <text x="0" y="68" fill="#10B981" font-size="9" font-family="monospace">[00:03] Webhook POST status 200</text>
            <text x="0" y="86" fill="#38BDF8" font-size="9" font-family="monospace">[00:04] Task completed gracefully</text>
          </g>

          <g transform="translate(14, 142)">
            <rect width="192" height="84" rx="6" fill="#1F0D3D"/>
            <text x="12" y="22" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Trigger Schedule</text>
            <text x="12" y="38" fill="#D8B4FE" font-size="9" font-family="system-ui">Every weekday at 08:00 AM</text>
            <rect x="12" y="48" width="168" height="24" rx="4" fill="#9333EA"/>
            <text x="96" y="64" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">Record New Action</text>
          </g>
        </g>
      `
    },
    {
      slug: "tracksuit",
      name: "Tracksuit",
      theme: { bg: "#1C0D12", cardBg: "#2E151F", accent: "#F43F5E", text: "#FFFFFF", muted: "#FDA4AF" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#1C0D12"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#2E151F" stroke="#F43F5E" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#FDA4AF" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Tracksuit · Real-Time Brand Awareness & Competitor Tracking</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#F43F5E" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#F43F5E" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">+14% YoY Growth</text>

        <!-- Left: Funnel (Awareness -> Consideration -> Preference) -->
        <g transform="translate(44, 74)">
          <rect width="280" height="240" rx="8" fill="#14080D" stroke="#4A1E2E" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">BRAND HEALTH FUNNEL</text>

          <g transform="translate(16, 42)">
            <rect width="248" height="48" rx="6" fill="#3D1828"/>
            <text x="12" y="20" fill="#FDA4AF" font-size="10" font-family="system-ui">Brand Awareness</text>
            <text x="12" y="38" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">64.2%</text>
            <rect x="130" y="24" width="105" height="8" rx="4" fill="#F43F5E"/>
          </g>

          <g transform="translate(16, 98)">
            <rect width="248" height="48" rx="6" fill="#3D1828"/>
            <text x="12" y="20" fill="#FDA4AF" font-size="10" font-family="system-ui">Consideration</text>
            <text x="12" y="38" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">41.8%</text>
            <rect x="130" y="24" width="70" height="8" rx="4" fill="#FB7185"/>
          </g>

          <g transform="translate(16, 154)">
            <rect width="248" height="48" rx="6" fill="#3D1828"/>
            <text x="12" y="20" fill="#FDA4AF" font-size="10" font-family="system-ui">Preference (Top Choice)</text>
            <text x="12" y="38" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">24.5%</text>
            <rect x="130" y="24" width="40" height="8" rx="4" fill="#FDA4AF"/>
          </g>
        </g>

        <!-- Right: Competitor Benchmark Graph -->
        <g transform="translate(340, 74)">
          <rect width="260" height="240" rx="8" fill="#14080D" stroke="#4A1E2E" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">COMPETITOR BENCHMARK</text>

          <!-- Trend line simulation -->
          <g transform="translate(16, 44)">
            <line x1="0" y1="110" x2="228" y2="110" stroke="#3D1828" stroke-width="1"/>
            <line x1="0" y1="60" x2="228" y2="60" stroke="#3D1828" stroke-width="1"/>
            <line x1="0" y1="10" x2="228" y2="10" stroke="#3D1828" stroke-width="1"/>
            
            <!-- Our Brand line -->
            <path d="M 0 90 Q 60 70 120 40 T 228 15" fill="none" stroke="#F43F5E" stroke-width="3"/>
            <!-- Competitor line -->
            <path d="M 0 50 Q 60 55 120 60 T 228 65" fill="none" stroke="#6B7280" stroke-width="2" stroke-dasharray="4 2"/>

            <text x="0" y="125" fill="#9CA3AF" font-size="9" font-family="system-ui">Q1</text>
            <text x="70" y="125" fill="#9CA3AF" font-size="9" font-family="system-ui">Q2</text>
            <text x="140" y="125" fill="#9CA3AF" font-size="9" font-family="system-ui">Q3</text>
            <text x="210" y="125" fill="#9CA3AF" font-size="9" font-family="system-ui">Q4</text>
          </g>

          <g transform="translate(16, 182)">
            <rect width="228" height="42" rx="4" fill="#2E151F"/>
            <circle cx="14" cy="21" r="5" fill="#F43F5E"/>
            <text x="26" y="24" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Our Brand: 64% (+14 pts)</text>
            <circle cx="160" cy="21" r="5" fill="#6B7280"/>
            <text x="172" y="24" fill="#9CA3AF" font-size="10" font-family="system-ui">Comp A: 52%</text>
          </g>
        </g>
      `
    },
    {
      slug: "trackysuite",
      name: "TrackySuite",
      theme: { bg: "#06181C", cardBg: "#0C2E35", accent: "#0D9488", text: "#FFFFFF", muted: "#5EEAD4" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#06181C"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#0C2E35" stroke="#0D9488" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#5EEAD4" font-size="12" font-family="system-ui, sans-serif" font-weight="600">TrackySuite · CA, CS & Tax Practice Compliance Calendar</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#0D9488" fill-opacity="0.25"/>
        <text x="545" y="53" fill="#5EEAD4" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">October Cycle</text>

        <!-- Left: Statutory Deadlines Calendar -->
        <g transform="translate(44, 74)">
          <rect width="280" height="240" rx="8" fill="#041215" stroke="#164E59" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">STATUTORY CLIENT DEADLINES</text>

          <g transform="translate(16, 38)">
            <rect width="248" height="42" rx="6" fill="#113F49"/>
            <text x="10" y="16" fill="#5EEAD4" font-size="10" font-weight="bold" font-family="system-ui">GSTR-3B Monthly Return</text>
            <text x="10" y="30" fill="#EF4444" font-size="10" font-weight="bold" font-family="system-ui">Due 20th Oct · 14 Clients Pending</text>
          </g>

          <g transform="translate(16, 88)">
            <rect width="248" height="42" rx="6" fill="#113F49"/>
            <text x="10" y="16" fill="#5EEAD4" font-size="10" font-weight="bold" font-family="system-ui">TDS 26Q Q2 Quarterly</text>
            <text x="10" y="30" fill="#F59E0B" font-size="10" font-weight="bold" font-family="system-ui">Due 31st Oct · 28 Clients Done</text>
          </g>

          <g transform="translate(16, 138)">
            <rect width="248" height="42" rx="6" fill="#113F49"/>
            <text x="10" y="16" fill="#5EEAD4" font-size="10" font-weight="bold" font-family="system-ui">ROC / MCA AOC-4 Annual Filing</text>
            <text x="10" y="30" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Due 30th Nov · 42 Clients In Queue</text>
          </g>

          <rect x="16" y="190" width="248" height="34" rx="6" fill="#0D9488"/>
          <text x="140" y="211" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui" text-anchor="middle">Notify Clients via WhatsApp & Portal</text>
        </g>

        <!-- Right: 3-Stage Workflow (Prepare -> Review -> File) -->
        <g transform="translate(340, 74)">
          <rect width="260" height="240" rx="8" fill="#041215" stroke="#164E59" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">PREPARE - REVIEW - FILE PIPELINE</text>

          <g transform="translate(16, 40)">
            <rect width="228" height="46" rx="6" fill="#113F49"/>
            <text x="12" y="18" fill="#E2E8F0" font-size="10" font-family="system-ui">Stage 1: Preparation (Articles)</text>
            <text x="12" y="34" fill="#5EEAD4" font-size="12" font-weight="bold" font-family="system-ui">12 Filings in progress</text>
          </g>

          <g transform="translate(16, 94)">
            <rect width="228" height="46" rx="6" fill="#113F49"/>
            <text x="12" y="18" fill="#E2E8F0" font-size="10" font-family="system-ui">Stage 2: Partner Review (CA / CS)</text>
            <text x="12" y="34" fill="#F59E0B" font-size="12" font-weight="bold" font-family="system-ui">4 Pending Partner Sign-off</text>
          </g>

          <g transform="translate(16, 148)">
            <rect width="228" height="46" rx="6" fill="#113F49"/>
            <text x="12" y="18" fill="#E2E8F0" font-size="10" font-family="system-ui">Stage 3: Filed & Acknowledged</text>
            <text x="12" y="34" fill="#10B981" font-size="12" font-weight="bold" font-family="system-ui">86 ARN Receipts Generated</text>
          </g>
        </g>
      `
    },
    {
      slug: "zapbuzzer",
      name: "ZapBuzzer",
      theme: { bg: "#1F1206", cardBg: "#351F0B", accent: "#EA580C", text: "#FFFFFF", muted: "#FDBA74" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#1F1206"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#351F0B" stroke="#EA580C" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#FDBA74" font-size="12" font-family="system-ui, sans-serif" font-weight="600">ZapBuzzer · Workplace Service Request Buzzer & SLA Escalation</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#EA580C" fill-opacity="0.25"/>
        <text x="545" y="53" fill="#FDBA74" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">SLA Active</text>

        <!-- Left: Urgent Request Card with Countdown Timer -->
        <g transform="translate(44, 74)">
          <rect width="290" height="240" rx="8" fill="#140A03" stroke="#542C0F" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">ACTIVE WORKPLACE REQUEST</text>

          <g transform="translate(16, 38)">
            <rect width="258" height="64" rx="6" fill="#431E09" stroke="#EA580C" stroke-width="1"/>
            <text x="12" y="20" fill="#FFA366" font-size="10" font-weight="bold" font-family="system-ui">#1084 · Pantry & Facilities Service</text>
            <text x="12" y="36" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Coffee Machine Restock · 4th Floor</text>
            <text x="12" y="50" fill="#FED7AA" font-size="9" font-family="system-ui">Requested by: Marketing Team Hub</text>
          </g>

          <!-- SLA Countdown Gauge -->
          <g transform="translate(16, 114)">
            <rect width="258" height="54" rx="6" fill="#291307"/>
            <text x="12" y="22" fill="#FDBA74" font-size="10" font-family="system-ui">SLA Countdown Timer</text>
            <text x="12" y="44" fill="#10B981" font-size="20" font-weight="bold" font-family="system-ui">03:42 mins</text>
            <text x="150" y="44" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">● Within SLA (5m max)</text>
          </g>

          <!-- Assigned Owner -->
          <g transform="translate(16, 178)">
            <rect width="258" height="46" rx="6" fill="#291307"/>
            <text x="12" y="18" fill="#9CA3AF" font-size="9" font-family="system-ui">ACCEPTED BY</text>
            <text x="12" y="34" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">Amit Kumar (Facilities Lead)</text>
            <text x="180" y="34" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Accepted 1m ago</text>
          </g>
        </g>

        <!-- Right: Escalation Chain & Alert Broadcast -->
        <g transform="translate(350, 74)">
          <rect width="250" height="240" rx="8" fill="#140A03" stroke="#542C0F" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">ESCALATION SLA CHAIN</text>

          <g transform="translate(16, 40)">
            <rect width="218" height="32" rx="4" fill="#291307"/>
            <text x="10" y="20" fill="#10B981" font-size="10" font-family="system-ui">Level 1: Floor Staff (0 - 5 mins) ✓</text>
          </g>
          <g transform="translate(16, 80)">
            <rect width="218" height="32" rx="4" fill="#291307"/>
            <text x="10" y="20" fill="#F59E0B" font-size="10" font-family="system-ui">Level 2: Team Lead (5 - 10 mins)</text>
          </g>
          <g transform="translate(16, 120)">
            <rect width="218" height="32" rx="4" fill="#291307"/>
            <text x="10" y="20" fill="#EF4444" font-size="10" font-family="system-ui">Level 3: Facilities Admin (10m+)</text>
          </g>

          <!-- Alerts broadcast box -->
          <g transform="translate(16, 164)">
            <rect width="218" height="60" rx="6" fill="#431E09"/>
            <text x="10" y="20" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Multi-Channel Alerts Sent</text>
            <text x="10" y="36" fill="#FDBA74" font-size="9" font-family="system-ui">💬 Telegram Channel · 📱 App Notification</text>
            <text x="10" y="50" fill="#FDBA74" font-size="9" font-family="system-ui">✉ Facilities Team Group Email</text>
          </g>
        </g>
      `
    },
    {
      slug: "zorfly",
      name: "Zorfly",
      theme: { bg: "#0D1326", cardBg: "#172347", accent: "#3B82F6", text: "#FFFFFF", muted: "#93C5FD" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0D1326"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#172347" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#93C5FD" font-size="12" font-family="system-ui, sans-serif" font-weight="600">Zorfly · 5-Minute Daily Workplace Communication Missions</text>
        <rect x="490" y="38" width="110" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="545" y="53" fill="#10B981" font-size="11" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Day 14 Streak 🔥</text>

        <!-- Left: Daily Mission Card -->
        <g transform="translate(44, 74)">
          <rect width="300" height="240" rx="8" fill="#080D1D" stroke="#233568" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">DAILY 5-MINUTE MISSION</text>

          <g transform="translate(16, 38)">
            <rect width="268" height="50" rx="6" fill="#1E2F5E" stroke="#3B82F6" stroke-width="1"/>
            <text x="12" y="20" fill="#93C5FD" font-size="10" font-family="system-ui">Scenario: Delivering a Tough Project Update</text>
            <text x="12" y="38" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">"Be Direct, Propose Solution First"</text>
          </g>

          <!-- Audio Waveform / Speech Input -->
          <g transform="translate(16, 98)">
            <rect width="268" height="48" rx="6" fill="#101933"/>
            <text x="12" y="18" fill="#93C5FD" font-size="9" font-family="system-ui">Speech Analysis Waveform</text>
            <!-- bars -->
            <rect x="12" y="26" width="3" height="12" fill="#3B82F6"/>
            <rect x="18" y="22" width="3" height="18" fill="#3B82F6"/>
            <rect x="24" y="20" width="3" height="22" fill="#3B82F6"/>
            <rect x="30" y="25" width="3" height="14" fill="#3B82F6"/>
            <rect x="36" y="21" width="3" height="20" fill="#10B981"/>
            <rect x="42" y="18" width="3" height="24" fill="#10B981"/>
            <rect x="48" y="24" width="3" height="16" fill="#10B981"/>
            <text x="170" y="38" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">Clarity: 94%</text>
          </g>

          <!-- AI Grammar & Tone Feedback -->
          <g transform="translate(16, 156)">
            <rect width="268" height="66" rx="6" fill="#101933" stroke="#10B981" stroke-width="1"/>
            <text x="12" y="18" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">AI Feedback</text>
            <text x="12" y="34" fill="#E2E8F0" font-size="9" font-family="system-ui">Replaced passive phrasing with active ownership:</text>
            <text x="12" y="48" fill="#6EE7B7" font-size="9" font-family="system-ui">"The target was missed" ➔ "We rescheduled to Q4"</text>
          </g>
        </g>

        <!-- Right: Team Skill Progress Tracker -->
        <g transform="translate(360, 74)">
          <rect width="240" height="240" rx="8" fill="#080D1D" stroke="#233568" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">TEAM COMMUNICATION SCORE</text>

          <g transform="translate(16, 44)">
            <text x="0" y="14" fill="#93C5FD" font-size="10" font-family="system-ui">Clarity & Brevity</text>
            <rect x="0" y="22" width="208" height="8" rx="4" fill="#101933"/>
            <rect x="0" y="22" width="180" height="8" rx="4" fill="#3B82F6"/>
            <text x="185" y="14" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">88%</text>

            <text x="0" y="50" fill="#93C5FD" font-size="10" font-family="system-ui">Executive Tone</text>
            <rect x="0" y="58" width="208" height="8" rx="4" fill="#101933"/>
            <rect x="0" y="58" width="160" height="8" rx="4" fill="#10B981"/>
            <text x="185" y="50" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">82%</text>

            <text x="0" y="86" fill="#93C5FD" font-size="10" font-family="system-ui">Active Listening</text>
            <rect x="0" y="94" width="208" height="8" rx="4" fill="#101933"/>
            <rect x="0" y="94" width="195" height="8" rx="4" fill="#F59E0B"/>
            <text x="185" y="86" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">94%</text>
          </g>

          <g transform="translate(16, 166)">
            <rect width="208" height="56" rx="6" fill="#1E2F5E"/>
            <text x="12" y="22" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">Manager Skill Digest</text>
            <text x="12" y="38" fill="#93C5FD" font-size="9" font-family="system-ui">Engineering team completed</text>
            <text x="12" y="50" fill="#93C5FD" font-size="9" font-family="system-ui">142 missions this week.</text>
          </g>
        </g>
      `
    },
    {
      slug: "zuzu",
      name: "ZUZU",
      theme: { bg: "#0D1117", cardBg: "#161B22", accent: "#2563EB", text: "#FFFFFF", muted: "#8B949E" },
      render: () => `
        <rect width="640" height="360" rx="16" fill="#0D1117"/>
        <rect x="24" y="24" width="592" height="312" rx="12" fill="#161B22" stroke="#2563EB" stroke-width="1.5" stroke-opacity="0.3"/>
        <circle cx="48" cy="48" r="5" fill="#EF4444"/>
        <circle cx="64" cy="48" r="5" fill="#F59E0B"/>
        <circle cx="80" cy="48" r="5" fill="#10B981"/>
        <text x="105" y="52" fill="#8B949E" font-size="12" font-family="system-ui, sans-serif" font-weight="600">ZUZU · Windows Workday Insight with On-Device Privacy Redaction</text>
        <rect x="480" y="38" width="120" height="22" rx="11" fill="#10B981" fill-opacity="0.2"/>
        <text x="540" y="53" fill="#10B981" font-size="10" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle">Privacy Redaction ON</text>

        <!-- Left: Workday Activity Timeline -->
        <g transform="translate(44, 74)">
          <rect width="320" height="240" rx="8" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="16" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">WINDOWS AGENT ACTIVITY TIMELINE</text>

          <g transform="translate(16, 38)">
            <rect width="288" height="50" rx="6" fill="#1F2937"/>
            <text x="12" y="20" fill="#9CA3AF" font-size="9" font-family="system-ui">TODAY'S WORKDAY TOTALS</text>
            <text x="12" y="38" fill="#10B981" font-size="14" font-weight="bold" font-family="system-ui">7h 15m Active</text>
            <text x="125" y="38" fill="#F59E0B" font-size="14" font-weight="bold" font-family="system-ui">45m Idle</text>
            <text x="205" y="38" fill="#3B82F6" font-size="14" font-weight="bold" font-family="system-ui">1h 10m Calls</text>
          </g>

          <!-- Application breakdown bar -->
          <g transform="translate(16, 100)">
            <text x="0" y="14" fill="#9CA3AF" font-size="10" font-family="system-ui">App Usage: VS Code (45%), Figma (25%), Jira (15%), Slack (15%)</text>
            <rect y="22" width="288" height="10" rx="5" fill="#374151"/>
            <rect y="22" width="130" height="10" rx="5" fill="#2563EB"/>
            <rect x="132" y="22" width="72" height="10" rx="0" fill="#9333EA"/>
            <rect x="206" y="22" width="42" height="10" rx="0" fill="#0D9488"/>
            <rect x="250" y="22" width="38" height="10" rx="5" fill="#F59E0B"/>
          </g>

          <!-- On-device privacy badge -->
          <g transform="translate(16, 154)">
            <rect width="288" height="66" rx="6" fill="#111827" stroke="#10B981" stroke-width="1"/>
            <text x="12" y="20" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">🛡 On-Device Privacy Masking</text>
            <text x="12" y="36" fill="#D1D5DB" font-size="9" font-family="system-ui">Passwords, banking & private windows painted out on the</text>
            <text x="12" y="50" fill="#D1D5DB" font-size="9" font-family="system-ui">device before screenshots or logs leave the employee PC.</text>
          </g>
        </g>

        <!-- Right: AI-Generated Manager Daily Digest -->
        <g transform="translate(380, 74)">
          <rect width="220" height="240" rx="8" fill="#0D1117" stroke="#30363D" stroke-width="1"/>
          <text x="14" y="24" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">AI MANAGER DAILY DIGEST</text>

          <g transform="translate(14, 38)">
            <rect width="192" height="110" rx="6" fill="#1F2937"/>
            <text x="10" y="18" fill="#60A5FA" font-size="10" font-weight="bold" font-family="system-ui">Summary for Sarah Jenkins</text>
            <text x="10" y="34" fill="#E5E7EB" font-size="9" font-family="system-ui">"Deep work block observed</text>
            <text x="10" y="48" fill="#E5E7EB" font-size="9" font-family="system-ui">between 10 AM - 1 PM on API</text>
            <text x="10" y="62" fill="#E5E7EB" font-size="9" font-family="system-ui">refactor in VS Code.</text>
            <text x="10" y="80" fill="#10B981" font-size="9" font-family="system-ui">Focus index: 92% (High flow)"</text>
          </g>

          <g transform="translate(14, 160)">
            <rect width="192" height="64" rx="6" fill="#111827"/>
            <text x="10" y="18" fill="#9CA3AF" font-size="9" font-family="system-ui">DATA RETENTION POLICY</text>
            <text x="10" y="34" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="system-ui">90 Days Retention Set</text>
            <text x="10" y="50" fill="#9CA3AF" font-size="9" font-family="system-ui">Admin ZIP export available</text>
          </g>
        </g>
      `
    }
  ];

  let generated = 0;
  for (const p of products) {
    const dir = path.join("public", "images", "products", p.slug);
    ensureDir(dir);
    const filePath = path.join(dir, "card.svg");
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="none">
  <defs>
    <filter id="shadow" x="0" y="0" width="640" height="360" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>
  ${p.render()}
</svg>
`;
    fs.writeFileSync(filePath, content, "utf8");
    generated++;
    console.log(`Generated: ${filePath}`);
  }
  console.log(`Product cards generated: ${generated}/16`);
}
