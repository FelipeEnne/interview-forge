import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_QUESTIONS } from "./topics/nodejs/questions";
import { ANGULAR_CATEGORIES } from "./topics/angular/categories";
import { ANGULAR_QUESTIONS } from "./topics/angular/questions";
import { REACT_CATEGORIES } from "./topics/react/categories";
import { REACT_QUESTIONS } from "./topics/react/questions";
import type { StudyTopicData } from "./study-types";
import { getTopicById } from "./topic-registry";

const nodejsDefinition = getTopicById("nodejs")!;
const reactDefinition = getTopicById("react")!;
const angularDefinition = getTopicById("angular")!;

const NODEJS_STUDY_TOPIC: StudyTopicData = {
  id: nodejsDefinition.id,
  displayName: nodejsDefinition.displayName,
  categories: NODEJS_CATEGORIES,
  questions: NODEJS_QUESTIONS,
};

const REACT_STUDY_TOPIC: StudyTopicData = {
  id: reactDefinition.id,
  displayName: reactDefinition.displayName,
  categories: REACT_CATEGORIES,
  questions: REACT_QUESTIONS,
};

const ANGULAR_STUDY_TOPIC: StudyTopicData = {
  id: angularDefinition.id,
  displayName: angularDefinition.displayName,
  categories: ANGULAR_CATEGORIES,
  questions: ANGULAR_QUESTIONS,
};

const STUDY_TOPICS: readonly StudyTopicData[] = [
  NODEJS_STUDY_TOPIC,
  REACT_STUDY_TOPIC,
  ANGULAR_STUDY_TOPIC,
];

export function getStudyTopicById(id: string): StudyTopicData | undefined {
  return STUDY_TOPICS.find((topic) => topic.id === id);
}
