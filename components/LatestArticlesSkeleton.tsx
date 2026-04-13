import React from "react";
import { Skeleton } from "./ui/skeleton";

const LatestArticlesSkeleton = () => {
  const stories = [1, 2, 3];
  return (
    <div className="mt-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-6 mt-2">
        {stories.map((story) => (
          <div className="w-full" key={story}>
            <Skeleton className="h-4 w-25" />
            <div className="mt-2">
              <Skeleton className="w-full h-60" />
              <div className="mt-4">
                <Skeleton className="h-4 w-50" />
                <div className="flex items-center text-xs mt-2">
                  <Skeleton className="h-4 w-15" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticlesSkeleton;
