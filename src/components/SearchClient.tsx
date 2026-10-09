"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { IconName } from "@/content/types";
import type { SearchEntry } from "@/lib/search-index";
import { rank, tokenize, type SearchType } from "@/lib/search-score";
import { Icon } from "@/components/ui/Icon";

type Named = { slug: string; name: string };

/** Browse data for the page before a search — all from the catalog. */
export interface SearchBrowse {
  categories: (Named & { href: string; tagline: string; icon: IconName; count: number })[];
  products: Named[];
  featured: { label: string; href: string; note?: string; kind: string }[];
  /** Real queries verified at build time to return results. */
  popular: string[];
  solutions: Named[];
  industries: Named[];
  integrations: Named[];
  total: number;
}

/** Display order of result types, and their labels. */
const TYPE_ORDER: SearchType[] = ["Product", "Feature", "Solution", "Industry", "Integration", "Resource", "FAQ", "Support", "Page"];
const TYPE_PLURAL: Record<SearchType, string> = {
  Product: "Products",
  Feature: "Features",
  Solution: "Solutions",
  Industry: "Industries",
  Integration: "Integrations",
  Resource: "Resources",
  FAQ: "FAQs",
  Support: "Support",
  Page: "Pages",
};
const PAGE = 20;
const SUGGEST_PER_GROUP = 3;
const SUGGEST_GROUPS = 5;

type FacetKey = "type" | "product" | "category" | "industry" | "solution" | "integration";
type Filters = Record<FacetKey, string[]>;
const NO_FILTERS: Filters = { type: [], product: [], category: [], industry: [], solution: [], integration: [] };
const FACETS: { key: FacetKey; label: string }[] = [
  { key: "type", label: "Content type" },
  { key: "product", label: "Product" },
  { key: "category", label: "Category" },
  { key: "industry", label: "Industry" },
  { key: "solution", label: "Solution" },
  { key: "integration", label: "Integration" },
];

/** The facet values an entry carries. */
function valuesOf(e: SearchEntry, k: FacetKey): string[] {
  switch (k) {
    case "type":
      return [e.type];
    case "product":
      return e.productSlug ? [e.productSlug] : [];
    case "category":
      return e.categorySlug ? [e.categorySlug] : [];
    case "industry":
      return e.industries ?? [];
    case "solution":
      return e.solutions ?? [];
    case "integration":
      return e.integrations ?? [];
  }
}
const passes = (e: SearchEntry, f: Filters, skip?: FacetKey) =>
  FACETS.every(({ key }) => key === skip || !f[key].length || valuesOf(e, key).some((v) => f[key].includes(v)));

