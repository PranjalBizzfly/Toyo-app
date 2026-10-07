import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

export const hrmagix: Product = {
  id: "hrmagix",
  slug: "hrmagix",
  name: "HRMagix",
  shortDescription:
    "An all-in-one HR platform for attendance, leave, payroll, performance and the full employee lifecycle.",
  longDescription:
    "HRMagix brings people, performance and payroll into one workspace. Teams punch in with geo and selfie check-in, shifts and overtime are calculated automatically, and goals, reviews, recognition and onboarding run alongside payroll — so HR doesn't juggle separate tools.",
  tagline: "Smart HR for modern teams.",
  category: "hr-people",
  subcategory: "hrms",
  primaryUseCase: "Running HR from hire to retire",
  audience: ["HR teams", "People managers"],
  platforms: ["web"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  featured: true,
  websiteUrl: "https://hrmagix.com/",
  appUrl: "https://app.hrmagix.com/register",
  ...featureSet(
    group(
      "Modules",
      [
        ["Attendance & Shifts", "One-tap punch-in with geo and selfie, automatic shift and overtime calculation, live presence board."],
        ["Leaves & Holidays", "Leave requests, balances and holiday calendars."],
        ["Payroll", "Automated payroll in the same workspace."],
        ["Objectives & OKRs", "Aligned goals with live progress."],
        ["Recognition", "Kudos, badges and a culture wall."],
        ["Onboarding", "Bring new joiners in with a structured lifecycle."],
        ["KRA & 9-Box", "KRAs and 9-box talent maps."],
        ["1-on-1s & Meetings", "Regular check-ins between managers and reports."],
        ["PIPs & Growth", "Improvement plans and growth tracking."],
        ["Documents", "Employee documents in one place."],
        ["Succession", "Plan for key roles."],
        ["Analytics", "HR analytics across modules."],
      ],
      { highlight: 6 },
    ),
  ),
  howItWorks: [
    { title: "Add your team", description: "Bring your employees into HRMagix." },
    { title: "Switch on modules", description: "Turn on the modules you need." },
    { title: "Automate & relax", description: "Let attendance, leave and payroll run." },
  ],
  useCases: [
    { title: "Attendance for teams on the move", description: "Punch in with geo-location and a selfie, with shifts and overtime calculated automatically." },
    { title: "Performance cycles", description: "Run OKRs and KRAs, 1-on-1s, reviews and 9-box talent maps in one place." },
    { title: "Bringing new joiners in", description: "Onboard people as part of a lifecycle that continues through growth and succession." },
  ],
  solutions: ["manage-people-from-hire-to-growth"],
  sources: ["https://hrmagix.com/"],
  lastVerified: "2026-10-07",
};
