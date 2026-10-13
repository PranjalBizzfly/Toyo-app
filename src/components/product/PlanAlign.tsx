"use client";

import { useEffect } from "react";

/** Parts of a plan card that should start at the same height across a row, in order. */
const ANCHORS = [".pz-plan__price", ".pz-plan__cta", ".pz-plan__list"];

/**
 * Lines up the price, button and feature list of every plan card in the same
 * row, however long each plan's description is. It only adds top margin, so
 * nothing is hidden or reordered, and it re-measures on resize. Without
 * JavaScript the cards simply keep their natural layout.
 */
export function PlanAlign() {
  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>(".pz-plan")];
    if (cards.length < 2) return;
    let raf = 0;
    const align = () => {
      for (const sel of ANCHORS) cards.forEach((c) => c.querySelector<HTMLElement>(sel)?.style.removeProperty("margin-top"));
      // Group cards into visual rows by their top edge.
      const rows = new Map<number, HTMLElement[]>();
      for (const c of cards) {
        const top = Math.round(c.getBoundingClientRect().top);
        rows.set(top, [...(rows.get(top) ?? []), c]);
      }
      for (const row of rows.values()) {
        if (row.length < 2) continue;
        for (const sel of ANCHORS) {
          const items = row.map((c) => ({ c, el: c.querySelector<HTMLElement>(sel) })).filter((x) => x.el) as { c: HTMLElement; el: HTMLElement }[];
          const offsets = items.map(({ c, el }) => el.getBoundingClientRect().top - c.getBoundingClientRect().top);
          const target = Math.max(...offsets);
          items.forEach(({ el }, i) => {
            const gap = target - offsets[i];
            if (gap > 0.5) el.style.marginTop = `${parseFloat(getComputedStyle(el).marginTop) + gap}px`;
          });
        }
      }
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(align);
    };
    align();
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    return () => {
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
