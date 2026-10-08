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
  logo?: string;
  pending?: boolean;
  /** Small corner flag, e.g. the item's primary category on a cross-listed card. */
  note?: string;
  keywords: string;
}

export interface CatalogSection {
  id: string;
  title: string;
  tagline?: string;
  href?: string;
  /** Featured sections get the tinted, solid-button card (Zoho "Featured Apps"). */
  featured?: boolean;
  items: CatalogItem[];
}

export interface CatalogSideLink {
  label: string;
  href: string;
  active?: boolean;
}

function AppMark({ item }: { item: CatalogItem }) {
  if (item.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="zc-card__logo" src={item.logo} alt={`${item.name} logo`} />;
  }
  return (
    <span className="zc-card__logo zc-card__logo--mono" style={{ color: item.accent, borderColor: item.accent }} aria-hidden>
      {item.initials}
    </span>
  );
}

/** Zoho all-products app card. `featured` = tinted inner panel + solid button; default = white card + text CTA. */
export function AppCard({ item, featured = false }: { item: CatalogItem; featured?: boolean }) {
  return (
    <article className={`zc-card${featured ? " zc-card--featured" : ""}`}>
      <div className="zc-card__inner">
        {item.note && <span className="zc-card__flag">{item.note}</span>}
        <AppMark item={item} />
        <h3 className="zc-card__name">
          <Link href={item.href}>{item.name}</Link>
        </h3>
        <p className="zc-card__desc">{item.description}</p>
        <Link href={item.href} className={featured ? "zc-card__btn" : "zc-card__link"} aria-label={`Explore ${item.name}`} tabIndex={-1}>
          Explore
          <svg viewBox="0 0 16 16" aria-hidden>
            <path d="m6 3.5 4.5 4.5L6 12.5" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

/**
 * All-products browser (Zoho all-products layout): search bar overlapping the
 * hero, sticky sidebar — "Featured apps", an "Apps" group with indented
 * categories, then extra top-level links — and card sections.
 * Search filters across every section (also via ?q=).
 */
export function CatalogBrowser({
  sections,
  sideLinks = [],
  groupLabel = "Apps",
  searchPlaceholder = "I'm looking for…",
}: {
  sections: CatalogSection[];
  sideLinks?: CatalogSideLink[];
  groupLabel?: string;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  // Read ?q= after mount so the full catalog is server-rendered for search engines.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQuery(initial);
  }, []);
  const q = useDeferredValue(query.trim().toLowerCase());
  const terms = q.split(/\s+/).filter(Boolean);
  const match = (i: CatalogItem) => terms.every((t) => i.keywords.includes(t));
  const active = useActiveSection(sections.map((s) => s.id));

  const results = terms.length
    ? [...new Map(sections.flatMap((s) => s.items).filter(match).map((i) => [i.slug, i])).values()]
    : null;

  const top = sections.filter((s) => s.featured);
  const grouped = sections.filter((s) => !s.featured);

  return (
    <div className="zc-catalog">
      <div className="zc-search container">
        <label className="zc-search__box">
          <Icon name="search" />
          <span className="sr-only">Search products</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} autoComplete="off" />
        </label>
      </div>
      <div className="container zc-layout">
        <nav className="zc-side" aria-label="Catalog sections">
          <ul>
            {top.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="zc-side__top" aria-current={active === s.id ? "true" : undefined}>
                  {s.title}
                </a>
              </li>
            ))}
            {grouped.length > 0 && (
              <li>
                <span className="zc-side__top zc-side__label">{groupLabel}</span>
                <ul className="zc-side__sub">
                  {grouped.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {sideLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="zc-side__top" aria-current={l.active ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="zc-main">
          {results ? (
            <section aria-live="polite" className="zc-section">
              <header className="zc-head">
                <h2 className="zc-title">
                  {results.length} {results.length === 1 ? "result" : "results"} for “{query.trim()}”
                </h2>
              </header>
              {results.length > 0 ? (
                <div className="zc-grid">
                  {results.map((i) => (
                    <AppCard key={i.slug} item={i} />
                  ))}
                </div>
              ) : (
                <p className="zc-empty">
                  Try another word, browse the categories, or <Link href={`/search?q=${encodeURIComponent(query.trim())}`}>search the whole site</Link>.
                </p>
              )}
            </section>
          ) : (
            sections.map((s) => (
              <section key={s.id} id={s.id} className={`zc-section${s.featured ? " zc-section--featured" : ""}`}>
                {s.featured ? (
                  <p className="zc-kicker">{s.title}</p>
                ) : (
                  <header className="zc-head">
                    <h2 className="zc-title">{s.href ? <Link href={s.href}>{s.title}</Link> : s.title}</h2>
                    {s.tagline && <p>{s.tagline}</p>}
                  </header>
                )}
                <div className="zc-grid">
                  {s.items.map((i) => (
                    <AppCard key={i.slug} item={i} featured={s.featured} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
