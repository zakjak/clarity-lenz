"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchArticles = async (page: number) => {
  const res = await fetch(`/api/articles?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useArticles = (page: number) => {
  return useQuery({
    queryKey: ["events", page],
    queryFn: () => fetchArticles(page),
    placeholderData: keepPreviousData,
  });
};
