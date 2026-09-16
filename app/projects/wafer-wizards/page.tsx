import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { CaseStudyFooter, CaseStudyHeader, Part } from "@/components/CaseStudy";

const project = projects.find((p) => p.slug === "wafer-wizards")!;

export const metadata: Metadata = {
  title: project.title,
  description:
    "An equipment issue tracker built from lab-floor experience, rewritten from a MERN stack onto Next.js and PostgreSQL.",
  alternates: { canonical: "/projects/wafer-wizards/" },
};

export default function WaferWizardsCaseStudy() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <CaseStudyHeader project={project} />

      <Part heading="The problem">
        <p>
          A piece of lab equipment goes down. One technician remembers it did
          this in March. Someone else recalls a firmware change that might be
          related. The fix, when it arrives, lives in a text message and a
          whiteboard that gets erased on Friday. Six months later the same tool
          fails the same way and the same afternoon is spent rediscovering the
          same answer.
        </p>
        <p>
          I built Wafer Wizards because I had been on the wrong end of that loop
          often enough to know what the tool needed to be. Not a general-purpose
          ticket system — those exist and people avoid them — but something
          organized around equipment and its history, where logging an issue is
          fast enough to do while you are still standing in front of the
          machine.
        </p>
      </Part>

      <Part heading="The rewrite, and why it was worth it">
        <p>
          The first version was a MERN app: React from create-react-app, an
          Express API, MongoDB. It worked. It also meant every page load was a
          spinner while the client asked the API for what it needed, and a
          growing pile of hand-written code to keep server and client agreeing
          about the shape of the data.
        </p>
        <p>
          I rewrote it on Next.js with PostgreSQL. Three things drove the
          decision, and I want to be specific because &ldquo;we rewrote it in
          the new framework&rdquo; is usually a bad reason.
        </p>
        <p>
          <strong className="text-foreground">The data was relational.</strong>{" "}
          Equipment has issues, issues have updates and assignees, everything
          joins to everything. I had been hand-rolling those joins in
          application code against a document store. Postgres does that
          correctly and I stopped writing it.
        </p>
        <p>
          <strong className="text-foreground">
            The waterfall was structural, not a tuning problem.
          </strong>{" "}
          Rendering on the server let a page arrive with its data already in it,
          which removed both the spinner and the entire class of loading-state
          bugs underneath it.
        </p>
        <p>
          <strong className="text-foreground">
            Validation needed one source of truth.
          </strong>{" "}
          A Zod schema defines the shape once and both the form and the server
          action are checked against it. The previous version validated in two
          places and they drifted, which is how bad data got in. The status field
          is the clearest example — a fixed set of states, declared once:
        </p>
        <pre className="overflow-x-auto rounded-xl border border-edge bg-surface-sunk p-4 text-sm leading-relaxed">
          <code className="font-mono">{`const TicketSchema = z.object({
  ticketID: z.string({ invalid_type_error: "Please select a ticket." }),
  priority: z.coerce.number().gt(0, { message: "Priority should be 1, 2, 3...n" }),
  description: z.string(),
  assigned: z.string(),
  status: z.enum([
    "Pending", "In Work", "Paused",
    "Under Review", "Complete", "Rejected",
  ]),
});`}</code>
        </pre>
        <p>
          There is no ORM here. Queries are raw SQL through the Postgres client,
          which I chose deliberately: the schema is small, the queries are the
          interesting part, and I wanted to be writing SQL rather than learning
          a query builder&apos;s opinion about SQL.
        </p>
      </Part>

      <Part heading="Authentication, and what you can actually see">
        <p>
          Maintenance history is internal, so the application sits behind
          NextAuth with credential sign-in, hashed passwords, and
          middleware-enforced session checks on protected routes.
        </p>
        <p>
          The deployed link shows the page describing the tool; the tracker
          itself sits behind sign-in. The source is public if you want to read
          how it works, and I can walk through the running application on a
          call.
        </p>
      </Part>

      <Part heading="Why the domain knowledge mattered">
        <p>
          I did not pick this off a list of portfolio ideas. I picked a problem
          I had personally lost afternoons to, which meant I already knew the
          requirements that usually get discovered late: that logging has to
          happen while you are still in front of the machine, that history is
          organized by equipment rather than by ticket, and that anything
          requiring a second person to be available will not get used.
        </p>
      </Part>

      <CaseStudyFooter />
    </article>
  );
}
