import type { Comparison, Industry, Integration, Resource, Solution } from "./types";

/**
 * Cross-product registries.
 *
 * Integrations: only tools a product's own site names as an integration or
 * connected channel. Detail pages exist only for entries with `body` content;
 * until then they appear in the directory and on product pages only.
 *
 * Solutions, industries, comparisons and resources are empty on purpose —
 * candidates are documented in docs/TOYOAPPS_PRODUCT_TAXONOMY.md §5 and are
 * published only once written.
 */

const live = "live" as const;

export const integrations: Integration[] = [
  { slug: "google-workspace", name: "Google Workspace", vendor: "Google", category: "Productivity suites", summary: "Directory and Gmail access for signature management.", products: ["sigchanger"], status: live },
  { slug: "google-contacts", name: "Google Contacts", vendor: "Google", category: "Contacts & CRM", summary: "Push scanned contacts to Google Contacts.", products: ["cardizo"], status: live },
  { slug: "google-drive", name: "Google Drive", vendor: "Google", category: "Storage", summary: "Ingest and sync media from Drive.", products: ["sibu"], status: live },
  { slug: "dropbox", name: "Dropbox", vendor: "Dropbox", category: "Storage", summary: "Bring Dropbox files into an asset library.", products: ["sibu"], status: live },
  { slug: "onedrive", name: "OneDrive", vendor: "Microsoft", category: "Storage", summary: "Bring OneDrive files into an asset library.", products: ["sibu"], status: live },
  { slug: "aws-s3", name: "AWS S3", vendor: "Amazon Web Services", category: "Storage", summary: "Connect S3 buckets as a media source.", products: ["sibu"], status: live },
  { slug: "whatsapp", name: "WhatsApp", vendor: "Meta", category: "Messaging", summary: "Outreach, notifications and status tracking over WhatsApp.", products: ["cardizo", "zapbuzzer", "fantom"], status: live },
  { slug: "telegram", name: "Telegram", vendor: "Telegram", category: "Messaging", summary: "Notifications and status tracking over Telegram.", products: ["zapbuzzer", "fantom"], status: live },
  { slug: "slack", name: "Slack", vendor: "Salesforce", category: "Messaging", summary: "Library activity in Slack.", products: ["sibu"], status: live },
  { slug: "figma", name: "Figma", vendor: "Figma", category: "Creative tools", summary: "Connect design work to the asset library.", products: ["sibu"], status: live },
  { slug: "adobe-premiere-pro", name: "Premiere Pro", vendor: "Adobe", category: "Creative tools", summary: "Connect editing workflows to the asset library.", products: ["sibu"], status: live },
  { slug: "adobe-after-effects", name: "After Effects", vendor: "Adobe", category: "Creative tools", summary: "Connect motion workflows to the asset library.", products: ["sibu"], status: live },
  { slug: "frame-io", name: "Frame.io", vendor: "Adobe", category: "Creative tools", summary: "Connect video review to the asset library.", products: ["sibu"], status: live },
  { slug: "zapier", name: "Zapier", vendor: "Zapier", category: "Automation", summary: "Connect library events to thousands of apps.", products: ["sibu"], status: live },
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
    summary: "Handle internal requests, keep email signatures on-brand and stay on top of company SIM cards.",
    problem:
      "Day-to-day office operations run on phone calls, chat messages and spreadsheets: requests get chased, signatures drift off-brand, and nobody is sure which company numbers are recharged.",
    approach:
      "Give each recurring operational job a system of its own — a request flow with owners and SLAs, centrally managed signatures, and a single view of company SIMs.",
    products: ["zapbuzzer", "sigchanger", "fantom"],
    body: [
      "ZapBuzzer turns internal requests — pantry, print, IT and facilities — into one tap. The right team is notified, the first person to accept owns the request, and missed requests escalate.",
      "SigChanger connects to Google Workspace so admins design signatures once and deploy them to every mailbox, with scheduled rollouts for campaigns and compliance changes.",
      "Fantom keeps company SIM cards, recharges and call logs in one dashboard, and tracks WhatsApp and Telegram status across numbers.",
    ],
    status: "live",
  },
  {
    slug: "manage-people-from-hire-to-growth",
    name: "Manage your people from hire to growth",
    summary: "Run core HR, understand how the workday goes, and build communication skills across teams.",
    problem:
      "People teams juggle attendance, leave, payroll and performance in separate tools, have little visibility into how work actually happens, and few practical ways to raise everyday skills.",
    approach: "Cover the lifecycle with an HR platform, add activity insight where teams work on desktops, and make skills practice a daily habit.",
    products: ["hrmagix", "zuzu", "zorfly"],
    body: [
      "HRMagix brings attendance and shifts, leave, payroll, OKRs, reviews, recognition and onboarding into one workspace.",
      "ZUZU pairs a Windows desktop agent with a manager portal, redacting private content on the device and writing daily reports with AI.",
      "Zorfly gives every team member a five-minute communication mission a day, with AI feedback and team analytics for managers.",
    ],
    status: "live",
  },
  {
    slug: "prepare-for-launch-and-fundraising",
    name: "Prepare for launch and fundraising",
    summary: "Size your market with cited numbers and turn a product description into a marketing plan.",
    problem: "Founders need to show investors a defensible market size and show the market a credible plan — usually without a research team or a marketing team.",
    approach: "Use a market-sizing report built two ways with every source cited, then a marketing plan built from the product itself.",
    products: ["sizoru", "getbenj"],
    body: [
      "Sizoru sizes TAM, SAM and SOM top-down and bottom-up, compares the two, and delivers bull, base and bear scenarios with tier-rated sources in a print-ready PDF.",
      "GetBenj takes a product description and returns a marketing plan — buyer persona, best markets, channels, a hyperlocal ad map and a budget split — as a PDF.",
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
    summary: "Software for CA, CS and tax firms managing statutory work for many clients.",
    challenges: [
      "Tracking statutory deadlines across dozens or hundreds of clients",
      "Making sure every filing is reviewed before it goes out",
      "Collecting documents from clients without constant follow-up",
    ],
    products: ["trackysuite"],
    body: [
      "For a practice, a missed deadline costs the client a penalty and the firm its reputation. TrackySuite is built for Indian CA, CS and tax firms: it places each client's GST, income-tax, TDS, ROC/MCA and labour deadlines automatically, runs every filing through a prepare–review–file pipeline, and gives clients a portal to upload documents and check status.",
    ],
    status: "live",
  },
  {
    slug: "media-creative-agencies",
    name: "Media, creative & agencies",
    icon: "spark",
    summary: "Software for video, brand and marketing teams and the agencies that serve them.",
    challenges: ["Finding the right asset in a growing library", "Reviewing video and creative work in context", "Planning campaigns for clients quickly"],
    products: ["sibu", "getbenj"],
    body: [
      "Sibu is a digital asset library for creative teams — AI tagging, scene detection and search by meaning, with comments pinned to the video timeline and approvals before anything ships.",
      "GetBenj helps agencies produce marketing plans for client products, with an Agency pack of 20 reports.",
    ],
    status: "live",
  },
  {
    slug: "startups-and-investors",
    name: "Startups & investors",
    icon: "rocket",
    summary: "Software for founders preparing to raise and launch, and the investors who assess them.",
    challenges: ["Showing a market size investors will accept", "Planning a launch without a marketing team"],
    products: ["sizoru", "getbenj"],
    body: [
      "Sizoru produces market-sizing reports for founders, consultants and VCs, with every number traced to a rated source.",
      "GetBenj turns a product description into a launch-ready marketing plan for founders building D2C brands.",
    ],
    status: "live",
  },
];
export const comparisons: Comparison[] = [];
export const resources: Resource[] = [];
