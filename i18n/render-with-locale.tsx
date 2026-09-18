import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

import { LocaleProvider } from "@/components/LocaleProvider";
import type { Locale } from "./locale";
import { saveLocale } from "./local-storage-locale";

export function renderWithLocale(
  ui: ReactElement,
  locale: Locale = "en",
  options?: Omit<RenderOptions, "wrapper">,
) {
  saveLocale(locale);

  return render(ui, {
    ...options,
    wrapper: LocaleProvider,
  });
}
