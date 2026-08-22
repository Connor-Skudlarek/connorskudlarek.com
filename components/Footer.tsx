import Link from "next/link";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-edge bg-surface-sunk">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          Built by hand with Next.js and Tailwind. Statically exported, served
          from a small server in Oregon.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            className="transition-colors hover:text-accent"
            href={`mailto:${site.email}`}
          >
            Email
          </a>
          <a
            className="transition-colors hover:text-accent"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-accent"
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <Link className="transition-colors hover:text-accent" href="/risk/">
            Risk odds
          </Link>
        </div>
      </div>
    </footer>
  );
}
