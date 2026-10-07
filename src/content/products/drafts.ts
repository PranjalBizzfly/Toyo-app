import type { Product } from "@/content/types";
import { featureSet, group } from "./_helpers";

/**
 * PENDING VERIFICATION: held as drafts (visible in preview only, never
 * indexed) until the business confirms they are publicly sold. See the product inventory §2.9–2.10.
 */

export const fleetras: Product = {
  id: "fleetras",
  slug: "fleetras",
  name: "Fleetras",
  shortDescription: "Fleet dispatch and trip-cost tracking for city fleet operations, with costs worked out per kilometre.",
  tagline: "Every trip. Every dirham. Fully accounted.",
  category: "operations-it",
  subcategory: "fleet-logistics",
  primaryUseCase: "Fleet dispatch and trip costing",
  audience: ["Fleet operators", "Dispatchers", "Drivers"],
  platforms: ["web"],
  market: "UAE",
  status: "pending",
  websiteUrl: "https://fleetras.com/",
  verification: { relationship: "pending", publicSale: "pending", notes: "Login-only site marked noindex; accounts created by an administrator." },
  ...featureSet(
    group("Features", [
      ["Dispatch and live trips", "Assign, track and close every ride from one board."],
      ["Finished by the driver", "The driver's reading and expenses close the trip and the cost is worked out there and then."],
      ["Cost per kilometre", "Fuel, Salik, parking and fines on every trip."],
    ]),
  ),
  sources: ["https://fleetras.com/", "https://fleetras.com/privacy"],
  lastVerified: "2026-10-07",
};

export const meetingmind: Product = {
  id: "meetingmind",
  slug: "meetingmind",
  name: "MeetingMind",
  shortDescription: "AI meeting analysis — summaries, action items and decisions, with an assistant you can ask about past meetings.",
  category: "insights-research",
  secondaryCategories: ["hr-people"],
  subcategory: "meeting-intelligence",
  primaryUseCase: "Turning meetings into actions",
  platforms: ["web"],
  market: "Global",
  status: "pending",
  websiteUrl: "https://meeting.oxo1.com/",
  verification: { relationship: "pending", publicSale: "pending", notes: "No public marketing site; copy read from the app bundle only." },
  appUrl: "https://meeting.oxo1.com/signup",
  ...featureSet(
    group("Features", [
      ["Meeting summaries", "Summaries, action items and decisions for each meeting."],
      ["Meeting assistant", "Ask questions across your meetings."],
      ["Projects & tasks", "Turn meeting outcomes into tracked work."],
      ["Team workspace", "Shared workspace with roles."],
    ]),
  ),
  sources: ["https://meeting.oxo1.com/"],
  lastVerified: "2026-10-07",
};
