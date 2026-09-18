import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { InterviewQuestion } from "@/data/nodejs-questions";
import { TopicStudySession } from "./TopicStudySession";

const sampleQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    question: "First question text?",
    answer: "First answer text.",
  },
  {
    id: "q2",
    question: "Second question text?",
    answer: "Second answer text.",
  },
  {
    id: "q3",
    question: "Third question text?",
    answer: "Third answer text.",
  },
];

function ratingButtons() {
  return {
    again: screen.queryByRole("button", { name: "Again" }),
    hard: screen.queryByRole("button", { name: "Hard" }),
    good: screen.queryByRole("button", { name: "Good" }),
    easy: screen.queryByRole("button", { name: "Easy" }),
  };
}

describe("TopicStudySession", () => {
  it("shows the topic name Node.js", () => {
    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(screen.getByRole("heading", { name: "Node.js" })).toBeInTheDocument();
  });

  it("shows the first question and hides its answer initially", () => {
    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    expect(screen.getByText("First question text?")).toBeInTheDocument();
    expect(screen.queryByText("First answer text.")).not.toBeInTheDocument();
  });

  it("does not show recall rating buttons before the answer is revealed", () => {
    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    const ratings = ratingButtons();
    expect(ratings.again).not.toBeInTheDocument();
    expect(ratings.hard).not.toBeInTheDocument();
    expect(ratings.good).not.toBeInTheDocument();
    expect(ratings.easy).not.toBeInTheDocument();
  });

  it("reveals the answer when Show answer is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));

    expect(screen.getByText("First answer text.")).toBeInTheDocument();
  });

  it("shows recall rating buttons after the answer is revealed", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
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
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(screen.getByText("Second question text?")).toBeInTheDocument();
    expect(screen.queryByText("Second answer text.")).not.toBeInTheDocument();
  });

  it("calls onRatingRecorded with the question id and rating", async () => {
    const user = userEvent.setup();
    const onRatingRecorded = vi.fn();

    render(
      <TopicStudySession
        topicName="Node.js"
        questions={sampleQuestions}
        onRatingRecorded={onRatingRecorded}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    expect(onRatingRecorded).toHaveBeenCalledTimes(1);
    expect(onRatingRecorded).toHaveBeenCalledWith("q1", "good");
  });

  it("completes the session on the last question after a rating", async () => {
    const user = userEvent.setup();

    render(
      <TopicStudySession topicName="Node.js" questions={sampleQuestions} />,
    );

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Good" }));

    await user.click(screen.getByRole("button", { name: "Show answer" }));
    await user.click(screen.getByRole("button", { name: "Easy" }));

    expect(screen.getByText("Third question text?")).toBeInTheDocument();
    expect(screen.getByText("Third answer text.")).toBeInTheDocument();
    expect(screen.getByText("Session complete")).toBeInTheDocument();

    const ratings = ratingButtons();
    expect(ratings.again).not.toBeInTheDocument();
    expect(ratings.hard).not.toBeInTheDocument();
    expect(ratings.good).not.toBeInTheDocument();
    expect(ratings.easy).not.toBeInTheDocument();
  });
});
