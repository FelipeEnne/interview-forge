# Product

## Purpose

InterviewForge is a personal web app for preparing for technical interviews. It focuses on active recall: reading a question, trying to answer mentally, revealing the reference answer, and self-rating how well you remembered it.

## Core study loop

1. Open a topic and choose **Study due questions** or one category.
2. For due review, select questions that are due. For category practice, select every question in that category.
3. Order the selected questions with weaker recall first.
4. If no questions are due, optionally choose **Study all questions** for one voluntary practice session.
5. Read the current question with its category for context (answer hidden).
6. Click **Show answer** to reveal the reference answer.
7. Rate recall with **Again**, **Hard**, **Good**, or **Easy**.
8. Save when the question was reviewed and schedule its next review.
9. Move through the fixed session queue.
10. View a session summary with rating counts for the questions studied.
11. Optionally click **Study again** to rebuild the same kind of session (due review or category practice) from current progress.

## Current target use case

A single user studying a curated bank of **30 Node.js questions across 8 categories** in the browser, on their own device, without signing in. Progress survives page reloads via browser LocalStorage.

Entry path: home page → **Study Node.js questions** → `/topics/nodejs`. The topic page links to due review at `/topics/nodejs/study` and to manual practice for each category.

## Product principles

- **Incremental delivery** — ship the smallest slice that completes the current story.
- **Active recall** — questions before answers; self-rating after reveal.
- **Honest scope** — no features until a story requires them.
- **Simple UX** — one question at a time, minimal navigation.

## Current non-goals

The product does **not** currently provide:

- User accounts or authentication
- Server-side or database persistence
- Adaptive spaced repetition algorithms beyond the current fixed schedule
- Multiple topics beyond Node.js (only `nodejs` is wired in routing)
- Quizzes, mock interviews, or coding challenge environments
- AI evaluation of answers
- Analytics, gamification, or localization
- Cross-device sync

These may appear in future stories; they are not part of the shipped experience today.
