import type { Comparison, Industry, Integration, Resource, Solution } from "./types";

/**
 * Cross-product registries.
 *
 * Integrations: only tools a product's own site names as an integration or
 * connected channel. Detail pages exist only for entries with `body` content;
 * until then they appear in the directory and on product pages only. Bodies
 * restate what the product records (src/content/products) already say.
 *
 * Solutions, industries, comparisons and resources are empty on purpose —
 * candidates are documented in docs/TOYOAPPS_PRODUCT_TAXONOMY.md §5 and are
 * published only once written.
 */

const live = "live" as const;

export const integrations: Integration[] = [
  {
    slug: "google-workspace",
    name: "Google Workspace",
    vendor: "Google",
    category: "Productivity suites",
    summary: "SigChanger links to a Google Workspace domain to import the user directory and write each person's Gmail signature through the Gmail API.",
    products: ["sigchanger"],
    status: live,
    body: [
      "SigChanger connects to a Google Workspace domain through a Google Cloud service account that the company provides. Once linked, it imports the whole user directory, so there is no employee list to build by hand.",
      "Directory changes such as new hires, role changes and departures sync to SigChanger automatically and reach signatures within minutes. When a signature is deployed, SigChanger updates each user's Gmail send-as signature server-side through the Gmail API.",
    ],
    faqs: [
      {
        question: "Can the connection be removed?",
        answer:
          "Yes. Disconnect Google Workspace in the SigChanger admin panel or rotate the service-account key in Google Cloud. SigChanger states that revocation is immediate and that stored service-account credentials are deleted on disconnect.",
      },
    ],
  },
  {
    slug: "google-contacts",
    name: "Google Contacts",
    vendor: "Google",
    category: "Contacts & CRM",
    summary: "Cardizo pushes contacts captured from scanned business cards straight into Google Contacts, alongside CSV, Excel and VCF export.",
    products: ["cardizo"],
    status: live,
    body: [
      "Cardizo turns business cards into tagged, searchable contacts. Those contacts stay portable: they can be pushed directly to Google Contacts, or exported at any time as CSV, Excel (.xlsx) or VCF/vCard files.",
    ],
  },
  {
    slug: "google-drive",
    name: "Google Drive",
    vendor: "Google",
    category: "Storage",
    summary: "Sibu connects to Google Drive with OAuth to ingest files and index an existing Drive collection into its asset library in the background.",
    products: ["sibu"],
    status: live,
    body: [
      "Sibu signs in to Google Drive with OAuth, so files can be brought into the asset library without uploading each one by hand. An existing Drive collection can be connected once and indexed in the background.",
      "Google Drive sync is listed among the features of Sibu's Pro plan.",
    ],
  },
  {
    slug: "dropbox",
    name: "Dropbox",
    vendor: "Dropbox",
    category: "Storage",
    summary: "Sibu uses Dropbox as a migration source: connect it once and Sibu indexes the existing library in the background.",
    products: ["sibu"],
    status: live,
    body: [
      "Teams moving an existing Dropbox collection into Sibu connect Dropbox once; Sibu then indexes the library in the background, so files do not have to be re-uploaded one by one.",
    ],
  },
  { slug: "onedrive", name: "OneDrive", vendor: "Microsoft", category: "Storage", summary: "Listed by Sibu among the drives its asset library connects with.", products: ["sibu"], status: live },
  {
    slug: "aws-s3",
    name: "AWS S3",
    vendor: "Amazon Web Services",
    category: "Storage",
    summary: "Sibu connects to Amazon S3 as a migration source, bringing an existing bucket-based library into its searchable asset library.",
    products: ["sibu"],
    status: live,
    body: [
      "Sibu treats Amazon S3 as a source for bulk import: connect S3 once and Sibu indexes the existing library in the background, so it becomes searchable and reviewable alongside other assets.",
    ],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    vendor: "Meta",
    category: "Messaging",
    summary: "Used three ways across ToyoApps: Cardizo follow-ups, ZapBuzzer request alerts on Pro, and Fantom's WhatsApp status tracking for company SIMs.",
    products: ["cardizo", "zapbuzzer", "fantom"],
    status: live,
    body: [
      "Cardizo: from a scanned contact, one click opens WhatsApp with a custom prefilled message. WhatsApp and email integrations are included from the Professional plan.",
      "ZapBuzzer: on the Pro plan, the responsible team is alerted on WhatsApp at the same time as the app and email, repeating until someone accepts. The request itself — owner, timer, escalation and rating — stays in ZapBuzzer, not in a group chat.",
      "Fantom: for businesses that use company numbers on WhatsApp, Fantom shows which managed SIMs have WhatsApp active and when each was last active, alerts on status changes and supports bulk status updates.",
    ],
  },
  {
    slug: "telegram",
    name: "Telegram",
    vendor: "Telegram",
    category: "Messaging",
    summary: "ZapBuzzer sends request alerts to Telegram on Pro, and Fantom tracks Telegram activation and last-active time on managed SIMs.",
    products: ["zapbuzzer", "fantom"],
    status: live,
    body: [
      "ZapBuzzer: on Pro, request alerts reach the team on Telegram alongside the app and email. Telegram is a delivery channel only — the request is routed, accepted, timed, escalated and rated in ZapBuzzer. The workspace admin connects Telegram during setup.",
      "Fantom: tracks whether Telegram is activated on each managed SIM and its last active time, with bulk status updates, so Telegram use across company numbers is visible in one dashboard.",
    ],
  },
  { slug: "slack", name: "Slack", vendor: "Salesforce", category: "Messaging", summary: "Listed by Sibu for notifications, so asset-library activity can be announced in Slack.", products: ["sibu"], status: live },
  { slug: "figma", name: "Figma", vendor: "Figma", category: "Creative tools", summary: "Listed among the design tools Sibu's asset library integrates with.", products: ["sibu"], status: live },
  { slug: "adobe-premiere-pro", name: "Premiere Pro", vendor: "Adobe", category: "Creative tools", summary: "Listed among the video-editing tools Sibu's asset library integrates with.", products: ["sibu"], status: live },
  { slug: "adobe-after-effects", name: "After Effects", vendor: "Adobe", category: "Creative tools", summary: "Listed among the motion-graphics tools Sibu's asset library integrates with.", products: ["sibu"], status: live },
  { slug: "frame-io", name: "Frame.io", vendor: "Adobe", category: "Creative tools", summary: "Listed among the video-review tools Sibu's asset library integrates with.", products: ["sibu"], status: live },
  { slug: "zapier", name: "Zapier", vendor: "Zapier", category: "Automation", summary: "Listed by Sibu for automation, so asset-library events can be connected to workflows in other apps.", products: ["sibu"], status: live },
];

