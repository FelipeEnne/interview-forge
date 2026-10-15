"use client";

import { CategoryPerformance } from "@/components/quiz/CategoryPerformance";
import type { QuizTopicData } from "@/data/quiz-types";
import {
  getQuizPerformanceStorageKey,
  readQuizPerformance,
} from "@/domain/local-storage-quiz-performance";
import { useLocalStorageSnapshot } from "@/browser/use-local-storage-snapshot";

type TopicQuizPerformanceProps = {
  topic: QuizTopicData;
  hasStudy: boolean;
};

export function TopicQuizPerformance({
  topic,
  hasStudy,
}: TopicQuizPerformanceProps) {
  const storedPerformance = useLocalStorageSnapshot(
    getQuizPerformanceStorageKey(topic.id),
  );
  const performance =
    storedPerformance === null
      ? {}
      : readQuizPerformance(
          topic.id,
          topic.categories.map(({ id }) => id),
        );

  return (
    <CategoryPerformance
      performance={performance}
      categories={topic.categories}
      studyCategoryBasePath={
        hasStudy ? `/topics/${topic.id}/categories` : undefined
      }
    />
  );
}
