import { Medal, Trophy } from "lucide-react";
import { achievements } from "@/lib/content";
import { Section } from "@/components/Section";
import { AccordionItem } from "@/components/AccordionItem";

export function Awards() {
  if (achievements.length === 0) return null;

  return (
    <Section id="awards" eyebrow="a few highlights" title="Awards">
      <div className="divide-y divide-line border-y border-line">
        {achievements.map((achievement, index) => {
          const Icon = achievement.category === "Hackathon" ? Trophy : Medal;
          return (
            <AccordionItem
              key={`${achievement.title}-${achievement.date}`}
              defaultOpen={index === 0}
              header={
                <span className="flex items-center gap-4">
                  <Icon size={20} className="shrink-0 text-accent" strokeWidth={1.75} />
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">{achievement.title}</span>
                    <span className="mt-0.5 block text-sm text-faint">
                      {achievement.rank} · {achievement.date}
                    </span>
                  </span>
                </span>
              }
            >
              {achievement.description}
            </AccordionItem>
          );
        })}
      </div>
    </Section>
  );
}
