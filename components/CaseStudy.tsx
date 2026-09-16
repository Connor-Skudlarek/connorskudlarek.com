import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/data";
import { Tag } from "@/components/ui";

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header>
      <Link
        href="/#work"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← All work
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-3 text-xl text-muted">{project.subtitle}</p>
      <p className="mt-5 text-sm font-medium text-accent">{project.role}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent underline decoration-edge underline-offset-4 transition-colors hover:text-foreground"
          >
            {link.label}
            {link.note ? (
              <span className="font-normal text-muted"> ({link.note})</span>
            ) : null}
          </a>
        ))}
      </div>

      {project.metrics ? (
        <dl className="mt-8 grid gap-4 rounded-2xl border border-edge bg-surface-sunk p-5 sm:grid-cols-3">
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
    </header>
  );
}

export function Part({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export function CaseStudyFooter() {
  return (
    <footer className="mt-16 border-t border-edge pt-8">
      <Link
        href="/#work"
        className="font-medium text-accent transition-colors hover:text-foreground"
      >
        ← Back to all work
      </Link>
    </footer>
  );
}
