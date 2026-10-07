import type { Feature } from "@/content/types";

/**
 * Pure content rules with no data imports, so client components can use them
 * without pulling the whole catalog into the browser bundle.
 */

/** A feature page exists only when flagged and it has real body content. */
export function featureHasPage(f: Feature): boolean {
  return !!f.hasPage && !!f.body?.length;
}
