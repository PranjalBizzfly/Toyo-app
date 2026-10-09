import type { Feature, Product } from "@/content/types";
import { moreSupportTopics, oda7Resources, roleSolutions } from "./oda7-expansion";

/**
 * ODA7 — written from its official sources (8 Oct 2026):
 *  - the new official website at oda7-website.vercel.app (single page: six
 *    modules, lifecycle workflow, capability catalog, industry scenarios,
 *    pricing starting points, FAQs). The capability catalog text was read from
 *    the site's own rendered content.
 *  - the live app at oda7.com (home, sign-in, sign-up, forgot-password).
 * Deliberately excluded: the site's certification badges, every performance
 * figure (pickup lift, dialing speed, win scores, compliance %, ARR, cost
 * savings), mock people/companies in the illustrative UI, and the oda7.com
 * sign-in panel statistics. The site itself labels its previews "illustrative"
 * and says capability and availability should be confirmed during scoping.
 */
const SITE = "https://oda7-website.vercel.app/";
const S = [SITE];

type F = [
  slug: string,
  name: string,
  summary: string,
  body: string[],
  capabilities: string[],
  extra?: Partial<Feature>,
];

const mk = (category: string, items: F[], highlight = 0): Feature[] =>
  items.map(([slug, name, summary, body, capabilities, extra], i) => ({
    slug,
    name,
    summary,
    category,
    body,
    capabilities,
    sources: S,
    hasPage: true,
    highlight: i < highlight,
    ...extra,
    ...DEEP[slug],
  }));

const q = (question: string, answer: string) => ({ question, answer });

/**
 * Feature-level depth. Every statement restates something the official site
 * says about the capability (catalog card, lifecycle stage, module copy or
 * FAQ); no figures, badges or invented integrations. Merged over the tuples.
 */
