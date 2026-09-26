const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1_000;

export const QUIZ_TIMER_TICK_MILLISECONDS = MILLISECONDS_PER_SECOND;

export function minutesToSeconds(minutes: number): number {
  return minutes * SECONDS_PER_MINUTE;
}

export function minutesToMilliseconds(minutes: number): number {
  return minutesToSeconds(minutes) * MILLISECONDS_PER_SECOND;
}

export function formatQuizTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getRemainingQuizSeconds(
  deadline: number,
  currentTime: number,
): number {
  return Math.max(
    0,
    Math.ceil((deadline - currentTime) / MILLISECONDS_PER_SECOND),
  );
}
