import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import type { CategoryDefinition } from "@/data/category-types";
import type { InterviewQuestion } from "@/data/study-types";
import {
  QUESTION_PROGRESS_STORAGE_KEY,
  readQuestionProgress,
} from "@/domain/local-storage-progress";
import { TopicStudySession } from "./TopicStudySession";
import {
  completeSession,
  createClock,
  createUser,
  ratingButtons,
  sampleCategories,
  sampleQuestions,
} from "./TopicStudySession.test-helpers";

describe("TopicStudySession", () => {
  let clock: ReturnType<typeof createClock>;

  beforeEach(() => {
    localStorage.clear();
    clock = createClock();
  });

  it("shows the topic name Node.js", () => {
    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Node.js" }),
    ).toBeInTheDocument();
  });

  it("runs and schedules active recall for a non-Node.js question bank", async () => {
    const user = createUser();
    const reactQuestions: InterviewQuestion[] = [
      {
        id: "react-use-state",
        category: "hooks",
        question: {
          en: "What does useState return?",
          pt: "O que useState retorna?",
        },
        answer: {
          en: "The current state and a setter function.",
          pt: "O estado atual e uma função setter.",
        },
      },
    ];
    const reactCategories: CategoryDefinition[] = [
      {
        id: "hooks",
        displayName: { en: "Hooks", pt: "Hooks" },
      },
    ];

    render(
      <TopicStudySession
        topicName="React"
        categories={reactCategories}
        questions={reactQuestions}
        now={clock.now}
      />,
    );

    expect(screen.getByText("Hooks")).toBeInTheDocument();
    expect(screen.getByText("What does useState return?")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    expect(
      screen.getByText("The current state and a setter function."),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(readQuestionProgress()["react-use-state"]).toEqual({
      lastRating: "good",
      reviewCount: 1,
      lastReviewedAt: "2026-09-18T03:15:00.000Z",
      nextReviewAt: "2026-09-21T03:15:00.000Z",
    });
  });

  it("shows the first question and hides its answer initially", () => {
    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    expect(screen.getByText("First question text?")).toBeInTheDocument();
    expect(screen.queryByText("First answer text.")).not.toBeInTheDocument();
  });

  it("shows the category and updates it when the current question changes", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    expect(screen.getByText("Fundamentals")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Event Loop & Async")).toBeInTheDocument();
    expect(screen.queryByText("Fundamentals")).not.toBeInTheDocument();
  });

  it("does not show recall rating buttons before the answer is revealed", () => {
    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    const ratings = ratingButtons();
    expect(ratings.again).not.toBeInTheDocument();
    expect(ratings.hard).not.toBeInTheDocument();
    expect(ratings.good).not.toBeInTheDocument();
    expect(ratings.easy).not.toBeInTheDocument();
  });

  it("reveals the answer when Show answer is clicked", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    expect(screen.getByText("First answer text.")).toBeInTheDocument();
  });

  it("shows recall rating buttons after the answer is revealed", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));

    const ratings = ratingButtons();
    expect(ratings.again).toBeInTheDocument();
    expect(ratings.hard).toBeInTheDocument();
    expect(ratings.good).toBeInTheDocument();
    expect(ratings.easy).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show answer" })).toBeDisabled();
  });

  it("advances to the next question when Good is selected and hides the new answer", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    expect(screen.queryByText("Second answer text.")).not.toBeInTheDocument();
  });

  it("shows recall counts in the summary after ratings are recorded", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={[sampleQuestions[0]!]}
        now={clock.now}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("1 question reviewed")).toBeInTheDocument();
    expect(screen.getByText("Good: 1")).toBeInTheDocument();
    expect(screen.getByText("Again: 0")).toBeInTheDocument();
  });

  it("completes the session on the last question after a rating", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await completeSession(user, ["good", "good", "easy"]);

    expect(screen.getByText("Session complete")).toBeInTheDocument();
    expect(screen.getByText("3 questions reviewed")).toBeInTheDocument();
    expect(screen.queryByText("Third question text?")).not.toBeInTheDocument();
    expect(screen.queryByText("Third answer text.")).not.toBeInTheDocument();

    const ratings = ratingButtons();
    expect(ratings.again).not.toBeInTheDocument();
    expect(ratings.hard).not.toBeInTheDocument();
    expect(ratings.good).not.toBeInTheDocument();
    expect(ratings.easy).not.toBeInTheDocument();
  });

  it("shows correct Again, Hard, Good, and Easy counts in the summary", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await completeSession(user, ["again", "hard", "easy"]);

    expect(screen.getByText("Again: 1")).toBeInTheDocument();
    expect(screen.getByText("Hard: 1")).toBeInTheDocument();
    expect(screen.getByText("Good: 0")).toBeInTheDocument();
    expect(screen.getByText("Easy: 1")).toBeInTheDocument();
  });

  it("hides all study content after the session is complete", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await completeSession(user, ["good", "good", "good"]);

    for (const question of sampleQuestions) {
      expect(screen.queryByText(question.question.en)).not.toBeInTheDocument();
      expect(screen.queryByText(question.answer.en)).not.toBeInTheDocument();
    }
    expect(
      screen.queryByRole("button", { name: "Show answer" }),
    ).not.toBeInTheDocument();
  });

  it("starts a new session when Study again is clicked", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await completeSession(user, ["good", "good", "good"]);
    clock.set("2026-09-21T03:15:00.000Z");
    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.queryByText("Session complete")).not.toBeInTheDocument();
    expect(screen.getByText("First question text?")).toBeInTheDocument();
    expect(screen.queryByText("First answer text.")).not.toBeInTheDocument();
  });

  it("recalculates question priority when Study again is clicked", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await completeSession(user, ["easy", "again", "good"]);
    clock.set("2026-09-18T03:25:00.000Z");
    await user.click(screen.getByRole("button", { name: "Study again" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    expect(screen.queryByText("Second answer text.")).not.toBeInTheDocument();
  });

  it("clears previous ratings when Study again is clicked", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await completeSession(user, ["again", "hard", "easy"]);
    clock.set("2026-09-25T03:15:00.000Z");
    await user.click(screen.getByRole("button", { name: "Study again" }));
    await completeSession(user, ["good", "good", "good"]);

    expect(screen.getByText("Good: 3")).toBeInTheDocument();
    expect(screen.getByText("Again: 0")).toBeInTheDocument();
    expect(screen.getByText("Hard: 0")).toBeInTheDocument();
    expect(screen.getByText("Easy: 0")).toBeInTheDocument();
  });

  it("persists question progress to localStorage when a question is rated", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(readQuestionProgress()).toEqual({
      q1: {
        lastRating: "good",
        reviewCount: 1,
        lastReviewedAt: "2026-09-18T03:15:00.000Z",
        nextReviewAt: "2026-09-21T03:15:00.000Z",
      },
    });
    expect(localStorage.getItem(QUESTION_PROGRESS_STORAGE_KEY)).not.toBeNull();
  });

  it("preserves persisted progress when Study again is clicked", async () => {
    const user = createUser();

    render(
      <TopicStudySession
        topicName="Node.js"
        categories={sampleCategories}
        questions={sampleQuestions}
        now={clock.now}
      />,
    );

    await completeSession(user, ["good", "good", "good"]);
    clock.set("2026-09-21T03:15:00.000Z");
    await user.click(screen.getByRole("button", { name: "Study again" }));
    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(readQuestionProgress()).toMatchObject({
      q1: { lastRating: "good", reviewCount: 2 },
      q2: { lastRating: "good", reviewCount: 1 },
      q3: { lastRating: "good", reviewCount: 1 },
    });
  });
});
