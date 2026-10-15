import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { LOCALE_STORAGE_KEY } from "@/i18n/locale";
import { useLocale, useTranslations } from "./LocaleProvider";

function LocaleProbe() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslations();

  return (
    <div>
      <p>{locale}</p>
      <p>{t("progress")}</p>
      <button type="button" onClick={() => setLocale("pt")}>
        Switch
      </button>
    </div>
  );
}

describe("LocaleProvider fallbacks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to English and ignores setLocale outside the provider", async () => {
    const user = userEvent.setup({ delay: null });
    render(<LocaleProbe />);

    expect(screen.getByText("en")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Switch" }));

    expect(screen.getByText("en")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull();
  });
});
