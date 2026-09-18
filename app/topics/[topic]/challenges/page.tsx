import { notFound } from "next/navigation";

import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import { ChallengesList } from "./ChallengesList";

type TopicChallengesPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicChallengesPage({
  params,
}: TopicChallengesPageProps) {
  const { topic } = await params;

  if (topic !== NODEJS_TOPIC.slug) {
    notFound();
  }

  return <ChallengesList />;
}
