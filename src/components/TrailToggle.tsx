"use client";

import { useEffect, useState } from "react";
import { Signature } from "lucide-react";

/**
 * Small control to enable/disable the decorative HeroTrail flourish.
 * Sets `data-trail="on|off"` on <html> (CSS hides the trail when off) and
 * persists the choice in localStorage. Only shown at xl+, where the trail
 * itself renders. Defaults to on.
 */
export function TrailToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const enabled = localStorage.getItem("hero-trail") !== "off";
    setOn(enabled);
    document.documentElement.dataset.trail = enabled ? "on" : "off";
  }, []);

  function toggle() {
    setOn((prev) => {
      const next = !prev;
      document.documentElement.dataset.trail = next ? "on" : "off";
      try {
        localStorage.setItem("hero-trail", next ? "on" : "off");
      } catch {
        /* ignore unavailable storage */
      }
      return next;
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Hide the decorative flourish" : "Show the decorative flourish"}
      title={on ? "Hide flourish" : "Show flourish"}
      className={`hidden h-9 w-9 items-center justify-center rounded-lg border transition-colors xl:inline-flex ${
        on
          ? "border-accent/30 bg-accent-soft text-accent"
          : "border-line text-faint hover:text-ink"
      }`}
    >
      <Signature size={17} strokeWidth={1.75} aria-hidden />
    </button>
  );
}