const DEEP: Record<string, Partial<Feature>> = {
  // ── Sales Execution ──────────────────────────────────────────────
  "lead-distribution": {
    capabilities: [
      "Every incoming prospect is tagged with its source UTMs, so the rep can see which form, ad or webhook produced the lead.",
      "Duplicate rules run at intake, so an existing prospect is not handed to a second rep as a new lead.",
      "The queue is ranked algorithmically by deal score and timezone rather than by arrival order or rep preference.",
      "Each lead in My Queue has a visible owner, which makes it clear who is responsible for the next action.",
      "A one-click auto-prioritize action re-sorts the queue so the highest-intent prospect sits at the top.",
    ],
    benefits: [
      "Reps no longer cherry-pick the leads they like; the ranking decides the order of work.",
      "High-intent prospects reach a rep quickly instead of waiting in a shared list.",
      "Managers can see queue ownership, which removes ambiguity about who should follow up.",
    ],
    useCases: [
      { title: "Inbound form leads", description: "A prospect submits a web form; ODA7 tags the source, checks duplicates and places the lead in an SDR's queue ordered by score and timezone." },
      { title: "Ad-driven campaigns", description: "Leads arriving from Facebook Ads are ingested into the same pipeline, so paid leads are prioritized alongside every other source." },
    ],
    faqs: [
      q("Where do leads in My Queue come from?", "The site names web forms, Facebook Ads and inbound webhooks as sources. Each prospect is tagged with its source UTMs as it enters the qualification and assignment pipeline."),
      q("How is the queue ordered?", "By an algorithmic ranking based on deal score and timezone. Predictive lead scoring supplies the score, and reps can re-run prioritization with one click."),
      q("Can reps choose which leads to work?", "The queue is designed to prevent cherry-picking: reps work their ranked queue from the top rather than choosing from a shared list."),
    ],
  },
  "integrated-dialer": {
    capabilities: [
      "Calls are placed from a WebRTC softphone inside the browser, so reps don't need a separate desk phone or dialer application.",
      "ODA7 provisions local presence numbers that match the prospect's area code, which the site presents as a way to build rapport and lift connect rates.",
      "Lead context, the call controls and the script appear in one calling view, so reps don't rebuild context across tabs.",
      "The next action is visible after each call, keeping the rep moving through the queue.",
      "When a machine answers, a pre-recorded voicemail can be dropped with a single click.",
    ],
    problem: "The site describes reps losing time copying numbers, switching tabs and logging call dispositions across separate CRM and dialer tools.",
    benefits: [
      "Calling happens where the lead lives, so dispositions and history stay on the record.",
      "Local caller ID makes outbound calls look familiar to the prospect.",
      "Voicemail drop removes the time spent leaving the same message repeatedly.",
    ],
    faqs: [
      q("Do reps need special hardware to call?", "The dialer is a WebRTC softphone that runs in the browser. ODA7 says exact telephony requirements should be confirmed with them during scoping."),
      q("What is local presence calling?", "ODA7 provisions localized numbers that match the prospect's area code, so the call shows a local caller ID rather than an unfamiliar long-distance number."),
    ],
  },
  "dynamic-sales-scripts": {
    capabilities: [
      "Talk tracks branch according to the customer's answers, so the rep follows the path that fits the conversation.",
      "Prompts are suggested in real time while the call is live, inside the active call view.",
      "Objection-handling paths guide the rep when a prospect pushes back, and connect to ODA7's objection battlecards.",
      "Compliance disclosures can be built into the script so required statements are not skipped.",
      "Qualification flows adapt as answers come in, helping junior reps qualify consistently.",
    ],
    howItWorks: [
      "A script is attached to the calling workflow",
      "The rep starts the call and the script appears beside the call controls",
      "Each customer answer selects the next branch of the talk track",
      "If an objection comes up, the matching handling path or battlecard is shown",
    ],
    benefits: [
      "Junior reps can run qualification and objection handling without memorizing every path.",
      "Compliance disclosures are delivered consistently across the floor.",
      "Agencies can keep distinct talk tracks for each client pod.",
    ],
    faqs: [
      q("Who are dynamic scripts designed for?", "ODA7 positions them for guiding junior reps and SDRs through qualification, objection handling and compliance disclosures during live calls."),
      q("How do scripts relate to the objection buster?", "Scripts provide the planned talk track; the real-time objection AI listens to the call and surfaces a battlecard when a specific objection is detected."),
    ],
  },
  "automated-sequences": {
    capabilities: [
      "SMS steps send text follow-ups from the business number as part of the cadence.",
      "WhatsApp steps send approved WhatsApp messages through the official Business API.",
      "Automated voicemail steps leave a pre-recorded message without the rep dialing manually.",
      "Email steps send follow-up emails, with opens and clicks tracked on the lead.",
      "Steps are combined into multi-touch cadences per lead, so follow-up continues without a rep tracking it by hand.",
    ],
    howItWorks: [
      "Define a cadence that mixes SMS, WhatsApp, voicemail and email steps",
      "Enroll a lead in the sequence after first contact",
      "ODA7 runs each step on schedule",
      "Replies land in the unified inbox on the lead record",
    ],
    benefits: [
      "Follow-up no longer depends on a rep remembering to send the next message.",
      "Each lead gets a consistent, multi-channel cadence.",
      "Every touch is logged on the lead rather than on a rep's personal device.",
    ],
    audience: ["SDRs", "Sales managers"],
    faqs: [
      q("Which channels can a sequence use?", "The site lists SMS, WhatsApp, automated voicemail and email steps, which can be mixed in one cadence."),
      q("Can AI suggest sequence steps?", "ODA7's AI sales recommendations include suggestions for the next sequence step, shown inside the workflow; ODA7 confirms AI availability during scoping."),
    ],
  },
  "unified-inbox": {
    capabilities: [
      "Two-way SMS conversations sit on the lead profile, so texts aren't stuck on a rep's phone.",
      "Two-way WhatsApp conversations run through the official WhatsApp Business API and appear in the same timeline.",
      "Email threads are synced into the lead's conversation history alongside messages and calls.",
      "Reps can send approved WhatsApp templates directly from the inbox.",
      "Read tracking shows when a prospect has seen a message.",
    ],
    howItWorks: [
      "A prospect replies by SMS, WhatsApp or email",
      "The message is attached to the matching lead's timeline",
      "The rep reads the full history and replies from the same view",
      "The conversation stays on the record for managers and teammates",
    ],
    benefits: [
      "One timeline per lead replaces scattered threads across devices and tools.",
      "Context survives when a lead is reassigned to another rep.",
      "Managers can review outreach that would otherwise go unrecorded.",
    ],
    audience: ["Sales reps", "SDRs", "Sales managers"],
    faqs: [
      q("Which channels appear in the unified inbox?", "SMS, WhatsApp and email. ODA7 brings them into one conversation timeline attached to the lead record."),
      q("Why does ODA7 centralize messaging?", "The site describes WhatsApp and calling outreach as often manual, unrecorded and disconnected from the CRM, with conversations scattered across devices; the inbox keeps it on the lead."),
    ],
  },
  "quotes-and-proposals": {
    capabilities: [
      "Reps build a proposal by selecting products and bundles from ODA7's product catalog.",
      "Pre-approved discount tiers and automated discount rules keep pricing within agreed limits.",
      "The output is a customized PDF quote or a proposal link sent to the client.",
      "The rep is notified the moment the client opens the document.",
      "Clients can review and e-sign on mobile, and signature status is tracked.",
      "Quote status syncs back to the deal in the CRM.",
    ],
    problem: "Without a connected quoting step, reps rebuild pricing by hand and lose track of whether a proposal has been opened or signed.",
    howItWorks: [
      "Select products and bundles from the catalog",
      "Apply a pre-approved discount tier",
      "Generate a PDF quote or proposal link and send it",
      "Get notified when the client opens it, and track the e-signature",
      "The quote status updates on the deal",
    ],
    benefits: [
      "Pricing on proposals stays consistent with the catalog.",
      "Discounts stay inside approved tiers.",
      "Reps know exactly when to follow up because opens are reported.",
    ],
    audience: ["Account executives", "Sales reps"],
    faqs: [
      q("Can clients sign on a phone?", "Yes. ODA7 describes mobile e-signature, with signature status tracked and synced back to the deal."),
      q("How are discounts controlled?", "Reps apply pre-approved discount tiers, and automated discount rules govern what can be offered."),
    ],
  },
  "lead-management": {
    capabilities: [
      "Multi-dimensional filters let reps and managers slice leads by several attributes at once.",
      "Custom fields hold enrichment data specific to the business.",
      "Pipeline and lifecycle stages can be configured to match how the team sells.",
      "Bulk actions and bulk tagging update many leads in one step.",
      "Each lead shows its source, qualification context and owner before the next action begins.",
    ],
    benefits: [
      "Teams can segment and act on large lead lists without exporting to spreadsheets.",
      "Stages reflect the organization's own process rather than a fixed template.",
      "Ownership and source are always visible on the record.",
    ],
    audience: ["Sales reps", "Sales managers", "Sales operations"],
    faqs: [
      q("Can we use our own pipeline stages?", "Yes. ODA7 describes custom pipeline and lifecycle stages alongside custom fields for enrichment."),
      q("How do we update many leads at once?", "Bulk actions and bulk tagging apply changes or tags to a filtered set of leads in one step."),
    ],
  },
  "call-history-recordings": {
    capabilities: [
      "Calls are recorded in dual-channel audio, keeping the rep's and the prospect's sides separate.",
      "Recordings are transcribed automatically with speech-to-text.",
      "Transcripts are searchable, so teams can find what was said on past calls.",
      "Each lead keeps its call history, including recordings and outcomes.",
      "Recording access and downloads are captured in ODA7's audit log.",
    ],
    howItWorks: [
      "A call is placed or received through the ODA7 dialer",
      "The call is recorded in dual-channel audio",
      "The recording is transcribed automatically",
      "The recording and transcript are stored in the lead's call history",
    ],
    benefits: [
      "Managers can review real conversations for coaching.",
      "Transcripts feed post-call summaries and follow-up drafts.",
      "Access to recordings is traceable through audit logs.",
    ],
    audience: ["Sales managers", "Floor supervisors", "Sales reps"],
    faqs: [
      q("Are calls transcribed?", "Yes. ODA7 transcribes recordings automatically, and transcripts can be searched later."),
      q("Is access to recordings tracked?", "Call recording access and downloads are among the events recorded in ODA7's audit logs."),
    ],
  },
  "product-catalog": {
    capabilities: [
      "Product SKUs are stored in the agent workspace, so reps sell from the same list.",
      "Pricing tiers are defined per product.",
      "Recurring billing plans can be represented for subscription products.",
      "Configurable bundles group products into packages.",
      "The catalog feeds CPQ quotes and proposals directly.",
    ],
    benefits: [
      "Prices on quotes come from one maintained source.",
      "Reps don't need to look up pricing in a separate document.",
    ],
    audience: ["Sales operations", "Sales reps"],
    faqs: [
      q("How is the product catalog used?", "Reps pick products, tiers and bundles from it when building CPQ quotes, which keeps pricing on proposals consistent."),
      q("Does the catalog support subscriptions?", "Yes, the site lists recurring billing plans alongside SKUs and pricing tiers."),
    ],
  },
  "company-hierarchy": {
    capabilities: [
      "Several contacts can be linked to one company account.",
      "Decision-makers and buying committees can be mapped on the account.",
      "Parent and subsidiary accounts can be structured under one enterprise account.",
      "Decision-maker org charts show who influences the deal.",
    ],
    problem: "In B2B deals, tracking individual leads alone hides who else in the account is involved in the buying decision.",
    benefits: [
      "Larger deals are organized around the account rather than scattered contacts.",
      "Reps can see the buying committee before a call.",
    ],
    audience: ["Account executives", "B2B sales teams"],
    faqs: [
      q("Can ODA7 model parent and subsidiary companies?", "Yes. The site describes parent–subsidiary mapping under a parent enterprise account."),
      q("What does the company view add over leads?", "It groups contacts, decision-makers and buying committees under one account, with org charts for decision-makers."),
    ],
  },
  "calendar-scheduler": {
    capabilities: [
      "Booking links let prospects choose a meeting time themselves.",
      "Bookings sync with Google Calendar.",
      "Bookings sync with Outlook.",
      "Automatic reminders are sent before meetings, including SMS and WhatsApp reminder cadences.",
    ],
    howItWorks: [
      "The rep shares a booking link with the prospect",
      "The prospect picks a time",
      "The meeting syncs to the rep's Google Calendar or Outlook",
      "ODA7 sends reminders before the meeting",
    ],
    benefits: [
      "Scheduling happens without back-and-forth messages.",
      "Reminders over SMS and WhatsApp help prospects remember the meeting.",
    ],
    audience: ["Sales reps", "Account executives"],
    faqs: [
      q("Which calendars does ODA7 sync with?", "The site names Google Calendar and Outlook."),
      q("How are meeting reminders sent?", "Automatically, including SMS and WhatsApp reminder cadences before the meeting."),
    ],
  },
  "sales-dashboard": {
    capabilities: [
      "Shows the number of calls each rep has made.",
      "Shows the rep's pickup ratio — how many dials were answered.",
      "Tracks conversions credited to the rep.",
      "Displays live commission earnings as deals close.",
      "Gives an overview of the active queue and the live dialer next to personal performance.",
    ],
    benefits: [
      "Reps see their own performance and earnings without asking a manager.",
      "Queue and dialer status sit beside the numbers, so the dashboard is a working start point.",
    ],
    faqs: [
      q("Is the sales dashboard personal?", "Yes. It is each rep's own command center covering calls, pickup ratio, conversions and commission earnings."),
      q("How do commissions appear on the dashboard?", "Commissions calculated by the real-time commission engine show as live earnings on the rep's dashboard."),
    ],
  },

  // ── Omnichannel ──────────────────────────────────────────────────
  "whatsapp-business-messaging": {
    capabilities: [
      "Messages go through the official WhatsApp Business API from Meta.",
      "Verified broadcast campaigns reach many prospects with approved content.",
      "Automated reminders, such as meeting reminders, are sent on WhatsApp.",
      "Messages can include interactive buttons for quick replies.",
      "Approved templates are used for outbound outreach, and read status is tracked.",
    ],
    howItWorks: [
      "Build an approved template in the template studio",
      "Send it from the lead record, a sequence or a broadcast",
      "Track when the prospect reads it",
      "Replies appear in the lead's unified inbox",
    ],
    benefits: [
      "WhatsApp outreach is recorded on the CRM record instead of personal phones.",
      "Reps can send a WhatsApp summary after a call without leaving ODA7.",
    ],
    audience: ["Sales reps", "SDRs", "Marketing teams"],
    faqs: [
      q("Does ODA7 use the official WhatsApp API?", "Yes. The site states ODA7 connects to the official WhatsApp Business API (Meta)."),
      q("Where do WhatsApp replies go?", "Into the lead's unified inbox timeline, alongside SMS and email."),
    ],
  },
  "two-way-sms": {
    capabilities: [
      "ODA7 provides dedicated local business phone numbers for texting prospects.",
      "Conversations are bidirectional: prospects can reply and reps answer from ODA7.",
      "Keyword triggers can react to specific words in incoming messages.",
      "Messages can include media.",
    ],
    benefits: ["SMS conversations stay on the lead record.", "Prospects see a local business number."],
    audience: ["Sales reps", "SDRs"],
    faqs: [
      q("Are SMS messages sent from a shared number?", "ODA7 describes dedicated local business numbers for two-way SMS chat."),
      q("Where do SMS threads appear?", "In the lead's unified inbox, next to WhatsApp and email."),
    ],
  },
  "email-tracking": {
    capabilities: [
      "Email is synced in both directions, so sent and received messages appear on the lead.",
      "Opens and clicks are tracked on each email.",
      "Attachment viewing is reported, showing whether the prospect looked at a file.",
      "Bounces are handled, flagging addresses that fail.",
      "Thread history is kept alongside calls and messages.",
    ],
    benefits: ["Reps know when a prospect engaged with an email.", "Email history is shared with anyone who works the lead."],
    audience: ["Sales reps", "Account executives"],
    faqs: [
      q("What email activity does ODA7 track?", "Opens, clicks and attachment viewing, plus bounce handling."),
      q("Is email two-way?", "Yes, email is synced both ways so threads live on the lead record."),
    ],
  },
  "voicemail-drop": {
    capabilities: [
      "Reps record personalized voicemails ahead of time.",
      "When an answering machine picks up, one click drops the recording.",
      "The rep moves straight on to the next dial while the message plays.",
      "Voicemail steps can also run automatically inside sequences.",
    ],
    problem: "Leaving the same voicemail live on every unanswered call takes rep time away from reaching prospects who do pick up.",
    benefits: ["Reps spend calling time on live conversations.", "Every prospect hears a consistent, prepared message."],
    audience: ["SDRs", "Inside sales reps"],
    faqs: [
      q("Is the voicemail personalized?", "ODA7 describes pre-recorded, personalized voicemails that the rep drops in one click."),
      q("Can voicemails be automated?", "Yes, automated voicemail steps can be part of a sequence."),
    ],
  },
  "web-callbacks-ivr": {
    capabilities: [
      "Website visitors can request a callback.",
      "Inbound calls can be handled through an IVR.",
      "A web-to-call bridge dials an active agent and connects the prospect.",
      "Requests are routed to an agent queue that owns them.",
    ],
    howItWorks: [
      "A visitor requests a call on the website",
      "ODA7 routes the request to an owned agent queue",
      "The bridge dials an active agent",
      "The prospect is connected with the lead context on screen",
    ],
    benefits: ["Website enquiries reach an agent rather than an unmonitored inbox.", "Lead ownership and calling stay in one view."],
    audience: ["Inside sales teams", "Call centers"],
    faqs: [
      q("What happens when a website visitor asks for a call?", "ODA7 bridges the request to an active agent in an owned queue and connects the prospect."),
      q("Does ODA7 handle inbound calls?", "The site lists inbound IVR as part of this capability; ODA7 confirms telephony requirements during scoping."),
    ],
  },

  // ── AI ───────────────────────────────────────────────────────────
  "explain-my-numbers": {
    capabilities: [
      "Leaders ask questions about sales data in plain English instead of building reports.",
      "ODA7 returns a synthesized explanation rather than a raw table.",
      "Answers draw on data already connected in the workspace — calls, leads and performance.",
      "It sits within Revenue Insights next to dashboards and heatmaps.",
    ],
    howItWorks: [
      "Type a question, for example why conversions dipped in a region",
      "ODA7 analyzes the connected workspace data",
      "A synthesized explanation is shown",
    ],
    benefits: ["Leaders get answers without waiting for an analyst.", "Questions are answered from the same data the floor generates."],
    faqs: [
      q("What kind of questions can I ask?", "Plain-English questions about sales performance; the site's example asks why conversions dipped in a region."),
      q("Is Explain My Numbers available on every plan?", "ODA7 says AI capability, availability and data requirements are confirmed during product scoping; the Platform plan lists AI features."),
    ],
  },
  "objection-buster": {
    capabilities: [
      "ODA7 listens to the customer's speech during the live call.",
      "It detects objections about pricing, timing, competitors and security.",
      "A suggested talk track or battlecard appears on the rep's active call view.",
      "After the call, notes and the deal outcome are written to the CRM without manual entry.",
    ],
    problem: "The site describes managers learning about fumbled objections days later in delayed spreadsheet reports, when the deal can no longer be saved.",
    benefits: [
      "Reps get a rebuttal at the moment the objection is raised.",
      "Less experienced reps can handle competitor and pricing pushback.",
      "CRM notes are kept up to date without rep effort.",
    ],
    audience: ["Sales reps", "SDRs", "Account executives"],
    faqs: [
      q("Which objections does it detect?", "The site names pricing friction, timing, competitor lock-ins and security questions."),
      q("What happens after the call?", "ODA7 updates the CRM automatically; the site shows the deal stage, a calendar invite and a WhatsApp follow-up being updated."),
    ],
  },
  "predictive-lead-scoring": {
    capabilities: [
      "Each inbound prospect gets a score on a 1–100 scale.",
      "Firmographic signals about the company feed the score.",
      "Behavioural signals feed the score.",
      "Intent signals feed the score.",
      "Scores drive the ranking of each rep's My Queue.",
    ],
    howItWorks: [
      "A prospect enters ODA7",
      "Machine-learning models assess firmographic, behavioural and intent signals",
      "A 1–100 score is assigned",
      "The score ranks the lead in My Queue",
    ],
    benefits: ["High-intent prospects reach reps first.", "Ranking replaces rep guesswork about which lead to call."],
    audience: ["SDRs", "Sales managers"],
    faqs: [
      q("What does the lead score use?", "Machine-learning models considering firmographics, behaviour and intent signals."),
      q("How is the score used?", "It feeds the priority ranking in My Queue together with timezone."),
    ],
  },
  "post-call-summaries": {
    capabilities: [
      "After each call, ODA7 lists the action items that came up.",
      "Summaries include sentiment context from the conversation.",
      "Themes the prospect raised are surfaced for review.",
      "Summaries can update the deal stage.",
    ],
    howItWorks: ["The call ends", "The recording and transcript are analyzed", "A summary of actions, sentiment and themes is shown", "The deal stage can be updated from it"],
    benefits: ["Reps spend less time writing notes.", "Managers get a consistent record of each call."],
    audience: ["Sales reps", "Sales managers"],
    faqs: [
      q("What does a post-call summary include?", "Action items, sentiment context and themes the prospect raised."),
      q("Do summaries change the CRM?", "They can update deal stages, so reps don't have to update the record by hand."),
    ],
  },
  "ai-recommendations": {
    capabilities: [
      "Suggests when to call a prospect.",
      "Suggests which pitch strategy to use.",
      "Suggests the next step in a sequence.",
      "Recommendations are made per prospect and shown inside the workflow.",
    ],
    benefits: ["Reps get a next-best action without leaving the lead.", "Follow-up timing is informed by data rather than habit."],
    audience: ["Sales reps", "SDRs"],
    faqs: [
      q("Where do recommendations appear?", "Inside the workflow, on the prospect being worked."),
      q("Are recommendations guaranteed to be available?", "ODA7 frames its AI as illustrated on the site, with capability and availability confirmed during scoping."),
    ],
  },
  "insight-alerts": {
    capabilities: [
      "ODA7 watches activity for anomalies continuously.",
      "Alerts flag reps at risk of burnout.",
      "Alerts flag deals whose velocity is slowing.",
      "Alerts flag objection topics that are surging across calls.",
    ],
    howItWorks: ["Activity data is monitored", "An anomaly is detected", "An alert is routed to managers", "Managers act during the shift"],
    benefits: ["Managers learn about problems while they can still act.", "Coaching can target the objection topics currently rising."],
    audience: ["Sales managers", "Floor supervisors"],
    faqs: [
      q("What kinds of alerts does ODA7 raise?", "The site names rep burnout risk, slowing deal velocity and surging objection topics."),
      q("How are alerts delivered?", "Notification routing rules can send critical alerts to Slack, SMS, WhatsApp or browser push."),
    ],
  },
  "ai-copilot": {
    capabilities: [
      "Drafts contextual replies to prospect messages.",
      "Composes follow-up emails.",
      "Builds follow-up drafts from call transcripts.",
      "Prepares a briefing before a call.",
    ],
    benefits: ["Reps start from a draft instead of a blank message.", "Pre-call briefings save research time."],
    audience: ["Sales reps", "Account executives"],
    faqs: [
      q("What can the AI assistant write?", "Contextual replies, follow-up emails (including from call transcripts) and pre-call briefings."),
      q("Does the copilot act on its own?", "The site positions it as assistance that stays visible to the agent inside the workflow."),
    ],
  },

  // ── People ───────────────────────────────────────────────────────
  "floor-queue-monitor": {
    capabilities: [
      "Shows how much load the queue currently carries.",
      "Lists leads that are waiting for an agent.",
      "Counts the calls active at the same moment.",
      "Shows who on the floor is available.",
      "Lets supervisors balance agent availability as volume changes.",
    ],
    problem: "The site describes sales, support and operations teams lacking live floor visibility, leading to abandoned prospect calls at peak times.",
    howItWorks: ["Open the floor monitor", "Watch queue load, waiting leads and active calls", "Spot a spike in waiting leads", "Rebalance agent availability"],
    benefits: ["Supervisors act on volume during the shift.", "Fewer prospect calls are abandoned at peak."],
    faqs: [
      q("Who uses the floor queue monitor?", "Floor supervisors and call center managers overseeing live queue volume."),
      q("What does it show?", "Queue load, waiting leads, concurrent calls and floor availability."),
    ],
  },
  "agent-status-grid": {
    capabilities: [
      "Each agent's state is shown live: On Call, Idle, In Wrap-up or Available.",
      "Managers can silently listen to a live call.",
      "Managers can whisper coaching into the rep's headset without the customer hearing.",
      "Managers can barge into a call when needed.",
      "Active dials are visible per agent.",
    ],
    howItWorks: ["Open the status grid", "Pick an agent who is on a call", "Listen silently", "Whisper coaching or barge in"],
    benefits: ["Coaching happens during the call, not afterwards.", "Supervisors see idle and wrap-up time as it happens."],
    faqs: [
      q("Can the customer hear whisper coaching?", "No. Whisper coaching goes only into the rep's headset."),
      q("Which agent states are shown?", "On Call, Idle, In Wrap-up and Available."),
    ],
  },
  "team-hierarchy": {
    capabilities: [
      "Teams can be organized as squads or vertical pods.",
      "Territories and regional divisions model geographic structure.",
      "Departments carry role-based access control.",
      "Departments carry their own telephony line routing.",
      "Each team or pod can have dedicated queue routing, quota pacing and leaderboards.",
      "Agent profiles hold calling skill rules.",
    ],
    benefits: ["The org chart drives routing, access and competition.", "Agencies can separate client pods cleanly."],
    audience: ["Sales operations", "Sales managers", "Admins"],
    faqs: [
      q("How can teams be structured?", "As squads, territories, vertical pods or regional divisions, grouped into departments."),
      q("What does structure control?", "Queue routing, quota pacing and leaderboards per pod, and access and telephony routing per department."),
    ],
  },
  "onboarding-workflows": {
    capabilities: [
      "New agents follow a standardized onboarding path.",
      "Script certifications confirm agents know the talk tracks.",
      "Mock calls are scored before agents go live.",
      "Access is provisioned automatically as onboarding progresses.",
    ],
    howItWorks: ["A new agent is added", "They start the standard onboarding path", "They complete script certifications and scored mock calls", "Access is provisioned automatically"],
    benefits: ["Every new agent is onboarded the same way.", "Access isn't granted before training is done."],
    audience: ["Sales managers", "HR and operations teams", "New agents"],
    faqs: [
      q("What does onboarding include?", "Standardized paths with script certifications and scored mock calls."),
      q("How is access handled?", "ODA7 provisions access automatically as the agent progresses through onboarding."),
    ],
  },
  "attendance": {
    capabilities: [
      "Agents clock in and out with a geo-verified punch.",
      "Time can be tracked through the browser or biometrically.",
      "A shift punch updates the verified live floor roster.",
      "Attendance is tied to dialer readiness and agent availability.",
      "Attendance data feeds payroll.",
    ],
    howItWorks: ["The agent punches in with geo-verification", "The live floor roster updates", "The agent becomes available to the dialer", "Attendance flows into payroll"],
    benefits: ["Sales and operations see the same attendance record.", "Payroll uses verified time rather than self-reported sheets."],
    audience: ["HR and operations teams", "Floor supervisors", "Agents"],
    faqs: [
      q("How is attendance verified?", "Through geo-verified browser or biometric clock-in and clock-out."),
      q("Does attendance affect payroll?", "Yes, attendance feeds ODA7's payroll calculation."),
    ],
  },
  "leave-management": {
    capabilities: [
      "Agents submit vacation and sick leave requests themselves.",
      "Requests move through approval chains.",
      "The lead queue of an agent on leave is re-routed automatically to active reps.",
      "Leave is visible to operations alongside attendance.",
    ],
    howItWorks: ["The agent requests leave", "The approval chain reviews it", "Once approved, leave is recorded", "The agent's queue is re-routed while they're away"],
    benefits: ["Leads don't sit with an absent rep.", "Leave requests don't need email or paper."],
    audience: ["Agents", "HR and operations teams", "Sales managers"],
    faqs: [
      q("What happens to leads when a rep is on leave?", "ODA7 re-routes their lead queue to reps active on the floor."),
      q("Who approves leave?", "Requests follow configured approval chains."),
    ],
  },
  "manager-scorecard": {
    capabilities: [
      "Benchmarks team pickup ratios in real time.",
      "Tracks talk time and wrap-up time.",
      "Compares conversions against benchmarks.",
      "Shows deal-stage velocity and pacing.",
    ],
    benefits: ["Managers can coach while the day is still running.", "Underperforming metrics are visible before the weekly report."],
    faqs: [
      q("What does the scorecard measure?", "Pickup ratios, talk and wrap-up times, conversions and deal-stage velocity."),
      q("Is it real-time?", "Yes, the site presents it as a live, team-level performance view."),
    ],
  },

  // ── Compensation ─────────────────────────────────────────────────
  "commission-engine": {
    capabilities: [
      "Commission is calculated the moment a deal is marked Closed-Won.",
      "The amount is credited to the rep's digital commission wallet, where the balance updates.",
      "Tiered commission rules pay different rates at different levels.",
      "Flat commission rules pay a fixed amount or rate.",
      "Accelerator rules raise the rate as reps pass quota.",
    ],
    benefits: [
      "Reps see earnings as they close, not at month end.",
      "Commission uses the same deal data sales sees, which removes reconciliation disputes.",
    ],
    audience: ["Sales reps", "Sales managers", "Finance and payroll teams"],
    faqs: [
      q("When is commission calculated?", "Immediately when a deal moves to Closed-Won."),
      q("Which commission structures are supported?", "Tiered, flat and accelerator-based rules."),
      q("Does commission reach payroll?", "Yes, the calculated amount flows into payroll and itemized payslips."),
    ],
  },
  "payroll": {
    capabilities: [
      "Base salary is calculated from salary rules.",
      "Overtime is included in the payroll run.",
      "Commissions from closed deals are added automatically.",
      "Clawbacks are deducted where they apply.",
      "Bonuses and incentives are included.",
      "The completed payroll run is exported in one click.",
    ],
    howItWorks: ["Salary rules define base pay", "Attendance, commissions, clawbacks and bonuses are pulled in", "Payroll is calculated", "The run is exported and payslips generated"],
    problem: "The site describes end-of-month spreadsheet work and disputes between sales and operations over pay.",
    benefits: ["Payroll uses the same activity data as sales.", "Month-end spreadsheet assembly is removed."],
    audience: ["Finance and payroll teams", "HR and operations teams"],
    faqs: [
      q("What does ODA7 payroll calculate?", "Base salary, overtime, commissions, clawbacks and bonuses."),
      q("Can payroll be exported?", "Yes, with a one-click payroll export."),
    ],
  },
  "payslips": {
    capabilities: [
      "Itemized PDF payslips are generated for every agent at the payroll run.",
      "Each payslip breaks down base pay, taxes and earned bonuses.",
      "Payslips can be downloaded monthly.",
      "All payslips are dispatched in one click.",
    ],
    howItWorks: ["The end-of-month payroll run completes", "ODA7 generates itemized PDFs", "Payslips are dispatched to the whole floor in one click"],
    benefits: ["Reps can see how their pay was calculated.", "Distribution takes one action instead of individual emails."],
    audience: ["Agents", "Finance and payroll teams"],
    faqs: [
      q("What is on an ODA7 payslip?", "Base pay, taxes and earned bonuses, itemized in a PDF."),
      q("How are payslips sent?", "They are dispatched in one click after the payroll run."),
    ],
  },
  "incentives": {
    capabilities: [
      "Managers can run weekend flash bonuses.",
      "Product-specific SPIFFs reward selling particular products.",
      "Quota multipliers boost pay for exceeding targets.",
      "Each incentive has custom start and end triggers.",
      "Bonuses are tied to real-time floor performance.",
    ],
    howItWorks: ["Create an incentive and choose its type", "Set start and end triggers", "Performance is tracked live", "Earned bonuses flow into compensation"],
    benefits: ["Managers can push a product or a weekend without a separate tool.", "Rewards are calculated from actual activity."],
    audience: ["Sales managers", "Sales leaders"],
    faqs: [
      q("What incentive types are available?", "Weekend flash bonuses, product-specific SPIFFs and quota multipliers."),
      q("How long does an incentive run?", "Each has custom start and end triggers."),
    ],
  },
  "quota-accelerators": {
    capabilities: [
      "Commission tiers step up automatically at quota thresholds.",
      "Quota thresholds are defined per plan.",
      "Pacing against quota is visible.",
      "Salary models can combine base pay with tiered accelerators.",
    ],
    benefits: ["Reps are rewarded for exceeding quota without manual adjustment.", "Pacing shows how close a rep is to the next tier."],
    audience: ["Sales reps", "Sales managers", "Finance and payroll teams"],
    faqs: [
      q("How do accelerators work?", "They step commission tiers up automatically as a rep passes quota thresholds, for example a higher rate beyond quota."),
      q("Can accelerators combine with salary?", "Yes, salary models can pair base pay with tiered accelerators."),
    ],
  },

  // ── Engagement ───────────────────────────────────────────────────
  "gamification": {
    capabilities: [
      "Head-to-head duels pit one rep against another.",
      "Squad-versus-squad tournaments run between teams.",
      "Revenue challenges can run over several weeks.",
      "Live countdown timers show how long a contest has left.",
    ],
    howItWorks: ["Set up a duel, tournament or challenge", "Contest progress tracks live activity", "Countdown timers run on the floor", "Winners can be tied to incentives"],
    benefits: ["Competition uses real activity, not self-reported numbers.", "Contests connect to compensation and incentives."],
    audience: ["Sales managers", "Sales reps"],
    faqs: [
      q("What contest formats exist?", "Rep duels, squad tournaments and multi-week revenue challenges."),
      q("Are contests linked to pay?", "The site connects contests to compensation and incentives."),
    ],
  },
  "leaderboards": {
    capabilities: [
      "Leaderboards can be broadcast on TV screens in TV mode.",
      "Revenue leaders are ranked.",
      "Call champions are ranked.",
      "Deal closes trigger celebrations on screen.",
      "Rankings are available daily, weekly and monthly.",
    ],
    benefits: ["The whole floor sees progress in real time.", "Wins are recognized publicly as they happen."],
    audience: ["Sales managers", "Sales reps"],
    faqs: [
      q("Can leaderboards be shown on a TV?", "Yes, TV-mode broadcasts leaderboards to screens around the floor."),
      q("Which time periods are available?", "Daily, weekly and monthly views."),
    ],
  },
  "achievement-badges": {
    capabilities: [
      "Reps unlock collectible badges at performance milestones.",
      "Revenue milestones, such as a first big month, earn badges.",
      "Dialing milestones and pickup-ratio targets earn badges.",
      "Badges are awarded automatically.",
    ],
    benefits: ["Recognition happens without a manager tracking milestones.", "Career milestones are visible to the team."],
    audience: ["Sales reps", "Sales managers"],
    faqs: [
      q("How are badges awarded?", "Automatically when a rep reaches a performance milestone."),
      q("What earns a badge?", "The site's examples include revenue months, dialing milestones and pickup-ratio targets."),
    ],
  },
  "announcements-kudos": {
    capabilities: [
      "Executives can send shout-outs to every agent's workspace.",
      "Win banners celebrate closed deals.",
      "Policy changes are broadcast to the floor.",
      "Urgent operational notices reach agents immediately.",
    ],
    benefits: ["Messages reach agents where they work.", "Recognition and policy updates share one channel."],
    audience: ["Sales leaders", "Operations teams"],
    faqs: [
      q("Where do announcements appear?", "Directly in every agent's ODA7 workspace."),
      q("What can be broadcast?", "Shout-outs, win banners, urgent operational updates and policy changes."),
    ],
  },

  // ── Insights ─────────────────────────────────────────────────────
  "call-heatmaps": {
    capabilities: [
      "Pickup ratios are plotted hour by hour.",
      "Heatmaps break down by timezone and geographic zone.",
      "Carrier-level views show differences between carriers.",
      "Optimal dial windows stand out visually.",
      "Heatmaps inform shift staffing decisions.",
    ],
    benefits: ["Teams dial when prospects are most likely to answer.", "Supervisors staff shifts around real pickup patterns."],
    audience: ["Floor supervisors", "Sales operations"],
    faqs: [
      q("What does a pickup heatmap show?", "Hour-by-hour pickup ratios across timezones, geographies and carriers."),
      q("How are heatmaps used?", "To pick dial windows and plan shift staffing."),
    ],
  },
  "executive-dashboard": {
    capabilities: [
      "Tracks pipeline velocity across the business.",
      "Shows customer acquisition cost (CAC).",
      "Shows customer lifetime value (LTV).",
      "Tracks cohort retention.",
      "Includes ARR and MRR modelling in the master BI view.",
    ],
    benefits: ["Leadership sees revenue health in one view.", "Metrics come from the same data as the floor."],
    faqs: [
      q("Which metrics does the executive dashboard cover?", "Pipeline velocity, CAC, LTV, cohort retention and ARR/MRR modelling."),
      q("Can executives get it by email?", "Scheduled BI reports deliver PDF or CSV summaries to executive inboxes and Slack."),
    ],
  },
  "conversion-telemetry": {
    capabilities: [
      "Pickup and conversion can be broken down by carrier and dialer pool.",
      "Breakdowns by area code show regional differences.",
      "Breakdowns by lead source show which channels convert.",
      "Breakdowns by rep and queue show team-level results.",
      "Carrier route health is monitored.",
    ],
    benefits: ["Teams find where results leak.", "Carrier problems surface in the data."],
    audience: ["Sales operations", "Sales managers", "Floor supervisors"],
    faqs: [
      q("How can conversion be sliced?", "By carrier, dialer pool, area code, lead source, rep and queue."),
      q("What is carrier route health?", "A view of connection metrics per carrier route, used to spot routing problems."),
    ],
  },
  "scheduled-bi-reports": {
    capabilities: [
      "Reports can run on a daily or weekly schedule.",
      "Output is available as PDF.",
      "Output is available as CSV.",
      "Reports are delivered to executive inboxes.",
      "Reports are delivered to Slack channels.",
    ],
    benefits: ["Summaries arrive without someone building them.", "Leaders get numbers where they already read."],
    audience: ["Executives", "Sales leaders"],
    faqs: [
      q("How often can reports be sent?", "Daily or weekly."),
      q("Where are reports delivered?", "To executive email inboxes and Slack channels, as PDF or CSV."),
    ],
  },

  // ── Administration ───────────────────────────────────────────────
  "roles-permissions": {
    capabilities: [
      "Access is granted through roles rather than per user.",
      "Permissions can be set at the level of individual fields.",
      "Sensitive fields can be masked from roles that shouldn't see them.",
      "Queue assignments are part of a role.",
      "Reps, managers, admins and super admins each get a distinct view.",
    ],
    benefits: ["Users see what their job requires.", "Sensitive data is protected at the field level."],
    audience: ["Admins", "Platform operators"],
    faqs: [
      q("Can a field be hidden from some roles?", "Yes. ODA7 supports field-level permissions and field masking."),
      q("Which roles exist?", "The site describes sales rep, manager, admin and super admin views, shaped by role and workspace configuration."),
    ],
  },
  "audit-logs": {
    capabilities: [
      "Every login is recorded.",
      "Record exports are recorded.",
      "Call recording access and downloads are recorded.",
      "Permission changes are recorded.",
      "Edits are recorded, and the log is designed to be tamper-proof.",
    ],
    benefits: ["Admins can trace who accessed or changed data.", "Recording access is accountable."],
    audience: ["Admins", "Compliance teams", "Platform operators"],
    faqs: [
      q("What does the ODA7 audit log capture?", "Logins, exports, call recording access and downloads, edits and permission changes."),
      q("Can audit entries be altered?", "ODA7 describes the audit log as tamper-proof."),
    ],
  },
  "template-studio": {
    capabilities: [
      "Templates are built visually in rich text or HTML.",
      "Merge tags insert lead details automatically.",
      "Dynamic variables personalize content.",
      "Templates can be localized.",
      "Interactive buttons and brand controls can be added.",
    ],
    benefits: ["Reps send consistent, on-brand messages.", "One template serves several languages."],
    audience: ["Admins", "Marketing teams", "Sales operations"],
    faqs: [
      q("Which channels do templates cover?", "Email and WhatsApp."),
      q("Can templates be personalized?", "Yes, with merge tags and dynamic variables."),
    ],
  },
  "webhooks": {
    capabilities: [
      "REST webhooks fire when a lead is created.",
      "Webhooks fire when a call completes.",
      "Webhooks fire when a deal closes.",
      "Webhooks fire when an agent clocks out.",
      "Inbound webhooks can bring leads into ODA7.",
    ],
    benefits: ["Other systems react to floor events.", "Leads from external tools enter the priority queue."],
    audience: ["Admins", "Developers"],
    faqs: [
      q("Which events can trigger a webhook?", "The site names lead created, call completed, deal closed and agent clocked out."),
      q("Can webhooks send leads into ODA7?", "Yes, inbound webhooks are one of the lead sources feeding My Queue."),
    ],
  },
  "notification-routing": {
    capabilities: [
      "Critical alerts can be routed to Slack.",
      "Alerts can be sent by SMS.",
      "Alerts can be sent on WhatsApp.",
      "Alerts can appear as browser push notifications.",
      "Escalation policies are customizable.",
    ],
    benefits: ["Alerts reach people on the channel they watch.", "Unacknowledged issues can escalate."],
    audience: ["Admins", "Sales managers"],
    faqs: [
      q("Which channels can alerts use?", "Slack, SMS, WhatsApp and browser push."),
      q("Can alerts escalate?", "Yes, with customizable escalation policies."),
    ],
  },
  "data-sync": {
    capabilities: [
      "Recurring background ETL jobs export ODA7 data.",
      "Data can sync to Snowflake.",
      "Data can sync to BigQuery.",
      "Data can sync to Amazon S3.",
    ],
    benefits: ["ODA7 data can be combined with other company data in a warehouse.", "Exports run on schedule without manual work."],
    audience: ["Data teams", "Admins"],
    faqs: [
      q("Which destinations are supported?", "The site names Snowflake, BigQuery and Amazon S3."),
      q("How often does sync run?", "As recurring background jobs; ODA7 confirms integrations during scoping."),
    ],
  },
  "billing-center": {
    capabilities: [
      "Admins manage their subscription themselves.",
      "Usage meters show consumption.",
      "Add-ons can be purchased.",
      "VAT invoice receipts can be downloaded.",
    ],
    benefits: ["Billing changes don't require contacting support.", "Invoices are available on demand."],
    audience: ["Workspace admins", "Finance teams"],
    faqs: [
      q("Can we buy add-ons ourselves?", "Yes, the billing center supports add-on purchases."),
      q("Where are invoices?", "VAT invoice receipts are downloadable from the billing center."),
    ],
  },
  "white-labeling": {
    capabilities: [
      "A custom domain can be set through a CNAME.",
      "Portal logos can be replaced.",
      "Brand colour schemes can be applied.",
      "Email headers can carry the operator's brand.",
    ],
    benefits: ["Customer-facing interfaces carry the operator's brand.", "Resellers can offer ODA7 under their own name."],
    audience: ["Platform operators", "Resellers", "Agencies"],
    faqs: [
      q("Can ODA7 run on our own domain?", "Yes, through a custom CNAME domain."),
      q("What can be branded?", "Portal logos, colour schemes and email headers across customer-facing interfaces."),
    ],
  },
  "multi-tenant-organizations": {
    capabilities: [
      "Operators provision new tenant organizations from a master console, in one click.",
      "Tenants can be suspended.",
      "Tenants can be scaled.",
      "Each tenant's data and telephony are isolated.",
      "Seat, trunk and recording-storage entitlements are set per tenant.",
    ],
    howItWorks: ["Provision a new client workspace", "Assign plan and entitlements", "The tenant runs isolated", "Suspend or scale it from the console"],
    benefits: ["One operator can run many customer workspaces.", "Client data stays partitioned."],
    faqs: [
      q("Are tenants isolated?", "Yes, each tenant has its own data and telephony."),
      q("Can agencies create their own workspace?", "Yes, new agencies can sign up publicly on oda7.com."),
    ],
  },
  "saas-plans": {
    capabilities: [
      "Tiered pricing plans are configured by the operator.",
      "Seat limits are set per plan.",
      "Call-minute bundles can be included.",
      "Custom enterprise contracts can be defined.",
      "Subscriptions and invoices are managed alongside plans.",
    ],
    benefits: ["Operators package ODA7 for different customer sizes.", "Billing follows the configured plan."],
    audience: ["Platform operators"],
    faqs: [
      q("What can a plan define?", "Pricing tier, seat limits, call-minute bundles or a custom enterprise contract."),
      q("Who manages plans?", "Super admins in the Super Admin layer."),
    ],
  },
  "platform-revenue": {
    capabilities: [
      "Shows ARR and MRR across the platform.",
      "Tracks churn rate.",
      "Tracks expansion revenue.",
      "Shows tenant lifetime value.",
      "Includes subscription velocity and usage.",
    ],
    benefits: ["Operators see the health of the platform business.", "Usage and revenue are in one view."],
    audience: ["Platform operators"],
    faqs: [
      q("What does platform revenue telemetry show?", "ARR, MRR, churn, expansion revenue, tenant lifetime value, subscription velocity and usage."),
      q("Is this visible to tenants?", "It is part of the Super Admin experience for platform operators."),
    ],
  },
  "ip-blocker": {
    capabilities: [
      "Malicious IP ranges can be banned platform-wide.",
      "Brute-force login attempts are rate-limited.",
      "Geo-fencing restricts where the platform can be accessed.",
      "Trusted IPs can be whitelisted.",
    ],
    benefits: ["Operators control access across all tenants.", "Login attacks are slowed."],
    audience: ["Platform operators", "Security teams"],
    faqs: [
      q("Can we restrict access by location?", "Yes, through geo-fencing."),
      q("Are these controls per tenant?", "They are platform-wide controls in the Super Admin."),
    ],
  },
  "data-platform-connectors": {
    capabilities: [
      "Operators manage global data streams.",
      "Multi-region database clusters are managed here.",
      "Vector embeddings are managed here.",
      "Telephony and SIP gateways are configured here.",
    ],
    benefits: ["Infrastructure behind tenants is managed in one area."],
    audience: ["Platform operators"],
    faqs: [
      q("What does the data platform area cover?", "Global data streams, multi-region database clusters, vector embeddings and telephony (SIP) gateways."),
      q("Who uses it?", "Super admins operating ODA7 as a platform."),
    ],
  },
  "coupons": {
    capabilities: [
      "Promotional coupon codes can be generated.",
      "Percentage discounts can be applied.",
      "Trial extensions can be granted.",
      "Partner credits and referral incentives can be issued.",
    ],
    benefits: ["Operators run promotions without custom billing work."],
    audience: ["Platform operators"],
    faqs: [
      q("What promotions are supported?", "Coupon codes, percentage discounts, trial extensions and partner credits."),
      q("Where are coupons managed?", "In the Super Admin layer."),
    ],
  },
  "partner-referrals": {
    capabilities: [
      "Affiliates are tracked across multiple tiers.",
      "Partner commissions are paid out.",
      "Resellers get a partner portal.",
      "Revenue share is tracked.",
    ],
    benefits: ["Operators can grow through agency resellers.", "Partner payouts are tracked in the platform."],
    audience: ["Platform operators", "Agency resellers"],
    faqs: [
      q("Does ODA7 support multi-tier affiliates?", "Yes, the partner programme tracks multi-tier affiliates."),
      q("Do partners get their own portal?", "Yes, resellers get a partner portal."),
    ],
  },
  "platform-broadcasts": {
    capabilities: [
      "Urgent maintenance notices can be sent to tenants.",
      "Release notes can be published.",
      "Banners can appear in client portals.",
      "Broadcasts can target all tenants or a selected set.",
    ],
    benefits: ["Operators reach customers inside the product."],
    audience: ["Platform operators"],
    faqs: [
      q("Can broadcasts target some tenants only?", "Yes, all tenant organizations or a selected set."),
      q("What can be broadcast?", "Maintenance notices, release notes and banners."),
    ],
  },
};

