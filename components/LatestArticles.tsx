"use client";

import { useLatestStories } from "@/hooks/useLatestStories";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";
import { Article } from "@/lib/types/article";
import LatestArticleComponent from "./LatestArticleComponent";
import LatestArticleSmallComponent from "./LatestArticleSmallComponent";

const LatestArticles = () => {
  const { data: articles, isLoading } = useLatestStories();

  if (isLoading) return <LatestArticlesSkeleton />;

  return (
    <div className="">
      {articles?.latestArticle && (
        <LatestArticleComponent article={articles?.latestArticle[0]} />
      )}

      <div className="mt-4 flex flex-col gap-2">
        {articles?.latestArticles?.map((article: Article) => (
          <LatestArticleSmallComponent key={article?.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
