import Link from "next/link";
import "@/app/hero-scene.css";
import "@/app/hero-scene-deck.css";
import type { Category, Product } from "@/content/types";
import { routes } from "@/lib/routes";
import { LogoMark } from "@/components/layout/Logo";

/*
 * Hero scene, matched to the approved hero artwork. Positions and sizes are in
 * cqw (1cqw = 1% of the scene width) measured from that artwork.
 *
 * DISPLAY VALUES — the dashboard copy below reproduces the artwork as
 * illustration. Edit here to change what the laptop screen shows.
 */
const SCREEN = {
  greeting: "Good Morning, Alex",
  sub: "Here's what's happening with your business today.",
  user: { name: "Alex Johnson", role: "Business Owner" },
  stats: [
    { label: "Total Products", value: "16+", delta: "12%" },
    { label: "Active Users", value: "12,480", delta: "20%" },
    { label: "Integrations", value: "250+", delta: "18%" },
  ],
  growth: { label: "Business Growth", delta: "32%" },
  popular: [
    { slug: "cardizo", name: "Cardizo", letter: "C", color: "#1a73e8" },
    { slug: "benj", name: "Benj", letter: "B", color: "#3fa34d" },
    { slug: "oda7", name: "ODA7", letter: "O", color: "#8e44e6" },
    { slug: "trackysuite", name: "TrackySuite", letter: "T", color: "#1e8ff0" },
    { slug: "sibu", name: "Sibu", letter: "S", color: "#a24ee6" },
  ],
};

/** Floating cards: slug, position (cqw), tile colour, letter or icon, label. */
const CARDS: { slug: string; name: string; x: number; y: number; color: string; letter?: string; bolt?: boolean; label: string }[] = [
  { slug: "cardizo", name: "Cardizo", x: 25, y: 2.4, color: "#1a73e8", letter: "C", label: "Business Cards" },
  { slug: "hrmagix", name: "HRMagix", x: 44.4, y: 0, color: "#3fa34d", letter: "H", label: "HR & Payroll" },
  { slug: "oda7", name: "ODA7", x: 62.2, y: 2.4, color: "#1a73e8", letter: "O", label: "Sales & Marketing" },
  { slug: "zapbuzzer", name: "ZapBuzzer", x: 11.6, y: 11.4, color: "#f25c5c", bolt: true, label: "Marketing" },
  { slug: "zuzu", name: "ZUZU", x: 4.8, y: 24.6, color: "#18a99a", letter: "Z", label: "Communication" },
  { slug: "sizoru", name: "Sizoru", x: 9.4, y: 38.4, color: "#9b51e0", letter: "S", label: "Research & Insights" },
  { slug: "sigchanger", name: "SigChanger", x: 81.4, y: 12.6, color: "#f5a524", letter: "S", label: "Email Signatures" },
  { slug: "trackysuite", name: "TrackySuite", x: 87.6, y: 27.4, color: "#9b51e0", letter: "T", label: "Compliance" },
];

/** Growth line, in a 300 × 70 box. */
const GROWTH = "M0 58 C 14 50, 22 44, 34 48 S 56 40, 68 44 S 92 30, 104 34 S 124 40, 138 32 S 160 24, 172 30 S 196 20, 210 24 S 236 14, 250 18 S 280 8, 300 6";