/** Wraps query terms in <mark> by splitting the text; no HTML injection. */
function Mark({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return <>{text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}</>;
}

function readQuery() {
  return new URLSearchParams(window.location.search).get("q")?.trim() ?? "";
}

/** Ecosystem-wide search: hero box with live suggestions, facets, a compact result list and discovery links. */
export function SearchClient({ browse }: { browse: SearchBrowse }) {
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [input, setInput] = useState("");
  const [typed, setTyped] = useState(""); // debounced input, drives suggestions
  const [q, setQ] = useState(""); // submitted query, drives results and ?q=
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [sort, setSort] = useState<"relevance" | "az">("relevance");
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [panel, setPanel] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  // The index is a static JSON file built with the site.
  useEffect(() => {
    let live = true;
    fetch("/search/index.json")
      .then((r) => r.json())
      .then((data: SearchEntry[]) => live && setIndex(data))
      .catch(() => live && setIndex([]));
    return () => {
      live = false;
    };
  }, []);

  // ?q= is read after mount so the server HTML stays query-independent.
  useEffect(() => {
    const sync = () => {
      const v = readQuery();
      setInput(v);
      setTyped(v);
      setQ(v);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setTyped(input), 120);
    return () => clearTimeout(t);
  }, [input]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => boxRef.current && !boxRef.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const submit = (value: string) => {
    const v = value.trim();
    setInput(v);
    setTyped(v);
    setQ(v);
    setFilters(NO_FILTERS);
    setLimit(PAGE);
    setOpen(false);
    setActive(-1);
    if (v === readQuery()) return;
    const url = new URL(window.location.href);
    if (v) url.searchParams.set("q", v);
    else url.searchParams.delete("q");
    window.history.pushState(null, "", url);
  };

  const terms = useMemo(() => tokenize(q), [q]);
  const ranked = useMemo(() => (index && q ? rank(index, q) : { results: [], mode: "all" as const }), [index, q]);
  const matches = useMemo(() => ranked.results.map((r) => r.e), [ranked]);

  const filtered = useMemo(() => {
    const list = matches.filter((m) => passes(m, filters));
    return sort === "az" ? [...list].sort((a, b) => a.title.localeCompare(b.title)) : list;
  }, [matches, filters, sort]);

  // Facet options with counts given the other active facets. A facet is shown only when it can change the list.
  const facetOptions = useMemo(() => {
    const names: Record<FacetKey, Map<string, string>> = {
      type: new Map(TYPE_ORDER.map((t) => [t, TYPE_PLURAL[t]])),
      product: new Map(browse.products.map((p) => [p.slug, p.name])),
      category: new Map(browse.categories.map((c) => [c.slug, c.name])),
      industry: new Map(browse.industries.map((c) => [c.slug, c.name])),
      solution: new Map(browse.solutions.map((c) => [c.slug, c.name])),
      integration: new Map(browse.integrations.map((c) => [c.slug, c.name])),
    };
    return FACETS.map(({ key, label }) => {
      const base = matches.filter((m) => passes(m, filters, key));
      const counts = new Map<string, number>();
      for (const m of base) for (const v of valuesOf(m, key)) if (names[key].has(v)) counts.set(v, (counts.get(v) ?? 0) + 1);
      const order = [...names[key].keys()];
      const options = [...counts.entries()]
        .sort((a, b) => (key === "type" ? order.indexOf(a[0]) - order.indexOf(b[0]) : b[1] - a[1] || names[key].get(a[0])!.localeCompare(names[key].get(b[0])!)))
        .map(([value, count]) => ({ value, count, label: names[key].get(value)! }));
      const useful = filters[key].length > 0 || options.length > 1 || (options.length === 1 && options[0].count < base.length);
      return { key, label, options, useful, names: names[key] };
    }).filter((f) => f.useful);
  }, [matches, filters, browse]);

  // Live suggestions from the debounced input, grouped by type.
  const suggestions = useMemo(() => {
    if (!index || !typed.trim()) return { groups: [], total: 0 };
    const { results } = rank(index, typed);
    const groups = TYPE_ORDER.map((type) => ({
      type,
      items: results
        .filter((r) => r.e.type === type)
        .map((r) => r.e)
        .filter((e, i, arr) => arr.findIndex((x) => x.title === e.title) === i)
        .slice(0, SUGGEST_PER_GROUP),
    }))
      .filter((g) => g.items.length)
      .slice(0, SUGGEST_GROUPS);
    return { groups, total: results.length };
  }, [index, typed]);
  const flat = suggestions.groups.flatMap((g) => g.items);
  const showSuggest = open && input.trim().length > 0 && typed === input && flat.length > 0;
  const suggestTerms = useMemo(() => tokenize(typed), [typed]);

  const toggle = (k: FacetKey, v: string) => {
    setFilters((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
    setLimit(PAGE);
  };
  const chips = FACETS.flatMap(({ key }) => filters[key].map((v) => ({ key, value: v })));
  const nameOf = (k: FacetKey, v: string) => facetOptions.find((f) => f.key === k)?.names.get(v) ?? (k === "type" ? TYPE_PLURAL[v as SearchType] : v);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && flat.length) {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % flat.length);
    } else if (e.key === "ArrowUp" && flat.length) {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a <= 0 ? flat.length - 1 : a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (showSuggest && active >= 0 && flat[active]) window.location.assign(flat[active].href);
      else submit(input);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const loading = index === null;
  const shown = filtered.slice(0, limit);

  return (
    <div className="srch">
      <header className="srch-hero">
        <div className="container srch-hero__inner">
          <h1>Find The Right Software For Your Business</h1>
          <p className="srch-hero__lead">Explore ToyoApps products, features, solutions, industries, integrations, and resources to find what you need.</p>

          <div className="srch-box" ref={boxRef}>
            <form
              role="search"
              className="srch-box__field"
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
              }}
            >
              <Icon name="search" />
              <input
                ref={inputRef}
                type="search"
                name="q"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setOpen(true);
                  setActive(-1);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKey}
                placeholder="Search products, features, solutions, integrations..."
                aria-label="Search ToyoApps products, features, solutions and more"
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showSuggest}
                aria-controls={listId}
                aria-activedescendant={showSuggest && active >= 0 ? `${listId}-${active}` : undefined}
              />
              {input && (
                <button
                  type="button"
                  className="srch-box__clear"
                  aria-label="Clear search"
                  onClick={() => {
                    submit("");
                    inputRef.current?.focus();
                  }}
                >
                  <span aria-hidden>×</span>
                </button>
              )}
              <button type="submit" className="srch-box__go">
                Search
              </button>
            </form>

            <div className="srch-suggest" id={listId} role="listbox" aria-label="Suggestions" hidden={!showSuggest}>
              {showSuggest &&
                suggestions.groups.map((g) => (
                  <div key={g.type} className="srch-suggest__group" role="group" aria-labelledby={`${listId}-g-${g.type}`}>
                    <p className="srch-suggest__label" id={`${listId}-g-${g.type}`}>
                      {TYPE_PLURAL[g.type]}
                    </p>
                    {g.items.map((m) => {
                      const i = flat.indexOf(m);
                      return (
                        <a
                          key={m.id}
                          id={`${listId}-${i}`}
                          href={m.href}
                          role="option"
                          aria-selected={i === active}
                          className="srch-suggest__item"
                          tabIndex={-1}
                          onMouseEnter={() => setActive(i)}
                        >
                          <span>
                            <Mark text={m.title} terms={suggestTerms} />
                          </span>
                          <small>{m.type === "Product" ? m.category : m.product}</small>
                        </a>
                      );
                    })}
                  </div>
                ))}
              {showSuggest && (
                <button type="button" className="srch-suggest__all" tabIndex={-1} onClick={() => submit(input)}>
                  See all {suggestions.total} results <Icon name="arrow-right" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container srch-body">
        {!q ? (
          <BrowseBlock browse={browse} onPick={submit} />
        ) : loading ? (
          <p className="srch-loading" aria-live="polite">
            Searching ToyoApps…
          </p>
        ) : matches.length === 0 ? (
          <NoResults query={q} onBrowse={() => submit("")} />
        ) : (
          <div className="srch-layout">
            <div className="srch-filterwrap">
              <button type="button" className="srch-filtertoggle" aria-expanded={panel} aria-controls="srch-filters" onClick={() => setPanel((p) => !p)}>
                <Icon name="grid" /> Filters{chips.length > 0 && <span className="srch-filtertoggle__n">{chips.length}</span>}
              </button>
              <aside id="srch-filters" className="srch-filters" data-open={panel} aria-label="Filter results">
                <div className="srch-filters__head">
                  <h2>Filter results</h2>
                  {chips.length > 0 && (
                    <button type="button" onClick={() => setFilters(NO_FILTERS)}>
                      Clear all
                    </button>
                  )}
                </div>
                {facetOptions.length === 0 && <p className="srch-filters__none">No filters apply to these results.</p>}
                {facetOptions.map((f) => (
                  <FacetGroup key={f.key} label={f.label} options={f.options} selected={filters[f.key]} onToggle={(v) => toggle(f.key, v)} />
                ))}
              </aside>
            </div>

            <section className="srch-results" aria-labelledby="srch-results-h">
              <div className="srch-results__head">
                <div>
                  <h2 id="srch-results-h">Search results for &ldquo;{q}&rdquo;</h2>
                  <p className="srch-count" aria-live="polite">
                    <strong data-testid="result-count">{filtered.length}</strong> {filtered.length === 1 ? "result" : "results"}
                    {chips.length > 0 && <span> (filtered from {matches.length})</span>}
                  </p>
                </div>
                <label className="srch-sort">
                  <span>Sort by</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value as "relevance" | "az")}>
                    <option value="relevance">Most relevant</option>
                    <option value="az">A–Z</option>
                  </select>
                </label>
              </div>
              {ranked.mode === "any" && <p className="srch-note">No result matched every word, so these results match any of the words.</p>}

              {chips.length > 0 && (
                <ul className="srch-chips" aria-label="Active filters">
                  {chips.map((c) => (
                    <li key={`${c.key}:${c.value}`}>
                      <button type="button" onClick={() => toggle(c.key, c.value)} aria-label={`Remove filter ${nameOf(c.key, c.value)}`}>
                        {nameOf(c.key, c.value)} <span aria-hidden>×</span>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button type="button" className="srch-chips__clear" onClick={() => setFilters(NO_FILTERS)}>
                      Clear all
                    </button>
                  </li>
                </ul>
              )}

              {filtered.length === 0 ? (
                <p className="srch-none-filtered">
                  No results match these filters.{" "}
                  <button type="button" onClick={() => setFilters(NO_FILTERS)}>
                    Remove filters
                  </button>
                </p>
              ) : (
                <ol className="srch-list">
                  {shown.map((m) => (
                    <ResultRow key={m.id} entry={m} terms={terms} />
                  ))}
                </ol>
              )}
              {filtered.length > limit && (
                <div className="srch-more-wrap">
                  <p>
                    Showing {shown.length} of {filtered.length}
                  </p>
                  <button type="button" className="srch-more" onClick={() => setLimit((l) => l + PAGE)}>
                    Load more
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function FacetGroup({ label, options, selected, onToggle }: { label: string; options: { value: string; label: string; count: number }[]; selected: string[]; onToggle: (v: string) => void }) {
  const [all, setAll] = useState(false);
  const list = all ? options : options.slice(0, 6);
  return (
    <fieldset className="srch-facet">
      <legend>{label}</legend>
      {list.map((o) => (
        <label key={o.value} className="srch-facet__opt">
          <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} />
          <span>{o.label}</span>
          <small>{o.count}</small>
        </label>
      ))}
      {options.length > 6 && (
        <button type="button" className="srch-facet__more" onClick={() => setAll((a) => !a)}>
          {all ? "Show fewer" : `Show all ${options.length}`}
        </button>
      )}
    </fieldset>
  );
}

function ResultRow({ entry: m, terms }: { entry: SearchEntry; terms: string[] }) {
  const meta = [m.type !== "Product" ? m.product : undefined, m.category].filter(Boolean);
  return (
    <li className="srch-row" data-type={m.type}>
      <span className="srch-row__type">{m.type}</span>
      <div className="srch-row__body">
        <h3>
          <Link href={m.href}>
            <Mark text={m.title} terms={terms} />
          </Link>
          {m.status === "pending" && <span className="srch-row__status">Coming soon</span>}
        </h3>
        {meta.length > 0 && <p className="srch-row__meta">{meta.join(" · ")}</p>}
        {m.description && (
          <p className="srch-row__desc">
            <Mark text={m.description} terms={terms} />
          </p>
        )}
        <p className="srch-row__url">{m.href}</p>
      </div>
    </li>
  );
}

function BrowseBlock({ browse, onPick }: { browse: SearchBrowse; onPick: (q: string) => void }) {
  return (
    <div className="srch-browse">
      <section aria-labelledby="srch-cats">
        <h2 id="srch-cats" className="srch-h2">
          Browse by category
        </h2>
        <ul className="srch-cats">
          {browse.categories.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} className="srch-cat">
                <span className="icon-tile">
                  <Icon name={c.icon} />
                </span>
                <span>
                  <strong>{c.name}</strong>
                  <small>
                    {c.count} {c.count === 1 ? "product" : "products"}
                  </small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="srch-browse__row">
        {browse.popular.length > 0 && (
          <section aria-labelledby="srch-popular">
            <h2 id="srch-popular" className="srch-h2">
              Popular searches
            </h2>
            <ul className="srch-popular">
              {browse.popular.map((p) => (
                <li key={p}>
                  <button type="button" onClick={() => onPick(p)}>
                    <Icon name="search" /> {p}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
        {browse.featured.length > 0 && (
          <section aria-labelledby="srch-featured">
            <h2 id="srch-featured" className="srch-h2">
              Featured
            </h2>
            <ul className="srch-featured">
              {browse.featured.map((f) => (
                <li key={f.href}>
                  <Link href={f.href}>
                    <span className="srch-row__type">{f.kind}</span>
                    <strong>{f.label}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function NoResults({ query, onBrowse }: { query: string; onBrowse: () => void }) {
  return (
    <section className="srch-empty" aria-live="polite">
      <h2>We Couldn&apos;t Find An Exact Match</h2>
      <p>
        Nothing matches &ldquo;{query}&rdquo;. Try another keyword, use a shorter or more general word, or remove filters.
      </p>
      <ul className="srch-empty__links">
        <li>
          <Link href="/products">Explore All Products</Link>
        </li>
        <li>
          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              onBrowse();
            }}
          >
            Browse Categories
          </a>
        </li>
        <li>
          <Link href="/solutions">Explore Solutions</Link>
        </li>
        <li>
          <Link href="/industries">Browse Industries</Link>
        </li>
      </ul>
    </section>
  );
}
