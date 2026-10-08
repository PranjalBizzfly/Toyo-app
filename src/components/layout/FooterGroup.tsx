"use client";

import { useEffect, useId, useState } from "react";

const MOBILE = "(max-width: 767.98px)";

/**
 * One footer link group. Under 768px it is an accordion; above it the list is
 * always shown and the heading is plain text (no toggle for assistive tech).
 */
export function FooterGroup({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const id = useId();

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="fgroup" data-open={open || undefined}>
      <h3 className="fgroup__title">
        {mobile ? (
          <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
            <span>{title}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <span className="fgroup__heading">{title}</span>
        )}
      </h3>
      <div className="fgroup__body" id={id}>
        {children}
      </div>
    </div>
  );
}
