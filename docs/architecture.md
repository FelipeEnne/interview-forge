# Architecture

Architecture as of **Story 16**: one Node.js topic with Study, Test, and Practice, plus English/Portuguese UI chrome and bilingual technical content persisted only as a locale preference in LocalStorage. Persistence remains browser LocalStorage only; no server-side store. Language is a presentation concern: the same question, quiz item, and challenge IDs are shown in English or Portuguese. Quiz options are authored so the correct answer is not identifiable from presentation.

## Current stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | CSS Modules (`*.module.css`) |
| Unit / component tests | Vitest, Testing Library, jsdom |
| Lint | ESLint (`eslint-config-next`) |

Runtime dependencies are intentionally minimal: Next.js, React, and React DOM only.

## Internationalization

| Piece | Role |
| --- | --- |
| `Locale` (`"en" \| "pt"`) | Canonical locale type; `parseLocale` and `readLocale` fall back to `en` for SSR, missing keys, or invalid stored values. |
| `LocalizedText` | `{ en: string; pt?: string }` on static content records; TypeScript expects both locales on authored banks. |
| `getLocalizedText` | Resolves a string at **render time**: `value[locale] ?? value.en`. Empty strings are not treated as missing. |
| `i18n/translations.ts` | UI string catalog keyed by locale; category display names and rating labels live here, not in data modules. |
| `LocaleProvider` / `useTranslations` | Client context for active locale and a `localize` helper that wraps `getLocalizedText` for components. |
| `interview-forge:locale` | Persists preference only; study and quiz storage keys are independent. |

Components call `localize` (or `getLocalizedText` directly in tests) when rendering translatable fields—they do not pre-resolve banks into session state. Study queues, quiz attempts, and challenge views keep the same entity IDs and React state when the user toggles EN ↔ PT; only dependent UI re-renders with new strings. `TopicStudySession` and `NodejsQuiz` do not treat locale as a queue- or attempt-reset dependency.

## Folder responsibilities

| Path | Role |
| --- | --- |
| `app/` | Routes and layouts. Home, topic overview, due study, category study, quiz, and coding challenge pages. Localized chrome is rendered by client views composed from the server pages. |
| `components/` | Interactive UI plus the shared header, language selector, and locale provider. |
| `data/` | Static in-repo banks: `nodejs-questions.ts` (study), `nodejs-quiz-questions.ts` (quiz), and `nodejs-coding-challenges.ts` (practice problems). Translatable fields use `LocalizedText`. |
| `domain/` | Pure TypeScript logic: ratings, progress, due selection, ordering, LocalStorage I/O, quiz selection and scoring. |
| `i18n/` | Locale type, LocalStorage locale I/O, the UI translation catalog, and `LocalizedText` resolution. |
| `docs/` | Product and technical documentation. |

## Server vs client boundary

- **Server Components (default):** route pages validate URL segments, select static topic data, and compose client views for localized chrome.
- **Client Component:** `LocaleProvider` (`"use client"`) holds the active locale, restores it from LocalStorage after hydration, and exposes `useTranslations`.
- **Client Component:** `AppHeader` and `LanguageSelector` render the shared shell and persist `interview-forge:locale`.
- **Client Component:** `TopicStudySession` (`"use client"`) holds session UI state, reads/writes LocalStorage, and builds the study queue after hydration. The current instant is read from an injectable `now` callback (default `() => new Date()`).
- **Client Component:** `NodejsQuiz` (`"use client"`) holds intro/active/result phases, samples questions after **Start quiz**, and runs the countdown from a deadline. The current instant is read from an injectable `now` callback (default `Date.now`).
- **Client Component:** `NodejsCategoryPerformance` (`"use client"`) reads quiz performance after hydration and renders category insights when enough evidence exists.
- **Client Component:** `NodejsCodingChallenge` and `RevealSolution` (`"use client"`) localize challenge chrome and hide a challenge's reference solution until **Reveal solution**. Challenge pages still validate the URL on the server.

LocalStorage is unavailable on the server; study pages pass questions and a session mode as props, and the client initializes the ordered queue in `useEffect`. Quiz pages pass the static quiz bank; the client samples an attempt only after an explicit start. The topic overview remains a thin Server Component that renders a client overview.

The first HTML after a reload is English. If the stored locale is Portuguese, chrome updates after hydration. That flash is accepted so the app can keep static rendering, avoid cookies, and skip hydration mismatches.

## Domain concepts

| Concept | Responsibility |
| --- | --- |
| `InterviewQuestion` | Study/active-recall item: stable `id`, typed `category`, and bilingual `question`/`answer` (`LocalizedText`). |
| `QuizQuestion` | Assessment item: stable `id`, typed `category`, bilingual `question`, four bilingual `options`, and `correctOption`. |
| `CodingChallenge` | Implementation practice item: stable `id`, typed `category`, bilingual `title`/`prompt`/`requirements`/`reviewChecklist`, plus shared `starterCode` and `referenceSolution` strings. |
| `LocalizedText` | `{ en: string; pt: string }` value used by technical content. `getLocalizedText` selects the active locale and falls back to English if that locale is missing at runtime. |
| `QuestionCategory` / `QUESTION_CATEGORIES` | Nine allowed Node.js category slugs in canonical order, shared by study, quiz, and challenges. Display names are localized in `i18n/translations.ts`. |
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

## Quiz option authoring

Correct answers must not be identifiable from option length, specificity, or writing style.

Each quiz item has exactly one technically correct option. The three distractors belong to the same conceptual domain, use a similar grammatical structure, and match a comparable level of specificity. They represent plausible mistakes (for example confusing `process.nextTick()` with `setImmediate()`, or `Promise.all()` with `Promise.allSettled()`), not nonsense, artificial negations, or answers from another domain.

