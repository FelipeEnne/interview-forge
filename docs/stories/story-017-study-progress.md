# Story 017 — Study progress

## Story statement

As a candidate, I want to see how many questions I have memorized and how many are still remaining so that I can track my study progress.

## Behavior delivered

- The Node.js topic page (`/topics/nodejs`) shows a compact **Progress** block below the topic title.
- The summary displays memorized count over total, rounded percentage, remaining count, and a native `<progress>` bar.
- **Memorized** means the question’s latest self-rating (`lastRating`) is `good` or `easy`.
- **Remaining** is everything else: never studied, `again`, or `hard`.
- Counts and percentage are **derived** from `QuestionProgress` in LocalStorage on each page mount (including after returning from a study session or reload). No separate counters are persisted.
- English and Portuguese labels use the existing locale catalog.

## Main technical decisions

- Pure domain function `getStudyProgress(questions, questionProgress)` iterates canonical topic questions, ignores unknown progress keys, and does not touch LocalStorage or the clock.
- `NodejsStudyProgress` is a Client Component. `useSyncExternalStore` snapshots the **raw** `interview-forge:question-progress` string for a stable snapshot; `readQuestionProgress()` and `getStudyProgress()` derive display values.
- Live updates while `TopicStudySession` is open are out of scope; remounting the topic page reflects the latest stored progress.

## Tests added or changed

- `domain/study-progress.test.ts` — empty bank, rating rules, mixed scenario, rounding, unknown ids, immutability.
- `app/topics/[topic]/page.test.tsx` — persisted progress in English and Portuguese on the composed topic page.
- `i18n/translations.test.ts` — progress strings and `formatStudyQuestionsRemaining`.

## Explicitly out of scope

- Per-category progress, detailed question lists, filters, history, streaks, mastery scores, charts, calendar, badges, quiz integration, or dashboards.

## Final status

**Completed.**
