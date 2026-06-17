import { ArrowUpRight } from "lucide-react";
import { experiences, type Position } from "@/lib/content";
import { Section } from "@/components/Section";
import { Logo } from "@/components/Logo";
import { HighlightsAccordion } from "@/components/HighlightsAccordion";

function PositionEntry({ position, multiple }: { position: Position; multiple: boolean }) {
  return (
    <li className={multiple ? "relative pl-6" : ""}>
      {multiple ? (
        <span className="absolute left-0 top-2 h-2 w-2 -translate-x-[4px] rounded-full bg-line-strong" />
      ) : null}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <h4 className="font-medium text-ink">{position.title}</h4>
        <span className="text-sm text-faint">
          {position.start} — {position.end}
        </span>
      </div>
      <p className="mt-2 leading-relaxed text-muted">{position.description}</p>
      <HighlightsAccordion highlights={position.highlights} />
    </li>
  );
}

export function Experience() {
  return (
    <Section id="experience" eyebrow="where I've worked" title="Experience">
      <ol className="divide-y divide-line">
        {experiences.map((experience) => {
          const multiple = experience.positions.length > 1;
          return (
            <li key={experience.company} className="flex flex-col gap-4 py-8 first:pt-0 last:pb-0 sm:flex-row sm:gap-6">
              <div className="flex items-center gap-4 sm:w-64 sm:shrink-0 sm:flex-col sm:items-start sm:gap-3">
                <Logo src={experience.logo} name={experience.company} variant="company" />
                <div className="min-w-0">
                  <a
                    href={experience.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1 font-display text-lg font-semibold tracking-tight text-ink hover:text-accent"
                  >
                    {experience.company}
                    <ArrowUpRight
                      size={15}
                      className="text-faint transition-colors group-hover:text-accent"
                    />
                  </a>
                  <p className="text-sm text-muted">{experience.location}</p>
                </div>
              </div>

              <ol className={`flex-1 ${multiple ? "space-y-6 border-l border-line pl-6" : ""}`}>
                {experience.positions.map((position) => (
                  <PositionEntry key={position.title} position={position} multiple={multiple} />
                ))}
              </ol>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