/** Broad, rounded leaves (left of the laptop in the artwork). */
function BroadLeaves({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 200 220" aria-hidden>
      <g className="hs__leaves">
        <path d="M120 215 C 60 200, 8 150, 14 86 C 70 90, 118 150, 120 215Z" fill="#2f7d38" />
        <path d="M120 215 C 70 170, 46 100, 70 30 C 120 70, 136 150, 120 215Z" fill="#3e9446" />
        <path d="M120 215 C 112 150, 128 80, 170 34 C 192 92, 168 160, 120 215Z" fill="#4aa752" />
        <path d="M120 215 C 70 214, 26 200, 0 168 C 50 150, 100 176, 120 215Z" fill="#256b2e" />
        <path d="M70 30 C 96 90, 110 150, 120 215" stroke="#2a7232" strokeWidth="2" fill="none" />
        <path d="M14 86 C 60 120, 100 170, 120 215" stroke="#235f2a" strokeWidth="2" fill="none" />
        <path d="M170 34 C 150 100, 132 160, 120 215" stroke="#357f3c" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

function Leaves({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 200 220" aria-hidden>
      <g className="hs__leaves">
        <path d="M100 210 C 60 180, 20 150, 6 96 C 46 104, 84 140, 100 210Z" fill="#3f9b47" />
        <path d="M100 210 C 140 180, 180 150, 196 92 C 154 102, 116 140, 100 210Z" fill="#378f40" />
        <path d="M100 210 C 70 160, 52 110, 60 40 C 92 76, 108 140, 100 210Z" fill="#5cbd5f" />
        <path d="M100 210 C 128 160, 150 110, 146 34 C 112 74, 94 140, 100 210Z" fill="#4fae54" />
        <path d="M100 212 C 96 150, 98 80, 102 6 C 118 70, 116 150, 100 212Z" fill="#74cf6f" />
        <path d="M100 212 C 50 200, 18 190, 0 160 C 40 156, 76 176, 100 212Z" fill="#2f8238" />
        <path d="M100 212 C 150 200, 182 190, 200 158 C 160 154, 124 176, 100 212Z" fill="#2c7a35" />
      </g>
    </svg>
  );
}

/**
 * Animated hero scene: angled laptop with a dashboard, floating product
 * cards, plants and a mug. Pure CSS animation; still under reduced motion.
 */
export function HeroScene({
  products,
}: {
  products: Product[];
  categories?: { category: Category; products: Product[] }[];
  integrationsCount?: number;
}) {
  const exists = new Set(products.map((p) => p.slug));

  return (
    <div className="hs" role="img" aria-label="ToyoApps dashboard surrounded by ToyoApps products">
      <span className="hs__panel" aria-hidden />
      <span className="hs__rays" aria-hidden />
      <span className="hs__bokeh" aria-hidden />
      <span className="hs__grain" aria-hidden />
      {/* Circular orbit: blue → pink gradient ring with a glow and a travelling light */}
      <svg className="hs__ring" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <linearGradient id="hs-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7fb2ff" />
            <stop offset=".5" stopColor="#b9a8ff" />
            <stop offset="1" stopColor="#f3a9d8" />
          </linearGradient>
          <filter id="hs-ring-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="url(#hs-ring)" strokeWidth="2.4" opacity=".55" filter="url(#hs-ring-glow)" />
        <circle cx="100" cy="100" r="96" fill="none" stroke="url(#hs-ring)" strokeWidth=".7" opacity=".9" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="url(#hs-ring)" strokeWidth=".4" strokeDasharray="1.5 3" opacity=".45" />
        <g className="hs__ring-dot">
          <circle cx="100" cy="4" r="2.6" fill="#fff" />
          <circle cx="100" cy="4" r="5" fill="#a9c8ff" opacity=".45" filter="url(#hs-ring-glow)" />
        </g>
      </svg>

      <p className="hs__note" aria-hidden>
        Smart Tools.
        <br />
        <span>Real Business Growth.</span>
        <svg viewBox="0 0 160 14" preserveAspectRatio="none">
          <path d="M2 11 C 50 2, 110 2, 158 6" />
        </svg>
      </p>

      <span className="hs__floor" aria-hidden />
      <BroadLeaves className="hs__plant hs__plant--left" />

      {/* Laptop */}
      <div className="hs__stage" aria-hidden>
        <div className="hs__laptop">
          <div className="hs__lid">
            <span className="hs__cam" />
            <div className="hs__screen">
              <aside className="hs__side">
                <span className="hs__brand">
                  <LogoMark className="hs__brand-mark" /> Toyo Apps
                </span>
                {["Dashboard", "Products", "Solutions", "Industries", "Integrations", "Reports", "Settings"].map((l, i) => (
                  <span key={l} className={`hs__nav${i === 0 ? " is-on" : ""}`}>
                    <i />
                    {l}
                  </span>
                ))}
              </aside>
              <div className="hs__main">
                <div className="hs__top">
                  <span className="hs__search">
                    <svg viewBox="0 0 16 16">
                      <circle cx="7" cy="7" r="4.5" />
                      <path d="M10.5 10.5 14 14" />
                    </svg>
                    Search...
                  </span>
                  <span className="hs__user">
                    <span className="hs__avatar" />
                    <span>
                      <b>{SCREEN.user.name}</b>
                      <small>{SCREEN.user.role}</small>
                    </span>
                    <i>⌄</i>
                  </span>
                </div>
                <p className="hs__hello">{SCREEN.greeting}</p>
                <p className="hs__sub">{SCREEN.sub}</p>
                <div className="hs__stats">
                  {SCREEN.stats.map((s, i) => (
                    <span key={s.label} className="hs__stat" style={{ ["--d" as string]: `${0.7 + i * 0.15}s` }}>
                      <small>{s.label}</small>
                      <b>{s.value}</b>
                      <em>↑ {s.delta}</em>
                    </span>
                  ))}
                </div>
                <div className="hs__chart">
                  <p>
                    {SCREEN.growth.label}
                    <em>↑ {SCREEN.growth.delta}</em>
                  </p>
                  <svg viewBox="0 0 300 70" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hs-area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#1a73e8" stopOpacity=".18" />
                        <stop offset="1" stopColor="#1a73e8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[14, 32, 50].map((y) => (
                      <line key={y} x1="0" x2="300" y1={y} y2={y} className="hs__grid" />
                    ))}
                    <path className="hs__area" d={`${GROWTH} L300 70 L0 70Z`} />
                    <path className="hs__line" d={GROWTH} pathLength={1} />
                  </svg>
                </div>
                <div className="hs__popular">
                  <p>Popular Products</p>
                  <div>
                    {SCREEN.popular.map((p, i) => (
                      <span key={p.slug} style={{ ["--d" as string]: `${1.6 + i * 0.1}s` }}>
                        <i style={{ backgroundColor: p.color }}>{p.letter}</i>
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Keyboard deck seen from slightly above (flat drawing keeps text sharp) */}
          <div className="hs__base">
            <span className="hs__notch" />
            <span className="hs__kb">
              {Array.from({ length: 4 }, (_, row) => (
                <span key={row} className="hs__kb-row">
                  {Array.from({ length: 14 - row }, (_, k) => (
                    <i key={k} />
                  ))}
                </span>
              ))}
              <span className="hs__kb-row">
                <i />
                <i />
                <i className="hs__kb-space" />
                <i />
                <i />
              </span>
            </span>
            <span className="hs__trackpad" />
            <span className="hs__speaker hs__speaker--l" />
            <span className="hs__speaker hs__speaker--r" />
            <span className="hs__lip" />
          </div>
        </div>
      </div>

      <div className="hs__eco" aria-hidden>
        <strong>
          Your Complete
          <br />
          SaaS Ecosystem
        </strong>
        <span>
          16+ products. 1 platform.
          <br />
          Endless possibilities.
        </span>
        <i>→</i>
      </div>

      <Leaves className="hs__plant hs__plant--right" />
      <span className="hs__pot" aria-hidden />
      <div className="hs__mug" aria-hidden>
        <span className="hs__steam">
          <i />
          <i />
          <i />
        </span>
        <span className="hs__mug-body">
          <LogoMark className="hs__mug-logo" />
          <small>Toyo Apps</small>
        </span>
        <span className="hs__mug-handle" />
      </div>

      {/* Floating product cards */}
      {CARDS.map((c, i) => {
        const inner = (
          <span className="hs__card-in">
            <i style={{ backgroundColor: c.color }}>
              {c.bolt ? (
                <svg viewBox="0 0 24 24">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
                </svg>
              ) : (
                c.letter
              )}
            </i>
            <strong>{c.name}</strong>
            <small>{c.label}</small>
          </span>
        );
        const style = { left: `${c.x}cqw`, top: `${c.y}cqw`, ["--d" as string]: `${0.25 + i * 0.12}s`, ["--f" as string]: `${5 + (i % 3)}s`, ["--fd" as string]: `${-i * 0.8}s` };
        return exists.has(c.slug) ? (
          <Link key={c.slug} href={routes.product(c.slug)} className="hs__card" style={style} tabIndex={-1}>
            {inner}
          </Link>
        ) : (
          <span key={c.slug} className="hs__card" style={style}>
            {inner}
          </span>
        );
      })}
    </div>
  );
}
