"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Direction = "up" | "down" | null;

/** Pages shorter than this many extra pixels don't get a scroll control. */
const MIN_SCROLLABLE = 600;

/**
 * One floating control that scrolls to the bottom while you're in the upper
 * half of a long page, and back to the top once you're past halfway.
 * Hidden on short pages. Respects reduced-motion.
 */
export function ScrollToggle() {
  const [direction, setDirection] = useState<Direction>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max < MIN_SCROLLABLE) return setDirection(null);
      setDirection(window.scrollY > max / 2 ? "up" : "down");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Content can grow after load (images, client components).
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (!direction) return null;

  const up = direction === "up";
  const label = up ? "Scroll to top" : "Scroll to bottom";

  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: up ? 0 : document.documentElement.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button type="button" className="scroll-toggle" onClick={onClick} aria-label={label} title={label} data-direction={direction}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
