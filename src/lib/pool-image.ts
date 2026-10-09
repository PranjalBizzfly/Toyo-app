/** HD stock photos (Unsplash licence) in public/images/pool, picked per page slug so neighbouring pages differ. */
const POOL = 8;
export function poolImage(slug: string): string {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `/images/pool/p${h % POOL}.webp`;
}