const sales = mk(
  "sales-execution",
  [
    [
      "lead-distribution",
      "Lead ingestion & priority queue (My Queue)",
      "Incoming leads are tagged, de-duplicated and ranked into each rep's prioritized queue.",
      [
        "My Queue is ODA7's prioritized lead queue. Prospects arriving from web forms, Facebook Ads and inbound webhooks enter an automated qualification and assignment pipeline instead of a shared list reps pick from.",
        "Each new prospect is tagged with its source UTMs, checked against duplicate rules and placed into an SDR queue ordered by deal score and timezone, so the rep's next lead is always visible and owned.",
      ],
      [
        "Source UTM tagging on every incoming prospect",
        "Duplicate-rule checks at intake",
        "Algorithmic ranking by deal score and timezone",
        "Visible queue ownership per rep",
        "One-click auto-prioritization of the queue",
      ],
      {
        problem: "ODA7 describes reps losing time cherry-picking lists and switching tabs, and high-intent leads going cold through inconsistent manual follow-up.",
        howItWorks: [
          "A prospect arrives from a web form, ad or inbound webhook",
          "ODA7 tags the source and runs duplicate checks",
          "The lead is scored and placed in the right SDR queue",
          "The rep works the queue top-down from My Queue",
        ],
        benefits: ["Stops reps cherry-picking leads", "Keeps speed-to-lead tight on high-intent prospects"],
        audience: ["SDRs", "Inside sales reps"],
        relatedFeatures: ["predictive-lead-scoring", "integrated-dialer", "lead-management"],
      },
    ],
    [
      "integrated-dialer",
      "Integrated dialer & local presence calling",
      "An in-browser WebRTC softphone with local presence caller ID, built into the lead workspace.",
      [
        "ODA7's dialer is an integrated calling workspace: the rep sees lead context, call controls and the next action in the same view as the lead, rather than in a separate dialer tool.",
        "Calls run through a WebRTC softphone in the browser. ODA7 provisions localized numbers that match the prospect's area code (local presence) to build rapport and improve connect rates, and a pre-recorded voicemail can be dropped in one click.",
      ],
      [
        "In-browser WebRTC softphone",
        "Local presence numbers matched to prospect area codes",
        "Lead context and call controls in one calling view",
        "Visible next actions after each call",
        "One-click voicemail drop",
      ],
      {
        howItWorks: ["Open the next lead from My Queue", "Dial from the browser with a local number", "Work the call alongside script and lead context", "Log the outcome and move to the next dial"],
        audience: ["SDRs", "Account executives"],
        relatedFeatures: ["lead-distribution", "dynamic-sales-scripts", "voicemail-drop", "call-history-recordings"],
      },
    ],
    [
      "dynamic-sales-scripts",
      "Dynamic branching sales scripts",
      "Interactive call scripts that branch on the customer's answers and suggest prompts in real time.",
      [
        "ODA7 scripts are interactive talk tracks that branch according to how the customer responds. They are designed to guide junior reps through qualification, objection handling and compliance disclosures while the call is live.",
        "Scripts sit in the active call view, and the site connects them to ODA7's real-time objection battlecards so reps get counter-arguments at the moment an objection comes up.",
      ],
      [
        "Branching talk tracks driven by customer responses",
        "Real-time prompt suggestions",
        "Objection-handling paths",
        "Compliance disclosure guidance",
        "Adaptive qualification flows",
      ],
      { audience: ["Junior reps", "SDRs"], relatedFeatures: ["objection-buster", "integrated-dialer"] },
    ],
    [
      "automated-sequences",
      "Automated sequences",
      "Omnichannel follow-up cadences mixing SMS, WhatsApp, voicemail and email steps.",
      [
        "Sequences automate follow-up after the first contact. A cadence can combine SMS, WhatsApp messages, automated voicemails and email steps so follow-up keeps running without reps tracking it by hand.",
        "ODA7 positions sequences against the problem of high-intent leads going cold through inconsistent manual follow-up.",
      ],
      ["SMS steps", "WhatsApp steps", "Automated voicemail steps", "Email steps", "Multi-touch cadences per lead"],
      {
        problem: "The site describes high-intent leads going cold because manual follow-up is inconsistent.",
        integrations: ["whatsapp"],
        relatedFeatures: ["whatsapp-business-messaging", "two-way-sms", "email-tracking", "unified-inbox"],
      },
    ],
    [
      "unified-inbox",
      "Unified inbox",
      "Two-way SMS, WhatsApp and email conversations consolidated on the lead profile.",
      [
        "The unified inbox brings SMS, WhatsApp and email threads into one conversation timeline attached to the lead record, so context is no longer stuck on reps' personal devices.",
        "Reps can send approved WhatsApp templates, see when messages are read and reply from the same place, and the centralized timeline gives a complete record of communication with each lead.",
      ],
      ["Two-way SMS on the lead profile", "Two-way WhatsApp conversations", "Email threads in the same timeline", "Approved WhatsApp templates", "Read tracking"],
      {
        problem: "The site describes WhatsApp and calling outreach that is manual, unrecorded and disconnected from the CRM.",
        integrations: ["whatsapp"],
        relatedFeatures: ["whatsapp-business-messaging", "two-way-sms", "email-tracking"],
      },
    ],
    [
      "quotes-and-proposals",
      "Quotes, CPQ proposals & e-signatures",
      "Build quotes from the product catalog, apply approved discounts and track client opens and signatures.",
      [
        "ODA7 includes configure-price-quote (CPQ) proposals. Reps select products from the catalog, apply pre-approved discount tiers and generate a customized PDF quote or proposal link.",
        "The rep is notified the moment the client opens the document, clients can review and e-sign on mobile, and the quote status syncs back to the deal in the CRM.",
      ],
      ["Proposals built from catalog products and bundles", "Pre-approved discount tiers and automated discount rules", "Customized PDF quotes and proposal links", "Client open notifications", "Mobile e-signature tracking", "CRM sync of quote status"],
      { relatedFeatures: ["product-catalog", "company-hierarchy"] },
    ],
    [
      "lead-management",
      "Lead management & tagging",
      "Lead records with multi-dimensional filters, custom fields, pipeline stages and bulk actions.",
      [
        "Leads in ODA7 are managed with multi-dimensional filtering, custom fields for enrichment and configurable pipeline or lifecycle stages.",
        "Bulk actions and tags let teams act on many leads at once, and the site describes the lead's source, qualification context and owner as visible before the next action begins.",
      ],
      ["Multi-dimensional filtering", "Custom field enrichment", "Custom pipeline and lifecycle stages", "Bulk actions and bulk tagging", "Visible source, qualification and ownership"],
      { relatedFeatures: ["lead-distribution", "company-hierarchy"] },
    ],
    [
      "call-history-recordings",
      "Call history & recordings",
      "Dual-channel call recordings with automatic transcription and searchable transcripts.",
      [
        "Every call is kept in call history with a dual-channel audio recording. ODA7 transcribes recordings automatically so transcripts can be searched later.",
        "The site's product tour also shows recordings carrying AI sentiment context, and recording access is one of the events captured in ODA7's audit logs.",
      ],
      ["Dual-channel call recording", "Automatic speech-to-text transcription", "Searchable transcripts", "Call history per lead"],
      { relatedFeatures: ["integrated-dialer", "post-call-summaries", "audit-logs"] },
    ],
    [
      "product-catalog",
      "Product catalog",
      "Product SKUs, pricing tiers and recurring billing plans embedded in the agent workspace.",
      [
        "The product catalog puts the products a floor sells inside the agent workspace: SKUs, pricing tiers and recurring billing plans, plus configurable bundles.",
        "Quotes draw on the catalog, which the site presents as the way to keep pricing on proposals consistent.",
      ],
      ["Product SKUs", "Pricing tiers", "Recurring billing plans", "Configurable bundles", "Feeds CPQ quotes"],
      { relatedFeatures: ["quotes-and-proposals"] },
    ],
    [
      "company-hierarchy",
      "Companies & account hierarchy",
      "Map contacts, decision-makers and buying committees under parent accounts.",
      [
        "Companies in ODA7 hold the B2B account view. Multiple contacts, decision-makers and buying committees can be mapped under a parent enterprise account.",
        "Parent–subsidiary mapping and decision-maker org charts keep larger deals organized around the account rather than individual leads.",
      ],
      ["Multiple contacts per account", "Decision-maker and buying-committee mapping", "Parent–subsidiary account structure", "Decision-maker org charts"],
      { relatedFeatures: ["lead-management", "quotes-and-proposals"] },
    ],
    [
      "calendar-scheduler",
      "Calendar & meeting scheduler",
      "Meeting booking links synced with Google Calendar and Outlook, with automatic reminders.",
      [
        "ODA7 includes a calendar and booking links so prospects can schedule meetings themselves. Bookings sync with Google Calendar and Outlook.",
        "Automatic reminders follow up before the meeting, including SMS and WhatsApp reminder cadences.",
      ],
      ["Self-serve booking links", "Google Calendar sync", "Outlook sync", "Automatic SMS and WhatsApp reminders"],
      { relatedFeatures: ["automated-sequences"] },
    ],
    [
      "sales-dashboard",
      "Sales dashboard",
      "A personal command center for each rep: calls, pickup ratio, conversions and commissions.",
      [
        "The sales dashboard is each rep's personalized performance view. It shows calls made, pickup ratio, conversions and commission earnings in one place.",
        "It also gives a real-time overview of the active queue and the live dialer alongside personal performance.",
      ],
      ["Calls made", "Pickup ratio", "Conversions", "Live commission earnings", "Active queue and dialer overview"],
      { audience: ["Sales reps"], relatedFeatures: ["commission-engine", "lead-distribution"] },
    ],
  ],
  4,
);

