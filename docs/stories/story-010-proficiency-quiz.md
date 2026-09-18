# Story 010 — Node.js proficiency quiz

## Story statement

As a candidate, I want to take a timed Node.js proficiency quiz so that I can practice answering technical questions under conditions similar to an assessment.

## Behavior delivered

- The Node.js topic page links to a proficiency quiz at `/topics/nodejs/quiz`.
- Intro copy states **10 questions** and **8 minutes** before **Start quiz**.
- Starting the quiz samples 10 unique questions from a 20-question multiple-choice bank.
- Each question has four fixed-order options; the user must select one before **Next**.
- Navigation is forward-only. The last question uses **Finish quiz**.
- A countdown starts only after **Start quiz** (or **Try again**) and ends the attempt at 00:00.
- Selected answers are kept even if time expires before **Next**. Unanswered questions count as incorrect.
- The result shows correct/total, percentage, and a per-category breakdown for the attempt.
- **Try again** starts a new in-memory attempt. **Back to Node.js** returns to the topic page.
- Quiz scoring does not read or write study progress, ratings, or scheduling.

## Content distribution

20 authored quiz questions:

- Fundamentals: 2
- Event Loop & Async: 4
- Modules: 2
- HTTP & APIs: 3
- Express: 2
- Streams & Buffers: 2
- Testing: 2
- Security: 3

Error handling appears across async, Express, HTTP, and streams rather than as a separate category.

## Main technical decisions

- `InterviewQuestion` stays the study model. `QuizQuestion` is a separate type with `options` and `correctOption`.
- Quiz content lives in `data/nodejs-quiz-questions.ts` and reuses `QuestionCategory`.
- `selectQuizQuestions` shuffles a copy with an injected `randomSource` (default `Math.random`) and slices 10 items.
- `calculateQuizResult` scores the full attempt and aggregates only categories present in that attempt.
- One route and one client component own intro, attempt, and result phases.
- Remaining time is derived from a deadline so tests can use fake timers.
- Option order is authored and not randomized.

## Tests added or changed

- `data/nodejs-quiz-questions.test.ts` verifies count, unique ids, valid categories, four options, and a valid correct index.
- `domain/quiz.test.ts` verifies selection size, uniqueness, reproducibility, immutability, scoring, unanswered-as-incorrect, and category breakdown.
- `components/NodejsQuiz.test.tsx` covers intro, start, linear advance, disabled **Next**, finish, timer expiry, result, and **Try again**.
- `app/topics/[topic]/page.test.tsx` covers the quiz entry link.
- `app/topics/[topic]/quiz/page.test.tsx` covers the intro composition and unknown topics.

## Explicitly out of scope

- Quiz history, LocalStorage, ranking, pass/fail, or certification
- Persistent weak-category analysis
- Difficulty, adaptive selection, category quotas, or option shuffling
- Explanations after each question, Previous, or a question navigator
- A generic quiz framework, extra result route, backend, authentication, or AI
- Changes to recall ratings, due review, or study progress

## Final status

**Completed.**
