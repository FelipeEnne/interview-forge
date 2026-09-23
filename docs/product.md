# Product

**Status:** Multi-topic foundation with a complete Node.js topic, React and Angular proficiency quizzes, and English/Portuguese presentation.

## Purpose

InterviewForge is a personal web app for preparing for technical interviews by topic. It focuses on active recall: reading a question, trying to answer mentally, revealing the reference answer, and self-rating how well you remembered it. Node.js, React, and Angular each offer full study flows plus proficiency quizzes. Node.js also offers a small bank of coding challenges for implementation practice without running candidate code.

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

## Proficiency quizzes

1. From a topic page with a quiz, choose **Take proficiency quiz**.
2. Read that the attempt has 10 questions and 8 minutes, then click **Start quiz**.
3. Select one of four answers and click **Next**. The last question uses **Finish quiz**.
4. If time reaches 00:00, the attempt ends with answers given so far. Unanswered questions count as incorrect.
5. View the score, percentage, and per-category breakdown for that attempt.
6. On completion, add correct and encountered question counts to persistent per-category quiz performance.
7. Optionally click **Try again** for a new attempt, or return to the topic.

Each topic with Study shows a **Progress** summary for its active-recall bank:
how many are memorized (latest self-rating **Good** or **Easy**), how many
remain, and a simple progress bar. A compact breakdown lists how many questions
are currently **Again**, **Hard**, **Good**, **Easy**, or **Unreviewed** (never
studied), based on each question’s **last** recall rating only—not a full
history of past ratings. These numbers are derived from stored study progress on
each visit; they are not saved as separate counters. Node.js has 60 study
questions; React and Angular each have 40.

The page also shows up to three categories with the lowest accumulated quiz
accuracy once each has at least two encountered questions. When Study exists for
that topic, those categories link to category study sessions. Quiz performance
is stored separately and does not change study progress.

## Node.js coding challenges

1. From the Node.js topic page, choose **Practice coding challenges**.
2. Browse the six challenges and open one.
3. Read the prompt, requirements, starter code, and review checklist.
4. Solve the challenge in a local editor.
5. Click **Reveal solution** to compare against a reference implementation.

The application does not execute, compile, or judge candidate code. Coding
challenges do not change study progress or quiz performance.

## Current topic catalog

- **Node.js:** available with Study, Test, and Practice.
- **React:** available with Study, Test, and Category Performance.
- **Angular:** available with Study, Test, and Category Performance.

Users study curated active-recall banks in the browser on their own device,
without signing in. Study progress survives page reloads via browser
LocalStorage. Node.js has **60** study questions across 9 categories; React and
Angular each have **40** across 8 categories. Node.js, React, and Angular each
offer a timed multiple-choice quiz from a separate bank of **20 questions**;
each attempt samples 10.

The home page lists all known topics and each links to its topic page. Node.js
links to due review, quiz, challenges, and per-category study. React and
Angular link to due review, quiz, per-category study, and quiz-driven category
study links.

## Language

The interface and technical content can be used in **English** or **Portuguese**. A header selector (**EN | PT**) is available on every page. The choice is stored in the browser under `interview-forge:locale` and defaults to English.

**What locale changes:** UI labels, category display names, recall-rating button text, and bilingual technical fields (study questions and answers, quiz stems and options, coding-challenge titles, prompts, requirements, and review checklists).

**What stays the same across languages:** question, quiz, and challenge **IDs**; category **slugs**; recall-rating **values** stored in progress; review **scheduling** and due selection; **study progress** and **quiz performance** in LocalStorage; routes and URLs; quiz **correctOption** indices; timers and in-session UI state (current item, revealed answer, selected option); coding-challenge **starter code** and **reference solution**.

Switching EN ↔ PT during an active study session, quiz attempt, or challenge view updates visible text only—the same item stays on screen and persisted data is untouched.

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
- React or Angular coding challenges
- Mock interviews or coding execution environments
- AI evaluation of answers
- Analytics or gamification
- Cross-device sync

These may appear in future stories; they are not part of the shipped experience today.
