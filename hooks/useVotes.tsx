import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type VoteProps = {
  commentId: number;
  userId: string;
  type: number;
};

const fetchVote = async (id: number) => {
  if (!id) return;

  await fetch(`/api/articles/article/${id}`, {
    method: "POST",
  });

  const res = await fetch(`/api/comment/votes/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  return data;
};

export const useVotes = (id: number) => {
  return useQuery({
    queryKey: ["votes", id],
    queryFn: () => fetchVote(id),
  });
};

export const useAddVotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VoteProps) => {
      const res = await fetch(`/api/comment/votes/${data.commentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: data.type, userId: data.userId }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["votes"] }),
  });
};
