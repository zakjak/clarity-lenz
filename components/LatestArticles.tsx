"use client";

import { useLatestStories } from "@/hooks/useLatestStories";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";
import { Article } from "@/lib/types/article";
import LatestArticleComponent from "./LatestArticleComponent";

const LatestArticles = () => {
  const { data: articles, isLoading } = useLatestStories();

  if (isLoading) return <LatestArticlesSkeleton />;

  return (
    <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
      {articles?.map((article: Article) => (
        <LatestArticleComponent article={article} />
      ))}
    </div>
  );
};

export default LatestArticles;
