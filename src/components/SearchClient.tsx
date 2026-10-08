"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import type { IconName } from "@/content/types";
import type { SearchEntry, SearchType } from "@/lib/search-index";
import { Icon } from "@/components/ui/Icon";

type Named = { slug: string; name: string };
type Linked = Named & { href: string };

/** Browse data for the page before (and around) a search — all from the catalog. */
export interface SearchBrowse {
  categories: (Linked & { tagline: string; icon: IconName; count: number })[];
  products: Named[];
  featured: { label: string; href: string; note?: string }[];
  solutions: Linked[];
  industries: Linked[];
  integrations: Named[];
  counts: { products: number; features: number; faqs: number; integrations: number };
}

/** Display order of result types, and their labels. */
const TYPE_ORDER: SearchType[] = ["Product", "Feature", "Feature group", "Solution", "Industry", "Integration", "Resource", "FAQ", "Category", "Product page", "Support"];
const TYPE_PLURAL: Partial<Record<SearchType, string>> = { Product: "Products", Feature: "Features", Solution: "Solutions", Industry: "Industries", Integration: "Integrations", Category: "Categories" };
const TYPE_LABEL: Record<SearchType, string> = {
  Product: "Product",
  Feature: "Feature",
  "Feature group": "Feature group",
  Solution: "Solution",
  Industry: "Industry",
  Integration: "Integration",
  Resource: "Resource",
  FAQ: "FAQ",
  Category: "Category",
  "Product page": "Product page",
  Support: "Support",
};
/** Types offered as live suggestions, in order. */
const SUGGEST_TYPES: SearchType[] = ["Product", "Feature", "Solution", "Industry", "Integration", "Category"];
const PAGE = 24;

type Filters = { type: string; product: string; category: string; industry: string; solution: string; integration: string };
const NO_FILTERS: Filters = { type: "", product: "", category: "", industry: "", solution: "", integration: "" };

function score(e: SearchEntry, terms: string[]): number {
  const title = e.title.toLowerCase();
  const hay = `${title} ${e.description} ${e.product ?? ""} ${e.category ?? ""} ${e.keywords ?? ""} ${e.type}`.toLowerCase();
  if (!terms.every((t) => hay.includes(t))) return 0;
  let s = 1;
  for (const t of terms) {
    if (title.startsWith(t)) s += 8;
    else if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(title)) s += 6;
    else if (title.includes(t)) s += 4;
    if (e.product?.toLowerCase().includes(t)) s += 1;
  }
  if (e.type === "Product") s += 3;
  if (e.type === "Solution" || e.type === "Industry") s += 1;
  return s;
}

