import { quotes } from "@/lib/content";
import { Sparkle } from "@/components/Doodles";

interface QuoteBandProps {
  index: number;
}

export function QuoteBand({ index }: QuoteBandProps) {
  const quote = quotes[index % quotes.length];
  if (!quote) return null;

  return (
    <section className="bg-subtle">
      <figure className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
        <Sparkle className="mx-auto h-6 w-6 text-accent" />
        <blockquote className="mt-5 font-hand text-4xl leading-tight text-ink sm:text-5xl">
          “{quote.text}”
        </blockquote>
        <figcaption className="mt-4 text-sm text-muted">— {quote.author}</figcaption>
      </figure>
    </section>
  );
}
