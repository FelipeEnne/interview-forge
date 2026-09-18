# Story 009 — Study by category

## Story statement

As a candidate, I want to study questions from a specific category so that I can focus on one technical area at a time.

## Behavior delivered

- The Node.js topic page offers due review and all eight typed categories.
- Selecting a category opens a dedicated, reload-safe URL and starts a session containing only that category's questions.
- Category practice includes every question in the selected category regardless of `nextReviewAt`.
- Existing recall priority orders category questions using current LocalStorage progress.
- **Study again** remains in the category, re-reads progress, and rebuilds a complete category queue.
- Session summaries and persisted progress cover only the questions reviewed in that category session.
- Study pages provide a simple link back to the Node.js topic page.
- Unknown topic and category slugs return not found.

## Main technical decisions

- Due review and manual category practice are separate product flows: scheduling chooses due-review content, while the user chooses category-practice content.
- `/topics/nodejs` is the topic overview, `/topics/nodejs/study` is due review, and `/topics/nodejs/categories/[category]` is category practice.
- The category route validates against `QUESTION_CATEGORY_LABELS` and filters `NODEJS_TOPIC.questions` directly. A separate domain filtering function was not justified for one explicit use.
- `TopicStudySession` accepts a small session mode. Both modes use `orderQuestionsForStudy`; only due review uses `getDueQuestions`.
- Ratings, scheduling, `QuestionProgress`, question ids, and the LocalStorage format remain unchanged.

## Tests added or changed

- `components/TopicStudySession.test.tsx` covers practice sessions ignoring due dates, retaining all supplied questions, ordering by recall priority, and rebuilding correctly on **Study again**.
- `app/topics/[topic]/page.test.tsx` covers the due-review link, all category labels and links, and unknown topics.
- `app/topics/[topic]/categories/[category]/page.test.tsx` covers category-only study, summary total, persistence, return navigation, and unknown categories.
- Existing component and domain tests continue to cover due selection, ratings, scheduling, ordering, summaries, and LocalStorage.

## Explicitly out of scope

- Multiple category selection or combined filters
- Weak-category detection, category statistics, or category progress summaries
- Difficulty, tags, search, quizzes, timers, or randomization
- Coding challenges, backend persistence, authentication, or cross-device sync
- Adaptive scheduling such as FSRS or SM-2
- A generalized topic registry or navigation dashboard

## Final status

**Completed.**
