import type { Metadata } from "next";
import Link from "next/link";
import RiskSimulator from "./RiskSimulator";

export const metadata: Metadata = {
  title: "Risk battle odds calculator",
  description:
    "A Monte Carlo simulator for Risk dice combat: win probability, expected losses, and the full distribution of how much an attack costs you.",
  alternates: { canonical: "/risk/" },
};

export default function RiskPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← Back home
      </Link>

      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Should you attack?
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        I kept losing at Risk and wanted to know whether the dice were against
        me or I was simply making bad attacks. It was the second one. Ties go to
        the defender, and that single rule costs attackers more than almost
        anyone accounts for at the table.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Set up a fight below and it plays the whole thing out to the last army,
        tens of thousands of times, in your browser.
      </p>

      <RiskSimulator />

      <section className="mt-14 border-t border-edge pt-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          What the numbers say
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted">
          <p>
            Attacking with a small edge is close to a coin flip, and coin flips
            compound badly across a game. The attacker rolls one fewer die than
            it has armies, because one has to hold the territory it came from,
            and every tie goes to the defender. Those two rules together mean
            you generally want a comfortable margin before committing, not a
            slim one.
          </p>
          <p>
            The bar chart is the part I actually use. A win probability tells
            you whether to attack; the loss distribution tells you what you will
            have left afterwards, which is usually the question that decides the
            next turn.
          </p>
          <p>
            The simulation is about sixty lines of plain TypeScript with no
            dependencies. The original was a command-line script; this version
            adds the standard two-dice defender rule, since the script I wrote
            first used a three-dice house rule and quietly flattered attackers.
          </p>
          <p>
            The whole thing is this, run tens of thousands of times. Both sides
            sort their dice high to low, the highest pairs off against the
            highest, and the defender wins every tie:
          </p>
        </div>

        <pre className="mt-4 overflow-x-auto rounded-xl border border-edge bg-surface-sunk p-4 text-sm leading-relaxed">
          <code className="font-mono">{`const attackDice = Math.min(attacker - 1, rules.maxAttackDice);
const defendDice = Math.min(defender, rules.maxDefendDice);

const attackRolls = rollSorted(attackDice);
const defendRolls = rollSorted(defendDice);

for (let i = 0; i < Math.min(attackDice, defendDice); i++) {
  if (attackRolls[i] > defendRolls[i]) defenderLosses++;
  else attackerLosses++;   // ties go to the defender
}`}</code>
        </pre>

        <div className="mt-4 space-y-4 leading-relaxed text-muted">
          <p>
            I checked it rather than trusting it. The same battle can be solved
            exactly by enumerating every dice combination and recursing over the
            remaining armies, so I did that too and compared: across nine
            match-ups the simulation lands within 0.15 percentage points of the
            exact answer every time. That is also how I caught my own reference
            numbers being wrong — the code was right and my memory of the odds
            table was not.
          </p>
        </div>
      </section>
    </article>
  );
}
