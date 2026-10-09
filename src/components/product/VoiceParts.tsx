import Link from "next/link";
import type { Product } from "@/content/types";
import { getCategory } from "@/lib/catalog";
import { platformLabels } from "@/lib/product-cta";
import { routes } from "@/lib/routes";
import { ProductLogo } from "@/components/product/cards";
import { Breadcrumbs } from "@/components/ui/primitives";

/**
 * Hero after Zoho Voice: very bold headline left; right, two people photos set
 * into a yellow circle and a blue arch with a voice-style waveform; light
 * peach page wash. Photos are licensed stock of Indian office professionals.
 */
export function VoiceHero({ product, cta, photos }: { product: Product; cta: { label: string; href: string }; photos: [string, string] }) {
  const category = getCategory(product.category);
  const host = new URL(product.websiteUrl).hostname.replace(/^www\./, "");
  return (
    <header className="vh" data-no-reveal>
      <div className="container vh__grid">
        <div className="vh__copy">
          <Breadcrumbs
            items={[
              { name: "Products", href: routes.products() },
              ...(category ? [{ name: category.name, href: routes.category(category.slug) }] : []),
              { name: product.name, href: routes.product(product.slug) },
            ]}
          />
          <p className="vh__brand">
            <ProductLogo product={product} /> {product.name}
          </p>
          <h1 className="vh__title">{product.tagline ?? product.primaryUseCase}</h1>
          <p className="vh__lead">{product.shortDescription}</p>
          <div className="vh__box">
            <a href={cta.href} rel="noopener" className="vh__btn">
              {cta.label}
            </a>
            {product.pricing && (
              <Link href={routes.productSection(product.slug, "pricing")} className="vh__btn vh__btn--line">
                Pricing
              </Link>
            )}
            {product.pricing?.trial && <p className="vh__trial">{product.pricing.trial}</p>}
          </div>
          <ul className="vh__chips" aria-label="Product details">
            {(product.platforms ?? []).map((p) => (
              <li key={p}>{platformLabels[p] ?? p}</li>
            ))}
            {product.market && <li>{product.market}</li>}
            <li>
              <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer">
                {host} ↗
              </a>
            </li>
          </ul>
        </div>
        <div className="vh__art" aria-hidden="true">
          <span className="vh__arch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[1]} alt="" />
          </span>
          <span className="vh__circle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[0]} alt="" />
          </span>
          <span className="vh__dots" />
          <svg className="vh__wave" viewBox="0 0 220 40">
            {Array.from({ length: 44 }, (_, i) => {
              const h = 4 + ((i * 37) % 30);
              return <rect key={i} x={i * 5} y={20 - h / 2} width="1.6" height={h} rx=".8" />;
            })}
          </svg>
        </div>
      </div>
    </header>
  );
}

export interface PastelCard {
  title: string;
  text: string;
  image: string;
  href: string;
  label: string;
}

/** Three pastel cards (lavender / cream / sky) with a photo on top and an outline pill button. */
export function PastelCards({ cards }: { cards: PastelCard[] }) {
  return (
    <div className="pc">
      {cards.map((c, i) => (
        <article key={c.title} className={`pc__card pc__card--${i % 3}`} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}>
          <span className="pc__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt="" loading="lazy" />
          </span>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <Link href={c.href} className="pc__btn">
            {c.label} <span aria-hidden>⟶</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
