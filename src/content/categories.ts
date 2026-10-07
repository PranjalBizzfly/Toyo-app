import type { Category } from "./types";

/**
 * Product categories, derived from the audited product inventory
 * (docs/TOYOAPPS_PRODUCT_TAXONOMY.md). Grouped by the buyer's business
 * function. A product has one primary category and may be listed in up to
 * two more via `secondaryCategories`.
 *
 * A category is indexed and shown in menus only when it lists ≥ 2 public
 * products (see `isCategoryIndexable` in lib/catalog).
 */
export const categories: Category[] = [
  {
    slug: "sales-marketing",
    name: "Sales & Marketing",
    tagline: "Win customers, plan campaigns and keep every relationship",
    description:
      "Software for the teams that find customers and grow the brand — from capturing contacts at an event to planning a launch and keeping creative assets organised.",
    icon: "megaphone",
    order: 10,
    status: "live",
    subcategories: [
      { slug: "contacts-relationships", name: "Contacts & relationships" },
      { slug: "marketing-planning", name: "Marketing planning" },
      { slug: "creative-operations", name: "Creative operations" },
    ],
  },
  {
    slug: "hr-people",
    name: "HR & People",
    tagline: "Run the employee lifecycle, from attendance to growth",
    description:
      "Software for HR teams and people managers — managing attendance, leave, payroll and performance, understanding how work gets done, and building skills.",
    icon: "users",
    order: 20,
    status: "live",
    subcategories: [
      { slug: "hrms", name: "HR management" },
      { slug: "workforce-analytics", name: "Workforce analytics & time tracking" },
      { slug: "learning-development", name: "Learning & development" },
    ],
  },
  {
    slug: "operations-it",
    name: "Operations & IT",
    tagline: "Keep the office, devices and admin running smoothly",
    description:
      "Software for office admins, operations managers and IT teams — handling internal requests, company devices, fleets and Google Workspace administration.",
    icon: "building",
    order: 30,
    status: "live",
    subcategories: [
      { slug: "workplace-operations", name: "Workplace operations" },
      { slug: "it-administration", name: "IT administration" },
      { slug: "telecom-devices", name: "Telecom & device management" },
      { slug: "fleet-logistics", name: "Fleet & logistics" },
    ],
  },
  {
    slug: "finance-compliance",
    name: "Finance & Compliance",
    tagline: "Stay on top of statutory deadlines and client work",
    description:
      "Software for accounting practices and finance teams that carry statutory obligations for themselves and their clients.",
    icon: "wallet",
    order: 40,
    status: "live",
    subcategories: [{ slug: "practice-management", name: "Practice management & compliance" }],
  },
  {
    slug: "insights-research",
    name: "Insights & Research",
    tagline: "Turn information into decisions you can defend",
    description:
      "Software that turns raw information — markets, meetings and team activity — into reports and decisions.",
    icon: "chart",
    order: 50,
    status: "live",
    subcategories: [
      { slug: "market-research", name: "Market research" },
      { slug: "meeting-intelligence", name: "Meeting intelligence" },
    ],
  },
];
