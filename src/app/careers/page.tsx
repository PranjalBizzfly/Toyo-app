import { getSiteFaqs } from "@/lib/faqs";
import { Labelled } from "@/components/ui/Labelled";
import Link from "next/link";
import { Breadcrumbs, FaqList } from "@/components/ui/primitives";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { hiringSteps, jobs } from "@/content/company";
import { getCatalogTree, getProducts } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/company-zoho.css";
import "@/app/company-pages.css";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Open roles at ToyoApps: Sales Executive, Software Developer Coordinator, Email Marketing Executive, Business Development Executive and Prompt Engineer.",
  path: routes.careers(),
});

const apply = (title: string) => routes.contactForm({ topic: "careers", role: title });

export default function CareersPage() {
  const tree = getCatalogTree();
  const productCount = getProducts().length;

  const work = [
    {
      title: "Many products, one team",
      text: `ToyoApps brings ${productCount} business products together in one catalog, so work here spans more than a single app, from contact capture and HR to compliance and market research.`,
    },
    {
      title: "Two sides of a marketplace",
      text: "ToyoApps serves businesses that discover and buy software, and software makers who publish and sell it. Most roles touch both sides.",
    },
    {
      title: "Organised by business function",
      text: `Products are grouped into ${tree.length} business areas (${tree.map((t) => t.category.name).join(", ")}), so the work is framed around the jobs businesses need done.`,
    },
  ];

  const faqs = [
    { question: "How do I apply for a role?", answer: "Use the Apply button on the role you're interested in. It opens the ToyoApps contact page with the role noted, so the team knows which position you're asking about." },
    { question: "Where can I find the full job description?", answer: "Each role on this page has a short overview. Full responsibilities and requirements are shared during the application process." },
    { question: "Can I apply if my role isn't listed?", answer: "The five roles on this page are the open positions. If you'd still like to introduce yourself, use the contact page and tell the team what kind of work you're looking for." },
    { question: "What does ToyoApps do?", answer: "ToyoApps is one home for business software: businesses discover and buy SaaS products organised by business function, and software makers publish and sell their own." },
  ];

  return (
    <>
      <section className="co-hero">
        <div className="co-wrap">
          <Breadcrumbs items={[{ name: "Company", href: routes.company() }, { name: "Careers", href: routes.careers() }]} />
          <p className="co-hero__label">Careers</p>
          <hr className="co-hero__rule" />
          <h1 className="co-hero__title">Help build one home for business software</h1>
          <p className="co-hero__lead co-hero__lead--max">
            ToyoApps is bringing SaaS products together in one marketplace. We&apos;re hiring for {jobs.length} roles across sales, marketing, business development and product.
          </p>
          <div className="co-btns co-btns--hero">
            <a className="co-btn co-btn--invert" href="#open-positions">See open positions</a>
          </div>
          <ImageSlot src="/images/company/careers-hero.webp" alt="Enthusiastic Indian technology team collaborating happily in a modern corporate lounge" width={1200} height={420} priority className="co-hero__art" />
        </div>
      </section>

      <section className="co-band">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Why work with ToyoApps</p>
            <h2 className="co-h2">Work on a whole ecosystem, not a single app</h2>
            <p>What the work at ToyoApps involves, described from what the company does today.</p>
          </div>
          <ul className="co-cols">
            {work.map((w, i) => (
              <li key={w.title} className="co-col">
                <span className="co-col__num">0{i + 1}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Culture, learning &amp; team</p>
            <h2 className="co-h2">The work you&apos;d be part of</h2>
          </div>
          <ul className="cp-grid">
            <li className="cp-card">
              <h3>Culture</h3>
              <p>The team&apos;s focus is making business software easier to find, compare and buy, starting from the job a business needs done, not the vendor.</p>
            </li>
            <li className="cp-card">
              <h3>Learning and growth</h3>
              <p>
                The catalog covers {productCount} products across {tree.length} business areas, so roles involve learning how different products work and who they are for.
              </p>
            </li>
            <li className="cp-card">
              <h3>Team environment</h3>
              <p>Sales, marketing, business development and product roles work alongside each other on the same catalog, serving both buyers and software makers.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="co-band" id="open-positions">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Open positions</p>
            <h2 className="co-h2">{jobs.length} open roles</h2>
            <p>Each overview describes what the role does at a multi-product SaaS company. Full responsibilities and requirements are shared during the application process.</p>
          </div>
          <ul className="cp-toc" aria-label="Jump to a role">
            {jobs.map((j) => (
              <li key={j.id}>
                <a href={`#${j.id}`}>{j.title}</a>
              </li>
            ))}
          </ul>
          <div className="cp-jobs">
            {jobs.map((j) => (
              <article key={j.id} id={j.id} className="cp-job" aria-labelledby={`${j.id}-title`}>
                <h3 id={`${j.id}-title`}>{j.title}</h3>
                <p className="cp-job__team">{j.team}</p>
                <h4>Role overview</h4>
                <p>{j.overview}</p>
                <h4>What the role involves</h4>
                <ul className="cp-list">
                  {j.focus.map((f) => (
                    <li key={f}><Labelled text={f} /></li>
                  ))}
                </ul>
                <p className="cp-note">General role description. Full responsibilities and requirements are shared during the application process.</p>
                <div className="co-btns">
                  <Link className="co-btn" href={apply(j.title)}>
                    Apply for {j.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="co-band co-band--tint">
        <div className="co-wrap">
          <div className="co-band__head">
            <p className="co-eyebrow">Hiring process</p>
            <h2 className="co-h2">How hiring works</h2>
          </div>
          <ol className="co-steps">
            {hiringSteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="co-band">
        <div className="co-narrow">
          <div className="co-band__head">
            <p className="co-eyebrow">FAQ</p>
            <h2 className="co-h2">Questions from candidates</h2>
          </div>
          <FaqList faqs={getSiteFaqs("careers", faqs)} />
        </div>
      </section>

      <section className="co-cta">
        <div className="co-wrap">
          <h2>Interested in joining ToyoApps?</h2>
          <p>Tell the team which role you&apos;re applying for and a little about yourself.</p>
          <div className="co-btns">
            <Link className="co-btn" href={routes.contactForm({ topic: "careers" })}>Apply via contact page</Link>
            <Link className="co-btn co-btn--ghost" href={routes.company()}>About ToyoApps</Link>
          </div>
        </div>
      </section>
    </>
  );
}
