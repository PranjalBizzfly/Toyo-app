"use client";

import { useState } from "react";

/**
 * Endless sideways strip of product names/logos, like Zoho's brand marquee.
 * The track is rendered twice so the loop is seamless; the copy is hidden from
 * assistive tech. Pauses on hover/focus and has an explicit pause button.
 */
export function LogoMarquee({ label, children }: { label: string; children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="marquee" data-paused={paused || undefined} data-no-reveal>
      <div className="marquee__viewport" aria-label={label} role="region">
        <div className="marquee__track">
          <ul className="marquee__list">{children}</ul>
          <ul className="marquee__list" aria-hidden inert>
            {children}
          </ul>
        </div>
      </div>
      <button type="button" className="marquee__toggle" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? "Play logo animation" : "Pause logo animation"}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
        </svg>
      </button>
    </div>
  );
}
