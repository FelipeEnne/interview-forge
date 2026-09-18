# Story 003 — Session summary

## Story statement

When I finish rating every question in a session, I want a summary of my recall ratings and a way to start another session.

## Behavior delivered

- After rating the last question, the UI shows **Session complete**, total questions reviewed, and counts per rating (Again, Hard, Good, Easy).
- Study content (questions, answers, **Show answer**, rating buttons) is hidden on the summary view.
- **Study again** clears in-session ratings and restarts from the first question in a newly built queue (answer hidden).

## Main technical decisions

- `countSessionRatings` in `domain/recall-rating.ts` aggregates `SessionRatings` for the summary.
- Completion is driven by rating the last item in the current session queue, not by a separate timer or step counter UI.

## Tests added

- `domain/recall-rating.test.ts` — count totals and per-rating buckets.
- `components/TopicStudySession.test.tsx` — summary after last rating, correct counts, hidden study UI, **Study again** restarts flow and resets session rating counts for the new pass.

## Explicitly out of scope

- Persisting history across browser sessions (Story 4).
- Export or share summary.
- Historical analytics beyond the current session.

## Final status

**Completed.**
