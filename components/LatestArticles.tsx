"use client";

import { useLatestStories } from "@/hooks/useLatestStories";
import LatestArticlesSkeleton from "./LatestArticlesSkeleton";
import TopCategoryStory from "./TopCategoryStory";
import { useState } from "react";
import { Article } from "@/lib/types/article";

const LatestArticles = () => {
  const { data: articles, isLoading } = useLatestStories();
  const [open, setOpen] = useState(false);

  if (isLoading) return <LatestArticlesSkeleton />;
  return (
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
      {articles?.map((article: Article) => (
        <TopCategoryStory
          key={article?.id}
          topStory={article}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
};

export default LatestArticles;
