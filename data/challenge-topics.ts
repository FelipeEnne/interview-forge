import { NODEJS_CATEGORIES } from "./topics/nodejs/categories";
import { NODEJS_CODING_CHALLENGES } from "./topics/nodejs/coding-challenges";
import type { CategoryDefinition } from "./category-types";
import type { CodingChallenge, ChallengeTopicData } from "./challenge-types";
import { getTopicById } from "./topic-registry";

function buildChallengeTopic(
  topicId: string,
  categories: readonly CategoryDefinition[],
  challenges: readonly CodingChallenge[],
): ChallengeTopicData {
  const definition = getTopicById(topicId)!;

  return {
    id: definition.id,
    displayName: definition.displayName,
    categories,
    challenges,
  };
}

const CHALLENGE_TOPICS: readonly ChallengeTopicData[] = [
  buildChallengeTopic("nodejs", NODEJS_CATEGORIES, NODEJS_CODING_CHALLENGES),
];

export function getChallengeTopicById(
  id: string,
): ChallengeTopicData | undefined {
  return CHALLENGE_TOPICS.find((topic) => topic.id === id);
}
