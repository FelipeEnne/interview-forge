import type { StudyCategoryDefinition } from "./study-types";

export const QUESTION_CATEGORIES = [
  "fundamentals",
  "async",
  "modules",
  "http",
  "express",
  "streams",
  "testing",
  "security",
  "production",
] as const;

export type QuestionCategory = (typeof QUESTION_CATEGORIES)[number];

export const NODEJS_CATEGORIES: readonly StudyCategoryDefinition<QuestionCategory>[] =
  [
    {
      id: "fundamentals",
      displayName: { en: "Fundamentals", pt: "Fundamentos" },
    },
    {
      id: "async",
      displayName: {
        en: "Event Loop & Async",
        pt: "Event Loop e Assincronismo",
      },
    },
    { id: "modules", displayName: { en: "Modules", pt: "Módulos" } },
    { id: "http", displayName: { en: "HTTP & APIs", pt: "HTTP e APIs" } },
    { id: "express", displayName: { en: "Express", pt: "Express" } },
    {
      id: "streams",
      displayName: { en: "Streams & Buffers", pt: "Streams e Buffers" },
    },
    { id: "testing", displayName: { en: "Testing", pt: "Testes" } },
    { id: "security", displayName: { en: "Security", pt: "Segurança" } },
    {
      id: "production",
      displayName: {
        en: "Production & Architecture",
        pt: "Produção e Arquitetura",
      },
    },
  ];

export function isQuestionCategory(
  value: string,
): value is QuestionCategory {
  return (QUESTION_CATEGORIES as readonly string[]).includes(value);
}

export function getNodejsCategory(
  id: QuestionCategory,
): StudyCategoryDefinition<QuestionCategory> {
  return NODEJS_CATEGORIES.find((category) => category.id === id)!;
}
