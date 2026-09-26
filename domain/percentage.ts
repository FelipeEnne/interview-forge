export const PERCENTAGE_MAX = 100;

export function calculatePercentage(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * PERCENTAGE_MAX);
}
