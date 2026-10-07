import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/ui/primitives";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

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
    <>
      <PageHero breadcrumbs={[{ name: d.title, href: `/legal/${slug}` }]} eyebrow="Legal" title={d.title} />
      <Section>
        <div className="prose">
          {d.body ? d.body.map((p, i) => <p key={i}>{p}</p>) : <p>This policy is being finalised and will be published here.</p>}
        </div>
      </Section>
    </>
  );
}