const omni = mk("omnichannel-communication", [
  [
    "whatsapp-business-messaging",
    "WhatsApp Business API messaging",
    "Verified broadcasts, automated reminders and interactive buttons sent from the lead record.",
    [
      "ODA7 connects to the official WhatsApp Business API (Meta). From the lead record, reps can send verified broadcast campaigns, automated reminders and messages with interactive buttons.",
      "Approved templates are used for outreach, read status is tracked, and the conversation lands in the lead's unified timeline — for example sending a WhatsApp summary after a call and advancing the deal.",
    ],
    ["Verified broadcast campaigns", "Automated reminders", "Interactive message buttons", "Approved message templates", "Read tracking"],
    { integrations: ["whatsapp"], relatedFeatures: ["unified-inbox", "automated-sequences", "template-studio"] },
  ],
  [
    "two-way-sms",
    "Two-way SMS messaging",
    "Dedicated local business numbers for two-way SMS with keyword triggers and media.",
    [
      "ODA7 provides dedicated local business phone numbers for two-way SMS chat with prospects.",
      "Messaging supports keyword triggers and media, and SMS threads appear in the lead's unified inbox.",
    ],
    ["Dedicated local business numbers", "Bidirectional SMS chat", "Keyword triggers", "Media support"],
    { relatedFeatures: ["unified-inbox", "automated-sequences"] },
  ],
  [
    "email-tracking",
    "Email tracking & threading",
    "Two-way email sync with open and click tracking, attachment telemetry and bounce handling.",
    [
      "Email is synced both ways in ODA7, so threads live on the lead alongside calls and messages.",
      "Opens and clicks are tracked, attachment viewing is reported, and bounces are handled.",
    ],
    ["Two-way email sync", "Open and click tracking", "Attachment viewing telemetry", "Bounce handling", "Thread history"],
    { relatedFeatures: ["unified-inbox", "automated-sequences"] },
  ],
  [
    "voicemail-drop",
    "One-click voicemail drop",
    "Drop a pre-recorded personalized voicemail when a machine answers and move on.",
    [
      "When a call reaches an answering machine, the rep can drop a pre-recorded, personalized voicemail with one click instead of recording a message live.",
      "The rep then moves straight on to the next call; voicemail steps can also be part of automated sequences.",
    ],
    ["Pre-recorded personalized voicemails", "One-click drop on answering machines", "Immediate move to the next dial", "Voicemail steps in sequences"],
    { relatedFeatures: ["integrated-dialer", "automated-sequences"] },
  ],
  [
    "web-callbacks-ivr",
    "Web callbacks & inbound IVR",
    "Website call requests are bridged to an owned agent queue.",
    [
      "ODA7's lead-to-call workflow connects requests from the website to an agent queue that owns them.",
      "The site describes a web-to-call bridge that dials an active agent and connects the prospect, keeping website enquiries, lead ownership and calling in one view.",
    ],
    ["Website callback requests", "Inbound IVR", "Web-to-call bridge to active agents", "Routing to an owned agent queue"],
    { relatedFeatures: ["lead-distribution", "integrated-dialer"] },
  ],
]);

