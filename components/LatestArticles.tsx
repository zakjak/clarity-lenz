"use client";

import { useLatestStories } from "@/hooks/useLatestStories";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";
import TopCategoryStory from "./TopCategoryStory";
import { Article } from "@/lib/types/article";
import LatestArticleComponent from "./LatestArticleComponent";

const LatestArticles = () => {
  const { data: articles, isLoading } = useLatestStories();

  if (isLoading) return <LatestArticlesSkeleton />;

  return (
    <div className="">
      {articles?.latestArticle && (
        <LatestArticleComponent articles={articles?.latestArticle} />
      )}

      {articles?.latestArticles?.map((article: Article) => (
        <TopCategoryStory key={article?.id} topStory={article} />
      ))}
    </div>
  );
};

export default LatestArticles;
