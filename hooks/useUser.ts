import { UserInfo } from "@/lib/types/users";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchAuthor = async (id: string) => {
  const res = await fetch(`/api/user/profile/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export const useAuthor = (id: string) => {
  return useQuery({
    queryKey: ["author", id],
    queryFn: () => fetchAuthor(id),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

const fetchUsers = async () => {
  const res = await fetch(`/api/user`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    placeholderData: keepPreviousData,
  });
};

const updateUser = async ({
  userId,
  userInfo,
}: {
  userId: string;
  userInfo: UserInfo;
}) => {
  await fetch(`/api/user/profile/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      position: userInfo.position,
      bio: userInfo.bio,
      twitter: userInfo.twitter,
      fb: userInfo.fb,
      linkedIn: userInfo.linkedIn,
      instagram: userInfo.instagram,
    }),
  });
};

export const useUpdateUserProfile = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo: UserInfo) => updateUser({ userId, userInfo }),

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["author", userId] }),
  });
};
