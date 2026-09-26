import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_QUIZ_QUESTIONS } from "./topics/nodejs/quiz-questions";
import { ANGULAR_CATEGORIES } from "./topics/angular/categories";
import { ANGULAR_QUIZ_QUESTIONS } from "./topics/angular/quiz-questions";
import { REACT_CATEGORIES } from "./topics/react/categories";
import { REACT_QUIZ_QUESTIONS } from "./topics/react/quiz-questions";
import type { QuizTopicData } from "./quiz-types";
import { getTopicById } from "./topic-registry";

const QUESTIONS_PER_ATTEMPT = 10;
const DURATION_MINUTES = 8;

const nodejsDefinition = getTopicById("nodejs")!;

const NODEJS_QUIZ_TOPIC: QuizTopicData = {
  id: nodejsDefinition.id,
  displayName: nodejsDefinition.displayName,
  categories: NODEJS_CATEGORIES,
  questions: NODEJS_QUIZ_QUESTIONS,
  questionsPerAttempt: QUESTIONS_PER_ATTEMPT,
  durationMinutes: DURATION_MINUTES,
};

const reactDefinition = getTopicById("react")!;

const REACT_QUIZ_TOPIC: QuizTopicData = {
  id: reactDefinition.id,
  displayName: reactDefinition.displayName,
  categories: REACT_CATEGORIES,
  questions: REACT_QUIZ_QUESTIONS,
  questionsPerAttempt: QUESTIONS_PER_ATTEMPT,
  durationMinutes: DURATION_MINUTES,
};

const angularDefinition = getTopicById("angular")!;

const ANGULAR_QUIZ_TOPIC: QuizTopicData = {
  id: angularDefinition.id,
  displayName: angularDefinition.displayName,
  categories: ANGULAR_CATEGORIES,
  questions: ANGULAR_QUIZ_QUESTIONS,
  questionsPerAttempt: QUESTIONS_PER_ATTEMPT,
  durationMinutes: DURATION_MINUTES,
};

const QUIZ_TOPICS: readonly QuizTopicData[] = [
  NODEJS_QUIZ_TOPIC,
  REACT_QUIZ_TOPIC,
  ANGULAR_QUIZ_TOPIC,
];

export function getQuizTopicById(id: string): QuizTopicData | undefined {
  return QUIZ_TOPICS.find((topic) => topic.id === id);
}
