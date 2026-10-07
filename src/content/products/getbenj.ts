import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

export const getbenj: Product = {
  id: "getbenj",
  slug: "getbenj",
  name: "GetBenj",
  shortDescription:
    "Describe a product and get a complete AI-built marketing plan as a PDF — buyer persona, best markets, channels, ad map and budget split.",
  longDescription:
    "GetBenj is built for Indian D2C brands and the agencies that work with them. It detects the likely buyer, picks the best markets, ranks techniques by profit, maps ads down to venue level and splits the budget — then exports everything as a clean PDF plan.",
  tagline: "One product in. A complete plan out.",
  category: "sales-marketing",
  secondaryCategories: ["insights-research"],
  subcategory: "marketing-planning",
  primaryUseCase: "Marketing plans for product launches",
  audience: ["D2C founders", "Marketing agencies", "Growth teams"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://getbenj.com/",
  appUrl: "https://getbenj.com/signup",
  publisher: { name: "GetBenj Inc." },
  ...featureSet(
    group(
      "Capabilities",
      [
        ["AI Buyer Persona", "Works out who is most likely to buy the product."],
        ["Best-Market Detection", "Finds the markets to target first."],
        ["Profit-Ranked Techniques", "Marketing techniques ordered by expected return."],
        ["Hyperlocal Ad Map", "Ad placements mapped down to venue and ad type."],
        ["Real Past Ads", "Examples drawn from real ads, not generic suggestions."],
        ["Real Media Outlets", "Named outlets relevant to the audience."],
        ["Ready-to-use Creatives", "Creative suggestions you can use straight away."],
        ["Exact Budget Split", "How to divide the budget across channels."],
        ["Clean PDF Report", "The full plan exported as a PDF."],
      ],
      { highlight: 4 },
    ),
  ),
  howItWorks: [
    { title: "Add your product", description: "Describe what you sell." },
    { title: "AI detects your buyer", description: "GetBenj identifies the likely customer." },
    { title: "AI builds the brief", description: "Markets, channels, ads and budget come together." },
    { title: "Generate & export", description: "Download the plan as a PDF." },
  ],
  pricing: {
    currency: "INR",
    unit: "report",
    note: "Pay per report or buy a pack — no subscriptions. USD prices: Lite $6, Pro $24, Agency $72.",
    asOf: "2026-10-07",
    sourceUrl: "https://getbenj.com/#pricing",
    plans: [
      { name: "Lite", price: "₹499", description: "One full report", features: ["1 report", "PDF export", "All sections"], cta: { label: "Get started", href: "https://getbenj.com/signup" } },
      { name: "Pro", price: "₹1,999", description: "5 reports", features: ["5 reports", "PDF export", "Priority generation", "Section regenerate"], cta: { label: "Choose Pro", href: "https://getbenj.com/signup" }, recommended: true },
      { name: "Agency", price: "₹5,999", description: "20 reports", features: ["20 reports", "All Pro features", "Team company", "Email support"], cta: { label: "Choose Agency", href: "https://getbenj.com/signup" } },
    ],
  },
  useCases: [
    { title: "Launching a new D2C product", description: "Start from a product description and get a plan covering who to target, where, through which channels and with what budget." },
    { title: "Agencies planning for clients", description: "Produce plans for several clients from one account — the Agency pack covers 20 reports." },
  ],
  faqs: [
    { question: "Is GetBenj a subscription?", answer: "No. You pay per report or buy a pack of reports." },
    { question: "What does a plan include?", answer: "A buyer persona, best markets, profit-ranked techniques, a hyperlocal ad map, real past ads, media outlets, creatives and a budget split, exported as a PDF." },
    { question: "Which channels does it plan for?", answer: "Google, Instagram, WhatsApp, Facebook, YouTube and LinkedIn." },
  ],
  solutions: ["prepare-for-launch-and-fundraising"],
  industries: ["startups-and-investors","media-creative-agencies"],
  sources: ["https://getbenj.com/"],
  lastVerified: "2026-10-07",
};
