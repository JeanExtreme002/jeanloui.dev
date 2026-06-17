import { ArrowUpRight } from "lucide-react";
import { volunteering } from "@/lib/content";
import { Section } from "@/components/Section";
import { Logo } from "@/components/Logo";

export function Volunteering() {
  if (volunteering.length === 0) return null;

  return (
    <Section id="volunteering" eyebrow="giving back" title="Volunteering">
      <ol className="divide-y divide-line">
        {volunteering.map((entry) => (
          <li
            key={`${entry.organization}-${entry.role}`}
            className="flex items-start gap-4 py-6 first:pt-0 last:pb-0"
          >
            <Logo src={entry.logo} name={entry.organization} variant="company" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {entry.role}
                </h3>
                <span className="text-sm text-faint">
                  {entry.start} — {entry.end}
                </span>
              </div>
              <a
                href={entry.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
              >
                {entry.organization}
                <ArrowUpRight size={14} className="text-faint group-hover:text-accent" />
              </a>
              <p className="mt-2 leading-relaxed text-muted">{entry.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
