# Story 014 — Internationalization foundation

## Story statement

As a candidate, I want to choose between English and Portuguese so that I can use InterviewForge in my preferred language.

## Behavior delivered

- A language selector in the shared header shows **EN** and **PT** on every page.
- The active language is indicated accessibly and can be changed immediately.
- All translatable UI chrome follows the selected language.
- The preference is stored in LocalStorage under `interview-forge:locale`.
- Valid values are `en` and `pt`. Missing or invalid values fall back to English.
- Reloading the app restores the saved language. Client-side navigation keeps it.
- URLs stay without a locale prefix (`/topics/nodejs`, `/topics/nodejs/study`, and so on).
- Study progress, quiz performance, IDs, category slugs, and technical content are unchanged.
- Study questions, quiz questions, and coding-challenge content remain in English.

## Main technical decisions

- A small in-repo i18n layer is used instead of `next-intl` or another library: two locales, no localized URLs, and simple pluralization do not justify extra routing infrastructure.
- `Locale` is `"en" | "pt"`. Locale parsing and LocalStorage I/O live in `i18n/`, separate from study and quiz domain modules.
- UI strings, category display names, and recall-rating labels live in `i18n/translations.ts`. Internal slugs stay `fundamentals`, `again`, and the rest.
- `QUESTION_CATEGORIES` is the canonical slug list. Display names are no longer stored beside the question bank.
- `LocaleProvider` starts in English on the server and first client render, then restores LocalStorage after hydration. A brief English flash after reload is accepted to avoid cookies, dynamic rendering, and hydration mismatches.
- The root layout remains a Server Component and composes the client header plus provider. Route pages still validate params and select data on the server; localized chrome is rendered by client views or existing client components.
- `html lang` is `en` in the server HTML and is updated on the client after restore or a language change. Metadata stays in English.

## Tests added or changed

- `i18n/locale.test.ts` and `i18n/local-storage-locale.test.ts` cover valid values, fallback, and persistence of `en`/`pt`.
- `i18n/translations.test.ts` covers a UI key in both languages, pluralization, category names, and rating labels.
- `components/LanguageSelector.test.tsx` and `components/AppHeader.test.tsx` cover the shared selector, persistence, remount restore, and `html.lang`.
- Study, quiz, performance, challenge, home, and topic tests keep English as the default and add focused Portuguese cases that leave technical content in English.

## Explicitly out of scope

- Translation of study questions, answers, quiz prompts, options, or coding-challenge content
- Locale in the URL, multilingual SEO/metadata, or browser language detection
- A third language, ICU/plural engines, cookies, backend, accounts, or preference sync
- Changes to progress, scheduling, quiz aggregates, or existing LocalStorage blobs

## Final status

**Completed.**