/**
 * Cross-product solutions — only where two or more products genuinely apply.
 * Copy is ToyoApps' own, built from each product's stated capabilities; it
 * makes no claim that the products integrate with each other.
 */
export const solutions: Solution[] = [
  {
    slug: "run-a-well-organised-office",
    name: "Run a well-organised office",
    summary:
      "Route internal pantry, print and IT requests to an owner, keep every Gmail signature on-brand, and track company SIM recharges and call logs in one place.",
    problem:
      "Day-to-day office operations run on phone calls, chat groups and spreadsheets: requests get chased or asked twice, email signatures drift off-brand as people edit their own, and nobody is sure which company numbers are recharged or still active.",
    approach:
      "Give each recurring operational job a system of its own — a request flow with owners, timers and escalation; signatures designed once and deployed centrally; and a single dashboard for company SIMs. Each product works on its own; they are not connected to each other.",
    products: ["zapbuzzer", "sigchanger", "fantom"],
    body: [
      "ZapBuzzer turns internal requests — pantry, print, IT, facilities and reception — into one tap. The whole responsible team is notified at once on the app and email (plus Telegram and WhatsApp on Pro), the first person to accept owns the request, and missed requests escalate along an SLA chain.",
      "SigChanger connects to Google Workspace so admins design Gmail signatures once in a drag-and-drop builder and deploy them to every mailbox. Directory changes reach signatures within minutes, and rollouts can be scheduled for campaigns and compliance changes.",
      "Fantom keeps company SIM cards, recharges and call logs in one cloud dashboard. An Android app syncs call logs, alerts flag recharge due dates and inactive SIMs, and WhatsApp and Telegram status is tracked across numbers.",
    ],
    faqs: [
      {
        question: "Do these three products share data?",
        answer:
          "No. They are separate products that each cover one operational job. You can adopt any one of them on its own.",
      },
      {
        question: "Which one helps if requests are lost in a WhatsApp group?",
        answer:
          "ZapBuzzer. It gives each request an owner, a timer and a record, and on Pro it can still alert staff on WhatsApp while keeping the request itself out of the group chat.",
      },
    ],
    status: "live",
  },
  {
    slug: "manage-people-from-hire-to-growth",
    name: "Manage your people from hire to growth",
    summary:
      "Run attendance, leave, payroll and reviews in an HRMS, see how the workday actually went on Windows desktops, and build communication skills in five minutes a day.",
    problem:
      "People teams juggle attendance, leave, payroll and performance in separate tools, have little visibility into how work actually happens, and few practical ways to raise everyday skills such as written and spoken communication.",
    approach:
      "Cover the employee lifecycle with an HR platform, add activity insight where teams work on Windows desktops, and make communication practice a short daily habit. Each product is used on its own.",
    products: ["hrmagix", "zuzu", "zorfly"],
    body: [
      "HRMagix is HRMS and payroll software for Indian companies. It brings attendance and shifts, leave, payroll with PF, ESI, PT and TDS, OKRs, reviews, recognition, onboarding and employee self-service onto one employee record.",
      "ZUZU pairs a Windows desktop agent with a manager portal. The agent captures the workday, redacts private content on the device, and AI writes the daily reports managers read.",
      "Zorfly gives every team member a five-minute communication and grammar mission a day, with AI feedback for the learner and team analytics for managers.",
    ],
    faqs: [
      {
        question: "Is payroll in HRMagix built for India?",
        answer: "Yes. HRMagix handles payroll with Indian statutory components — PF, ESI, PT and TDS.",
      },
      {
        question: "Which platforms does ZUZU track?",
        answer: "ZUZU's desktop agent runs on Windows; managers read the AI-written reports in the manager portal.",
      },
    ],
    status: "live",
  },
  {
    slug: "prepare-for-launch-and-fundraising",
    name: "Prepare for launch and fundraising",
    summary:
      "Size your market with TAM, SAM and SOM traced to rated sources, then turn a product description into a marketing plan with personas, channels and a budget split.",
    problem:
      "Founders need to show investors a defensible market size and show the market a credible plan — usually without a research team or a marketing team, and on a fundraising timeline.",
    approach:
      "Start with a market-sizing report built two ways with every source cited, then generate a marketing plan from the product itself. Both products deliver their output as a PDF you can share.",
    products: ["sizoru", "getbenj"],
    body: [
      "Sizoru sizes TAM, SAM and SOM top-down and bottom-up, compares the two results, and delivers bull, base and bear scenarios with tier-rated sources in a print-ready PDF — so every number in a pitch deck can be traced.",
      "GetBenj takes a product description and returns a complete marketing plan — buyer persona, best markets, channels, a hyperlocal ad map and a budget split — as a PDF.",
    ],
    faqs: [
      {
        question: "Why size the market two ways?",
        answer:
          "Sizoru builds a top-down and a bottom-up estimate and compares them, which shows investors whether the headline figure holds up from both directions.",
      },
    ],
    status: "live",
  },
];

