# Story 021 — Angular Proficiency Quiz

## Story statement

As a candidate, I want to assess my Angular knowledge with a short proficiency
quiz so that I can identify weaker Angular categories without requiring an
active-recall bank.

## Behavior delivered

- Angular is available from the topic catalog and opens `/topics/angular`.
- Angular offers a timed proficiency quiz at `/topics/angular/quiz`.
- The Angular bank has 20 bilingual multiple-choice questions across eight
  categories. An attempt selects 10 questions and lasts eight minutes.
- Correct option positions are balanced evenly across the bank, and question
  ids use the stable `angular-quiz-` prefix.
- Completed Angular attempts accumulate per-category performance under
  `interview-forge:quiz-attempts:angular`.
- The Angular overview shows the proficiency quiz and, once there is enough
  performance evidence, the weakest categories with their accuracy.
- Angular performance does not include study links because Angular has no Study
  capability in this story.
- Angular Study, category study, study progress, due review, and coding
  challenges remain unavailable and their routes return not found.
- Node.js and React behavior remain unchanged.

## Main technical decisions

- Angular quiz content is topic-owned under `data/topics/angular/` and is
  resolved through the existing `getQuizTopicById` resolver.
- Angular uses the existing `QuizTopicData`, `TopicQuiz`, `TopicOverview`, and
  `CategoryPerformance` implementations. No capability flags or topic-specific
  components were added.
- The bank favors current Angular concepts, including standalone components,
  `@for`, hierarchical dependency injection, functional interceptors, and
  `takeUntilDestroyed` with `DestroyRef`.
- The registry records Angular as `available`; resolver presence continues to
  determine each capability shown in the UI.

## Tests added or changed

- Data tests validate the Angular categories, question count, distribution,
  bilingual content, option count, correct-option balance, and global quiz-id
  uniqueness across Node.js, React, and Angular.
- Resolver, catalog, overview, route, persistence, and unavailable-capability
  tests cover Angular while preserving Node.js and React expectations.

## Explicitly out of scope

- Angular active recall, study progress, due review, and category study
- Angular coding challenges
- New quiz engines, capability flags, persistence formats, or dependencies

## Final status

**Completed.**
