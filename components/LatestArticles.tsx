"use client";

import { useLatestStories } from "@/hooks/useLatestStories";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";
import TopCategoryStory from "./TopCategoryStory";
import { Article } from "@/lib/types/article";

const LatestArticles = () => {
  const { data: articles, isLoading } = useLatestStories();

  if (isLoading) return <LatestArticlesSkeleton />;
  return (
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
      {articles?.map((article: Article) => (
        <TopCategoryStory key={article?.id} topStory={article} />
      ))}
    </div>
  );
};

export default LatestArticles;
