"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { SearchEntry } from "@/lib/search-index";
import { Icon } from "@/components/ui/Icon";

/** Site-wide search over the prebuilt index; results show what type of page each one is. */
export function SearchClient({ index }: { index: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);
  const q = useDeferredValue(query.trim().toLowerCase());
  const terms = q.split(/\s+/).filter(Boolean);

  const matches = useMemo(() => {
    if (!terms.length) return [];
    return index
      .map((e) => {
        const hay = `${e.title} ${e.description} ${e.product ?? ""} ${e.type}`.toLowerCase();
        if (!terms.every((t) => hay.includes(t))) return null;
        const score = terms.reduce((n, t) => n + (e.title.toLowerCase().includes(t) ? 3 : 0) + (e.product?.toLowerCase().includes(t) ? 1 : 0), 0);
        return { e, score };
      })
      .filter((x): x is { e: SearchEntry; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.e);
  }, [index, terms.join(" ")]); // eslint-disable-line react-hooks/exhaustive-deps

  const types = [...new Set(matches.map((m) => m.type))];
  const shown = type ? matches.filter((m) => m.type === type) : matches;

  return (
    <div className="zc-searchpage">
      <div className="zc-search container">
      <label className="zc-search__box">
        <Icon name="search" />
        <span className="sr-only">Search ToyoApps</span>
        <input type="search" value={query} onChange={(e) => (setQuery(e.target.value), setType(null))} placeholder="Search products, features, solutions, integrations…" autoComplete="off" autoFocus />
      </label>
      </div>
      <div className="container zc-sresults">
      {terms.length > 0 && (
        <>
          <p className="explorer__count" aria-live="polite" >
            {matches.length} {matches.length === 1 ? "result" : "results"}
          </p>
          {types.length > 1 && (
            <div className="zs-filters" role="group" aria-label="Filter by page type">
              <button type="button" className="chip" aria-pressed={!type} onClick={() => setType(null)}>
                All <span>{matches.length}</span>
              </button>
              {types.map((t) => (
                <button key={t} type="button" className="chip" aria-pressed={type === t} onClick={() => setType(type === t ? null : t)}>
                  {t} <span>{matches.filter((m) => m.type === t).length}</span>
                </button>
              ))}
            </div>
          )}
          <ul className="zs-results">
            {shown.slice(0, 60).map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="zs-result">
                  <span className="zs-result__meta">
                    <span className="badge badge--brand">{m.type}</span>
                    {m.product && <span>{m.product}</span>}
                  </span>
                  <h2>{m.title}</h2>
                  <p>{m.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {terms.length === 0 && <p className="zc-empty zc-empty--center">Type a product, feature, task or integration to search every ToyoApps page.</p>}
      </div>
    </div>
  );
}
