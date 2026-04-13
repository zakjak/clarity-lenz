"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type CommentProps = {
  comment: string;
  postId: number;
  ownerId: string;
};

const fetchArticle = async (id: number, limit: number) => {
  if (!id) return;

  await fetch(`/api/articles/article/${id}`, {
    method: "POST",
  });

  const res = await fetch(
    `/api/articles/article/${id}?limit=${limit}&offset=${limit - 5}`,
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  return data;
};

export const useComments = (id: number, inView: boolean) => {
  return useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: ({ pageParam }) => fetchArticle(id, pageParam),
    initialPageParam: 5,
    enabled: inView,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : (allPages.length + 1) * 5;
    },
  });
};

const fetchCommentReplies = async (parentId: number, limit: number) => {
  if (!parentId) return;

  const res = await fetch(
    `/api/articles/article/replies?parentId=${parentId}&limit=${limit}&offset=${
      limit === 1 ? 0 : limit > 5 ? limit - 4 : 1
    }`,
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  return data;
};

export const useReplyComments = (parentId: number) => {
  return useInfiniteQuery({
    queryKey: ["reply-comments", parentId],
    queryFn: ({ pageParam }) => fetchCommentReplies(parentId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? undefined : allPages.length * 5;
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CommentProps) => {
      const res = await fetch(`/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reply-comments"],
      });
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { comment: string; parentId: number }) => {
      const res = await fetch(`/api/comment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reply-comments"],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/comment/${id}`, {
        method: "DELETE",
      }).then((data) => data.json()),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reply-comments"],
      });
    },
  });
};
