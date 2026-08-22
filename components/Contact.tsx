import { contact, site } from "@/lib/data";
import { Section } from "@/components/ui";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" heading={contact.heading}>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        {contact.body}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
        >
          {site.email}
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-edge bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
        >
          LinkedIn
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-edge bg-surface px-5 py-2.5 font-medium transition-colors hover:border-accent hover:text-accent"
        >
          GitHub
        </a>
      </div>
    </Section>
  );
}
