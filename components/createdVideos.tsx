"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";
import TopCategoryStory from "./TopCategoryStory";
import { useCreatedNews } from "@/hooks/useCreatedNews";
import TopCateogoryVideo from "./TopCateogoryVideo";

const CreatedVideos = ({
  ownerId,
  type,
}: {
  ownerId: string;
  type: string;
}) => {
  const [visiblePageCount, setVisiblePageCount] = useState(2);

  const { ref, inView } = useInView({ threshold: 0 });
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCreatedNews(ownerId, type);

  const visiblePages = data?.pages.slice(-visiblePageCount);
  const createdVideos = visiblePages?.flat();

  useEffect(() => {
    const fetchNextAtticles = () => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
        setVisiblePageCount((prev) => prev + 1);
      }
    };
    fetchNextAtticles();
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isFetchingNextPage) {
    return <CategoriesPageSkeleton />;
  }

  return (
    <div className="">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 gap-2">
        {createdVideos?.map((video) => (
          <TopCateogoryVideo video={video} key={video.id} />
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

export default CreatedVideos;
