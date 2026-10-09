import type { Product } from "@/content/types";
import { groupFeatures } from "@/lib/catalog";

/**
 * Realistic product-dashboard illustration (HTML, theme-aware), built from the
 * product's own feature areas and feature names. Sample rows and figures are
 * placeholder UI data — decorative, aria-hidden, never presented as claims.
 */
export function DashboardMock({ product, view = "firm", compact = false }: { product: Product; view?: "firm" | "client"; compact?: boolean }) {
  const groups = groupFeatures(product);
  const feats = (product.features ?? []).map((f) => f.name);
  const nav = (groups.length > 1 ? groups.map((g) => g.group.name) : feats).slice(0, 8);
  const tiles = feats.slice(0, compact ? 4 : 6);
  const initial = product.name.charAt(0);
  const rows = ["Sample Client A", "Sample Client B", "Sample Client C", "Sample Client D"];

  return (
    <div className={`dm${compact ? " dm--compact" : ""}`} aria-hidden="true">
      <div className="dm__top">
        <span className="dm__brand">
          <i>{initial}</i>
          {product.name}
        </span>
        <span className="dm__search">Search…</span>
        <span className="dm__me" />
      </div>
      <div className="dm__body">
        <ul className="dm__nav">
          <li className="is-on">Dashboard</li>
          {nav.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <div className="dm__main">
          <p className="dm__hello">
            {view === "firm" ? "Good morning" : "Welcome back"} · <b>{view === "firm" ? `${product.name} workspace` : "Client view"}</b>
          </p>
          <div className="dm__tiles">
            {tiles.map((t, i) => (
              <span key={t} className={`dm__tile dm__tile--${i % 4}`}>
                <i />
                <b>{(i * 7 + 3) % 40}</b>
                <small>{t}</small>
              </span>
            ))}
          </div>
          <div className="dm__panes">
            <div className="dm__pane">
              <p className="dm__h">{feats[0] ?? "Overview"}</p>
              {rows.map((r, i) => (
                <div key={r} className="dm__row">
                  <span className={`dm__av dm__av--${i % 3}`}>{r.slice(-1)}</span>
                  <span className="dm__rt">
                    <b>{r}</b>
                    <small>{feats[(i + 1) % Math.max(1, feats.length)] ?? ""}</small>
                  </span>
                  <span className={`dm__pill dm__pill--${i % 3}`}>{["Due soon", "In review", "Filed"][i % 3]}</span>
                </div>
              ))}
            </div>
            {!compact && (
              <div className="dm__pane dm__pane--cal">
                <p className="dm__h">{feats[1] ?? "Calendar"}</p>
                <div className="dm__cal">
                  {Array.from({ length: 35 }, (_, i) => (
                    <span key={i} className={[4, 11, 17, 23, 30].includes(i) ? `is-due is-due--${i % 3}` : i === 13 ? "is-today" : undefined}>
                      {(i % 31) + 1}
                    </span>
                  ))}
                </div>
                <div className="dm__bars">
                  {Array.from({ length: 9 }, (_, i) => (
                    <i key={i} style={{ height: `${30 + ((i * 41) % 65)}%` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Phone companion screen for the same product. */
export function PhoneMock({ product, title }: { product: Product; title?: string }) {
  const feats = (product.features ?? []).map((f) => f.name);
  return (
    <div className="pm" aria-hidden="true">
      <div className="pm__notch" />
      <p className="pm__time">9:41</p>
      <div className="pm__hero">
        <i>{product.name.charAt(0)}</i>
        <b>{title ?? feats[0] ?? product.name}</b>
        <small>{product.name}</small>
      </div>
      <div className="pm__stats">
        <span>
          <b>6</b>
          <small>{feats[1] ?? "Open"}</small>
        </span>
        <span>
          <b>4</b>
          <small>{feats[2] ?? "Done"}</small>
        </span>
      </div>
      {feats.slice(3, 6).map((f, i) => (
        <div key={f} className="pm__item">
          <span className={`dm__av dm__av--${i % 3}`}>{f.charAt(0)}</span>
          <span>
            <b>{f}</b>
            <small>Today</small>
          </span>
        </div>
      ))}
    </div>
  );
}
