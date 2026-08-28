import type { Completion } from "./completions";

/** Always two decimal places and a period separator (never 584,97 or 585). */
export function formatGasTJ(value: number): string {
  return value.toFixed(2);
}

export function formatEotM(value: number): string {
  return value.toFixed(2);
}

export function formatEotLabel(completion: Completion): string {
  return `C${completion.number}  ${completion.year}  ${completion.pumpingDays}d  ${formatGasTJ(completion.gasProduced_TJ)} TJ`;
}
