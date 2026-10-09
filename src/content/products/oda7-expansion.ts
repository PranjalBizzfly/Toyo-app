import type { ProductResource, ProductSolution, ProductSupportTopic } from "@/content/types";

/**
 * ODA7 expansion — role solutions, module workflow guides, sales-lifecycle
 * guides, guided role tours and support topics. Written from the official
 * site oda7-website.vercel.app (crawled 9 Oct 2026): its /product/:slug module
 * pages, /solutions/:slug role pages, the home lifecycle and "context travels"
 * sections, the guided product tour, the FAQ and the contact/planning cards.
 *
 * Excluded on purpose, as on the main ODA7 file: every performance figure,
 * certification badge, mock person/company and the "free access" / "24-hour
 * migration" offers. The site labels its previews illustrative and asks that
 * capability, telephony and integrations be confirmed with ODA7 during scoping.
 */
const SITE = "https://oda7-website.vercel.app/";
const S = [SITE];

const CONFIRM = "The ODA7 site presents this workflow with illustrative previews; exact capability, telephony and integration requirements are confirmed with ODA7 during scoping.";

/* ------------------------------------------------------------------ */
/* Solutions by role (/solutions/:slug on the source)                  */
/* ------------------------------------------------------------------ */

export const roleSolutions: ProductSolution[] = [
  {
    slug: "for-sales-reps",
    name: "ODA7 for sales reps",
    summary: "One place for a rep to work leads, calls, scripts, follow-ups and quotes, from assigned lead to a clear next action.",
    problem: "Reps lose time and context when the lead list, the dialer, the script, the follow-up reminder and the quote tool are all separate. Every switch means re-reading the lead before the conversation can move on.",
    body: [
      "ODA7's sales workspace is built for the person working the queue. The assigned lead, the calling controls, the conversation guidance and the next step sit in one view, so the rep does not have to rebuild context between tools.",
      "The aim is simple: every lead a rep touches should leave the conversation with a recorded outcome and an owned next action: a follow-up, a sequence step or a quote.",
    ],
    approach: [
      "Work an assigned, prioritized queue instead of picking leads by hand",
      "Call from the workspace with the lead's context and the script beside the call",
      "Record the outcome as part of the call, not as a separate logging task",
      "Turn the result into a follow-up, a sequence enrolment or a quote",
    ],
    workflow: ["Find the next lead", "Start the conversation", "Capture the outcome", "Move the opportunity forward"],
    benefits: ["Less tool switching during the working day", "Clearer ownership of every lead", "Follow-up that stays connected to the conversation"],
    audience: ["SDRs", "Inside sales reps", "Account executives"],
    features: ["lead-distribution", "integrated-dialer", "dynamic-sales-scripts", "automated-sequences", "quotes-and-proposals", "sales-dashboard"],
    faqs: [
      { question: "Which parts of ODA7 does a sales rep use day to day?", answer: "The sales workspace: leads, the dialer and calls, scripts, the shared inbox, the calendar, sequences and quotes, plus the rep's own dashboard." },
      { question: "Does the rep still log calls manually?", answer: "ODA7 is designed so the call outcome is captured in the workflow and becomes the next action, rather than being typed up afterwards." },
    ],
    sources: S,
  },
  {
    slug: "for-sales-managers",
    name: "ODA7 for sales managers & floor supervisors",
    summary: "See the floor, coach in the moment and improve the system: team activity, queue ownership and performance in one manager view.",
    problem: "Managers usually find out what happened on the floor from reports built after the fact. By then the moment to coach a call or rebalance a queue has passed.",
    body: [
      "ODA7 gives managers a live view of the floor instead of a weekly spreadsheet. Team activity, calls, queue ownership and performance use the same data the reps work in, so what a manager sees is what is happening now.",
      "Because coaching context is attached to the work, a manager can move from spotting friction to helping on a specific call or lead, then check whether the change made a difference.",
    ],
    approach: [
      "Watch queue load, waiting leads and agent availability from one floor view",
      "Use agent states to see who is on a call, in wrap-up or available",
      "Listen in or whisper to a rep during a live call",
      "Review team pacing and conversion against benchmarks in the manager scorecard",
    ],
    workflow: ["Monitor activity", "Spot problems", "Coach with context", "Review the improvement"],
    benefits: ["A live view of the floor", "Coaching focused on real conversations", "Visible accountability for every queue"],
    audience: ["Sales managers", "Floor supervisors", "Team leads"],
    features: ["floor-queue-monitor", "agent-status-grid", "manager-scorecard", "call-history-recordings", "call-heatmaps"],
    faqs: [
      { question: "What can managers see in ODA7?", answer: "Manager views focus on team activity, calls, queue ownership, performance context and coaching workflows. What each manager can access is shaped by their role and the workspace configuration." },
    ],
    sources: S,
  },
  {
    slug: "for-marketing-teams",
    name: "ODA7 for marketing teams",
    summary: "Connect campaign activity to lead movement: sources, assignments and outcomes stay linked from the first response onward.",
    problem: "Campaign reports stop at the click when lead ownership and sales outcomes live in another system. Marketing can see interest arrive but not what sales did with it.",
    body: [
      "In ODA7 a campaign does not end at lead capture. The source and message stay attached to every lead it creates, the lead is routed into an owned sales workflow, and the outcome is visible back to the team that ran the campaign.",
      "That gives marketing a cleaner handoff to sales and a way to review what a campaign actually produced beyond the first response.",
    ],
    approach: [
      "Keep the campaign source attached to each lead it generates",
      "Route interested leads into an owned sales queue",
      "Follow up through sequences across the channels ODA7 brings together",
      "Review downstream movement for each campaign",
    ],
    workflow: ["Launch the campaign", "Capture interest", "Route to sales", "Review movement"],
    benefits: ["Source context on every lead", "Cleaner handoffs to sales", "Outcome visibility beyond the click"],
    audience: ["Growth marketers", "Demand generation teams"],
    features: ["lead-distribution", "lead-management", "automated-sequences", "predictive-lead-scoring", "conversion-telemetry"],
    sources: S,
  },
  {
    slug: "for-operations-teams",
    name: "ODA7 for operations teams",
    summary: "Connect people, attendance and productivity, and run the operations behind the sales floor without rebuilding them in spreadsheets.",
    problem: "Team structures, attendance records and compensation inputs are often kept in separate sheets, so every review means stitching data together by hand.",
    body: [
      "ODA7 treats people and operations as part of the same workspace as sales. Teams and departments, attendance, compensation and productivity are connected, so operations can review them without assembling them first.",
      "The goal is repeatable operations: the same structure and the same data every review cycle, rather than a new spreadsheet each month.",
    ],
    approach: [
      "Structure the organization into teams, departments and pods",
      "Review attendance and availability alongside the operating workflow",
      "Connect closed-won activity to incentives and payroll preparation",
      "Understand productivity from the same data the floor works in",
    ],
    workflow: ["Structure teams", "Review attendance", "Connect compensation", "Understand productivity"],
    benefits: ["Shared people context across teams", "Repeatable operating reviews", "Faster review cycles"],
    audience: ["Operations managers", "Revenue operations"],
    features: ["team-hierarchy", "attendance", "leave-management", "commission-engine", "payroll", "executive-dashboard"],
    sources: S,
  },
  {
    slug: "for-hr-and-people-teams",
    name: "ODA7 for HR & people teams",
    summary: "Make people operations part of the workspace: teams, departments, onboarding, leave and attendance in one visible flow.",
    problem: "When onboarding, leave and attendance sit outside the sales workspace, HR decisions and floor operations drift apart; a rep can be on leave while leads still route to them.",
    body: [
      "ODA7 brings people operations into the same place the work happens. HR can organize people into teams and departments, onboard new joiners consistently, and keep leave and attendance visible to the operation that depends on them.",
      "Because availability is shared with the floor, approved leave can feed straight into how work is routed, instead of being a separate record nobody on the floor sees.",
    ],
    approach: [
      "Organize people into teams, departments and reporting lines",
      "Run consistent onboarding with structured workflows",
      "Track attendance and clock-in/out tied to shift availability",
      "Handle leave requests and approvals with queues re-routed during absence",
    ],
    workflow: ["Organize people", "Onboard consistently", "Track availability", "Support the team"],
    benefits: ["A clear organizational structure", "Visible attendance", "Connected onboarding"],
    audience: ["HR teams", "People operations"],
    features: ["team-hierarchy", "onboarding-workflows", "attendance", "leave-management", "payslips"],
    sources: S,
  },
  {
    slug: "for-business-leadership",
    name: "ODA7 for business leadership",
    summary: "Turn activity into a clearer picture of the business: analytics, performance and operating detail for better decisions.",
    problem: "Leadership often sees results without the operating detail behind them, and different teams report the same numbers with different definitions.",
    body: [
      "ODA7's leadership view builds on the same activity data the floor produces. Analytics, heatmaps and executive dashboards use shared definitions, so leaders can move from a headline number to the movement behind it.",
      "The site also shows AI that explains the numbers inside the workflow, to help leaders find bottlenecks before deciding what to change.",
    ],
    approach: [
      "Review performance in executive dashboards built on live activity",
      "Look at timing patterns with hour-by-hour heatmaps",
      "Drill into conversion by source, team and queue",
      "Ask questions of the data with AI-assisted explanations",
    ],
    workflow: ["Review performance", "Understand movement", "Find bottlenecks", "Decide the next action"],
    benefits: ["Cross-team visibility", "Shared definitions across teams", "Clear context for decisions"],
    audience: ["Founders", "Sales and revenue leaders", "Executives"],
    features: ["executive-dashboard", "call-heatmaps", "conversion-telemetry", "explain-my-numbers", "scheduled-bi-reports"],
    sources: S,
  },
];