Do not pad options to equalize character counts. English and Portuguese must both satisfy the same presentation standard; a Portuguese translation must not reintroduce a length or style cue. Option order stays authored. `correctOption` is shared across locales and is spread evenly across the four indices in the bank.

## Topic and study routes

- `/topics/nodejs` is the Node.js entry page. It links to due review, the proficiency quiz, and all categories from `QUESTION_CATEGORIES`.
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

### UI locale

- **Key:** `interview-forge:locale`
- **Format:** the string `en` or `pt`
- **Read:** `readLocale()` returns `en` on SSR, a missing key, or any value other than `en`/`pt`
- **Write:** `saveLocale()` writes only this key; study progress and quiz aggregates are untouched
- Changing language re-renders chrome and technical text only. Question IDs, category slugs, recall-rating slugs, URLs, quiz answers, timers, and challenge source code stay the same. Session React state is not rebuilt because locale is not a queue-creation dependency.

## Quiz category performance

Accumulated accuracy is `total correct / total encountered questions` for each category, not an average of attempt percentages. Categories with fewer than two encountered questions are omitted to avoid one answer producing an overly strong insight.

`getLowestCategoryPerformance` orders eligible categories by exact accuracy, returns at most three, and uses the canonical order from `QUESTION_CATEGORIES` for exact ties. Display percentages are rounded only after ordering. No pass/fail threshold is applied.

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

- **Domain:** Pure functions tested in isolation (`recall-rating`, `review-schedule`, `question-progress`, `local-storage-progress`, `due-questions`, `question-order`, `quiz`, `quiz-performance`, `local-storage-quiz-performance`, locale parsing, translations, and `getLocalizedText`). Domain and data tests that do not need the DOM use the Node environment; jsdom is reserved for component, route, and LocalStorage tests.
- **Data:** Sanity checks on `NODEJS_TOPIC`, `NODEJS_QUIZ_QUESTIONS`, and `NODEJS_CODING_CHALLENGES` content, bilingual `LocalizedText` fields, categories, counts, unique ids, option/correct-index validity, shared challenge source code, quiz `correctOption` distribution, and a length-outlier heuristic that flags only a dramatically longer correct option.
- **Routes:** topic, category, quiz, and coding-challenge page tests cover available links, category filtering, invalid URLs, category summary totals, and persistence through the composed study UI.
- **UI:** `TopicStudySession.test.tsx` exercises study flows. `NodejsQuiz.test.tsx` exercises intro, linear advance, scoring, persistence, **Try again**, the countdown, and language switching during an attempt. `NodejsCategoryPerformance.test.tsx` covers category insights and study links. `NodejsCodingChallenge.test.tsx` covers prompt, starter code, checklist, delayed reveal of the reference solution, and language switching with code unchanged.
- No E2E or snapshot tests.
- Do not mock the global `Date` constructor or call `vi.setSystemTime` in component tests.
- Inject a `now` callback into `TopicStudySession` and `NodejsQuiz` when a test needs a stable clock. Drive quiz timeout by changing that callback and rerendering so the active-phase effect reads the new instant.
- Vitest 3.2 records test timeouts with `Date.now()`. Workers preload `vitest.monotonic-now.cjs` so that clock stays monotonic even if the WSL wall clock jumps under parallel jsdom load. That prevents false 5s timeouts without hiding a real hang.
- `userEvent.setup({ delay: null })` avoids extra `setTimeout(0)` waits between pointer events.

Run: `npm test -- --run` (or `npm run test:run`). The suite currently has 156 tests across domain, data, i18n, routes, and components.

## Important technical decisions

- Keep business rules in `domain/` so UI stays thin and testable without Next.js.
- Pass the current instant into domain functions so scheduling tests never depend on the real clock.
- Keep quiz selection testable by injecting `randomSource`; production uses `Math.random`.
- Derive remaining quiz time from a deadline so tests can fake the clock without a real wait.
- Static question data in TypeScript modules rather than a CMS or DB for now.
- Keep study questions, quiz questions, and coding challenges in separate data modules because they are different shapes.
- Keep all 60 Node.js study questions and their category taxonomy in one readable data module; `QUESTION_CATEGORIES` is the single source of truth for the category union and canonical order.
- Preserve study question ids when content gains metadata because LocalStorage progress is keyed by question id. Category is not persisted.
- Single topic route validates slug against `NODEJS_TOPIC`; unknown topics → `notFound()`.
- Category slugs are validated against `QUESTION_CATEGORIES`; unknown categories → `notFound()`.
- Strict LocalStorage validation to avoid corrupt partial state.
- Client-only queue initialization to avoid SSR/hydration mismatch with stored progress.
- Separate **fixed session queue** from **mutable persisted progress** so in-session ratings never reshuffle the current pass.
- Separate due filtering from question ordering so each domain rule remains independently testable.
- Separate scheduled review from manual category practice through an explicit session mode.
- Keep the full quiz result in memory and persist only bounded per-category aggregates because current insights do not require attempt history or timestamps.
- Require two encountered questions before presenting a category and show the three lowest accuracies without a pass/fail threshold.
- Keep UI localization in a small typed catalog with LocalStorage preference and no locale in the URL. Technical content uses the same locale through `LocalizedText` and `getLocalizedText`, resolved at render time so switching language does not rebuild study or quiz sessions.
- Author quiz options so the correct answer cannot be identified from length, specificity, or writing style; keep option order authored and spread `correctOption` evenly in the bank.

## Known technical debt

- Topic lookup is repeated in the small route set rather than extracted into a registry.
- `reviewCount` is persisted but not used in ordering or UI yet.
