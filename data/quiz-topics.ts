import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_QUIZ_QUESTIONS } from "./topics/nodejs/quiz-questions";
import { REACT_CATEGORIES } from "./topics/react/categories";
import { REACT_QUIZ_QUESTIONS } from "./topics/react/quiz-questions";
import type { QuizTopicData } from "./quiz-types";
import { getTopicById } from "./topic-registry";

const nodejsDefinition = getTopicById("nodejs")!;

const NODEJS_QUIZ_TOPIC: QuizTopicData = {
  id: nodejsDefinition.id,
  displayName: nodejsDefinition.displayName,
  categories: NODEJS_CATEGORIES,
  questions: NODEJS_QUIZ_QUESTIONS,
  questionsPerAttempt: 10,
  durationMinutes: 8,
};

const reactDefinition = getTopicById("react")!;

const REACT_QUIZ_TOPIC: QuizTopicData = {
  id: reactDefinition.id,
  displayName: reactDefinition.displayName,
  categories: REACT_CATEGORIES,
  questions: REACT_QUIZ_QUESTIONS,
  questionsPerAttempt: 10,
  durationMinutes: 8,
};

const QUIZ_TOPICS: readonly QuizTopicData[] = [
  NODEJS_QUIZ_TOPIC,
  REACT_QUIZ_TOPIC,
];

export function getQuizTopicById(id: string): QuizTopicData | undefined {
  return QUIZ_TOPICS.find((topic) => topic.id === id);
}
