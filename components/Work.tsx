import { projects } from "@/lib/data";
import { ArrowLink, Card, Section, Tag } from "@/components/ui";

export default function Work() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <Section id="work" eyebrow="Selected work" heading="Things I've built">
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Each of these is here because it shows something different: leading a
        team, applying domain knowledge, and getting a model to run where the
        data never leaves the machine.
      </p>

      <div className="mt-10 space-y-6">
        {featured.map((project) => (
          <Card key={project.slug}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {project.demonstrates}
            </p>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm font-medium text-accent">{project.role}</p>
            </div>
            <p className="mt-1 text-lg text-muted">
              {project.subtitle}
            </p>
            <p className="mt-4 leading-relaxed">{project.blurb}</p>

            {project.metrics ? (
              <dl className="mt-6 grid gap-4 rounded-xl bg-surface-sunk p-4 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-xs uppercase tracking-[0.12em] text-muted">
                      {metric.label}
                    </dt>
                    <dd className="mt-0.5 font-display text-lg font-semibold">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.caseStudy ? (
                <ArrowLink href={project.caseStudy}>Read the case study</ArrowLink>
              ) : null}
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted underline decoration-edge underline-offset-4 transition-colors hover:text-accent"
                >
                  {link.label}
                  {link.note ? (
                    <span className="text-muted"> ({link.note})</span>
                  ) : null}
                </a>
              ))}
            </div>
          </Card>
        ))}

        {rest.map((project) => (
          <Card key={project.slug} className="bg-surface-sunk">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted">{project.role}</p>
            </div>
            <p className="mt-1 text-muted">{project.subtitle}</p>
            <p className="mt-3 leading-relaxed">{project.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted underline decoration-edge underline-offset-4 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
