# Architecture

Architecture as of **MVP v0.1.0**: one Node.js topic with Study (active recall + LocalStorage scheduling), Test (timed quiz + category aggregates), and Practice (static coding challenges, no execution). Persistence is browser LocalStorage only; no server-side store.

## Current stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | CSS Modules (`*.module.css`) |
| Unit / component tests | Vitest, Testing Library, jsdom |
| Lint | ESLint (`eslint-config-next`) |

Runtime dependencies are intentionally minimal: Next.js, React, and React DOM only.

## Folder responsibilities

| Path | Role |
| --- | --- |
| `app/` | Routes and layouts. Home, topic overview, due study, category study, quiz, and coding challenge pages. |
| `components/` | Interactive UI. `TopicStudySession` owns the study flow, `NodejsQuiz` owns the quiz flow, `NodejsCategoryPerformance` reads accumulated quiz performance, and `NodejsCodingChallenge` shows a challenge with a client-only solution reveal. |
| `data/` | Static in-repo banks: `nodejs-questions.ts` (study), `nodejs-quiz-questions.ts` (quiz), and `nodejs-coding-challenges.ts` (practice problems). |
| `domain/` | Pure TypeScript logic: ratings, progress, due selection, ordering, LocalStorage I/O, quiz selection and scoring. |
| `docs/` | Product and technical documentation. |

## Server vs client boundary

- **Server Components (default):** route pages validate URL segments, select static topic data, and render the topic overview, study shell, or quiz shell.
- **Client Component:** `TopicStudySession` (`"use client"`) holds session UI state, reads/writes LocalStorage, and builds the study queue after hydration. The current instant is read from an injectable `now` callback (default `() => new Date()`).
- **Client Component:** `NodejsQuiz` (`"use client"`) holds intro/active/result phases, samples questions after **Start quiz**, and runs the countdown from a deadline. The current instant is read from an injectable `now` callback (default `Date.now`).
- **Client Component:** `NodejsCategoryPerformance` (`"use client"`) reads quiz performance after hydration and renders category insights when enough evidence exists.
- **Client Component:** `RevealSolution` (`"use client"`) hides a challenge's reference solution until **Reveal solution**. The surrounding challenge page stays a Server Component.

LocalStorage is unavailable on the server; study pages pass questions and a session mode as props, and the client initializes the ordered queue in `useEffect`. Quiz pages pass the static quiz bank; the client samples an attempt only after an explicit start. The topic overview remains a Server Component and composes the small client performance block.

## Domain concepts

| Concept | Responsibility |
| --- | --- |
| `InterviewQuestion` | Study/active-recall item: stable `id`, typed `category`, `question`, and `answer` text. |
| `QuizQuestion` | Assessment item: stable `id`, typed `category`, `question`, four `options`, and `correctOption`. |
| `CodingChallenge` | Implementation practice item: stable `id`, typed `category`, `prompt`, `requirements`, `starterCode`, `referenceSolution`, and `reviewChecklist`. |
| `QuestionCategory` / `QUESTION_CATEGORY_LABELS` | Nine allowed Node.js category slugs and their UI labels, shared by study and quiz. |
| `RecallRating` | `"again" \| "hard" \| "good" \| "easy"`. |
| `QuestionProgress` / `QuestionProgressState` | **Persistent** per-question rating, count, and review timestamps (LocalStorage). |
| `calculateNextReviewAt` (`domain/review-schedule.ts`) | **Pure domain rule** — maps a rating and review instant to the next review timestamp. |
| `getDueQuestions` (`domain/due-questions.ts`) | **Pure domain rule** — selects unreviewed, legacy, or scheduled questions whose `nextReviewAt` is at or before a supplied instant. |
| `orderQuestionsForStudy` (`domain/question-order.ts`) | **Pure domain rule** — maps topic questions + progress snapshot → study order. |
| `selectQuizQuestions` (`domain/quiz.ts`) | **Pure domain rule** — samples `count` unique questions using an injected `randomSource`. |
| `calculateQuizResult` (`domain/quiz.ts`) | **Pure domain rule** — scores an attempt; unanswered items are incorrect; aggregates by category. |
| `QuizPerformance` | **Persistent quiz-only aggregate** — correct and encountered counts keyed by category. |
| `recordQuizPerformance` / `getLowestCategoryPerformance` | **Pure domain rules** — accumulate a completed result and select the lowest-accuracy categories. |
| Session mode | `due-review` lets scheduling select questions; `practice` includes every supplied question. |
| Study session queue (`sessionQuestions`) | **Fixed ordered queue** for one pass; stored in React state after queue creation. |
| `SessionRatings` | **Current-session only** — ratings for summary counts; cleared on **Study again**. |
| Quiz attempt | **Current-attempt only** — selected questions, sparse answers, and deadline; only its category aggregate is persisted at completion. |

Study questions, quiz questions, and coding challenges are separate models. Quiz scoring does not read or write `QuestionProgress`. Coding challenges do not persist attempts and do not execute candidate code.

