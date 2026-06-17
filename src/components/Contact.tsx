import { Download } from "lucide-react";
import { profile } from "@/lib/content";
import { Section } from "@/components/Section";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SocialLinks } from "@/components/SocialLinks";

export function Contact() {
  return (
    <Section id="contact" eyebrow="say hello" title="Let's build something together.">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="max-w-md text-lg leading-relaxed text-muted">
            The fastest way to reach me is email — copy it below and write whenever you like. No
            forms, no friction.
          </p>
          <div className="mt-6 max-w-md">
            <CopyEmailButton email={profile.email} variant="inline" />
          </div>
          <a
            href={profile.resumeUrl}
            download
            className="mt-12 ml-1 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
          >
            <Download size={16} className="text-accent" />
            Download my résumé (PDF)
          </a>
        </div>

        <div className="md:pl-8">
          <p className="mb-1 text-sm text-faint">Find me online</p>
          <SocialLinks variant="detailed" />
        </div>
      </div>
    </Section>
  );
}
