/**
 * Monte Carlo simulation of Risk dice combat.
 *
 * Ported from a command-line script I wrote after losing one too many games.
 * The original let the defender roll up to three dice; standard Risk caps the
 * defender at two, so the rule is a parameter here and defaults to standard.
 */

export type Rules = {
  /** Most dice an attacker may roll in one battle. */
  maxAttackDice: number;
  /** Most dice a defender may roll in one battle. Standard Risk is 2. */
  maxDefendDice: number;
};

export const STANDARD_RULES: Rules = { maxAttackDice: 3, maxDefendDice: 2 };
export const HOUSE_RULES: Rules = { maxAttackDice: 3, maxDefendDice: 3 };

export type BattleOutcome = { attackerLosses: number; defenderLosses: number };

function roll(): number {
  return Math.floor(Math.random() * 6) + 1;
}

function rollSorted(count: number): number[] {
  const dice: number[] = [];
  for (let i = 0; i < count; i++) dice.push(roll());
  return dice.sort((a, b) => b - a);
}

/**
 * One exchange of dice. The attacker must leave one army behind, so it rolls
 * with (armies - 1). Ties go to the defender, which is the rule that makes
 * attacking worse than most players assume.
 */
export function simulateBattle(
  attacker: number,
  defender: number,
  rules: Rules = STANDARD_RULES,
): BattleOutcome {
  const attackDice = Math.min(attacker - 1, rules.maxAttackDice);
  const defendDice = Math.min(defender, rules.maxDefendDice);

  const attackRolls = rollSorted(attackDice);
  const defendRolls = rollSorted(defendDice);

  let attackerLosses = 0;
  let defenderLosses = 0;

  const contested = Math.min(attackDice, defendDice);
  for (let i = 0; i < contested; i++) {
    if (attackRolls[i] > defendRolls[i]) defenderLosses++;
    else attackerLosses++;
  }

  return { attackerLosses, defenderLosses };
}

export type Analysis = {
  simulations: number;
  wins: number;
  winRate: number;
  /** Mean armies still standing after a won attack. */
  averageSurvivorsOnWin: number;
  averageAttackerLosses: number;
  /** P(attacker loses at most n) for each n, as [losses, probability]. */
  cumulativeLossOdds: { losses: number; probability: number }[];
};

/**
 * Fight the battle to its conclusion `simulations` times and summarize.
 * The attack stops when the attacker is down to its last army or the
 * defending territory is empty.
 */
export function simulateWar(
  attacker: number,
  defender: number,
  simulations: number,
  rules: Rules = STANDARD_RULES,
): Analysis {
  let wins = 0;
  let survivorsOnWin = 0;
  let totalAttackerLosses = 0;
  const lossHistogram = new Map<number, number>();

  for (let i = 0; i < simulations; i++) {
    let atk = attacker;
    let def = defender;

    while (atk > 1 && def > 0) {
      const { attackerLosses, defenderLosses } = simulateBattle(atk, def, rules);
      atk -= attackerLosses;
      def -= defenderLosses;
    }

    const losses = attacker - atk;
    totalAttackerLosses += losses;
    lossHistogram.set(losses, (lossHistogram.get(losses) ?? 0) + 1);

    if (def === 0) {
      wins++;
      survivorsOnWin += atk;
    }
  }

  const cumulativeLossOdds: Analysis["cumulativeLossOdds"] = [];
  let running = 0;
  for (const losses of [...lossHistogram.keys()].sort((a, b) => a - b)) {
    running += lossHistogram.get(losses) ?? 0;
    cumulativeLossOdds.push({ losses, probability: running / simulations });
  }

  return {
    simulations,
    wins,
    winRate: wins / simulations,
    averageSurvivorsOnWin: wins > 0 ? survivorsOnWin / wins : 0,
    averageAttackerLosses: totalAttackerLosses / simulations,
    cumulativeLossOdds,
  };
}
