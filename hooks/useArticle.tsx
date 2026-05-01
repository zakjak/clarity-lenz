"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/articles/article/${id}`, {
        method: "DELETE",
      }).then((data) => data.json()),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["created-articles"] });
      queryClient.invalidateQueries({ queryKey: ["created-news"] });
    },
  });
};

const fetchArticle = async (id: number) => {
  if (!id) return;

  await fetch(`/api/articles/article/${id}`, {
    method: "POST",
  });

  const res = await fetch(`/api/articles/article/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  return data;
};

export const useArticle = (id: number) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    // select: (data) => data,
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
  //  select: (data) =>  data?.article,
};

const fetchRelatedArticle = async (category: string, id: number) => {
  const res = await fetch(`/api/articles/category/${id}/${category}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useRelatedArticles = (category: string, id: number) => {
  return useQuery({
    queryKey: ["related-articles", category, id],
    queryFn: () => fetchRelatedArticle(category, id),
    placeholderData: keepPreviousData,
  });
};
