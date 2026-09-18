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
| `app/` | Routes and layouts. Home (`/`) and dynamic topic page (`/topics/[topic]`). |
| `components/` | Interactive UI. `TopicStudySession` owns the study flow. |
| `data/` | Static in-repo question banks (currently `nodejs-questions.ts`). |
| `domain/` | Pure TypeScript logic: ratings, progress, ordering, LocalStorage I/O. |
| `docs/` | Product and technical documentation. |

## Server vs client boundary

- **Server Components (default):** `app/layout.tsx`, `app/page.tsx`, `app/topics/[topic]/page.tsx` load topic data and render the study shell.
- **Client Component:** `TopicStudySession` (`"use client"`) holds session UI state, reads/writes LocalStorage, and builds the study queue after hydration.

LocalStorage is unavailable on the server; the topic page passes questions as props from the server, and the client initializes the ordered queue in `useEffect`.

## Domain concepts

| Concept | Responsibility |
| --- | --- |
| `InterviewQuestion` | `id`, `question`, `answer` text. |
| `RecallRating` | `"again" \| "hard" \| "good" \| "easy"`. |
| `QuestionProgress` / `QuestionProgressState` | **Persistent** per-question `lastRating` and `reviewCount` (LocalStorage). |
| `orderQuestionsForStudy` (`domain/question-order.ts`) | **Pure domain rule** — maps topic questions + progress snapshot → study order. |
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
- Not cleared by **Study again**; `reviewCount` accumulates across sessions

**Boundary:** Persisted progress is read when creating a study queue (initial load and **Study again**). `TopicStudySession` does not keep the full progress map in React state—only the ordered question list produced by `orderQuestionsForStudy`. Ratings still read/write storage per question when the user rates.

## LocalStorage strategy

- **Key:** `interview-forge:question-progress`
- **Format:** JSON object keyed by question id; each value must have valid `lastRating` and integer `reviewCount >= 1`.
- **Read:** `readQuestionProgress()` returns `{}` on SSR, missing key, invalid JSON, or any invalid entry (fail whole blob).
- **Write:** `saveQuestionProgress()` serializes the full state (no partial merge in storage layer).

Ordering uses `lastRating` only; `reviewCount` is stored for future stories and does not affect sort priority.

## Question ordering

Priority (lower number first): **Again** → **Hard** → unreviewed → **Good** → **Easy**, with stable tie-breaking by original topic order. Progress keys that do not match a topic question id are ignored for sort purposes.

**When the queue is built:** after hydration on topic load, and when the user clicks **Study again** (re-read LocalStorage, new queue).

**During an active session:** the queue is not reordered; new ratings affect storage and the next queue only.

## Testing strategy

- **Domain:** Pure functions tested in isolation (`recall-rating`, `question-progress`, `local-storage-progress`, `question-order`).
- **Data:** Sanity checks on `NODEJS_TOPIC` content.
- **UI:** `TopicStudySession.test.tsx` exercises user-visible flows (show answer, rate, summary, prioritization, **Study again**, LocalStorage side effects) with Testing Library.
- No E2E or snapshot tests.

Run: `npm test -- --run` (or `npm run test:run`).

## Important technical decisions

- Keep business rules in `domain/` so UI stays thin and testable without Next.js.
- Static question data in TypeScript modules rather than a CMS or DB for now.
- Single topic route validates slug against `NODEJS_TOPIC`; unknown topics → `notFound()`.
- Strict LocalStorage validation to avoid corrupt partial state.
- Client-only queue initialization to avoid SSR/hydration mismatch with stored progress.
- Separate **fixed session queue** from **mutable persisted progress** so in-session ratings never reshuffle the current pass.

## Known technical debt

- Duplicate `.js` files alongside `.ts` sources in `domain/` (`question-order.js`, `question-progress.js`, `recall-rating.js`, and related tests) — likely stray artifacts; TypeScript sources are authoritative for the app build.
- Topic registry is hard-coded in the topic page (not a shared topic index).
- No app-route-level tests; coverage is centered on `TopicStudySession` and domain modules.
- `reviewCount` is persisted but not used in ordering or UI yet.
