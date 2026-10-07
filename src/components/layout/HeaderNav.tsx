"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavMenu } from "@/lib/navigation";
import { ChevronDown, Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";

function SearchForm({ id }: { id: string }) {
  return (
    <form action="/products" role="search" className="header-search">
      <Icon name="search" />
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input id={id} name="q" type="search" placeholder="Search products" autoComplete="off" />
    </form>
  );
}

function MegaPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  if (menu.kind === "simple") {
    return (
      <div className="container mega__simple">
        {menu.groups.flatMap((g) => g.links).map((l) => (
          <Link key={l.href + l.label} href={l.href} className="mega__link" onClick={onNavigate}>
            <strong>{l.label}</strong>
            {l.description && <span>{l.description}</span>}
          </Link>
        ))}
        <Link href={menu.footerLink.href} className="mega__link" onClick={onNavigate}>
          <strong>{menu.footerLink.label} →</strong>
        </Link>
      </div>
    );
  }
  return (
    <div className="container mega__inner">
      <div className="mega__cols">
        {menu.groups.length === 0 && <p className="text-muted">Products are being added. Check back soon.</p>}
        {menu.groups.map((g) => (
          <div key={g.title}>
            {g.href ? (
              <Link href={g.href} className="mega__group-title" onClick={onNavigate}>
                {g.title}
              </Link>
            ) : (
              <p className="mega__group-title">{g.title}</p>
            )}
            <ul>
              {g.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="mega__link" onClick={onNavigate}>
                    <strong>{l.label}</strong>
                    {l.description && <span>{l.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {menu.aside && (
        <aside className="mega__aside">
          <p className="eyebrow">{menu.aside.title}</p>
          <p>{menu.aside.text}</p>
          <Link href={menu.aside.cta.href} className="btn btn--primary btn--sm" onClick={onNavigate}>
            {menu.aside.cta.label}
          </Link>
        </aside>
      )}
    </div>
  );
}

/** Desktop mega menu + mobile drawer. Data comes from the server-built nav model. */
export function HeaderNav({ menus, cta }: { menus: NavMenu[]; cta: React.ReactNode }) {
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
            <MegaPanel menu={active} onNavigate={close} />
          </div>
        )}
      </nav>

      <div className="header-actions">
        <SearchForm id="header-search" />
        <ThemeToggle />
        {cta}
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
            <Link href="/contact" className="btn btn--primary" onClick={close}>
              Contact sales
            </Link>
            <Link href="/products" className="btn btn--secondary" onClick={close}>
              Explore products
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
