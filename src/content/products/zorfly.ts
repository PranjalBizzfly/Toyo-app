import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

export const zorfly: Product = {
  id: "zorfly",
  slug: "zorfly",
  name: "Zorfly",
  shortDescription:
    "Five-minute daily communication and grammar training for teams, with AI feedback and team analytics.",
  longDescription:
    "Zorfly gives each person one short mission a day. Learners earn XP, streaks and badges while AI explains wrong answers, and managers see weakness reports and analytics across departments — so communication quality improves without classroom sessions.",
  tagline: "Five minutes a day. Sharper comms forever.",
  category: "hr-people",
  subcategory: "learning-development",
  primaryUseCase: "Improving team writing and communication",
  audience: ["Teams", "People managers", "L&D owners"],
  platforms: ["web"],
  market: "Global",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://zorfly.com/",
  appUrl: "https://zorfly.com/signup",
  ...featureSet(
    group(
      "Your daily buzz",
      [
        ["Five-minute lessons", "One short mission a day."],
        ["AI coaching", "Explanations and recommendations when answers are wrong."],
        ["Weakness reports", "See which areas each person needs to work on."],
        ["Team analytics", "Progress across departments for managers."],
      ],
      { highlight: 4 },
    ),
    group("Level up", [
      ["XP, streaks and badges", "Progress that keeps people coming back."],
      ["Eight grammar domains", "A curated curriculum of around 250 questions."],
      ["Onboarding baseline diagnostic", "Find each learner's starting point."],
    ]),
  ),
  pricing: {
    currency: "USD",
    unit: "seat",
    trial: "7-day trial on Hive Pro",
    note: "Zorfly states that final pricing is still being confirmed.",
    asOf: "2026-10-07",
    sourceUrl: "https://zorfly.com/pricing",
    plans: [
      { name: "Solo Bee", price: "$0", description: "Free forever", features: ["Full curriculum (8 domains)", "Baseline diagnostic", "AI explanations", "XP, streaks, badges"], cta: { label: "Start free", href: "https://zorfly.com/signup" } },
      { name: "Hive Pro", price: "$9.99", period: "seat / month", description: "For teams", features: ["Everything in Solo Bee", "Team analytics + weakness reports", "Monthly domain evaluations", "Owner / admin / member roles"], cta: { label: "Start 7-day trial", href: "https://zorfly.com/signup" }, recommended: true },
      { name: "Queen Bee", price: "Custom", description: "For larger organisations", features: ["Volume seat pricing", "Higher AI quotas", "SSO / SAML on request", "Priority support"], cta: { label: "Contact sales", href: "https://zorfly.com/pricing" } },
    ],
  },
  useCases: [
    { title: "Raising writing quality across departments", description: "Give every team member one five-minute mission a day and track progress by department." },
    { title: "Finding where to start", description: "A baseline diagnostic at onboarding shows each person's weak areas." },
  ],
  faqs: [
    { question: "What does the curriculum cover?", answer: "Eight grammar domains with around 250 curated questions." },
    { question: "Is there a free plan?", answer: "Yes. Solo Bee is free forever; team features are on Hive Pro, which has a 7-day trial." },
    { question: "Is the pricing final?", answer: "Zorfly states that its final pricing is still being confirmed." },
  ],
  solutions: ["manage-people-from-hire-to-growth"],
  sources: ["https://zorfly.com/", "https://zorfly.com/pricing", "https://zorfly.com/signup"],
  lastVerified: "2026-10-07",
};
