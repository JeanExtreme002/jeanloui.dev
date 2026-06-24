import { Download } from "lucide-react";
import { profile } from "@/lib/content";
import { Section } from "@/components/Section";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ArrowDoodle } from "@/components/Doodles";
import { SocialLinks } from "@/components/SocialLinks";

export function Contact() {
  return (
    <Section id="contact" eyebrow="say hello" title="Let's build something together.">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="max-w-md text-md leading-relaxed text-muted">
            Got something in mind? Just send me an email.
          </p>
          <div className="mt-6 max-w-md">
            <CopyEmailButton email={profile.email} variant="inline" />
            <p className="mt-2 ml-6 flex items-center gap-2">
              <ArrowDoodle className="h-8 w-8 text-accent" />
              <span className="font-hand text-xl text-accent">fastest way to reach me</span>
            </p>
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
