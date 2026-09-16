"use client";

import { useState, useTransition } from "react";
import {
  HOUSE_RULES,
  STANDARD_RULES,
  simulateWar,
  type Analysis,
} from "@/lib/risk";

const SIM_COUNTS = [10_000, 50_000, 200_000];

function percent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export default function RiskSimulator() {
  const [attacker, setAttacker] = useState(10);
  const [defender, setDefender] = useState(8);
  const [simulations, setSimulations] = useState(50_000);
  const [houseRules, setHouseRules] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const [pending, startTransition] = useTransition();

  function run() {
    startTransition(() => {
      setResult(
        simulateWar(
          attacker,
          defender,
          simulations,
          houseRules ? HOUSE_RULES : STANDARD_RULES,
        ),
      );
    });
  }

  // Only the interesting middle of the distribution is worth drawing: once the
  // odds are effectively certain, more bars say nothing.
  const chartRows =
    result?.cumulativeLossOdds.filter((row) => row.probability < 0.995) ?? [];
  const shown = chartRows.slice(0, 14);

  return (
    <div className="mt-10">
      <div className="rounded-2xl border border-edge bg-surface p-6 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Attacking armies</span>
            <input
              type="number"
              min={2}
              max={200}
              value={attacker}
              onChange={(e) =>
                setAttacker(
                  Math.max(2, Math.min(200, Number(e.target.value) || 2)),
                )
              }
              className="mt-1.5 w-full rounded-lg border border-edge bg-background px-3 py-2 text-lg"
            />
            <span className="mt-1 block text-xs text-muted">
              One army has to stay behind, so this many attacks with{" "}
              {attacker - 1}.
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium">Defending armies</span>
            <input
              type="number"
              min={1}
              max={200}
              value={defender}
              onChange={(e) =>
                setDefender(
                  Math.max(1, Math.min(200, Number(e.target.value) || 1)),
                )
              }
              className="mt-1.5 w-full rounded-lg border border-edge bg-background px-3 py-2 text-lg"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Simulations</span>
            <select
              value={simulations}
              onChange={(e) => setSimulations(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border border-edge bg-background px-3 py-2 text-lg"
            >
              {SIM_COUNTS.map((count) => (
                <option key={count} value={count}>
                  {count.toLocaleString()}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-start gap-3 pt-6">
            <input
              type="checkbox"
              checked={houseRules}
              onChange={(e) => setHouseRules(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--accent)]"
            />
            <span className="text-sm">
              <span className="font-medium">Defender rolls three dice</span>
              <span className="mt-0.5 block text-xs text-muted">
                A house rule. Standard Risk caps the defender at two.
              </span>
            </span>
          </label>
        </div>

        <button
          onClick={run}
          disabled={pending}
          className="mt-6 rounded-full bg-accent px-6 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Rolling…" : "Roll the dice"}
        </button>
      </div>

      {result ? (
        <div className="mt-6 rounded-2xl border border-edge bg-surface p-6 sm:p-7">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted">
                Attacker takes the territory
              </p>
              <p className="mt-1 font-display text-4xl font-semibold text-accent">
                {percent(result.winRate)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted">
                Armies left, when it works
              </p>
              <p className="mt-1 font-display text-4xl font-semibold">
                {result.averageSurvivorsOnWin.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted">
                Average armies lost
              </p>
              <p className="mt-1 font-display text-4xl font-semibold">
                {result.averageAttackerLosses.toFixed(1)}
              </p>
            </div>
          </div>

          {shown.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-sm font-semibold">
                Odds the attack costs you no more than…
              </h3>
              <ul className="mt-4 space-y-1.5">
                {shown.map((row) => (
                  <li key={row.losses} className="flex items-center gap-3">
                    <span className="w-16 shrink-0 text-right font-mono text-xs text-muted">
                      {row.losses} lost
                    </span>
                    <span className="h-5 flex-1 overflow-hidden rounded-full bg-surface-sunk">
                      <span
                        className="block h-full rounded-full bg-accent/80"
                        style={{ width: `${row.probability * 100}%` }}
                      />
                    </span>
                    <span className="w-14 shrink-0 font-mono text-xs tabular-nums text-muted">
                      {percent(row.probability)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <p className="mt-6 text-sm text-muted">
            {result.simulations.toLocaleString()} simulated attacks,{" "}
            {houseRules ? "three" : "two"} defending dice, ties to the defender.
          </p>
        </div>
      ) : null}
    </div>
  );
}