/* ------------------------------------------------------------------ */
/* Resources: module guides, lifecycle guides, role tours, overviews   */
/* ------------------------------------------------------------------ */

type ModuleSpec = {
  slug: string;
  module: string;
  eyebrow: string;
  headline: string;
  intro: string;
  problem: string;
  solution: string;
  steps: [string, string][];
  points: [string, string][];
  scenario: string;
  features: string[];
};

const MODULES: ModuleSpec[] = [
  {
    slug: "leads-workflow",
    module: "Leads",
    eyebrow: "Sales workspace",
    headline: "Turn every lead into a next action",
    intro: "Capture, qualify, assign and follow every opportunity from one shared view.",
    problem: "Lead context is easily lost when capture, ownership, calls and follow-ups live in separate tools.",
    solution: "ODA7 keeps the lead record, the assigned agent, the conversation history and the next action connected.",
    steps: [
      ["Capture", "A lead arrives from a website form, an ad or an inbound webhook and is recorded with its source."],
      ["Qualify", "The lead gets the context the team needs before anyone calls: source, details and fit."],
      ["Assign", "It moves into the right agent's queue, so ownership is clear from the start."],
      ["Follow up", "Calls, notes and reminders attach to the same record as the work continues."],
      ["Convert", "The opportunity moves forward with its full history visible to the next person involved."],
    ],
    points: [
      ["Clear ownership", "Everyone can see who owns the lead and what should happen next."],
      ["Shared timeline", "Calls, notes, status changes and follow-ups stay together on one record."],
      ["Manager visibility", "Managers review queue health without asking for a manual report."],
    ],
    scenario: "A website enquiry enters ODA7, is given context, moves into the correct agent's queue and stays visible through every follow-up.",
    features: ["lead-distribution", "lead-management", "predictive-lead-scoring", "company-hierarchy"],
  },
  {
    slug: "dialer-workflow",
    module: "Dialer",
    eyebrow: "Calling workspace",
    headline: "Give every conversation the context it needs",
    intro: "Bring the lead, calling controls, scripts and follow-up action into one focused agent workspace.",
    problem: "Standalone calling tools make agents switch screens and reconstruct context during the conversation.",
    solution: "ODA7 places the call inside the sales workflow, so activity and outcomes stay connected to the lead.",
    steps: [
      ["Select lead", "The agent takes the next lead from an assigned, ordered queue."],
      ["Review context", "Before dialing, the lead's details and history are on screen."],
      ["Start call", "The call starts from the same workspace, with the script alongside."],
      ["Record outcome", "The result of the call is captured as part of the workflow."],
      ["Set next action", "The outcome becomes an owned follow-up rather than a note to remember."],
    ],
    points: [
      ["Focused queue", "Agents move through assigned conversations with less tool switching."],
      ["Contextual scripts", "The right conversation guidance sits beside the call."],
      ["Outcome capture", "Every call result turns into an accountable next step."],
    ],
    scenario: "An agent opens the next assigned lead, reviews the context, starts the call and schedules the follow-up without leaving the workspace.",
    features: ["integrated-dialer", "voicemail-drop", "dynamic-sales-scripts", "web-callbacks-ivr"],
  },
  {
    slug: "calls-workflow",
    module: "Calls",
    eyebrow: "Conversation activity",
    headline: "Make every call part of the bigger picture",
    intro: "Keep call activity, outcomes and coaching context visible to agents and managers.",
    problem: "Call logs become dead records when they are cut off from ownership, coaching and pipeline progress.",
    solution: "ODA7 connects call activity to the lead, the agent, the manager's view and the next workflow state.",
    steps: [
      ["Connect", "The call is placed or received inside the workspace."],
      ["Converse", "The conversation happens with the lead's context available."],
      ["Capture", "Activity and outcome are recorded against the lead and the agent."],
      ["Coach", "Managers review the call in the context of team performance."],
      ["Continue", "The outcome carries into the next action on the lead."],
    ],
    points: [
      ["Activity history", "Agents and managers can review what happened on a lead and when."],
      ["Manager context", "Call activity is seen as part of team performance, not in isolation."],
      ["Follow-up continuity", "The call outcome carries straight into the next action."],
    ],
    scenario: "A completed call updates the lead's timeline and gives the manager enough context to coach the next interaction.",
    features: ["call-history-recordings", "post-call-summaries", "manager-scorecard"],
  },
  {
    slug: "inbox-workflow",
    module: "Inbox",
    eyebrow: "Shared conversations",
    headline: "Keep conversations organized around ownership",
    intro: "Bring customer messages and team responsibility into one shared inbox you can act on.",
    problem: "Messages scattered across channels make it hard to know who should respond and what has already happened.",
    solution: "ODA7 ties each conversation to the customer's context, an owner and a follow-up workflow.",
    steps: [
      ["Receive", "A message arrives in the shared inbox."],
      ["Identify", "It is matched to the customer record it belongs to."],
      ["Assign", "An owner is made responsible for the reply."],
      ["Respond", "The owner answers with the customer's history in view."],
      ["Resolve", "The conversation moves into the right next workflow or closes."],
    ],
    points: [
      ["Shared context", "Messages stay close to the customer record."],
      ["Visible ownership", "The whole team can see who is responsible for a reply."],
      ["Follow-up that gets done", "Conversations move into the right next workflow instead of sitting unread."],
    ],
    scenario: "A customer reply lands in the shared inbox, is assigned to the account owner and becomes a visible follow-up task.",
    features: ["unified-inbox", "whatsapp-business-messaging", "two-way-sms", "email-tracking"],
  },
  {
    slug: "calendar-workflow",
    module: "Calendar",
    eyebrow: "Coordinated follow-up",
    headline: "Make the next commitment visible",
    intro: "Coordinate calls, follow-ups and team activity without separating the schedule from the work.",
    problem: "Meetings and follow-ups become unreliable when scheduling is detached from lead and team context.",
    solution: "ODA7 keeps calendar activity connected to owners, records and workflow states.",
    steps: [
      ["Plan", "A follow-up or meeting is created from the work it belongs to."],
      ["Assign", "It has an owner on the team."],
      ["Remind", "The owner is reminded before the commitment is due."],
      ["Complete", "The event is completed and its outcome recorded."],
      ["Review", "Managers can review what was planned and what happened."],
    ],
    points: [
      ["Contextual events", "Every event shows which record and outcome it belongs to."],
      ["Team coordination", "Activity is visible across agents and managers."],
      ["Follow-up discipline", "Future actions are visible before they are missed."],
    ],
    scenario: "A follow-up created after a call appears in the agent's schedule and stays visible to the manager.",
    features: ["calendar-scheduler", "automated-sequences"],
  },
  {
    slug: "campaigns-workflow",
    module: "Campaigns",
    eyebrow: "Marketing to sales",
    headline: "Connect every campaign to the work it creates",
    intro: "Keep campaign activity, incoming leads and conversion context in one shared flow.",
    problem: "Campaign reporting loses meaning when lead ownership and sales outcomes live somewhere else.",
    solution: "ODA7 connects campaign activity with leads, assignments and what happens to them afterwards.",
    steps: [
      ["Create", "The campaign is set up with its source and message."],
      ["Launch", "It goes live and starts generating interest."],
      ["Capture", "Responses become leads that keep the campaign's source."],
      ["Route", "Each lead moves into an owned sales workflow."],
      ["Review", "The team reviews what the campaign created beyond the click."],
    ],
    points: [
      ["Campaign context", "Source and message stay connected to every lead."],
      ["Lead handoff", "Interest moves into an owned sales workflow."],
      ["Outcome visibility", "Teams see what a campaign produced, not only the response."],
    ],
    scenario: "A campaign generates interest, routes the lead to sales and keeps the original source visible through every follow-up.",
    features: ["lead-distribution", "automated-sequences", "conversion-telemetry", "template-studio"],
  },
  {
    slug: "products-workflow",
    module: "Products",
    eyebrow: "Products and pricing",
    headline: "Keep the offer close to the opportunity",
    intro: "Organize product information so agents can move from interest to a relevant sales conversation.",
    problem: "Product information becomes inconsistent when it is maintained outside the sales workflow.",
    solution: "ODA7 gives teams one shared product and pricing reference for leads, scripts and quotes.",
    steps: [
      ["Organize", "Products and pricing are kept in one catalog."],
      ["Match", "The agent identifies the product relevant to the lead."],
      ["Present", "The conversation uses the connected script for that offer."],
      ["Quote", "The chosen product carries into the quote."],
      ["Review", "The team reviews which offers move opportunities forward."],
    ],
    points: [
      ["Shared catalog", "One product reference for the whole team."],
      ["Sales context", "Products connect to opportunities and scripts."],
      ["Quote continuity", "The chosen offer carries into the quote."],
    ],
    scenario: "An agent identifies the relevant product, uses the connected script and prepares the right quote.",
    features: ["product-catalog", "quotes-and-proposals", "dynamic-sales-scripts"],
  },
  {
    slug: "scripts-workflow",
    module: "Scripts",
    eyebrow: "Conversation guidance",
    headline: "Turn good conversations into repeatable practice",
    intro: "Give agents structured guidance without disconnecting the script from the customer's context.",
    problem: "Static scripts are hard to use when they sit outside the live calling workflow.",
    solution: "ODA7 places reusable conversation guidance beside the lead and the call.",
    steps: [
      ["Prepare", "The team writes guidance for a type of conversation."],
      ["Guide", "Agents follow it beside the live call."],
      ["Adapt", "Branches handle the different ways a conversation can go."],
      ["Capture", "Outcomes are recorded against the guidance used."],
      ["Improve", "Managers use those outcomes to refine the script."],
    ],
    points: [
      ["Reusable guidance", "Every agent starts from a consistent conversation path."],
      ["Context beside the call", "Less searching while the customer is on the line."],
      ["Coaching feedback", "Outcomes feed back into better guidance."],
    ],
    scenario: "A new agent follows a structured conversation path while a manager reviews the outcomes and improves the guidance.",
    features: ["dynamic-sales-scripts", "objection-buster", "onboarding-workflows"],
  },
  {
    slug: "sequences-workflow",
    module: "Sequences",
    eyebrow: "Follow-up workflow",
    headline: "Keep momentum after the first conversation",
    intro: "Organize repeatable follow-up steps around ownership, timing and lead context.",
    problem: "Follow-ups are missed when they depend on memory or disconnected reminders.",
    solution: "ODA7 turns follow-up into a visible sequence of owned actions.",
    steps: [
      ["Define", "The team sets out the follow-up steps and their timing."],
      ["Enroll", "A qualified lead is added to the sequence."],
      ["Execute", "Each step is carried out by its owner."],
      ["Respond", "Replies come back into the lead's workflow."],
      ["Advance", "The lead moves on when the sequence has done its job."],
    ],
    points: [
      ["Repeatable steps", "A standard follow-up rhythm for the whole team."],
      ["Visible progress", "Everyone knows which action is complete and which is waiting."],
      ["Connected response", "Replies return to the lead instead of a separate inbox."],
    ],
    scenario: "A qualified lead enters a follow-up sequence, and every completed or pending action stays visible to the team.",
    features: ["automated-sequences", "whatsapp-business-messaging", "two-way-sms", "email-tracking"],
  },
  {
    slug: "quotes-workflow",
    module: "Quotes",
    eyebrow: "Commercial workflow",
    headline: "Move from conversation to a clear proposal",
    intro: "Create and track quotes without losing the lead, product and ownership context behind them.",
    problem: "Deals slow down when quotes are prepared outside the deal workflow.",
    solution: "ODA7 keeps product selection, the quote's state and the follow-up connected to the lead.",
    steps: [
      ["Select", "The agent picks the relevant products from the catalog."],
      ["Prepare", "The quote is built from those products and prices."],
      ["Review", "It is checked before it goes to the customer."],
      ["Share", "The quote is sent and its status tracked."],
      ["Advance", "The next action after sharing is owned and visible."],
    ],
    points: [
      ["Connected products", "Quotes are built from the relevant products and prices."],
      ["Visible status", "The team knows where each quote sits in the workflow."],
      ["Owned follow-up", "The next action after sharing stays clear."],
    ],
    scenario: "An agent turns a qualified conversation into a quote, and the manager can see its state and next action.",
    features: ["quotes-and-proposals", "product-catalog"],
  },
];

