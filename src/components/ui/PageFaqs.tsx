import type { Faq } from "@/content/types";
import { FaqList } from "@/components/ui/primitives";

/**
 * Standard page FAQ section for pages without their own FAQ block. Exactly the
 * questions passed (built by src/lib/faqs.ts); FaqList adds matching FAQPage
 * JSON-LD from the same items.
 */
export function PageFaqs({ faqs, title = "Frequently asked questions", id = "faq" }: { faqs: Faq[]; title?: string; id?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="page-faq" id={id} aria-labelledby={`${id}-title`}>
      <div className="container page-faq__inner">
        <div className="page-faq__head">
          <p className="eyebrow">FAQ</p>
          <h2 id={`${id}-title`} className="h2">
            {title}
          </h2>
        </div>
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}
