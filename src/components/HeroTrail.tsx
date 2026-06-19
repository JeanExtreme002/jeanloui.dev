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
      className="pointer-events-none absolute inset-0 -z-10 hidden text-accent/45 xl:block"
    >
      <svg
        ref={ref}
        width={130}
        height={1430}
        viewBox="0 0 130 1430"
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
          d="M96 18 C88 22 90 32 98 32 C112 32 112 15 100 12 C86 8 80 27 80 52 C80 101 83 101 83 150 C83 235 58 235 58 320 C58 400 84 400 84 480 C84 560 63 560 63 640 C63 720 81 720 81 800 C81 880 63 880 63 960 C63 1040 81 1040 81 1120 C81 1178 66 1178 66 1235 C66 1293 80 1293 80 1350 C80 1375 86 1394 100 1390 C112 1387 112 1370 98 1370 C90 1370 88 1380 96 1384"
        />
      </svg>
    </div>
  );
}