const ai = mk("ai-intelligence", [
  [
    "explain-my-numbers",
    "Explain My Numbers",
    "Ask sales questions in plain English and get a synthesized answer from your data.",
    [
      "Explain My Numbers is ODA7's natural-language BI. Leaders type a question — the site's example is why conversions dipped in a region — and get a synthesized explanation from the workspace data.",
      "The site presents it as AI-assisted analysis inside the workflow and notes that availability and data requirements are confirmed during scoping.",
    ],
    ["Plain-English questions about sales data", "Synthesized analytical answers", "Works on connected workspace data", "Part of revenue insights"],
    { audience: ["Sales leaders", "Executives"], relatedFeatures: ["executive-dashboard", "conversion-telemetry"] },
  ],
  [
    "objection-buster",
    "Real-time objection buster",
    "Live speech analysis that surfaces battlecards when price or competitor objections come up.",
    [
      "ODA7's in-call AI listens to the live conversation. When the prospect raises a pricing, timing, competitor or security objection, it detects the objection and shows a suggested talk track or battlecard on the rep's active call view.",
      "After the call, the outcome is written back to the CRM — the site shows the deal stage, a calendar invite and a WhatsApp follow-up being updated automatically.",
    ],
    ["Live speech listening during calls", "Objection detection (price, timing, competitor, security)", "Battlecards on the active call view", "Automatic CRM notes after the call"],
    {
      howItWorks: ["Customer audio is ingested", "The objection is detected", "A prescriptive talk track is shown", "The CRM is updated without manual notes"],
      relatedFeatures: ["dynamic-sales-scripts", "post-call-summaries"],
    },
  ],
  [
    "predictive-lead-scoring",
    "Predictive lead scoring",
    "Machine-learning scores for inbound prospects from firmographics, behaviour and intent.",
    [
      "ODA7 scores inbound prospects on a 1–100 scale using machine-learning models that consider firmographics, behaviour and intent signals.",
      "Scores feed the priority queue so high-intent prospects reach reps first.",
    ],
    ["1–100 prospect scores", "Firmographic signals", "Behavioural signals", "Intent signals", "Feeds My Queue ranking"],
    { relatedFeatures: ["lead-distribution"] },
  ],
  [
    "post-call-summaries",
    "AI post-call summarization",
    "Action items, sentiment context and prospect themes surfaced after each call.",
    [
      "After a call, ODA7's AI produces a summary that surfaces action items, sentiment context and the themes the prospect raised, for review inside the workflow.",
      "Summaries can update deal stages so reps spend less time writing notes.",
    ],
    ["Action items", "Sentiment context", "Prospect themes", "Deal-stage sync"],
    { relatedFeatures: ["call-history-recordings", "objection-buster"] },
  ],
  [
    "ai-recommendations",
    "AI sales recommendations",
    "Next-best-action suggestions for call times, pitch strategy and sequence steps.",
    [
      "ODA7 suggests next-best actions for each prospect: when to call, which pitch strategy to use and which sequence step comes next.",
      "The site frames these as AI-assisted recommendations shown inside the workflow, with availability confirmed during scoping.",
    ],
    ["Suggested call times", "Pitch strategy suggestions", "Sequence step suggestions", "Per-prospect recommendations"],
    { relatedFeatures: ["automated-sequences", "lead-distribution"] },
  ],
  [
    "insight-alerts",
    "Automated insight alerts",
    "Proactive alerts on burnout risk, slowing deal velocity and rising objection topics.",
    [
      "ODA7 watches activity for anomalies and alerts managers proactively instead of waiting for reports.",
      "Examples on the site include rep burnout risk, deals slowing down and objection topics that are surging across calls.",
    ],
    ["Anomaly detection", "Rep burnout risk alerts", "Deal velocity slowdown alerts", "Surging objection topic alerts"],
    {
      problem: "The site describes managers discovering dropped connection rates and fumbled objections days later in delayed spreadsheet reports.",
      relatedFeatures: ["notification-routing", "manager-scorecard"],
    },
  ],
  [
    "ai-copilot",
    "AI sales assistant copilot",
    "A personal AI assistant that drafts replies, follow-up emails and call briefings.",
    [
      "Each rep can use an AI assistant that drafts contextual replies, composes follow-up emails — including from call transcripts — and prepares briefings before calls.",
      "The site positions it as assistance that stays visible to the agent inside the workflow.",
    ],
    ["Contextual reply drafts", "Follow-up email composition", "Drafts based on call transcripts", "Pre-call briefings"],
    { relatedFeatures: ["post-call-summaries", "unified-inbox"] },
  ],
]);

