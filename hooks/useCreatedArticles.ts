import { Article } from "@/lib/types/article";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCreatedArticles = (authorsId: string) => {
  return useInfiniteQuery({
    queryKey: ["created-articles", authorsId],
    queryFn: ({ pageParam }) =>
      fetch(
        `/api/articles/article/saved-articles/created-articles/${authorsId}?page=${pageParam}`,
      ).then((res) => res.json()),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
};

const createArticle = async (article: Article) => {
  const res = await fetch(`/api/createArticle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create article: ${error}`);
  }

  return res.json();
};

export const useCreateArticle = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (article: Article) => createArticle(article),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["created-articles", userId] });
      queryClient.invalidateQueries({ queryKey: ["draft-articles", userId] });
    },
  });
};

const editArticle = async (article: Article) => {
  const res = await fetch(`/api/createArticle`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create article: ${error}`);
  }

  return res.json();
};

export const useEditArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (article: Article) => editArticle(article),

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["created-articles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["draft-articles"],
      });
    },
  });
};

export const useDraft = (id: string) => {
  return useInfiniteQuery({
    queryKey: ["article-draft", id],
    queryFn: ({ pageParam }) =>
      fetch(`/api/articles/draft/${id}?page=${pageParam}`).then((res) =>
        res.json(),
      ),
    enabled: !!id,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });
};
