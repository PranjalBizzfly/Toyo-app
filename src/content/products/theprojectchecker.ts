import type { Product } from "@/content/types";

/**
 * TheProjectChecker's public copy comes from its marketing pages. Home page
 * stats animate from 0 and the dashboard mock-up uses sample companies, so
 * neither is used. Integrations, changelog, careers, blog, docs and help
 * center pages say "Coming soon" and are not used as facts.
 */
const SRC = "https://theprojectchecker.com/";
const FEATURES = "https://theprojectchecker.com/features";
const PRICING = "https://theprojectchecker.com/pricing";
const FAQ = "https://theprojectchecker.com/faq";
const ABOUT = "https://theprojectchecker.com/about";
const SIGNUP = "https://app.theprojectchecker.com/signup";
const AUD = ["Super admins", "Vendor development teams", "Testing teams"];

export const theprojectchecker: Product = {
  id: "theprojectchecker",
  slug: "theprojectchecker",
  name: "TheProjectChecker",
  shortDescription:
    "Track every software project from assignment to delivery, across vendor teams, QA testing and demo approvals.",
  longDescription:
    "TheProjectChecker is a cloud SaaS platform for companies that outsource software work to several vendor teams. A Super Admin assigns projects, tracks progress, manages QA handoffs and approves deliveries in one place.\n\nVendors and testers work in their own isolated views. Vendors only see their assigned projects. Testers log defects, test each build version and approve demos before the admin gives final sign-off.\n\nEvery project moves through five phases: setup, vendor onboarding, development, testing and final approval. Email alerts go out at each key event, and a dashboard shows workload, priorities, timelines and bug trends.",
  tagline: "Manage Your Company Projects From Assignment to Delivery",
  category: "operations-it",
  primaryUseCase: "Multi-vendor software project tracking",
  audience: ["Product companies", "Agencies", "Super admins", "Vendor teams", "Testing teams"],
  platforms: ["web"],
  status: "live",
  verification: { relationship: "pending", publicSale: "confirmed" },
  accent: "#0D9488",
  websiteUrl: SRC,
  appUrl: SIGNUP,
  featureCategories: [
    { slug: "delivery", name: "Project delivery", description: "Track projects, vendors, demos and documents from setup to sign-off." },
    { slug: "quality", name: "Testing and QA", description: "Give testing teams their own workflow for builds, defects and reports." },
    { slug: "visibility", name: "Visibility", description: "Dashboards and alerts that keep every role informed." },
  ],
  features: [
    {
      slug: "project-management",
      name: "Project Management",
      summary: "Every project tracked with auto IDs, priorities, deadlines and live progress.",
      category: "delivery",
      body: [
        "Every software project is tracked with detailed fields. These run from auto-generated IDs to priority levels, deadlines and real-time progress.",
        "Stakeholders talk in threaded comments and attach files to each project.",
      ],
      capabilities: [
        "Generates project IDs automatically, such as SW-001 and SW-002.",
        "Sets priority as Critical, High, Medium or Low.",
        "Tracks status across the whole lifecycle.",
        "Shows progress as a percentage from 0 to 100.",
        "Supports threaded comments between all stakeholders.",
        "Handles file attachments and artifacts.",
      ],
      problem: "Scattered communication and no view of who is building what across many projects.",
      audience: AUD,
      relatedFeatures: ["vendor-management", "dashboard-analytics"],
      sources: [FEATURES, ABOUT],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "vendor-management",
      name: "Vendor Management",
      summary: "Onboard several development teams, each isolated to its own projects.",
      category: "delivery",
      body: [
        "Onboard and manage multiple development teams with complete isolation. Each vendor only sees the projects assigned to it.",
        "The admin creates vendor credentials and can see how work is spread across teams.",
      ],
      capabilities: [
        "Keeps vendor profiles with team size and specialisation.",
        "Gives each vendor team an isolated dashboard.",
        "Lets the admin create vendor credentials.",
        "Shows workload distribution across vendors.",
        "Tracks performance and quality scores.",
        "Monitors on-time delivery rate.",
      ],
      audience: ["Super admins", "Vendor development teams"],
      relatedFeatures: ["project-management", "notification-system"],
      sources: [FEATURES],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "testing-qa-management",
      name: "Testing & QA Management",
      summary: "A module for testers to handle builds, defects and version-wise panel reports.",
      category: "quality",
      body: [
        "A dedicated module lets the testing team manage build receipts, testing workflows, defect logging and version-wise panel reports.",
      ],
      capabilities: [
        "Acknowledges receipt of builds and documents.",
        "Sets testing status as In Testing, Pending or Completed.",
        "Logs defect counts per project and per version.",
        "Produces panel-wise test reports for admin, website and org panels.",
        "Manages versions for every tested build.",
        "Links each project to an external bug tracker such as Jira or Mantis.",
      ],
      problem: "Demos reaching sign-off without being tested.",
      audience: ["Testing teams", "Super admins"],
      relatedFeatures: ["demo-document-management"],
      sources: [FEATURES, FAQ, PRICING],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "demo-document-management",
      name: "Demo & Document Management",
      summary: "Versioned demo URLs with QA and admin approval, plus project documents and meeting requests.",
      category: "delivery",
      body: [
        "Each project can hold several versioned demo URLs. A tester approves the demo first, then the admin gives final sign-off.",
        "Projects also hold their documents, a meeting request system and a Q&A thread.",
      ],
      capabilities: [
        "Holds multiple versioned demo URLs per project.",
        "Requires tester QA approval before admin sign-off.",
        "Keeps demo history with timestamps.",
        "Stores project documents such as SOPs and wireframes.",
        "Handles meeting requests with an agenda and time slots.",
        "Gives each project its own Q&A thread.",
      ],
      audience: AUD,
      relatedFeatures: ["testing-qa-management", "project-management"],
      sources: [FEATURES],
      hasPage: true,
    },
    {
      slug: "dashboard-analytics",
      name: "Dashboard & Analytics",
      summary: "A Super Admin dashboard with overview cards, workload charts, priority board and timelines.",
      category: "visibility",
      body: [
        "The Super Admin dashboard brings overview cards, workload charts, a priority board, timeline views and an activity feed together.",
      ],
      capabilities: [
        "Shows overview cards for total, in-progress, completed and overdue projects.",
        "Charts vendor workload with a status breakdown.",
        "Offers a Kanban-style priority board.",
        "Shows a Gantt chart and calendar timeline.",
        "Tracks bug density and resolution rate.",
        "Exports to PDF and CSV.",
      ],
      audience: ["Super admins"],
      relatedFeatures: ["project-management", "vendor-management"],
      sources: [FEATURES],
      highlight: true,
      hasPage: true,
    },
    {
      slug: "notification-system",
      name: "Notification System",
      summary: "Automatic emails at every key event for admins, vendors and testers.",
      category: "visibility",
      body: [
        "Automated email notifications go out at every important event, so admins, vendors and testers stay informed.",
      ],
      capabilities: [
        "Alerts admins to status updates, demo submissions and bugs.",
        "Alerts vendors to new assignments, comments and QA feedback.",
        "Alerts testers to new demos and fixes ready for retest.",
        "Sends deadline reminders 3 days and 1 day before.",
        "Notifies about overdue projects.",
        "Alerts on priority changes.",
      ],
      audience: AUD,
      relatedFeatures: ["dashboard-analytics"],
      sources: [FEATURES],
      hasPage: true,
    },
  ],
  benefits: [
    { title: "Centralised control", description: "One platform for every software project, vendor team and testing cycle, instead of scattered spreadsheets and emails." },
    { title: "Complete visibility", description: "Real-time dashboards show project status, vendor workloads, bug counts and delivery timelines." },
    { title: "Built-in security", description: "Vendors only see their projects and testers only access testing data." },
    { title: "Streamlined workflows", description: "A five-phase lifecycle from setup to final approval, with automatic alerts at every checkpoint." },
  ],
  howItWorks: [
    { title: "Project setup", description: "The admin creates the project, uploads documents and assigns a vendor and testing team." },
    { title: "Vendor onboarding", description: "The vendor reviews the documents, requests meetings if needed and starts development." },
    { title: "Development", description: "The vendor builds the software, updates progress and submits a demo when ready." },
    { title: "Testing & QA", description: "The tester validates the demo and reports bugs with severity. The vendor fixes them." },
    { title: "Final approval", description: "The admin reviews QA reports and gives final sign-off." },
  ],
  security: [
    { title: "Role-based access", description: "JWT sign-in with role-based access control. Each vendor and tester only sees assigned projects." },
    { title: "Encrypted passwords", description: "TheProjectChecker states that passwords are encrypted." },
    { title: "HTTPS everywhere", description: "The site states HTTPS everywhere and encryption in transit." },
    { title: "Daily backups", description: "TheProjectChecker states daily database backups." },
  ],
  useCases: [
    { title: "Many projects, many vendors", description: "Assign and track dozens of projects across several outsourced development teams." },
    { title: "Agencies with client projects", description: "Run several client projects with separate vendor and testing teams." },
    { title: "QA before sign-off", description: "Make sure every demo is tested and approved by QA before the admin accepts it." },
  ],
  pricing: {
    currency: "USD",
    trial: "Pro and Business include a 14-day free trial, Enterprise a 30-day trial. No credit card required.",
    note: "Yearly billing saves about 17%.",
    asOf: "2026-10-10",
    sourceUrl: PRICING,
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Try the full workflow on one project.",
        features: ["1 active project", "1 dev team and 1 testing team", "Up to 5 users", "Full handoff and QA workflow", "External bug tracker links (Jira, Mantis)", "Email notifications", "Community support"],
        cta: { label: "Get started free", href: SIGNUP },
      },
      {
        name: "Pro",
        price: "$29",
        period: "month",
        description: "For small teams and agencies running several client projects.",
        features: ["Up to 10 active projects", "Up to 6 vendor or testing teams", "Up to 10 users", "Daily summary email reports", "Project mentors", "Audit log (90 days)", "Email support, 24h SLA"],
        cta: { label: "Start free trial", href: SIGNUP },
        recommended: true,
      },
      {
        name: "Business",
        price: "$79",
        period: "month",
        description: "For product companies managing several vendors in parallel.",
        features: ["Up to 50 active projects", "Up to 20 vendor or testing teams", "Up to 30 users", "Unlimited project mentors", "Audit log (365 days)", "Bulk operations", "Priority email and chat support, 8h SLA"],
        cta: { label: "Start free trial", href: SIGNUP },
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "Custom limits, dedicated support and procurement-friendly billing.",
        features: ["Unlimited projects, teams and users", "Custom data retention", "Dedicated customer success manager", "Custom contract and NET-30 invoicing", "Phone support, 4h SLA"],
        cta: { label: "Contact sales", href: "https://theprojectchecker.com/contact?subject=custom_plan" },
      },
    ],
  },
  faqs: [
    { question: "What is TheProjectChecker?", answer: "A cloud platform to manage software projects, vendor teams and testing workflows in one place, from assignment to delivery." },
    { question: "How does the free trial work?", answer: "Pro and Business have a 14-day free trial and Enterprise a 30-day trial. No credit card is needed. The Free plan is free forever." },
    { question: "Can I switch plans later?", answer: "Yes. Upgrades apply at once. Downgrades take effect at the next billing cycle." },
    { question: "How are vendor and testing teams counted?", answer: "Each vendor or testing team counts as one company, whatever its size. Only its lead takes a user slot." },
    { question: "Is my data secure?", answer: "TheProjectChecker uses JWT sign-in with role-based access, encrypted passwords, HTTPS everywhere and daily database backups." },
    { question: "What integrations are supported?", answer: "You can link an external bug tracker such as Jira, Mantis or a spreadsheet to each project. Custom integrations are on Enterprise." },
    { question: "Is on-premise deployment available?", answer: "Yes. On-premise or private-cloud deployment is available on the Enterprise plan." },
  ],
  sources: [SRC, FEATURES, PRICING, FAQ, ABOUT, "https://theprojectchecker.com/privacy", "https://theprojectchecker.com/terms"],
  lastVerified: "2026-10-10",
};
