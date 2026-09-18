# Story 007 — Study due questions

## Story statement

As a candidate, I want to study questions that are due for review so that I focus on material that needs attention instead of repeating everything every session.

## Behavior delivered

- Normal sessions include only questions due at the instant the queue is created.
- A question is due when it is unreviewed, has legacy progress without `nextReviewAt`, or has `nextReviewAt` at or before the supplied current time.
- Due questions are ordered by the existing recall priority: **Again**, **Hard**, unreviewed, **Good**, **Easy**.
- The selected and ordered queue remains fixed throughout the session.
- **Study again** re-reads LocalStorage, captures a new current time, and creates a new due-based queue.
- When no questions are due, the UI shows a caught-up state and offers **Study all questions**.
- **Study all questions** creates one voluntary session containing every topic question in recall-priority order. A subsequent **Study again** returns to due filtering.
- Session summaries count only questions reviewed in the current queue and use singular or plural wording as appropriate.

## Main technical decisions

- Pure due selection lives in `domain/due-questions.ts` and receives the current `Date` as an argument.
- Due filtering and question ordering remain separate, composed domain rules.
- The client component owns clock and LocalStorage access at queue-creation boundaries.
- Legacy progress remains valid and due without a migration.
- Opening or revealing a question does not update scheduling; only a recall rating does.

## Tests added or changed

- `domain/due-questions.test.ts` — unreviewed and legacy progress, past/exact/future boundaries, source order, unknown progress ids, and input immutability.
- `components/TopicStudySession.test.tsx` — due-only selection, ordering, fixed queues, recalculation on **Study again**, caught-up state, voluntary practice, and session-summary totals.

## Explicitly out of scope

- Dashboard or due count on the home page
- Countdown, notifications, background jobs, calendar, or configurable time zones
- Intra-session repetition or learning steps
- Review history, streaks, scores, or analytics
- Adaptive scheduling such as FSRS or SM-2
- Backend persistence or cross-device synchronization

## Final status

**Completed.**
