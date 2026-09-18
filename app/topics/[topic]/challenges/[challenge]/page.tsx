import { notFound } from "next/navigation";

import { NodejsCodingChallenge } from "@/components/NodejsCodingChallenge";
import { NODEJS_CODING_CHALLENGES } from "@/data/nodejs-coding-challenges";
import { NODEJS_TOPIC } from "@/data/nodejs-questions";

type TopicChallengePageProps = {
  params: Promise<{ topic: string; challenge: string }>;
};

export default async function TopicChallengePage({
  params,
}: TopicChallengePageProps) {
  const { topic, challenge: challengeId } = await params;

  const challenge = NODEJS_CODING_CHALLENGES.find(
    (item) => item.id === challengeId,
  );

  if (topic !== NODEJS_TOPIC.slug || challenge === undefined) {
    notFound();
  }

  return (
    <NodejsCodingChallenge
      challenge={challenge}
      backLink={{
        href: `/topics/${NODEJS_TOPIC.slug}/challenges`,
        label: "Back to challenges",
      }}
    />
  );
}
