import type { CategoryDefinition } from "@/data/category-types";

export const REACT_QUESTION_CATEGORIES = [
  "fundamentals",
  "state",
  "hooks",
  "rendering",
  "forms",
  "shared-state",
  "performance",
  "testing",
] as const;

export type ReactQuestionCategory = (typeof REACT_QUESTION_CATEGORIES)[number];

export const REACT_CATEGORIES: readonly CategoryDefinition<ReactQuestionCategory>[] =
  [
    {
      id: "fundamentals",
      displayName: {
        en: "Fundamentals & Composition",
        pt: "Fundamentos e Composição",
      },
    },
    {
      id: "state",
      displayName: { en: "State & Updates", pt: "State e Updates" },
    },
    {
      id: "hooks",
      displayName: { en: "Hooks & Effects", pt: "Hooks e Effects" },
    },
    {
      id: "rendering",
      displayName: {
        en: "Rendering & Identity",
        pt: "Renderização e Identidade",
      },
    },
    { id: "forms", displayName: { en: "Forms", pt: "Formulários" } },
    {
      id: "shared-state",
      displayName: { en: "Shared State", pt: "State Compartilhado" },
    },
    {
      id: "performance",
      displayName: {
        en: "Performance & Responsiveness",
        pt: "Performance e Responsividade",
      },
    },
    { id: "testing", displayName: { en: "Testing", pt: "Testes" } },
  ];
