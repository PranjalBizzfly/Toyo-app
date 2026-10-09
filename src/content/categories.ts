import type { Category } from "./types";

/**
 * Product categories, derived from the audited product inventory
 * (docs/TOYOAPPS_PRODUCT_TAXONOMY.md). Grouped by the buyer's business
 * function. A product has one primary category and may be listed in up to
 * two more via `secondaryCategories`.
 *
 * A category is indexed and shown in menus only when it lists ≥ 2 public
 * products (see `isCategoryIndexable` in lib/catalog).
 *
 * Descriptions and problems name only what the products in each category
 * state on their own records (src/content/products).
 */
export const categories: Category[] = [
  {
    slug: "sales-marketing",
    name: "Sales & Marketing",
    tagline: "Capture contacts, run sales floors, plan campaigns and organise creative assets",
    description:
      "Software for the teams that find customers and grow the brand. Cardizo turns scanned business cards into searchable contacts, ODA7 runs sales floors from lead to commission payout, Benj builds a marketing plan from a product description, and Sibu keeps a creative team's video, image and audio assets indexed and reviewable.",
    icon: "megaphone",
    order: 10,
    status: "live",
    problems: [
      {
        title: "Contacts lost after events",
        description:
          "Business cards end up in drawers. Cardizo scans them with AI into tagged contacts you can follow up on WhatsApp or email and export to Google Contacts.",
      },
      {
        title: "Sales work spread across tools",
        description:
          "Leads, dialing, scripts, attendance and commission often sit in separate systems. ODA7 brings them into one workspace for sales floors.",
      },
      {
        title: "No plan before spending on marketing",
        description:
          "Starting from a product description, Benj returns a buyer persona, best markets, channels, a hyperlocal ad map and a budget split as a PDF.",
      },
      {
        title: "Creative assets nobody can find",
        description:
          "Sibu indexes every file with AI tagging and scene detection, so teams search by meaning and review video with comments pinned to the timeline.",
      },
    ],
    subcategories: [
      { slug: "contacts-relationships", name: "Contacts & relationships" },
      { slug: "marketing-planning", name: "Marketing planning" },
      { slug: "creative-operations", name: "Creative operations" },
    ],
  },
  {
    slug: "hr-people",
    name: "HR & People",
    tagline: "HR and payroll, workday insight and daily skills practice",
    description:
      "Software for HR teams and people managers. HRMagix covers attendance, leave, payroll with Indian statutory components and performance on one employee record; ZUZU shows how the workday went on Windows desktops with AI-written reports; and Zorfly builds communication skills in five minutes a day.",
    icon: "users",
    order: 20,
    status: "live",
    problems: [
      {
        title: "HR data in separate tools",
        description:
          "HRMagix puts attendance and shifts, leave, payroll with PF, ESI, PT and TDS, reviews and employee self-service onto one employee record.",
      },
      {
        title: "Little visibility into the workday",
        description:
          "ZUZU's Windows desktop agent captures the workday, redacts private content on the device, and AI writes the daily reports managers read.",
      },
      {
        title: "Skills training that doesn't stick",
        description:
          "Zorfly gives each person a five-minute communication mission a day, with AI feedback for the learner and team analytics for managers.",
      },
    ],
    subcategories: [
      { slug: "hrms", name: "HR management" },
      { slug: "workforce-analytics", name: "Workforce analytics & time tracking" },
      { slug: "learning-development", name: "Learning & development" },
    ],
  },
  {
    slug: "operations-it",
    name: "Operations & IT",
    tagline: "Office requests, Gmail signatures and company SIMs, each under control",
    description:
      "Software for office admins, operations managers and IT teams. ZapBuzzer routes pantry, print, IT and facilities requests to an owner with escalation, SigChanger manages Gmail signatures across a Google Workspace domain, and Fantom tracks company SIM cards, recharges and call logs.",
    icon: "building",
    order: 30,
    status: "live",
    problems: [
      {
        title: "Requests chased by phone and chat",
        description:
          "ZapBuzzer notifies the whole responsible team at once; the first person to accept owns the request, and missed requests escalate.",
      },
      {
        title: "Email signatures drifting off-brand",
        description:
          "SigChanger syncs the Google Workspace directory and deploys centrally designed signatures to every Gmail mailbox server-side.",
      },
      {
        title: "Company SIMs nobody tracks",
        description:
          "Fantom keeps SIM inventory, recharge due dates and call logs synced from an Android app in one dashboard, with WhatsApp and Telegram status per number.",
      },
    ],
    subcategories: [
      { slug: "workplace-operations", name: "Workplace operations" },
      { slug: "it-administration", name: "IT administration" },
      { slug: "telecom-devices", name: "Telecom & device management" },
      { slug: "fleet-logistics", name: "Fleet & logistics" },
    ],
  },
  {
    slug: "finance-compliance",
    name: "Finance & Compliance",
    tagline: "Every client's statutory deadlines, filings and documents in one system",
    description:
      "Software for accounting practices that carry statutory obligations for many clients. TrackySuite, built for Indian CA, CS and tax firms, places each client's GST, income-tax, TDS, ROC/MCA and labour deadlines automatically and runs filings through a prepare, review and file pipeline.",
    icon: "wallet",
    order: 40,
    status: "live",
    subcategories: [{ slug: "practice-management", name: "Practice management & compliance" }],
  },
  {
    slug: "insights-research",
    name: "Insights & Research",
    tagline: "Market sizing, marketing plans and activity reports you can defend",
    description:
      "Software that turns raw information into reports you can act on. Sizoru sizes TAM, SAM and SOM top-down and bottom-up with tier-rated sources, Benj produces a marketing plan from a product description, and ZUZU turns desktop activity into AI-written daily reports.",
    icon: "chart",
    order: 50,
    status: "live",
    subcategories: [
      { slug: "market-research", name: "Market research" },
      { slug: "meeting-intelligence", name: "Meeting intelligence" },
    ],
  },
];
