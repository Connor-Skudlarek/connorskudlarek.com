import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-28 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Either I moved something without leaving a redirect, or the link was
        wrong to begin with. Both are fixable.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
        <Link
          href="/risk/"
          className="rounded-full border border-edge bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Roll some dice instead
        </Link>
      </div>
    </section>
  );
}
