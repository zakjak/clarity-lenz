"use client";

import { useQuery } from "@tanstack/react-query";

export const useLatestStories = () => {
  return useQuery({
    queryKey: ["created-news"],
    queryFn: async () => {
      const res = await fetch(`/api/articles/latest-articles`);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      return res.json();
    },
  });
};
