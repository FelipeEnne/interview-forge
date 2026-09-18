# Story 006 — Schedule reviews

## Story statement

As a candidate, I want each recall rating to schedule when I should review the question again so that the application can eventually show material at the right time.

## Behavior delivered

- Each rating records `lastReviewedAt` and `nextReviewAt` as ISO 8601 UTC timestamps.
- Fixed intervals are applied from the review instant: **Again** 10 minutes, **Hard** 1 day, **Good** 3 days, and **Easy** 7 days.
- Rating a question again replaces its timestamps while continuing to update `lastRating` and increment `reviewCount`.
- Existing LocalStorage progress without timestamps remains valid and gains timestamps on its next rating.

## Main technical decisions

- Pure scheduling logic lives in `domain/review-schedule.ts` and receives the review instant as an argument.
- `TopicStudySession` obtains the current time at the client boundary.
- LocalStorage accepts either legacy entries without timestamps or new entries with both canonical UTC timestamps; partial or invalid timestamp data invalidates the stored state.
- Scheduling remains independent from current-session ratings and question ordering.

## Tests added or changed

- `domain/review-schedule.test.ts` — fixed intervals and input immutability.
- `domain/question-progress.test.ts` — timestamp creation and replacement.
- `domain/local-storage-progress.test.ts` — new-format round trip, legacy compatibility, and timestamp validation.
- `components/TopicStudySession.test.tsx` — deterministic timestamp persistence through the UI.

## Explicitly out of scope

- Selecting, hiding, or ordering questions by due time.
- Repeating questions within the same session.
- Adaptive intervals, learning steps, FSRS, or SM-2.
- Notifications, countdowns, time zone configuration, backend sync, or review history.

## Final status

**Completed.**
