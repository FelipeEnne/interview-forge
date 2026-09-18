import { notFound } from "next/navigation";

import { NODEJS_TOPIC } from "@/data/nodejs-questions";
import { TopicOverview } from "./TopicOverview";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  if (topic !== NODEJS_TOPIC.slug) {
    notFound();
  }

  return <TopicOverview />;
}
