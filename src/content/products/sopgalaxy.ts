import type { Product } from "@/content/types";

const HOME = "https://sopgalaxy.com/";
const SIGNUP = "https://app.sopgalaxy.com/signup";

/**
 * SOPGalaxy's public site is a single landing page. Its headline stats
 * (40%, 10x, 100%, 3x) and named testimonials cannot be verified and are not
 * used. Its FAQ mentions "Team" plans that do not appear in the pricing table,
 * so plan-specific claims from the FAQ (SCIM, support response times) are left out.
 */
export const sopgalaxy: Product = {
  id: "sopgalaxy",
  slug: "sopgalaxy",
  name: "SOPGalaxy",
  shortDescription:
    "Write, approve, train on and audit standard operating procedures in one shared workspace, with AI help.",
  longDescription:
    "SOPGalaxy is a shared workspace for standard operating procedures (SOPs). It aims to replace wikis, training spreadsheets, approval email threads and audit folders with one platform.\n\nYou can paste a meeting transcript, drop in an email thread or start from a template. The AI, powered by Anthropic Claude, turns it into a clean SOP with steps, owners, due dates and references, ready for review.\n\nDrafts go through approval steps you set up, with e-signatures and full version history. Published SOPs can become training plans with quizzes and skill tracking. Audit logs, sign-offs and corrective actions keep a paper trail for auditors, and engagement dashboards show which procedures are read and finished.",
  tagline: "Turn Tribal Knowledge Into Scalable Processes",
  category: "operations-it",
  secondaryCategories: ["hr-people"],
  subcategory: "workplace-operations",
  primaryUseCase: "SOP authoring, approval, training and audit",
  audience: ["Operations leaders", "Quality and compliance teams", "People and training teams"],
  platforms: ["web"],
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  websiteUrl: HOME,
  appUrl: SIGNUP,
  accent: "#002349",
  featureCategories: [
    { slug: "authoring", name: "Authoring", description: "Create and edit SOPs together, with AI doing the heavy lifting." },
    { slug: "control", name: "Control and compliance", description: "Approvals, versions and audit trails for every procedure." },
    { slug: "training", name: "Training and insights", description: "Turn SOPs into training and see what gets followed." },
  ],
  features: [
    {
      slug: "ai-assisted-authoring",
      name: "AI-Assisted Authoring",
      summary: "Draft procedures in minutes from transcripts, email threads, messy docs or templates.",
      category: "authoring",
      body: [
        "Paste a meeting transcript, drop in an email thread or start from a template. SOPGalaxy turns it into a clean SOP with steps, owners, due dates and references, ready for review.",
        "The AI is powered by Anthropic Claude. SOPGalaxy says your content is used only for your request and never used to train models.",
      ],
      capabilities: [
        "Structures rough input into clean steps.",
        "Adds owners, due dates and references to each SOP.",
        "Tidies up messy docs, fills in gaps and rewrites for clarity.",
        "Starts from a template when you have no source material.",
      ],
      problem: "Process knowledge stuck in people's heads, meetings and email threads.",
      howItWorks: [
        "Paste a transcript, drop in a doc or pick a template.",
        "The AI organises it into steps with owners, due dates and references.",
        "Review the draft and send it for approval.",
      ],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "versioning-and-approvals",
      name: "Versioning & Approvals",
      summary: "Every change is tracked, and drafts go through approval steps you set up your way.",
      category: "control",
      body: [
        "Every change to an SOP is tracked. Drafts go through approval steps you configure, reviewers sign with e-signatures, and the SOP is published once everyone has signed off.",
      ],
      capabilities: [
        "Tracks every change with version history.",
        "Lets you set up your own approval steps.",
        "Captures e-signatures from reviewers.",
        "Publishes an SOP once all reviewers sign off.",
      ],
      problem: "SOP approvals lost in email threads with no clear record of who agreed to what.",
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "real-time-collaboration",
      name: "Real-Time Collaboration",
      summary: "Work together with mentions, comments and live cursors.",
      category: "authoring",
      body: ["Authors and reviewers work on SOPs together with mentions, comments and live cursors, without endless review rounds."],
      sources: [HOME],
      hasPage: false,
    },
    {
      slug: "training-and-assessments",
      name: "Training & Assessments",
      summary: "Turn SOPs into training plans with quizzes and skill tracking.",
      category: "training",
      body: [
        "SOPs can be turned into training plans. You assign them by team, add quizzes and track skills, so you can see who knows what, and when.",
      ],
      capabilities: [
        "Builds training plans from SOPs.",
        "Adds quizzes to check understanding.",
        "Tracks skills by team.",
      ],
      problem: "New starters learning procedures in the wrong order, or not at all.",
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "audit-ready-compliance",
      name: "Audit-Ready Compliance",
      summary: "Audit logs, sign-offs and corrective actions give auditors a clean paper trail.",
      category: "control",
      body: [
        "Audit logs, sign-offs, version history and read receipts mean the paper trail is already in place when an audit comes. Corrective actions are recorded too.",
      ],
      capabilities: [
        "Keeps audit logs of reads and edits.",
        "Records sign-offs and read receipts.",
        "Tracks corrective actions.",
      ],
      sources: [HOME],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "insights-and-gamification",
      name: "Insights & Gamification",
      summary: "Engagement dashboards, badges and challenges keep teams finishing their procedures.",
      category: "training",
      body: ["Engagement dashboards show which SOPs are read, finished and improved. Badges and challenges encourage teams to complete them."],
      sources: [HOME],
      hasPage: false,
    },
  ],
  howItWorks: [
    { title: "Capture", description: "Import existing docs, dictate from a meeting or start from a template." },
    { title: "AI structure", description: "Claude organises your content into clean steps with owners, due dates and references." },
    { title: "Approve", description: "Send to reviewers, capture e-signatures and publish once everyone has signed off." },
    { title: "Train", description: "Assign training plans, add quizzes and track skills by team." },
    { title: "Improve", description: "Engagement dashboards show what works, what does not and what to fix next." },
  ],
  benefits: [
    { title: "Faster onboarding", description: "New starters get the right SOPs in the right order, with built-in training plans." },
    { title: "Audit-ready by default", description: "Sign-offs, version history and read receipts put the paper trail in place before the audit." },
    { title: "No more doc graveyard", description: "Reminders, owners and review cycles keep procedures alive instead of buried in a wiki." },
    { title: "See what gets followed", description: "Engagement dashboards show which SOPs are read, finished and improved." },
  ],
  useCases: [
    { title: "Manufacturing", description: "Industry templates, role libraries and compliance presets for production teams." },
    { title: "Healthcare", description: "Industry templates, role libraries and compliance presets for care teams." },
    { title: "Financial services", description: "Industry templates, role libraries and compliance presets for regulated finance teams." },
    { title: "Logistics", description: "Industry templates, role libraries and compliance presets for logistics operations." },
    { title: "Food and beverage", description: "Industry templates, role libraries and compliance presets for food businesses." },
    { title: "Education", description: "Industry templates, role libraries and compliance presets for schools." },
  ],
  security: [
    { title: "Encryption", description: "SOPGalaxy states data is encrypted in transit with TLS 1.3 and at rest with AES-256." },
    { title: "Access control", description: "Role-based access by SOP and folder, with SSO." },
    { title: "Audit logs", description: "Every read and edit is logged." },
    { title: "AI data use", description: "Content sent to the AI is used only for your request and never used to train models." },
  ],
  pricing: {
    currency: "USD",
    unit: "user / month",
    note: "Every plan includes SOP Suggestions, with up to 5 active suggestions per user in the review queue at a time.",
    asOf: "2026-10-10",
    sourceUrl: HOME + "#pricing",
    plans: [
      { name: "Starter", price: "$6", period: "user / month", description: "For growing teams that need AI authoring and version control.", features: ["Up to 15 users", "Up to 100 SOPs", "5,000 AI tokens", "Version control", "Basic workflows", "Email support", "Standard templates"], cta: { label: "Get started", href: SIGNUP + "?plan=starter" } },
      { name: "Business", price: "$20", period: "user / month", description: "For larger organisations with franchise and SSO needs.", features: ["Up to 200 users", "Up to 2,000 SOPs", "100,000 AI tokens", "Franchise management", "Knowledge base", "Competency matrix", "Advanced analytics", "API access", "SSO integration", "Dedicated support", "Custom branding"], cta: { label: "Get started", href: SIGNUP + "?plan=business" }, recommended: true },
      { name: "Enterprise", price: "Custom", description: "For regulated or large enterprises with deep compliance needs.", features: ["On-premise deployment", "Custom integrations", "SLA guarantee", "Dedicated account manager", "White-label option", "Advanced security and compliance", "Custom training"], cta: { label: "Talk to sales", href: "/contact-us?type=sales&product=sopgalaxy" } },
    ],
  },
  faqs: [
    { question: "What does SOPGalaxy replace?", answer: "Wikis, Word and PDF SOPs scattered across drives, training spreadsheets, approval email threads and audit binders. Everything sits in one workspace." },
    { question: "How does the AI authoring work?", answer: "Paste a meeting transcript, a messy doc or rough bullet points. SOPGalaxy structures it into an SOP with steps, owners, due dates and references. It is powered by Anthropic Claude, and your content is never used to train models." },
    { question: "Can I import my existing SOPs?", answer: "Yes. Upload Word, PDF, Google Docs or Confluence pages one at a time or in bulk. The AI tidies formatting, structures the steps and flags missing owners or dates." },
    { question: "Is there a mobile app?", answer: "Yes. SOPGalaxy says native iOS and Android apps let teams read SOPs, complete training and acknowledge sign-offs. The web app also works on tablets and laptops." },
    { question: "Which tools does it integrate with?", answer: "The site lists Slack, Microsoft Teams, Google Workspace, Microsoft 365, Okta and Azure AD for SSO, Zapier, a REST API and webhooks." },
    { question: "Can I cancel and export my data?", answer: "Yes. There are no contracts or cancellation fees. You can export SOPs, versions, audit logs and training records as JSON, CSV or PDF, and data stays available for 90 days after cancelling." },
  ],
  sources: [HOME, SIGNUP],
  lastVerified: "2026-10-10",
};
