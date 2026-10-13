"use client";

import { useEffect } from "react";

/**
 * Fades the footer's columns up one after another when the footer scrolls
 * into view. Without JavaScript (or with reduced motion) nothing is hidden.
 */
export function FooterReveal() {
  useEffect(() => {
    const foot = document.querySelector<HTMLElement>(".sfoot");
    if (!foot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (foot.getBoundingClientRect().top < window.innerHeight) return;
    foot.dataset.fmReveal = "ready";
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      foot.dataset.fmReveal = "in";
      io.disconnect();
    }, { threshold: 0.05 });
    io.observe(foot);
    return () => io.disconnect();
  }, []);
  return null;
}
