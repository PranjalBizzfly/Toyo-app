/**
 * Content for the Careers, Vendors, Media, Press kit and Blog pages.
 *
 * Source check (2026-10-08): toyoapps.com is a single "coming soon" page with
 * no careers, vendor, press, media or blog pages, no sitemap and no public
 * email address. So nothing below is quoted from an official job listing:
 * every role overview is a neutral description of what the role does at a
 * multi-product SaaS company and is labelled as such on the page. Do not add
 * salary, experience, location, job type, benefits or dates without a source.
 */

export interface Job {
  id: string;
  title: string;
  team: string;
  overview: string;
  focus: string[];
}

export const jobs: Job[] = [
  {
    id: "sales-executive",
    title: "Sales Executive",
    team: "Sales",
    overview:
      "A Sales Executive helps businesses find the right ToyoApps products for what they need, answers questions about plans and buying, and guides customers from first conversation to purchase.",
    focus: [
      "Talking with businesses about the problems they want to solve",
      "Matching needs to products across the ToyoApps catalog",
      "Explaining product plans and how buying on ToyoApps works",
    ],
  },
  {
    id: "software-developer-coordinator",
    title: "Software Developer Coordinator",
    team: "Product & engineering",
    overview:
      "A Software Developer Coordinator keeps development work organised across several products, tracking priorities, coordinating developers and making sure what ships matches what each product needs.",
    focus: [
      "Coordinating development work across more than one product",
      "Keeping priorities, progress and hand-offs visible to the team",
      "Connecting product requirements with the developers building them",
    ],
  },
  {
    id: "email-marketing-executive",
    title: "Email Marketing Executive",
    team: "Marketing",
    overview:
      "An Email Marketing Executive plans and sends email communication about ToyoApps and its products, so businesses and software makers hear about what is relevant to them.",
    focus: [
      "Planning and writing email campaigns",
      "Organising audiences such as buyers and software makers",
      "Reviewing campaign results to improve the next send",
    ],
  },
  {
    id: "business-development-executive",
    title: "Business Development Executive",
    team: "Business development",
    overview:
      "A Business Development Executive builds new relationships for ToyoApps, with businesses that buy software and with software makers who may want to publish their products on the marketplace.",
    focus: [
      "Identifying and reaching out to potential partners and customers",
      "Introducing software makers to publishing on ToyoApps",
      "Following up on conversations and keeping relationships moving",
    ],
  },
  {
    id: "prompt-engineer",
    title: "Prompt Engineer",
    team: "Product & engineering",
    overview:
      "A Prompt Engineer designs, tests and refines the instructions given to AI models, so that AI-assisted features behave reliably and produce useful results.",
    focus: [
      "Writing and iterating on prompts for AI-assisted features",
      "Testing outputs and documenting what works",
      "Working with product and engineering on how AI is used",
    ],
  },
];

/** Generic, step-only hiring process — no timelines are promised. */
export const hiringSteps = [
  { title: "Apply", description: "Send your details and the role you're interested in through the contact page, with a short note on why the role fits you." },
  { title: "Conversation", description: "If your background matches the role, the team gets in touch to talk about the work and your experience." },
  { title: "Decision", description: "The team lets you know the outcome and, if it's a match, the next steps for joining." },
];

/** Brand colours, from the logo and the design tokens in src/app/globals.css. */
export const brandPalette = [
  { name: "Toyo Blue", hex: "#1E9CE5", use: "Logo base and brand accent" },
  { name: "Deep Toyo Blue", hex: "#0F7BBE", use: "Primary actions and links" },
  { name: "Toyo Yellow", hex: "#F5C842", use: "Logo body and highlights" },
  { name: "Toyo Green", hex: "#7BC142", use: "Logo leaves and brand gradient" },
  { name: "Leaf Green", hex: "#5FA32A", use: "Secondary accent" },
  { name: "Ink", hex: "#0F2235", use: "Text and dark surfaces" },
];
