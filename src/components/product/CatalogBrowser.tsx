"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface CatalogItem {
  slug: string;
  href: string;
  name: string;
  description: string;
  accent: string;
  initials: string;
  pending?: boolean;
  keywords: string;
}

export interface CatalogSection {
  id: string;
  title: string;
  tagline?: string;
  href?: string;
  items: CatalogItem[];
}

function AppCard({ item }: { item: CatalogItem }) {
  return (
    <article className="zcard">
      <div className="zcard__inner">
        <span className="zcard__logo" style={{ background: item.accent }} aria-hidden>
          {item.initials}
        </span>
        <h3 className="zcard__name">
          <Link href={item.href}>{item.name}</Link>
        </h3>
        {item.pending && <span className="badge badge--warn">Pending verification</span>}
        <p className="zcard__desc">{item.description}</p>
        <Link href={item.href} className="zbtn zbtn--primary zbtn--sm" aria-label={`Explore ${item.name}`}>
          Explore <span aria-hidden>›</span>
        </Link>
      </div>
    </article>
  );
}

/**
 * All-products browser: overlapping search, sticky section sidebar and
 * card sections. Search filters across every section (also via ?q=).
 */
export function CatalogBrowser({ sections }: { sections: CatalogSection[] }) {
  const [query, setQuery] = useState("");
  // Read ?q= after mount so the full catalog is server-rendered for search engines.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQuery(initial);
  }, []);
  const q = useDeferredValue(query.trim().toLowerCase());
  const terms = q.split(/\s+/).filter(Boolean);
  const match = (i: CatalogItem) => terms.every((t) => i.keywords.includes(t));

  const results = terms.length
    ? [...new Map(sections.flatMap((s) => s.items).filter(match).map((i) => [i.slug, i])).values()]
    : null;

  return (
    <>
      <div className="zcatalog__search container">
        <label className="zsearch">
          <Icon name="search" />
          <span className="sr-only">Search products</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="I'm looking for…" autoComplete="off" />
        </label>
      </div>
      <div className="container zcatalog">
        <nav className="zcatalog__side" aria-label="Catalog sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="zcatalog__main">
          {results ? (
            <section aria-live="polite">
              <h2 className="zcatalog__title">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query.trim()}”
              </h2>
              <div className="zcatalog__grid">
                {results.map((i) => (
                  <AppCard key={i.slug} item={i} />
                ))}
              </div>
              {results.length === 0 && <p className="text-muted">Try another word, or browse the categories.</p>}
            </section>
          ) : (
            sections.map((s, idx) => (
              <section key={s.id} id={s.id} className="zcatalog__section">
                {idx === 0 ? (
                  <p className="z-kicker">{s.title}</p>
                ) : (
                  <header className="zcatalog__head">
                    <h2 className="zcatalog__title">{s.href ? <Link href={s.href}>{s.title}</Link> : s.title}</h2>
                    {s.tagline && <p>{s.tagline}</p>}
                  </header>
                )}
                <div className="zcatalog__grid">
                  {s.items.map((i) => (
                    <AppCard key={i.slug} item={i} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </>
  );
}
