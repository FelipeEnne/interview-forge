import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_QUESTIONS } from "./topics/nodejs/questions";
import { ANGULAR_CATEGORIES } from "./topics/angular/categories";
import { ANGULAR_QUESTIONS } from "./topics/angular/questions";
import { REACT_CATEGORIES } from "./topics/react/categories";
import { REACT_QUESTIONS } from "./topics/react/questions";
import type { CategoryDefinition } from "./category-types";
import type { InterviewQuestion, StudyTopicData } from "./study-types";
import { getTopicById } from "./topic-registry";

function buildStudyTopic(
  topicId: string,
  categories: readonly CategoryDefinition[],
  questions: readonly InterviewQuestion[],
): StudyTopicData {
  const definition = getTopicById(topicId)!;

  return {
    id: definition.id,
    displayName: definition.displayName,
    categories,
    questions,
  };
}

const STUDY_TOPICS: readonly StudyTopicData[] = [
  buildStudyTopic("nodejs", NODEJS_CATEGORIES, NODEJS_QUESTIONS),
  buildStudyTopic("react", REACT_CATEGORIES, REACT_QUESTIONS),
  buildStudyTopic("angular", ANGULAR_CATEGORIES, ANGULAR_QUESTIONS),
];

export function getStudyTopicById(id: string): StudyTopicData | undefined {
  return STUDY_TOPICS.find((topic) => topic.id === id);
}
