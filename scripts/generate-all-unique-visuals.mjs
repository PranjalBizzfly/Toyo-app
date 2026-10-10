import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const productsMeta = [
  {
    slug: 'cardizo',
    name: 'Cardizo',
    tagline: 'AI Business Card Scanner & Instant Contact Follow-up',
    theme: { bg: '#0A1128', nav: '#1C2541', accent: '#3A86FF', accentLight: '#60A5FA', border: '#2A3B66', tag: '#10B981' },
    tourHeadline: 'Cardizo AI Optical Character Recognition & Live Contact CRM',
    spotlights: [
      { title: 'Multi-Language Business Card Scanner', sub: 'Instant OCR with 99.8% field extraction accuracy' },
      { title: 'Automated CRM Sync & vCard Export', sub: 'Push verified leads straight to Google Contacts and HubSpot' },
      { title: 'Follow-Up Template Dispatcher', sub: 'One-click personalized WhatsApp and Email follow-ups' }
    ]
  },
  {
    slug: 'benj',
    name: 'Benj',
    tagline: 'AI Go-To-Market Strategy & Channel Allocation',
    theme: { bg: '#062016', nav: '#0C3827', accent: '#10B981', accentLight: '#34D399', border: '#1B5E43', tag: '#F59E0B' },
    tourHeadline: 'Benj Automated GTM Strategy Engine & Market Sizing',
    spotlights: [
      { title: 'AI Buyer Persona Generator', sub: 'Target ICP profiles based on competitive pricing and pain points' },
      { title: 'Multi-Channel Budget Allocation', sub: 'Dynamic ROI distribution across Google, Meta, and Organic Search' },
      { title: 'Defensible Launch Roadmap', sub: 'Week-by-week execution milestones with cited industry benchmarks' }
    ]
  },
  {
    slug: 'sibu',
    name: 'Sibu',
    tagline: 'Cloud Video Asset Library & Production Workspace',
    theme: { bg: '#140D2B', nav: '#241747', accent: '#8B5CF6', accentLight: '#A78BFA', border: '#3B2770', tag: '#EC4899' },
    tourHeadline: 'Sibu Multi-Track Video Assembly & Cloud Storage Hub',
    spotlights: [
      { title: 'Connected Cloud Storage Ingestion', sub: 'Zero-latency indexing from Google Drive, Dropbox, and S3' },
      { title: 'Multi-Track Media Timeline', sub: 'Frame-accurate cut assembly with collaborative timestamp notes' },
      { title: 'Client Review & Approval Portals', sub: 'Password-protected proofing links with instant feedback stamps' }
    ]
  },
  {
    slug: 'hrmagix',
    name: 'HRMagix',
    tagline: 'Indian HRMS & Statutory Payroll Software',
    theme: { bg: '#0B1D3A', nav: '#172E54', accent: '#2563EB', accentLight: '#60A5FA', border: '#2B4C85', tag: '#10B981' },
    tourHeadline: 'HRMagix Indian Statutory Payroll & Attendance Control',
    spotlights: [
      { title: 'Statutory Compliance & Deductions', sub: 'Automated PF, ESI, Professional Tax, and TDS calculations' },
      { title: 'Biometric & Geofenced Attendance', sub: 'Real-time shift management, leave quotas, and overtime rules' },
      { title: 'Employee Self-Service Portal', sub: 'One-click payslip downloads, tax declarations, and claim requests' }
    ]
  },
  {
    slug: 'zuzu',
    name: 'ZUZU',
    tagline: 'Windows Desktop Workday Insight & Activity Telemetry',
    theme: { bg: '#0D1B2A', nav: '#1B263B', accent: '#00B4D8', accentLight: '#90E0EF', border: '#2E4C6D', tag: '#48CAE4' },
    tourHeadline: 'ZUZU Workday Focus Intelligence & Team Analytics',
    spotlights: [
      { title: 'On-Device Privacy Masking', sub: 'Client-side redaction ensures zero personal data leaves the machine' },
      { title: 'AI Daily Workday Summaries', sub: 'Objective focus time, app breakdown, and productivity timelines' },
      { title: 'Workload Balance & Burnout Detection', sub: 'Flag sustained overtime and uneven distribution across teams' }
    ]
  },
  {
    slug: 'zorfly',
    name: 'Zorfly',
    tagline: 'Daily Business Communication & Skills Practice',
    theme: { bg: '#231123', nav: '#381D38', accent: '#D946EF', accentLight: '#F0ABFC', border: '#5A2A5A', tag: '#8B5CF6' },
    tourHeadline: 'Zorfly Daily Executive Communication & Grammar Missions',
    spotlights: [
      { title: 'Five-Minute Daily Missions', sub: 'Bite-sized written and spoken communication drills for engineers' },
      { title: 'Instant AI Voice & Grammar Feedback', sub: 'Tone calibration, vocabulary expansion, and structural corrections' },
      { title: 'Manager Performance Benchmarks', sub: 'Track team skill improvement rates and active learning streaks' }
    ]
  },
  {
    slug: 'zapbuzzer',
    name: 'ZapBuzzer',
    tagline: 'Internal Workplace Service Requests & SLA Timers',
    theme: { bg: '#0A2526', nav: '#133E40', accent: '#14B8A6', accentLight: '#5EEAD4', border: '#1E5E61', tag: '#F59E0B' },
    tourHeadline: 'ZapBuzzer Office Service Ticketing & SLA Escalation',
    spotlights: [
      { title: 'One-Tap Request Dispatch', sub: 'Instant logging for pantry, stationery, IT, and facilities issues' },
      { title: 'SLA Countdown & Auto-Escalation', sub: 'First person to accept owns the ticket with strict SLA countdowns' },
      { title: 'WhatsApp & Telegram Notifications', sub: 'Staff receive alert pings without cluttered group chat noise' }
    ]
  },
  {
    slug: 'sigchanger',
    name: 'SigChanger',
    tagline: 'Centralized Gmail Signature Deployment for Google Workspace',
    theme: { bg: '#101C36', nav: '#1A2F59', accent: '#3B82F6', accentLight: '#93C5FD', border: '#2D4C8C', tag: '#EF4444' },
    tourHeadline: 'SigChanger Google Workspace Centralized Signature Rollout',
    spotlights: [
      { title: 'Drag-and-Drop Signature Builder', sub: 'Design on-brand responsive HTML signatures with dynamic tags' },
      { title: 'Google Directory Synchronization', sub: 'New employees automatically inherit role-specific signature banners' },
      { title: 'Scheduled Campaign Banners', sub: 'Time-bound promotional footers deployed server-side in minutes' }
    ]
  },
  {
    slug: 'fantom',
    name: 'Fantom',
    tagline: 'Enterprise SIM Card & Corporate Cellular Telemetry',
    theme: { bg: '#1C1917', nav: '#292524', accent: '#F97316', accentLight: '#FDBA74', border: '#44403C', tag: '#10B981' },
    tourHeadline: 'Fantom Company SIM Fleet Management & Recharge Alerts',
    spotlights: [
      { title: 'Centralized SIM Directory', sub: 'Track ICCID, mobile number, assigned employee, and carrier details' },
      { title: 'Automated Recharge Alerts', sub: 'Never let critical sales numbers lapse with advance expiry alerts' },
      { title: 'Android Call Log Telemetry', sub: 'Cloud sync of outgoing call duration and activity logs' }
    ]
  },
  {
    slug: 'trackysuite',
    name: 'TrackySuite',
    tagline: 'Multi-Tenant Operations & Enterprise Group Controls',
    theme: { bg: '#0E1726', nav: '#1E293B', accent: '#0284C7', accentLight: '#38BDF8', border: '#334155', tag: '#10B981' },
    tourHeadline: 'TrackySuite Enterprise Operations & Multi-Entity Portal',
    spotlights: [
      { title: 'Multi-Entity Holding View', sub: 'Manage subsidiary permissions, users, and billing from one seat' },
      { title: 'Unified Single Sign-On (SSO)', sub: 'SAML 2.0 and OAuth authentication across all enterprise tools' },
      { title: 'Global Audit Trail & Logging', sub: 'Tamper-evident logs of user permissions and data access events' }
    ]
  },
  {
    slug: 'sizoru',
    name: 'Sizoru',
    tagline: 'TAM, SAM & SOM Market Sizing with Cited Benchmarks',
    theme: { bg: '#171A21', nav: '#252A36', accent: '#EAB308', accentLight: '#FDE047', border: '#3A4254', tag: '#3B82F6' },
    tourHeadline: 'Sizoru Defensible Market Sizing & Investor Model Hub',
    spotlights: [
      { title: 'Dual Methodology Sizing', sub: 'Cross-verify top-down sector totals against bottom-up customer pricing' },
      { title: 'Tier-Rated Source Registry', sub: 'Every TAM number traces directly to verified industry publications' },
      { title: 'Investor-Ready PDF Export', sub: 'One-click slide deck graphic and full statistical methodology report' }
    ]
  },
  {
    slug: 'oda7',
    name: 'ODA7',
    tagline: 'High-Velocity Outbound Sales CRM & Cloud Dialler',
    theme: { bg: '#111827', nav: '#1F2937', accent: '#4F46E5', accentLight: '#818CF8', border: '#374151', tag: '#10B981' },
    tourHeadline: 'ODA7 High-Velocity Outbound Prospecting & Sales Pipeline',
    spotlights: [
      { title: 'Integrated Browser Dialler', sub: 'Zero-hardware VoIP dialling with call recordings and live notes' },
      { title: 'Multi-Stage Deal Pipeline', sub: 'Drag-and-drop opportunity cards with automated stage rotting alerts' },
      { title: 'Omnichannel Lead Routing', sub: 'Inbound web leads automatically distributed to available agents' }
    ]
  },
  {
    slug: 'fleetras',
    name: 'Fleetras',
    tagline: 'Enterprise Fleet Telematics & Route Optimization',
    theme: { bg: '#131C14', nav: '#1E2E20', accent: '#84CC16', accentLight: '#BEF264', border: '#2D4430', tag: '#EAB308' },
    tourHeadline: 'Fleetras Real-Time GPS Tracking & Logistics Dashboard',
    spotlights: [
      { title: 'Live Vehicle Geolocation', sub: 'Sub-second GPS telemetry with route playback and speed alerts' },
      { title: 'Fuel Economy & Idle Analytics', sub: 'Cut excessive idling and monitor consumption per vehicle asset' },
      { title: 'Preventive Maintenance Schedules', sub: 'Odometer-triggered service reminders and inspection checklists' }
    ]
  },
  {
    slug: 'meetingmind',
    name: 'MeetingMind',
    tagline: 'AI Executive Meeting Intelligence & Action Item Tracker',
    theme: { bg: '#0A192F', nav: '#172A45', accent: '#64FFDA', accentLight: '#A7F3D0', border: '#233554', tag: '#38BDF8' },
    tourHeadline: 'MeetingMind Executive Call Intelligence & Action Items',
    spotlights: [
      { title: 'Speaker Diarization & Transcripts', sub: 'Accurate multi-speaker transcription with timestamp bookmarks' },
      { title: 'Executive Decision Extraction', sub: 'Key agreements and roadblocks summarized in concise bullet points' },
      { title: 'Action Item Task Delegation', sub: 'Auto-sync assigned deliverables directly into project management tools' }
    ]
  },
  {
    slug: 'taskmagic',
    name: 'TaskMagic',
    tagline: 'Desktop RPA & No-Code Web Automation Engine',
    theme: { bg: '#181028', nav: '#261A3E', accent: '#A855F7', accentLight: '#C084FC', border: '#3D2A61', tag: '#10B981' },
    tourHeadline: 'TaskMagic Visual Web Automation & Workflow Runner',
    spotlights: [
      { title: 'Visual Click-and-Record Builder', sub: 'Record browser workflows naturally without writing lines of code' },
      { title: 'Headless Cloud Execution', sub: 'Run thousands of repetitive web data transfers automatically 24/7' },
      { title: 'Webhook & API Trigger Integrations', sub: 'Connect legacy web applications to modern webhook endpoints' }
    ]
  },
  {
    slug: 'tracksuit',
    name: 'Tracksuit',
    tagline: 'Engineering Sprint Velocity & Milestone Deliverables',
    theme: { bg: '#0F172A', nav: '#1E293B', accent: '#0EA5E9', accentLight: '#7DD3FC', border: '#334155', tag: '#F43F5E' },
    tourHeadline: 'Tracksuit Engineering Sprint Tracker & Git Velocity',
    spotlights: [
      { title: 'Automated Sprint Burndown', sub: 'Live story point burn tracking pulled directly from code commits' },
      { title: 'Blocker & PR Bottleneck Detection', sub: 'Identify stalled pull requests before deadlines slip' },
      { title: 'Release Milestone Roadmaps', sub: 'Cross-team feature dependency graphs with forecasted delivery' }
    ]
  }
];

