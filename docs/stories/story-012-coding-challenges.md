# Story 012 — Node.js coding challenges

## Story statement

As a candidate, I want to practice realistic Node.js coding challenges so that I can prepare for implementation tasks commonly used in technical assessments.

## Behavior delivered

- The Node.js topic page links to coding challenges at `/topics/nodejs/challenges`.
- The list shows six challenges with titles, category labels, and links to each detail page.
- A challenge page shows the prompt, requirements, starter code, and review checklist before any solution is visible.
- Starter and reference code are read-only. Candidates solve the problem in a local editor.
- **Reveal solution** shows the **Reference solution**. The rest of the challenge remains readable before that action.
- Unknown topic or challenge ids return not found.
- Coding challenges do not execute candidate code and do not read or write study or quiz storage.

## Content distribution

6 authored challenges:

- Event Loop & Async: 2 (retry with async/await; provider aggregation with `Promise.allSettled`)
- HTTP & APIs: 2 (`GET /users/:id`; `POST /users` with validation and conflict)
- Express: 1 (API key middleware and safe error handling)
- Streams & Buffers: 1 (NDJSON parsing with Transform/pipeline)

## Main technical decisions

- `CodingChallenge` is a separate static model from `InterviewQuestion` and `QuizQuestion`.
- Challenge content lives in `data/nodejs-coding-challenges.ts` and reuses `QuestionCategory`.
- `starterCode` and `referenceSolution` are required because every item is an implementation exercise with a revealable answer.
- `requirements` describe the problem contract; `reviewChecklist` guides self-review and is not a second copy of the contract.
- Difficulty is omitted because six items have a fixed order and the UI does not filter or sort by it.
- List and detail pages are Server Components. Only `RevealSolution` is a Client Component.
- There is no in-app editor, copy button, runner, judge, timer, or persistence.

## Tests added or changed

- `data/nodejs-coding-challenges.test.ts` verifies count, unique ids, valid categories, non-empty fields, and coverage of the six scenarios.
- `components/NodejsCodingChallenge.test.tsx` covers visible prompt content and delayed reveal of the reference solution.
- `app/topics/[topic]/challenges/page.test.tsx` covers the list, category labels, and unknown topics.
- `app/topics/[topic]/challenges/[challenge]/page.test.tsx` covers composition and unknown topic or challenge ids.
- `app/topics/[topic]/page.test.tsx` covers the coding-challenges entry link.

## Explicitly out of scope

- In-app editors, copy helpers, execution, compilation, sandboxes, or automated judging
- Progress, completion, favorites, attempts, timers, scores, filters, search, or difficulty
- Hints, multiple official solutions, or links from quiz performance into challenges
- Changes to recall ratings, due review, study progress, or the quiz bank
- A generic challenge framework, extra topics, backend, authentication, or AI

## Final status

**Completed.**
