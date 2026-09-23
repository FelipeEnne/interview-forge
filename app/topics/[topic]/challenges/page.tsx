import { notFound } from "next/navigation";

import { ChallengesList } from "@/components/challenges/ChallengesList";
import { getChallengeTopicById } from "@/data/challenge-topics";

type TopicChallengesPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicChallengesPage({
  params,
}: TopicChallengesPageProps) {
  const { topic } = await params;
  const challengeTopic = getChallengeTopicById(topic);

  if (!challengeTopic) {
    notFound();
  }

  return <ChallengesList topic={challengeTopic} />;
}
