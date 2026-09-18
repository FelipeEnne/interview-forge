# Story 002 — Rate recall

## Story statement

After I reveal an answer, I want to rate how well I remembered it so I can reflect on recall quality and move to the next question.

## Behavior delivered

- After **Show answer**, four buttons appear: **Again**, **Hard**, **Good**, **Easy**.
- **Show answer** is disabled while the answer is visible.
- Choosing a rating advances to the next question (answer hidden again) until the last question.
- Rating buttons are not shown before the answer is revealed.

## Main technical decisions

- `RecallRating` and labels centralized in `domain/recall-rating.ts`.
- Session ratings stored in component state via immutable `recordSessionRating`.
- Domain module stays free of React for unit testing.

## Tests added

- `domain/recall-rating.test.ts` — record and overwrite ratings per question id.
- `components/TopicStudySession.test.tsx` — hidden vs visible rating buttons, advance on **Good**, disabled **Show answer** after reveal.

## Explicitly out of scope

- End-of-session summary screen.
- Persisting ratings to LocalStorage.
- Spaced repetition or scheduling from ratings.

## Final status

**Completed.**
