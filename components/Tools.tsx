import Link from "next/link";
import { tools } from "@/lib/data";
import { Card, Section } from "@/components/ui";

export default function Tools() {
  return (
    <Section id="tools" eyebrow="Smaller things" heading="Tools and side quests">
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Small things I built because I wanted them to exist.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {tool.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {tool.blurb}
            </p>
            {tool.href ? (
              tool.internal ? (
                <Link
                  href={tool.href}
                  className="mt-5 inline-flex w-fit rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
                >
                  {tool.cta ?? "Open"}
                </Link>
              ) : (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit rounded-full border border-edge px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {tool.cta ?? "Open"}
                </a>
              )
            ) : null}
          </Card>
        ))}
      </div>
    </Section>
  );
}
