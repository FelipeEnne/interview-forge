import {
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_MINUTE,
  minutesToMilliseconds,
  minutesToSeconds,
} from "./duration";

export { minutesToMilliseconds, minutesToSeconds };

export const QUIZ_TIMER_TICK_MILLISECONDS = MILLISECONDS_PER_SECOND;

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
