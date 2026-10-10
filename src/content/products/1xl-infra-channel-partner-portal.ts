import type { Product } from "@/content/types";

/**
 * Written from the public pages of cp.infra.1xl.com (home, login, register,
 * country registration forms and terms). The office address, toll-free and
 * phone numbers look like placeholder data and are deliberately not used.
 * FAQ answers on the home page are collapsed and were not readable, so only
 * the questions inform the FAQs below, answered from the terms and home copy.
 */
export const xlInfraChannelPartnerPortal: Product = {
  id: "1xl-infra-channel-partner-portal",
  slug: "1xl-infra-channel-partner-portal",
  name: "1XL Infra Channel Partner Portal",
  shortDescription:
    "A portal where brokers sell 1XL Infra's Dubai whole-building investments, track commissions by tranche and request marketing material.",
  longDescription:
    "The 1XL Infra Channel Partner Portal is the partner platform of 1XL Infra, a UAE-based real estate investment and asset transformation company. 1XL Infra specialises in whole-building investments from AED 25 million, with a single-owner model.\n\nChannel partners from India, the UAE and other countries register on the portal, sign their Channel Partner Agreement online and complete KYC. They can then browse the project portfolio, book site visits for clients and request brochures, WhatsApp statuses, Instagram stories, reels and other creatives.\n\nEvery partner earns a flat 1% commission on every booking. A tranche-based engine tracks each disbursement across the sale lifecycle, from SPA signing to handover, with payment by bank transfer to the partner's registered IBAN and a full audit log.\n\nJoining is free, with no setup fees and no monthly costs.",
  tagline: "Partner with 1XL Infra.",
  category: "sales-marketing",
  subcategory: "contacts-relationships",
  primaryUseCase: "Channel partner management for Dubai real estate",
  audience: ["Real estate brokers", "Channel partners", "Property consultants"],
  platforms: ["web"],
  market: "UAE",
  status: "live",
  accent: "#1A3330",
  publisher: { name: "1XL Infra" },
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes: "Partner portal for a single developer's own inventory, not a product sold to other businesses. Home page FAQ answers were collapsed and not read.",
  },
  websiteUrl: "https://cp.infra.1xl.com/",
  appUrl: "https://cp.infra.1xl.com/register",
  featureCategories: [
    { slug: "selling", name: "Selling", description: "Projects, site visits and marketing material for partners." },
    { slug: "commissions", name: "Commissions", description: "Tranche-based tracking of every commission payout." },
    { slug: "onboarding", name: "Onboarding", description: "Registration, verification and agreement signing." },
  ],
  features: [
    {
      slug: "projects",
      name: "Projects",
      summary: "The complete portfolio with project specifications, key highlights and projected ROI.",
      category: "selling",
      body: [
        "Partners can browse 1XL Infra's portfolio with project specifications, key highlights and projected ROI. The live inventory lists residential and commercial buildings across Dubai.",
        "Listings, prices, availability, floor plans, payment plans and brochures are provided to help partners market the projects. They are for information only and may change without notice.",
      ],
      capabilities: [
        "Shows project specifications, key highlights and projected ROI.",
        "Gives access to launch-day stock and full commission breakdowns.",
        "Lets partners share a property with a client through a share link.",
      ],
      sources: ["https://cp.infra.1xl.com/", "https://cp.infra.1xl.com/login", "https://cp.infra.1xl.com/terms"],
      highlight: true,
      hasPage: false,
    },
    {
      slug: "transparent-commissions",
      name: "Transparent Commissions",
      summary: "Every tranche, every milestone, every payment visible in real time.",
      category: "commissions",
      body: [
        "Every channel partner earns a flat 1% commission on every booking. The tranche-based engine tracks each disbursement across the sale lifecycle, so partners always see where a payout stands.",
        "Commissions are paid by bank transfer to the partner's registered IBAN, with a full audit log of every disbursement.",
      ],
      capabilities: [
        "Flat 1% commission on every booking.",
        "Tracks every tranche from SPA signing to handover.",
        "Pays by bank transfer to the registered IBAN.",
        "Keeps a full audit log of every disbursement.",
      ],
      problem: "Partners chasing accounts teams to find out when they will be paid.",
      sources: ["https://cp.infra.1xl.com/", "https://cp.infra.1xl.com/login"],
      highlight: true,
      hasPage: false,
    },
    {
      slug: "marketing-material-on-demand",
      name: "Marketing Material on Demand",
      summary: "Request brochures, WhatsApp statuses, Instagram stories, reels and creatives, delivered digitally.",
      category: "selling",
      sources: ["https://cp.infra.1xl.com/"],
      highlight: true,
      hasPage: false,
    },
    {
      slug: "instant-whatsapp-and-email",
      name: "Instant WhatsApp & Email",
      summary: "Every new launch is pushed to your WhatsApp and inbox the moment it goes live.",
      category: "selling",
      sources: ["https://cp.infra.1xl.com/"],
      hasPage: false,
    },
    {
      slug: "site-visits",
      name: "Site Visits",
      summary: "Book site visits for your clients and let the 1XL Infra team handle the rest.",
      category: "selling",
      sources: ["https://cp.infra.1xl.com/"],
      hasPage: false,
    },
    {
      slug: "online-agreement-signing",
      name: "Online Agreement Signing",
      summary: "Read, sign and download your channel partner agreement in 30 seconds.",
      category: "onboarding",
      sources: ["https://cp.infra.1xl.com/", "https://cp.infra.1xl.com/terms"],
      hasPage: false,
    },
    {
      slug: "global-reach",
      name: "Global Reach",
      summary: "Built for partners in India, the UAE, the UK, China, Spain, Russia and beyond.",
      category: "onboarding",
      body: [
        "Registration starts by picking the country you sell from, and the portal opens the right form. Localized currency and multi-lingual support are listed as coming soon.",
      ],
      sources: ["https://cp.infra.1xl.com/", "https://cp.infra.1xl.com/register"],
      hasPage: false,
    },
  ],
  benefits: [
    { title: "Never chase your money", description: "A flat 1% commission on every booking, with each tranche tracked from SPA signing to handover." },
    { title: "First to your buyer", description: "New launches are pushed to your WhatsApp and inbox the moment they go live." },
    { title: "Creatives on request", description: "Ask for brochures, WhatsApp statuses, Instagram stories and reels, delivered digitally." },
    { title: "Free to join", description: "No setup fees and no monthly costs. Signup takes about 3 minutes." },
  ],
  security: [
    { title: "Encrypted sessions", description: "The portal states that sessions are encrypted." },
    { title: "Hashed passwords", description: "The portal states that passwords are stored with bcrypt." },
    { title: "Brute-force lockout", description: "The portal states that repeated failed sign-ins trigger a lockout." },
    { title: "Minimal cookies", description: "One essential cookie keeps you signed in. The portal states it uses no advertising or tracking cookies." },
  ],
  howItWorks: [
    { title: "Register", description: "Pick the country you sell from and fill in a short form. Mobile numbers are verified with a one-time password (OTP)." },
    { title: "Verify and sign", description: "Complete KYC with the documents for your country and sign your Channel Partner Agreement online." },
    { title: "Sell", description: "Share projects with clients, book site visits and request marketing material." },
    { title: "Get paid", description: "Track each commission tranche and receive payouts by bank transfer to your registered IBAN." },
  ],
  useCases: [
    { title: "Indian brokers selling Dubai property", description: "Register from India with a dedicated form and complete KYC with PAN and Aadhaar." },
    { title: "UAE-based brokers", description: "Register from the UAE and verify with Emirates ID, visa and trade licence details." },
    { title: "Placing high-value investors", description: "Bring investors to whole-building opportunities from AED 25 million, with complete asset ownership." },
  ],
  faqs: [
    { question: "What is the 1XL Infra Channel Partner Portal?", answer: "It is the channel partner platform of 1XL Infra, a UAE-based real estate investment company. Brokers use it to sell 1XL Infra's Dubai projects and track their commissions." },
    { question: "Does it cost anything to join?", answer: "No. Joining is free, with no setup fees and no monthly costs." },
    { question: "How much commission do partners earn?", answer: "The portal states a flat 1% commission on every booking. Your signed Channel Partner Agreement sets the binding rates and payment terms." },
    { question: "When do I get my commission?", answer: "Commissions are tracked by tranche across the sale lifecycle and paid by bank transfer to your registered IBAN. Payment needs completed KYC and valid bank details." },
    { question: "Do I need a RERA license?", answer: "The terms require partners to hold any licence their country requires to broker real estate, for example a RERA registration, a broker card or a trade licence." },
    { question: "How is marketing material delivered?", answer: "Brochures, WhatsApp statuses, Instagram stories, reels and creatives are requested in the portal and delivered digitally." },
  ],
  sources: [
    "https://cp.infra.1xl.com/",
    "https://cp.infra.1xl.com/login",
    "https://cp.infra.1xl.com/register",
    "https://cp.infra.1xl.com/terms",
    "https://cp.infra.1xl.com/cookies",
  ],
  lastVerified: "2026-10-10",
};
