"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface HomeFilterOption {
  id: string;
  label: string;
  count: number;
}

/**
 * Filter chips for a server-rendered list. Items carry `data-cats` (space
 * separated ids); choosing a chip hides the items that don't match. Everything
 * starts visible ("All"), so without JavaScript the full list is shown.
 */
export function HomeFilter({ label, allLabel, total, options, children }: { label: string; allLabel: string; total: number; options: HomeFilterOption[]; children: ReactNode }) {
  const [active, setActive] = useState("all");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    root.current?.querySelectorAll<HTMLElement>("[data-cats]").forEach((el) => {
      el.hidden = active !== "all" && !el.dataset.cats!.split(" ").includes(active);
    });
  }, [active]);

  const chips = [{ id: "all", label: allLabel, count: total }, ...options];
  return (
    <div className="hp-filter" ref={root} data-filter={active}>
      <div className="hp-filter__chips" role="group" aria-label={label}>
        {chips.map((c) => (
          <button key={c.id} type="button" className="hp-filter__chip" aria-pressed={active === c.id} onClick={() => setActive(c.id)}>
            {c.label}
            <small>{c.count}</small>
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
