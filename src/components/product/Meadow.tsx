import { useId } from "react";

/**
 * Painted-style landscape (original SVG): soft sky, layered clouds, distant
 * mountains, rolling hills, grass strokes and a foreground of flowers.
 * Deterministic (no randomness) so server and client render identically.
 * Colours come from CSS variables so light/dark and night variants work.
 */
export function Meadow({ variant = "day", flowers = true, className = "" }: { variant?: "day" | "night"; flowers?: boolean; className?: string }) {
  const id = useId().replace(/:/g, "");
  const r = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
  const blooms = Array.from({ length: 70 }, (_, i) => {
    const x = r(i + 1) * 1440;
    const y = 470 + r(i + 101) * 130;
    const s = 4 + (y - 470) / 14 + r(i + 7) * 4;
    return { x, y, s, c: i % 5 };
  }).sort((a, b) => a.y - b.y);
  const blades = Array.from({ length: 140 }, (_, i) => ({ x: r(i + 300) * 1440, y: 430 + r(i + 500) * 170, h: 8 + r(i + 900) * 22 }));

  return (
    <svg className={`meadow meadow--${variant} ${className}`} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--md-sky1)" />
          <stop offset=".65" stopColor="var(--md-sky2)" />
        </linearGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--md-hill3a)" />
          <stop offset="1" stopColor="var(--md-hill3b)" />
        </linearGradient>
        <filter id={`${id}b`}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="1440" height="600" fill={`url(#${id}s)`} />
      <g filter={`url(#${id}b)`} fill="var(--md-cloud)" opacity=".85">
        <ellipse cx="220" cy="120" rx="160" ry="38" />
        <ellipse cx="320" cy="100" rx="110" ry="40" />
        <ellipse cx="1080" cy="150" rx="190" ry="42" />
        <ellipse cx="1220" cy="120" rx="120" ry="36" />
        <ellipse cx="700" cy="70" rx="140" ry="26" />
      </g>
      <path d="M0 330 L120 270 L210 300 L330 220 L450 290 L560 250 L700 300 L820 240 L960 285 L1080 230 L1220 290 L1340 255 L1440 280 V420 H0Z" fill="var(--md-mtn)" />
      <path d="M0 370 C 200 330, 380 360, 560 340 S 940 310, 1140 345 1360 335, 1440 345 V600 H0Z" fill="var(--md-hill1)" />
      <path d="M0 420 C 240 390, 480 420, 720 400 S 1160 380, 1440 410 V600 H0Z" fill="var(--md-hill2)" />
      <path d="M0 470 C 300 440, 620 470, 900 455 S 1300 450, 1440 465 V600 H0Z" fill={`url(#${id}h)`} />
      <g stroke="var(--md-grass)" strokeWidth="2" strokeLinecap="round" opacity=".7">
        {blades.map((b, i) => (
          <path key={i} d={`M${b.x} ${b.y} q ${i % 2 ? 3 : -3} ${-b.h / 2} ${i % 2 ? 1 : -1} ${-b.h}`} fill="none" />
        ))}
      </g>
      {flowers &&
        blooms.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y})`}>
            <path d={`M0 0 v ${b.s * 2.2}`} stroke="var(--md-stem)" strokeWidth={Math.max(1, b.s / 6)} />
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy={-b.s * 0.55} rx={b.s * 0.38} ry={b.s * 0.62} transform={`rotate(${a})`} fill={`var(--md-f${b.c})`} />
            ))}
            <circle r={b.s * 0.3} fill="var(--md-core)" />
          </g>
        ))}
    </svg>
  );
}
