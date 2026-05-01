import { useInfiniteQuery } from "@tanstack/react-query";

export const useCreatedNews = (authorsId: string, type: string) => {
  return useInfiniteQuery({
    queryKey: ["created-news", authorsId, type],
    queryFn: ({ pageParam }) =>
      fetch(
        `/api/createdNews/${authorsId}?page=${pageParam}&type=${type}`,
      ).then((res) => res.json()),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
};
