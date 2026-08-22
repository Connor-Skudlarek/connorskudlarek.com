import { hero, site } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-edge">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-accent-soft blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-3 py-1 text-xs font-medium text-muted">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          {site.location}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          {hero.greeting}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed sm:text-2xl">
          {hero.lead}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {hero.body}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="#work"
            className="rounded-full border border-edge bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            See the work
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-edge bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-edge bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
