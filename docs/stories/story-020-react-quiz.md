# Story 020 — React Proficiency Quiz

## Story statement

As a candidate, I want to assess my React knowledge with a short proficiency
quiz so that I can identify weaker React categories without requiring an
active-recall bank.

## Behavior delivered

- React is available from the topic catalog and opens `/topics/react`.
- React offers a timed proficiency quiz at `/topics/react/quiz`.
- The React bank has 20 bilingual multiple-choice questions across eight
  categories. An attempt selects 10 questions and lasts eight minutes.
- Correct option positions are balanced evenly across the bank, and question
  ids use the stable `react-quiz-` prefix.
- Completed React attempts accumulate per-category performance under
  `interview-forge:quiz-attempts:react`.
- The React overview shows the proficiency quiz and, once there is enough
  performance evidence, the weakest categories with their accuracy.
- React performance does not include study links because React has no Study
  capability in this story.
- React Study, category study, study progress, due review, and coding
  challenges remain unavailable and their routes return not found.
- Node.js behavior and its historical quiz-performance storage key remain
  unchanged. Angular remains coming soon.

## Main technical decisions

- React quiz content is topic-owned under `data/topics/react/` and is resolved
  through the existing `getQuizTopicById` resolver.
- React uses the existing `QuizTopicData`, `TopicQuiz`, `TopicOverview`, and
  `CategoryPerformance` implementations. No capability flags or topic-specific
  components were added.
- The registry records React as `available`; resolver presence continues to
  determine each capability shown in the UI.

## Tests added or changed

- Data tests validate the React categories, question count, distribution,
  bilingual content, option count, correct-option balance, and global quiz-id
  uniqueness against Node.js.
- Resolver, catalog, overview, route, persistence, and unavailable-capability
  tests cover React while preserving Angular and Node.js expectations.

## Explicitly out of scope

- React active recall, study progress, due review, and category study
- React coding challenges
- Angular quiz content
- New quiz engines, capability flags, persistence formats, or dependencies

## Final status

**Completed.**
