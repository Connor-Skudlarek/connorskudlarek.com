import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { CaseStudyFooter, CaseStudyHeader, Part } from "@/components/CaseStudy";

const project = projects.find((p) => p.slug === "murphy")!;

export const metadata: Metadata = {
  title: project.title,
  description:
    "Leading frontend development on an e-commerce storefront for the Murphy Charitable Foundation Uganda, built by a distributed team of volunteers at 4Human Corporation.",
  alternates: { canonical: "/projects/murphy/" },
};

export default function MurphyCaseStudy() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <CaseStudyHeader project={project} />

      <Part heading="The problem">
        <p>
          The Murphy Charitable Foundation Uganda supports communities through
          direct programs and needed a storefront: a way to sell goods and take
          donations online without paying for software they could not afford.
          They came to 4Human Corporation, a 501(c)(3) whose entire purpose is
          building software for other nonprofits with volunteer labor.
        </p>
        <p>
          Volunteer labor is the constraint that shapes everything. Nobody is
          full-time. Contributors appear for a few weeks, ship something, and
          disappear when work or school gets busy. Any architecture that assumes
          a stable team with shared context in their heads will fall apart by
          the second month.
        </p>
      </Part>

      <figure className="mt-12">
        <div className="overflow-hidden rounded-2xl border border-edge">
          <img
            src="/murphy-desktop.webp"
            alt="The Murphy storefront: a category sidebar listing Health, Education, Culture, Environment, Agriculture, Energy, Recreation and Vocational, a product search field, and a grid of product cards with prices and add-to-cart buttons."
            width={1400}
            height={875}
            className="w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm text-muted">
          The storefront as it stands today. The layout, category navigation,
          search, and cart are working; the product photography is still
          placeholder while the foundation catalogs its inventory, which is the
          unfinished part I describe below.
        </figcaption>
      </figure>

      <Part heading="My role">
        <p>
          I joined as a volunteer in January 2024 and ended up leading the
          frontend. By the end I was the project&apos;s top contributor with 91
          commits — the next most active contributor had 25 — across a team of
          more than ten people spread across several time zones.
        </p>
        <p>
          Being top contributor on a volunteer project is less a bragging point
          than a description of the job: someone has to be the person who knows
          where everything is, reviews the pull requests, and unblocks a
          contributor who has three hours free on a Sunday and will not get
          another window for a week.
        </p>
      </Part>

      <Part heading="What I decided, and why">
        <p>
          <strong className="text-foreground">
            A component library instead of bespoke markup.
          </strong>{" "}
          We built on Radix primitives with Tailwind and the
          class-variance-authority pattern, so a contributor could compose a
          correct, accessible dropdown or dialog without knowing the accessibility
          rules for one. This mattered more than usual here: I could not rely on
          everyone having the same background, and code review is a slow way to
          teach ARIA semantics. Making the accessible path the easy path scaled
          better than reviewing for it.
        </p>
        <p>
          <strong className="text-foreground">
            Next.js App Router with server-side data fetching.
          </strong>{" "}
          The storefront is mostly reads: catalog, categories, program pages.
          Fetching those on the server means a page arrives with its content
          already in it rather than after a second round trip, which matters
          because a meaningful share of this audience is on modest phones and
          expensive mobile data. Bandwidth as a cost borne by the user settled
          several arguments that would otherwise have come down to taste.
        </p>
        <p>
          I went and measured the live site while writing this, and the result is
          worth reporting honestly: largest contentful paint lands at about 0.55
          seconds, which is good, but the page still ships roughly 440 KB of
          JavaScript, which is not small. Server rendering fixed the round-trip
          problem and did not fix the payload problem. If I were still on the
          project, trimming that bundle would be the next thing I picked up.
        </p>
        <p>
          <strong className="text-foreground">
            Firebase for the backend, deliberately.
          </strong>{" "}
          Firestore plus NextAuth gave us authentication and persistence without
          anyone owning a database server. A nonprofit with no budget and no
          on-call rotation cannot run a database server, so we did not give them
          one to run. The question I kept asking was not what I would choose with
          a funded team, but what would still be running in two years once every
          person on this project had moved on.
        </p>
      </Part>

      <figure className="mt-12">
        <div className="mx-auto max-w-[280px] overflow-hidden rounded-2xl border border-edge">
          <img
            src="/murphy-mobile.webp"
            alt="The same storefront on a phone, with the category list collapsed behind a menu and the product grid reflowed to a single column."
            width={500}
            height={1082}
            className="w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm text-muted">
          The same page on a phone. Most of this audience arrives on a small
          screen, so this is the layout that actually mattered.
        </figcaption>
      </figure>

      <Part heading="What I would do differently">
        <p>
          We built the shell before the content pipeline was settled, so some
          sections of the live site still show placeholder product data while
          the foundation works through cataloging. If I ran it again I would
          have pushed to get one real category populated end to end before
          building the second and third — a thin vertical slice would have
          surfaced the content bottleneck months earlier, when there was still
          volunteer capacity to help with it.
        </p>
      </Part>

      <Part heading="What it taught me">
        <p>
          The hardest parts were not technical. Writing a task so that a stranger
          can pick it up cold and finish it without asking a follow-up question
          is a skill I had to learn deliberately. So is reviewing a well-meaning
          pull request that needs substantial rework, in a way that keeps the
          person contributing next month. Both transfer directly to a paid team,
          and both are why I would take a lead role again.
        </p>
      </Part>

      <CaseStudyFooter />
    </article>
  );
}
