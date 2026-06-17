import { GraduationCap, MapPin, Terminal } from "lucide-react";
import { profile } from "@/lib/content";
import { Section } from "@/components/Section";

const facts = [
  { icon: MapPin, label: "Based in", value: profile.location },
  { icon: Terminal, label: "Focus", value: "Full-stack · Systems & APIs" },
  { icon: GraduationCap, label: "Degree", value: "B.Sc. Computer Science" },
];

export function About() {
  return (
    <Section id="about" eyebrow="a little about me" title="About">
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
        {profile.summary.map((paragraph, index) => (
          <p key={index} className={index === 0 ? "text-ink" : undefined}>
            {paragraph}
          </p>
        ))}
      </div>

      <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-3">
            <fact.icon size={20} className="text-accent" strokeWidth={1.75} />
            <div>
              <dt className="text-sm text-faint">{fact.label}</dt>
              <dd className="text-sm font-medium text-ink">{fact.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
