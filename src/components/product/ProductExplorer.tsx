"use client";

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import type { Product } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "./cards";

export interface ExplorerCategory {
  slug: string;
  name: string;
}

function matches(p: Product, q: string, categoryName: string) {
  if (!q) return true;
  const hay = [p.name, p.shortDescription, p.primaryUseCase, categoryName, ...(p.audience ?? []), ...(p.features ?? []).map((f) => f.name)]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((t) => hay.includes(t));
}

/**
 * Client-side search + category filter over the product list.
 * Fine for hundreds of products; swap the filter for a search API if the
 * catalog grows far beyond that — the props contract stays the same.
 */
export function ProductExplorer({
  products,
  categories,
  limit,
  searchLabel = "Search products",
}: {
  products: Product[];
  categories: ExplorerCategory[];
  /** Cap the visible results (homepage). */
  limit?: number;
  searchLabel?: string;
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<string | null>(params.get("category"));
  const q = useDeferredValue(query.trim());

  const names = useMemo(() => new Map(categories.map((c) => [c.slug, c.name])), [categories]);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, [products]);

  const results = products.filter(
    (p) => (!category || p.category === category) && matches(p, q, names.get(p.category) ?? ""),
  );
  const shown = limit ? results.slice(0, limit) : results;

  return (
    <div className="explorer">
      <div className="explorer__controls">
        <div className="search-field">
          <Icon name="search" />
          <label htmlFor="explorer-search" className="sr-only">
            {searchLabel}
          </label>
          <input
            id="explorer-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product, task or capability"
            autoComplete="off"
          />
        </div>
        <div className="chips" role="group" aria-label="Filter by category">
          <button type="button" className="chip" aria-pressed={!category} onClick={() => setCategory(null)}>
            All <span>{products.length}</span>
          </button>
          {categories
            .filter((c) => counts.get(c.slug))
            .map((c) => (
              <button
                key={c.slug}
                type="button"
                className="chip"
                aria-pressed={category === c.slug}
                onClick={() => setCategory(category === c.slug ? null : c.slug)}
              >
                {c.name} <span>{counts.get(c.slug)}</span>
              </button>
            ))}
        </div>
        <p className="explorer__count" aria-live="polite">
          {results.length} {results.length === 1 ? "product" : "products"}
          {q && ` matching “${q}”`}
        </p>
      </div>
      {shown.length ? (
        <div className="grid" style={{ ["--min" as string]: "300px" }}>
          {shown.map((p) => (
            <ProductCard key={p.slug} product={p} categoryName={names.get(p.category)} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3 className="h3">No products match yet</h3>
          <p className="text-muted">Try a different search or clear the category filter.</p>
        </div>
      )}
    </div>
  );
}
