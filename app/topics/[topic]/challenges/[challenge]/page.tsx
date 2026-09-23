import { notFound } from "next/navigation";

import { CodingChallenge } from "@/components/challenges/CodingChallenge";
import { getChallengeTopicById } from "@/data/challenge-topics";

type TopicChallengePageProps = {
  params: Promise<{ topic: string; challenge: string }>;
};

export default async function TopicChallengePage({
  params,
}: TopicChallengePageProps) {
  const { topic, challenge: challengeId } = await params;
  const challengeTopic = getChallengeTopicById(topic);
  const challenge = challengeTopic?.challenges.find(
    (item) => item.id === challengeId,
  );
  const category = challengeTopic?.categories.find(
    (item) => item.id === challenge?.category,
  );

  if (!challengeTopic || !challenge || !category) {
    notFound();
  }

  return (
    <CodingChallenge
      challenge={challenge}
      category={category}
      backLink={{
        href: `/topics/${challengeTopic.id}/challenges`,
      }}
    />
  );
}
