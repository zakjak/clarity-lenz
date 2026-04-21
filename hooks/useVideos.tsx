"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchVideos = async (page: number) => {
  const res = await fetch(`/api/videos?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useVideos = (page: number) => {
  return useQuery({
    queryKey: ["events", page],
    queryFn: () => fetchVideos(page),
    placeholderData: keepPreviousData,
  });
};
