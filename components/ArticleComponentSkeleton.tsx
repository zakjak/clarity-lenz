import { Skeleton } from "./ui/skeleton";
import { Separator } from "@radix-ui/react-separator";

const ArticleComponentSkeleton = () => {
  const stories = [1, 2, 3, 4, 5];
  const relatedArticles = [1, 2, 3];

  return (
    <div className="max-w-[80%] lg:w-280 mx-auto">
      <div className="grid lg:gap-6 gap-4 lg:grid-cols-6 md:grid-cols-5 mb-6">
        <div className="lg:col-span-4 md:col-span-3 w-full col-span-6">
          <div className="">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>

            <div className="flex gap-2 mt-2">
              <Skeleton className="h-4 w-15" />
              <Separator className="w-0.5 h-4 bg-zinc-400" />
              <Skeleton className="h-4 w-15" />
            </div>
            <Skeleton className="h-[20em] rounded-lg w-full mt-2" />
          </div>
          <div className="flex justify-between pt-6">
            <div className="">
              <Skeleton className="h-4 w-25 mb-2" />
              <Skeleton className="h-4 w-25" />
            </div>
            <div className="">
              <span className="flex items-center gap-1 mb-2">
                <Skeleton className="h-4 w-25" />
              </span>
              <Skeleton className="h-4 w-25" />
            </div>
          </div>
          <div className="pt-4">
            {stories.map((story) => (
              <Skeleton key={story} className="h-4 mt-2" />
            ))}
          </div>
        </div>

        <div className="md:col-span-2 col-span-3">
          <h2 className="text-xl font-bold leading-2 tracking-wide ">
            <Skeleton className="h-4 w-50" />
          </h2>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-1">
            {relatedArticles.map((article) => (
              <div key={article} className="mt-6 flex flex-col gap-4">
                <div className=" ">
                  <Skeleton className="h-50 w-full rounded-lg" />
                </div>
                <div>
                  <Skeleton className="h-3 w-50" />
                  <div className="flex items-center gap-2 text-sm text-zinc-400 mt-2">
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-4 w-15" />
                      <Separator className="w-0.5 h-4 bg-zinc-400" />
                      <Skeleton className="h-4 w-15" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleComponentSkeleton;
