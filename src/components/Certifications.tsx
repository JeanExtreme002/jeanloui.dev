import { certifications, profile } from "@/lib/content";
import { Section } from "@/components/Section";
import { CertificationsList } from "@/components/CertificationsList";

export function Certifications() {
  return (
    <Section id="certifications" eyebrow="always learning" title="Certifications">
      <CertificationsList items={certifications} perPage={profile.certificationsPerPage} />
    </Section>
  );
}
