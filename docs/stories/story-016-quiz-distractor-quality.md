# Story 016 — Quiz distractor quality

## Story statement

As a candidate, I want quiz alternatives to be equally plausible in presentation so that answering correctly requires technical knowledge rather than recognizing formatting patterns.

## Behavior delivered

- The 20 Node.js quiz questions keep the same IDs, categories, bilingual `LocalizedText` fields, and four options each.
- Options in English and Portuguese are rewritten so the correct answer is not identifiable from length, specificity, or writing style.
- Distractors stay in the same conceptual domain and represent plausible technical mistakes.
- `correctOption` still points to the same factual answer. Some indices changed only because options were reordered.
- Authored `correctOption` values are spread evenly: five questions each for indices 0, 1, 2, and 3.
- Existing quiz performance, study progress, routes, selection of 10 questions, timer, and scoring stay unchanged.

## Main technical decisions

- Editorial rewrite of the existing bank, not new questions or a second bank.
- Option order remains authored. Runtime shuffling was not added; the position bias is corrected by reordering options in the data.
- Portuguese options follow the English structure and level of detail. They are not a translation that reintroduces a length or specificity cue.
- A data-test heuristic flags only clear length outliers: the correct option is longer than the longest distractor by a 1.6 ratio **and** at least 25 characters, checked separately for `en` and `pt`. The heuristic does not require similar character counts and must not be satisfied by padding.

## Tests added or changed

- `data/nodejs-quiz-questions.test.ts` still requires 20 questions, preserved IDs, four bilingual options, and a valid `correctOption`.
- The same file covers the length-outlier predicate with synthetic fixtures and asserts that the live bank has no outliers in English or Portuguese.
- The same file requires `correctOption` to appear exactly five times at each index.

## Explicitly out of scope

- New quiz questions or expanding the bank from 20 to 40
- Adaptive selection, difficulty, or explanations after answering
- Runtime option randomization
- Changes to question selection, timer, score, quiz performance, or LocalStorage
- AI, backend, or a generic quiz authoring tool

## Final status

**Completed.**
