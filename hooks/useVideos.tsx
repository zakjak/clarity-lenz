"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchVideos = async (page: number) => {
  const res = await fetch(`/api/videos?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useVideos = (page: number) => {
  return useQuery({
    queryKey: ["created-videos", page],
    queryFn: () => fetchVideos(page),
    placeholderData: keepPreviousData,
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/videos/${id}`, {
        method: "DELETE",
      }).then((data) => data.json()),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["created-videos"] });
      queryClient.invalidateQueries({ queryKey: ["created-news"] });
    },
  });
};
