import Image from "next/image";
import { Download } from "lucide-react";
import { profile } from "@/lib/content";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SocialLinks } from "@/components/SocialLinks";
import { ArrowDoodle, Sparkle } from "@/components/Doodles";

export function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-4xl px-6 pb-24 pt-16 sm:pt-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            <span className="font-medium text-ink">{profile.title}.</span> {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmailButton email={profile.email} />
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-subtle"
            >
              <Download size={18} />
              Download résumé
            </a>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <ArrowDoodle className="h-8 w-8 text-accent" />
            <span className="font-hand text-xl text-accent">fastest way to reach me</span>
          </div>

          <div className="mt-9">
            <SocialLinks variant="compact" />
          </div>
        </div>

        <div className="order-first min-w-0 md:order-last">
          <div className="mx-auto w-full max-w-[18rem] md:max-w-none">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.fullName}`}
                width={800}
                height={800}
                priority
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-3 flex -rotate-2 items-center justify-center gap-1.5 font-hand text-3xl text-accent">
              <Sparkle className="h-5 w-5" />
              hello, nice to meet you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
