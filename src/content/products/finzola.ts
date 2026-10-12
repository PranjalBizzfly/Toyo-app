import type { Product } from "@/content/types";

const FZ = "https://finzola.com";

export const finzola: Product = {
  id: "finzola",
  slug: "finzola",
  name: "FINZOLA",
  shortDescription:
    "An expense and petty cash management system with automated approvals and vendor oversight.",
  longDescription:
    "FINZOLA is an expense and petty cash management system. Its site describes it as a centralized enterprise platform for an organization's financial workflows.\n\n" +
    "The site says it helps streamline those workflows, manage automated approvals and oversee vendor relationships.\n\n" +
    "An organization registers with its name, country and base currency, then continues to admin setup. Users sign in with email address and password.",
  tagline: "A platform for organization, operations, and strategy.",
  category: "finance-and-compliance",
  primaryUseCase: "Expense and petty cash management",
  platforms: ["web"],
  status: "pending",
  accent: "#0A82FA",
  websiteUrl: `${FZ}/`,
  appUrl: `${FZ}/register`,
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes:
      "Site has one landing screen plus register and login pages. The product type comes from the site meta description. Paths such as pricing, features, about, terms, privacy, faq, docs and help show a not found page. No pricing, feature list, security, audience or customer details are published. The second registration step (admin setup) was not reached, so its fields are not verified. Self-serve organization registration is open. No web app manifest or public JSON marketing data was found, and no contact or support page is published.",
  },
  sources: [`${FZ}/`, `${FZ}/landing`, `${FZ}/register`, `${FZ}/login`],
  lastVerified: "2026-10-12",
  featureCategories: [
    {
      slug: "finance",
      name: "Finance",
      description: "Expenses, petty cash, workflows, approvals and vendors, as named on the FINZOLA site.",
      body: [
        "FINZOLA describes itself as an expense and petty cash management system, and as a centralized enterprise platform for an organization's financial workflows, automated approvals and vendor relationships.",
        "The site names these areas but does not describe how each one works. The pages in this group explain each area in general terms and state only what FINZOLA confirms.",
      ],
    },
    { slug: "setup", name: "Setup", description: "Registering an organization and signing in." },
  ],
  features: [
    {
      slug: "organisation-registration-and-base-currency",
      name: "Organisation registration and base currency",
      summary: "Register an organization with its name, country and base currency, then continue to admin setup.",
      category: "setup",
      body: [
        "FINZOLA has open, self-serve organization registration. The first step asks for the organization name, the country and a base currency. The second step is admin setup.",
        "Once registered, users sign in with an email address and password. The fields of the admin setup step are not shown publicly, so they are not described here.",
      ],
      howItWorks: [
        "Choose Register Organization on the FINZOLA home page.",
        "Enter the organization name, country and base currency.",
        "Continue to admin setup, the second step of registration.",
        "Sign in with your email address and password.",
      ],
      sources: [`${FZ}/landing`, `${FZ}/register`, `${FZ}/login`],
      hasPage: true,
    },
    {
      slug: "expense-management",
      name: "Expense management",
      summary: "FINZOLA names expense management as part of what it does.",
      category: "finance",
      evidence: "listed",
      body: [
        "Expense management software records what staff spend on behalf of a business, so the spending can be checked, approved and accounted for in one place rather than through scattered receipts and spreadsheets.",
        "FINZOLA describes itself in its site meta description as an Expense and Petty Cash Management System. The site does not publish further detail on how expenses are recorded.",
      ],
      capabilities: ["Named in the site description: Expense and Petty Cash Management System."],
      sources: [`${FZ}/landing`],
      hasPage: true,
    },
    {
      slug: "petty-cash-management",
      name: "Petty cash management",
      summary: "FINZOLA names petty cash management as part of what it does.",
      category: "finance",
      evidence: "listed",
      body: [
        "Petty cash is the small float of money a business keeps for minor day-to-day costs. Petty cash tools track what is issued, what is spent and what is left, so the float can be reconciled.",
        "FINZOLA names petty cash management in its site meta description, alongside expenses. The site does not publish further detail on how petty cash is handled.",
      ],
      capabilities: ["Named in the site description: Expense and Petty Cash Management System."],
      sources: [`${FZ}/landing`],
      hasPage: true,
    },
    {
      slug: "financial-workflows",
      name: "Financial workflows",
      summary: "FINZOLA says it helps streamline an organization's financial workflows.",
      category: "finance",
      evidence: "listed",
      body: [
        "Financial workflows are the routine steps money matters pass through in an organization, such as submitting, reviewing and recording a cost. Running them on one platform helps teams follow the same steps each time.",
        "The FINZOLA home page says it provides a centralized enterprise platform to streamline your organization's financial workflows. It does not list which workflows are covered.",
      ],
      capabilities: ["The home page says it streamlines an organization's financial workflows on a centralized platform."],
      sources: [`${FZ}/landing`],
      hasPage: true,
    },
    {
      slug: "automated-approvals",
      name: "Automated approvals",
      summary: "FINZOLA says it helps manage automated approvals.",
      category: "finance",
      evidence: "listed",
      body: [
        "Automated approvals send a request, such as an expense claim, to the right person for sign-off without manual chasing. Teams use them to keep spending checked and to speed up routine decisions.",
        "The FINZOLA home page says the platform lets you manage automated approvals. It does not describe approval rules, levels or limits.",
      ],
      capabilities: ["The home page says it lets you manage automated approvals."],
      sources: [`${FZ}/landing`],
      hasPage: true,
    },
    {
      slug: "vendor-management",
      name: "Vendor management",
      summary: "FINZOLA says it helps oversee vendor relationships.",
      category: "finance",
      evidence: "listed",
      body: [
        "Vendor management keeps a business's suppliers and its dealings with them in one place, so teams can see who they buy from and keep each relationship in order.",
        "The FINZOLA home page says the platform helps you oversee vendor relationships. It does not describe which vendor details or tools are included.",
      ],
      capabilities: ["The home page says it helps you oversee vendor relationships."],
      sources: [`${FZ}/landing`],
      hasPage: true,
    },
  ],
  howItWorks: [
    { title: "Register your organization", description: "Enter the organization name, country and base currency." },
    { title: "Set up the admin", description: "Continue to admin setup, the second step of registration." },
    { title: "Sign in", description: "Sign in with your email address and password." },
  ],
  benefits: [
    { title: "One central platform", description: "A centralized enterprise platform for the organization's financial workflows." },
    { title: "Automated approvals", description: "Manage automated approvals in one place." },
    { title: "Vendor oversight", description: "Oversee vendor relationships from the same platform." },
  ],
};
