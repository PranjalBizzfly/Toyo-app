"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** What fades/slides in as it scrolls into view (Zoho-style "onscroll" reveal). */
const REVEAL_SELECTOR = [
  "main section h2",
  "main .section-header",
  "main section ul > li",
  "main section ol > li",
  "main section article",
  "main section .card",
  "main section figure",
  "main section .accordion",
].join(",");

/** Containers that get .is-in so their drawn lines / connector flows start. */
const STAGE_SELECTOR = "[data-stage], [data-draw]";

/** Stagger siblings by this much, capped so long grids don't wait forever. */
const STAGGER_MS = 80;
const MAX_STAGGER = 5;

/**
 * Tags below-the-fold content with data-reveal and adds .is-in once it scrolls
 * into view (once — entrances never replay). Content already on screen is left
 * alone (heroes have their own CSS entrance), so nothing flashes on load, and
 * without JS nothing is hidden.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const frame = requestAnimationFrame(() => {
      const fold = window.innerHeight;
      // Explicitly authored reveals (data-reveal="left" etc.) and stages.
      for (const el of document.querySelectorAll<HTMLElement>("main [data-reveal], main " + STAGE_SELECTOR.split(", ").join(", main "))) {
        if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
        else io.observe(el);
      }
      for (const el of document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)) {
        // Skip nested matches and anything in a hero.
        if (el.hasAttribute("data-reveal") || el.closest("[data-reveal]") || el.closest(".h-hero, .zp-hero, .zs-hero, [data-no-reveal]")) continue;
        if (el.getBoundingClientRect().top < fold) continue;
        const parent = el.parentElement;
        const index = parent ? [...parent.children].indexOf(el) : 0;
        el.dataset.reveal = "";
        el.style.setProperty("--reveal-delay", `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`);
        io.observe(el);
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
