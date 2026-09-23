import type { CategoryDefinition } from "@/data/category-types";

export const ANGULAR_QUESTION_CATEGORIES = [
  "components",
  "templates",
  "services-di",
  "observables",
  "forms",
  "routing",
  "http",
  "testing",
] as const;

export type AngularQuestionCategory =
  (typeof ANGULAR_QUESTION_CATEGORIES)[number];

export const ANGULAR_CATEGORIES: readonly CategoryDefinition<AngularQuestionCategory>[] = [
  {
    id: "components",
    displayName: {
      en: "Components & Rendering",
      pt: "Componentes e Renderização",
    },
  },
  {
    id: "templates",
    displayName: {
      en: "Templates & Control Flow",
      pt: "Templates e Fluxo de Controle",
    },
  },
  {
    id: "services-di",
    displayName: {
      en: "Services & Dependency Injection",
      pt: "Services e Injeção de Dependências",
    },
  },
  {
    id: "observables",
    displayName: { en: "Observables & RxJS", pt: "Observables e RxJS" },
  },
  { id: "forms", displayName: { en: "Forms", pt: "Formulários" } },
  { id: "routing", displayName: { en: "Routing", pt: "Roteamento" } },
  { id: "http", displayName: { en: "HTTP", pt: "HTTP" } },
  {
    id: "testing",
    displayName: { en: "Testing & Architecture", pt: "Testes e Arquitetura" },
  },
];
