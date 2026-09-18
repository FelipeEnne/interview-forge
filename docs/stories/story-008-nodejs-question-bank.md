# Story 008 — Categorized Node.js question bank

## Story statement

As a candidate, I want Node.js interview questions organized by category so that I can build broader and more structured technical knowledge.

## Behavior delivered

- The Node.js bank contains 30 concise interview questions across 8 categories.
- The current question's category appears above the question during study.
- The category changes with the current question regardless of due selection or recall-priority ordering.
- Existing study, rating, summary, persistence, ordering, and scheduling behavior remains unchanged.

## Categories and distribution

- Fundamentals: 4
- Event Loop & Async: 6
- Modules: 3
- HTTP & APIs: 4
- Express: 3
- Streams & Buffers: 4
- Testing: 3
- Security: 3

Error handling is covered across async code, Express, and streams. Performance is covered through event-loop blocking, worker threads, connection reuse, and stream backpressure rather than separate small categories.

## Main technical decisions

- `InterviewQuestion` adds only a typed `category` field.
- `QuestionCategory` is derived from the keys of `QUESTION_CATEGORY_LABELS`, keeping allowed values and UI labels in one source of truth.
- All Node.js content remains in `data/nodejs-questions.ts`; 30 questions do not justify splitting the bank into multiple files.
- The five original question ids remain unchanged so existing LocalStorage progress continues to match.
- New questions use stable, descriptive kebab-case ids.

## Tests added or changed

- `data/nodejs-questions.test.ts` verifies the exact count, valid categories, non-empty content, unique ids, and preservation of the five original ids.
- `components/TopicStudySession.test.tsx` verifies that the current category is visible and updates when the question changes.
- Existing component and domain tests continue to cover the unchanged study flow.

## Explicitly out of scope

- Filtering, selecting, summarizing, or measuring progress by category
- Changes to ratings, due filtering, ordering, scheduling, or LocalStorage
- Difficulty, tags, sources, follow-up questions, company metadata, or long code examples
- Quizzes, timers, randomization, AI, imports, coding challenges, FSRS, or SM-2
- Splitting the bank for hypothetical future scale

## Final status

**Completed.**