## Session state vs persistent progress

**Session-only (React state in `TopicStudySession`):**

- `sessionQuestions` — ordered queue for this pass (fixed until a new queue is built)
- Current question index
- Whether the answer is visible
- `sessionRatings` for summary counts
- `isSessionComplete`

**Persistent (LocalStorage):**

- `QuestionProgressState` under key `interview-forge:question-progress`
- Updated on each rating via `recordQuestionProgress` + `saveQuestionProgress`
- Stores `lastReviewedAt` and `nextReviewAt` as ISO 8601 UTC strings
- Not cleared by **Study again**; `reviewCount` accumulates across sessions

**Boundary:** Persisted progress is read when creating a study queue (initial load, **Study again**, and voluntary **Study all questions**). `TopicStudySession` does not keep the full progress map in React state—only the selected and ordered question list. Ratings still read/write storage per question when the user rates.

## Quiz attempt state

**Attempt-only (React state in `NodejsQuiz`):**

- Phase: intro, active, or result
- Sampled attempt questions
- Current question index
- Sparse answers keyed by question id
- Deadline (`Date.now() + 8 minutes`) and remaining seconds derived from it

The countdown starts only on **Start quiz** or **Try again**. Remaining time is `ceil((deadline - now()) / 1000)`, not a decrement-only counter. The active-phase effect reads remaining time immediately and then every second. At zero, the component clears the interval and scores the current answers. Normal completion and timeout share one guarded completion path that persists exactly once. **Try again** resets that guard and samples a new set.

Option order stays as authored. Tests inject `randomSource` into `selectQuizQuestions` so production can shuffle while domain tests stay deterministic.

## Topic and study routes

- `/topics/nodejs` is the Node.js entry page. It links to due review, the proficiency quiz, and all categories from `QUESTION_CATEGORY_LABELS`.
- `/topics/nodejs/study` starts the normal due-review session.
- `/topics/nodejs/categories/[category]` validates the category slug, filters the static bank on the server, and starts a manual practice session.
- `/topics/nodejs/quiz` hosts the full quiz flow (intro, attempt, result) in one client component.
- `/topics/nodejs/challenges` lists the six coding challenges.
- `/topics/nodejs/challenges/[challenge]` shows one challenge and reveals its reference solution on demand.
- Unknown topic, category, or challenge slugs return not found.

Category filtering stays at the application boundary because it is a single, explicit use of `Array.filter`; no separate domain rule is needed.

The Node.js entry page also composes `NodejsCategoryPerformance`. After hydration, it shows up to three eligible categories and links each one to the existing category practice route.

## LocalStorage strategy

### Study progress

- **Key:** `interview-forge:question-progress`
- **Format:** JSON object keyed by question id; each value has valid `lastRating`, integer `reviewCount >= 1`, and either both review timestamps or neither for legacy records.
- **Read:** `readQuestionProgress()` returns `{}` on SSR, missing key, invalid JSON, or any invalid entry (fail whole blob).
- **Write:** `saveQuestionProgress()` serializes the full state (no partial merge in storage layer).

Legacy records without timestamps remain valid and receive timestamps on their next rating. New timestamps use canonical ISO 8601 UTC with milliseconds.

Ordering uses `lastRating` only; `reviewCount` and review timestamps do not affect sort priority.

### Quiz performance

- **Key:** `interview-forge:quiz-attempts`
- **Format:** JSON object keyed by known category slug; each present value has integer `correct` and `total` counts with `total >= 1` and `0 <= correct <= total`.
- **Read:** `readQuizPerformance()` returns `{}` on SSR, missing key, invalid JSON, unknown categories, or any invalid entry.
- **Write:** `saveQuizPerformance()` serializes the complete aggregate.
- **Boundary:** a completed attempt adds its `byCategory` counts to storage. Incomplete attempts are not saved, and no quiz data is written to `interview-forge:question-progress`.
- No attempt list, timestamp, global score, or retention policy is needed because storage is bounded to nine category entries.

## Quiz category performance

Accumulated accuracy is `total correct / total encountered questions` for each category, not an average of attempt percentages. Categories with fewer than two encountered questions are omitted to avoid one answer producing an overly strong insight.

`getLowestCategoryPerformance` orders eligible categories by exact accuracy, returns at most three, and uses the canonical order from `QUESTION_CATEGORY_LABELS` for exact ties. Display percentages are rounded only after ordering. No pass/fail threshold is applied.

## Review scheduling

Each rating uses a fixed elapsed-time interval: **Again** 10 minutes, **Hard** 1 day, **Good** 3 days, and **Easy** 7 days. `TopicStudySession` obtains the current `Date` through its `now` callback at the client boundary and passes it into pure domain logic. The policy does not expand intervals from history.

## Due question selection

A normal session includes a question when it is unreviewed, has legacy progress without `nextReviewAt`, or has `nextReviewAt <= currentTime`. The current instant is captured once per queue creation and passed to `getDueQuestions`; domain logic does not read the system clock.

