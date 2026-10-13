"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

export interface HomeTab {
  id: string;
  label: string;
  /** Small secondary text on the tab, e.g. a product count. */
  meta?: string;
  /** Optional icon shown before the label. */
  icon?: ReactNode;
  /** Optional inline style on the tab, e.g. a category tint. */
  style?: CSSProperties;
}

/**
 * Accessible tab switcher for homepage sections. Every panel is rendered on the
 * server and stays in the HTML (inactive ones are `hidden`), so no content is
 * lost to search engines or to visitors without JavaScript.
 */
export function HomeTabs({ label, tabs, children, layout = "top" }: { label: string; tabs: HomeTab[]; children: ReactNode[]; layout?: "top" | "side" }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    const to = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : step ? (active + step + tabs.length) % tabs.length : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(to);
    buttons.current[to]?.focus();
  };

  return (
    <div className={`hp-tabs hp-tabs--${layout}`}>
      <div className="hp-tabs__list" role="tablist" aria-label={label} aria-orientation={layout === "side" ? "vertical" : "horizontal"} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            className="hp-tabs__tab"
            style={t.style}
            onClick={() => setActive(i)}
          >
            {t.icon && (
              <span className="hp-tabs__icon" aria-hidden>
                {t.icon}
              </span>
            )}
            <span>{t.label}</span>
            {t.meta && <small>{t.meta}</small>}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={i !== active}
          className="hp-tabs__panel"
        >
          {children[i]}
        </div>
      ))}
    </div>
  );
}
