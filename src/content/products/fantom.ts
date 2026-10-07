import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

/**
 * Fantom's public copy is read from its landing-content API. Its stats,
 * testimonials, contact details and plan prices look like placeholder/test
 * data and are deliberately not used (see the source map).
 */
export const fantom: Product = {
  id: "fantom",
  slug: "fantom",
  name: "Fantom",
  shortDescription:
    "Manage every company SIM card in one place — recharges, call logs and messaging-app status for the whole inventory.",
  longDescription:
    "Fantom is a cloud dashboard for businesses that issue SIM cards to staff. It keeps the SIM inventory, tracks recharges, syncs call logs from an Android app, and shows WhatsApp and Telegram status across numbers, with access shared among multiple users.",
  tagline: "Manage All Your SIM Cards in One Place",
  category: "operations-it",
  subcategory: "telecom-devices",
  primaryUseCase: "Company SIM-card management",
  audience: ["Operations managers", "IT administrators", "Business owners"],
  platforms: ["web", "android"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://fantomapps.com/",
  appUrl: "https://fantomapps.com/register",
  ...featureSet(
    group(
      "Features",
      [
        ["SIM Management", "Your whole SIM inventory in one dashboard."],
        ["Recharge Tracking", "Know when each number was recharged and when it's due."],
        ["Call Log Analytics", "Call logs synced from the Android app."],
        ["Smart Notifications", "Alerts for recharges and changes."],
        ["Multi-User Access", "Share management across your team."],
        ["Secure & Reliable", "Cloud-hosted with secure access."],
      ],
      { highlight: 6 },
    ),
    group("Messaging apps", [
      ["WhatsApp status tracking", "Status and last-active monitoring per number."],
      ["Telegram status tracking", "Status and last-active monitoring per number."],
    ]),
  ),
  howItWorks: [
    { title: "Sign up", description: "Create your company account." },
    { title: "Add SIMs", description: "Add the numbers you manage." },
    { title: "Install app", description: "Install the Android app on company phones." },
    { title: "Track & manage", description: "Follow recharges, calls and status from the dashboard." },
  ],
  integrations: ["whatsapp", "telegram"],
  useCases: [
    { title: "Teams issued company SIMs", description: "Keep every number, its recharge status and its call logs in one dashboard." },
    { title: "Messaging-heavy operations", description: "Track WhatsApp and Telegram status across company numbers." },
  ],
  faqs: [
    { question: "How are call logs collected?", answer: "Through Fantom's Android app installed on company phones." },
    { question: "Is there a free trial?", answer: "Yes — 14 days, with no credit card required." },
  ],
  solutions: ["run-a-well-organised-office"],
  sources: ["https://fantomapps.com/", "https://api.fantomapps.com/api/landing-content/public"],
  lastVerified: "2026-10-07",
};
