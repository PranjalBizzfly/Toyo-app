import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

export const cardizo: Product = {
  id: "cardizo",
  slug: "cardizo",
  name: "Cardizo",
  shortDescription:
    "Scan business cards with AI and turn them into tagged, searchable contacts you can follow up with on WhatsApp or email.",
  longDescription:
    "Cardizo reads both sides of a visiting card into structured fields, then lets you tag each contact by event, city, relationship and intent. Search brings back the right people later, and outreach goes out with the context of where you met — for one founder or a whole business-development team.",
  tagline: "Never forget who gave you a business card again.",
  category: "sales-marketing",
  subcategory: "contacts-relationships",
  primaryUseCase: "Turning business cards into follow-ups",
  audience: ["Founders", "Business-development teams", "Sales teams"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  featured: true,
  websiteUrl: "https://cardizo.com/",
  appUrl: "https://cardizo.com/sign-up",
  ...featureSet(
    group(
      "Features",
      [
        ["AI card scanning", "Snap front and back; name, company, phones, emails and address become structured fields."],
        ["Tag-first memory", "Tag contacts by event, city, relationship and intent, then search across them."],
        ["WhatsApp + email outreach", "Prefilled WhatsApp messages and AI-drafted emails with the card attached."],
        ["Relationship intelligence", "AI summaries and smart follow-up suggestions."],
        ["Sync everywhere", "Export to CSV, Excel or VCF, push to Google Contacts, bulk-import sheets."],
        ["Built for teams", "Workspaces, roles, shared events and audit logs."],
      ],
      { highlight: 6 },
    ),
  ),
  integrations: ["whatsapp", "google-contacts"],
  pricing: {
    currency: "INR",
    unit: "month",
    trial: "14-day Professional trial, no card required",
    note: "GST applied where applicable. Yearly billing saves about two months.",
    asOf: "2026-10-07",
    sourceUrl: "https://cardizo.com/pricing",
    plans: [
      { name: "Free", price: "₹0", period: "month", description: "For getting started", features: ["5 users", "50 scans / month", "1 GB storage"], cta: { label: "Start free", href: "https://cardizo.com/sign-up" } },
      { name: "Starter", price: "₹299", period: "month", description: "For small teams", features: ["20 users", "1,000 scans / month", "25 GB storage"], cta: { label: "Start trial", href: "https://cardizo.com/sign-up" } },
      { name: "Professional", price: "₹999", period: "month", description: "For growing businesses", features: ["100 users", "5,000 scans / month", "250 GB storage"], cta: { label: "Start trial", href: "https://cardizo.com/sign-up" }, recommended: true },
      { name: "Business", price: "₹2,999", period: "month", description: "For large organizations", features: ["Unlimited users", "Unlimited scans", "Unlimited storage"], cta: { label: "Start trial", href: "https://cardizo.com/sign-up" } },
      { name: "Enterprise", price: "Custom", description: "Custom pricing", features: ["Contact sales for SSO, white label and dedicated hosting"], cta: { label: "Contact sales", href: "https://cardizo.com/pricing" } },
    ],
  },
  useCases: [
    { title: "Events and expos", description: "Scan the cards you collect at an event and tag them with the event, city and intent, so you can pull up exactly those people later." },
    { title: "Following up after a meeting", description: "Send a prefilled WhatsApp message or an AI-drafted email with the card attached, so the contact knows where you met." },
    { title: "Team business development", description: "Share events and contacts across a workspace, with roles and an audit log." },
  ],
  faqs: [
    { question: "Does Cardizo need my own AI key?", answer: "Yes. Card extraction uses your own Anthropic API key, which you add in Cardizo's integration settings." },
    { question: "Can I take my contacts elsewhere?", answer: "Contacts export to CSV, Excel and VCF, and can be pushed to Google Contacts." },
    { question: "Is there a free plan?", answer: "Yes. The Free plan includes 5 users and 50 scans a month. Paid plans start with a 14-day Professional trial and no card is required." },
  ],
  sources: ["https://cardizo.com/", "https://cardizo.com/pricing"],
  lastVerified: "2026-10-07",
};
