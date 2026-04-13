"use client";

import { useQuery } from "@tanstack/react-query";

export const useLatestEvents = () => {
  return useQuery({
    queryKey: ["latestEvents"],
    queryFn: async () => {
      const res = await fetch(`/api/events/latest-events`);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      return res.json();
    },
  });
};
