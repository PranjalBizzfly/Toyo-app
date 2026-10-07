import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

export const sizoru: Product = {
  id: "sizoru",
  slug: "sizoru",
  name: "Sizoru",
  shortDescription:
    "Market-sizing reports for founders and investors — TAM, SAM and SOM built top-down and bottom-up, with every source cited.",
  longDescription:
    "Sizoru sizes a market two ways and compares the results: when they agree the number is locked, when they partly agree it becomes a range, and when they don't the report explains why. Reports include bull, base and bear scenarios, India's 1/2/3 segmentation and tier-rated sources, delivered as a print-ready PDF.",
  tagline: "A defensible TAM, in three minutes — not three weeks.",
  category: "insights-research",
  secondaryCategories: ["sales-marketing"],
  subcategory: "market-research",
  primaryUseCase: "Market sizing for fundraising",
  audience: ["Founders (pre-seed to Series A)", "Consultants & advisors", "VCs & accelerators"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://sizoru.com/",
  appUrl: "https://sizoru.com/sign-in?mode=signup",
  publisher: { name: "Stolvix" },
  ...featureSet(
    group(
      "Why it holds up",
      [
        ["Dual-method convergence test", "Top-down and bottom-up estimates are compared before a number is locked."],
        ["Tier-rated source provenance", "Every source is rated and traced."],
        ["India 1/2/3 framework", "India's market tiers are built into the model."],
        ["Bull, base and bear scenarios", "Three scenarios in every report."],
        ["Visible filter chain", "Each assumption in the chain is shown and can be inspected."],
        ["3 free revisions in 30 days", "Revise the report after delivery."],
        ["Pay after the preview", "See a preview before paying."],
      ],
      { highlight: 4 },
    ),
  ),
  howItWorks: [
    { title: "Sign up", description: "Create an account with an emailed code." },
    { title: "Brief the engine", description: "Answer seven questions about the market." },
    { title: "Pipeline runs", description: "The sizing runs in a few minutes." },
    { title: "Download", description: "Get the print-ready PDF report." },
  ],
  pricing: {
    currency: "INR",
    unit: "report",
    note: "One price, no subscription. Also $59 USD per report.",
    asOf: "2026-10-07",
    sourceUrl: "https://sizoru.com/#pricing",
    plans: [
      {
        name: "Single report",
        price: "₹4,999",
        description: "Per report",
        features: ["Dual-method TAM / SAM / SOM", "India 1/2/3 framework", "Bull / base / bear scenarios", "Tier-rated sources", "Print-ready PDF", "3 free revisions within 30 days"],
        cta: { label: "Generate a report", href: "https://sizoru.com/sign-in?mode=signup" },
        recommended: true,
      },
    ],
  },
  docsUrl: "https://sizoru.com/methodology",
  useCases: [
    { title: "Founders preparing to raise", description: "Size the market for a pitch with numbers that show their working." },
    { title: "Consultants and advisors", description: "Produce a cited market-sizing report for a client engagement." },
    { title: "VCs and accelerators", description: "Size a thesis or a cohort's markets consistently." },
  ],
  faqs: [
    { question: "Is Sizoru a subscription?", answer: "No. You pay per report." },
    { question: "Can I revise a report?", answer: "Each report includes three free revisions within 30 days." },
    { question: "What format is the report?", answer: "A print-ready PDF. Sizoru lists a PowerPoint deck and an editable spreadsheet model as coming soon." },
  ],
  solutions: ["prepare-for-launch-and-fundraising"],
  industries: ["startups-and-investors"],
  sources: ["https://sizoru.com/", "https://sizoru.com/methodology"],
  lastVerified: "2026-10-07",
};
