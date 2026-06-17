import { ArrowUpRight } from "lucide-react";
import { education } from "@/lib/content";
import { Section } from "@/components/Section";
import { Logo } from "@/components/Logo";

export function Education() {
  return (
    <Section id="education" eyebrow="the foundations" title="Education">
      <ol className="divide-y divide-line">
        {education.map((entry) => (
          <li
            key={`${entry.institution}-${entry.degree}`}
            className="flex items-center gap-4 py-6 first:pt-0 last:pb-0"
          >
            <Logo src={entry.logo} name={entry.institution} variant="education" />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                {entry.degree}
              </h3>
              <a
                href={entry.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
              >
                {entry.institution}
                <ArrowUpRight size={14} className="text-faint group-hover:text-accent" />
              </a>
            </div>
            <span className="shrink-0 text-sm text-faint">
              {entry.start} — {entry.end}
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
