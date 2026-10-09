/**
 * Pure search scoring shared by the server (popular-search checks) and the
 * client search page. No imports, so it is safe in both bundles.
 */

export type SearchType = "Product" | "Feature" | "Solution" | "Industry" | "Integration" | "Resource" | "FAQ" | "Support" | "Page";

/** The fields scoring needs (a subset of SearchEntry). */
export interface Scorable {
  title: string;
  type: SearchType;
  description: string;
  product?: string;
  category?: string;
  keywords?: string;
}

export const tokenize = (q: string) =>
  q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}&+.#-]+/gu, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter(Boolean);

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Score one term against an entry. Tiers: title word-start > keyword/product/category > description.
 * Returns 0 when the term is not found at all.
 */
function termScore(title: string, kw: string, desc: string, t: string): number {
  if (title.startsWith(t)) return 30;
  if (new RegExp(`(^|[^\\p{L}\\p{N}])${esc(t)}`, "u").test(title)) return 22;
  if (title.includes(t)) return 12;
  if (kw.includes(t)) return 6;
  if (desc.includes(t)) return 3;
  return 0;
}

export interface ScoreResult {
  score: number;
  /** Terms the entry matched. */
  hits: number;
}

/** Relevance: exact title > title prefix > title word > keyword > description; products boosted. */
export function scoreEntry(e: Scorable, terms: string[], phrase: string): ScoreResult {
  if (!terms.length) return { score: 0, hits: 0 };
  const title = e.title.toLowerCase();
  const kw = `${e.keywords ?? ""} ${e.product ?? ""} ${e.category ?? ""}`.toLowerCase();
  const desc = e.description.toLowerCase();
  let score = 0;
  let hits = 0;
  for (const t of terms) {
    const s = termScore(title, kw, desc, t);
    if (s) hits++;
    score += s;
  }
  if (!hits) return { score: 0, hits: 0 };
  if (title === phrase) score += 100;
  else if (title.startsWith(phrase)) score += 40;
  else if (terms.length > 1 && title.includes(phrase)) score += 20;
  if (e.type === "Product") score += 15;
  else if (e.type === "Solution" || e.type === "Industry") score += 4;
  else if (e.type === "FAQ") score -= 2;
  return { score, hits };
}

/**
 * Ranks entries. All terms must match (AND); when nothing matches every term,
 * falls back to entries matching any term (OR) and says so.
 */
export function rank<T extends Scorable>(entries: T[], query: string): { results: { e: T; score: number }[]; mode: "all" | "any" } {
  const terms = [...new Set(tokenize(query))];
  const phrase = terms.join(" ");
  if (!terms.length) return { results: [], mode: "all" };
  const scored = entries.map((e) => ({ e, ...scoreEntry(e, terms, phrase) })).filter((x) => x.hits > 0);
  const all = scored.filter((x) => x.hits === terms.length);
  const pick = all.length || terms.length === 1 ? all : scored;
  const results = pick.sort((a, b) => b.score - a.score || a.e.title.localeCompare(b.e.title)).map(({ e, score }) => ({ e, score }));
  return { results, mode: all.length || terms.length === 1 ? "all" : "any" };
}
