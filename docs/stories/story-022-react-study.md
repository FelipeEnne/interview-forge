# Story 022 — React Active Recall

## Story statement

As a candidate, I want to study React with active recall so that I can
memorize core interview concepts, review due questions, and practice by
category alongside the existing React proficiency quiz.

## Behavior delivered

- React offers a 40-question bilingual active-recall bank across the same
  eight categories as the React quiz.
- `getStudyTopicById("react")` returns React study data; Angular study
  remains unavailable.
- `/topics/react` shows study progress, due review, category links, quiz,
  and category performance with study links for weak quiz categories.
- `/topics/react/study` and `/topics/react/categories/[category]` use the
  shared study session engine.
- Study progress uses the global `interview-forge:question-progress` key
  with `react-*` question ids; Node.js progress does not affect React totals.
- Scheduling, due selection, and question ordering are unchanged.

## Main technical decisions

- Reused `REACT_CATEGORIES` from `data/topics/react/categories.ts`; no
  separate study taxonomy.
- Content lives in `data/topics/react/questions.ts` with ids `react-*`
  (distinct from `react-quiz-*`).
- Global active-recall id uniqueness is tested in
  `data/study-question-ids.test.ts` (Node.js + React only in this story).

## Tests added or changed

- `data/topics/react/questions.test.ts` — count, ids, distribution, bilingual
  fields, local uniqueness.
- `data/study-question-ids.test.ts` — cross-bank study id uniqueness.
- Capability, topic page, study route, and category route tests for React.
- Angular and Node.js quiz/challenge expectations preserved where applicable.

## Explicitly out of scope

- Angular active recall
- React coding challenges
- Quiz bank changes
- Engine, scheduling, or storage format changes

## Final status

**Completed.**
