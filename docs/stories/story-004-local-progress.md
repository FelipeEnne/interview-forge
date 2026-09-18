# Story 004 — Local progress persistence

## Story statement

As I study over multiple days, I want my latest recall rating and review count saved on my device so progress survives reloads without an account.

## Behavior delivered

- Each rating updates LocalStorage with `lastRating` and incremented `reviewCount` for that question id.
- **Study again** keeps persisted progress; a second rating on the same question increases `reviewCount`.
- Invalid or corrupted storage is treated as empty state on read (strict validation).

## Main technical decisions

- Storage key: `interview-forge:question-progress`.
- Pure update logic in `recordQuestionProgress`; read/write and JSON validation in `local-storage-progress.ts`.
- Persistence runs in the client study component immediately after each rating.

## Tests added

- `domain/question-progress.test.ts` — first review, increment on re-rate, separate questions.
- `domain/local-storage-progress.test.ts` — empty/invalid payloads, round-trip save/read.
- `components/TopicStudySession.test.tsx` — writes on rate, preserves progress after **Study again** with updated `reviewCount`.

## Explicitly out of scope (at Story 4 scope)

- Server or database sync.
- Cross-browser migration or export.
- Reordering study sessions by weakness (Story 5).
- Using `reviewCount` in UI or scheduling (field stored for later stories).

## Final status

**Completed.**