const people = mk(
  "people-operations",
  [
    [
      "floor-queue-monitor",
      "Real-time floor queue monitor",
      "Live oversight of queue load, waiting leads, concurrent calls and floor availability.",
      [
        "Floor supervisors get a live view of the queue: how much load it carries, which leads are waiting, how many calls are active at once and who on the floor is available.",
        "The site positions this against abandoned prospect calls during peak periods, letting supervisors balance agent availability as volume changes.",
      ],
      ["Queue load", "Waiting leads", "Active concurrent calls", "Floor availability", "Queue load balancing"],
      { audience: ["Floor supervisors", "Call center managers"], relatedFeatures: ["agent-status-grid", "manager-scorecard"] },
    ],
    [
      "agent-status-grid",
      "Agent status grid & live coaching",
      "See who is on a call, idle, in wrap-up or available — and listen in or whisper-coach live.",
      [
        "The agent status grid is a live roster of the floor showing each rep's state: On Call, Idle, In Wrap-up or Available, along with active dials.",
        "From the grid, managers can silently listen to a call, whisper coaching into the rep's headset without the customer hearing, or barge in.",
      ],
      ["Live agent states (On Call, Idle, Wrap-up, Available)", "Silent listening", "Headset whisper coaching", "Barge-in", "Active dial visibility"],
      { audience: ["Floor supervisors", "Sales managers"], relatedFeatures: ["floor-queue-monitor", "attendance"] },
    ],
    [
      "team-hierarchy",
      "Departments, teams & pods",
      "Structure the sales organization into squads, territories, pods and regional divisions.",
      [
        "ODA7 models the sales organization as agents, managers, teams and departments. Teams can be organized as squads, territories, vertical pods or regional divisions.",
        "Structure drives work: pods carry their own queue routing, quota pacing and leaderboards, and departments carry role-based access and telephony line routing.",
      ],
      ["Squads and pods", "Territories and regional divisions", "Department-level access control", "Department telephony line routing", "Dedicated queue routing per team", "Agent profiles and calling skill rules"],
      { relatedFeatures: ["roles-permissions", "leaderboards"] },
    ],
    [
      "onboarding-workflows",
      "Automated onboarding workflows",
      "Standard onboarding paths with script certifications, mock call scoring and access provisioning.",
      [
        "New agents follow standardized onboarding paths in ODA7.",
        "Paths include script certifications and scored mock calls, and access is provisioned automatically as onboarding progresses.",
      ],
      ["Standardized onboarding paths", "Script certifications", "Mock call scoring", "Automated access provisioning"],
      { relatedFeatures: ["dynamic-sales-scripts", "team-hierarchy"] },
    ],
    [
      "attendance",
      "Attendance & shift clock-in",
      "Geo-verified clock-in tied directly to agent shift availability and the live roster.",
      [
        "ODA7 records shift attendance through geo-verified browser or biometric clock-in and clock-out. A shift punch updates the verified live floor roster.",
        "Because attendance is tied to dialer readiness and agent availability, operations and sales see the same picture and attendance feeds into payroll.",
      ],
      ["Geo-verified clock-in and clock-out", "Browser or biometric time tracking", "Live floor roster updated by shift punches", "Attendance tied to dialer readiness", "Feeds payroll"],
      {
        problem: "The site describes manual management of agents and shift rotations creating time-tracking disputes between sales and operations.",
        relatedFeatures: ["leave-management", "payroll", "agent-status-grid"],
      },
    ],
    [
      "leave-management",
      "Leave & PTO management",
      "Self-serve leave requests with approval chains and automatic queue re-routing.",
      [
        "Agents request vacation and sick leave themselves, and requests move through approval chains.",
        "When someone is on leave, ODA7 re-routes their lead queue to reps who are active on the floor.",
      ],
      ["Self-serve vacation and sick leave requests", "Approval chains", "Automatic lead queue re-routing", "Leave visible to operations"],
      { relatedFeatures: ["attendance", "lead-distribution"] },
    ],
    [
      "manager-scorecard",
      "Manager live scorecard",
      "Team-level tracking of pickup ratios, wrap-up time, conversion benchmarks and pacing.",
      [
        "The manager scorecard is a high-level view of a team's performance in real time.",
        "It benchmarks pickup ratios, talk and wrap-up times, conversions and deal-stage velocity so managers can coach while the day is still running.",
      ],
      ["Team pickup ratios", "Talk and wrap-up times", "Conversion benchmarks", "Deal-stage pacing"],
      { audience: ["Sales managers"], relatedFeatures: ["agent-status-grid", "conversion-telemetry"] },
    ],
  ],
  1,
);

const comp = mk(
  "compensation-payroll",
  [
    [
      "commission-engine",
      "Real-time commission engine",
      "Commissions calculate and credit the rep's wallet the moment a deal is marked Closed-Won.",
      [
        "When a deal moves to Closed-Won in ODA7, the commission is calculated immediately and credited to the rep's digital commission wallet; reps see their balance update.",
        "Commission rules can be tiered, flat or accelerator-based, and the result routes on to payslips.",
      ],
      ["Instant calculation on Closed-Won", "Digital commission wallet", "Tiered rules", "Flat rules", "Accelerator rules"],
      {
        problem: "The site describes end-of-month spreadsheet reconciliation and disputes between sales and operations over commissions.",
        howItWorks: ["A deal is marked Closed-Won", "The commission tier is calculated", "The rep's wallet is credited", "The amount flows into payroll and payslips"],
        relatedFeatures: ["quota-accelerators", "payroll", "payslips"],
      },
    ],
    [
      "payroll",
      "Automated payroll calculation",
      "Base salary, overtime, commissions, clawbacks and bonuses calculated with one-click exports.",
      [
        "ODA7 runs payroll for the sales floor in the same system as the sales activity. It calculates base salary, overtime, commissions, clawbacks and bonuses.",
        "Salary rules define base pay structures, and the payroll run can be exported in one click, removing manual spreadsheet work at month end.",
      ],
      ["Base salary", "Overtime", "Commissions", "Clawbacks", "Bonuses", "One-click payroll exports"],
      { relatedFeatures: ["commission-engine", "payslips", "attendance"] },
    ],
    [
      "payslips",
      "Digital payslip distribution",
      "Itemized, downloadable payslips for the whole floor, dispatched in one click.",
      [
        "At the end-of-month payroll run, ODA7 generates itemized PDF payslips for every agent and dispatches them in one click.",
        "Payslips break down base pay, taxes and earned bonuses so reps can see how their pay was reached.",
      ],
      ["Itemized PDF payslips", "Breakdown of base pay, taxes and bonuses", "Downloadable monthly payslips", "One-click batch dispatch"],
      { relatedFeatures: ["payroll", "commission-engine"] },
    ],
    [
      "incentives",
      "Incentives & SPIFFs",
      "Launch flash bonuses, product SPIFFs and quota multipliers with start and end triggers.",
      [
        "ODA7 lets managers run dynamic incentive plans on top of standard commission: weekend flash bonuses, product-specific SPIFFs and quota multipliers.",
        "Each incentive has custom start and end triggers, and bonuses are tied to real-time performance on the floor.",
      ],
      ["Weekend flash bonuses", "Product-specific SPIFFs", "Quota multipliers", "Custom start and end triggers"],
      { relatedFeatures: ["commission-engine", "gamification"] },
    ],
    [
      "quota-accelerators",
      "Quota pacing & accelerator rules",
      "Commission tiers step up automatically as reps pass quota thresholds.",
      [
        "Accelerator rules step commission tiers automatically as a rep moves through quota — for example a higher rate once quota is exceeded.",
        "Pacing against quota is visible, and salary models can combine base pay with tiered accelerators.",
      ],
      ["Automatic tier stepping", "Quota thresholds", "Quota pacing", "Base pay plus tiered accelerators"],
      { relatedFeatures: ["commission-engine", "payroll"] },
    ],
  ],
  2,
);

const engage = mk(
  "floor-engagement",
  [
    [
      "gamification",
      "Sales contests & battles",
      "Head-to-head rep duels, squad tournaments and multi-week revenue challenges.",
      [
        "ODA7 gamifies the sales floor with contests: head-to-head duels between reps, squad-versus-squad tournaments and revenue challenges that run over several weeks.",
        "Contests run with live countdown timers, and the site connects contests to compensation and incentives.",
      ],
      ["Rep vs rep duels", "Squad vs squad tournaments", "Multi-week revenue challenges", "Live countdown timers"],
      { relatedFeatures: ["leaderboards", "achievement-badges", "incentives"] },
    ],
    [
      "leaderboards",
      "Live sales floor leaderboards",
      "TV-mode broadcast screens showing revenue leaders, call champions and deal celebrations.",
      [
        "ODA7 leaderboards can be broadcast on TV screens around the floor, showing revenue leaders, call champions and celebrations as deals close.",
        "Rankings are available daily, weekly and monthly.",
      ],
      ["TV-mode broadcast screens", "Revenue leader rankings", "Call champion rankings", "Deal celebrations", "Daily, weekly and monthly views"],
      { relatedFeatures: ["gamification", "announcements-kudos"] },
    ],
    [
      "achievement-badges",
      "Achievement badges & milestones",
      "Collectible badges that recognize performance milestones automatically.",
      [
        "Reps unlock collectible badges when they hit performance milestones, such as a first big revenue month, a dialing milestone or a pickup-ratio target.",
        "Badges are awarded automatically to recognize top performers and career milestones.",
      ],
      ["Collectible performance badges", "Revenue milestones", "Dialing milestones", "Automatic awarding"],
      { relatedFeatures: ["leaderboards", "gamification"] },
    ],
    [
      "announcements-kudos",
      "Company announcements & kudos",
      "Broadcast shout-outs, win banners and policy updates to every agent workspace.",
      [
        "Leaders can broadcast messages straight into every agent's workspace in ODA7.",
        "Broadcasts include executive shout-outs, win banners, urgent operational updates and policy changes.",
      ],
      ["Executive shout-outs", "Win banners", "Policy updates", "Urgent operational notices"],
      { relatedFeatures: ["leaderboards"] },
    ],
  ],
);

const insights = mk("revenue-insights", [
  [
    "call-heatmaps",
    "Hour-by-hour pickup heatmaps",
    "Find peak connection hours and the best pickup windows across geographic zones.",
    [
      "ODA7 turns call activity into hour-by-hour heatmaps of pickup ratios.",
      "Interactive heatmaps by timezone, geography and carrier show the windows when prospects answer most, which the site links to better dial timing and shift staffing.",
    ],
    ["Hour-by-hour pickup ratios", "Timezone and geographic zones", "Carrier-level views", "Optimal dial windows", "Input to shift staffing"],
    { relatedFeatures: ["conversion-telemetry", "floor-queue-monitor"] },
  ],
  [
    "executive-dashboard",
    "Executive revenue dashboard",
    "A leadership dashboard covering pipeline velocity, CAC, LTV and cohort retention.",
    [
      "The executive dashboard gives leadership one view of revenue: pipeline velocity, customer acquisition cost, lifetime value and cohort retention.",
      "The site also describes revenue velocity and ARR/MRR modelling in the master BI view.",
    ],
    ["Pipeline velocity", "Customer acquisition cost (CAC)", "Lifetime value (LTV)", "Cohort retention", "ARR/MRR modelling"],
    { audience: ["Executives", "Revenue leaders"], relatedFeatures: ["explain-my-numbers", "scheduled-bi-reports"] },
  ],
  [
    "conversion-telemetry",
    "Pickup ratio & conversion telemetry",
    "Drill into pickup and conversion by carrier, dialer pool, lead source, rep and queue.",
    [
      "ODA7's telephony analytics let teams drill into pickup and conversion data to find where results leak.",
      "Breakdowns cover carrier, dialer pool, area code, lead source, individual rep and queue, along with connection metrics and carrier route health.",
    ],
    ["By carrier and dialer pool", "By area code", "By lead source", "By rep and queue", "Carrier route health"],
    { relatedFeatures: ["call-heatmaps", "manager-scorecard"] },
  ],
  [
    "scheduled-bi-reports",
    "Scheduled BI reports",
    "Daily or weekly PDF and CSV reports delivered to executive inboxes and Slack.",
    [
      "Reports can be scheduled in ODA7 so summaries arrive without anyone building them by hand.",
      "Daily or weekly exports are produced as PDF or CSV and delivered to executive inboxes and Slack channels.",
    ],
    ["Daily and weekly schedules", "PDF exports", "CSV exports", "Email delivery", "Slack channel delivery"],
    { integrations: ["slack"], relatedFeatures: ["executive-dashboard", "data-sync"] },
  ],
]);

