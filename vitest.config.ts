import path from "node:path";
import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig, type Plugin } from "vitest/config";

const monotonicNow = path.join(import.meta.dirname, "vitest.monotonic-now.cjs");

const generatedExclude = ["**/.next/**"];

const localStorageDomTests = [
  "**/local-storage.test.ts",
  "**/local-storage-*.test.ts",
];

// plugin-react 6 is typed for Vite 8; Vitest 3.2 still types plugins against Vite 7.
const reactPlugins = react() as unknown as Plugin[];

export default defineConfig({
  plugins: reactPlugins,
  test: {
    sequence: {
      hooks: "stack",
    },
    pool: "forks",
    poolOptions: {
      forks: {
        execArgv: ["--require", monotonicNow],
      },
      threads: {
        isolate: false,
      },
    },
    // Node tests skip jsdom and Testing Library; DOM tests keep isolated forks
    // so Date.now stays aligned with performance.now for React 19.
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["**/*.test.ts"],
          exclude: [
            ...configDefaults.exclude,
            ...generatedExclude,
            ...localStorageDomTests,
          ],
          environment: "node",
          setupFiles: [],
          isolate: false,
          pool: "threads",
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          include: ["**/*.test.tsx", ...localStorageDomTests],
          exclude: [...configDefaults.exclude, ...generatedExclude],
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
          isolate: true,
          pool: "forks",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
