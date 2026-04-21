import { Video } from "@/lib/types/video";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createVideo = async (video: Video) => {
  const res = await fetch(`/api/createVideo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(video),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create article: ${error}`);
  }

  return res.json();
};

export const useCreateVideo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (video: Video) => createVideo(video),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["created-articles", userId] });
      queryClient.invalidateQueries({ queryKey: ["draft-articles", userId] });
    },
  });
};
