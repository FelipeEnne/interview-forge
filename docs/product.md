# Product

**Status:** Multi-topic foundation with a complete Node.js topic, a React proficiency quiz, Angular coming soon, and English/Portuguese presentation.

## Purpose

InterviewForge is a personal web app for preparing for technical interviews by topic. It focuses on active recall: reading a question, trying to answer mentally, revealing the reference answer, and self-rating how well you remembered it. Node.js is currently the complete topic. React offers a short timed proficiency quiz and category performance without an active-recall bank. Angular is recognized as an upcoming topic without content. Node.js also offers a small bank of coding challenges for implementation practice without running candidate code.

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

The Node.js topic page shows a **Progress** summary for the 60 active-recall
questions: how many are memorized (latest self-rating **Good** or **Easy**),
how many remain, and a simple progress bar. A compact breakdown lists how many
questions are currently **Again**, **Hard**, **Good**, **Easy**, or
**Unreviewed** (never studied), based on each question’s **last** recall rating
only—not a full history of past ratings. These numbers are derived from stored
study progress on each visit; they are not saved as separate counters.

The page also shows up to three categories with the lowest accumulated quiz
accuracy once each has at least two encountered questions. Node.js categories
link directly to their existing study sessions. React has no Study capability,
so its performance shows category names and accuracy without study links. Quiz
performance is stored separately and does not change study progress.

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
- **React:** available with Test and Category Performance.
- **Angular:** coming soon; proficiency-quiz content is planned for Story 021.

The current usable flow is a single user studying a curated bank of **60 Node.js questions across 9 categories** in the browser, on their own device, without signing in. Study progress survives page reloads via browser LocalStorage. Node.js and React each offer a timed multiple-choice quiz from a separate bank of **20 questions**; each attempt samples 10.

The home page lists all known topics. Node.js and React link to their topic pages; Angular is visibly marked **Coming soon**. The Node.js topic page links to due review at `/topics/nodejs/study`, the proficiency quiz at `/topics/nodejs/quiz`, coding challenges at `/topics/nodejs/challenges`, manual practice for each category, and category practice from accumulated quiz performance. The React topic page links to `/topics/react/quiz` and shows category performance without study links.

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
- React active-recall content or coding challenges
- Angular content banks, quizzes, or coding challenges
- Mock interviews or coding execution environments
- AI evaluation of answers
- Analytics or gamification
- Cross-device sync

These may appear in future stories; they are not part of the shipped experience today.
