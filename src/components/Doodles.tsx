import type { SVGProps } from "react";

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 14" preserveAspectRatio="none" {...common} strokeWidth={3.5} {...props}>
      <path d="M3 9C28 3 44 11 70 7s44-9 72-4 50 8 72 2" />
    </svg>
  );
}

export function Underline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 22" preserveAspectRatio="none" {...common} strokeWidth={4} {...props}>
      <path d="M5 13c40-7 92-9 142-7 28 1 58 3 88 9" />
      <path d="M22 19c44-5 96-7 150-5" opacity="0.55" />
    </svg>
  );
}

export function ArrowDoodle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 72 64" {...common} strokeWidth={3} {...props}>
      <path d="M58 54C36 52 16 46 14 10" />
      <path d="M14 10l12 9" />
      <path d="M14 10l-7 12" />
    </svg>
  );
}

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 1.5c.9 5.6 3.4 8.1 9 9-5.6.9-8.1 3.4-9 9-.9-5.6-3.4-8.1-9-9 5.6-.9 8.1-3.4 9-9Z" />
    </svg>
  );
}
