# Product

## Purpose

InterviewForge is a personal web app for preparing for technical interviews. It focuses on active recall: reading a question, trying to answer mentally, revealing the reference answer, and self-rating how well you remembered it.

## Core study loop

1. Open a topic study session (new sessions order questions with weaker recall first, using saved ratings when present).
2. Read the current question (answer hidden).
3. Click **Show answer** to reveal the reference answer.
4. Rate recall with **Again**, **Hard**, **Good**, or **Easy**.
5. Save when the question was reviewed and schedule its next review.
6. Move through all questions in the session queue.
7. View a session summary with rating counts.
8. Optionally click **Study again** to start a new session (queue and in-session ratings reset; persisted progress remains).

## Current target use case

A single user studying **Node.js** interview questions in the browser, on their own device, without signing in. Progress survives page reloads via browser LocalStorage.

Entry path: home page → **Study Node.js questions** → `/topics/nodejs`.

## Product principles

- **Incremental delivery** — ship the smallest slice that completes the current story.
- **Active recall** — questions before answers; self-rating after reveal.
- **Honest scope** — no features until a story requires them.
- **Simple UX** — one question at a time, minimal navigation.

## Current non-goals

The product does **not** currently provide:

- User accounts or authentication
- Server-side or database persistence
- Due-based sessions or adaptive spaced repetition algorithms
- Multiple topics beyond Node.js (only `nodejs` is wired in routing)
- Quizzes, mock interviews, or coding challenge environments
- AI evaluation of answers
- Analytics, gamification, or localization
- Cross-device sync

These may appear in future stories; they are not part of the shipped experience today.