const moduleGuides: ProductResource[] = MODULES.map((m) => ({
  slug: m.slug,
  type: "guide",
  name: `The ${m.module} workflow in ODA7`,
  summary: `${m.headline}. ${m.intro}`,
  body: [
    `${m.module} sits in ODA7's ${m.eyebrow.toLowerCase()} area. ${m.intro} The team can see what changed, who owns the next action and how the workflow continues.`,
    `The problem it addresses: ${m.problem.charAt(0).toLowerCase()}${m.problem.slice(1)} ${m.solution}`,
    `In practice: ${m.scenario.charAt(0).toLowerCase()}${m.scenario.slice(1)}`,
  ],
  steps: m.steps.map(([t, d]) => `${t}: ${d}`),
  keyPoints: m.points.map(([t, d]) => `${t}: ${d}`),
  features: m.features,
  faqs: [{ question: `Is the ${m.module} workflow available in every ODA7 plan?`, answer: "ODA7 shapes plans around team size, modules and platform needs, and states that no entitlement is implied until it is confirmed in an ODA7 proposal. Confirm module availability during scoping." }],
  sources: S,
}));

type StageSpec = { slug: string; n: number; name: string; summary: string; body: string[]; steps: string[]; points: string[]; features: string[] };

const STAGES: StageSpec[] = [
  {
    slug: "lifecycle-lead-ingestion",
    n: 1,
    name: "Lead ingestion & the priority queue",
    summary: "How new leads from forms, ads and webhooks are tagged, de-duplicated and queued before a rep ever sees them.",
    body: [
      "The first stage of ODA7's sales lifecycle is getting a lead into the right queue cleanly. Web forms, Facebook Ads and inbound webhooks feed one qualification and assignment pipeline.",
      "Each lead is tagged with its source, checked against existing records, and ordered by timezone and likelihood to close. Because the queue is ranked by the system, reps work the next best lead rather than cherry-picking.",
    ],
    steps: ["A lead arrives from a web form, Facebook Ads or an inbound webhook", "Its UTM source tags (campaign tracking codes) are attached to the record", "Duplicate checks stop an existing prospect from being treated as new", "The lead is ranked by timezone and closing likelihood", "It lands in an owned queue, ready to work"],
    points: ["One pipeline for every lead source", "Source context travels with the lead", "Automatic ordering instead of cherry-picking"],
    features: ["lead-distribution", "lead-management", "predictive-lead-scoring", "webhooks"],
  },
  {
    slug: "lifecycle-calling",
    n: 2,
    name: "Calling from the browser",
    summary: "How reps call leads from a browser softphone with local presence numbers and one-click voicemail drop.",
    body: [
      "Stage two is the call itself. ODA7 describes an in-browser softphone, so reps dial from the same workspace that holds the lead instead of a separate phone system.",
      "Local presence numbers match the caller ID to the lead's area, and a pre-recorded voicemail can be dropped in one click when nobody answers, so the rep moves straight to the next lead.",
    ],
    steps: ["Open the next lead from the queue", "Dial from the browser softphone", "A local presence number is used as caller ID", "If the call goes to voicemail, drop a recorded message in one click", "Move to the next lead"],
    points: ["Calling inside the sales workspace", "Local presence caller ID", "One-click voicemail drop to save time"],
    features: ["integrated-dialer", "voicemail-drop", "call-history-recordings"],
  },
  {
    slug: "lifecycle-live-scripting",
    n: 3,
    name: "Live scripting & objection battlecards",
    summary: "How branching scripts and on-call battlecards guide reps through objections and required disclosures.",
    body: [
      "Stage three supports the conversation while it happens. Branching scripts guide the rep through the call, including the disclosures a team must say.",
      "When a prospect raises a price, timing or competitor objection, ODA7 shows a ready response on the call view, so the rep has an answer in the moment rather than after the call.",
    ],
    steps: ["The rep follows the branching script for this type of call", "Required disclosures are part of the script", "The prospect raises an objection", "A battlecard with a suggested response appears on the call view", "The rep continues down the matching branch"],
    points: ["Branching scripts for different conversation paths", "Compliance disclosures built into the script", "Battlecards for price, timing and competitor objections"],
    features: ["dynamic-sales-scripts", "objection-buster", "ai-copilot"],
  },
  {
    slug: "lifecycle-omnichannel-follow-up",
    n: 4,
    name: "Follow-up across WhatsApp, SMS & email",
    summary: "How follow-ups on WhatsApp, SMS and email land in one timeline on the lead, with approved templates and read tracking.",
    body: [
      "Stage four keeps the conversation going after the call. ODA7 brings the official WhatsApp Business API, SMS and email into one timeline on the lead.",
      "Messages use approved templates and show read status, so the rep and the manager can both see what was sent and whether it was seen.",
    ],
    steps: ["After the call, choose the follow-up channel", "Send an approved WhatsApp, SMS or email template", "Read status is tracked on the message", "Replies arrive in the same lead timeline", "The next action is set from the reply"],
    points: ["WhatsApp, SMS and email in one lead timeline", "Approved message templates", "Read tracking on outbound messages"],
    features: ["whatsapp-business-messaging", "two-way-sms", "email-tracking", "unified-inbox", "template-studio"],
  },
  {
    slug: "lifecycle-quotes",
    n: 5,
    name: "Quotes & proposals",
    summary: "How a rep builds a quote from the catalog, applies approved discounts and tracks the proposal to signature.",
    body: [
      "Stage five turns a qualified conversation into a commercial proposal. The rep selects products from the shared catalog and applies discount tiers the business has already approved.",
      "The proposal goes out as a link; ODA7 notifies the rep when it is opened and tracks the e-signature, so the next step is clear without chasing.",
    ],
    steps: ["Select products from the catalog", "Apply a pre-approved discount tier", "Send the proposal as a link", "Get notified when the customer opens it", "Track the e-signature through to close"],
    points: ["Quotes built from one product catalog", "Discounts limited to approved tiers", "Open and signature tracking on proposals"],
    features: ["quotes-and-proposals", "product-catalog"],
  },
  {
    slug: "lifecycle-commission-payroll",
    n: 6,
    name: "Automated commission & payroll",
    summary: "How a closed-won deal flows into a commission credit and an itemized payslip without month-end spreadsheets.",
    body: [
      "The last stage connects sales results to pay. When a deal is marked closed-won, ODA7 calculates the rep's commission under the configured rules and credits it to their earnings.",
      "At payroll time the commission sits alongside base pay and other components, and an itemized payslip is generated, replacing the month-end spreadsheet reconciliation many teams rely on.",
    ],
    steps: ["A deal is marked closed-won", "Commission is calculated under the configured tier, flat or accelerator rules", "The amount is credited to the rep's earnings", "Payroll brings together base pay, commission and other components", "An itemized payslip is generated"],
    points: ["Commission calculated at the moment of close", "Tiered, flat and accelerator rules", "Itemized payslips without spreadsheet reconciliation"],
    features: ["commission-engine", "quota-accelerators", "payroll", "payslips"],
  },
];

