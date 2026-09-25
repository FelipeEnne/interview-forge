# InterviewForge

Personal web app for technical interview preparation. Study curated questions with active recall, take timed proficiency quizzes, and practice Node.js coding challenges—without accounts, a backend, or code execution in the browser.

**Status:** v0.7.0 (Angular Active Recall)

Open [http://localhost:3000](http://localhost:3000) after `npm run dev`. Pick a topic from the home page, then Study, Test, or Practice. Switch **EN | PT** in the header at any time.

## Features

### Study (active recall)

Node.js (60 questions, 9 categories), React (40, 8 categories), and Angular (40, 8 categories).

- One question at a time; the answer stays hidden until you reveal it.
- Rate recall with **Again**, **Hard**, **Good**, or **Easy**.
- Fixed-interval review scheduling and a due-question queue.
- Weaker questions first; study by category or study all when nothing is due.
- Session summary with rating counts; optional **Study again**.
- Progress bar and last-rating breakdown (Again / Hard / Good / Easy / Unreviewed).
- Progress stored in the browser (LocalStorage).

### Test (proficiency quiz)

Node.js, React, and Angular each have a separate 20-question bank. Each attempt samples 10 questions and runs for 8 minutes.

- Multiple choice (four options); unanswered items count as incorrect when time runs out.
- Score, percentage, and per-category breakdown for that attempt.
- Accumulated category performance across attempts.
- Weak quiz categories (lowest accuracy, at least two encounters) link to Study when the topic has an active-recall bank.
- Quiz scoring is not mixed with recall ratings or review scheduling.

### Practice (coding challenges)

Six Node.js implementation exercises: retry/async, `Promise.allSettled` aggregation, `GET /users/:id`, `POST /users`, API-key and error middleware, and NDJSON stream parsing.

- Prompt, requirements, starter code, and a review checklist.
- On-demand reference solution.
- Solve in a local editor. The app does not execute, compile, or judge candidate code.
- No persistence; revealing a solution does not change study or quiz data.

React and Angular do not have coding challenges yet.

### Language (EN / PT)

Bilingual UI chrome and bilingual technical content (study Q&A, quiz prompts and options, challenge titles, prompts, requirements, and checklists). The header selector switches anytime; the choice is saved in the browser.

Study progress, quiz aggregates, review scheduling, and question IDs are **shared across languages**—only presentation changes. Coding-challenge starter code and reference solutions stay the same in both languages.

## Topics

| Topic   | Study             | Quiz                                    | Challenges |
| ------- | ----------------- | --------------------------------------- | ---------- |
| Node.js | 60 / 9 categories | 20-question bank, 10 per attempt, 8 min | 6          |
| React   | 40 / 8 categories | 20-question bank, 10 per attempt, 8 min | —          |
| Angular | 40 / 8 categories | 20-question bank, 10 per attempt, 8 min | —          |

**Node.js categories:** Fundamentals, Event Loop & Async, Modules, HTTP & APIs, Express, Streams & Buffers, Testing, Security, Production & Architecture.

**React categories:** Fundamentals & Composition, State & Updates, Hooks & Effects, Rendering & Identity, Forms, Shared State, Performance & Responsiveness, Testing.

**Angular categories:** Components & Rendering, Templates & Control Flow, Services & Dependency Injection, Observables & RxJS, Forms, Routing, HTTP, Testing & Architecture.

## How it works

| Mode         | Purpose                                                       | Persistence                                  |
| ------------ | ------------------------------------------------------------- | -------------------------------------------- |
| **Study**    | Active recall and spaced-style review scheduling              | Question progress in LocalStorage            |
| **Test**     | Timed multiple-choice assessment separate from recall ratings | Per-category quiz aggregates in LocalStorage |
| **Practice** | Implementation exercises compared to reference solutions      | None (client-only reveal)                    |

### Study loop

1. Open a topic and choose **Study due questions** or a category.
2. Due review selects questions whose next review is due. Category practice uses every question in that category.
3. Questions are ordered with weaker recall first.
4. If nothing is due, optionally **Study all questions** for a voluntary session.
5. Read the question (answer hidden), **Show answer**, then rate recall.
6. The next review is scheduled from the rating: Again in 10 minutes, Hard in 1 day, Good in 3 days, Easy in 7 days.
7. After the queue, view the session summary. **Study again** rebuilds the same kind of session from current progress.

### Quiz loop

1. From a topic with a quiz, choose **Take proficiency quiz**.
2. Confirm 10 questions and 8 minutes, then **Start quiz**.
3. Pick one of four answers and **Next** (last item: **Finish quiz**).
4. At 00:00 the attempt ends; unanswered questions are incorrect.
5. See score, percentage, and per-category breakdown. Completing an attempt updates accumulated category performance.
6. **Try again** starts a new sampled attempt.

### Challenge loop (Node.js)

1. From the Node.js topic page, choose **Practice coding challenges**.
2. Open a challenge, read the prompt, requirements, starter code, and checklist.
3. Solve it in a local editor, then **Reveal solution** to compare.

## Persistence

Everything stays on the current device. Clearing site data resets progress, quiz aggregates, and language preference.

| Data                | LocalStorage key                               |
| ------------------- | ---------------------------------------------- |
| Study progress      | `interview-forge:question-progress`            |
| Node.js quiz        | `interview-forge:quiz-attempts`                |
| Other topic quizzes | `interview-forge:quiz-attempts:<topicId>`      |
| Language            | `interview-forge:locale` (defaults to English) |

Study IDs are globally unique across topics (`nodejs-*`, `react-*`, `angular-*`) so banks do not overwrite each other. Switching EN ↔ PT during a session updates visible text only.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- CSS Modules
- Vitest, Testing Library, jsdom
- ESLint (`eslint-config-next`), Prettier

Server Components by default. Client Components only where interactivity or LocalStorage is required.

## Requirements

- Node.js 20 or later
- npm (lockfile is `package-lock.json`)
- [Make](https://www.gnu.org/software/make/) optional; `package.json` scripts work without it

## Install

```bash
npm install
```

Or `make install` (`npm ci`) when you want a clean install from the lockfile.

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Development commands

With Make:

```bash
make help
make install
make dev
make test
make lint
make format
make format-check
make typecheck
make quick-check
make check
make clean
```

`make quick-check` runs format-check, lint, typecheck, and tests. `make check` also builds. `make clean` removes `.next` and `coverage`.

Equivalent npm / npx commands:

```bash
npm run dev
npm test -- --run
npm run lint
npm run format
npm run format:check
npx tsc --noEmit
npm run build
```

## Tests

```bash
npm test -- --run
```

Behavioral tests cover study scheduling, quiz flow and timeout, LocalStorage, EN/PT, routes, and challenge reveal. Data tests protect question, quiz, and challenge banks. Prefer `make quick-check` while iterating; run `make check` before considering a task done.

## Project layout

```text
app/                  App Router pages and shared layout
components/
  study/              Active-recall session and progress
  quiz/               Timed quiz and category performance
  challenges/         Challenge list, detail, and solution reveal
data/
  topic-registry.ts   Topic ids and display names
  study-topics.ts     Study capability resolver
  quiz-topics.ts      Quiz capability resolver
  challenge-topics.ts Challenge capability resolver
  topics/<topic>/     Content and category definitions
domain/               Pure rules: ratings, scheduling, quiz scoring, storage
i18n/                 Locale, translations, localized content helpers
docs/                 Product, architecture, roadmap, and stories
```

Shared engines stay in capability modules. Topic folders hold content, not duplicated route trees.

## Routes

```text
/
/topics/[topic]
/topics/[topic]/study
/topics/[topic]/categories/[category]
/topics/[topic]/quiz
/topics/[topic]/challenges
/topics/[topic]/challenges/[challenge]
```

Unknown topics, invalid category or challenge ids, and unavailable capabilities return not found.

## Out of scope (today)

The app does **not** currently provide:

- User accounts or authentication
- Server-side or database persistence
- Cross-device sync
- Visual quiz history over time
- Adaptive spaced repetition beyond the fixed intervals above
- React or Angular coding challenges
- In-app code execution, mock interviews, or AI evaluation
- Analytics or gamification

These may appear in later stories; they are not part of the shipped experience.

## Documentation

| Doc                                            | Contents                                             |
| ---------------------------------------------- | ---------------------------------------------------- |
| [`docs/product.md`](docs/product.md)           | Purpose, loops, catalog, language, non-goals         |
| [`docs/architecture.md`](docs/architecture.md) | Stack, data layout, components, persistence, testing |
| [`docs/roadmap.md`](docs/roadmap.md)           | Shipped versions and stories                         |
| [`docs/stories/`](docs/stories/)               | Story write-ups                                      |
| [`CHANGELOG.md`](CHANGELOG.md)                 | Release notes                                        |
| [`AGENTS.md`](AGENTS.md)                       | Conventions for contributors and coding agents       |
