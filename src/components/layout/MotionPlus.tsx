"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SPOT = ".dx-card, .dx-guide, .dx-icard, .dx-prod, .zs-benefit, .fz-tile, .pz-vcard, .ez-tile, .ez-card, .product-card, .zs-usecase, .h-card";
const TILT = ".dx-guide, .dx-prod, .product-card, .pc__card, .ez-tile";
const MAGNET = ".btn--primary, .zs-btn--solid, .ez-btn--primary, .hh-btn--primary, .header-cta, .sfoot__pill";
const RIPPLE = ".btn, .zs-btn, .ez-btn, .hh-btn, .sfoot__pill, .dx-chip, .pc__btn, .header-cta";
const WORDS = "main :is(.zs-h2, .dx-head__title, .fz-h2, .ez-intro__title, .co-h2, .ez-heading__title)";
const DECODE = ".dx-kicker, .zs-kicker, .fz-kicker, .ez-kicker, .co-eyebrow";
const COUNT = ".dx-stats dd, .hh-strip__stat strong, .zs-stat strong, .z-stats strong";

/**
 * Second motion layer (see motion-plus.css): reading-progress bar, cursor
 * spotlight on cards and count-up stat numbers. Re-binds on every route change.
 */
export function MotionPlus() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // Cursor spotlight (fine pointers only)
    if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest<HTMLElement>(SPOT);
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.classList.add("mp-spot");
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      document.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => document.removeEventListener("pointermove", onMove));

      // 3D tilt on feature cards (max 5°)
      const onTilt = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest<HTMLElement>(TILT);
        document.querySelectorAll<HTMLElement>(".mp-tilt").forEach((c) => {
          if (c !== card) { c.classList.remove("mp-tilt"); c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); }
        });
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add("mp-tilt");
        card.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
      };
      document.addEventListener("pointermove", onTilt, { passive: true });
      cleanups.push(() => document.removeEventListener("pointermove", onTilt));

      // Magnetic buttons: drift up to 6px toward the cursor
      const onMagnet = (e: PointerEvent) => {
        document.querySelectorAll<HTMLElement>(MAGNET).forEach((btn) => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          const near = Math.abs(dx) < r.width / 2 + 40 && Math.abs(dy) < r.height / 2 + 30;
          btn.classList.add("mp-magnet");
          btn.style.setProperty("--tx", near ? `${(dx / r.width) * 12}px` : "0px");
          btn.style.setProperty("--ty", near ? `${(dy / r.height) * 8}px` : "0px");
        });
      };
      document.addEventListener("pointermove", onMagnet, { passive: true });
      cleanups.push(() => document.removeEventListener("pointermove", onMagnet));
    }

    // Click ripple on buttons (any pointer)
    if (!reduce) {
      const onDown = (e: PointerEvent) => {
        const btn = (e.target as Element | null)?.closest<HTMLElement>(RIPPLE);
        if (!btn) return;
        const r = btn.getBoundingClientRect(), size = Math.max(r.width, r.height);
        const dot = document.createElement("span");
        dot.className = "mp-ripple";
        Object.assign(dot.style, { width: `${size}px`, height: `${size}px`, left: `${e.clientX - r.left - size / 2}px`, top: `${e.clientY - r.top - size / 2}px` });
        if (getComputedStyle(btn).position === "static") btn.style.position = "relative";
        btn.style.overflow = "hidden";
        btn.appendChild(dot);
        dot.addEventListener("animationend", () => dot.remove());
      };
      document.addEventListener("pointerdown", onDown, { passive: true });
      cleanups.push(() => document.removeEventListener("pointerdown", onDown));
    }

    // Count-up: "54", "16+", "99.9%", "24/7" style values; non-numeric text is left alone
    if (!reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue;
            const el = en.target as HTMLElement;
            io.unobserve(el);
            const m = el.textContent?.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/s);
            if (!m || el.textContent!.includes("/")) continue;
            const [, pre, num, post] = m;
            const end = parseFloat(num), dec = (num.split(".")[1] ?? "").length, t0 = performance.now();
            el.dataset.countup = "";
            const step = (t: number) => {
              const k = Math.min(1, (t - t0) / 1200), eased = 1 - Math.pow(1 - k, 3);
              el.textContent = `${pre}${(end * eased).toFixed(dec)}${post}`;
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        },
        { threshold: 0.6 },
      );
      document.querySelectorAll(COUNT).forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Back-to-top button: scroll progress as a ring
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.querySelectorAll<HTMLElement>(".scroll-toggle").forEach((b) => b.style.setProperty("--p", String(max > 0 ? Math.min(1, scrollY / max) : 0)));
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => removeEventListener("scroll", onScroll));

    if (!reduce) {
      // Word-by-word rise on big section headings (text-only headings, once each)
      const heads = [...document.querySelectorAll<HTMLElement>(WORDS)].filter((h) => !h.dataset.mpWords && h.children.length === 0 && (h.textContent ?? "").trim().split(/\s+/).length <= 12);
      const wio = new IntersectionObserver(
        (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); wio.unobserve(en.target); } }),
        { threshold: 0.4 },
      );
      for (const h of heads) {
        const words = (h.textContent ?? "").trim().split(/\s+/);
        h.dataset.mpWords = "1";
        h.setAttribute("aria-label", words.join(" "));
        h.innerHTML = words.map((w, i) => `<span class="mp-w" style="--i:${i}" aria-hidden="true">${w.replace(/</g, "&lt;")}</span>`).join(" ");
        h.classList.add("mp-words");
        wio.observe(h);
      }
      cleanups.push(() => wio.disconnect());

      // Text decode on hover for small uppercase labels
      const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const onEnter = (e: Event) => {
        const el = (e.target as Element | null)?.closest<HTMLElement>(DECODE);
        // Once per hover: swapping the text re-fires pointerover, so wait for pointerleave
        if (!el || el.dataset.mpBusy || el.dataset.mpHover || el.children.length) return;
        el.dataset.mpHover = "1";
        el.addEventListener("pointerleave", () => delete el.dataset.mpHover, { once: true });
        const text = el.dataset.mpText ?? (el.dataset.mpText = el.textContent ?? "");
        el.dataset.mpBusy = "1";
        // Time-based so it always finishes in ~500ms, even when frames are throttled
        const t0 = performance.now(), DUR = 500;
        const done = () => { el.textContent = text; delete el.dataset.mpBusy; };
        const tick = (t: number) => {
          const shown = Math.floor(((t - t0) / DUR) * text.length);
          if (shown >= text.length) return done();
          el.textContent = [...text].map((c, i) => (c === " " || i < shown ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join("");
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        setTimeout(() => el.dataset.mpBusy && done(), DUR + 150);
      };
      document.addEventListener("pointerover", onEnter, { passive: true });
      cleanups.push(() => document.removeEventListener("pointerover", onEnter));
    }

    return () => cleanups.forEach((f) => f());
  }, [pathname]);

  return (
    <>
      <div className="mp-progress" aria-hidden="true" />
    </>
  );
}
