import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_CODING_CHALLENGES } from "./topics/nodejs/coding-challenges";
import type { ChallengeTopicData } from "./challenge-types";
import { getTopicById } from "./topic-registry";

const nodejsDefinition = getTopicById("nodejs")!;

const NODEJS_CHALLENGE_TOPIC: ChallengeTopicData = {
  id: nodejsDefinition.id,
  displayName: nodejsDefinition.displayName,
  categories: NODEJS_CATEGORIES,
  challenges: NODEJS_CODING_CHALLENGES,
};

const CHALLENGE_TOPICS: readonly ChallengeTopicData[] = [
  NODEJS_CHALLENGE_TOPIC,
];

export function getChallengeTopicById(
  id: string,
): ChallengeTopicData | undefined {
  return CHALLENGE_TOPICS.find((topic) => topic.id === id);
}
