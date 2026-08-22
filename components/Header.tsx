import Link from "next/link";
import { site } from "@/lib/data";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Tools", href: "/#tools" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge/70 bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight transition-colors hover:text-accent"
        >
          Connor<span className="text-accent">.</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              href={site.github}
              className="rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-accent-soft hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
