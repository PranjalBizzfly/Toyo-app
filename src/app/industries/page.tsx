import { getSiteFaqs } from "@/lib/faqs";
import Link from "next/link";
import { PageFaqs } from "@/components/ui/PageFaqs";
import { CtaBand } from "@/components/ui/primitives";
import { DirHero, GuideCard, IndustryCard, SectionHead } from "@/components/directory/DirectoryParts";
import { DirectoryFilters } from "@/components/directory/DirectoryFilters";
import { getCategories } from "@/lib/catalog";
import { getIndustryDirectory } from "@/lib/directory";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries",
  description: "ToyoApps products matched to how your industry works, grouped by sector: creative and media, retail, professional services, operations, healthcare, education and growing businesses.",
  path: routes.industries(),
  status: getIndustryDirectory().guides.length ? "live" : "draft",
});

/**
 * Industries hub: cross-product industry guides first, then every industry a
 * product documents, filed by sector with search and filters. All entries
 * come from existing data (src/lib/directory.ts).
 */
export default function IndustriesPage() {
  const { guides, sectors, entries, products } = getIndustryDirectory();
  const categories = getCategories();

  return (
    <>
      <DirHero
        tone="industry"
        crumbs={[{ name: "Industries", href: routes.industries() }]}
        eyebrow="Industries"
        title="Software matched to how your industry works"
        lead="Some ToyoApps products are built for a single sector, such as practice management for Indian CA, CS and tax firms; others document how they serve specific industries. Start with a cross-product guide, or find your industry by sector below."
        stats={[
          { value: guides.length + entries.length, label: "Industry pages" },
          { value: sectors.length, label: "Sectors" },
          { value: new Set([...products.map((p) => p.slug), ...guides.flatMap((g) => g.products)]).size, label: "Products" },
        ]}
      >
        <nav className="dx-jump" aria-label="Jump to a sector">
          {sectors.map((s) => (
            <a key={s.slug} href={`#${s.slug}`}>
              {s.name}
            </a>
          ))}
        </nav>
      </DirHero>

      {guides.length > 0 && (
        <section className="dx-sec dx-sec--ind" aria-labelledby="dx-guides">
          <div className="container">
            <SectionHead
              id="dx-guides"
              kicker="Industry guides"
              title="Where several ToyoApps products work together"
              lead="Each guide covers the challenges a sector faces, how each product addresses them and the integrations they share."
            />
            <div className="dx-grid dx-grid--center">
              {guides.map((g) => (
                <GuideCard key={g.slug} industry={g} />
              ))}
            </div>
          </div>
        </section>
      )}

      {entries.length > 0 && (
        <section className="dx-sec dx-sec--tint dx-sec--ind" aria-labelledby="dx-sectors">
          <div className="container">
            <SectionHead
              id="dx-sectors"
              kicker="By sector"
              title="Find your industry"
              lead="Industries each product documents on its own site, grouped by sector. Every card opens the product's page for that industry."
            />
            <DirectoryFilters
              target="dx-directory"
              total={entries.length}
              noun={["industry", "industries"]}
              groupLabel="sector"
              categories={sectors.filter((s) => s.entries.length).map((s) => ({ value: s.slug, label: s.name, count: s.entries.length }))}
              products={products.map((p) => ({ value: p.slug, label: p.name, count: entries.filter((e) => e.product.slug === p.slug).length }))}
            />
            <div id="dx-directory" className="dx-groups dx-groups--packed">
              {sectors.map((s) => (
                <section key={s.slug} id={s.slug} className="dx-group dx-group--sector" data-group={s.entries.length ? "" : undefined} aria-labelledby={`dx-s-${s.slug}`} style={{ "--n2": Math.min(s.entries.length, 2), "--n4": Math.min(s.entries.length, 4) } as React.CSSProperties}>
                  <header className="dx-group__head">
                    <div>
                      <h3 id={`dx-s-${s.slug}`}>{s.name}</h3>
                      <p>{s.lead}</p>
                    </div>
                    {s.guides.map((g) => (
                      <Link key={g.slug} href={routes.industry(g.slug)} className="dx-group__guide">
                        {g.name} <span aria-hidden>→</span>
                      </Link>
                    ))}
                  </header>
                  {s.entries.length > 0 && (
                    <ul className="dx-grid dx-grid--industries">
                      {s.entries.map((e) => (
                        <IndustryCard key={e.key} entry={e} />
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="dx-sec" aria-labelledby="dx-cats">
        <div className="container dx-split">
          <SectionHead
            id="dx-cats"
            kicker="Not listed?"
            title="Browse by business function instead"
            lead="Most ToyoApps products work across industries. Browse by what you need to get done."
          />
          <ul className="dx-catlinks">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={routes.category(c.slug)}>
                  <strong>{c.name}</strong>
                  {c.tagline && <span>{c.tagline}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageFaqs faqs={getSiteFaqs("industries")} />
      <CtaBand
        title="Find the right software for your business."
        primary={{ label: "Explore products", href: routes.products() }}
        secondary={{ label: "Contact us", href: routes.contactForm() }}
      />
    </>
  );
}
