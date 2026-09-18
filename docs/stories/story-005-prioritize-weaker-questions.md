# Story 005 — Prioritize weaker questions

## Story statement

As a candidate, I want weaker questions to be prioritized in a new study session so that I spend more time on concepts I have difficulty remembering.

## Behavior delivered

- A new study session presents every topic question exactly once (no duplicates, none omitted).
- Weaker items appear earlier in the queue based on persisted `lastRating`.
- On first visit with no progress, questions keep their original topic order.
- After hydration, the user briefly sees **Preparing study session...** while the client builds the queue from LocalStorage.

## Priority rule

Sort key uses `lastRating` from persisted progress (via `orderQuestionsForStudy` in `domain/question-order.ts`):

1. **Again**
2. **Hard**
3. **Unreviewed** (no progress entry for that question id)
4. **Good**
5. **Easy**

Progress entries whose question id is not in the current topic list do not affect ordering. `reviewCount` does not change priority.

## Stable ordering

- Ordering is deterministic for a given question list and progress snapshot.
- Questions with the same priority keep their original topic order (stable sort by source index).
- The function returns a new array and does not mutate the input questions or progress objects.

## Session queue behavior

- The queue is computed when the session starts (client `useEffect` after mount).
- While the session is active, the queue stays fixed: advancing uses `currentIndex` only.
- Ratings during the session update LocalStorage and `SessionRatings`, but they do **not** reorder the current queue.
- Persisted progress is **not** held as a full React state object; only the resulting `sessionQuestions` array is stored in component state.

## Study again behavior

- **Study again** reads the latest progress from LocalStorage, builds a fresh queue with `orderQuestionsForStudy`, and resets session UI state (index, answer visibility, `SessionRatings`, completion flag).
- Persisted progress from the finished session is retained and reflected in the new order.

## Relevant domain decision

- Pure ordering logic lives in `domain/question-order.ts`, separate from UI and storage I/O.
- `TopicStudySession` calls `readQuestionProgress()` at queue creation time and passes the snapshot into the domain function rather than mirroring all progress in React state.

## Tests added

- `domain/question-order.test.ts` — original order with empty progress; full priority ladder with ties; unknown progress ids ignored; inputs not mutated.
- `components/TopicStudySession.test.tsx` — session starts on a weaker question when progress says so; **Study again** recomputes priority after new ratings.

## Explicitly out of scope

- `nextReviewAt`, `lastReviewedAt`, scheduling, intervals, SM-2, FSRS, due queues
- Intra-session repetition (re-asking the same question in one pass)
- Scores or analytics beyond session summary counts
- Backend or cross-device sync
- Using `reviewCount` in sort priority or UI

## Final status

**Completed.**
