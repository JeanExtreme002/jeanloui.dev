import { ArrowUpRight } from "lucide-react";
import { brandIcons } from "@/components/icons/BrandIcons";
import { socialLinks } from "@/lib/content";

interface SocialLinksProps {
  variant?: "compact" | "detailed";
}

// soft, blurred glimmers scattered around the GitHub icon — varied sizes/positions
// so they read as natural sparkle rather than explicit dots
const sparkles = [
  // scattered asymmetrically around the GitHub logo (avoid a square)
  { pos: "left-2 top-1.5", size: "h-1.5 w-1.5", delay: "0s" },
  { pos: "right-0.5 top-3.5", size: "h-2.5 w-2.5", delay: "0.6s" },
  { pos: "left-3.5 bottom-1", size: "h-2 w-2", delay: "1.3s" },
];

export function SocialLinks({ variant = "compact" }: SocialLinksProps) {
  if (variant === "detailed") {
    return (
      <ul className="divide-y divide-line">
        {socialLinks.map((link) => {
          const Icon = brandIcons[link.icon];
          const isGithub = link.icon === "github";
          return (
            <li key={link.platform}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 py-3.5"
              >
                {Icon ? (
                  <Icon className={`h-5 w-5 text-ink ${isGithub ? "github-hop" : ""}`} />
                ) : null}
                <span className="text-ink group-hover:text-accent">{link.platform}</span>
                <span className="text-sm text-faint">{link.handle}</span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-faint transition-colors group-hover:text-accent"
                />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {socialLinks.map((link) => {
        const Icon = brandIcons[link.icon];
        const isGithub = link.icon === "github";
        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.platform}
              title={link.platform}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-accent"
            >
              {isGithub
                ? sparkles.map((s, i) => (
                    <span
                      key={i}
                      aria-hidden
                      className={`icon-sparkle pointer-events-none absolute bg-accent ${s.size} ${s.pos}`}
                      style={{ animationDelay: s.delay }}
                    />
                  ))
                : null}
              {Icon ? (
                <Icon
                  className={`relative h-[18px] w-[18px] ${isGithub ? "github-hop" : ""}`}
                />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
