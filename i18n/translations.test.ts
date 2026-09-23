/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { QUESTION_CATEGORIES } from "@/data/nodejs-questions";
import { RECALL_RATING_OPTIONS } from "@/domain/recall-rating";
import {
  formatQuestionsReviewed,
  formatStudyQuestionsRemaining,
  getCategoryLabel,
  getRatingLabel,
  translate,
} from "./translations";

describe("translate", () => {
  it("returns English for a UI key", () => {
    expect(translate("en", "showAnswer")).toBe("Show answer");
  });

  it("returns Portuguese for the same UI key", () => {
    expect(translate("pt", "showAnswer")).toBe("Mostrar resposta");
  });

  it("localizes study progress chrome", () => {
    expect(translate("en", "progress")).toBe("Progress");
    expect(translate("pt", "progress")).toBe("Progresso");
    expect(
      translate("en", "studyProgressMemorized", { memorized: 34, total: 60 }),
    ).toBe("34 / 60 memorized");
    expect(
      translate("pt", "studyProgressMemorized", { memorized: 34, total: 60 }),
    ).toBe("34 / 60 decoradas");
    expect(translate("en", "studyProgressNeedsAttention")).toBe(
      "Needs attention",
    );
    expect(translate("pt", "studyProgressNeedsAttention")).toBe(
      "Precisa de atenção",
    );
    expect(translate("en", "studyProgressMemorizedGroup")).toBe("Memorized");
    expect(translate("pt", "studyProgressMemorizedGroup")).toBe("Decoradas");
    expect(translate("en", "studyProgressUnreviewed")).toBe("Unreviewed");
    expect(translate("pt", "studyProgressUnreviewed")).toBe("Não estudadas");
  });
});

describe("formatStudyQuestionsRemaining", () => {
  it("pluralizes in English", () => {
    expect(formatStudyQuestionsRemaining("en", 1)).toBe("1 question remaining");
    expect(formatStudyQuestionsRemaining("en", 26)).toBe(
      "26 questions remaining",
    );
  });

  it("pluralizes in Portuguese", () => {
    expect(formatStudyQuestionsRemaining("pt", 1)).toBe("1 pergunta faltando");
    expect(formatStudyQuestionsRemaining("pt", 26)).toBe(
      "26 perguntas faltando",
    );
  });
});

describe("formatQuestionsReviewed", () => {
  it("pluralizes in English", () => {
    expect(formatQuestionsReviewed("en", 1)).toBe("1 question reviewed");
    expect(formatQuestionsReviewed("en", 2)).toBe("2 questions reviewed");
  });

  it("pluralizes in Portuguese", () => {
    expect(formatQuestionsReviewed("pt", 1)).toBe("1 pergunta revisada");
    expect(formatQuestionsReviewed("pt", 2)).toBe("2 perguntas revisadas");
  });
});

describe("getCategoryLabel", () => {
  it.each([
    ["fundamentals", "Fundamentals", "Fundamentos"],
    ["async", "Event Loop & Async", "Event Loop e Assincronismo"],
    ["modules", "Modules", "Módulos"],
    ["http", "HTTP & APIs", "HTTP e APIs"],
    ["express", "Express", "Express"],
    ["streams", "Streams & Buffers", "Streams e Buffers"],
    ["testing", "Testing", "Testes"],
    ["security", "Security", "Segurança"],
    ["production", "Production & Architecture", "Produção e Arquitetura"],
  ] as const)(
    "localizes the %s category",
    (category, englishLabel, portugueseLabel) => {
      expect(getCategoryLabel("en", category)).toBe(englishLabel);
      expect(getCategoryLabel("pt", category)).toBe(portugueseLabel);
    },
  );

  it("covers every canonical category", () => {
    expect(QUESTION_CATEGORIES).toHaveLength(9);
  });
});

describe("getRatingLabel", () => {
  it("localizes recall ratings", () => {
    expect(getRatingLabel("en", "again")).toBe("Again");
    expect(getRatingLabel("en", "hard")).toBe("Hard");
    expect(getRatingLabel("en", "good")).toBe("Good");
    expect(getRatingLabel("en", "easy")).toBe("Easy");
    expect(getRatingLabel("pt", "again")).toBe("Novamente");
    expect(getRatingLabel("pt", "hard")).toBe("Difícil");
    expect(getRatingLabel("pt", "good")).toBe("Bom");
    expect(getRatingLabel("pt", "easy")).toBe("Fácil");
  });

  it("covers every recall rating option", () => {
    expect(RECALL_RATING_OPTIONS).toEqual(["again", "hard", "good", "easy"]);
  });
});
