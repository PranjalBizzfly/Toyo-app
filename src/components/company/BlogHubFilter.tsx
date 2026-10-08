"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LearningItem } from "@/lib/learning";

/**
 * Client-side search + category filter over the real guides and support
 * topics in product data. Results stay grouped by product.
 */
export function BlogHubFilter({ items, categories }: { items: LearningItem[]; categories: { slug: string; name: string }[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const hits = items.filter(
      (i) =>
        (!cat || i.categorySlug === cat) &&
        (!needle || `${i.title} ${i.summary} ${i.product} ${i.kind}`.toLowerCase().includes(needle)),
    );
    const map = new Map<string, LearningItem[]>();
    for (const i of hits) map.set(i.productSlug, [...(map.get(i.productSlug) ?? []), i]);
    return [...map.values()];
  }, [items, q, cat]);

  return (
    <>
      <div className="cp-filter">
        <label htmlFor="blog-search" className="sr-only">
          Search guides and support topics
        </label>
        <input
          id="blog-search"
          type="search"
          className="cp-search"
          placeholder="Search guides and support topics"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="cp-chips" role="group" aria-label="Filter by category">
          <button type="button" className="cp-chip" aria-pressed={cat === null} onClick={() => setCat(null)}>
            All categories
          </button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className="cp-chip" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        {groups.length === 0 && <p className="cp-empty">No guides or support topics match your search.</p>}
        {groups.map((list) => (
          <section key={list[0].productSlug} className="cp-group" aria-label={list[0].product}>
            <div className="cp-group__head">
              <h3>{list[0].product}</h3>
              <span>
                {list[0].category} · {list.length} {list.length === 1 ? "item" : "items"}
              </span>
            </div>
            <ul className="cp-grid">
              {list.map((i) => (
                <li key={i.kind + i.href + i.title} className="cp-card">
                  <span className={`cp-badge${i.kind === "Guide" ? "" : " cp-badge--green"}`}>{i.kind}</span>
                  <h4 className="cp-card__title">
                    <Link href={i.href}>{i.title}</Link>
                  </h4>
                  <p>{i.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
