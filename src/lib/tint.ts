import { categories } from "@/content/categories";
import type { Product } from "@/content/types";

/**
 * Category palette built from the original toyoapps.com brand colours
 * (blue #1E9CE5, green #7BC142, yellow #F5C842): soft tint for surfaces,
 * deeper shade for marks so white text on logos stays legible.
 */
const PALETTE = [
  { tint: "#eef7fd", ink: "#0f7bbe" }, // blue
  { tint: "#eef7e6", ink: "#4f8a22" }, // green
  { tint: "#fef8e6", ink: "#a87d0c" }, // yellow
  { tint: "#e6f3fb", ink: "#1e9ce5" }, // bright blue
  { tint: "#e9f5ee", ink: "#2f8a5c" }, // blue-green blend
  { tint: "#e8eef5", ink: "#1a3149" }, // navy
  { tint: "#f3f8e8", ink: "#5fa32a" }, // bright green
  { tint: "#fdf3dc", ink: "#c99a12" }, // deep yellow
];

export function categoryTint(slug: string) {
  const i = Math.max(0, categories.findIndex((c) => c.slug === slug));
  return PALETTE[i % PALETTE.length];
}

export const productAccent = (p: Product) => p.accent ?? categoryTint(p.category).ink;

export function tintStyle(slug: string): React.CSSProperties {
  const t = categoryTint(slug);
  return { ["--tint" as string]: t.tint, ["--tint-ink" as string]: t.ink };
}

/** Two-letter monogram when no logo asset exists. */
export const monogram = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
