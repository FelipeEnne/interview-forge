# InterviewForge

Personal web app for technical interview preparation: active recall study, a timed proficiency quiz, and coding challenges—starting with Node.js.

**Status:** MVP v0.1.0

## Features

- **Study** — 60 Node.js questions in 9 categories; reveal answers and rate recall (Again / Hard / Good / Easy); session summary; LocalStorage progress; review scheduling; due questions; weaker questions first; study by category.
- **Test** — Node.js Proficiency Quiz (20-question bank, 10 per attempt, 8-minute timer); score and per-category breakdown; accumulated performance and top weak categories for study links.
- **Practice** — 6 Node.js coding challenges with prompts, starter code, review checklists, and on-demand reference solutions (no in-app code execution).
- **Language** — English or Portuguese UI and technical content (study questions, quiz items, and challenge prompts); coding-challenge source code stays the same in both languages.

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

Open [http://localhost:3000](http://localhost:3000). Start from **Study Node.js questions**, then use Study (due or category), **Take proficiency quiz**, or **Practice coding challenges** on the Node.js topic page. The header language selector switches the interface and technical content between English and Portuguese; coding-challenge starter code and reference solutions stay the same.

Production build:

```bash
npm run build
npm start
```

## Tests

```bash
npm test -- --run
```

Also: `npm run lint`, `npm run build`.

## Study / Test / Practice

| Mode | Purpose | Persistence |
| --- | --- | --- |
| **Study** | Active recall and spaced-style review scheduling | Question progress in LocalStorage |
| **Test** | Timed multiple-choice assessment separate from recall ratings | Per-category quiz aggregates in LocalStorage |
| **Practice** | Implementation exercises compared to reference solutions | None (client-only reveal) |

More detail: `docs/product.md`, `docs/architecture.md`, `docs/roadmap.md`.
