import type { Product } from "@/content/types";

const FZ = "https://finzola.com";

export const finzola: Product = {
  id: "finzola",
  slug: "finzola",
  name: "FINZOLA",
  shortDescription:
    "A central platform for expense and petty cash management, with automated approvals and vendor oversight.",
  longDescription:
    "FINZOLA is an expense and petty cash management system. It gives an organization one central platform for its financial workflows.\n\n" +
    "Its site says it helps teams streamline those workflows, manage automated approvals and oversee vendor relationships.\n\n" +
    "An organization registers with its name, country and base currency, then sets up an admin account. Team members sign in with email and password.",
  tagline: "A platform for organization, operations, and strategy.",
  category: "finance-compliance",
  primaryUseCase: "Expense and petty cash management",
  audience: ["Finance teams", "Organization admins"],
  platforms: ["web"],
  status: "pending",
  accent: "#0A82FA",
  websiteUrl: `${FZ}/`,
  appUrl: `${FZ}/register`,
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes:
      "Site is a single landing screen plus register and login pages. No pricing, feature list, security or platform details are published. Self-serve organization registration is open.",
  },
  sources: [`${FZ}/`, `${FZ}/register`, `${FZ}/login`],
  lastVerified: "2026-10-10",
  howItWorks: [
    { title: "Register your organization", description: "Enter the organization name, country and base currency." },
    { title: "Set up the admin", description: "Create the admin account in the second step of registration." },
    { title: "Sign in", description: "Sign in with your email address and password to reach the platform." },
  ],
  benefits: [
    { title: "One central platform", description: "Financial workflows for the organization sit in one place." },
    { title: "Automated approvals", description: "Manage approvals through automated workflows." },
    { title: "Vendor oversight", description: "Keep track of vendor relationships alongside expenses." },
  ],
};