const admin = mk("platform-administration", [
  [
    "roles-permissions",
    "Roles & permissions",
    "Role-based access control with field-level permissions, masking and queue assignments.",
    [
      "ODA7 uses role-based access control. Permissions can be set down to individual fields, sensitive fields can be masked and queue assignments are part of a role.",
      "The site describes distinct views for sales reps, managers, admins and super admins, with what each person sees shaped by role and workspace configuration.",
    ],
    ["Role-based access control", "Field-level permissions", "Field masking", "Queue assignment rules", "Rep, manager, admin and super-admin views"],
    { relatedFeatures: ["audit-logs", "team-hierarchy"] },
  ],
  [
    "audit-logs",
    "Audit logs",
    "Tamper-proof logs of logins, exports, call downloads and permission changes.",
    [
      "ODA7 keeps an audit log designed to be tamper-proof.",
      "It records every login, record export, call recording download or access, edit and permission change.",
    ],
    ["Login events", "Record exports", "Call recording access and downloads", "Permission changes", "Edits"],
    { relatedFeatures: ["roles-permissions"] },
  ],
  [
    "template-studio",
    "Email & WhatsApp template studio",
    "A visual template builder with merge tags, dynamic variables and localization.",
    [
      "Templates for email and WhatsApp are built in a visual studio supporting rich text and HTML.",
      "Templates use merge tags and dynamic variables, can be localized and can include interactive buttons and brand controls.",
    ],
    ["Rich-text and HTML builder", "Merge tags", "Dynamic variables", "Localization", "Interactive buttons"],
    { integrations: ["whatsapp"], relatedFeatures: ["whatsapp-business-messaging", "automated-sequences"] },
  ],
  [
    "webhooks",
    "Custom webhooks",
    "Fire REST webhooks on events like lead created, call completed, deal closed or agent clocked out.",
    [
      "ODA7 can trigger external REST webhooks on events in the workspace, so other systems react to what happens on the floor.",
      "Events named on the site include a lead being created, a call completing, a deal closing and an agent clocking out; inbound webhooks can also bring leads in.",
    ],
    ["Lead-created events", "Call-completed events", "Deal-closed events", "Agent clock-out events", "Inbound lead webhooks"],
    { relatedFeatures: ["lead-distribution", "notification-routing"] },
  ],
  [
    "notification-routing",
    "Notification routing rules",
    "Route critical alerts via Slack, SMS, WhatsApp or browser push with escalation policies.",
    [
      "Alerts in ODA7 are routed by rules.",
      "Critical notifications can go to Slack, SMS, WhatsApp or browser push, with customizable escalation policies.",
    ],
    ["Slack alerts", "SMS alerts", "WhatsApp alerts", "Browser push", "Escalation policies"],
    { integrations: ["slack", "whatsapp"], relatedFeatures: ["insight-alerts", "webhooks"] },
  ],
  [
    "data-sync",
    "Scheduled data sync",
    "Recurring background jobs that sync ODA7 data to Snowflake, BigQuery or Amazon S3.",
    [
      "ODA7 can run recurring background ETL jobs that sync its data out to a warehouse or storage.",
      "Destinations named on the site are Snowflake, BigQuery and Amazon S3.",
    ],
    ["Recurring ETL jobs", "Snowflake destination", "BigQuery destination", "Amazon S3 destination"],
    { integrations: ["aws-s3"], relatedFeatures: ["scheduled-bi-reports"] },
  ],
  [
    "billing-center",
    "Subscription & invoicing center",
    "Self-serve billing, usage meters, add-on purchases and VAT invoices.",
    [
      "Workspace admins manage their ODA7 subscription themselves.",
      "The billing center shows usage meters, lets admins buy add-ons and provides VAT invoice receipts for download.",
    ],
    ["Self-serve billing management", "Usage meter monitoring", "Add-on purchasing", "VAT invoice downloads"],
    { relatedFeatures: ["saas-plans"] },
  ],
  [
    "white-labeling",
    "Branding & white-labeling",
    "Custom domain, logos, colour schemes and email headers for customer-facing interfaces.",
    [
      "ODA7 interfaces can carry the operator's own brand.",
      "Admins can set a custom domain (CNAME), portal logos, brand colour schemes and email headers for every customer-facing interface.",
    ],
    ["Custom CNAME domain", "Portal logos", "Brand colour schemes", "Branded email headers"],
    { relatedFeatures: ["multi-tenant-organizations"] },
  ],
  [
    "multi-tenant-organizations",
    "Multi-tenant organization management",
    "Provision, suspend, scale and manage independent tenant organizations from a master console.",
    [
      "ODA7 has a separate Super Admin experience for running it as a SaaS platform. From a master console, operators provision, suspend, scale and manage independent customer organizations.",
      "Each tenant is isolated, with its own data and telephony, and the site describes provisioning a new client workspace in one click. New agencies can also create their own workspace through public sign-up.",
    ],
    ["Tenant provisioning", "Suspending tenants", "Scaling tenants", "Data and telephony isolation per tenant", "Seat, trunk and recording-storage entitlements"],
    { audience: ["Platform operators", "Agencies"], relatedFeatures: ["saas-plans", "platform-revenue", "white-labeling"] },
  ],
  [
    "saas-plans",
    "SaaS plans & subscription engine",
    "Configure pricing tiers, seat limits, call-minute bundles and custom enterprise contracts.",
    [
      "Super admins define the plans their tenants buy.",
      "The plan engine configures tiered pricing plans, seat limits, call-minute bundles and custom enterprise contracts, with subscriptions and invoices managed alongside.",
    ],
    ["Tiered pricing plans", "Seat limits", "Call-minute bundles", "Custom enterprise contracts", "Subscriptions and invoices"],
    { relatedFeatures: ["coupons", "billing-center", "multi-tenant-organizations"] },
  ],
  [
    "platform-revenue",
    "Platform revenue & MRR telemetry",
    "Platform-level ARR, MRR, churn, expansion revenue and tenant lifetime value.",
    [
      "Super admins see a consolidated view of the platform business.",
      "Dashboards cover ARR, MRR, churn rate, expansion revenue and tenant lifetime value, plus subscription velocity and usage.",
    ],
    ["ARR and MRR", "Churn rate", "Expansion revenue", "Tenant lifetime value", "Usage metrics"],
    { relatedFeatures: ["saas-plans"] },
  ],
  [
    "ip-blocker",
    "Global IP blocker & threat defense",
    "Ban malicious IP ranges, rate-limit brute-force attempts and enforce geo-fencing platform-wide.",
    [
      "ODA7's Super Admin includes platform-wide security controls.",
      "Operators can ban malicious IP ranges, rate-limit brute-force login attempts, enforce geo-fencing and whitelist IPs.",
    ],
    ["IP range bans", "Brute-force rate limiting", "Geo-fencing", "IP whitelisting"],
    { relatedFeatures: ["audit-logs", "roles-permissions"] },
  ],
  [
    "data-platform-connectors",
    "Data platform connectors",
    "Manage global data streams, multi-region clusters, vector embeddings and telephony gateways.",
    [
      "The Super Admin data platform area is where operators manage the infrastructure behind tenants.",
      "It covers global data streams, multi-region database clusters, vector embeddings and telephony (SIP) gateways.",
    ],
    ["Global data streams", "Multi-region database clusters", "Vector embeddings", "Telephony and SIP gateways"],
    { relatedFeatures: ["multi-tenant-organizations"] },
  ],
  [
    "coupons",
    "Coupons & discount engine",
    "Create promo codes, percentage discounts, trial extensions and partner credits.",
    [
      "Platform operators can run promotions from the Super Admin.",
      "The engine generates promotional coupon codes, percentage discounts, trial extensions and partner referral incentives.",
    ],
    ["Promotional coupon codes", "Percentage discounts", "Trial extensions", "Partner credits"],
    { relatedFeatures: ["saas-plans", "partner-referrals"] },
  ],
  [
    "partner-referrals",
    "Partner referral program",
    "Multi-tier affiliate tracking, commission payouts and a partner portal for agency resellers.",
    [
      "ODA7 includes a built-in partner programme for operators who resell through agencies.",
      "It tracks multi-tier affiliates, pays partner commissions and gives resellers a partner portal.",
    ],
    ["Multi-tier affiliate tracking", "Partner commission payouts", "Partner portal", "Revenue share"],
    { relatedFeatures: ["coupons"] },
  ],
  [
    "platform-broadcasts",
    "Platform-wide broadcasts",
    "Send maintenance notices, release notes and banners to all or selected tenants.",
    [
      "Super admins can message tenants directly from the platform.",
      "Broadcasts include urgent maintenance notices, release notes and banners, sent to all tenant organizations or a selected set.",
    ],
    ["Maintenance notices", "Release notes", "Banners in client portals", "All or selected tenants"],
    { relatedFeatures: ["multi-tenant-organizations"] },
  ],
]);

