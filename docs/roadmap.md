# Roadmap

Stories are delivered incrementally. Details for completed work live under `docs/stories/`.

## Completed

| Story | Title |
| --- | --- |
| 1 | Browse questions by topic |
| 2 | Rate recall |
| 3 | Session summary |
| 4 | Local progress persistence |

## Next

Planned direction (not fully specified until each story is written):

| Item | Notes |
| --- | --- |
| Story 5 — Prioritize weaker questions | Product intent: surface weaker items earlier using persisted ratings. **Note:** `orderQuestionsForStudy` already reorders sessions by `lastRating`; any remaining Story 5 scope should be defined against that baseline (e.g. UX, `reviewCount`, or scheduling). |
| Scheduling | When-to-review logic (beyond manual study sessions). |
| Spaced repetition | Intervals and due dates; not started. |
| Additional topics | More question banks and topic navigation. |
| Quizzes | Structured assessment flows. |
| Coding challenges | Practice with executable code; out of scope today. |

Future items are placeholders only—implement when a dedicated story requires them.
