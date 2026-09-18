# Architecture

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
| `app/` | Routes and layouts. Home, topic overview, due study, and category study pages. |
| `components/` | Interactive UI. `TopicStudySession` owns the study flow. |
| `data/` | Static in-repo question banks (currently `nodejs-questions.ts`). |
| `domain/` | Pure TypeScript logic: ratings, progress, due selection, ordering, LocalStorage I/O. |
| `docs/` | Product and technical documentation. |

## Server vs client boundary

- **Server Components (default):** route pages validate URL segments, select static topic data, and render either the topic overview or study shell.
- **Client Component:** `TopicStudySession` (`"use client"`) holds session UI state, reads/writes LocalStorage, and builds the study queue after hydration.

LocalStorage is unavailable on the server; study pages pass questions and a session mode as props, and the client initializes the ordered queue in `useEffect`.

## Domain concepts

| Concept | Responsibility |
| --- | --- |
| `InterviewQuestion` | Stable `id`, typed `category`, `question`, and `answer` text. |
| `QuestionCategory` / `QUESTION_CATEGORY_LABELS` | Eight allowed Node.js category slugs and their UI labels. |
| `RecallRating` | `"again" \| "hard" \| "good" \| "easy"`. |
| `QuestionProgress` / `QuestionProgressState` | **Persistent** per-question rating, count, and review timestamps (LocalStorage). |
| `calculateNextReviewAt` (`domain/review-schedule.ts`) | **Pure domain rule** — maps a rating and review instant to the next review timestamp. |
| `getDueQuestions` (`domain/due-questions.ts`) | **Pure domain rule** — selects unreviewed, legacy, or scheduled questions whose `nextReviewAt` is at or before a supplied instant. |
| `orderQuestionsForStudy` (`domain/question-order.ts`) | **Pure domain rule** — maps topic questions + progress snapshot → study order. |
| Session mode | `due-review` lets scheduling select questions; `practice` includes every supplied question. |
| Study session queue (`sessionQuestions`) | **Fixed ordered queue** for one pass; stored in React state after queue creation. |
| `SessionRatings` | **Current-session only** — ratings for summary counts; cleared on **Study again**. |

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

## Topic and study routes

- `/topics/nodejs` is the Node.js entry page. It links to due review and lists all categories from `QUESTION_CATEGORY_LABELS`.
- `/topics/nodejs/study` starts the normal due-review session.
- `/topics/nodejs/categories/[category]` validates the category slug, filters the static bank on the server, and starts a manual practice session.
- Unknown topic or category slugs return not found.

Category filtering stays at the application boundary because it is a single, explicit use of `Array.filter`; no separate domain rule is needed.

## LocalStorage strategy

- **Key:** `interview-forge:question-progress`
- **Format:** JSON object keyed by question id; each value has valid `lastRating`, integer `reviewCount >= 1`, and either both review timestamps or neither for legacy records.
- **Read:** `readQuestionProgress()` returns `{}` on SSR, missing key, invalid JSON, or any invalid entry (fail whole blob).
- **Write:** `saveQuestionProgress()` serializes the full state (no partial merge in storage layer).

Legacy records without timestamps remain valid and receive timestamps on their next rating. New timestamps use canonical ISO 8601 UTC with milliseconds.

Ordering uses `lastRating` only; `reviewCount` and review timestamps do not affect sort priority.

## Review scheduling

Each rating uses a fixed elapsed-time interval: **Again** 10 minutes, **Hard** 1 day, **Good** 3 days, and **Easy** 7 days. `TopicStudySession` obtains the current `Date` at the client boundary and passes it into pure domain logic. The policy does not expand intervals from history.

## Due question selection

A normal session includes a question when it has no progress, has legacy progress without `nextReviewAt`, or has `nextReviewAt <= currentTime`. The current instant is captured once per queue creation and passed to `getDueQuestions`; domain logic does not read the system clock.

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

- **Domain:** Pure functions tested in isolation (`recall-rating`, `review-schedule`, `question-progress`, `local-storage-progress`, `due-questions`, `question-order`).
- **Data:** Sanity checks on `NODEJS_TOPIC` content, categories, count, unique ids, and preservation of original ids.
- **Routes:** topic and category page tests cover available links, category filtering, invalid URLs, category summary totals, and persistence through the composed UI.
- **UI:** `TopicStudySession.test.tsx` exercises user-visible flows (category context, show answer, rate, summary, due and practice selection, prioritization, **Study again**, LocalStorage side effects) with Testing Library.
- No E2E or snapshot tests.

Run: `npm test -- --run` (or `npm run test:run`).

## Important technical decisions

- Keep business rules in `domain/` so UI stays thin and testable without Next.js.
- Pass the current instant into domain functions so scheduling tests never depend on the real clock.
- Static question data in TypeScript modules rather than a CMS or DB for now.
- Keep all 30 Node.js questions and their category taxonomy in one readable data module; category display labels are the single source of truth for the category union.
- Preserve question ids when content gains metadata because LocalStorage progress is keyed by question id. Category is not persisted.
- Single topic route validates slug against `NODEJS_TOPIC`; unknown topics → `notFound()`.
- Category slugs are validated against `QUESTION_CATEGORY_LABELS`; unknown categories → `notFound()`.
- Strict LocalStorage validation to avoid corrupt partial state.
- Client-only queue initialization to avoid SSR/hydration mismatch with stored progress.
- Separate **fixed session queue** from **mutable persisted progress** so in-session ratings never reshuffle the current pass.
- Separate due filtering from question ordering so each domain rule remains independently testable.
- Separate scheduled review from manual category practice through an explicit session mode.

## Known technical debt

- Topic lookup is repeated in the small route set rather than extracted into a registry.
- `reviewCount` is persisted but not used in ordering or UI yet.
