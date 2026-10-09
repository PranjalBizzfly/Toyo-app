/**
 * Per-product visual story. Each ToyoApps product takes its design approach
 * from a DIFFERENT Zoho product site (layout, rhythm, signature interaction),
 * rebuilt with ToyoApps colours, original artwork and the product's own content.
 * See docs/TOYOAPPS_VISUAL_AND_MOTION_AUDIT.md §5 for the mapping rationale.
 *
 * look      — palette + band colours (product-themes.css)
 * hero      — hero composition (unique per product)
 * art       — original hero artwork (HeroArt.tsx), drawn from the product's features
 * benefits  — "why choose" section style
 * spot      — feature spotlight layout
 * signature — the distinctive section
 * edge      — how dark bands meet light ones
 * cta       — closing call-to-action style
 */
export type StoryLook =
  | "midnight" | "forest" | "daylight" | "cream" | "ocean" | "grid" | "aurora" | "sunrise"
  | "void" | "ink" | "mint" | "paper" | "ember" | "pastel" | "snow" | "sky";
export type StoryArt = "people" | "gallery" | "flow" | "card" | "chart" | "map" | "mail" | "calendar" | "chat" | "phone" | "desktop";
export type StoryHero =
  | "voice" | "glass" | "starfield" | "touch" | "paper" | "path" | "serif" | "landscape"
  | "agent" | "lime" | "radial" | "marquee" | "pastel" | "flow" | "frame" | "prompt" | "practice";

export interface ProductStory {
  /** Zoho product site the design approach is taken from. */
  ref: string;
  look: StoryLook;
  hero: StoryHero;
  art: StoryArt;
  benefits: "glass" | "photo" | "black" | "mint" | "grid" | "columns" | "warm" | "pastel";
  spot: "split" | "tabbar" | "stack" | "accordion" | "code" | "phone";
  signature: "tabs" | "timeline" | "hub" | "orbit" | "problems" | "dotgrid";
  edge: "round" | "angle" | "flat";
  cta: "glow" | "band" | "landscape" | "panel" | "spin";
  serif?: boolean;
  /** Full page recipe that replaces the shared section order. */
  recipe?: "voice";
}

const STORIES: Record<string, ProductStory> = {
  hrmagix: { ref: "Zoho Voice", look: "daylight", hero: "voice", art: "people", benefits: "photo", spot: "split", signature: "tabs", edge: "flat", cta: "band", recipe: "voice" },
  sibu: { ref: "Zoho Zia Chat", look: "midnight", hero: "glass", art: "gallery", benefits: "glass", spot: "tabbar", signature: "timeline", edge: "angle", cta: "glow" },
  taskmagic: { ref: "Zoho CPaaS", look: "void", hero: "starfield", art: "flow", benefits: "black", spot: "code", signature: "timeline", edge: "flat", cta: "glow" },
  cardizo: { ref: "Zoho TouchPoint", look: "ink", hero: "touch", art: "card", benefits: "glass", spot: "phone", signature: "hub", edge: "round", cta: "band" },
  sizoru: { ref: "Zoho Analytics", look: "paper", hero: "paper", art: "chart", benefits: "warm", spot: "stack", signature: "hub", edge: "flat", cta: "panel" },
  fleetras: { ref: "Zoho Vertical Studio", look: "mint", hero: "path", art: "map", benefits: "mint", spot: "split", signature: "tabs", edge: "round", cta: "band" },
  sigchanger: { ref: "Zoho Fortify", look: "cream", hero: "serif", art: "mail", benefits: "grid", spot: "accordion", signature: "hub", edge: "flat", cta: "panel", serif: true },
  trackysuite: { ref: "Zoho Practice", look: "mint", hero: "practice", art: "calendar", benefits: "warm", spot: "split", signature: "problems", edge: "flat", cta: "panel" },
  meetingmind: { ref: "Zoho Zia Agents", look: "aurora", hero: "agent", art: "chat", benefits: "glass", spot: "split", signature: "timeline", edge: "round", cta: "glow" },
  fantom: { ref: "Zoho Linkthread", look: "forest", hero: "lime", art: "phone", benefits: "black", spot: "split", signature: "hub", edge: "flat", cta: "band" },
  oda7: { ref: "Zoho Creator Plus", look: "ocean", hero: "radial", art: "phone", benefits: "glass", spot: "tabbar", signature: "tabs", edge: "flat", cta: "glow" },
  benj: { ref: "Zoho Projects Plus", look: "ember", hero: "marquee", art: "chart", benefits: "warm", spot: "split", signature: "timeline", edge: "round", cta: "panel" },
  zapbuzzer: { ref: "Zoho CRM", look: "pastel", hero: "pastel", art: "flow", benefits: "pastel", spot: "split", signature: "orbit", edge: "round", cta: "spin" },
  zorfly: { ref: "Zoho Flow", look: "snow", hero: "flow", art: "chat", benefits: "columns", spot: "split", signature: "dotgrid", edge: "round", cta: "panel" },
  zuzu: { ref: "Zoho CommandCenter", look: "grid", hero: "frame", art: "desktop", benefits: "grid", spot: "split", signature: "tabs", edge: "flat", cta: "band" },
  tracksuit: { ref: "Zoho Creator", look: "sky", hero: "prompt", art: "chart", benefits: "columns", spot: "accordion", signature: "dotgrid", edge: "flat", cta: "glow" },
};

const FALLBACK: ProductStory = { ref: "—", look: "daylight", hero: "voice", art: "desktop", benefits: "glass", spot: "split", signature: "timeline", edge: "round", cta: "glow" };

export function getProductStory(slug: string): ProductStory {
  return STORIES[slug] ?? FALLBACK;
}

/**
 * How each shared content block is presented — chosen per product so the same
 * information pattern never repeats as a set. "what" × "how" use a mixed radix
 * over the product index, so every product's combination is unique; the other
 * blocks rotate at different strides so neighbours differ too.
 */
export interface StoryPatterns {
  audience: number; // 0 ribbon · 1 large word list · 2 chip rail
  what: number; // 0 two-column · 1 centred statement · 2 pull-quote + columns · 3 ruled numbered paragraphs
  how: number; // 0 cards · 1 connected stepper · 2 big-numeral list · 3 zigzag
  every: number; // 0 card grid · 1 index rows · 2 bento · 3 compact icon list
  uses: number; // 0 brand band cards · 1 alternating rows · 2 dark masonry · 3 numbered panels · 4 scroll rail
  tour: number; // 0 gradient frame · 1 tilted browser · 2 full-bleed dark
  fits: number; // 0 columns · 1 pill cloud · 2 inline directory
  plans: number; // 0 cards · 1 table rows · 2 single strip
  faq: number; // 0 two-column · 1 centred · 2 card grid
}

export function getStoryPatterns(slug: string): StoryPatterns {
  const i = Math.max(0, Object.keys(STORIES).indexOf(slug));
  return {
    audience: i % 3,
    what: i % 4,
    how: Math.floor(i / 4) % 4,
    every: (i * 3 + 1) % 4,
    uses: (i * 2 + Math.floor(i / 5)) % 5,
    tour: (i + 1) % 3,
    fits: (i * 2) % 3,
    plans: (i + 2) % 3,
    faq: Math.floor(i / 2) % 3,
  };
}

/** Looks whose hero is dark (light text). */
export const DARK_LOOKS: StoryLook[] = ["midnight", "forest", "ocean", "aurora", "void", "ink"];
