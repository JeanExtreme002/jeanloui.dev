"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface HighlightsAccordionProps {
  highlights: string[];
}

function HighlightsList({ highlights }: HighlightsAccordionProps) {
  return (
    <ul className="space-y-2">
      {highlights.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-faint" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function HighlightsAccordion({ highlights }: HighlightsAccordionProps) {
  const [open, setOpen] = useState(false);

  if (highlights.length === 0) return null;

  if (highlights.length === 1) {
    return (
      <div className="mt-3">
        <HighlightsList highlights={highlights} />
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div
        className={`relative overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? "max-h-[80rem]" : "max-h-[3.5rem]"
        }`}
      >
        <HighlightsList highlights={highlights} />
        {!open ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-paper" />
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
      >
        {open ? "Show less" : "Show more"}
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
