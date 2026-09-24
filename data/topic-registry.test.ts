/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { TOPICS, getTopicById } from "@/data/topic-registry";

describe("topic registry", () => {
  it.each([
    ["nodejs", "available"],
    ["react", "available"],
    ["angular", "available"],
  ] as const)("resolves %s with its status", (id, status) => {
    expect(getTopicById(id)).toMatchObject({ id, status });
  });

  it("does not resolve an unknown slug", () => {
    expect(getTopicById("unknown")).toBeUndefined();
  });

  it("keeps the catalog in presentation order", () => {
    expect(TOPICS.map(({ id }) => id)).toEqual(["nodejs", "react", "angular"]);
  });
});
