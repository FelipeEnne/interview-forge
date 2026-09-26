/** @vitest-environment node */

import { describe, expect, it } from "vitest";

import { TOPICS, getTopicById } from "@/data/topic-registry";

describe("topic registry", () => {
  it.each(["nodejs", "react", "angular"] as const)("resolves %s", (id) => {
    expect(getTopicById(id)).toMatchObject({ id });
  });

  it("does not resolve an unknown slug", () => {
    expect(getTopicById("unknown")).toBeUndefined();
  });

  it("keeps the catalog in presentation order", () => {
    expect(TOPICS.map(({ id }) => id)).toEqual(["nodejs", "react", "angular"]);
  });
});
