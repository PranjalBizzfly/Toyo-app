import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

/**
 * ODA7 — written only from its official public pages (oda7.com home, sign-in,
 * sign-up, robots.txt, sitemap.xml; 8 Oct 2026). All other paths redirect to
 * sign-in, so there is no public pricing, documentation or per-feature detail.
 * Features therefore have no `body` and get no detail pages. The sign-in
 * panel's statistics are unverifiable and deliberately not used.
 */
export const oda7: Product = {
  id: "oda7",
  slug: "oda7",
  name: "ODA7",
  shortDescription:
    "A sales team operating system for large outbound sales floors — lead distribution, an integrated dialer, attendance, payroll, incentives and gamification in one place.",
  longDescription:
    "ODA7 positions itself as the operating system for high-volume outbound sales teams: one floor with many agents and many products, orchestrated from a single workspace. Agencies create their own workspace, choose a billing plan, and their admin invites the rest of the team.",
  tagline: "Sales team OS.",
  category: "sales-marketing",
  secondaryCategories: ["hr-people"],
  primaryUseCase: "Running large outbound sales floors",
  audience: ["Outbound sales agencies", "Sales floor managers", "Sales agents"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: {
    relationship: "pending",
    publicSale: "confirmed",
    notes: "Public sign-up exists; marketing pages beyond home/sign-in/sign-up redirect to sign-in. Owner not stated.",
  },
  websiteUrl: "https://oda7.com/",
  appUrl: "https://oda7.com/sign-up",
  ...featureSet(
    group(
      "Sales floor operations",
      [
        ["Lead distribution", "Distributes leads across the agents on a sales floor."],
        ["Integrated dialer", "An auto-dialer built into the same workspace as the leads."],
        ["Attendance", "Tracks agent attendance alongside sales work."],
        ["Payroll", "Runs payroll for the sales team in the same system."],
        ["Incentives", "Manages incentives for agents."],
        ["Gamification", "Uses game mechanics to motivate the sales floor."],
      ],
      { highlight: 6 },
    ),
  ),
  howItWorks: [
    { title: "Create your agency workspace", description: "Register your organisation and set up the agency admin account." },
    { title: "Choose a billing plan", description: "Pick a plan and pay securely with Razorpay." },
    { title: "Invite your team", description: "The workspace admin invites users from Settings → Users." },
  ],
  useCases: [
    {
      title: "High-volume outbound sales floors",
      description: "ODA7 is built for outbound sales operations with large agent teams selling many products from one floor.",
    },
  ],
  faqs: [
    {
      question: "How does an agency get started with ODA7?",
      answer: "Create an agency workspace on oda7.com, choose a billing plan and pay with Razorpay. You get an agency admin account, a subscription and workspace access.",
    },
    {
      question: "Can agents create their own accounts?",
      answer: "No. Agents get access through their workspace admin, who invites them from Settings → Users.",
    },
    {
      question: "Is ODA7 pricing published?",
      answer: "Plans are chosen during sign-up; ODA7 does not publish its prices on a public page.",
    },
  ],
  sources: ["https://oda7.com/", "https://oda7.com/sign-in", "https://oda7.com/sign-up", "https://oda7.com/robots.txt", "https://oda7.com/sitemap.xml"],
  lastVerified: "2026-10-08",
};
