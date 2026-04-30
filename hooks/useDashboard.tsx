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

export const useDashboardStats = (id: string, currentPage: number) => {
  return useQuery({
    queryKey: ["dashboard-user", id, currentPage],
    queryFn: () => fetchDashbaord(),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

const fetchDashbaordUsers = async () => {
  const res = await fetch("/api/dashboard/users");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export const useDashboardUsersTable = (id: string) => {
  return useQuery({
    queryKey: ["dashboard-allusers", id],
    queryFn: () => fetchDashbaordUsers(),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

export const useDashboardUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (page: number) => {
      const res = await fetch(`/api/dashboard/admin?page=${page}`);
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

type DashboardUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  isAdmin: boolean;
};

type SavedAdmin = {
  admin: boolean;
  id: number;
  userId: string;
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => toggleAdmin({ admin, userId }),
    onMutate: async (userId, context) => {
      await context.client.cancelQueries({
        queryKey: ["dashboard-allusers"],
      });

      // const previousAdmin = context.client.getQueryData([
      //   "dashboard-user",
      //   userId,
      // ]);

      // context.client.setQueryData(
      //   ["dashboard-user", userId],
      //   (old: { users: [{ id: string }] }) =>
      //     old.users.map((user) =>
      //       user.id === userId ? { ...user, isAdmin: admin } : user,
      //     ),
      // );

      const previousUsers =
        queryClient.getQueryData<DashboardUser[]>(["dashboard-allusers"]) || [];

      console.log(previousUsers);

      queryClient.setQueryData<DashboardUser[]>(
        ["dashboard-user", userId],
        (old = []) =>
          old.map((user) =>
            user.id === userId ? { ...user, isAdmin: admin } : user,
          ),
      );

      // const isAlreadySaved = previousUsers.some((a) => a.admin === admin);

      // const newData = isAlreadySaved
      //   ? previousUsers.filter((a) => a.admin !== admin)
      //   : [...previousUsers, { id: Date.now(), admin, userId }];

      return { previousUsers };
      // return { previousAdmin };
    },

    onSuccess: (err, savedArticle, onMutateResult, context) => {
      // 🔄 Refetch the saved articles after toggle
      context.client.invalidateQueries({ queryKey: ["dashboard-user"] });
    },

    onError: (err, savedArticle, onMutateResult, context) => {
      if (onMutateResult?.previousUsers) {
        queryClient.setQueryData(
          ["dashboard-user"],
          onMutateResult.previousUsers,
        );
      }
      // context.client.setQueryData(
      //   ["dashboard-allusers", admin],
      //   onMutateResult?.previousArticles,
      // );
    },

    onSettled: (savedArticle, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: ["dashboard-allusers"],
      }),
  });
};

const toggleCoAuthor = async ({
  admin,
  userId,
}: {
  admin: boolean;
  userId: string;
}): Promise<SavedAdmin[]> => {
  const res = await fetch(`/api/dashboard/co-author`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isOwner: admin, userId }),
  });

  return res.json();
};

export const useToggleCoAuthor = (admin: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => toggleCoAuthor({ admin, userId }),
    onMutate: async (userId, context) => {
      await context.client.cancelQueries({
        queryKey: ["dashboard-allusers"],
      });

      // const previousAdmin = context.client.getQueryData([
      //   "dashboard-user",
      //   userId,
      // ]);

      // context.client.setQueryData(
      //   ["dashboard-user", userId],
      //   (old: { users: [{ id: string }] }) =>
      //     old.users.map((user) =>
      //       user.id === userId ? { ...user, isAdmin: admin } : user,
      //     ),
      // );

      const previousUsers =
        queryClient.getQueryData<DashboardUser[]>(["dashboard-allusers"]) || [];

      console.log(previousUsers);

      queryClient.setQueryData<DashboardUser[]>(
        ["dashboard-user", userId],
        (old = []) =>
          old.map((user) =>
            user.id === userId ? { ...user, isOwner: admin } : user,
          ),
      );

      // const isAlreadySaved = previousUsers.some((a) => a.admin === admin);

      // const newData = isAlreadySaved
      //   ? previousUsers.filter((a) => a.admin !== admin)
      //   : [...previousUsers, { id: Date.now(), admin, userId }];

      return { previousUsers };
      // return { previousAdmin };
    },

    onSuccess: (err, savedArticle, onMutateResult, context) => {
      // 🔄 Refetch the saved articles after toggle
      context.client.invalidateQueries({ queryKey: ["dashboard-user"] });
    },

    onError: (err, savedArticle, onMutateResult, context) => {
      if (onMutateResult?.previousUsers) {
        queryClient.setQueryData(
          ["dashboard-user"],
          onMutateResult.previousUsers,
        );
      }
      // context.client.setQueryData(
      //   ["dashboard-allusers", admin],
      //   onMutateResult?.previousArticles,
      // );
    },

    onSettled: (savedArticle, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: ["dashboard-allusers"],
      }),
  });
};
