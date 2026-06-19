"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Large calligraphic "ink trail" that bridges the Hero and About sections.
 * It begins with an ornamental curl at the top of the left margin, flows down
 * the margin and ends in a matching curl by the About "facts" row — symmetric
 * flourishes top and bottom. Its draw is delayed (see CSS) so it begins right
 * as the "Hello!" animation completes.
 *
 * Same fine-lined vibe as the signature: a single light path that draws itself
 * (stroke-dashoffset) when scrolled into view. Geometry is tuned for the fixed
 * content column, so it's shown only at xl+ (purely decorative).
 */
export function HeroTrail() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className="hero-trail-mount pointer-events-none absolute inset-0 -z-10 hidden text-accent/45 xl:block"
    >
      <svg
        ref={ref}
        width={130}
        height={1370}
        viewBox="0 0 130 1370"
        fill="none"
        stroke="currentColor"
        className={`hero-trail absolute top-0${drawn ? " is-drawn" : ""}`}
        style={{ left: "calc(50% - 448px - 128px)" }}
      >
        <path
          className="hero-trail-line"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M96 18 C88 22 90 32 98 32 C112 32 112 15 100 12 C86 8 80 27 80 52 C80 176 50 176 50 300 C50 420 96 420 96 540 C96 660 50 660 50 780 C50 900 96 900 96 1020 C96 1151 80 1151 80 1282 C80 1307 86 1326 100 1322 C112 1319 112 1302 98 1302 C90 1302 88 1312 96 1316"
        />
      </svg>
    </div>
  );
}
