import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto w-full max-w-4xl px-6">
        <header className="mb-12">
          {eyebrow ? (
            <p className="-rotate-1 font-hand text-2xl leading-none text-accent">{eyebrow}</p>
          ) : null}
          <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
