import { ArrowUpRight } from "lucide-react";
import { brandIcons } from "@/components/icons/BrandIcons";
import { socialLinks } from "@/lib/content";

interface SocialLinksProps {
  variant?: "compact" | "detailed";
}

export function SocialLinks({ variant = "compact" }: SocialLinksProps) {
  if (variant === "detailed") {
    return (
      <ul className="divide-y divide-line">
        {socialLinks.map((link) => {
          const Icon = brandIcons[link.icon];
          return (
            <li key={link.platform}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-3 py-3.5"
              >
                {Icon ? <Icon className="h-5 w-5 text-ink" /> : null}
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
        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.platform}
              title={link.platform}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-accent"
            >
              {Icon ? <Icon className="h-[18px] w-[18px]" /> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