function generateTourSvg(p) {
  const t = p.theme;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 560" width="1100" height="560">
      <rect width="1100" height="560" rx="14" fill="${t.bg}"/>
      <!-- Top Window Chrome -->
      <rect x="20" y="20" width="1060" height="520" rx="12" fill="${t.nav}" stroke="${t.border}" stroke-width="1.5"/>
      <circle cx="44" cy="44" r="5" fill="#EF4444"/>
      <circle cx="60" cy="44" r="5" fill="#F59E0B"/>
      <circle cx="76" cy="44" r="5" fill="#10B981"/>
      <text x="100" y="48" fill="#94A3B8" font-size="12" font-family="system-ui, sans-serif" font-weight="600">${p.tourHeadline}</text>
      
      <!-- Top Action Bar -->
      <rect x="880" y="32" width="180" height="26" rx="6" fill="${t.accent}" fill-opacity="0.2" stroke="${t.accent}" stroke-width="1"/>
      <circle cx="896" cy="45" r="4" fill="${t.accent}"/>
      <text x="910" y="49" fill="${t.accentLight}" font-size="11" font-weight="bold" font-family="system-ui">LIVE SYSTEM ACTIVE</text>

      <!-- Left Sidebar -->
      <rect x="36" y="70" width="200" height="454" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
      <text x="52" y="98" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">NAVIGATION</text>
      
      <!-- Nav items -->
      <rect x="46" y="112" width="180" height="32" rx="6" fill="${t.accent}" fill-opacity="0.25"/>
      <text x="62" y="132" fill="${t.accentLight}" font-size="12" font-weight="bold" font-family="system-ui">⚡ Dashboard Overview</text>
      
      <text x="62" y="172" fill="#94A3B8" font-size="12" font-family="system-ui">📊 Analytics &amp; Reports</text>
      <text x="62" y="210" fill="#94A3B8" font-size="12" font-family="system-ui">⚙️ System Integrations</text>
      <text x="62" y="248" fill="#94A3B8" font-size="12" font-family="system-ui">👥 Team Directory</text>
      <text x="62" y="286" fill="#94A3B8" font-size="12" font-family="system-ui">🛡️ Compliance &amp; Audit</text>

      <rect x="46" y="430" width="180" height="80" rx="8" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
      <text x="58" y="454" fill="#94A3B8" font-size="10" font-weight="bold" font-family="system-ui">CURRENT PLAN</text>
      <text x="58" y="474" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">${p.name} Pro</text>
      <text x="58" y="494" fill="${t.tag}" font-size="10" font-family="system-ui">✓ 99.98% Uptime SLA</text>

      <!-- Main Content Area: Metric Cards -->
      <g transform="translate(252, 70)">
        <!-- Metric 1 -->
        <rect x="0" y="0" width="258" height="90" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        <text x="18" y="26" fill="#94A3B8" font-size="11" font-family="system-ui">Primary Throughput</text>
        <text x="18" y="58" fill="#FFFFFF" font-size="24" font-weight="bold" font-family="system-ui">14,280</text>
        <rect x="18" y="68" width="75" height="16" rx="4" fill="${t.accent}" fill-opacity="0.2"/>
        <text x="24" y="80" fill="${t.accentLight}" font-size="9" font-weight="bold" font-family="system-ui">+28.4% WoW</text>

        <!-- Metric 2 -->
        <rect x="274" y="0" width="258" height="90" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        <text x="292" y="26" fill="#94A3B8" font-size="11" font-family="system-ui">Verification Accuracy</text>
        <text x="292" y="58" fill="#FFFFFF" font-size="24" font-weight="bold" font-family="system-ui">99.82%</text>
        <rect x="292" y="68" width="80" height="16" rx="4" fill="#10B981" fill-opacity="0.2"/>
        <text x="298" y="80" fill="#10B981" font-size="9" font-weight="bold" font-family="system-ui">VERIFIED PASS</text>

        <!-- Metric 3 -->
        <rect x="548" y="0" width="266" height="90" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        <text x="566" y="26" fill="#94A3B8" font-size="11" font-family="system-ui">SLA Resolution Time</text>
        <text x="566" y="58" fill="#FFFFFF" font-size="24" font-weight="bold" font-family="system-ui">1.24s</text>
        <rect x="566" y="68" width="90" height="16" rx="4" fill="${t.tag}" fill-opacity="0.2"/>
        <text x="572" y="80" fill="${t.tag}" font-size="9" font-weight="bold" font-family="system-ui">TOP 1% SPEED</text>
      </g>

      <!-- Main Data Table Container -->
      <g transform="translate(252, 176)">
        <rect width="814" height="348" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        
        <!-- Table Header -->
        <rect width="814" height="38" rx="8" fill="${t.nav}"/>
        <text x="20" y="24" fill="#94A3B8" font-size="11" font-weight="bold" font-family="system-ui">RECORD ID &amp; SOURCE</text>
        <text x="280" y="24" fill="#94A3B8" font-size="11" font-weight="bold" font-family="system-ui">WORKFLOW MODULE</text>
        <text x="490" y="24" fill="#94A3B8" font-size="11" font-weight="bold" font-family="system-ui">TIMESTAMP / DURATION</text>
        <text x="680" y="24" fill="#94A3B8" font-size="11" font-weight="bold" font-family="system-ui">SYSTEM STATUS</text>

        <!-- Table Row 1 -->
        <line x1="0" y1="38" x2="814" y2="38" stroke="${t.border}" stroke-width="1"/>
        <text x="20" y="68" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">#OP-${p.slug.toUpperCase()}-901</text>
        <text x="20" y="86" fill="#64748B" font-size="10" font-family="system-ui">Client Production Cluster</text>
        <text x="280" y="74" fill="${t.accentLight}" font-size="12" font-family="system-ui">${p.spotlights[0].title}</text>
        <text x="490" y="74" fill="#94A3B8" font-size="11" font-family="system-ui">Just now · 0.42s latency</text>
        <rect x="680" y="58" width="80" height="22" rx="4" fill="#10B981" fill-opacity="0.2"/>
        <text x="720" y="73" fill="#10B981" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">COMPLETED</text>

        <!-- Table Row 2 -->
        <line x1="0" y1="102" x2="814" y2="102" stroke="${t.border}" stroke-width="1"/>
        <text x="20" y="132" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">#OP-${p.slug.toUpperCase()}-902</text>
        <text x="20" y="150" fill="#64748B" font-size="10" font-family="system-ui">Enterprise Gateway</text>
        <text x="280" y="138" fill="${t.accentLight}" font-size="12" font-family="system-ui">${p.spotlights[1].title}</text>
        <text x="490" y="138" fill="#94A3B8" font-size="11" font-family="system-ui">2 mins ago · Batch Sync</text>
        <rect x="680" y="122" width="80" height="22" rx="4" fill="#10B981" fill-opacity="0.2"/>
        <text x="720" y="137" fill="#10B981" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">VERIFIED</text>

        <!-- Table Row 3 -->
        <line x1="0" y1="166" x2="814" y2="166" stroke="${t.border}" stroke-width="1"/>
        <text x="20" y="196" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">#OP-${p.slug.toUpperCase()}-903</text>
        <text x="20" y="214" fill="#64748B" font-size="10" font-family="system-ui">Automated Pipeline</text>
        <text x="280" y="202" fill="${t.accentLight}" font-size="12" font-family="system-ui">${p.spotlights[2].title}</text>
        <text x="490" y="202" fill="#94A3B8" font-size="11" font-family="system-ui">5 mins ago · Real-Time</text>
        <rect x="680" y="186" width="80" height="22" rx="4" fill="${t.accent}" fill-opacity="0.2"/>
        <text x="720" y="201" fill="${t.accentLight}" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">PROCESSING</text>

        <!-- Table Row 4 -->
        <line x1="0" y1="230" x2="814" y2="230" stroke="${t.border}" stroke-width="1"/>
        <text x="20" y="260" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">#OP-${p.slug.toUpperCase()}-904</text>
        <text x="20" y="278" fill="#64748B" font-size="10" font-family="system-ui">Statutory Audit Check</text>
        <text x="280" y="266" fill="${t.accentLight}" font-size="12" font-family="system-ui">Security &amp; Encryption Key Rotation</text>
        <text x="490" y="266" fill="#94A3B8" font-size="11" font-family="system-ui">12 mins ago · System Task</text>
        <rect x="680" y="250" width="80" height="22" rx="4" fill="#10B981" fill-opacity="0.2"/>
        <text x="720" y="265" fill="#10B981" font-size="10" font-weight="bold" text-anchor="middle" font-family="system-ui">SECURE</text>

        <!-- Table Footer / Action bar -->
        <rect y="302" width="814" height="46" rx="8" fill="${t.nav}"/>
        <text x="20" y="330" fill="#94A3B8" font-size="11" font-family="system-ui">Showing 4 of 482 active records for ${p.name} · Encrypted AES-256</text>
        <rect x="680" y="312" width="114" height="26" rx="4" fill="${t.accent}"/>
        <text x="737" y="329" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">Export Records</text>
      </g>
    </svg>
  `;
}

function generateSpotlightSvg(p, index) {
  const t = p.theme;
  const spot = p.spotlights[index];
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 520" width="580" height="520">
      <rect width="580" height="520" rx="14" fill="${t.bg}"/>
      <rect x="16" y="16" width="548" height="488" rx="10" fill="${t.nav}" stroke="${t.border}" stroke-width="1.5"/>
      <circle cx="36" cy="36" r="4" fill="#EF4444"/>
      <circle cx="50" cy="36" r="4" fill="#F59E0B"/>
      <circle cx="64" cy="36" r="4" fill="#10B981"/>
      <text x="82" y="40" fill="#94A3B8" font-size="11" font-family="system-ui" font-weight="600">${p.name} · Feature Module ${index + 1}</text>
      
      <!-- Feature Card Frame -->
      <g transform="translate(32, 64)">
        <rect width="516" height="84" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        <text x="20" y="32" fill="#FFFFFF" font-size="15" font-weight="bold" font-family="system-ui">${spot.title}</text>
        <text x="20" y="56" fill="#94A3B8" font-size="11" font-family="system-ui">${spot.sub}</text>
        <rect x="420" y="24" width="76" height="22" rx="4" fill="${t.accent}" fill-opacity="0.2"/>
        <text x="458" y="39" fill="${t.accentLight}" font-size="10" font-weight="bold" font-family="system-ui" text-anchor="middle">MODULE ${index + 1}</text>
      </g>

      <!-- Interactive Flow / Data Block -->
      <g transform="translate(32, 164)">
        <rect width="516" height="324" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
        
        <!-- Interactive Step 1 -->
        <rect x="20" y="20" width="476" height="52" rx="6" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
        <circle cx="44" cy="46" r="12" fill="${t.accent}"/>
        <text x="44" y="50" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">01</text>
        <text x="68" y="42" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Trigger Input &amp; Validation</text>
        <text x="68" y="58" fill="#94A3B8" font-size="10" font-family="system-ui">Incoming data verified and sanitized in real time</text>
        <text x="440" y="50" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">✓ PASS</text>

        <!-- Down arrow -->
        <line x1="258" y1="72" x2="258" y2="88" stroke="${t.accent}" stroke-width="2" stroke-dasharray="2 2"/>

        <!-- Interactive Step 2 -->
        <rect x="20" y="88" width="476" height="52" rx="6" fill="${t.nav}" stroke="${t.accent}" stroke-width="1.5"/>
        <circle cx="44" cy="114" r="12" fill="${t.accent}"/>
        <text x="44" y="118" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">02</text>
        <text x="68" y="110" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">Core Processing Engine</text>
        <text x="68" y="126" fill="#94A3B8" font-size="10" font-family="system-ui">${spot.title} executing rules</text>
        <rect x="420" y="102" width="64" height="20" rx="4" fill="${t.accent}" fill-opacity="0.3"/>
        <text x="452" y="116" fill="${t.accentLight}" font-size="9" font-weight="bold" font-family="system-ui" text-anchor="middle">ACTIVE</text>

        <!-- Down arrow -->
        <line x1="258" y1="140" x2="258" y2="156" stroke="${t.accent}" stroke-width="2" stroke-dasharray="2 2"/>

        <!-- Interactive Step 3 -->
        <rect x="20" y="156" width="476" height="52" rx="6" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
        <circle cx="44" cy="182" r="12" fill="${t.accent}"/>
        <text x="44" y="186" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui">03</text>
        <text x="68" y="178" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="system-ui">System Dispatch &amp; Logging</text>
        <text x="68" y="194" fill="#94A3B8" font-size="10" font-family="system-ui">Immutable event log recorded and output dispatched</text>
        <text x="440" y="186" fill="#10B981" font-size="10" font-weight="bold" font-family="system-ui">✓ SYNCED</text>

        <!-- Summary metrics box -->
        <rect x="20" y="226" width="476" height="76" rx="6" fill="${t.nav}"/>
        <text x="40" y="254" fill="#94A3B8" font-size="10" font-family="system-ui">Execution Status</text>
        <text x="40" y="280" fill="#FFFFFF" font-size="16" font-weight="bold" font-family="system-ui">Instant / 0 Latency</text>

        <text x="220" y="254" fill="#94A3B8" font-size="10" font-family="system-ui">Reliability Score</text>
        <text x="220" y="280" fill="${t.tag}" font-size="16" font-weight="bold" font-family="system-ui">99.98% SLA</text>

        <text x="380" y="254" fill="#94A3B8" font-size="10" font-family="system-ui">Data Policy</text>
        <text x="380" y="280" fill="${t.accentLight}" font-size="16" font-weight="bold" font-family="system-ui">SOC2 Compliant</text>
      </g>
    </svg>
  `;
}

