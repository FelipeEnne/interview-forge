# InterviewForge

Personal web app for technical interview preparation: active recall study, timed proficiency quizzes, and coding challenges—starting with Node.js, React, and Angular.

**Status:** v0.7.0 (Angular Active Recall)

## Features

- **Study** — Node.js (60 questions, 9 categories), React (40, 8 categories), and Angular (40, 8 categories); reveal answers and rate recall (Again / Hard / Good / Easy); session summary; LocalStorage progress; review scheduling; due questions; weaker questions first; study by category.
- **Test** — Node.js, React, and Angular Proficiency Quizzes (20-question banks, 10 per attempt, 8-minute timers); score and per-category breakdown; accumulated category performance. Weak quiz categories link to Study when the topic has an active-recall bank.
- **Practice** — 6 Node.js coding challenges with prompts, starter code, review checklists, and on-demand reference solutions (no in-app code execution).
- **Language (EN / PT)** — Bilingual UI chrome and bilingual technical content (study Q&A, quiz prompts and options, challenge titles and checklists). Use the header selector to switch anytime; your choice is saved in the browser. Study progress, quiz aggregates, review scheduling, and question IDs are **shared across languages**—only presentation changes. Coding-challenge starter code and reference solutions stay the same in both languages.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- CSS Modules
- Vitest, Testing Library, jsdom
- ESLint (`eslint-config-next`)

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Start from **Study Node.js questions**, use **Take proficiency quiz** on Node.js, React, or Angular, or practice Node.js coding challenges. The header language selector switches the interface and technical content between English and Portuguese; coding-challenge starter code and reference solutions stay the same.

Production build:

```bash
npm run build
npm start
```

## Development commands

With [Make](https://www.gnu.org/software/make/) installed:

```bash
make dev
make test
make quick-check
make check
make format
```

`make check` runs format-check, lint, typecheck, tests, and build. `make quick-check` skips the build.

## Tests

```bash
npm test -- --run
```

Also: `npm run lint`, `npm run build`.

## Study / Test / Practice

| Mode         | Purpose                                                       | Persistence                                  |
| ------------ | ------------------------------------------------------------- | -------------------------------------------- |
| **Study**    | Active recall and spaced-style review scheduling              | Question progress in LocalStorage            |
| **Test**     | Timed multiple-choice assessment separate from recall ratings | Per-category quiz aggregates in LocalStorage |
| **Practice** | Implementation exercises compared to reference solutions      | None (client-only reveal)                    |

More detail: `docs/product.md`, `docs/architecture.md`, `docs/roadmap.md`.
