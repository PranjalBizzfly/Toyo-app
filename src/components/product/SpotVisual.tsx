import "@/app/spot-visuals.css";

type SpotFeature = { name: string; capabilities?: string[]; howItWorks?: string[] };

/** First clause of a sentence, for compact visuals ("Search across X, Y and Z" → "Search across X"). */
const clip = (s: string, max = 46) => {
  const first = s.split(/[;:—–]|, (?=and |or |so |which )/)[0].trim().replace(/\.$/, "");
  return first.length > max ? `${first.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : first;
};

/**
 * One representation per spotlight row, so the same visual pattern never
 * repeats down the page: capability tiles, an arrow flow, a search-results
 * panel and a tag cloud. None of them is numbered — numbered steps are kept
 * for the page's "How it works" section only.
 */
export function SpotVisual({ feature: f, variant }: { feature: SpotFeature; variant: number }) {
  const caps = f.capabilities ?? f.howItWorks ?? [];
  const flow = f.howItWorks ?? f.capabilities ?? [];
  const v = variant % 4;

  if (v === 0)
    return (
      <div className="sv sv--tiles">
        <p className="sv__title">{f.name}</p>
        <ul>
          {caps.slice(0, 4).map((c) => (
            <li key={c}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
              {clip(c, 40)}
            </li>
          ))}
        </ul>
      </div>
    );

  if (v === 1)
    return (
      <div className="sv sv--flow">
        <p className="sv__title">{f.name}</p>
        <ol>
          {flow.slice(0, 4).map((c, k, arr) => (
            <li key={c}>
              <span>{clip(c, 52)}</span>
              {k < arr.length - 1 && <i aria-hidden="true">↓</i>}
            </li>
          ))}
        </ol>
      </div>
    );

  if (v === 2)
    return (
      <div className="sv sv--search">
        <div className="sv__bar">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 14 14" />
          </svg>
          {f.name}
        </div>
        <ul>
          {caps.slice(0, 3).map((c, k) => (
            <li key={c} data-tone={k}>
              <i />
              <span>{clip(c, 58)}</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="sv sv--tags">
      <p className="sv__big">{f.name}</p>
      <ul>
        {caps.slice(0, 6).map((c, k) => (
          <li key={c} data-tone={k % 3}>
            {clip(c, 30)}
          </li>
        ))}
      </ul>
    </div>
  );
}
