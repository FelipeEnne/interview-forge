# Story 015 — Bilingual technical content

## Story statement

As a candidate, I want the technical content to follow my selected language so that I can study Node.js in English or Portuguese.

## Behavior delivered

- Study questions and answers follow the selected language.
- Quiz questions and options follow the selected language. `correctOption` still points to the same index in both languages.
- Coding-challenge titles, prompts, requirements, and review checklists follow the selected language.
- Coding-challenge `starterCode` and `referenceSolution` stay the same in both languages.
- Category display names remain in the UI catalog from Story 14. Content records still store only the category slug.
- Switching EN ↔ PT during a study session, quiz attempt, or challenge view re-renders text only. The current question, selected quiz answer, timer, revealed solution, IDs, and LocalStorage progress stay the same.

## Main technical decisions

- Each study, quiz, and challenge record remains one entity with a stable id. Translatable fields use `LocalizedText` (`{ en, pt }`) instead of parallel `-en`/`-pt` banks.
- `getLocalizedText(value, locale)` is the shared resolver. Components call `localize` from `useTranslations` at render time and do not normalize banks before session state is created.
- TypeScript requires both locales on content fields. Runtime still falls back to English when the requested locale is missing. Empty strings are not treated as missing.
- Quiz options stay in authored order. Language never shuffles alternatives or changes `correctOption`.
- Portuguese translations keep API names, identifiers, routes, status codes, and code literals in English.

## Tests added or changed

- `i18n/localized-text.test.ts` covers English, Portuguese, and fallback to English.
- `data/nodejs-questions.test.ts`, `data/nodejs-quiz-questions.test.ts`, and `data/nodejs-coding-challenges.test.ts` require 60/20/6 bilingual records, preserved IDs, valid categories, valid `correctOption`, matching list lengths, and shared challenge source code.
- `components/TopicStudySession.test.tsx` covers Portuguese study content and a mid-session language switch that keeps the current question, revealed answer, and progress.
- `components/NodejsQuiz.test.tsx` covers Portuguese questions/options, scoring by `correctOption`, and a mid-attempt language switch that keeps the current question, selected answer, and remaining time.
- `components/NodejsCodingChallenge.test.tsx` covers Portuguese challenge text and a language switch that keeps starter code and a revealed reference solution unchanged.
- Route and domain fixtures were updated to the `LocalizedText` shape without changing scoring or scheduling rules.

## Explicitly out of scope

- A third language, locale in the URL, multilingual SEO/metadata, or browser language detection
- Automatic or AI translation, CMS, backend, or separate content banks per language
- Semantic content differences by language
- Translation of source code, in-code comments, API names, identifiers, or slugs
- Changes to IDs, categories, ratings, scheduling, quiz aggregates, LocalStorage keys, option shuffling, or routes
- New questions, quiz items, or coding challenges

## Final status

**Completed.**
