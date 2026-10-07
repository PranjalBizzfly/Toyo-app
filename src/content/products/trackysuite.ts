import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

export const trackysuite: Product = {
  id: "trackysuite",
  slug: "trackysuite",
  name: "TrackySuite",
  shortDescription:
    "Practice management for Indian CA, CS and tax firms — every client's statutory deadlines, tasks, documents and reminders in one system.",
  longDescription:
    "TrackySuite keeps one master record per client and places their statutory deadlines on an all-India compliance calendar automatically. Work moves through a prepare → review → file pipeline with an owner at every stage, reminders escalate before due dates, documents sit in a per-client vault, and clients can follow status through their own portal.",
  tagline: "Your entire practice, in orbit around one system.",
  category: "finance-compliance",
  secondaryCategories: ["operations-it"],
  subcategory: "practice-management",
  primaryUseCase: "Compliance tracking for accounting practices",
  audience: ["Chartered accountant (CA) firms", "Company secretary (CS) firms", "Tax practices"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  featured: true,
  websiteUrl: "https://trackysuite.com/",
  appUrl: "https://trackysuite.com/signup",
  publisher: { name: "Stolvix Softwares" },
  ...featureSet(
    group(
      "Modules",
      [
        ["Compliance Calendar", "Statutory deadlines placed automatically for every client."],
        ["Task & Workflow", "Prepare → review → file, with an owner at every stage."],
        ["Deadline Reminders", "A 14·7·3·1-day reminder ladder that escalates before each due date."],
        ["Client Portal", "Clients see status and upload documents themselves."],
        ["Document Vault", "An encrypted, audit-logged vault per client."],
        ["Practice Dashboard", "The state of the whole practice at a glance."],
        ["Client Management", "One master record per client; registrations drive scheduling."],
        ["Team Management", "Roles, workloads and accountability per team member."],
        ["Audit Trail", "Every action is logged."],
        ["Reports & Analytics", "Firm health reports that trace back to logged actions."],
      ],
      { highlight: 6 },
    ),
  ),
  benefits: [
    { title: "Statutory coverage built in", description: "110 statutory filings across GST, income tax, ROC/MCA, labour and FEMA/RBI, for 8 entity types." },
    { title: "Review before filing", description: "A four-stage pipeline where the person preparing a filing cannot also sign it off." },
    { title: "Fast onboarding", description: "Import up to 500 clients from Excel, with a dry run first." },
  ],
  pricing: {
    currency: "INR",
    unit: "month",
    trial: "Free trial available, no card required",
    note: "Prices exclude 18% GST. Monthly prices shown; annual billing saves up to 11%.",
    asOf: "2026-10-07",
    sourceUrl: "https://trackysuite.com/#pricing",
    plans: [
      { name: "Solo", price: "₹900", period: "month", description: "For proprietors", features: ["Up to 25 clients", "5 staff seats"], cta: { label: "Start free trial", href: "https://trackysuite.com/signup" } },
      { name: "Practice", price: "₹1,800", period: "month", description: "Growing practices with a review chain", features: ["Up to 60 clients", "15 staff seats"], cta: { label: "Start free trial", href: "https://trackysuite.com/signup" } },
      { name: "Firm", price: "₹3,600", period: "month", description: "Multi-office firms running a full compliance calendar", features: ["Up to 150 clients", "40 staff seats"], cta: { label: "Start free trial", href: "https://trackysuite.com/signup" }, recommended: true },
      { name: "Multi-Partner", price: "₹6,750", period: "month", description: "For 6 to 10 partners", features: ["Up to 400 clients", "Unlimited staff seats"], cta: { label: "Start free trial", href: "https://trackysuite.com/signup" } },
      { name: "Enterprise", price: "Custom", description: "Above 400 clients, billed yearly", features: ["Unlimited clients and seats", "Dedicated success manager", "Custom integrations on request"], cta: { label: "Contact sales", href: "https://trackysuite.com/contact" } },
    ],
  },
  supportUrl: "https://trackysuite.com/contact",
  useCases: [
    { title: "Never missing a statutory deadline", description: "Deadlines for every client are placed automatically and reminders escalate 14, 7, 3 and 1 day before they're due." },
    { title: "Review before anything is filed", description: "Work moves through prepare, review and file, and the person who prepares a filing can't also sign it off." },
    { title: "Collecting documents from clients", description: "Clients upload documents and check status through their own portal." },
  ],
  faqs: [
    { question: "Can I bring in my existing clients?", answer: "Yes. You can import up to 500 clients from Excel, with a dry run first." },
    { question: "Do prices include GST?", answer: "No. 18% GST is added at checkout and can be claimed as input credit by a registered firm." },
    { question: "How are accounts secured?", answer: "Two-factor authentication is mandatory for firm owners." },
  ],
  industries: ["accounting-tax-practices"],
  sources: ["https://trackysuite.com/", "https://trackysuite.com/about"],
  lastVerified: "2026-10-07",
};
