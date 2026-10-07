import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

export const zapbuzzer: Product = {
  id: "zapbuzzer",
  slug: "zapbuzzer",
  name: "ZapBuzzer",
  shortDescription:
    "One-tap internal requests for offices — coffee, prints, IT help and facilities routed to the right team, with SLAs and escalation.",
  longDescription:
    "ZapBuzzer replaces chase calls inside an office. Staff tap what they need, the right support team is notified, and the first person to accept owns the request while a timer runs. SLAs escalate missed requests, and analytics show how quickly each team responds.",
  tagline: "Stop calling the pantry boy three times for one coffee.",
  category: "operations-it",
  subcategory: "workplace-operations",
  primaryUseCase: "Internal office requests",
  audience: ["Office managers", "Facilities teams", "Front desk & support staff"],
  platforms: ["web", "android"],
  market: "India",
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: "https://zapbuzzer.com/",
  appUrl: "https://zapbuzzer.com/signup",
  ...featureSet(
    group(
      "Features",
      [
        ["Pantry catalogue", "Tea, coffee and snacks ordered with one tap."],
        ["Print room", "Print requests routed to whoever runs the printers."],
        ["IT & facilities", "IT help and facilities fixes in the same flow."],
        ["First-accept wins", "The first free person to accept owns the request."],
        ["SLA & escalation", "Missed requests escalate automatically."],
        ["Multi-channel", "Notifications by app, email, Telegram and WhatsApp."],
        ["Analytics + scorecard", "Response times and performance per team."],
        ["Roles & audit log", "Who can do what, and a record of what happened."],
      ],
      { highlight: 6 },
    ),
  ),
  howItWorks: [
    { title: "Tap what you need", description: "Pick the request from the catalogue." },
    { title: "Right team gets pinged", description: "The request goes to the team that handles it." },
    { title: "First to accept owns it", description: "Delivered with a timer running." },
  ],
  integrations: ["telegram", "whatsapp"],
  pricing: {
    currency: "INR",
    unit: "seat",
    trial: "14-day free trial, no credit card",
    asOf: "2026-10-07",
    sourceUrl: "https://zapbuzzer.com/#pricing",
    plans: [
      { name: "Free", price: "Free", description: "Try it with one floor", features: ["Up to 10 staff", "1 location", "Mobile + web app", "Email notifications"], cta: { label: "Start free", href: "https://zapbuzzer.com/signup" } },
      { name: "Pro", price: "₹99", period: "seat / month", description: "For growing offices", features: ["Unlimited staff", "Multi-location", "Telegram + WhatsApp pings", "SLA + escalation", "Full analytics"], cta: { label: "Start trial", href: "https://zapbuzzer.com/signup?plan=pro" }, recommended: true },
      { name: "Enterprise", price: "Custom", description: "For groups & facility companies", features: ["SSO + SAML", "White-label + custom domain", "REST API + webhooks", "On-prem option"], cta: { label: "Contact sales", href: "https://zapbuzzer.com/#contact" } },
    ],
  },
  useCases: [
    { title: "Pantry and refreshments", description: "Order tea, coffee or lunch for a meeting with one tap instead of calling around." },
    { title: "Print jobs", description: "Send a print request to whoever runs the printers, with a timer running." },
    { title: "Facilities and IT fixes", description: "Report an AC problem or a display that won't connect, and see who picked it up." },
    { title: "Reception and couriers", description: "Arrange courier pickups through the same request flow." },
  ],
  faqs: [
    { question: "Is there a mobile app?", answer: "Yes, an Android app for accepting and tracking requests on the move." },
    { question: "How are support teams notified?", answer: "Through the app and email, and on the Pro plan through Telegram and WhatsApp." },
    { question: "Is there a free trial?", answer: "Yes — 14 days, with no credit card." },
  ],
  solutions: ["run-a-well-organised-office"],
  sources: ["https://zapbuzzer.com/"],
  lastVerified: "2026-10-07",
};
