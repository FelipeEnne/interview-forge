# InterviewForge — Agent Instructions

## Project Purpose

InterviewForge is a personal application for preparing for technical interviews.

The product will help candidates:

- study technical questions;
- practice active recall;
- review weak topics;
- take quizzes;
- simulate technical interviews;
- practice coding challenges.

The product should evolve incrementally.

Do not implement future functionality before it is required by the current story.

---

## Communication Language

Communication with the user must be in Portuguese.

All project artifacts must be written in English, including:

- source code;
- tests;
- comments;
- variable names;
- function names;
- class names;
- type names;
- file names;
- documentation;
- commit messages;
- UI text, unless a future requirement explicitly introduces localization.

---

## Engineering Principles

### 1. 80/20

Prefer the smallest implementation that delivers most of the value required by the current story.

Avoid adding infrastructure, abstractions, dependencies, or features for hypothetical future needs.

### 2. TDD

Use Test-Driven Development for application behavior.

Follow the cycle:

1. Red — write the smallest failing test.
2. Green — implement the minimum code necessary to pass.
3. Refactor — improve the code only when there is a clear benefit.

Do not write large batches of tests followed by large batches of implementation when the work can be divided into smaller behavioral slices.

### 3. Simple Design

A design is simple, in Kent Beck's priority order, when it:

1. passes all the tests;
2. contains no duplication;
3. expresses the programmer's intent;
4. minimizes the number of classes and methods.

Prefer:

- small modules;
- explicit code;
- clear naming;
- simple data structures;
- composition;
- behavior-focused tests.

Avoid:

- speculative abstractions;
- unnecessary factories;
- unnecessary repositories;
- unnecessary global state;
- generic helpers used only once;
- architecture created only for possible future requirements.

Create abstractions when duplication or a concrete use case justifies them.

### 4. Scope Discipline

Implement only the requested story or task.

Do not silently add related features.

If an improvement is useful but outside the current scope, mention it after completing the requested work instead of implementing it.

---

## Current Technology Stack

Unless a story explicitly changes the architecture, use:

- Next.js
- React
- TypeScript
- App Router
- Vitest
- Testing Library
- jsdom

Prefer Server Components by default.

Use Client Components only where browser-side interactivity or local state is required.

---

## Testing Guidelines

Tests should describe observable behavior rather than implementation details.

Prefer Testing Library queries based on how a user interacts with the interface.

Do not test:

- internal React state;
- private implementation details;
- framework behavior already guaranteed by Next.js or React.

Do not introduce snapshots unless they provide clear value.

Do not introduce end-to-end testing unless explicitly required by the current task.

Every bug fix should include a regression test when practical.

### Topic data imports

The Next.js TypeScript language service can report `Cannot find module` for
relative imports whose path contains `/react/` or `/angular/` (for example
`./topics/react/questions` from `data/`). The target file usually exists;
`tsc` and Vitest may still pass. Do not create a duplicate module or treat
the file as missing.

- From outside a topic folder, import topic modules with the `@/` alias
  (`@/data/topics/react/questions`), not a relative path that includes the
  topic id as a folder segment (`./topics/react/questions`).
- Colocated files inside `data/topics/<topic>/` may keep relative imports
  such as `./questions`.
- Tests that assert behavior across study banks must use `getStudyTopicById`
  from `data/study-topics.ts` instead of importing each bank's `questions.ts`.

---

## Dependencies

Do not add a dependency when the same requirement can be implemented clearly with the existing stack.

Before installing a new package:

1. verify that it is actually required;
2. prefer an existing dependency when appropriate;
3. avoid packages introduced only to solve trivial problems.

---

## Validation

After modifying application code, run the relevant checks.

When available, the final validation should include:

```bash
npm test -- --run
npm run lint
npm run build
```

If the repository uses different scripts, inspect `package.json` and use the actual project commands.

Do not claim a check passed unless it was executed successfully.

If a check cannot be executed, clearly explain why.

---

## Git Safety

Do not:

- create branches unless explicitly requested;
- push to a remote repository unless explicitly requested;
- rewrite Git history;
- amend existing commits unless explicitly requested;
- delete unrelated user changes.

Do not create a commit unless the current task explicitly asks for one.

Always inspect existing changes before modifying files.

Preserve unrelated work in the working tree.

---

## Agent Workflow

Before making changes:

1. inspect the relevant existing files;
2. understand the current implementation;
3. identify the smallest slice that satisfies the task;
4. inspect existing tests and conventions;
5. avoid assumptions that can be verified from the repository.

For small and local tasks, proceed directly with the requested implementation.

For architectural changes, domain changes, large refactors, or work affecting several subsystems, produce a plan before implementation.

When executing an approved plan:

- follow the plan;
- keep changes focused;
- stop before starting the next story;
- report any necessary deviation from the plan.

---

## Code Quality

Prefer code that another developer can understand without additional explanation.

Functions and components should have one clear responsibility.

Use meaningful domain names.

Avoid comments that merely restate the code.

Comments should explain reasoning, constraints, or non-obvious behavior.

Keep TypeScript types explicit where they improve understanding, but avoid redundant typing.

Do not use `any` unless there is a concrete reason and no reasonable alternative.

---

## Product Development Rule

InterviewForge is being built incrementally.

A future feature is not a current requirement.

Examples of features that should only be introduced when required by a story include:

- authentication;
- database persistence;
- AI evaluation;
- spaced repetition algorithms;
- coding execution environments;
- global state management;
- analytics;
- gamification;
- internationalization;
- complex design systems.

The current story always takes precedence over anticipated future architecture.

---

## Completion Report

After completing an implementation task, summarize in Portuguese:

- what was implemented;
- files created or changed;
- tests added or changed;
- test result;
- lint result;
- build result;
- relevant technical decisions;
- anything intentionally left outside the scope.

Do not start another story automatically.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
