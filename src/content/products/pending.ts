import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

/**
 * Products from the original request whose relationship to ToyoApps is
 * PENDING VERIFICATION. Kept as drafts (preview only, never indexed) — not
 * excluded. Publish by changing `status` once the business confirms.
 * See docs/TOYOAPPS_SOFTWARE_PRODUCT_INVENTORY.md §2.14–2.15.
 */

/** Facts below are from taskmagic.com (VERIFIED); its link to ToyoApps is not. */
export const taskmagic: Product = {
  id: "taskmagic",
  slug: "taskmagic",
  name: "TaskMagic",
  shortDescription:
    "No-code automation that connects apps and automates work in the browser, described in plain English.",
  tagline: "Connect Your Apps. Automate Your Browser. Just Describe It.",
  category: "operations-it",
  primaryUseCase: "Automating repetitive app and browser work",
  platforms: ["web"],
  market: "Global",
  status: "pending",
  websiteUrl: "https://taskmagic.com/",
  publisher: { name: "TaskMagic, Inc." },
  verification: {
    relationship: "pending",
    publicSale: "confirmed",
    notes: "Site names TaskMagic, Inc. (California) as operator; relationship to ToyoApps unconfirmed.",
  },
  ...featureSet(
    group("The stack", [
      ["App Integrations", "Connect to apps through integrations."],
      ["Browser Automation", "Scrape data, fill forms, click buttons and navigate sites without an API."],
    ]),
  ),
  useCases: [
    { title: "Lead generation", description: "Collect business leads from Google Maps." },
    { title: "Data entry and sync", description: "Move new Stripe payments into a sheet and send a thank-you email." },
    { title: "Competitor monitoring", description: "Watch RSS feeds and post updates to Slack." },
    { title: "Email and outreach", description: "Route inbox messages into HubSpot." },
  ],
  pricing: {
    currency: "USD",
    unit: "month",
    trial: "7-day free trial with 1,000 credits included",
    note: "Plans are month-to-month and priced by monthly credits; prices shown are each plan's lowest credit tier. Enterprise volume above 50,000 credits is priced by sales.",
    asOf: "2026-10-07",
    sourceUrl: "https://taskmagic.com/",
    plans: [
      { name: "Solo", price: "$29", period: "month", description: "From 5,000 credits", features: ["3 tables", "Single seat"], cta: { label: "Start free trial", href: "https://taskmagic.com/" } },
      { name: "Pro", price: "$79", period: "month", description: "From 15,000 credits", features: ["10 tables", "2 seats", "MCP access"], cta: { label: "Start free trial", href: "https://taskmagic.com/" } },
      { name: "Business", price: "$119", period: "month", description: "From 25,000 credits", features: ["Unlimited tables", "10 seats", "Bring your own key", "Priority support"], cta: { label: "Start free trial", href: "https://taskmagic.com/" } },
      { name: "Scale", price: "$199", period: "month", description: "From 45,000 credits", features: ["Unlimited seats", "Priority support and onboarding"], cta: { label: "Start free trial", href: "https://taskmagic.com/" } },
    ],
  },
  sources: ["https://taskmagic.com/", "https://taskmagic.com/terms"],
  lastVerified: "2026-10-07",
};

/** Site could not be audited (HTTP 429 bot checkpoint). Only the name and URL are known. */
export const tracksuit: Product = {
  id: "tracksuit",
  slug: "tracksuit",
  name: "Tracksuit",
  shortDescription: "Pending verification — product details not yet audited.",
  category: "insights-research",
  status: "pending",
  websiteUrl: "https://www.gotracksuit.com/",
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes: "Official site blocked automated access; audit from a browser and confirm relationship to ToyoApps. Category is a placeholder until audited.",
  },
  sources: [],
  lastVerified: "2026-10-07",
};
