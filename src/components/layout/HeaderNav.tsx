"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { NavLink, NavMenu } from "@/lib/navigation";
import { ChevronDown, Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";

function SearchForm({ id, className = "header-search" }: { id: string; className?: string }) {
  return (
    <form action="/products" role="search" className={className}>
      <Icon name="search" />
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input id={id} name="q" type="search" placeholder="I'm looking for…" autoComplete="off" />
    </form>
  );
}

function AppTile({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <Link href={link.href} className="mm-app" onClick={onNavigate}>
      <span className="mm-app__head">
        <span className="mm-app__logo" style={{ background: link.accent }} aria-hidden>
          {link.initials}
        </span>
        <span className="mm-app__name">{link.label}</span>
      </span>
      {link.description && <span className="mm-app__desc">{link.description}</span>}
      <span className="mm-app__cta">
        Explore <Icon name="arrow-right" />
      </span>
    </Link>
  );
}

/** Products mega menu: tab row, category sidebar with search, grid of app tiles. */
function ProductsPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  const [activeGroup, setActiveGroup] = useState(0);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const allLinks = useMemo(() => {
    const seen = new Map<string, NavLink>();
    menu.groups.forEach((g) => g.links.forEach((l) => seen.set(l.href, l)));
    return [...seen.values()];
  }, [menu.groups]);
  const results = q ? allLinks.filter((l) => `${l.label} ${l.description ?? ""}`.toLowerCase().includes(q)) : null;
  const group = menu.groups[activeGroup];

  return (
    <div className="mm">
      <div className="mm__tabs">
        <div className="container mm__tabs-inner">
          <span className="mm__tab is-active">Apps</span>
          <Link href={menu.footerLink.href} className="mm__all" onClick={onNavigate}>
            {menu.footerLink.label} <Icon name="arrow-right" />
          </Link>
          <button type="button" className="mm__close" aria-label="Close menu" onClick={onNavigate}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>
      <div className="container mm__body">
        <aside className="mm__side">
          <label className="mm__search">
            <Icon name="search" />
            <span className="sr-only">Filter products</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="I'm looking for…" autoComplete="off" />
          </label>
          <ul role="tablist" aria-label="Product categories" aria-orientation="vertical">
            {menu.groups.map((g, i) => (
              <li key={g.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={!q && i === activeGroup}
                  className="mm__cat"
                  onClick={() => {
                    setQuery("");
                    setActiveGroup(i);
                  }}
                  onMouseEnter={() => !q && setActiveGroup(i)}
                >
                  {g.title}
                  <span aria-hidden>›</span>
                </button>
              </li>
            ))}
          </ul>
          <Link href={menu.footerLink.href} className="btn btn--primary btn--square" onClick={onNavigate}>
            {menu.footerLink.label} <Icon name="arrow-right" />
          </Link>
        </aside>
        <div className="mm__main" role="tabpanel">
          <div className="mm__heading">
            <h2>{results ? `Results for “${query.trim()}”` : group?.title}</h2>
            {!results && group?.href && (
              <Link href={group.href} onClick={onNavigate}>
                View category <Icon name="arrow-right" />
              </Link>
            )}
          </div>
          <div className="mm__grid">
            {(results ?? group?.links ?? []).map((l) => (
              <AppTile key={l.href} link={l} onNavigate={onNavigate} />
            ))}
            {results && results.length === 0 && <p className="text-muted">No products match.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SimplePanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  return (
    <div className="mm mm--simple">
      <div className="container mega__simple">
        {menu.groups.flatMap((g) => g.links).map((l) => (
          <Link key={l.href + l.label} href={l.href} className="mega__link" onClick={onNavigate}>
            <strong>{l.label}</strong>
            {l.description && <span>{l.description}</span>}
          </Link>
        ))}
        <Link href={menu.footerLink.href} className="mega__link mega__link--more" onClick={onNavigate}>
          <strong>
            {menu.footerLink.label} <Icon name="arrow-right" />
          </strong>
        </Link>
      </div>
    </div>
  );
}

/** Global header navigation: desktop menus + mobile drawer, built from the nav model. */
export function HeaderNav({ menus }: { menus: NavMenu[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => {
    setOpen(null);
    setMobileOpen(false);
  }, []);

  useEffect(close, [pathname, close]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const active = menus.find((m) => m.id === open);

  return (
    <>
      <nav ref={navRef} aria-label="Main" className="primary-nav">
        <div className="primary-nav__item">
          <Link href="/" className="primary-nav__trigger" aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </Link>
        </div>
        {menus.map((m) => (
          <div key={m.id} className="primary-nav__item">
            <button
              type="button"
              className="primary-nav__trigger"
              aria-expanded={open === m.id}
              aria-controls={`mega-${m.id}`}
              onClick={() => setOpen(open === m.id ? null : m.id)}
            >
              {m.label}
              <ChevronDown />
            </button>
          </div>
        ))}
        {active && (
          <div className="mega" id={`mega-${active.id}`}>
            {active.kind === "mega" ? <ProductsPanel menu={active} onNavigate={close} /> : <SimplePanel menu={active} onNavigate={close} />}
          </div>
        )}
      </nav>

      <div className="header-actions">
        <Link href="/products" className="icon-btn icon-btn--plain header-search-link" aria-label="Search products">
          <Icon name="search" />
        </Link>
        <ThemeToggle />
        <Link href="/contact" className="header-signin">
          Contact
        </Link>
        <Link href="/products" className="btn btn--outline btn--sm header-cta">
          Get Started
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav" id="mobile-nav">
          <SearchForm id="mobile-search" />
          <Link href="/" className="mobile-nav__home" aria-current={pathname === "/" ? "page" : undefined} onClick={close}>
            Home
          </Link>
          {menus.map((m) => (
            <details key={m.id}>
              <summary>
                {m.label}
                <ChevronDown />
              </summary>
              <div className="mobile-nav__group">
                {m.groups.map((g) => (
                  <div key={g.title}>
                    {m.kind === "mega" && <h4>{g.title}</h4>}
                    {g.links.map((l) => (
                      <Link key={l.href + l.label} href={l.href} onClick={close}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href={m.footerLink.href} onClick={close}>
                  <strong>{m.footerLink.label} →</strong>
                </Link>
              </div>
            </details>
          ))}
          <div className="btn-row" style={{ marginTop: 24 }}>
            <Link href="/products" className="btn btn--primary btn--square" onClick={close}>
              Get Started
            </Link>
            <Link href="/contact" className="btn btn--outline btn--square" onClick={close}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
