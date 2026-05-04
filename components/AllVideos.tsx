"use client";

import TopCateogoryVideo from "./TopCateogoryVideo";
import PaginationComponent from "./PaginationComponent";
import { Video } from "@/lib/types/video";
import { useVideos } from "@/hooks/useVideos";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";

const AllVideos = ({ page }: { page: string }) => {
  const pageNumber = Number(page) || 1;

  const { data: allVideos, isLoading } = useVideos(pageNumber);

  const videos: Video[] = allVideos?.response;

  if (isLoading) {
    return <CategoriesPageSkeleton />;
  }

  return (
    <div className="w-full pt-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 lg:w-240 md:w-160 w-[70%] mx-auto">
        {videos?.map((video) => (
          <div className="" key={video.id}>
            <TopCateogoryVideo video={video} />
          </div>
        ))}
      </div>
      <div className="mt-8">
        {allVideos?.pageNumber > 1 && (
          <PaginationComponent pageNumber={allVideos?.pageNumber} />
        )}
      </div>
    </div>
  );
};

export default AllVideos;
