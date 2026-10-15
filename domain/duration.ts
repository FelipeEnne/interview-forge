export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_SECOND = 1_000;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

export function minutesToSeconds(minutes: number): number {
  return minutes * SECONDS_PER_MINUTE;
}

export function minutesToMilliseconds(minutes: number): number {
  return minutesToSeconds(minutes) * MILLISECONDS_PER_SECOND;
}

export function daysToMilliseconds(days: number): number {
  return minutesToMilliseconds(days * MINUTES_PER_DAY);
}