/** Industries — only where a product is built for, or explicitly serves, the industry. */
export const industries: Industry[] = [
  {
    slug: "accounting-tax-practices",
    name: "Accounting & tax practices",
    icon: "wallet",
    summary:
      "Practice management for Indian CA, CS and tax firms that track GST, income-tax, TDS, ROC/MCA and labour deadlines for many clients at once.",
    challenges: [
      "Tracking statutory deadlines across dozens or hundreds of clients",
      "Making sure every filing is reviewed before it goes out",
      "Collecting documents from clients without constant follow-up",
    ],
    products: ["trackysuite"],
    body: [
      "For a practice, a missed deadline costs the client a penalty and the firm its reputation. TrackySuite is built for Indian CA, CS and tax firms: it places each client's GST, income-tax, TDS, ROC/MCA and labour deadlines automatically, so the calendar is built from client data rather than typed in by hand.",
      "Every filing runs through a prepare–review–file pipeline, so work is checked before submission, and clients get a portal to upload documents and check the status of their work instead of calling the office.",
    ],
    status: "live",
  },
  {
    slug: "media-creative-agencies",
    name: "Media, creative & agencies",
    icon: "spark",
    summary:
      "Asset management and marketing planning for video, brand and marketing teams, and for agencies producing plans for client products.",
    challenges: ["Finding the right asset in a growing library", "Reviewing video and creative work in context", "Planning campaigns for clients quickly"],
    products: ["sibu", "getbenj"],
    body: [
      "Sibu is a digital asset library for creative teams. It indexes video, images, documents and audio with AI tagging and scene detection, lets people search by meaning rather than file name, and pins comments to the video timeline with approvals before anything ships.",
      "GetBenj helps agencies produce marketing plans for client products: each report covers buyer persona, best markets, channels, a hyperlocal ad map and a budget split, and an Agency pack provides 20 reports.",
    ],
    status: "live",
  },
  {
    slug: "startups-and-investors",
    name: "Startups & investors",
    icon: "rocket",
    summary:
      "Market sizing with cited sources and AI-built marketing plans for founders preparing to raise and launch, and the investors who assess them.",
    challenges: ["Showing a market size investors will accept", "Planning a launch without a marketing team"],
    products: ["sizoru", "getbenj"],
    body: [
      "Sizoru produces market-sizing reports for founders, consultants and VCs. TAM, SAM and SOM are built top-down and bottom-up, with bull, base and bear scenarios and every number traced to a tier-rated source.",
      "GetBenj turns a product description into a launch-ready marketing plan for founders building D2C brands, covering who to target, where, through which channels and with what budget split.",
    ],
    status: "live",
  },
];
export const comparisons: Comparison[] = [];
export const resources: Resource[] = [];
