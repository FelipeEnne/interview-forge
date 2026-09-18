# Story 001 — Browse questions by topic

## Story statement

As someone preparing for interviews, I want to open a Node.js topic and step through questions one at a time so I can practice active recall without seeing answers upfront.

## Behavior delivered

- Home page links to Node.js study at `/topics/nodejs`.
- Topic page shows the topic title and the first question with the answer hidden.
- **Show answer** reveals the reference answer for the current question.
- Only the Node.js slug is supported; other `/topics/*` paths return not found.
- Five Node.js questions ship from static data in `data/nodejs-questions.ts`.

## Main technical decisions

- App Router with a server topic page that passes `topicName` and `questions` into a client study component.
- Question content lives in repo as typed data, not fetched from an API.
- CSS Modules for layout and readability.

## Tests added

- `data/nodejs-questions.test.ts` — slug, display name, question count, non-empty fields.
- `components/TopicStudySession.test.tsx` — topic heading, first question visible, answer hidden initially, **Show answer** reveals answer.

## Explicitly out of scope

- Recall ratings and session summary.
- Persistence across reloads.
- Multiple topics or dynamic topic catalog.
- Search, filters, or question randomization.

## Final status

**Completed.**
