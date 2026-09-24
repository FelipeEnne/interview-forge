# Architecture

Architecture after the multi-topic capability refactor: the topic registry recognizes Node.js, React, and Angular, while content is resolved independently for Study, Quiz, and Challenges. Node.js is the only topic with content today. React and Angular remain localized coming-soon topics until a capability receives a real bank.

## Current stack

| Layer     | Choice                         |
| --------- | ------------------------------ |
| Framework | Next.js 16 (App Router)        |
| UI        | React 19, TypeScript           |
| Styling   | CSS Modules                    |
| Tests     | Vitest, Testing Library, jsdom |
| Lint      | ESLint (`eslint-config-next`)  |

## Topic data and capabilities

`data/topic-registry.ts` owns stable topic ids, localized display names, and catalog status only. It never imports content banks.

Each capability has a separate resolver:

| Resolver                | Content                                                |
| ----------------------- | ------------------------------------------------------ |
| `getStudyTopicById`     | Categories and active-recall questions                 |
| `getQuizTopicById`      | Categories, quiz questions, attempt size, and duration |
| `getChallengeTopicById` | Categories and coding challenges                       |

A missing resolver result means that capability is unavailable. No capability flags, factories, repositories, or aggregate topic object are needed.

Node.js content is organized under `data/topics/nodejs/`:

```text
data/
├── category-types.ts
├── study-types.ts
├── study-topics.ts
├── quiz-types.ts
├── quiz-topics.ts
├── challenge-types.ts
├── challenge-topics.ts
├── topic-registry.ts
└── topics/nodejs/
    ├── categories.ts
    ├── questions.ts
    ├── quiz-questions.ts
    └── coding-challenges.ts
```

`CategoryDefinition<CategoryId>` contains an id and localized display name. `InterviewQuestion`, `QuizQuestion`, and `CodingChallenge` are separate generic content models. A topic-specific category union stays inside its own data module; the application does not define a global union of every technology's category ids.

## Components

Interactive capability components are grouped by responsibility:

```text
components/
├── study/TopicStudySession.tsx
├── study/StudyProgress.tsx
├── quiz/TopicQuiz.tsx
├── quiz/CategoryPerformance.tsx
└── challenges/
    ├── ChallengesList.tsx
    ├── CodingChallenge.tsx
    └── RevealSolution.tsx
```

`TopicStudySession` and `StudyProgress` receive topic-owned questions and categories. `TopicQuiz` receives `QuizTopicData`, samples questions with Fisher-Yates, uses a deadline-based timer, scores attempts, and persists only category aggregates. `CategoryPerformance` is a visual component: it receives an aggregate and category definitions, then ranks the lowest accuracies using the supplied category order. `TopicOverview` is the small client-side adapter that reads the aggregate after hydration and passes it to that component.

`CodingChallenge` receives a challenge and its category definition. `ChallengesList` receives a challenge topic. `RevealSolution` only controls visibility of a supplied reference solution. None of these engines import Node.js data or category labels.

## Routes

The App Router remains shared by every topic:

```text
/topics/[topic]
/topics/[topic]/study
/topics/[topic]/categories/[category]
/topics/[topic]/quiz
/topics/[topic]/challenges
/topics/[topic]/challenges/[challenge]
```

Server pages await route params, resolve the relevant capability, and call `notFound()` for unknown topics, invalid child ids, or unavailable capabilities. `TopicOverview` receives optional capability data and conditionally renders Study, Quiz, Performance, and Challenges. Performance shows category-study links only when Study exists.

## Internationalization

`LocaleProvider` owns the active `Locale` and exposes `localize`, which resolves `LocalizedText` at render time. UI strings remain in `i18n/translations.ts`. Category display names are content owned by each topic and are localized from `CategoryDefinition.displayName`; shared engines do not call a Node.js category helper.

Technical content and UI update when the locale changes without rebuilding queues, quiz attempts, timers, selected answers, or revealed solutions.

## Persistence

Study progress remains a flat LocalStorage map under `interview-forge:question-progress`, keyed by globally unique question ids. Existing Node.js study ids and scheduling behavior are unchanged.

Quiz performance is a bounded per-category aggregate. The Node.js historical key remains canonical:

```text
Node.js: interview-forge:quiz-attempts
Other topics: interview-forge:quiz-attempts:<topicId>
```

`readQuizPerformance(topicId, categoryIds)` validates category ids against the caller's topic definitions. `saveQuizPerformance(topicId, performance)` writes the complete aggregate. This preserves existing Node.js data without migration and prevents category slug collisions between topics.

## Domain rules

The domain keeps pure rules for recall ratings, scheduling, due filtering, ordering, progress, quiz sampling, quiz scoring, and quiz performance. Quiz selection is generic over question shape. Scoring and performance aggregation are generic over category ids; category order is supplied to rank exact accuracy ties.

Quiz attempt configuration is content data, not a domain constant. Node.js currently configures 10 questions per attempt and an 8-minute duration.

## Testing strategy

Data tests protect the complete Node.js banks: 60 active-recall questions, nine categories, 20 quiz questions with balanced correct-option positions, and six challenges. Existing behavioral tests cover study scheduling, quiz flow, timeout, retry, LocalStorage, EN/PT, routes, and reveal behavior.

Shared-engine tests use small non-Node fixtures: Quiz uses `hooks` and `state`, Category Performance receives supplied generic category definitions, and Coding Challenge renders a fictitious React-shaped challenge. Persistence tests prove the Node.js legacy key, topic-specific keys, and isolation for matching category slugs.
