"use client";

import { Children, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from "react";

/**
 * 3D coverflow: the active card faces the viewer, the rest fan out on both
 * sides, turned away in depth. Click a side card, use the buttons, the arrow
 * keys, the dots, or swipe to bring another card forward. Every card is
 * server-rendered and stays in the HTML.
 */
export function HomeCoverflow({ label, names, children }: { label: string; names: string[]; children: ReactNode }) {
  const items = Children.toArray(children);
  const n = items.length;
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const go = (i: number) => setActive(((i % n) + n) % n);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
  };
  // A click on a side card brings it forward instead of following its link.
  const onCardClick = (i: number) => (e: MouseEvent) => {
    if (drag.current?.moved || i !== active) {
      e.preventDefault();
      if (!drag.current?.moved) go(i);
    }
  };
  const onDown = (e: PointerEvent) => { drag.current = { x: e.clientX, moved: false }; };
  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d || d.moved || Math.abs(e.clientX - d.x) < 40) return;
    d.moved = true;
    go(active + (e.clientX < d.x ? 1 : -1));
  };
  const onUp = () => { setTimeout(() => { drag.current = null; }, 0); };

  return (
    <div className="hp-cf" role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKey}>
      <div className="hp-cf__stage" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        {items.map((child, i) => {
          // Shortest signed distance from the active card, so the ring wraps around.
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          return (
            <div
              key={i}
              className="hp-cf__item"
              data-active={off === 0 || undefined}
              aria-hidden={Math.abs(off) > 2 || undefined}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${names[i]}`}
              style={{ ["--off" as string]: off, ["--abs" as string]: Math.abs(off) }}
              onClickCapture={onCardClick(i)}
            >
              {child}
            </div>
          );
        })}
      </div>
      <div className="hp-cf__controls">
        <button type="button" className="hp-cf__btn" onClick={() => go(active - 1)} aria-label="Previous problem">
          ‹
        </button>
        <div className="hp-cf__dots" role="tablist" aria-label="Choose a problem">
          {names.map((name, i) => (
            <button key={name} type="button" role="tab" aria-selected={i === active} aria-label={name} className="hp-cf__dot" onClick={() => go(i)} />
          ))}
        </div>
        <button type="button" className="hp-cf__btn" onClick={() => go(active + 1)} aria-label="Next problem">
          ›
        </button>
      </div>
      {/* Not shown on screen; announces the new card to screen readers */}
      <p className="sr-only" aria-live="polite">
        {active + 1} of {n}: {names[active]}
      </p>
    </div>
  );
}
