# Story 013 — Expanded Node.js question bank

## Story statement

As a candidate, I want a broader Node.js active-recall bank so that I can prepare for mid-level and senior interview topics beyond the original fundamentals set.

## Behavior delivered

- The Node.js study bank contains 60 concise interview questions across 9 categories.
- The original 30 question ids remain unchanged so existing LocalStorage progress continues to match.
- New questions use stable, descriptive kebab-case ids and original question and answer text.
- Existing study, rating, summary, persistence, ordering, scheduling, quiz, and coding-challenge behavior remains unchanged.

## Categories and distribution

- Fundamentals: 6
- Event Loop & Async: 12
- Modules: 5
- HTTP & APIs: 10
- Express: 3
- Streams & Buffers: 7
- Testing: 4
- Security: 6
- Production & Architecture: 7

The new `production` category covers databases, caching, observability, queues, containers, scaling, and architecture trade-offs that did not fit the previous eight categories. Error handling, performance, and security continue to appear across related categories rather than as extra taxonomies.

## Main technical decisions

- `InterviewQuestion` keeps only `id`, `category`, `question`, and `answer`.
- `QUESTION_CATEGORY_LABELS` gains `production` (`Production & Architecture`) as the single new slug.
- All Node.js study content remains in `data/nodejs-questions.ts`; 60 questions still do not justify splitting the bank.
- Quiz and coding-challenge banks are unchanged and only share the expanded category union.

## Tests added or changed

- `data/nodejs-questions.test.ts` verifies the exact count of 60, valid categories, non-empty content, unique ids, and preservation of the original 30 ids.
- `app/topics/[topic]/categories/[category]/page.test.tsx` studies every Fundamentals question from the bank instead of assuming the previous count of four.
- Existing component and domain tests continue to cover the unchanged study flow.

## Explicitly out of scope

- Changes to ratings, due filtering, ordering, scheduling, LocalStorage, quiz, or coding challenges
- Difficulty, tags, sources, follow-up questions, company metadata, or long code examples
- Copying questions or answers from external interview lists
- Splitting the bank for hypothetical future scale

## Final status

**Completed.**
