# Product

## Purpose

InterviewForge is a personal web app for preparing for technical interviews. It focuses on active recall: reading a question, trying to answer mentally, revealing the reference answer, and self-rating how well you remembered it. It also offers a short timed Node.js proficiency quiz that is separate from study, and a small bank of Node.js coding challenges for implementation practice without running candidate code.

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

## Node.js proficiency quiz

1. From the Node.js topic page, choose **Take proficiency quiz**.
2. Read that the attempt has 10 questions and 8 minutes, then click **Start quiz**.
3. Select one of four answers and click **Next**. The last question uses **Finish quiz**.
4. If time reaches 00:00, the attempt ends with answers given so far. Unanswered questions count as incorrect.
5. View the score, percentage, and per-category breakdown for that attempt.
6. On completion, add correct and encountered question counts to persistent per-category quiz performance.
7. Optionally click **Try again** for a new attempt, or **Back to Node.js**.

The Node.js topic page shows up to three categories with the lowest accumulated
quiz accuracy once each has at least two encountered questions. Each category
links directly to its existing study session. Quiz performance is stored
separately and does not change study progress.

## Node.js coding challenges

1. From the Node.js topic page, choose **Practice coding challenges**.
2. Browse the six challenges and open one.
3. Read the prompt, requirements, starter code, and review checklist.
4. Solve the challenge in a local editor.
5. Click **Reveal solution** to compare against a reference implementation.

The application does not execute, compile, or judge candidate code. Coding
challenges do not change study progress or quiz performance.

## Current target use case

A single user studying a curated bank of **30 Node.js questions across 8 categories** in the browser, on their own device, without signing in. Study progress survives page reloads via browser LocalStorage.

The same topic also offers a timed multiple-choice quiz from a separate bank of **20 Node.js quiz questions**. Each attempt samples 10 of those questions.

Entry path: home page → **Study Node.js questions** → `/topics/nodejs`. The topic page links to due review at `/topics/nodejs/study`, the proficiency quiz at `/topics/nodejs/quiz`, coding challenges at `/topics/nodejs/challenges`, manual practice for each category, and category practice from accumulated quiz performance.

## Product principles

- **Incremental delivery** — ship the smallest slice that completes the current story.
- **Active recall** — questions before answers; self-rating after reveal.
- **Separate assessment** — quiz scoring is not mixed with recall ratings or review scheduling.
- **Honest scope** — no features until a story requires them.
- **Simple UX** — one question at a time, minimal navigation.

## Current non-goals

The product does **not** currently provide:

- User accounts or authentication
- Server-side or database persistence
- Visual quiz history or performance over time
- Adaptive spaced repetition algorithms beyond the current fixed schedule
- Multiple topics beyond Node.js (only `nodejs` is wired in routing)
- Mock interviews or coding execution environments
- AI evaluation of answers
- Analytics, gamification, or localization
- Cross-device sync

These may appear in future stories; they are not part of the shipped experience today.
