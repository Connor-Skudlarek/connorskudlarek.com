import { about, experience } from "@/lib/data";
import { Section } from "@/components/ui";

export default function About() {
  return (
    <Section id="about" eyebrow="About" heading={about.heading}>
      <div className="mt-8 grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <ol className="relative space-y-8 border-l border-edge pl-6">
          {experience.map((item) => (
            <li key={item.org} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {item.org}
                  </a>
                ) : (
                  item.org
                )}
              </h3>
              <p className="text-sm font-medium">{item.role}</p>
              {item.location ? (
                <p className="text-sm text-muted">{item.location}</p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
