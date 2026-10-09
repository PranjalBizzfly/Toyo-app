"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export interface StoryTab {
  id: string;
  label: string;
  intro?: string;
  items: { title: string; text: string; href?: string }[];
  href?: string;
  /** Optional photo shown beside the panel (decorative). */
  image?: string;
}

/**
 * Tab switcher on a dark band (pill tabs, one panel visible, crossfade).
 * Keyboard: arrow keys move between tabs (WAI-ARIA tabs pattern).
 * Without JS the first panel shows and every tab's content is still linked.
 */
export function StoryTabs({ tabs }: { tabs: StoryTab[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="zs-tabs">
      <div className="zs-tabs__list" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={`${t.id}-${i}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${base}-t-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-p-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={`${t.id}-${i}`} role="tabpanel" id={`${base}-p-${i}`} aria-labelledby={`${base}-t-${i}`} hidden={i !== active} className="zs-tabs__panel">
          <div className="zs-tabs__head">
            <h3>{t.label}</h3>
            {t.intro && <p>{t.intro}</p>}
            {t.href && (
              <Link href={t.href} className="zs-link">
                Explore {t.label} <span aria-hidden>→</span>
              </Link>
            )}
          </div>
          {t.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="zs-tabs__img" src={t.image} alt="" loading="lazy" />
          )}
          <ul className="zs-tabs__items">
            {t.items.map((it, k) => (
              <li key={`${it.title}-${k}`}>
                {it.href ? (
                  <Link href={it.href}>
                    <b>{it.title}</b>
                  </Link>
                ) : (
                  <b>{it.title}</b>
                )}
                <span>{it.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * Sticky section tab bar with scroll-spy: highlights the spotlight in view and
 * scrolls to one on click. Plain anchor links, so it works without JS.
 */
export function SpotTabbar({ items }: { items: { id: string; label: string }[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setCurrent(vis.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="zs-tabbar" aria-label="Feature highlights">
      <div className="container zs-tabbar__row">
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} aria-current={current === it.id ? "true" : undefined}>
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/**
 * Horizontal card rail with previous / next buttons (scroll-snap). The rail is
 * a normal scrollable list, so touch, trackpad and keyboard scrolling all work.
 */
export function Rail({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div className="zs-rail">
      <button type="button" className="zs-rail__btn zs-rail__btn--prev" onClick={() => go(-1)} aria-label={`Previous ${label}`}>
        ‹
      </button>
      <ul ref={ref} className="zs-rail__track" aria-label={label}>
        {children}
      </ul>
      <button type="button" className="zs-rail__btn zs-rail__btn--next" onClick={() => go(1)} aria-label={`Next ${label}`}>
        ›
      </button>
    </div>
  );
}
