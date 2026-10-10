import type { Product } from "@/content/types";

/**
 * DRAFT: the portal host (cp.rentwithzeal.com) did not resolve on 2026-10-10.
 * Copy below comes only from the public channel partner page and terms on
 * rentwithzeal.com. Keep as draft until the portal itself can be checked.
 */

const RWZ = "https://rentwithzeal.com";

export const rentwithzealPartnerPortal: Product = {
  id: "zeal-partner-program",
  slug: "zeal-partner-program",
  name: "Zeal Partner Program",
  shortDescription:
    "The channel partner portal for Zeal, a UAE property and rental management company. Details of the portal are pending verification.",
  longDescription:
    "Zeal runs a partner program for brokers, agencies, consultants and individual referrers in the UAE. Partners refer property owners who need management, or tenants who need a space, and earn a commission when the deal closes.\n\n" +
    "Partners register with a form on the Zeal website. Zeal states that applications are reviewed within 2 business days. Commission is paid as agreed in the channel partner agreement.",
  category: "sales-marketing",
  primaryUseCase: "Channel partner referrals for property management and leasing",
  audience: ["Real estate brokers", "Agencies", "Consultants and advisors", "Individual referrers"],
  platforms: ["web"],
  market: "UAE",
  status: "pending",
  websiteUrl: "https://cp.rentwithzeal.com",
  publisher: { name: "Zeal Property & Rental Management (Dubai, UAE)" },
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes:
      "cp.rentwithzeal.com did not resolve (DNS) on 2026-10-10, so the portal itself was not seen. Content is from the public channel partner page and terms on rentwithzeal.com. No commission rates or pricing are published.",
  },
  howItWorks: [
    { title: "Register", description: "Fill in the partner registration form on the Zeal website." },
    { title: "Get approved", description: "Zeal states applications are reviewed within 2 business days." },
    { title: "Refer", description: "Share owner or tenant leads with Zeal." },
    { title: "Earn", description: "Receive commission after each successful deal." },
  ],
  benefits: [
    { title: "Two ways to earn", description: "Refer a property owner and earn when they sign with Zeal. Refer a tenant and earn when they move in." },
    { title: "One point of contact", description: "Partners work with a dedicated partnerships manager from registration onwards." },
    { title: "Clear payouts", description: "Zeal states commission structures and payout schedules are defined and visible to partners." },
  ],
  faqs: [
    { question: "Who can become a channel partner?", answer: "Brokers, agencies, consultants and individual referrers. The form also offers an \"Other\" partner type." },
    { question: "What can I refer?", answer: "Property owners who need management, and tenants looking for Amber bed spaces or Azure offices and showrooms." },
    { question: "How is commission paid?", answer: "Only as agreed in the channel partner agreement. Partners may not make promises on behalf of Zeal." },
  ],
  sources: [
    `${RWZ}/`,
    `${RWZ}/channel-partner/`,
    `${RWZ}/about-us/`,
    `${RWZ}/terms-and-condition/`,
  ],
  lastVerified: "2026-10-10",
};
