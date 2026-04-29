"use client";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchDashbaord = async () => {
  const res = await fetch("/api/dashboard");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export const useDashboard = (id: string, currentPage: number) => {
  return useQuery({
    queryKey: ["dashboard-user", id, currentPage],
    queryFn: () => fetchDashbaord(),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

export const useDashboardUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (page: number) => {
      const res = await fetch(`/api/dashboard?page=${page}`);
      if (!res.ok) throw new Error("Failed to post comment");
      return res.json();
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-user"],
      });
    },
  });
};

type SavedAdmin = {
  admin: boolean;
};

const toggleAdmin = async ({
  admin,
  userId,
}: {
  admin: boolean;
  userId: string;
}): Promise<SavedAdmin[]> => {
  const res = await fetch(`/api/dashboard/admin`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ admin, userId }),
  });

  return res.json();
};

export const useToggleAdmin = (admin: boolean) => {
  return useMutation({
    mutationFn: (userId: string) => toggleAdmin({ admin, userId }),
    onMutate: async (userId, context) => {
      await context.client.cancelQueries({
        queryKey: ["saved_admin", admin],
      });

      const previousArticles =
        context.client.getQueryData<SavedAdmin[]>(["saved_admin", admin]) || [];

      const isAlreadySaved = previousArticles.some((a) => a.admin === admin);

      const newData = isAlreadySaved
        ? previousArticles.filter((a) => a.admin !== admin)
        : [...previousArticles, { id: Date.now(), admin, userId }];

      context.client.setQueryData(["saved_admin", userId], newData);

      return { previousArticles, newData };
    },

    onSuccess: (err, savedArticle, onMutateResult, context) => {
      // 🔄 Refetch the saved articles after toggle
      context.client.invalidateQueries({ queryKey: ["saved_admin"] });
    },

    onError: (err, savedArticle, onMutateResult, context) => {
      context.client.setQueryData(
        ["saved_admin", admin],
        onMutateResult?.previousArticles,
      );
    },

    onSettled: (savedArticle, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: ["saved_admin", admin],
      }),
  });
};