const lifecycleGuides: ProductResource[] = STAGES.map((s) => ({
  slug: s.slug,
  type: "guide",
  name: `Sales lifecycle, stage ${s.n}: ${s.name}`,
  summary: s.summary,
  body: [...s.body, `This is stage ${s.n} of the six-stage lifecycle ODA7 describes, from first contact to commission, run from one workspace rather than several tools. ${CONFIRM}`],
  steps: s.steps,
  keyPoints: s.points,
  features: s.features,
  sources: S,
}));

type TourSpec = { slug: string; role: string; summary: string; body: string; steps: string[]; points: string[]; features: string[] };

const TOURS: TourSpec[] = [
  {
    slug: "tour-sales-rep",
    role: "Sales rep / inside sales SDR",
    summary: "A four-step walk through a rep's day in ODA7: a lead arrives, the call, live AI support, and the follow-up.",
    body: "The ODA7 guided tour shows the product from four points of view. For a sales rep, the tour follows one lead from the moment it arrives to the follow-up after the call.",
    steps: ["Lead arrival: a new lead enters the prioritized queue", "The call: dialing from the browser softphone with a local caller ID", "Live speech AI: objection support appears while the prospect is talking", "Follow-up: a WhatsApp summary is sent and the deal stage moves on"],
    points: ["The rep never leaves one workspace", "AI support appears during the call, not after it", "The follow-up is part of finishing the call"],
    features: ["lead-distribution", "integrated-dialer", "objection-buster", "whatsapp-business-messaging"],
  },
  {
    slug: "tour-floor-supervisor",
    role: "Floor supervisor",
    summary: "A four-step walk through a supervisor's view: the roster, live activity, floor performance and stepping into a call.",
    body: "For a floor supervisor, the guided tour moves from who is working right now to stepping in on a live call when a rep needs help.",
    steps: ["Team roster: a live grid of agent availability", "Live activity: current queue volume across the floor", "Floor performance: progress against quota and an hourly pickup heatmap", "Supervisor action: silently listen to a call or whisper to the rep"],
    points: ["Live view of the floor instead of end-of-day reports", "Performance and timing patterns in one place", "Coaching during the call itself"],
    features: ["agent-status-grid", "floor-queue-monitor", "call-heatmaps", "manager-scorecard"],
  },
  {
    slug: "tour-ops-payroll-admin",
    role: "Operations & payroll admin",
    summary: "A four-step walk through people operations: the roster, verified attendance, automated payroll and payslips.",
    body: "For operations and payroll administrators, the guided tour follows the path from organizing people to paying them.",
    steps: ["People roster: teams, shift setup and skill rules", "Attendance: location-verified shift clock-ins", "Automated payroll: commission from closed-won deals is calculated", "Payslip reports: itemized payslips are produced"],
    points: ["Roster, attendance and pay in one flow", "Commission arrives from sales data, not re-entry", "Payslips without a separate payroll spreadsheet"],
    features: ["team-hierarchy", "attendance", "payroll", "payslips"],
  },
  {
    slug: "tour-platform-executive",
    role: "Platform executive",
    summary: "A four-step walk through the Super Admin layer: organizations, plans and licences, platform revenue and governance.",
    body: "For people running ODA7 as a platform, the guided tour covers the separate Super Admin layer above individual workspaces.",
    steps: ["Organizations: the tenant organizations on the platform", "Plans & licences: seats, telephony trunks and recording storage per plan", "Platform revenue: recurring revenue across tenants", "Governance & security: IP allow-listing, custom domains and SSO domains"],
    points: ["A separate administrative layer above workspaces", "Plans that cover seats, telephony and storage", "Platform-wide security controls"],
    features: ["multi-tenant-organizations", "saas-plans", "platform-revenue", "ip-blocker", "white-labeling"],
  },
];

