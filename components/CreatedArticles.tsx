import { useInView } from "react-intersection-observer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCreatedArticles } from "@/hooks/useCreatedArticles";
import CategoriesPageSkeleton from "./CategoriesPageSkeleton";
import TopCategoryStory from "./TopCategoryStory";

const CreatedArticles = ({
  ownerId,
  setOpen,
}: {
  ownerId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [visiblePageCount, setVisiblePageCount] = useState(2);

  const { ref, inView } = useInView({ threshold: 0 });
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useCreatedArticles(ownerId);

  const visiblePages = data?.pages.slice(-visiblePageCount);
  const createdArticles = visiblePages?.flat();

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
        {createdArticles?.map((article) => (
          <TopCategoryStory
            key={article?.id}
            topStory={article}
            setOpen={setOpen}
          />
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

export default CreatedArticles;
