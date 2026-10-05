import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_QUIZ_QUESTIONS } from "./topics/nodejs/quiz-questions";
import { ANGULAR_CATEGORIES } from "./topics/angular/categories";
import { ANGULAR_QUIZ_QUESTIONS } from "./topics/angular/quiz-questions";
import { REACT_CATEGORIES } from "./topics/react/categories";
import { REACT_QUIZ_QUESTIONS } from "./topics/react/quiz-questions";
import type { CategoryDefinition } from "./category-types";
import type { QuizQuestion, QuizTopicData } from "./quiz-types";
import { getTopicById } from "./topic-registry";

const QUESTIONS_PER_ATTEMPT = 10;
const DURATION_MINUTES = 8;

function buildQuizTopic(
  topicId: string,
  categories: readonly CategoryDefinition[],
  questions: readonly QuizQuestion[],
): QuizTopicData {
  const definition = getTopicById(topicId)!;

  return {
    id: definition.id,
    displayName: definition.displayName,
    categories,
    questions,
    questionsPerAttempt: QUESTIONS_PER_ATTEMPT,
    durationMinutes: DURATION_MINUTES,
  };
}

const QUIZ_TOPICS: readonly QuizTopicData[] = [
  buildQuizTopic("nodejs", NODEJS_CATEGORIES, NODEJS_QUIZ_QUESTIONS),
  buildQuizTopic("react", REACT_CATEGORIES, REACT_QUIZ_QUESTIONS),
  buildQuizTopic("angular", ANGULAR_CATEGORIES, ANGULAR_QUIZ_QUESTIONS),
];

export function getQuizTopicById(id: string): QuizTopicData | undefined {
  return QUIZ_TOPICS.find((topic) => topic.id === id);
}
