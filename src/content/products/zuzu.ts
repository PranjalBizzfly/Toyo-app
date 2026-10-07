import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

/** Source copy was read from ZUZU's public JS bundle — see the source map. */
export const zuzu: Product = {
  id: "zuzu",
  slug: "zuzu",
  name: "ZUZU",
  shortDescription:
    "Time tracking and activity insight for teams on Windows — a desktop agent captures the workday privately, and AI writes the reports.",
  longDescription:
    "ZUZU pairs a Windows desktop agent with an admin and manager portal. Activity is captured on the device with private content redacted before anything leaves it, and managers get AI-written daily and periodic reports, activity heatmaps and alerts — scoped by permission.",
  tagline: "Know how the workday actually went.",
  category: "hr-people",
  secondaryCategories: ["insights-research"],
  subcategory: "workforce-analytics",
  primaryUseCase: "Understanding how team time is spent",
  audience: ["Admins", "Team managers"],
  platforms: ["windows", "web"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://usezuzu.com/",
  appUrl: "https://usezuzu.com/trial",
  publisher: { name: "Bizzfly Business Automation" },
  ...featureSet(
    group(
      "Capture",
      [
        ["Windows desktop agent", "Captures activity on the employee's device."],
        ["On-device privacy redaction", "Private regions and passwords are painted out before upload."],
        ["Activity heatmap", "See when work happens across the day."],
      ],
      { highlight: 2 },
    ),
    group(
      "Reporting",
      [
        ["AI daily reports", "Reports already written for each day."],
        ["AI executive summary", "Highlights for leadership."],
        ["Team summary emails", "Weekly and monthly summaries by email."],
        ["Ask in plain language", "Ask questions about team activity."],
      ],
      { highlight: 2 },
    ),
    group("Oversight", [
      ["Manager workspace", "Managers see only the people they're responsible for."],
      ["Anomaly and agent alerts", "Alerts for unusual activity, or if the agent is stopped or removed."],
      ["Audit trail", "A record of admin actions, exportable to CSV."],
      ["Holidays & schedules", "Working days and schedules per team."],
    ]),
  ),
  connections: [{ product: "hrmagix", description: "ZUZU lists an attendance sync with HRMagix." }],
  useCases: [
    { title: "Daily reporting without writing reports", description: "Managers get AI-written daily reports and summaries instead of chasing status updates." },
    { title: "Spotting problems early", description: "Alerts flag unusual activity, or an agent that has been stopped or removed." },
  ],
  faqs: [
    { question: "Which computers does ZUZU support?", answer: "The desktop agent runs on Windows only; there is no macOS or Linux build." },
    { question: "How does ZUZU handle private content?", answer: "Private regions and passwords are painted out on the device before anything is uploaded." },
    { question: "Is there a free trial?", answer: "Yes — a 7-day trial for up to 10 employees, with no card required." },
  ],
  solutions: ["manage-people-from-hire-to-growth"],
  sources: ["https://usezuzu.com/"],
  lastVerified: "2026-10-07",
};