const roleTours: ProductResource[] = TOURS.map((t) => ({
  slug: t.slug,
  type: "tutorial",
  name: `Guided tour: ODA7 for the ${t.role.toLowerCase()}`,
  summary: t.summary,
  body: [t.body, CONFIRM],
  steps: t.steps,
  keyPoints: t.points,
  features: t.features,
  sources: S,
}));

const overviews: ProductResource[] = [
  {
    slug: "how-context-travels",
    type: "article",
    name: "How context travels through ODA7",
    summary: "Follow one opportunity from arrival to leadership review, and see how sales, people and performance share the same data.",
    body: [
      "ODA7's central idea is that leads, calling, team structure, attendance, compensation and analytics share the same data instead of living in unrelated tools. The site shows this as one opportunity moving through the business.",
      "At each step a different team picks the work up (reps, managers, operations, finance and leadership), but they all look at the same underlying record, so nothing has to be re-entered or reconciled.",
    ],
    steps: [
      "The opportunity enters ODA7: its source, qualification and owner are visible",
      "The conversation happens with context: the lead, the script and the calling view together",
      "Team structure stays connected to activity: managers, teams, departments and attendance",
      "Performance connects to recognition and pay: salary, payroll, incentives and contests",
      "The pattern becomes visible to leadership: analytics, heatmaps and executive views",
    ],
    keyPoints: ["One record from first contact to leadership review", "Every team sees the same workflow state", "Pay and recognition follow from the same activity data"],
    features: ["lead-distribution", "integrated-dialer", "team-hierarchy", "commission-engine", "executive-dashboard"],
    faqs: [{ question: "How is ODA7 different from a traditional CRM or a standalone dialer?", answer: "ODA7 is presented as a connected business workspace: leads, calling, team structure, attendance, compensation and analytics share the same data instead of being separate tools." }],
    sources: S,
  },
  {
    slug: "people-ops-to-payroll",
    type: "article",
    name: "From shift clock-in to payroll run",
    summary: "How ODA7 links attendance, the live roster, closed deals, commission and the monthly payroll into one chain.",
    body: [
      "ODA7 connects people operations to sales results as one chain of events. A verified shift clock-in puts an agent on the live roster; the deals that agent closes feed commission; and commission feeds the payroll run.",
      "Because each link uses the same data, operations and finance work from what actually happened on the floor rather than rebuilding it at month end.",
    ],
    steps: [
      "The agent clocks in with a location-verified shift punch",
      "They appear on the verified live floor roster",
      "A deal they work is marked closed-won",
      "Their commission tier is calculated immediately",
      "The amount is included in the end-of-month payroll run",
    ],
    keyPoints: ["Attendance and sales activity in one chain", "Commission calculated as deals close", "Payroll built from recorded activity"],
    features: ["attendance", "agent-status-grid", "commission-engine", "payroll", "payslips"],
    sources: S,
  },
];