/** Highlights the query terms inside a string. */
function Mark({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return (
    <>
      {text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}
    </>
  );
}

/** Ecosystem-wide search: hero box with live suggestions, filters, rich results and discovery links. */
export function SearchClient({ browse }: { browse: SearchBrowse }) {
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [limit, setLimit] = useState(PAGE);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // The index is a static JSON file built with the site.
  useEffect(() => {
    let live = true;
    fetch("/search/index.json")
      .then((r) => r.json())
      .then((data: SearchEntry[]) => live && setIndex(data))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, []);

  // ?q= deep links (header search and shared URLs).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [query]);
  useEffect(() => {
    const onDown = (e: MouseEvent) => boxRef.current && !boxRef.current.contains(e.target as Node) && setSuggestOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const deferred = useDeferredValue(query.trim().toLowerCase());
  const terms = useMemo(() => deferred.split(/\s+/).filter(Boolean), [deferred]);

  const matches = useMemo(() => {
    if (!terms.length) return [];
    return index
      .map((e) => ({ e, s: score(e, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || TYPE_ORDER.indexOf(a.e.type) - TYPE_ORDER.indexOf(b.e.type))
      .map((x) => x.e);
  }, [index, terms]);

  const filtered = useMemo(
    () =>
      matches.filter(
        (m) =>
          (!filters.type || m.type === filters.type) &&
          (!filters.product || m.productSlug === filters.product) &&
          (!filters.category || m.categorySlug === filters.category) &&
          (!filters.industry || m.industries?.includes(filters.industry)) &&
          (!filters.solution || m.solutions?.includes(filters.solution)) &&
          (!filters.integration || m.integrations?.includes(filters.integration)),
      ),
    [matches, filters],
  );

  // Facet options limited to what the current matches actually contain.
  const facets = useMemo(() => {
    const has = (pick: (m: SearchEntry) => string[] | string | undefined) => {
      const set = new Set<string>();
      for (const m of matches) [pick(m)].flat().forEach((v) => v && set.add(v));
      return set;
    };
    const types = has((m) => m.type);
    const products = has((m) => m.productSlug);
    const categories = has((m) => m.categorySlug);
    const industries = has((m) => m.industries);
    const solutions = has((m) => m.solutions);
    const integrations = has((m) => m.integrations);
    return {
      type: TYPE_ORDER.filter((t) => types.has(t)).map((t) => ({ value: t, label: `${TYPE_LABEL[t]} (${matches.filter((m) => m.type === t).length})` })),
      product: browse.products.filter((p) => products.has(p.slug)).map((p) => ({ value: p.slug, label: p.name })),
      category: browse.categories.filter((c) => categories.has(c.slug)).map((c) => ({ value: c.slug, label: c.name })),
      industry: browse.industries.filter((i) => industries.has(i.slug)).map((i) => ({ value: i.slug, label: i.name })),
      solution: browse.solutions.filter((s) => solutions.has(s.slug)).map((s) => ({ value: s.slug, label: s.name })),
      integration: browse.integrations.filter((i) => integrations.has(i.slug)).map((i) => ({ value: i.slug, label: i.name })),
    };
  }, [matches, browse]);

  // Live suggestions: top matches per type, from the live (non-deferred) query.
  const suggestions = useMemo(() => {
    const t = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!t.length) return [];
    const ranked = index.map((e) => ({ e, s: score(e, t) })).filter((x) => x.s > 1 && SUGGEST_TYPES.includes(x.e.type));
    return SUGGEST_TYPES.map((type) => ({
      type,
      items: ranked
        .filter((x) => x.e.type === type)
        .sort((a, b) => b.s - a.s)
        // One suggestion per name (e.g. "Slack" exists globally and under several products).
        .filter((x, i, arr) => arr.findIndex((y) => y.e.title === x.e.title) === i)
        .slice(0, type === "Feature" ? 4 : 3)
        .map((x) => x.e),
    })).filter((g) => g.items.length);
  }, [index, query]);
  const flatSuggestions = suggestions.flatMap((g) => g.items);

  // Related discovery: products behind the top results that aren't results themselves.
  const relatedProducts = useMemo(() => {
    const shownProducts = new Set(filtered.filter((m) => m.type === "Product").map((m) => m.productSlug));
    const seen = new Map<string, { label: string; href: string; why: string }>();
    for (const m of filtered.slice(0, 30)) {
      for (const r of relatedOf(m)) {
        if (!r.href.startsWith("/products/") || r.href.split("/").length !== 3) continue;
        const slug = r.href.split("/")[2];
        if (shownProducts.has(slug) || seen.has(slug)) continue;
        seen.set(slug, { ...r, why: `Related to ${m.title}` });
      }
    }
    return [...seen.values()].slice(0, 4);
  }, [filtered]);

  const setFilter = (k: keyof Filters, v: string) => {
    setFilters((f) => ({ ...f, [k]: v }));
    setLimit(PAGE);
  };
  const activeFilters = (Object.keys(filters) as (keyof Filters)[]).filter((k) => filters[k]);
  const showSuggest = suggestOpen && query.trim().length > 0 && flatSuggestions.length > 0;

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggest) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % flatSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? flatSuggestions.length - 1 : a - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      window.location.href = flatSuggestions[active].href;
    } else if (e.key === "Escape") setSuggestOpen(false);
  };

  const filterDefs: { key: keyof Filters; label: string; all: string }[] = [
    { key: "type", label: "Content type", all: "All types" },
    { key: "product", label: "Product", all: "All products" },
    { key: "category", label: "Category", all: "All categories" },
    { key: "industry", label: "Industry", all: "All industries" },
    { key: "solution", label: "Solution", all: "All solutions" },
    { key: "integration", label: "Integration", all: "All integrations" },
  ];

  return (
    <div className="srch">
      {/* 1. Hero search */}
      <header className="srch-hero">
        <div className="container srch-hero__inner">
          <p className="srch-hero__kicker">ToyoApps search</p>
          <h1>Find the right software for your business</h1>
          <p className="srch-hero__lead">
            One search across the whole ToyoApps ecosystem — {browse.counts.products} products, {browse.counts.features} features, their solutions, industries,{" "}
            {browse.counts.integrations} integrations, resources and {browse.counts.faqs} answered questions. Type a product name, a task like &ldquo;payroll&rdquo; or a tool you already use.
          </p>

          <div className="srch-box" ref={boxRef}>
            <label className="srch-box__field">
              <Icon name="search" />
              <span className="sr-only">Search ToyoApps</span>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setFilters(NO_FILTERS);
                  setLimit(PAGE);
                  setSuggestOpen(true);
                  setActive(-1);
                }}
                onFocus={() => setSuggestOpen(true)}
                onKeyDown={onKey}
                placeholder="Search products, features, solutions, industries, integrations, resources..."
                autoComplete="off"
                role="combobox"
                aria-expanded={showSuggest}
                aria-controls={listId}
                aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
              />
              {query && (
                <button type="button" className="srch-box__clear" aria-label="Clear search" onClick={() => (setQuery(""), setFilters(NO_FILTERS))}>
                  ×
                </button>
              )}
            </label>

            {showSuggest && (
              <div className="srch-suggest" id={listId} role="listbox" aria-label="Suggestions">
                {suggestions.map((g) => (
                  <div key={g.type} className="srch-suggest__group" role="group" aria-label={TYPE_LABEL[g.type]}>
                    <p className="srch-suggest__label">{TYPE_PLURAL[g.type] ?? TYPE_LABEL[g.type]}</p>
                    {g.items.map((m) => {
                      const i = flatSuggestions.indexOf(m);
                      return (
                        <Link key={m.id} id={`${listId}-${i}`} href={m.href} role="option" aria-selected={i === active} className="srch-suggest__item" onClick={() => setSuggestOpen(false)}>
                          <span>
                            <Mark text={m.title} terms={terms.length ? terms : query.toLowerCase().split(/\s+/).filter(Boolean)} />
                          </span>
                          {m.product && m.type !== "Product" && <small>{m.product}</small>}
                          {m.type === "Product" && m.category && <small>{m.category}</small>}
                        </Link>
                      );
                    })}
                  </div>
                ))}
                <button type="button" className="srch-suggest__all" onClick={() => setSuggestOpen(false)}>
                  See all {matches.length} results <Icon name="arrow-right" />
                </button>
              </div>
            )}
          </div>

          <p className="srch-hero__try">
            Try:{" "}
            {["payroll", "business cards", "Gmail signature", "GST", "Slack"].map((t) => (
              <button key={t} type="button" onClick={() => (setQuery(t), setSuggestOpen(false))}>
                {t}
              </button>
            ))}
          </p>
        </div>
      </header>

      <div className="container srch-body">
        {terms.length === 0 ? (
          /* 2. Browse before searching */
          <BrowseBlock browse={browse} />
        ) : loading ? (
          <p className="srch-loading" aria-live="polite">
            Searching the ToyoApps catalog…
          </p>
        ) : matches.length === 0 ? (
          /* 7. No results */
          <NoResults query={query.trim()} browse={browse} />
        ) : (
          <div className="srch-layout">
            {/* 5. Filters */}
            <aside className="srch-filters" aria-label="Filter results">
              <div className="srch-filters__head">
                <h2>Filter results</h2>
                {activeFilters.length > 0 && (
                  <button type="button" onClick={() => setFilters(NO_FILTERS)}>
                    Clear all
                  </button>
                )}
              </div>
              {filterDefs.map(({ key, label, all }) =>
                facets[key].length > (key === "type" ? 1 : 0) ? (
                  <label key={key} className="srch-filter">
                    <span>{label}</span>
                    <select value={filters[key]} onChange={(e) => setFilter(key, e.target.value)}>
                      <option value="">{all}</option>
                      {facets[key].map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null,
              )}
            </aside>

            <section className="srch-results" aria-label="Search results">
              <p className="srch-count" aria-live="polite">
                <strong>{filtered.length}</strong> {filtered.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}&rdquo;
                {activeFilters.length > 0 && <span> · filtered from {matches.length}</span>}
              </p>

              {/* Type chips: quick content-type switch */}
              {facets.type.length > 1 && (
                <div className="srch-chips" role="group" aria-label="Content type">
                  <button type="button" aria-pressed={!filters.type} onClick={() => setFilter("type", "")}>
                    All <span>{matches.length}</span>
                  </button>
                  {facets.type.map((t) => (
                    <button key={t.value} type="button" aria-pressed={filters.type === t.value} onClick={() => setFilter("type", filters.type === t.value ? "" : t.value)}>
                      {TYPE_LABEL[t.value as SearchType]} <span>{matches.filter((m) => m.type === t.value).length}</span>
                    </button>
                  ))}
                </div>
              )}

              {filtered.length === 0 ? (
                <p className="srch-none-filtered">
                  No results match these filters.{" "}
                  <button type="button" onClick={() => setFilters(NO_FILTERS)}>
                    Clear filters
                  </button>
                </p>
              ) : (
                <ul className="srch-list">
                  {filtered.slice(0, limit).map((m) => (
                    <li key={m.id}>
                      <ResultCard entry={m} terms={terms} />
                    </li>
                  ))}
                </ul>
              )}
              {filtered.length > limit && (
                <button type="button" className="srch-more" onClick={() => setLimit((l) => l + PAGE)}>
                  Show more results ({filtered.length - limit} left)
                </button>
              )}

              {/* 8. Related discovery */}
              {relatedProducts.length > 0 && (
                <section className="srch-related" aria-labelledby="srch-related-title">
                  <h2 id="srch-related-title">Related products</h2>
                  <p>Products connected to the results above that you may also want to look at.</p>
                  <ul>
                    {relatedProducts.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href}>
                          <strong>{r.label}</strong>
                          <small>{r.why}</small>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

/** A result's related links; product-scoped items link back to their product. */
function relatedOf(m: SearchEntry) {
  const own = m.productSlug && m.type !== "Product" ? [{ label: m.product ?? m.productSlug, href: `/products/${m.productSlug}` }] : [];
  return [...own, ...(m.related ?? [])];
}

function ResultCard({ entry: m, terms }: { entry: SearchEntry; terms: string[] }) {
  const related = relatedOf(m);
  const cta = m.type === "Product" ? "View product" : m.type === "FAQ" ? "Read answer" : m.type === "Category" || m.type === "Solution" || m.type === "Industry" ? "Explore" : "View";
  return (
    <article className="srch-card" data-type={m.type}>
      <div className="srch-card__meta">
        <span className="srch-card__type">{TYPE_LABEL[m.type]}</span>
        {m.category && m.type !== "Category" && <span>{m.category}</span>}
        {m.product && m.type !== "Product" && <span>{m.product}</span>}
      </div>
      <h3>
        <Link href={m.href}>
          <Mark text={m.title} terms={terms} />
        </Link>
      </h3>
      {m.description && <p className="srch-card__desc">{m.description}</p>}
      <div className="srch-card__foot">
        {related.length > 0 && (
          <p className="srch-card__related">
            <span>{m.type === "Solution" || m.type === "Industry" || m.type === "Integration" || m.type === "Resource" ? "Products" : m.productSlug && m.type !== "Product" ? "In" : "Related"}</span>
            {related.slice(0, 4).map((r, i) => (
              <span key={r.href}>
                {i > 0 && " · "}
                <Link href={r.href}>{r.label}</Link>
              </span>
            ))}
          </p>
        )}
        <Link href={m.href} className="srch-card__cta" aria-label={`${cta}: ${m.title}`}>
          {cta} <Icon name="arrow-right" />
        </Link>
      </div>
    </article>
  );
}

function BrowseBlock({ browse }: { browse: SearchBrowse }) {
  return (
    <div className="srch-browse">
      <section aria-labelledby="srch-cats">
        <div className="srch-sec-head">
          <h2 id="srch-cats">Browse by category</h2>
          <p>Not sure what to search for? Every ToyoApps product sits in the business function it serves.</p>
        </div>
        <ul className="srch-cats">
          {browse.categories.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} className="srch-cat">
                <span className="icon-tile">
                  <Icon name={c.icon} />
                </span>
                <strong>{c.name}</strong>
                <span className="srch-cat__desc">{c.tagline}</span>
                <small>
                  {c.count} {c.count === 1 ? "product" : "products"} <Icon name="arrow-right" />
                </small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="srch-popular" className="srch-popular">
        <div className="srch-sec-head">
          <h2 id="srch-popular">Popular places to start</h2>
          <p>Jump straight to the parts of the catalog people use most.</p>
        </div>
        <div className="srch-popular__grid">
          {browse.featured.length > 0 && (
            <DiscoverList title="Featured products" links={browse.featured} />
          )}
          {browse.solutions.length > 0 && <DiscoverList title="Solutions" links={browse.solutions.map((s) => ({ label: s.name, href: s.href }))} />}
          {browse.industries.length > 0 && <DiscoverList title="Industries" links={browse.industries.map((s) => ({ label: s.name, href: s.href }))} />}
        </div>
      </section>
    </div>
  );
}

function DiscoverList({ title, links }: { title: string; links: { label: string; href: string; note?: string }[] }) {
  return (
    <div className="srch-discover">
      <h3>{title}</h3>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              {l.label}
              {l.note && <small>{l.note}</small>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NoResults({ query, browse }: { query: string; browse: SearchBrowse }) {
  return (
    <section className="srch-empty" aria-live="polite">
      <h2>We couldn&apos;t find an exact match</h2>
      <p>
        Nothing in the ToyoApps catalog matches &ldquo;{query}&rdquo;. Try a shorter or more general word — a task like &ldquo;payroll&rdquo; or &ldquo;contacts&rdquo; often works better than a full
        sentence — check the spelling, or browse the catalog below.
      </p>
      <div className="srch-empty__links">
        <Link href="/products" className="srch-empty__link">
          <strong>Explore products</strong>
          <small>All {browse.counts.products} products in one catalog</small>
        </Link>
        {browse.solutions.length > 0 && (
          <Link href="/solutions" className="srch-empty__link">
            <strong>Browse solutions</strong>
            <small>Start from the business goal</small>
          </Link>
        )}
        {browse.industries.length > 0 && (
          <Link href="/industries" className="srch-empty__link">
            <strong>Browse industries</strong>
            <small>Software matched to your sector</small>
          </Link>
        )}
      </div>
      <h3 className="srch-empty__sub">Browse categories</h3>
      <ul className="srch-empty__cats">
        {browse.categories.map((c) => (
          <li key={c.slug}>
            <Link href={c.href}>
              {c.name} <span>{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
