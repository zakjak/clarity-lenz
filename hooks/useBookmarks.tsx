"use client";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export type SavedArticleProp = {
  id: number;
  ownerId: string;
  articleId: number;
};

type SavedOwner = {
  ownerId: string;
};

const fetchSavedArticle = async (id: string): Promise<SavedArticle[]> => {
  const res = await fetch(`/api/articles/article/saved-articles/${id}`);
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export const useSavedArticle = (ownerId: string) => {
  return useQuery<SavedArticleProp[]>({
    queryKey: ["saved_article", ownerId],
    queryFn: () => fetchSavedArticle(ownerId),
    placeholderData: keepPreviousData,
  });
};

const toggleReadList = async ({
  articleId,
  ownerId,
}: {
  ownerId: string;
  articleId: number;
}): Promise<SavedOwner[]> => {
  const res = await fetch(`/api/articles/article/saved-articles/${articleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ownerId }),
  });

  return res.json();
};

type SavedArticle = {
  id: number;
  ownerId: string;
  articleId: number;
};

export const useToggleBookmark = (ownerId: string) => {
  return useMutation({
    mutationFn: (articleId: number) => toggleReadList({ articleId, ownerId }),
    onMutate: async (articleId, context) => {
      await context.client.cancelQueries({
        queryKey: ["saved_article", ownerId],
      });

      const previousArticles =
        context.client.getQueryData<SavedArticle[]>([
          "saved_article",
          ownerId,
        ]) || [];

      const isAlreadySaved = previousArticles.some(
        (a) => a.articleId === articleId,
      );

      const newData = isAlreadySaved
        ? previousArticles.filter((a) => a.articleId !== articleId)
        : [...previousArticles, { id: Date.now(), ownerId, articleId }];

      context.client.setQueryData(["saved_article", ownerId], newData);

      return { previousArticles, newData };
    },

    onSuccess: (err, savedArticle, onMutateResult, context) => {
      // 🔄 Refetch the saved articles after toggle
      context.client.invalidateQueries({ queryKey: ["saved_article"] });
    },

    onError: (err, savedArticle, onMutateResult, context) => {
      context.client.setQueryData(
        ["saved_article", ownerId],
        onMutateResult?.previousArticles,
      );
    },

    onSettled: (savedArticle, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: ["saved_article", ownerId],
      }),
  });
};
