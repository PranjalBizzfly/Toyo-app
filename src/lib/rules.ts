import type { Feature } from "@/content/types";

/**
 * Pure content rules with no data imports, so client components can use them
 * without pulling the whole catalog into the browser bundle.
 */

/** Minimum verified detail points (capabilities + how-it-works steps) for a feature page. */
export const MIN_FEATURE_DETAIL = 3;

/**
 * A feature gets its own page only when it is flagged AND its official source
 * gave enough real material: a "what it is" body plus at least three verified
 * capabilities or steps. This blocks shallow pages built from a name alone.
 */
export function featureHasPage(f: Feature): boolean {
  const detail = (f.capabilities?.length ?? 0) + (f.howItWorks?.length ?? 0);
  return !!f.hasPage && !!f.body?.length && detail >= MIN_FEATURE_DETAIL;
}

/** Minimum verified detail points for a product-scoped detail page (solution, industry, …). */
export const MIN_ENTITY_DETAIL = 4;

/**
 * A product-scoped detail page (solution, industry, integration, comparison,
 * resource, support topic) exists only with a summary, at least one paragraph
 * of explanation, and at least MIN_ENTITY_DETAIL concrete points across its
 * list fields (workflow, benefits, challenges, rows, steps, FAQs …).
 */
export function entityHasPage(e: { summary?: string; body?: string[]; problem?: string; connects?: string } & Record<string, unknown>): boolean {
  if (!e.summary) return false;
  const paragraphs = (e.body?.length ?? 0) + (e.problem ? 1 : 0) + (e.connects ? 1 : 0);
  if (!paragraphs) return false;
  let points = 0;
  for (const [k, v] of Object.entries(e)) {
    if (k === "body" || k === "sources" || k === "features") continue;
    if (Array.isArray(v)) points += v.length;
  }
  return points >= MIN_ENTITY_DETAIL;
}

/** A product security page exists only with at least three stated measures. */
export const MIN_SECURITY_ITEMS = 3;
