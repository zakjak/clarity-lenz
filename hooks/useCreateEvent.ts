import { useMutation, useQueryClient } from "@tanstack/react-query";

const createEvent = async (formData: FormData) => {
  const res = await fetch(`/api/create-events`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to create article: ${error}`);
  }

  return res.json();
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createEvent(formData),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["created-events"] });
    },
  });
};
