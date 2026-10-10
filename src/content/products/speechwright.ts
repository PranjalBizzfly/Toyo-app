import type { Product } from "@/content/types";

/**
 * Speechwright's site was rendered with Playwright.
 * Its pack prices (from ₹5 for 25 chats) and the sign-in testimonial look like
 * placeholder/test data and are deliberately not used.
 */
export const myspeechmaker: Product = {
  id: "speechwright",
  slug: "speechwright",
  name: "Speechwright",
  shortDescription:
    "AI speech writing grounded in your own biography, signature phrases, documents and voice notes.",
  longDescription:
    "Speechwright writes personalised speeches with AI. You build a speaker profile once, with your biography, signature phrases, achievements and values, and every speech draws on it.\n\nYou can upload PDF, DOCX or TXT files, and the most relevant passages are retrieved when you draft. Voice notes are transcribed and tagged by mood and topic, so the right story surfaces later.\n\nClaude and GPT write in parallel, side by side. You compare the drafts, pick the one that sounds like you, edit and export. A sources card shows which profile fields, document passages and voice notes each run uses. You can bring your own Anthropic and OpenAI keys, which the site says are encrypted at rest.\n\nSign up includes one free speech with no card needed, and paid packs are one-time top-ups that never expire.",
  tagline: "Speeches that sound like you.",
  category: "sales-marketing",
  subcategory: "creative-operations",
  primaryUseCase: "AI speech writing in your own voice",
  platforms: ["web"],
  market: "India",
  status: "pending",
  verification: {
    relationship: "pending",
    publicSale: "pending",
    notes: "Pack prices on the site look like test values; confirm before publishing pricing.",
  },
  accent: "#2969FF",
  websiteUrl: "https://myspeechmaker.com/",
  appUrl: "https://myspeechmaker.com/signup",
  featureCategories: [
    { slug: "writing", name: "Writing", description: "Draft speeches with two AI models, grounded in your own story." },
    { slug: "voice-library", name: "Voice library", description: "Teach the AI your style with your profile, documents and voice notes." },
    { slug: "workspace", name: "Workspace", description: "Keys, teams and export." },
  ],
  features: [
    {
      slug: "dual-model-generation",
      name: "Dual-model generation",
      summary: "Claude and GPT stream in parallel so you can compare phrasing, cadence and ideas.",
      category: "writing",
      highlight: true,
    },
    {
      slug: "speaker-profile",
      name: "Speaker profile",
      summary: "A structured profile of your biography, signature phrases, achievements and values that every speech inherits.",
      category: "voice-library",
      highlight: true,
    },
    {
      slug: "document-library",
      name: "Document library",
      summary: "Upload PDF, DOCX or TXT files. The most relevant passages are retrieved whenever you draft.",
      category: "voice-library",
      highlight: true,
    },
    {
      slug: "voice-note-inspirations",
      name: "Voice-note inspirations",
      summary: "Record stories on the go. They are transcribed and tagged by mood and topic.",
      category: "voice-library",
    },
    {
      slug: "sources-card",
      name: "Sources card",
      summary: "See which profile fields, document passages and voice notes the AI is using before the draft streams.",
      category: "writing",
    },
    {
      slug: "speech-extras",
      name: "Audio, mind map and quiz",
      summary: "Audio, a mind map and a quiz are generated alongside every speech.",
      category: "writing",
    },
    {
      slug: "bring-your-own-keys",
      name: "Bring your own keys",
      summary: "Use your own Anthropic and OpenAI keys, encrypted at rest and never logged.",
      category: "workspace",
    },
    {
      slug: "team-workspaces",
      name: "Team workspaces",
      summary: "Invite editors, viewers and owners to your workspace.",
      category: "workspace",
    },
    {
      slug: "export",
      name: "Export",
      summary: "Export to Word and PDF, or email the full package in one click.",
      category: "workspace",
    },
  ],
  benefits: [
    { title: "Sounds like you", description: "Every speech draws on your own biography, phrases, achievements and values, not a generic prompt." },
    { title: "Two drafts to choose from", description: "Claude and GPT write side by side, so you can pick the phrasing and cadence that fit you." },
    { title: "Your stories, on hand", description: "Documents and voice notes are searched for the most relevant passages and anecdotes when you draft." },
    { title: "You see the sources", description: "A sources card shows exactly what the AI is drawing on for each run." },
  ],
  security: [
    { title: "Encrypted API keys", description: "The site states that your own Anthropic and OpenAI keys are Fernet-encrypted at rest, never logged and never returned." },
  ],
  howItWorks: [
    { title: "Build your profile", description: "Add your biography, signature phrases, top achievements and values. Upload supporting documents." },
    { title: "Describe the occasion", description: "Set the topic, audience, tone and target length. Relevant context is retrieved from your library." },
    { title: "Compare and refine", description: "Watch Claude and GPT write live, side by side. Pick the version that sounds like you, edit and export." },
  ],
  useCases: [
    { title: "Keynotes", description: "Draft a keynote that uses your own stories and signature phrases." },
    { title: "Speakers short on time", description: "The site says a speech is ready in under two minutes, with no writing experience needed." },
    { title: "Teams preparing speeches together", description: "Invite editors and viewers to a shared workspace." },
  ],
  faqs: [
    { question: "What is Speechwright?", answer: "Speechwright is an AI speech writer. It drafts speeches from your biography, signature phrases, documents and voice notes." },
    { question: "Which AI models does it use?", answer: "Claude and GPT write in parallel, side by side, so you can compare the drafts." },
    { question: "What files can I upload?", answer: "PDF, DOCX and TXT files. The site's sign-up page also mentions audio and YouTube links for the voice library." },
    { question: "Can I try it for free?", answer: "Yes. Sign up includes one free speech, with no credit card required." },
    { question: "How does paying work?", answer: "Paid plans are one-time top-up packs of chats. Chats never expire." },
    { question: "Can I export my speech?", answer: "Yes. You can export to Word and PDF or email the full package." },
  ],
  sources: [
    "https://myspeechmaker.com/",
    "https://myspeechmaker.com/signup",
    "https://myspeechmaker.com/login",
  ],
  lastVerified: "2026-10-10",
};