Selection preserves topic order and is composed before ordering:

`all questions → getDueQuestions → orderQuestionsForStudy → fixed session queue`

If no questions are due, the UI offers **Study all questions**. This action skips due selection for one voluntary session but still applies the standard ordering rule.

## Question ordering

Priority (lower number first): **Again** → **Hard** → unreviewed → **Good** → **Easy**, with stable tie-breaking by original topic order. Progress keys that do not match a topic question id are ignored for sort purposes.

**When the queue is built:** after hydration on topic load, and when the user clicks **Study again** (re-read LocalStorage, capture a new instant, select due questions, then order them). **Study all questions** also re-reads LocalStorage and orders the complete topic without due filtering.

**During an active session:** the queue is not reordered; new ratings affect storage and the next queue only.

**After voluntary practice:** **Study again** returns to the normal due-selection flow. The voluntary override is not persisted.

## Category practice

A category session is deliberate practice and does not apply due selection:

`all topic questions → filter selected category → orderQuestionsForStudy → fixed session queue`

The server preserves question-bank order while filtering. The client then applies the same recall-priority ordering used by due review. **Study again** re-reads LocalStorage, includes every question supplied for that category, and recalculates ordering without applying `getDueQuestions`.

## Testing strategy

- **Domain:** Pure functions tested in isolation (`recall-rating`, `review-schedule`, `question-progress`, `local-storage-progress`, `due-questions`, `question-order`, `quiz`, `quiz-performance`, and `local-storage-quiz-performance`). Domain and data tests that do not need the DOM use the Node environment; jsdom is reserved for component, route, and LocalStorage tests.
- **Data:** Sanity checks on `NODEJS_TOPIC`, `NODEJS_QUIZ_QUESTIONS`, and `NODEJS_CODING_CHALLENGES` content, categories, counts, unique ids, and option/correct-index validity.
- **Routes:** topic, category, quiz, and coding-challenge page tests cover available links, category filtering, invalid URLs, category summary totals, and persistence through the composed study UI.
- **UI:** `TopicStudySession.test.tsx` exercises study flows. `NodejsQuiz.test.tsx` exercises intro, linear advance, scoring, persistence, **Try again**, and the countdown. `NodejsCategoryPerformance.test.tsx` covers category insights and study links. `NodejsCodingChallenge.test.tsx` covers prompt, starter code, checklist, and delayed reveal of the reference solution.
- No E2E or snapshot tests.
- Do not mock the global `Date` constructor or call `vi.setSystemTime` in component tests.
- Inject a `now` callback into `TopicStudySession` and `NodejsQuiz` when a test needs a stable clock. Drive quiz timeout by changing that callback and rerendering so the active-phase effect reads the new instant.
- Vitest 3.2 records test timeouts with `Date.now()`. Workers preload `vitest.monotonic-now.cjs` so that clock stays monotonic even if the WSL wall clock jumps under parallel jsdom load. That prevents false 5s timeouts without hiding a real hang.
- `userEvent.setup({ delay: null })` avoids extra `setTimeout(0)` waits between pointer events.

Run: `npm test -- --run` (or `npm run test:run`). The suite currently has 107 tests across domain, data, routes, and components.

## Important technical decisions

- Keep business rules in `domain/` so UI stays thin and testable without Next.js.
- Pass the current instant into domain functions so scheduling tests never depend on the real clock.
- Keep quiz selection testable by injecting `randomSource`; production uses `Math.random`.
- Derive remaining quiz time from a deadline so tests can fake the clock without a real wait.
- Static question data in TypeScript modules rather than a CMS or DB for now.
- Keep study questions, quiz questions, and coding challenges in separate data modules because they are different shapes.
- Keep all 60 Node.js study questions and their category taxonomy in one readable data module; category display labels are the single source of truth for the category union.
- Preserve study question ids when content gains metadata because LocalStorage progress is keyed by question id. Category is not persisted.
- Single topic route validates slug against `NODEJS_TOPIC`; unknown topics → `notFound()`.
- Category slugs are validated against `QUESTION_CATEGORY_LABELS`; unknown categories → `notFound()`.
- Strict LocalStorage validation to avoid corrupt partial state.
- Client-only queue initialization to avoid SSR/hydration mismatch with stored progress.
- Separate **fixed session queue** from **mutable persisted progress** so in-session ratings never reshuffle the current pass.
- Separate due filtering from question ordering so each domain rule remains independently testable.
- Separate scheduled review from manual category practice through an explicit session mode.
- Keep the full quiz result in memory and persist only bounded per-category aggregates because current insights do not require attempt history or timestamps.
- Require two encountered questions before presenting a category and show the three lowest accuracies without a pass/fail threshold.

## Known technical debt

- Topic lookup is repeated in the small route set rather than extracted into a registry.
- `reviewCount` is persisted but not used in ordering or UI yet.
