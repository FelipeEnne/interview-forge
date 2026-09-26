import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { QUESTION_PROGRESS_STORAGE_KEY } from "@/domain/local-storage-progress";
import { TopicStudySession } from "./TopicStudySession";
import {
  completeSession,
  createClock,
  createUser,
  sampleCategories,
  sampleQuestions,
} from "./TopicStudySession.test-helpers";

describe("TopicStudySession scheduling", () => {
  let clock: ReturnType<typeof createClock>;

  beforeEach(() => {
    localStorage.clear();
    clock = createClock();
  });

  it("starts a new session with weaker questions prioritized", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q1: { lastRating: "good", reviewCount: 1 },
        q2: { lastRating: "again", reviewCount: 1 },
      }),
    );

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    expect(
      await screen.findByText("Second question text?"),
    ).toBeInTheDocument();
  });

  it("starts with only due questions ordered by recall priority", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q1: {
          lastRating: "good",
          reviewCount: 1,
          lastReviewedAt: "2026-09-15T03:15:00.000Z",
          nextReviewAt: "2026-09-18T03:15:00.000Z",
        },
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-18T03:10:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-17T03:15:00.000Z",
          nextReviewAt: "2026-09-24T03:15:00.000Z",
        },
      }),
    );
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    expect(
      await screen.findByText("Second question text?"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));
    expect(screen.getByText("First question text?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));
    expect(screen.getByText("2 questions reviewed")).toBeInTheDocument();
    expect(screen.queryByText("Third question text?")).not.toBeInTheDocument();
  });

  it("studies every supplied question in recall priority order in practice mode", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q1: {
          lastRating: "good",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-21T03:00:00.000Z",
        },
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:10:00.000Z",
          nextReviewAt: "2026-09-18T03:20:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-17T03:15:00.000Z",
          nextReviewAt: "2026-09-24T03:15:00.000Z",
        },
      }),
    );
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        sessionMode="practice"
        now={clock.now}
      />,
    );

    expect(
      await screen.findByText("Second question text?"),
    ).toBeInTheDocument();
    await completeSession(user, ["good", "good", "good"]);
    expect(screen.getByText("3 questions reviewed")).toBeInTheDocument();
  });

  it("rebuilds a practice session with every supplied question on Study again", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        sessionMode="practice"
        now={clock.now}
      />,
    );

    await completeSession(user, ["easy", "again", "good"]);
    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    await completeSession(user, ["good", "good", "good"]);
    expect(screen.getByText("3 questions reviewed")).toBeInTheDocument();
  });

  it("keeps the due queue fixed when time passes during a session", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:10:00.000Z",
          nextReviewAt: "2026-09-18T03:20:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-17T03:15:00.000Z",
          nextReviewAt: "2026-09-24T03:15:00.000Z",
        },
      }),
    );
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    expect(await screen.findByText("First question text?")).toBeInTheDocument();
    clock.set("2026-09-18T03:21:00.000Z");
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("1 question reviewed")).toBeInTheDocument();
    expect(screen.queryByText("Second question text?")).not.toBeInTheDocument();
  });

  it("recalculates due questions with a new time on Study again", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:10:00.000Z",
          nextReviewAt: "2026-09-18T03:20:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-17T03:15:00.000Z",
          nextReviewAt: "2026-09-24T03:15:00.000Z",
        },
      }),
    );
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );
    await screen.findByText("First question text?");
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    clock.set("2026-09-18T03:20:00.000Z");
    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
  });

  it("shows an empty state when no questions are due", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify(
        Object.fromEntries(
          sampleQuestions.map(({ id }) => [
            id,
            {
              lastRating: "good",
              reviewCount: 1,
              lastReviewedAt: "2026-09-18T03:00:00.000Z",
              nextReviewAt: "2026-09-21T03:00:00.000Z",
            },
          ]),
        ),
      ),
    );

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    expect(await screen.findByText("You're all caught up")).toBeInTheDocument();
    expect(
      screen.getByText("No questions are due for review right now."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Study all questions" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show answer" }),
    ).not.toBeInTheDocument();
  });

  it("studies all questions in priority order for one voluntary session", async () => {
    localStorage.setItem(
      QUESTION_PROGRESS_STORAGE_KEY,
      JSON.stringify({
        q1: {
          lastRating: "good",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-21T03:00:00.000Z",
        },
        q2: {
          lastRating: "again",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-18T03:25:00.000Z",
        },
        q3: {
          lastRating: "easy",
          reviewCount: 1,
          lastReviewedAt: "2026-09-18T03:00:00.000Z",
          nextReviewAt: "2026-09-25T03:00:00.000Z",
        },
      }),
    );
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );
    await screen.findByText("You're all caught up");
    await user.click(
      screen.getByRole("button", { name: "Study all questions" }),
    );

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    await completeSession(user, ["good", "good", "good"]);
    expect(screen.getByText("3 questions reviewed")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Study again" }));
    expect(screen.getByText("You're all caught up")).toBeInTheDocument();
  });
});
