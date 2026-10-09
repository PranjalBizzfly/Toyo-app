"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
  count: number;
}

/**
 * Search + filter controls for a server-rendered directory. Cards inside
 * `#${target}` carry data-name / data-cat / data-products / data-text;
 * groups carry data-group. Filtering only toggles `hidden`, so every entry
 * stays in the HTML for search engines and no-JS visitors.
 */
export function DirectoryFilters({
  target,
  categories,
  products,
  noun,
  total,
  groupLabel = "category",
}: {
  target: string;
  categories: Option[];
  products: Option[];
  noun: [string, string];
  total: number;
  groupLabel?: string;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [prod, setProd] = useState("");
  const [shown, setShown] = useState(total);
  const live = useRef<HTMLParagraphElement>(null);

  // Read initial filters from the URL (?q=, ?category=, ?product=)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("q")) setQ(p.get("q")!);
    if (p.get("category") && categories.some((c) => c.value === p.get("category"))) setCat(p.get("category")!);
    if (p.get("product") && products.some((c) => c.value === p.get("product"))) setProd(p.get("product")!);
  }, [categories, products]);

  const terms = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q]);

  useEffect(() => {
    const root = document.getElementById(target);
    if (!root) return;
    let n = 0;
    root.querySelectorAll<HTMLElement>("[data-name]").forEach((el) => {
      const hay = `${el.dataset.name} ${el.dataset.text ?? ""} ${el.dataset.cat} ${el.dataset.products}`.toLowerCase();
      const ok =
        (!cat || el.dataset.cat === cat) &&
        (!prod || (el.dataset.products ?? "").split(" ").includes(prod)) &&
        terms.every((t) => hay.includes(t));
      el.hidden = !ok;
      if (ok) n++;
    });
    root.querySelectorAll<HTMLElement>("[data-group]").forEach((g) => {
      g.hidden = !g.querySelector("[data-name]:not([hidden])");
    });
    root.classList.toggle("is-filtered", !!(q || cat || prod));
    setShown(n);
    // Keep the URL shareable without adding history entries
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (cat) p.set("category", cat);
    if (prod) p.set("product", prod);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [target, terms, cat, prod, q]);

  const filtered = q || cat || prod;
  const reset = () => {
    setQ("");
    setCat("");
    setProd("");
  };

  return (
    <div className="dx-filters">
      <div className="dx-filters__row">
        <label className="dx-search">
          <span className="sr-only">Search {noun[1]}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${total} ${noun[1]} by name, tool or task`} />
        </label>
        {products.length > 1 && (
          <label className="dx-select">
            <span className="sr-only">Filter by product</span>
            <select value={prod} onChange={(e) => setProd(e.target.value)}>
              <option value="">All products</option>
              {products.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label} ({p.count})
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="dx-chips" role="group" aria-label="Filter by category">
        <button type="button" className="dx-chip" aria-pressed={!cat} onClick={() => setCat("")}>
          All <span>{total}</span>
        </button>
        {categories.map((c) => (
          <button key={c.value} type="button" className="dx-chip" aria-pressed={cat === c.value} onClick={() => setCat(cat === c.value ? "" : c.value)}>
            {c.label} <span>{c.count}</span>
          </button>
        ))}
      </div>
      <p className="dx-status" ref={live} aria-live="polite">
        {filtered ? (
          <>
            Showing {shown} of {total} {total === 1 ? noun[0] : noun[1]}
            {" · "}
            <button type="button" className="dx-reset" onClick={reset}>
              Clear filters
            </button>
          </>
        ) : (
          <>
            {total} {noun[1]}, grouped by {groupLabel}
          </>
        )}
      </p>
      {filtered && shown === 0 && (
        <p className="dx-empty">
          No {noun[1]} match these filters.{" "}
          <button type="button" className="dx-reset" onClick={reset}>
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
