"use client";

import { useState } from "react";

/**
 * Segmented switch above a hero product shot (Zoho Classes' Educator/Student
 * toggle). Children are pre-rendered views; only the active one is shown, with
 * the shared tab-panel crossfade. Works as a plain first view without JS.
 */
export function ViewSwitch({ labels, children }: { labels: string[]; children: React.ReactNode[] }) {
  const [on, setOn] = useState(0);
  return (
    <div className="vs">
      <div className="vs__tabs" role="tablist" aria-label="Product view">
        {labels.map((l, i) => (
          <button key={l} type="button" role="tab" aria-selected={on === i} onClick={() => setOn(i)}>
            {l}
          </button>
        ))}
      </div>
      {children.map((c, i) => (
        <div key={labels[i]} role="tabpanel" hidden={on !== i} className="vs__panel">
          {c}
        </div>
      ))}
    </div>
  );
}