const solutionsMeta = [
  {
    slug: 'run-a-well-organised-office',
    name: 'Run a well-organised office',
    theme: { bg: '#0A2526', nav: '#133E40', accent: '#14B8A6', accentLight: '#5EEAD4', border: '#1E5E61' },
    headline: 'Office Operations, IT Requests & Gmail Signatures'
  },
  {
    slug: 'manage-your-people-from-hire-to-growth',
    name: 'Manage your people from hire to growth',
    theme: { bg: '#0B1D3A', nav: '#172E54', accent: '#2563EB', accentLight: '#60A5FA', border: '#2B4C85' },
    headline: 'Indian HRMS, Workday Analytics & Daily Skills'
  },
  {
    slug: 'prepare-for-launch-and-fundraising',
    name: 'Prepare for launch and fundraising',
    theme: { bg: '#171A21', nav: '#252A36', accent: '#EAB308', accentLight: '#FDE047', border: '#3A4254' },
    headline: 'TAM/SAM Market Sizing & AI GTM Strategy'
  }
];

function generateSolutionCardSvg(s) {
  const t = s.theme;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 370 172" width="370" height="172">
      <rect width="370" height="172" rx="10" fill="${t.bg}"/>
      <rect x="8" y="8" width="354" height="156" rx="8" fill="${t.nav}" stroke="${t.border}" stroke-width="1"/>
      <circle cx="24" cy="24" r="3" fill="#EF4444"/>
      <circle cx="34" cy="24" r="3" fill="#F59E0B"/>
      <circle cx="44" cy="24" r="3" fill="#10B981"/>
      <text x="60" y="27" fill="#94A3B8" font-size="9" font-family="system-ui" font-weight="bold">TOYOAPPS SOLUTION BLUEPRINT</text>

      <rect x="20" y="44" width="330" height="42" rx="6" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
      <text x="32" y="62" fill="#FFFFFF" font-size="11" font-weight="bold" font-family="system-ui">${s.name}</text>
      <text x="32" y="76" fill="${t.accentLight}" font-size="9" font-family="system-ui">${s.headline}</text>

      <!-- Mini metrics strip -->
      <g transform="translate(20, 96)">
        <rect width="102" height="48" rx="4" fill="${t.bg}"/>
        <text x="10" y="18" fill="#94A3B8" font-size="8" font-family="system-ui">PRODUCTS</text>
        <text x="10" y="38" fill="#FFFFFF" font-size="13" font-weight="bold" font-family="system-ui">3 Combined</text>

        <rect x="114" y="0" width="102" height="48" rx="4" fill="${t.bg}"/>
        <text x="124" y="18" fill="#94A3B8" font-size="8" font-family="system-ui">INTEGRATION</text>
        <text x="124" y="38" fill="${t.accentLight}" font-size="13" font-weight="bold" font-family="system-ui">Verified</text>

        <rect x="228" y="0" width="102" height="48" rx="4" fill="${t.bg}"/>
        <text x="238" y="18" fill="#94A3B8" font-size="8" font-family="system-ui">EXECUTION</text>
        <text x="238" y="38" fill="#10B981" font-size="13" font-weight="bold" font-family="system-ui">Immediate</text>
      </g>
    </svg>
  `;
}

function sanitize(svg) {
  return svg.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+|#x[0-9a-fA-F]+;)/g, '&amp;');
}

async function run() {
  console.log('Generating unique images for products and solutions...');
  let count = 0;

  // 1. Generate 16 unique tour images (1100x560)
  for (const p of productsMeta) {
    const dir = path.join('public', 'images', 'products', p.slug);
    ensureDir(dir);
    const tourSvg = sanitize(generateTourSvg(p));
    const dest = path.join(dir, 'tour.webp');
    await sharp(Buffer.from(tourSvg), { density: 144 })
      .webp({ quality: 92, effort: 4 })
      .toFile(dest);
    count++;
    console.log(`✓ Generated ${dest} (1100x560)`);

    // 2. Generate 3 unique spotlight images per product (580x520)
    for (let i = 0; i < 3; i++) {
      const spotSvg = sanitize(generateSpotlightSvg(p, i));
      const spotDest = path.join(dir, `spotlight-${i + 1}.webp`);
      await sharp(Buffer.from(spotSvg), { density: 144 })
        .webp({ quality: 92, effort: 4 })
        .toFile(spotDest);
      count++;
    }
    console.log(`✓ Generated 3 spotlights for ${p.slug} (580x520)`);
  }

  // 3. Generate 3 unique solution cards (370x172)
  const solDir = path.join('public', 'images', 'solutions');
  ensureDir(solDir);
  for (const s of solutionsMeta) {
    const solSvg = sanitize(generateSolutionCardSvg(s));
    const solDest = path.join(solDir, `${s.slug}.webp`);
    await sharp(Buffer.from(solSvg), { density: 144 })
      .webp({ quality: 92, effort: 4 })
      .toFile(solDest);
    count++;
    console.log(`✓ Generated solution visual ${solDest}`);
  }

  console.log(`\nSuccessfully generated ${count} unique visuals!`);
}

run().catch(err => {
  console.error('Error generating visuals:', err);
  process.exit(1);
});
