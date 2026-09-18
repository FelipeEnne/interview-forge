import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { LanguageSelector } from "./LanguageSelector";
import { LocaleProvider } from "./LocaleProvider";
import { getCategoryLabel } from "@/i18n/translations";
import { renderWithLocale } from "@/i18n/render-with-locale";
import type { CodingChallenge } from "@/data/nodejs-coding-challenges";
import { NodejsCodingChallenge } from "./NodejsCodingChallenge";

const challenge: CodingChallenge = {
  id: "sample-challenge",
  title: {
    en: "Sample challenge",
    pt: "Desafio de exemplo",
  },
  category: "async",
  prompt: {
    en: "Write a function that retries a failed async call.",
    pt: "Escreva uma função que retenta uma chamada async que falhou.",
  },
  requirements: [
    {
      en: "Retry a limited number of times.",
      pt: "Retente um número limitado de vezes.",
    },
    {
      en: "Reject with the last error.",
      pt: "Rejeite com o último erro.",
    },
  ],
  starterCode: "export async function retry(fn) {}",
  referenceSolution: "export async function retry(fn) { return fn(); }",
  reviewChecklist: [
    {
      en: "Uses async/await.",
      pt: "Usa async/await.",
    },
    {
      en: "Does not block the event loop.",
      pt: "Não bloqueia o Event Loop.",
    },
  ],
};

describe("NodejsCodingChallenge", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("shows the prompt, starter code, and checklist before revealing the solution", () => {
    render(
      <NodejsCodingChallenge
        challenge={challenge}
        backLink={{ href: "/topics/nodejs/challenges" }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: challenge.title.en }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(getCategoryLabel("en", challenge.category)),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.prompt.en)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Requirements" })).toBeInTheDocument();
    expect(screen.getByText("Retry a limited number of times.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter code" })).toBeInTheDocument();
    expect(screen.getByText(challenge.starterCode)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Review checklist" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Uses async/await.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reveal solution" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Reference solution" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(challenge.referenceSolution),
    ).not.toBeInTheDocument();
  });

  it("reveals the reference solution when requested", async () => {
    const user = userEvent.setup();

    render(
      <NodejsCodingChallenge
        challenge={challenge}
        backLink={{ href: "/topics/nodejs/challenges" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Reveal solution" }));

    expect(
      screen.getByRole("heading", { name: "Reference solution" }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.referenceSolution)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Reveal solution" }),
    ).not.toBeInTheDocument();
  });

  it("translates challenge chrome and technical text to Portuguese", async () => {
    renderWithLocale(
      <NodejsCodingChallenge
        challenge={challenge}
        backLink={{ href: "/topics/nodejs/challenges" }}
      />,
      "pt",
    );

    expect(
      await screen.findByRole("heading", { name: "Desafio de exemplo" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Requisitos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar para os desafios" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Event Loop e Assincronismo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Código inicial" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Checklist de revisão" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Revelar solução" }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.prompt.pt)).toBeInTheDocument();
    expect(screen.getByText("Retente um número limitado de vezes.")).toBeInTheDocument();
    expect(screen.getByText(challenge.starterCode)).toBeInTheDocument();
    expect(screen.getByText("Usa async/await.")).toBeInTheDocument();
  });

  it("keeps starter code, revealed solution, and the current challenge when switching language", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <LocaleProvider>
        <LanguageSelector />
        <NodejsCodingChallenge
          challenge={challenge}
          backLink={{ href: "/topics/nodejs/challenges" }}
        />
      </LocaleProvider>,
    );

    expect(screen.getByRole("heading", { name: "Sample challenge" })).toBeInTheDocument();
    expect(screen.getByText(challenge.starterCode)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reveal solution" }));
    expect(screen.getByText(challenge.referenceSolution)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "PT" }));

    expect(
      screen.getByRole("heading", { name: "Desafio de exemplo" }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.prompt.pt)).toBeInTheDocument();
    expect(screen.getByText("Retente um número limitado de vezes.")).toBeInTheDocument();
    expect(screen.getByText(challenge.starterCode)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Solução de referência" }),
    ).toBeInTheDocument();
    expect(screen.getByText(challenge.referenceSolution)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Revelar solução" }),
    ).not.toBeInTheDocument();
  });
});
