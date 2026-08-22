import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  heading,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 ${className}`}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      {heading ? (
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-edge bg-surface-sunk px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-edge bg-surface p-6 shadow-[0_1px_2px_rgba(42,35,32,0.04),0_12px_28px_-18px_rgba(42,35,32,0.22)] sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "group inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-foreground";
  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