export const oda7Resources: ProductResource[] = [...overviews, ...moduleGuides, ...lifecycleGuides, ...roleTours];

/* ------------------------------------------------------------------ */
/* Support topics (FAQ and planning cards on the source)               */
/* ------------------------------------------------------------------ */

export const moreSupportTopics: ProductSupportTopic[] = [
  {
    slug: "ai-assisted-features",
    name: "Understanding ODA7's AI-assisted features",
    summary: "What the AI features do in the workflow, and what to confirm with ODA7 before relying on them.",
    body: [
      "The ODA7 site shows AI suggestions and explanations inside the workflow, for example objection support during calls, post-call summaries, suggested next steps and plain-language explanations of the numbers.",
      "ODA7 itself notes that its interactive previews are illustrative, and that capability, availability and data requirements should be confirmed during product scoping.",
    ],
    steps: ["List the AI features your team wants to use", "Note the data each one would need (calls, messages, CRM history)", "Ask ODA7 which are available for your plan and region", "Confirm data requirements and how outputs are reviewed", "Pilot with one team before rolling out"],
    keyPoints: ["AI suggestions appear inside the workflow", "Previews on the site are illustrative", "Availability and data needs are confirmed in scoping"],
    features: ["ai-copilot", "objection-buster", "post-call-summaries", "ai-recommendations", "explain-my-numbers"],
    sources: S,
  },
  {
    slug: "manager-views-and-access",
    name: "What managers can see and do",
    summary: "The manager views in ODA7 and how role and workspace settings shape what each manager can access.",
    body: [
      "Manager views in ODA7 focus on team activity, calls, queue ownership, performance context and coaching workflows.",
      "Access is not the same for everyone: it is shaped by the manager's role and the workspace configuration, using ODA7's roles and permissions.",
    ],
    steps: ["Decide which teams each manager is responsible for", "Set up the team hierarchy to match", "Assign the manager role and permissions", "Check the manager can see their queues, calls and scorecard", "Adjust permissions as responsibilities change"],
    keyPoints: ["Team activity, calls and queue ownership in one view", "Coaching workflows on live calls", "Access shaped by role and configuration"],
    features: ["manager-scorecard", "floor-queue-monitor", "agent-status-grid", "roles-permissions", "team-hierarchy"],
    sources: S,
  },
  {
    slug: "super-admin-platform",
    name: "The Super Admin platform",
    summary: "What the separate Super Admin layer covers for platform operators running many organizations.",
    body: [
      "The Super Admin experience is separate from everyday workspaces. It is where platform operators manage the organizations on ODA7 and the commercial and security settings around them.",
      "It covers organizations, plans, subscriptions, invoices, audit context, data platforms, AI assistance, IP controls, branding and platform-wide administration.",
    ],
    steps: ["Provision an organization for a new customer", "Assign a plan and subscription", "Apply branding and domain settings", "Set IP controls and review audit context", "Send platform-wide notices when needed"],
    keyPoints: ["Separate from customer workspaces", "Plans, subscriptions and invoices per organization", "Platform-wide security and branding"],
    features: ["multi-tenant-organizations", "saas-plans", "billing-center", "audit-logs", "ip-blocker", "white-labeling", "platform-broadcasts"],
    sources: S,
  },
  {
    slug: "preview-vs-live-app",
    name: "The ODA7 website preview vs. the live app",
    summary: "Why the screens on the ODA7 website are illustrative, and where the real application lives.",
    body: [
      "The ODA7 marketing site and the live ODA7 application are separate. The site's interactive screens use illustrative data to show how the product works; the working application is at oda7.com.",
      "The site's contact form is a front-end preview that does not send data, so talk to ODA7 directly to plan a walkthrough or implementation.",
    ],
    steps: ["Explore the website to understand the modules", "Sign in to the live app at oda7.com when you have an account", "Contact ODA7 to plan a walkthrough with your own workflow"],
    keyPoints: ["Website screens use illustrative data", "The live application is at oda7.com", "Implementation is scoped directly with ODA7"],
    links: [{ label: "Sign in to ODA7", href: "https://oda7.com/sign-in" }, { label: "ODA7 website", href: SITE }],
    features: ["sales-dashboard"],
    sources: [SITE, "https://oda7.com/sign-in"],
  },
  {
    slug: "telephony-and-integrations-scoping",
    name: "Scoping telephony & integrations",
    summary: "What to prepare so ODA7 can confirm telephony, integrations, data migration and security for your rollout.",
    body: [
      "ODA7's guidance is to scope before making promises: data migration, telephony, security and rollout requirements are confirmed directly with the ODA7 team.",
      "The site names areas such as calling, WhatsApp, SMS and email, calendar sync, webhooks and data exports. Which of these apply to you, and how, is part of that scoping conversation.",
    ],
    steps: ["List your current phone system and numbers", "List the messaging channels you use (WhatsApp, SMS, email)", "List the tools ODA7 would need to connect to", "Describe the data you need to migrate", "Share security questionnaires or SLA needs with ODA7"],
    keyPoints: ["Telephony requirements are confirmed with ODA7", "Integrations are scoped, not assumed", "Security and SLA questions go directly to ODA7"],
    features: ["integrated-dialer", "whatsapp-business-messaging", "webhooks", "data-sync", "calendar-scheduler"],
    sources: S,
  },
];
