# Story 011 — Lowest-performing quiz categories

## Story statement

As a candidate, I want to see which Node.js categories I perform worst in
across quizzes so that I know what to study next.

## Behavior delivered

- A completed quiz adds correct and encountered question counts to persistent
  performance for each category in that attempt.
- Normal completion and timeout each persist exactly once. Closing an
  incomplete attempt does not save it.
- The Node.js topic page shows up to three categories with the lowest
  accumulated quiz accuracy.
- A category needs at least two encountered questions before it appears.
- Each displayed category includes its percentage, correct/total counts, and a
  direct link to the existing category study route.
- Missing or invalid LocalStorage data produces no performance block and does
  not affect the rest of the application.
- Quiz performance remains completely separate from recall ratings, study
  progress, and scheduling.

## Main technical decisions

- Persist only bounded aggregate category counts, not attempt summaries,
  timestamps, answers, question text, or global scores.
- Store the aggregate under `interview-forge:quiz-attempts`, separate from
  `interview-forge:question-progress`.
- Calculate accumulated accuracy as total correct divided by total encountered
  questions. Do not average attempt percentages.
- Show the three lowest eligible accuracies without a pass/fail threshold.
- Order by exact ratios before rounding percentages. Exact ties follow the
  canonical category order from `QUESTION_CATEGORY_LABELS`.
- Use pure `recordQuizPerformance` and `getLowestCategoryPerformance` domain
  functions. LocalStorage access stays at client boundaries.

## Tests added or changed

- `domain/quiz-performance.test.ts` covers accumulation, independence,
  minimum evidence, percentages, limits, ordering, and stable ties.
- `domain/local-storage-quiz-performance.test.ts` covers missing data,
  round-trip persistence, strict validation, and whole-blob failure.
- `components/NodejsQuiz.test.tsx` covers exactly-once persistence for normal
  completion and timeout, plus no duplicate write on **Try again**.
- `components/NodejsCategoryPerformance.test.tsx` covers displayed insights,
  category study links, and no block without enough evidence.
- `app/topics/[topic]/page.test.tsx` covers composition on the Node.js topic
  page.

## Explicitly out of scope

- Visual attempt history, timestamps, retention limits, or performance trends
- Dashboards, separate analytics pages, or charts
- Thresholds, pass/fail, global persistent scores, badges, or streaks
- Adaptive quiz selection or complex recommendations
- Combining quiz performance with `RecallRating` or `QuestionProgress`
- Changes to category study, scheduling, or either question bank
- Backend persistence, authentication, or cross-device synchronization

## Final status

**Completed.**
