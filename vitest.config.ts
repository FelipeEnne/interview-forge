import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    pool: "forks",
    isolate: true,
    poolOptions: {
      forks: {
        execArgv: [
          "--require",
          path.join(import.meta.dirname, "vitest.monotonic-now.cjs"),
        ],
      },
    },
    sequence: {
      hooks: "stack",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
