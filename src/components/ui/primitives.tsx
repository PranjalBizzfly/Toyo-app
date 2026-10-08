import Link from "next/link";
import type { ContentStatus, Cta, Faq, MediaAsset } from "@/content/types";
import { jsonLd } from "@/lib/seo";
import { Icon } from "./Icon";

/* ---------- Button ---------- */

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size,
  arrow,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm";
  arrow?: boolean;
}) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""}`;
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow-right" />}
    </>
  );
  return href.startsWith("http") ? (
    <a className={cls} href={href} rel="noopener">
      {content}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}

export function CtaButtons({ primary, secondary }: { primary?: Cta; secondary?: Cta }) {
  return (
    <div className="btn-row">
      {primary && (
        <ButtonLink href={primary.href} arrow>
          {primary.label}
        </ButtonLink>
      )}
      {secondary && (
        <ButtonLink href={secondary.href} variant="secondary">
          {secondary.label}
        </ButtonLink>
      )}
    </div>
  );
}

/* ---------- Section ---------- */

export function Section({
  children,
  tone,
  tight,
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: "surface" | "ink";
  tight?: boolean;
  id?: string;
  labelledBy?: string;
}) {
  const cls = ["section", tight && "section--tight", tone && `section--${tone}`].filter(Boolean).join(" ");
  return (
    <section className={cls} id={id} aria-labelledby={labelledBy}>
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  id,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="section-header">
      <div className="section-header__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Tag className="h2" id={id}>
          {title}
        </Tag>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------- Page hero for inner pages ---------- */

export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-hero">
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

/* ---------- Breadcrumbs (with BreadcrumbList JSON-LD) ---------- */

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.href })),
  };
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {all.map((c, i) =>
          i === all.length - 1 ? (
            <li key={c.href} aria-current="page">
              {c.name}
            </li>
          ) : (
            <li key={c.href}>
              <Link href={c.href}>{c.name}</Link>
            </li>
          ),
        )}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
    </nav>
  );
}

/* ---------- FAQ accordion (no JS; FAQPage JSON-LD) ---------- */

export function FaqList({ faqs, structuredData = true }: { faqs: Faq[]; structuredData?: boolean }) {
  if (!faqs.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <div className="accordion">
      {faqs.map((f) => (
        <details key={f.question}>
          <summary>{f.question}</summary>
          <div className="accordion__body">{f.answer}</div>
        </details>
      ))}
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />}
    </div>
  );
}

/* ---------- Status badge ---------- */

// `pending` is still accepted so callers don't change, but pending products show no badge.
export function StatusBadge({ status }: { status: ContentStatus; pending?: boolean }) {
  if (status === "live" || status === "pending") return null;
  if (status === "coming-soon") return <span className="badge badge--brand">Coming soon</span>;
  return <span className="badge badge--warn">{status === "draft" ? "Draft" : "Placeholder"}</span>;
}

/* ---------- Empty state & reserved slots ---------- */

export function EmptyState({ title, children, action }: { title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="empty">
      <h3 className="h3">{title}</h3>
      {children && <p className="text-muted">{children}</p>}
      {action}
    </div>
  );
}

/**
 * Reserved space for content that must come from real, verified sources
 * (logos, testimonials, metrics, certifications). Pass `show={previewMode}`
 * so it renders only in preview and no fake proof ever ships.
 */
export function Slot({ label, hint, show }: { label: string; hint?: string; show: boolean }) {
  if (!show) return null;
  return (
    <div className="slot" role="note">
      <strong>{label}</strong>
      {hint && <span>{hint}</span>}
    </div>
  );
}

/* ---------- Screenshot frame ---------- */

export function ScreenshotFrame({ media }: { media: MediaAsset }) {
  return (
    <figure className="frame">
      <div className="frame__bar" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" />
      {media.caption && <figcaption className="sr-only">{media.caption}</figcaption>}
    </figure>
  );
}

/* ---------- CTA band ---------- */

export function CtaBand({
  title,
  lead,
  primary,
  secondary,
}: {
  title: string;
  lead?: string;
  primary: Cta;
  secondary?: Cta;
}) {
  return (
    <Section tight>
      <div className="cta-band">
        <h2 className="h2">{title}</h2>
        {lead && <p className="lead">{lead}</p>}
        <CtaButtons primary={primary} secondary={secondary} />
      </div>
    </Section>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((i) => (
        <li key={i}>
          <Icon name="check" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}
