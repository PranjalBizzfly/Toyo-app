import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/primitives";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";

/**
 * Legal documents. Real policy text must come from the business/legal team;
 * until `body` is supplied the page is noindexed and says so plainly.
 */
const docs: Record<string, { title: string; body?: string[] }> = {
  privacy: { title: "Privacy policy" },
  terms: { title: "Terms of service" },
  cookies: { title: "Cookie policy" },
};

type Props = { params: Promise<{ doc: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(docs).map((doc) => ({ doc }));

export async function generateMetadata({ params }: Props) {
  const slug = (await params).doc as keyof typeof docs;
  const d = docs[slug];
  if (!d) return {};
  return buildMetadata({
    title: d.title,
    description: `${d.title} for ToyoApps.`,
    path: routes.legal(slug as "privacy"),
    status: d.body ? "live" : "draft",
  });
}

export default async function LegalPage({ params }: Props) {
  const slug = (await params).doc;
  const d = docs[slug];
  if (!d) notFound();
  return (
    <div className="lg">
      <aside className="lg__side">
        <nav className="lg__nav" aria-label="Legal documents">
          <p className="lg__grouptitle">
            Legal
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M2 9l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </p>
          <ul className="lg__list">
            {Object.entries(docs).map(([key, doc]) => (
              <li key={key}>
                <Link href={`/legal/${key}`} aria-current={key === slug ? "page" : undefined}>
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="lg__main">
        <header className="lg__summary">
          <Breadcrumbs items={[{ name: d.title, href: `/legal/${slug}` }]} />
          <h1>{d.title}</h1>
          <p>This {d.title.toLowerCase()} covers the ToyoApps website and the products and services offered through it.</p>
        </header>
        <article className="lg__body">
          {d.body ? d.body.map((p, i) => <p key={i}>{p}</p>) : <p>This policy is being finalised and will be published here.</p>}
        </article>
      </div>
    </div>
  );
}
