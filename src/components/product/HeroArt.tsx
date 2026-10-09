import type { Product } from "@/content/types";
import type { StoryArt } from "@/lib/product-story";

/**
 * Original ToyoApps hero artwork — layered product-UI illustrations in the
 * style of a modern SaaS product site, drawn in HTML/SVG so they stay crisp,
 * theme-aware and labelled with the product's own (verified) feature names.
 * No numbers are claims: values shown are clearly illustrative UI.
 * Decorative: the hero copy carries the meaning, so the art is aria-hidden.
 */
export function HeroArt({ product, art }: { product: Product; art: StoryArt }) {
  const feats = (product.features ?? []).map((f) => f.name);
  const pick = (i: number, fallback: string) => feats[i] ?? fallback;
  const caps = (product.features ?? []).flatMap((f) => f.capabilities ?? []);
  const cap = (i: number, fallback: string) => short(caps[i] ?? fallback);
  const initial = product.name.charAt(0);

  return (
    <div className={`zs-art zs-art--${art}`} aria-hidden="true">
      <span className="zs-art__glow" />
      {render()}
    </div>
  );

  function render() {
    switch (art) {
      case "people":
        return (
          <>
            <div className="zs-win zs-win--main">
              <WinBar title={`${product.name} · ${pick(0, "Employees")}`} />
              <div className="zs-people">
                {["AK", "RS", "MP", "JD", "NV", "SG"].map((n, i) => (
                  <div key={n} className="zs-person">
                    <span className={`zs-av zs-av--${i % 3}`}>{n}</span>
                    <span className="zs-line" style={{ width: `${70 - i * 6}%` }} />
                    <span className={`zs-tag zs-tag--${i % 3}`}>{["Present", "On leave", "Remote"][i % 3]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="zs-float zs-float--a">
              <Ring value={0.82} />
              <span>
                <b>{pick(1, "Attendance")}</b>
                <small>This month</small>
              </span>
            </div>
            <div className="zs-float zs-float--b">
              <b>{pick(2, "Payroll")}</b>
              <Bars n={6} />
            </div>
          </>
        );
      case "gallery":
        return (
          <>
            <div className="zs-win zs-win--main">
              <WinBar title={`${product.name} · Library`} />
              <div className="zs-search">
                <SearchIcon /> <span>{cap(0, "Search by what's inside the file")}</span>
              </div>
              <div className="zs-tiles">
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i} className={`zs-tile zs-tile--${i % 4}`}>
                    {i % 3 === 0 && <em>{["video", "image", "doc", "audio"][i % 4]}</em>}
                  </span>
                ))}
              </div>
            </div>
            <div className="zs-float zs-float--a zs-chips">
              <b>{pick(1, "AI tags")}</b>
              <span>
                {["people", "outdoor", "logo", "product"].map((t) => (
                  <i key={t}>{t}</i>
                ))}
              </span>
            </div>
            <div className="zs-float zs-float--b">
              <b>{pick(2, "Versions")}</b>
              <small>v3 · approved</small>
            </div>
          </>
        );
      case "flow":
        return (
          <>
            <svg className="zs-flow" viewBox="0 0 520 360">
              <path className="flow-line" d="M120 80 C 220 80, 220 180, 300 180" />
              <path className="flow-line" d="M120 280 C 220 280, 220 180, 300 180" />
              <path className="flow-line" d="M380 180 C 420 180, 430 100, 470 100" />
              <path className="flow-line" d="M380 180 C 420 180, 430 260, 470 260" />
            </svg>
            <div className="zs-node zs-node--1"><Dot />{pick(0, "Trigger")}</div>
            <div className="zs-node zs-node--2"><Dot />{pick(1, "Collect data")}</div>
            <div className="zs-node zs-node--hub">
              <span className="product-card__logo">{initial}</span>
              {product.name}
            </div>
            <div className="zs-node zs-node--3"><Dot />{pick(2, "Send")}</div>
            <div className="zs-node zs-node--4"><Dot />{pick(3, "Report")}</div>
          </>
        );
      case "card":
        return (
          <>
            <div className="zs-phone">
              <div className="zs-phone__notch" />
              <div className="zs-bizcard">
                <span className="zs-av zs-av--1">AK</span>
                <b>Aarav Kumar</b>
                <small>Head of Partnerships</small>
                <span className="zs-line" />
                <span className="zs-line" style={{ width: "60%" }} />
              </div>
              <div className="zs-scanframe" />
              <div className="zs-phone__cta">{pick(0, "Scan card")}</div>
            </div>
            <div className="zs-float zs-float--a">
              <b>{pick(1, "Tag-first memory")}</b>
              <span className="zs-chips"><span><i>event</i><i>follow up</i></span></span>
            </div>
            <div className="zs-float zs-float--b">
              <b>{pick(2, "Outreach")}</b>
              <small>{cap(2, "Message drafted")}</small>
            </div>
          </>
        );
      case "chart":
        return (
          <>
            <div className="zs-win zs-win--main">
              <WinBar title={`${product.name} · ${pick(0, "Report")}`} />
              <div className="zs-chart">
                <svg viewBox="0 0 200 200" className="zs-circles">
                  <circle cx="100" cy="100" r="92" />
                  <circle cx="100" cy="122" r="62" />
                  <circle cx="100" cy="144" r="34" />
                </svg>
                <div className="zs-chart__bars">
                  <Bars n={7} />
                  <span className="zs-line" />
                  <span className="zs-line" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
            <div className="zs-float zs-float--a">
              <b>{pick(1, "Sources")}</b>
              <small>{cap(1, "Every figure cited")}</small>
            </div>
          </>
        );
      case "map":
        return (
          <>
            <div className="zs-win zs-win--main zs-map">
              <svg viewBox="0 0 480 300">
                <path className="zs-map__road" d="M0 220 C 120 200, 160 120, 260 130 S 420 60, 480 70" />
                <path className="zs-map__road" d="M60 0 C 90 120, 200 200, 240 300" />
                <path className="flow-line zs-map__route" d="M70 210 C 150 190, 180 135, 260 130 S 380 85, 430 78" />
                <circle className="zs-map__pin" cx="70" cy="210" r="9" />
                <circle className="zs-map__pin zs-map__pin--end" cx="430" cy="78" r="9" />
              </svg>
            </div>
            <div className="zs-float zs-float--a">
              <b>{pick(0, "Trips")}</b>
              <small>{cap(0, "Live trip tracking")}</small>
            </div>
            <div className="zs-float zs-float--b">
              <b>{pick(1, "Costing")}</b>
              <Bars n={5} />
            </div>
          </>
        );
      case "mail":
        return (
          <>
            <div className="zs-win zs-win--main zs-mail">
              <WinBar title="New message" />
              <span className="zs-line" />
              <span className="zs-line" style={{ width: "85%" }} />
              <span className="zs-line" style={{ width: "62%" }} />
              <div className="zs-sig">
                <span className="zs-av zs-av--0">PS</span>
                <span>
                  <b>Priya Sharma</b>
                  <small>Brand Manager</small>
                  <span className="zs-sig__bar" />
                </span>
                <span className="zs-sig__banner">{product.name}</span>
              </div>
            </div>
            <div className="zs-float zs-float--a">
              <b>{pick(0, "Central templates")}</b>
              <small>{cap(0, "Rolled out to every user")}</small>
            </div>
          </>
        );
      case "calendar":
        return (
          <>
            <div className="zs-win zs-win--main">
              <WinBar title={`${product.name} · ${pick(0, "Compliance calendar")}`} />
              <div className="zs-cal">
                {Array.from({ length: 28 }, (_, i) => (
                  <span key={i} className={[7, 11, 19, 24].includes(i) ? `zs-cal__due zs-cal__due--${i % 3}` : undefined}>
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
            <div className="zs-float zs-float--a">
              <b>{pick(1, "Due dates")}</b>
              <small>{cap(1, "Filing reminders")}</small>
            </div>
            <div className="zs-float zs-float--b">
              <Ring value={0.64} />
              <b>{pick(2, "Tasks")}</b>
            </div>
          </>
        );
      case "chat":
        return (
          <>
            <div className="zs-win zs-win--main zs-chat">
              <WinBar title={`${product.name} · ${pick(0, "Summary")}`} />
              <p className="zs-bubble"><span className="zs-line" /><span className="zs-line" style={{ width: "70%" }} /></p>
              <p className="zs-bubble zs-bubble--me"><span className="zs-line" /><span className="zs-line" style={{ width: "55%" }} /></p>
              <p className="zs-bubble zs-bubble--ai">
                <b>{pick(1, "AI summary")}</b>
                <span className="zs-line" />
                <span className="zs-line" style={{ width: "80%" }} />
              </p>
            </div>
            <div className="zs-float zs-float--b">
              <b>{pick(2, "Action items")}</b>
              <small>{cap(2, "Owners and next steps")}</small>
            </div>
          </>
        );
      case "phone":
        return (
          <>
            <div className="zs-phone">
              <div className="zs-phone__notch" />
              <div className="zs-dial">
                <span className="zs-av zs-av--2">{initial}</span>
                <b>{pick(0, "Calling")}</b>
                <small>00:42</small>
                <svg viewBox="0 0 120 30" className="zs-wave">
                  {Array.from({ length: 20 }, (_, i) => (
                    <rect key={i} x={i * 6} y={15 - ((i * 7) % 12)} width="3" height={2 * ((i * 7) % 12) + 2} rx="1.5" />
                  ))}
                </svg>
              </div>
              <div className="zs-phone__cta zs-phone__cta--end">End</div>
            </div>
            <div className="zs-float zs-float--a">
              <b>{pick(1, "Lead queue")}</b>
              <small>{cap(1, "Next lead ready")}</small>
            </div>
            <div className="zs-float zs-float--b">
              <b>{pick(2, "Reports")}</b>
              <Bars n={6} />
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="zs-win zs-win--main">
              <WinBar title={`${product.name} · ${pick(0, "Timeline")}`} />
              <div className="zs-timeline-art">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ width: `${30 + ((i * 23) % 60)}%` }} className={`zs-tl zs-tl--${i % 3}`} />
                ))}
              </div>
            </div>
            <div className="zs-float zs-float--a">
              <b>{pick(1, "Daily report")}</b>
              <small>{cap(1, "Written for you")}</small>
            </div>
          </>
        );
    }
  }
}

function short(s: string) {
  return s.length > 42 ? `${s.slice(0, 40).trimEnd()}…` : s;
}

function WinBar({ title }: { title: string }) {
  return (
    <div className="zs-win__bar">
      <i /><i /><i />
      <span>{title}</span>
    </div>
  );
}

function Ring({ value }: { value: number }) {
  const c = 2 * Math.PI * 16;
  return (
    <svg viewBox="0 0 40 40" className="zs-ring">
      <circle cx="20" cy="20" r="16" />
      <circle cx="20" cy="20" r="16" strokeDasharray={`${c * value} ${c}`} />
    </svg>
  );
}

function Bars({ n }: { n: number }) {
  return (
    <span className="zs-bars">
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{ height: `${35 + ((i * 37) % 60)}%` }} />
      ))}
    </span>
  );
}

function Dot() {
  return <i className="zs-dot" />;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16">
      <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
