"use client";

import CategoriesPageSkeleton from "./CategoriesPageSkeleton";
import { Article } from "@/lib/types/article";
import { useArticles } from "@/hooks/useArticles";
import TopCategoryStory from "./TopCategoryStory";
import PaginationComponent from "./PaginationComponent";

const AllArticles = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: allArticles, isLoading } = useArticles(pageNumber);

  const articles: Article[] = allArticles?.response;

  if (isLoading) {
    return <CategoriesPageSkeleton />;
  }

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-240 md:w-160 w-[70%] mx-auto">
        {articles?.map((story) => (
          <TopCategoryStory key={story.id} topStory={story} />
        ))}
      </div>
      <div className="mt-8">
        {allArticles?.pageNumber > 1 && (
          <PaginationComponent pageNumber={allArticles?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllArticles;