export const oda7: Product = {
  id: "oda7",
  slug: "oda7",
  name: "ODA7",
  shortDescription:
    "A sales operating system that brings leads, calling, teams, attendance, commission payroll and analytics into one workspace.",
  longDescription:
    "ODA7 presents itself as one workspace for sales, people and business performance. Instead of separate CRM, dialer, spreadsheet, HR, payroll, inbox and analytics tools, it connects sales execution, people operations, compensation and payroll, floor engagement, revenue insights and platform administration in one shared operating context — from the first lead to the commission payout.\n\nOn the sales side, incoming leads are tagged with their source, checked for duplicates and ranked into each rep's queue; reps call from an in-browser softphone with branching scripts beside the call, follow up over WhatsApp, SMS and email from one inbox, and send quotes from the same record. On the people side, managers see agent availability live, record geo-verified shift attendance and organise reps into pods and teams.\n\nWhen a deal is marked closed-won, ODA7 calculates the commission tier and the result feeds payroll and itemized payslips, while leaderboards, contests and heatmaps draw on the same activity. A separate Super Admin layer lets operators run ODA7 as a multi-tenant platform with isolated customer organizations, plans and subscriptions. ODA7 labels its website previews as illustrative and confirms scope, integrations and pricing in a proposal.",
  tagline: "One workspace for sales, people and business performance.",
  category: "sales-marketing",
  secondaryCategories: ["hr-people"],
  primaryUseCase: "Running sales floors from lead to commission payout",
  audience: ["Inside sales and SDR teams", "Call centers and BPOs", "Revenue and lead-gen agencies", "Sales managers and floor supervisors", "HR and operations teams", "Platform operators"],
  platforms: ["web"],
  market: "India",
  status: "live",
  featured: true,
  publisher: { name: "Bizzfly" },
  verification: {
    relationship: "pending",
    publicSale: "confirmed",
    notes: "Public sign-up on oda7.com. The new website (oda7-website.vercel.app) names BIZZFLY; its previews are labelled illustrative and include demo data and certification badges that were not used.",
  },
  websiteUrl: "https://oda7.com/",
  appUrl: "https://oda7.com/sign-up",
  featureCategories: [
    {
      slug: "sales-execution",
      name: "Sales Execution",
      description: "From first dial to closed-won: leads, calling, scripts, sequences and quotes.",
      body: [
        "Sales Execution is ODA7's workspace for reps and SDRs. It brings the dashboard, leads, calls, companies, products, scripts, sequences and quotes into one place, with a prioritized queue, integrated dialing, branching scripts and one-click proposals.",
        "Lead, script and calling context stay together, so an agent works the conversation from one view instead of rebuilding context across tools.",
      ],
    },
    {
      slug: "omnichannel-communication",
      name: "Omnichannel communication",
      description: "Voice, WhatsApp, SMS and email from one pane.",
      body: [
        "ODA7's communication engine connects reps with prospects over voice, WhatsApp, SMS, email and scheduled meetings from one pane, with every exchange kept on the lead record.",
      ],
    },
    {
      slug: "ai-intelligence",
      name: "AI intelligence",
      description: "AI assistance inside the calling and reporting workflow.",
      body: [
        "ODA7 places AI inside the telephony workflow rather than in a separate chat window: it listens during calls, surfaces objection battlecards, scores leads, summarizes calls and answers plain-English questions about the numbers.",
        "The site describes these previews as illustrative and says capability, availability and data requirements are confirmed during product scoping.",
      ],
    },
    {
      slug: "people-operations",
      name: "People Operations",
      description: "Floor visibility, team structure, onboarding, attendance and leave.",
      body: [
        "People Operations connects the sales floor's people to its activity. Managers see agent availability in real time, record geo-verified shift attendance, organize tiered pods and teams, and manage onboarding and leave in the same system that runs the calls.",
      ],
    },
    {
      slug: "compensation-payroll",
      name: "Compensation & Payroll",
      description: "Commissions, payroll, payslips and incentives tied to closed deals.",
      body: [
        "When deals close, ODA7 calculates commission tiers, credits reps' digital wallets and prepares itemized payslips ready for payout, so compensation references the same activity data as sales.",
      ],
    },
    {
      slug: "floor-engagement",
      name: "Floor Engagement",
      description: "Leaderboards, contests, badges and floor-wide recognition.",
      body: [
        "Floor Engagement gamifies the sales floor with TV-mode leaderboards, contests between reps and squads, milestone badges, sprint bonuses and team celebrations.",
      ],
    },
    {
      slug: "revenue-insights",
      name: "Revenue Insights",
      description: "Heatmaps, telemetry, executive dashboards and scheduled reports.",
      body: [
        "Revenue Insights turns call telemetry into decisions: hour-by-hour pickup heatmaps, carrier route health, team conversion pacing and executive dashboards, with plain-English questions answered by Explain My Numbers.",
      ],
    },
    {
      slug: "platform-administration",
      name: "Platform Administration",
      description: "Roles, audit, templates, integrations, billing and the multi-tenant Super Admin.",
      body: [
        "Platform Administration covers workspace governance — roles and permissions, audit logs, templates, webhooks, notifications, billing and branding.",
        "A distinct Super Admin layer lets operators manage isolated customer organizations, subscription plans, platform revenue, security controls and tenant-wide broadcasts.",
      ],
    },
  ],
  features: [...sales, ...omni, ...ai, ...people, ...comp, ...engage, ...insights, ...admin],
  howItWorks: [
    { title: "Leads", description: "A lead enters with its source, qualification context and owner visible. Prospects from web forms, ads and inbound webhooks are tagged with source UTMs, checked against duplicate rules and placed in a prioritized SDR queue." },
    { title: "Calls", description: "The agent calls from the lead, script and calling view together, using the browser softphone, branching talk tracks and objection battlecards instead of rebuilding context across tools." },
    { title: "People", description: "Managers, teams, departments and attendance stay connected to the activity: agent availability is visible live and shift attendance is recorded with a geo-verified punch." },
    { title: "Compensation", description: "Salary, payroll, incentives and contests reference the work behind them. A closed-won deal triggers the commission tier calculation, and the payroll run produces itemized PDF payslips." },
    { title: "Analytics", description: "Heatmaps and executive views turn connected activity into decisions, from hour-by-hour pickup patterns to plain-English answers about the numbers." },
  ],
  benefits: [
    { title: "One connected workspace", description: "Sales, people, compensation, insights and administration share one operating context. ODA7 positions this against running a separate CRM, dialer, spreadsheets, HR, payroll, inbox and analytics tool." },
    { title: "Live floor context", description: "Agent states, queues and manager workflows are visible in the same model, so supervisors can act on queue volume and availability during the shift rather than in next week's spreadsheet." },
    { title: "Connected operations", description: "Closed-won activity flows into incentives, payroll preparation and performance review. ODA7 says this removes spreadsheet disputes between sales and operations over who earned what." },
    { title: "Follow-up that doesn't depend on memory", description: "Automated sequences mix SMS, WhatsApp, voicemail and email steps, and conversations land on the lead record instead of on reps' personal devices." },
    { title: "Platform controls", description: "Organization, plan, subscription, audit and admin controls live in a distinct Super Admin layer, so operators can run several isolated customer workspaces from one platform." },
  ],
  security: [
    { title: "Role-based access", description: "Roles with field-level permissions and masking shape what each user can see, so sensitive fields can be hidden from roles that don't need them." },
    { title: "Audit logging", description: "Logins, exports, recording access and permission changes are logged, giving admins a record of who touched data and settings." },
    { title: "Tenant isolation", description: "Customer organizations in the Super Admin platform are kept isolated from each other; for agencies, each client pod has strict data partitioning." },
    { title: "IP controls", description: "Platform-wide IP bans, brute-force rate limiting, geo-fencing and IP whitelisting let operators restrict where and how the workspace is reached." },
    { title: "Invite-only agent access", description: "Agents cannot sign themselves up; a workspace admin invites them from Settings → Users. Users sign in with a work email or Google, and password reset links are one-time and expire after 30 minutes." },
  ],
  productSolutions: [
    {
      slug: "high-velocity-sdr-floor",
      name: "High-velocity SDR floors",
      summary: "Inside sales and outbound SDR pods that need to reach new leads fast and keep reps dialing.",
      body: ["For high-volume inside sales and outbound SDR pods, ODA7 aims to remove idle time between calls: inbound leads go straight into a prioritized queue, reps dial with local presence numbers, and branching talk tracks and objection battlecards support the conversation."],
      approach: [
        "Inbound webhook leads enter the priority queue immediately",
        "Local presence dialing from the browser",
        "Live branching talk tracks and AI objection battlecards",
        "Closed-won deals credit the commission wallet instantly",
      ],
      audience: ["SDRs", "Inside sales teams"],
      features: ["lead-distribution", "integrated-dialer", "dynamic-sales-scripts", "objection-buster", "commission-engine"],
      sources: S,
    },
    {
      slug: "call-center-floor-supervision",
      name: "Call center & BPO floor supervision",
      summary: "Floor supervisors of large call centers monitoring queues, availability and live calls.",
      body: ["For call centers and BPO floors, ODA7 focuses on supervision: supervisors monitor concurrent queue volume live, balance agent availability states and coach reps during calls."],
      approach: [
        "Live queue telemetry to prevent abandoned calls",
        "Agent availability balancing from the status grid",
        "One-click silent listening and whisper coaching into rep headsets",
        "Hourly pickup heatmaps to plan shift staffing",
      ],
      audience: ["Floor supervisors", "Call center managers"],
      features: ["floor-queue-monitor", "agent-status-grid", "call-heatmaps", "attendance"],
      sources: S,
    },
    {
      slug: "revenue-agencies",
      name: "Multi-client BPO & lead-gen agencies",
      summary: "Agencies running several client sales pods under one master login.",
      body: ["Revenue and lead-generation agencies can run several client sales pods from one master login in ODA7, with each client kept separate in data, telephony, talk tracks and billing."],
      approach: [
        "Isolated pods per client with strict data partitioning",
        "Dedicated carrier trunks per client",
        "Distinct talk tracks for each client",
        "Segmented client billing including itemized carrier minutes",
        "Automated commission pay for agency reps",
      ],
      audience: ["BPO agencies", "Lead-gen agencies"],
      features: ["multi-tenant-organizations", "dynamic-sales-scripts", "commission-engine", "team-hierarchy"],
      sources: S,
    },
    {
      slug: "saas-platform-resellers",
      name: "White-label SaaS platform resellers",
      summary: "Operators running ODA7 as their own multi-tenant SaaS platform.",
      body: ["ODA7 can be operated as an isolated multi-tenant SaaS platform: the operator provisions client workspaces, bills them on subscription and controls security across all tenants, under their own domain and brand."],
      approach: [
        "One-click tenant provisioning",
        "Custom CNAME domains and white-label branding",
        "Subscription billing tiers (the site names Stripe)",
        "Global IP defense across the platform",
      ],
      audience: ["Platform operators", "Resellers"],
      features: ["multi-tenant-organizations", "white-labeling", "saas-plans", "ip-blocker", "partner-referrals"],
      sources: S,
    },
    ...roleSolutions,
  ],
  productResources: oda7Resources,
  productIntegrations: [
    {
      slug: "whatsapp-business-api",
      name: "WhatsApp Business API",
      summary: "Official WhatsApp Business messaging from the lead record.",
      connects: "ODA7 connects to the official WhatsApp Business API so reps message prospects from the lead record and conversations land in the unified inbox.",
      workflow: [
        "Send approved WhatsApp templates and track reads",
        "Run verified broadcast campaigns and automated reminders",
        "Use interactive message buttons",
        "Include WhatsApp steps in automated sequences",
        "Route critical alerts to WhatsApp",
      ],
      registry: "whatsapp",
      features: ["whatsapp-business-messaging", "unified-inbox", "automated-sequences", "template-studio", "notification-routing"],
      sources: S,
    },
    {
      slug: "slack",
      name: "Slack",
      summary: "Scheduled reports and critical alerts delivered to Slack.",
      connects: "ODA7 sends scheduled BI reports and routed alerts to Slack channels.",
      workflow: [
        "Deliver daily or weekly PDF/CSV reports to Slack channels",
        "Route critical alerts to Slack",
        "Apply escalation policies to alerts",
        "Combine with SMS, WhatsApp and browser push routing",
      ],
      registry: "slack",
      features: ["scheduled-bi-reports", "notification-routing"],
      sources: S,
    },
  ],
  supportTopics: [
    {
      slug: "planning-an-implementation",
      name: "Planning an ODA7 implementation",
      summary: "What to map before ODA7 scopes your rollout, integrations and pricing.",
      body: ["ODA7's own guidance is to start by mapping how your organization works today; ODA7 then confirms scope, integrations, rollout expectations and pricing in a proposal. No price or entitlement is implied until it is confirmed in that proposal."],
      steps: [
        "Map your teams and current tools",
        "Map lead and calling workflows",
        "Map people operations and reporting requirements",
        "List the platform controls you need",
        "Have ODA7 confirm scope, integrations, rollout and pricing",
      ],
      links: [{ label: "ODA7 website", href: SITE }],
      features: ["lead-distribution", "integrated-dialer", "attendance", "roles-permissions"],
      sources: S,
    },
    {
      slug: "creating-an-agency-workspace",
      name: "Creating an agency workspace",
      summary: "How a new agency signs up, picks a plan and gets admin access.",
      body: ["New agencies create their own tenant on oda7.com. Sign-up gives an agency admin account, a subscription and workspace access — the same flow ODA7's super admin uses to onboard a new customer."],
      steps: [
        "Register as a company with the agency name, your name and work email",
        "Set a password and continue to plans",
        "Choose a billing plan and pay with Razorpay",
        "Invite your team from Settings → Users",
      ],
      links: [{ label: "Create an account", href: "https://oda7.com/sign-up" }],
      features: ["multi-tenant-organizations", "billing-center"],
      sources: ["https://oda7.com/sign-up"],
    },
    {
      slug: "signing-in-and-access",
      name: "Signing in and getting access",
      summary: "How agents get access, sign in and reset a password.",
      body: ["Agents don't sign themselves up: the workspace admin invites them. Users then sign in with their work email or Google."],
      steps: [
        "Ask your workspace admin to invite you from Settings → Users",
        "Sign in with your work email and password, or with Google",
        "If you forget your password, request a reset link with your work email",
        "Use the one-time reset link within 30 minutes",
      ],
      links: [
        { label: "Sign in", href: "https://oda7.com/sign-in" },
        { label: "Reset password", href: "https://oda7.com/forgot-password" },
      ],
      features: ["roles-permissions"],
      sources: ["https://oda7.com/sign-in", "https://oda7.com/forgot-password"],
    },
    ...moreSupportTopics,
  ],
  pricing: {
    note: "ODA7 does not publish prices. Pricing depends on team shape, modules and platform requirements and is confirmed in a proposal.",
    trial: "Plans are shaped around your operation and confirmed in an ODA7 proposal.",
    plans: [
      {
        name: "Sales Workspace",
        price: "Custom",
        description: "For teams that need one focused path from lead assignment to follow-up.",
        features: ["Dashboard, leads and companies", "Dialer, calls and scripts", "Campaigns, sequences and quotes", "Agent and manager views"],
        cta: { label: "Discuss your workflow", href: SITE },
      },
      {
        name: "Business Operations",
        price: "Custom",
        description: "For organizations connecting sales execution with people and performance.",
        features: ["Everything in Sales Workspace", "Teams, departments and onboarding", "Attendance, leave and payroll", "Incentives, contests and analytics"],
        cta: { label: "Plan your workspace", href: SITE },
        recommended: true,
      },
      {
        name: "Platform / Super Admin",
        price: "Custom",
        description: "For platform operators managing organizations, plans and administration.",
        features: ["Organizations and customer accounts", "Plans, subscriptions and invoices", "Audit logs, branding and notifications", "Platform settings and AI features"],
        cta: { label: "Talk to platform sales", href: SITE },
      },
    ],
    asOf: "2026-10-08",
    sourceUrl: SITE,
  },
  useCases: [
    { title: "High-velocity SDR floors", description: "Inbound leads go straight into a prioritized queue, reps dial with local presence numbers from the browser, and branching talk tracks and objection battlecards support each call." },
    { title: "Call centers and BPOs", description: "Supervisors watch live queue volume, balance agent availability from the status grid, and use silent listening and whisper coaching during calls; hourly pickup heatmaps inform shift staffing." },
    { title: "Revenue agencies", description: "Several client pods run under one master login, each with its own data partition, carrier trunk, talk tracks and segmented billing including itemized carrier minutes." },
    { title: "SaaS platform resellers", description: "Operators provision client workspaces, bill them on subscription and control security across tenants under their own domain and brand." },
    { title: "Paying commission without spreadsheets", description: "A deal marked closed-won triggers the commission tier calculation and credits the rep's wallet, and the month-end payroll run produces itemized PDF payslips." },
  ],
  faqs: [
    { question: "How is ODA7 different from a traditional CRM or standalone dialer?", answer: "ODA7 presents itself as a connected business workspace: leads, calling, team structure, attendance, compensation and analytics share one operating context instead of being separate tools." },
    { question: "Which sales workflows does ODA7 cover?", answer: "Leads, dialer, calls, inbox, calendar, campaigns, products, scripts, sequences and quotes. ODA7 says exact implementation and telephony requirements should be confirmed with them." },
    { question: "How does ODA7 use AI?", answer: "The site demonstrates AI-assisted recommendations and analytical explanations inside the workflow. Its previews are illustrative; capability, availability and data requirements are confirmed during scoping." },
    { question: "What can managers see?", answer: "Team activity, calls, queue ownership, performance context and coaching workflows — shaped by role and workspace configuration." },
    { question: "What is the Super Admin platform?", answer: "A separate experience covering organizations, plans, subscriptions, invoices, audit context, data platforms, AI assistance, IP controls, branding and platform-wide administration." },
    { question: "How should we plan an implementation?", answer: "Map your teams, current tools, lead and calling workflows, people operations, reporting needs and platform controls; ODA7 then confirms scope, integrations, rollout and pricing." },
    { question: "Is ODA7 pricing published?", answer: "No. All three starting points are priced on scope, and ODA7 says no price or entitlement applies until confirmed in a proposal." },
    { question: "Can agents create their own accounts?", answer: "No. Agents get access through their workspace admin, who invites them from Settings → Users. They then sign in with their work email and password, or with Google." },
    { question: "How does a new agency get started?", answer: "An agency registers on oda7.com with its organization name, the admin's name and work email, chooses a billing plan and pays with Razorpay. Sign-up creates an agency admin account, a subscription and workspace access — the same flow ODA7's super admin uses to onboard a customer." },
    { question: "Which messaging channels does ODA7 connect to?", answer: "The site describes the official WhatsApp Business API alongside two-way SMS and email in a unified inbox on the lead record, and Slack as a destination for scheduled reports and routed alerts." },
    { question: "Is there a free trial?", answer: "ODA7 states that no price or entitlement is implied until it is confirmed in an ODA7 proposal. Ask ODA7 about trial and migration terms while scoping your workspace." },
  ],
  sources: [SITE, "https://oda7.com/", "https://oda7.com/sign-in", "https://oda7.com/sign-up", "https://oda7.com/forgot-password", "https://oda7.com/robots.txt", "https://oda7.com/sitemap.xml"],
  lastVerified: "2026-10-08",
};
