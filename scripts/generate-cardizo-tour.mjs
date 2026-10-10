import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 560" width="1100" height="560">
  <defs>
    <!-- Gradients -->
    <linearGradient id="windowBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B132B"/>
      <stop offset="100%" stop-color="#070D1F"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="waGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#25D366"/>
      <stop offset="100%" stop-color="#1EBE5D"/>
    </linearGradient>
    <linearGradient id="emailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="aiBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1B4B" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#4F46E5"/>
    </linearGradient>

    <!-- Filters for drop shadows -->
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#10B981" flood-opacity="0.6"/>
    </filter>
  </defs>

  <style>
    .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  </style>

  <!-- Outer Canvas Background -->
  <rect width="1100" height="560" rx="16" fill="url(#windowBg)"/>

  <!-- Chrome Window Frame -->
  <rect x="14" y="14" width="1072" height="532" rx="12" fill="#0D1527" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Top Navigation & Titlebar (y: 14..58) -->
  <rect x="14" y="14" width="1072" height="44" rx="12" fill="#131E36"/>
  <rect x="14" y="56" width="1072" height="2" fill="#1E293B"/>

  <!-- Window Dot Buttons -->
  <circle cx="36" cy="36" r="5" fill="#EF4444"/>
  <circle cx="52" cy="36" r="5" fill="#F59E0B"/>
  <circle cx="68" cy="36" r="5" fill="#10B981"/>

  <!-- Brand Title -->
  <text x="96" y="40" fill="#FFFFFF" font-size="13" font-weight="700" class="font-sans">Cardizo</text>
  <rect x="156" y="27" width="168" height="20" rx="10" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="0.8"/>
  <circle cx="168" cy="37" r="3" fill="#10B981" filter="url(#glowGreen)"/>
  <text x="176" y="41" fill="#34D399" font-size="10" font-weight="600" class="font-sans">Claude Vision OCR Active</text>

  <!-- Top Search Bar (Cardizo Tag Search Feature) -->
  <rect x="360" y="24" width="440" height="26" rx="6" fill="#0A0F1D" stroke="#25324D" stroke-width="1"/>
  <text x="376" y="41" fill="#64748B" font-size="11" class="font-sans">🔍 Search tags: </text>
  <text x="466" y="41" fill="#93C5FD" font-size="11" font-weight="600" class="font-sans">“Investor + Mumbai + Dubai Expo”</text>
  <rect x="734" y="28" width="56" height="18" rx="4" fill="#1E293B"/>
  <text x="742" y="41" fill="#38BDF8" font-size="10" font-weight="600" class="font-sans">1 Match</text>

  <!-- Top Right Sync & User -->
  <rect x="830" y="25" width="130" height="24" rx="6" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="0.8"/>
  <text x="842" y="41" fill="#10B981" font-size="10" font-weight="600" class="font-sans">✓ Google Contacts Sync</text>
  <circle cx="985" cy="37" r="11" fill="url(#avatarGrad)"/>
  <text x="980" y="41" fill="#FFFFFF" font-size="10" font-weight="700" class="font-sans">PS</text>
  <circle cx="994" cy="44" r="3" fill="#10B981"/>

  <!-- Left Sidebar (x: 26..196, y: 70..532) -->
  <rect x="26" y="68" width="170" height="464" rx="8" fill="#0A0F1E" stroke="#1E293B" stroke-width="1"/>
  
  <text x="40" y="94" fill="#64748B" font-size="10" font-weight="700" letter-spacing="0.05em" class="font-sans">RELATIONSHIP CRM</text>

  <!-- Nav Item: Active Scan -->
  <rect x="34" y="108" width="154" height="32" rx="6" fill="#2563EB" fill-opacity="0.2" stroke="#3B82F6" stroke-width="1"/>
  <text x="46" y="129" fill="#60A5FA" font-size="12" font-weight="600" class="font-sans">📸 Scan New Card</text>
  <rect x="156" y="114" width="24" height="18" rx="4" fill="#2563EB"/>
  <text x="160" y="127" fill="#FFFFFF" font-size="9" font-weight="700" class="font-sans">AI</text>

  <!-- Nav Item: All Cards -->
  <text x="46" y="165" fill="#94A3B8" font-size="12" class="font-sans">📇 All Cards</text>
  <text x="162" y="165" fill="#64748B" font-size="11" class="font-sans">348</text>

  <!-- Nav Item: Events & Tags -->
  <text x="46" y="201" fill="#94A3B8" font-size="12" class="font-sans">🏷️ Events &amp; Tags</text>
  <text x="168" y="201" fill="#64748B" font-size="11" class="font-sans">42</text>

  <!-- Nav Item: WhatsApp Queue -->
  <text x="46" y="237" fill="#94A3B8" font-size="12" class="font-sans">💬 WhatsApp Queue</text>
  <rect x="162" y="226" width="18" height="16" rx="4" fill="#10B981" fill-opacity="0.3"/>
  <text x="166" y="238" fill="#34D399" font-size="9" font-weight="700" class="font-sans">8</text>

  <!-- Nav Item: AI Email Drafts -->
  <text x="46" y="273" fill="#94A3B8" font-size="12" class="font-sans">✉️ AI Email Drafts</text>

  <!-- Nav Item: Export Formats -->
  <text x="46" y="309" fill="#94A3B8" font-size="12" class="font-sans">📁 CSV / VCF Export</text>

  <!-- Sidebar Bottom Plan Badge -->
  <rect x="34" y="430" width="154" height="88" rx="8" fill="#131E36" stroke="#233554" stroke-width="1"/>
  <text x="44" y="452" fill="#E2E8F0" font-size="11" font-weight="700" class="font-sans">Cardizo Pro</text>
  <text x="44" y="470" fill="#94A3B8" font-size="10" class="font-sans">5,000 Scans / Month</text>
  <text x="44" y="488" fill="#34D399" font-size="10" font-weight="600" class="font-sans">✓ WhatsApp &amp; AI active</text>
  <rect x="44" y="496" width="134" height="4" rx="2" fill="#0A0F1E"/>
  <rect x="44" y="496" width="62" height="4" rx="2" fill="#3B82F6"/>

  <!-- ============================================== -->
  <!-- MIDDLE COLUMN: Scanned Physical Visiting Card & OCR Extraction -->
  <!-- (x: 210..600, y: 70..532) -->
  <!-- ============================================== -->
  <g transform="translate(210, 68)">
    <rect width="400" height="464" rx="8" fill="#0A0F1E" stroke="#1E293B" stroke-width="1"/>
    
    <!-- Section Header -->
    <text x="18" y="26" fill="#94A3B8" font-size="11" font-weight="700" class="font-sans">PHOTO UPLOAD &amp; CLAUDE OCR</text>
    <rect x="290" y="12" width="94" height="20" rx="4" fill="#10B981" fill-opacity="0.15"/>
    <text x="298" y="26" fill="#34D399" font-size="10" font-weight="600" class="font-sans">● Scanned in 0.3s</text>

    <!-- The Visiting Card Canvas (Sleek Real Business Card) -->
    <g transform="translate(18, 40)" filter="url(#softShadow)">
      <!-- Business Card Body -->
      <rect width="364" height="210" rx="10" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5"/>
      
      <!-- Card Branding Accent -->
      <path d="M 0 10 Q 0 0 10 0 L 100 0 L 60 210 L 0 210 Z" fill="#1E3A8A" fill-opacity="0.4"/>
      
      <!-- Card Logo Symbol -->
      <rect x="24" y="22" width="28" height="28" rx="6" fill="url(#goldGrad)"/>
      <path d="M 38 28 L 44 42 L 32 42 Z" fill="#FFFFFF"/>
      <text x="60" y="34" fill="#F8FAFC" font-size="12" font-weight="800" letter-spacing="0.08em" class="font-sans">VERTEX CLOUD</text>
      <text x="60" y="45" fill="#94A3B8" font-size="8" letter-spacing="0.1em" class="font-sans">INNOVATION LABS PVT LTD</text>

      <!-- Card Person Name & Title -->
      <text x="24" y="92" fill="#FFFFFF" font-size="17" font-weight="700" class="font-sans">Arun K. Verma</text>
      <text x="24" y="108" fill="#60A5FA" font-size="10" font-weight="600" class="font-sans">MANAGING DIRECTOR &amp; CO-FOUNDER</text>

      <!-- Card Divider Line -->
      <line x1="24" y1="120" x2="340" y2="120" stroke="#334155" stroke-width="0.8"/>

      <!-- Card Contact Details -->
      <text x="24" y="142" fill="#E2E8F0" font-size="10" class="font-sans">📞 +91 98204 11223</text>
      <text x="24" y="160" fill="#E2E8F0" font-size="10" class="font-sans">✉️ arun.verma@vertexcloud.in</text>
      <text x="24" y="178" fill="#E2E8F0" font-size="10" class="font-sans">📍 Maker Chambers VI, Nariman Point, Mumbai</text>
      <text x="24" y="196" fill="#94A3B8" font-size="9" class="font-sans">🌐 www.vertexcloud.in</text>

      <!-- Claude Vision AI OCR Highlights (Bounding Boxes) -->
      <!-- Name Tag -->
      <rect x="20" y="74" width="136" height="24" rx="4" fill="none" stroke="#10B981" stroke-width="1.5" stroke-dasharray="3 2"/>
      <rect x="130" y="66" width="36" height="14" rx="3" fill="#10B981"/>
      <text x="133" y="76" fill="#0A0F1E" font-size="8" font-weight="800" class="font-sans">99.8%</text>

      <!-- Phone Tag -->
      <rect x="20" y="130" width="130" height="17" rx="3" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="3 2"/>
      
      <!-- Email Tag -->
      <rect x="20" y="148" width="180" height="17" rx="3" fill="none" stroke="#8B5CF6" stroke-width="1.5" stroke-dasharray="3 2"/>
    </g>

    <!-- Extracted Field Pills Grid (Below Card) -->
    <g transform="translate(18, 268)">
      <text x="0" y="14" fill="#94A3B8" font-size="10" font-weight="700" class="font-sans">CONFIRMED EXTRACTIONS (4 FIELDS)</text>
      
      <!-- Field 1 -->
      <rect x="0" y="24" width="176" height="42" rx="6" fill="#131E36" stroke="#25324D" stroke-width="1"/>
      <text x="10" y="40" fill="#64748B" font-size="9" class="font-sans">Full Name</text>
      <text x="10" y="56" fill="#FFFFFF" font-size="11" font-weight="600" class="font-sans">Arun K. Verma</text>
      <circle cx="160" cy="45" r="4" fill="#10B981"/>

      <!-- Field 2 -->
      <rect x="188" y="24" width="176" height="42" rx="6" fill="#131E36" stroke="#25324D" stroke-width="1"/>
      <text x="198" y="40" fill="#64748B" font-size="9" class="font-sans">Primary Phone</text>
      <text x="198" y="56" fill="#FFFFFF" font-size="11" font-weight="600" class="font-sans">+91 98204 11223</text>
      <circle cx="348" cy="45" r="4" fill="#10B981"/>

      <!-- Field 3 -->
      <rect x="0" y="74" width="176" height="42" rx="6" fill="#131E36" stroke="#25324D" stroke-width="1"/>
      <text x="10" y="90" fill="#64748B" font-size="9" class="font-sans">Email Address</text>
      <text x="10" y="106" fill="#FFFFFF" font-size="11" font-weight="600" class="font-sans">arun.verma@vertex…</text>
      <circle cx="160" cy="95" r="4" fill="#10B981"/>

      <!-- Field 4 -->
      <rect x="188" y="74" width="176" height="42" rx="6" fill="#131E36" stroke="#25324D" stroke-width="1"/>
      <text x="198" y="90" fill="#64748B" font-size="9" class="font-sans">Company &amp; Role</text>
      <text x="198" y="106" fill="#FFFFFF" font-size="11" font-weight="600" class="font-sans">Vertex Cloud (MD)</text>
      <circle cx="348" cy="95" r="4" fill="#10B981"/>

      <!-- Back of card toggle -->
      <rect x="0" y="128" width="364" height="28" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1"/>
      <text x="12" y="146" fill="#94A3B8" font-size="10" class="font-sans">🔄 Card Reverse Side: Uploaded &amp; Verified (Services: SaaS, Cloud, AI)</text>
      <text x="320" y="146" fill="#38BDF8" font-size="10" font-weight="600" class="font-sans">View ↗</text>
    </g>
  </g>

  <!-- ============================================== -->
  <!-- RIGHT COLUMN: Relationship Intelligence & Action Dispatcher -->
  <!-- (x: 624..1072, y: 70..532) -->
  <!-- ============================================== -->
  <g transform="translate(624, 68)">
    <rect width="448" height="464" rx="8" fill="#0A0F1E" stroke="#1E293B" stroke-width="1"/>

    <!-- Contact Profile Header -->
    <g transform="translate(20, 18)">
      <circle cx="24" cy="24" r="24" fill="url(#avatarGrad)"/>
      <text x="15" y="30" fill="#FFFFFF" font-size="15" font-weight="700" class="font-sans">AV</text>

      <text x="60" y="20" fill="#FFFFFF" font-size="15" font-weight="700" class="font-sans">Arun K. Verma</text>
      <text x="60" y="36" fill="#94A3B8" font-size="11" class="font-sans">Managing Director · Vertex Cloud Innovation Labs</text>
      <text x="60" y="50" fill="#64748B" font-size="10" class="font-sans">📍 Mumbai, Maharashtra · Added 2 hours ago via Scan</text>
    </g>

    <!-- Smart Tags Row (Core Cardizo feature: Tags > Names) -->
    <g transform="translate(20, 84)">
      <text x="0" y="12" fill="#94A3B8" font-size="10" font-weight="700" class="font-sans">SMART TAGS (DISCOVERY FILTER)</text>
      
      <!-- Tag 1: Event -->
      <rect x="0" y="22" width="124" height="22" rx="11" fill="#1E3A8A" stroke="#3B82F6" stroke-width="0.8"/>
      <text x="8" y="37" fill="#93C5FD" font-size="10" font-weight="600" class="font-sans">🎪 Dubai Expo 2024</text>

      <!-- Tag 2: Relationship -->
      <rect x="132" y="22" width="86" height="22" rx="11" fill="#14532D" stroke="#22C55E" stroke-width="0.8"/>
      <text x="140" y="37" fill="#86EFAC" font-size="10" font-weight="600" class="font-sans">💼 Investor</text>

      <!-- Tag 3: City -->
      <rect x="226" y="22" width="76" height="22" rx="11" fill="#581C87" stroke="#A855F7" stroke-width="0.8"/>
      <text x="234" y="37" fill="#D8B4FE" font-size="10" font-weight="600" class="font-sans">📍 Mumbai</text>

      <!-- Tag 4: Intent -->
      <rect x="310" y="22" width="94" height="22" rx="11" fill="#78350F" stroke="#F59E0B" stroke-width="0.8"/>
      <text x="318" y="37" fill="#FDE68A" font-size="10" font-weight="600" class="font-sans">🔥 High Intent</text>
    </g>

    <!-- AI Relationship Summary Box -->
    <g transform="translate(20, 156)">
      <rect width="408" height="114" rx="8" fill="url(#aiBoxGrad)" stroke="#6366F1" stroke-width="1.2"/>
      
      <circle cx="20" cy="22" r="8" fill="#4F46E5"/>
      <text x="16" y="26" fill="#FFFFFF" font-size="10" font-weight="700" class="font-sans">✦</text>
      <text x="36" y="26" fill="#A5B4FC" font-size="11" font-weight="700" class="font-sans">AI Relationship Intelligence (Claude 3.5)</text>
      <rect x="316" y="14" width="78" height="18" rx="4" fill="#4338CA"/>
      <text x="324" y="26" fill="#E0E7FF" font-size="9" font-weight="600" class="font-sans">Auto-Generated</text>

      <!-- Summary Text -->
      <text x="18" y="52" fill="#E2E8F0" font-size="11" class="font-sans">“Met Arun at Dubai Expo fintech pavilion. Discussed cloud CRM</text>
      <text x="18" y="68" fill="#E2E8F0" font-size="11" class="font-sans">and ToyoApps SaaS marketplace distribution for their portfolio.</text>
      <text x="18" y="84" fill="#E2E8F0" font-size="11" class="font-sans">Key objective: Send partnership deck and demo follow-up.”</text>
      
      <text x="18" y="104" fill="#94A3B8" font-size="10" class="font-sans">⏱️ Last Spoke: 2 days ago · Next step: Tuesday call</text>
    </g>

    <!-- Action Dispatcher: One-Click Follow-Up -->
    <g transform="translate(20, 290)">
      <text x="0" y="14" fill="#94A3B8" font-size="10" font-weight="700" class="font-sans">INSTANT ONE-CLICK OUTREACH</text>

      <!-- WhatsApp Action Button -->
      <g transform="translate(0, 26)">
        <rect width="408" height="46" rx="8" fill="url(#waGrad)"/>
        <!-- WhatsApp Icon Mock -->
        <circle cx="28" cy="23" r="14" fill="#FFFFFF" fill-opacity="0.2"/>
        <text x="21" y="28" fill="#FFFFFF" font-size="14">💬</text>
        <text x="54" y="21" fill="#FFFFFF" font-size="13" font-weight="700" class="font-sans">Open WhatsApp (Prefilled Custom Message)</text>
        <text x="54" y="36" fill="#DCFCE7" font-size="10" class="font-sans">“Hi Arun, great meeting you at Dubai Expo! Following up on…”</text>
        <text x="372" y="28" fill="#FFFFFF" font-size="14" font-weight="700">↗</text>
      </g>

      <!-- AI Email Action Button -->
      <g transform="translate(0, 82)">
        <rect width="408" height="46" rx="8" fill="url(#emailGrad)"/>
        <!-- Email Icon Mock -->
        <circle cx="28" cy="23" r="14" fill="#FFFFFF" fill-opacity="0.2"/>
        <text x="21" y="28" fill="#FFFFFF" font-size="14">✉️</text>
        <text x="54" y="21" fill="#FFFFFF" font-size="13" font-weight="700" class="font-sans">Send AI Email (Card Photo Attached Automatically)</text>
        <text x="54" y="36" fill="#DBEAFE" font-size="10" class="font-sans">Includes scan photo so Arun remembers your exact conversation</text>
        <text x="372" y="28" fill="#FFFFFF" font-size="14" font-weight="700">↗</text>
      </g>
    </g>

    <!-- Export & Portability Strip (Bottom) -->
    <g transform="translate(20, 432)">
      <rect width="408" height="34" rx="6" fill="#131E36" stroke="#25324D" stroke-width="1"/>
      <text x="14" y="21" fill="#94A3B8" font-size="10" class="font-sans">DATA PORTABILITY:</text>
      <text x="120" y="21" fill="#38BDF8" font-size="10" font-weight="600" class="font-sans">📥 Google Contacts</text>
      <text x="234" y="21" fill="#38BDF8" font-size="10" font-weight="600" class="font-sans">📄 VCF / vCard</text>
      <text x="328" y="21" fill="#38BDF8" font-size="10" font-weight="600" class="font-sans">📊 Excel / CSV</text>
    </g>
  </g>
</svg>
`;

async function main() {
  const destPath = 'public/images/products/cardizo/tour.webp';
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await sharp(Buffer.from(svg))
    .webp({ quality: 95, effort: 4 })
    .toFile(destPath);

  console.log(`Successfully generated authentic Cardizo Tour UI visual at ${destPath}!`);
}

main().catch(console.error);
