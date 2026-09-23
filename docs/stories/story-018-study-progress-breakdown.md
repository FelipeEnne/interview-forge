# Story 018 — Study progress breakdown

## Story statement

As a candidate, I want to see how my questions are distributed by recall rating so that I can understand what still needs attention.

## Behavior delivered

- The Node.js topic page **Progress** block keeps memorized count, percentage, progress bar, and remaining count from Story 017.
- Below the summary, two compact groups show **current** counts per bucket:
  - **Needs attention:** Again, Hard, Unreviewed
  - **Memorized:** Good, Easy
- Each count reflects the question’s **latest** self-rating (`lastRating`) or **Unreviewed** when no progress exists for that canonical question id.
- This is **not** a history of how many times each rating was pressed in past sessions. Example: Hard → Hard → Good counts as **Good: 1** only.
- Counts are **derived** from `QuestionProgress` in LocalStorage on each visit. No new persisted counters.
- Unknown progress keys (ids not in the topic bank) are ignored, same as Story 017.
- English and Portuguese use existing recall-rating labels plus new strings for group titles and Unreviewed.

## Main technical decisions

- `getStudyProgress` remains the single aggregation function. It returns `ratings` (`again`, `hard`, `good`, `easy`, `unreviewed`) from one pass over canonical questions, then derives `memorized`, `remaining`, and `percentage`.
- Invariants: rating buckets sum to `total`; `memorized === good + easy`; `remaining === again + hard + unreviewed`.
- `NodejsStudyProgress` renders the breakdown with `ratingLabel` for the four recall ratings and `t()` for group headings and Unreviewed.

## Tests added or changed

- `domain/study-progress.test.ts` — buckets, mixed scenario, invariants, unknown ids, empty list, immutability.
- `app/topics/[topic]/page.test.tsx` — breakdown counts and group headings in English and Portuguese.
- `i18n/translations.test.ts` — new progress breakdown UI keys.

## Explicitly out of scope

- Rating history, click counters, streaks, mastery scores, charts, filters, per-question lists, per-category progress, quiz integration, scheduling changes, or interaction on the breakdown.

## Final status

**Completed.**
