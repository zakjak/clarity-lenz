"use client";

import { useSavedArticles } from "@/hooks/useSavedArticles";
import React, { useEffect, useState } from "react";
import TopCategoryStory from "./TopCategoryStory";
import { useInView } from "react-intersection-observer";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";
import { useSession } from "next-auth/react";

const SavedArticlesComponent = () => {
  const { data: session } = useSession();
  const [visiblePageCount, setVisiblePageCount] = useState(2);
  const { ref, inView } = useInView({ threshold: 0 });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSavedArticles(session?.user?.id as string);

  const visiblePages = data?.pages?.slice(-visiblePageCount);
  const savedArticles = visiblePages?.flat();

  useEffect(() => {
    const getNextPage = () => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
        setVisiblePageCount((prev) => prev + 1);
      }
    };
    getNextPage();
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) return <CategoriesPageSkeleton />;

  return (
    <div>
      <div
        ref={ref}
        className="grid md:grid-cols-3 gap-4 lg:w-240 md:w-200 w-[65%] mx-auto"
      >
        {savedArticles?.map(({ articles }) => (
          <TopCategoryStory key={articles?.id} topStory={articles} />
        ))}
      </div>
      <div
        ref={ref}
        className="bg-red flex justify-center my-4 font-bold text-2xl"
      >
        {isFetchingNextPage ? (
          <CategoriesPageSkeleton />
        ) : hasNextPage ? (
          <CategoriesPageSkeleton />
        ) : (
          <div className="text-center mt-4">
            <p>No more articles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedArticlesComponent;
