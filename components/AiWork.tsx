import { aiWork } from "@/lib/data";
import { Section } from "@/components/ui";

export default function AiWork() {
  return (
    <Section id="research" eyebrow="How I work with AI" heading={aiWork.heading}>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        {aiWork.intro}
      </p>

      <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-soft/50 p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {aiWork.study.title}
        </h3>
        <div className="mt-4 space-y-4 leading-relaxed">
          {aiWork.study.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-6 border-l-2 border-accent pl-4 text-lg leading-relaxed">
          {aiWork.study.takeaway}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {aiWork.study.links.map((link) => (
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
      </div>
    </Section>
  );
}
