"use client";

import { useEffect } from "react";

/** Cards that react to the pointer with a spotlight and a gentle 3D tilt. */
const CARDS = ".h-fcard, .h-pcard, .h-task, .h-role, .h-int, .h-res__item, .h-ind, .h-need, .h-why > li, .h-steps > li, .hp-tabs .h-eco__row, .hp-tabs .h-depth__col";
/** Large panels only get the spotlight; tilting them would feel heavy. */
const NO_TILT = ".hp-tabs .h-eco__row, .hp-tabs .h-depth__col, .hp-need-panel .h-need";
/** Maximum tilt in degrees. */
const TILT = 5;

/**
 * Sets --mx / --my (spotlight position) and --rx / --ry (tilt) on the card under
 * the pointer, and resets the card it leaves. Listens on the homepage root only;
 * skipped for touch screens and reduced motion.
 */
export function HomeGlow() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home");
    if (!root || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    let raf = 0;
    let current: HTMLElement | null = null;
    const reset = (card: HTMLElement) => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const card = (e.target as Element).closest<HTMLElement>(CARDS);
        if (current && current !== card) reset(current);
        current = card;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        if (card.matches(NO_TILT)) return;
        card.style.setProperty("--ry", `${((x / r.width - 0.5) * TILT * 2).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${((0.5 - y / r.height) * TILT * 2).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      if (current) reset(current);
      current = null;
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
