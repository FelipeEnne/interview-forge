import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_QUESTIONS } from "./topics/nodejs/questions";
import type { StudyTopicData } from "./study-types";
import { getTopicById } from "./topic-registry";

const nodejsDefinition = getTopicById("nodejs")!;

const NODEJS_STUDY_TOPIC: StudyTopicData = {
  id: nodejsDefinition.id,
  displayName: nodejsDefinition.displayName,
  categories: NODEJS_CATEGORIES,
  questions: NODEJS_QUESTIONS,
};

const STUDY_TOPICS: readonly StudyTopicData[] = [NODEJS_STUDY_TOPIC];

export function getStudyTopicById(id: string): StudyTopicData | undefined {
  return STUDY_TOPICS.find((topic) => topic.id === id);
}
