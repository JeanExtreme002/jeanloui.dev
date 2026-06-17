import { ArrowUpRight } from "lucide-react";
import { profile, projects, socialLinks } from "@/lib/content";
import { resolveIcon } from "@/lib/icons";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { Section } from "@/components/Section";

const githubProfileUrl =
  socialLinks.find((link) => link.icon === "github")?.url ?? "https://github.com";

export function Projects() {
  const visibleProjects = projects.slice(0, profile.projectsLimit);
  const hasMore = projects.length > profile.projectsLimit;

  return (
    <Section id="projects" eyebrow="things I've shipped" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {visibleProjects.map((project) => {
          const Icon = resolveIcon(project.icon);
          const MetricIcon = project.metric ? resolveIcon(project.metric.icon) : null;
          return (
            <article
              key={project.name}
              className="flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-line-strong"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-subtle text-ink">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="flex-1 font-display text-lg font-semibold tracking-tight text-ink">
                  {project.name}
                </h3>
                {project.metric && MetricIcon ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-sm text-muted"
                    title={project.metric.label}
                  >
                    <MetricIcon size={15} className="text-accent" />
                    {project.metric.value}
                  </span>
                ) : null}
              </div>

              <p className="mt-4 flex-1 leading-relaxed text-muted">{project.description}</p>

              <p className="mt-4 text-sm text-faint">{project.tech.join(" · ")}</p>

              <div className="mt-5 flex items-center gap-5">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
                >
                  <GitHubIcon className="h-4 w-4" />
                  View on GitHub
                  <ArrowUpRight size={15} className="text-faint group-hover:text-accent" />
                </a>
                {project.secondary ? (
                  <a
                    href={project.secondary.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
                  >
                    {project.secondary.label}
                    <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-subtle"
          >
            <GitHubIcon className="h-4 w-4" />
            See more projects on GitHub
            <ArrowUpRight size={15} className="text-faint group-hover:text-accent" />
          </a>
        </div>
      ) : null}
    </Section>
  );
}
