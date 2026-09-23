# Story 023 — Angular Active Recall

## Story statement

As a candidate, I want to study Angular with active recall so that I can
memorize core interview concepts, review due questions, and practice by
category alongside the existing Angular proficiency quiz.

## Behavior delivered

- Angular offers a 40-question bilingual active-recall bank across the same
  eight categories as the Angular quiz.
- `getStudyTopicById("angular")` returns Angular study data with 40 questions.
- `/topics/angular` shows study progress, due review, category links, quiz,
  and category performance with study links for weak quiz categories.
- `/topics/angular/study` and `/topics/angular/categories/[category]` use the
  shared study session engine.
- Study progress uses the global `interview-forge:question-progress` key
  with `angular-*` question ids; Node.js and React progress do not affect
  Angular totals.
- Scheduling, due selection, and question ordering are unchanged.

## Main technical decisions

- Reused `ANGULAR_CATEGORIES` from `data/topics/angular/categories.ts`; no
  separate study taxonomy.
- Content lives in `data/topics/angular/questions.ts` with ids `angular-*`
  (distinct from `angular-quiz-*`).
- Modern Angular emphasis: signals/computed, standalone components,
  control flow, functional interceptors, DestroyRef/takeUntilDestroyed.
- Global active-recall id uniqueness spans Node.js, React, and Angular in
  `data/study-question-ids.test.ts`.

## Tests added or changed

- `data/topics/angular/questions.test.ts` — count, ids, distribution, bilingual
  fields, local uniqueness.
- `data/study-question-ids.test.ts` — three-bank study id uniqueness.
- Capability, topic page, study route, and category route tests for Angular.

## Explicitly out of scope

- Angular coding challenges
- Quiz bank changes
- Engine, scheduling, or storage format changes

## Final status

**Completed.**
