# Story 019 — Multi-topic foundation

## Story statement

As a candidate, I want InterviewForge to recognize multiple interview topics so
that React and Angular question banks can be added without duplicating the
Node.js application.

## Behavior delivered

- The home page presents Node.js, React, and Angular under **Technical
  Interview Preparation**.
- Node.js remains available and links to `/topics/nodejs`.
- React and Angular are known topics marked **Coming soon** in English and
  **Em breve** in Portuguese.
- `/topics/react` and `/topics/angular` render localized coming-soon pages.
- Unknown topic slugs return not found.
- Study, category, quiz, and coding-challenge routes remain available only when
  their content exists. React and Angular subroutes return not found.
- Every existing Node.js study, quiz, performance, and coding-challenge flow is
  preserved.

## Main technical decisions

- `data/topic-registry.ts` is a small metadata registry. It owns stable topic
  ids, localized display names, and `available`/`coming-soon` status, but no
  content banks.
- `data/study-topics.ts` separately resolves topics that currently have active
  recall content. It contains Node.js only; Stories 020 and 021 will add React
  and Angular.
- `TopicStudySession` receives questions and topic-owned category definitions.
  It no longer imports the Node.js category taxonomy.
- `StudyProgress` replaces `NodejsStudyProgress` and receives canonical
  questions through props. Its aggregation and LocalStorage behavior are
  unchanged.
- Node.js category slugs and localized labels live in
  `data/nodejs-categories.ts`. Quiz and coding challenges remain explicitly
  Node.js-specific.
- Study progress continues to use the flat
  `interview-forge:question-progress` object keyed by globally unique question
  ids. All existing Node.js ids are preserved. Future banks must use
  `react-*` and `angular-*` prefixes.

## Tests added or changed

- Registry tests cover all three topics, statuses, order, and unknown slugs.
- Home and topic route tests cover navigation, localized coming-soon states,
  and not-found behavior.
- `TopicStudySession` is exercised with a React-shaped fixture through reveal,
  rating, scheduling, and persistence.
- `StudyProgress` is tested with supplied questions and a legacy flat Node.js
  progress entry.
- Study, category, quiz, and coding-challenge route tests preserve Node.js
  access and reject unavailable React/Angular subroutes.

## Explicitly out of scope

- React or Angular question banks
- React or Angular quizzes or coding challenges
- LocalStorage migration or topic namespacing
- A generic capability framework
- Backend persistence, authentication, or sync

## Next stories

- Story 020 — React Active Recall Question Bank
- Story 021 — Angular Active Recall Question Bank

## Final status

**Completed.**
