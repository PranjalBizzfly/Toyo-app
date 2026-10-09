import Link from "next/link";

export interface BranchItem {
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
}

/**
 * Branching timeline (after Zoho Zia Agents' platform section): a central
 * gradient spine; cards alternate sides; each card's rounded connector drops
 * from the card and curves into the spine. Connectors and spine draw in as
 * the item scrolls into view (Motion.tsx adds .is-in); a glowing node pulses
 * at the end. Pure CSS — static and fully visible without JS / reduced motion.
 */
export function BranchTimeline({ title, accent, items, id }: { title: string; accent: string; items: BranchItem[]; id: string }) {
  return (
    <section className="bt" aria-labelledby={id}>
      <div className="container">
        <h2 id={id} className="bt__title">
          {title}
          <br />
          <span className="bt__accent">{accent}</span>
        </h2>
        <ol className="bt__list">
          <span className="bt__spine" aria-hidden="true" data-draw />
          {items.map((it, i) => (
            <li key={`${it.title}-${i}`} className={`bt__item ${i % 2 ? "bt__item--l" : "bt__item--r"}`} data-stage>
              <article className="bt__card" data-reveal={i % 2 ? "left" : "right"}>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                {it.href && (
                  <Link href={it.href} className="bt__link">
                    {it.linkLabel ?? "Learn more"} <span aria-hidden>→</span>
                  </Link>
                )}
              </article>
              <span className="bt__wire" aria-hidden="true">
                <i className="bt__dot" />
              </span>
            </li>
          ))}
          <li className="bt__end" aria-hidden="true">
            <span className="bt__node">✦</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
