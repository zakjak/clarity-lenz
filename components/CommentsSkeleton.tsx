import React from "react";
import { Skeleton } from "./ui/skeleton";

const CommentsSkeleton = () => {
  const comments = [1, 2, 3, 4, 5];
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="w-32 h-6" />
        <div className="dark:bg-zinc-400 dark:text-zinc-800 bg-black text-white text-sm  rounded-md shadow-2xl py-2 px-2 font-bold">
          <Skeleton className="w-20 h-4" />
        </div>
      </div>

      <Skeleton className="w-[90%] rounded-xl h-24" />
      {comments.map((comment) => (
        <div key={comment} className="flex space-x-4 mt-4 border-b pb-2">
          <Skeleton className="h-12 min-w-12 rounded-full" />
          <div className="space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-3 w-[200px]" />
            <div className="flex gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSkeleton;
