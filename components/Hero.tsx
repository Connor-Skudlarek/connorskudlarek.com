import Link from "next/link";
import { hero, site } from "@/lib/data";

const glance = [
  { label: "Now", value: "Laboratory Service Engineer II, Lam Research" },
  { label: "Domain", value: "Semiconductor capital equipment" },
  { label: "Building with", value: "TypeScript, React, Next.js, PostgreSQL" },
  { label: "Also", value: "Volunteer frontend lead, 4Human Corporation" },
  { label: "Studied", value: "BS Mechanical Engineering, Oregon Tech" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-edge">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 h-[30rem] w-[30rem] rounded-full bg-accent-soft blur-3xl"
      />
      <div className="relative mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            />
            {site.location}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Hi, I&apos;m Connor
            <br className="hidden sm:block" /> Skudlarek.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed sm:text-2xl">
            {hero.lead}
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {hero.body}
          </p>
          <p className="mt-4 max-w-xl font-medium">{hero.looking}</p>
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
          <p className="mt-6 text-sm text-muted">
            Or{" "}
            <Link
              href="/risk/"
              className="font-medium text-accent underline decoration-edge underline-offset-4 transition-colors hover:text-foreground"
            >
              try something I built
            </Link>{" "}
            — it runs in your browser, no sign-in.
          </p>
        </div>

        <dl className="rounded-2xl border border-edge bg-surface p-6 shadow-[0_1px_2px_rgba(42,35,32,0.04),0_16px_36px_-24px_rgba(42,35,32,0.28)]">
          {glance.map((item, index) => (
            <div
              key={item.label}
              className={
                index === 0 ? "" : "mt-4 border-t border-edge/70 pt-4"
              }
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {item.label}
              </dt>
              <dd className="mt-1 leading-snug">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
