"use client";

import { SavedEvent } from "@/lib/types/events";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const fetchEvent = async (id: number) => {
  if (!id) return;

  const res = await fetch(`/api/events/event/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  return data;
};

export const useEvent = (id: number, userId: string) => {
  return useQuery({
    queryKey: ["created-events", userId],
    queryFn: () => fetchEvent(id),
    // select: (data) => data,
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
  //  select: (data) =>  data?.article,
};

const fetchEvents = async (page: number) => {
  const res = await fetch(`/api/events?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useEvents = (page: number) => {
  return useQuery({
    queryKey: ["created-events", page],
    queryFn: () => fetchEvents(page),
    placeholderData: keepPreviousData,
  });
};

const fetchSavedEvent = async (id: string) => {
  if (!id) return;

  const res = await fetch(`/api/events/event/saved-event/${id}`);
  if (!res) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export const useSavedEvent = (ownerId: string) => {
  return useQuery<SavedEvent[]>({
    queryKey: ["saved_event", ownerId],
    queryFn: () => fetchSavedEvent(ownerId),
    placeholderData: keepPreviousData,
  });
};

type SavedOwner = {
  userId: string;
};

const toggleEvent = async ({
  eventId,
  userId,
  email,
}: {
  userId: string;
  eventId: number;
  email: string;
}): Promise<SavedOwner[]> => {
  const res = await fetch(`/api/events/event/saved-event/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, email }),
  });

  return res.json();
};

export const useToggleEvent = (userId: string) => {
  return useMutation({
    mutationFn: ({ eventId, email }: { eventId: number; email: string }) =>
      toggleEvent({ eventId, userId, email }),
    onMutate: async (eventId, context) => {
      await context.client.cancelQueries({
        queryKey: ["saved_event", userId],
      });

      const previousArticles =
        context.client.getQueryData<SavedEvent[]>(["saved_event", userId]) ||
        [];

      const isAlreadySaved = previousArticles.some(
        (a) => a.eventId === eventId,
      );

      const newData = isAlreadySaved
        ? previousArticles.filter((a) => a.eventId !== eventId)
        : [...previousArticles, { id: Date.now(), userId, eventId }];

      context.client.setQueryData(["saved_event", userId], newData);

      return { previousArticles, newData };
    },

    onSuccess: (err, savedArticle, onMutateResult, context) => {
      // 🔄 Refetch the saved articles after toggle
      context.client.invalidateQueries({ queryKey: ["saved_event"] });
    },

    onError: (err, savedArticle, onMutateResult, context) => {
      context.client.setQueryData(
        ["saved_event", userId],
        onMutateResult?.previousArticles,
      );
    },

    onSettled: (savedArticle, error, variables, onMutateResult, context) =>
      context.client.invalidateQueries({
        queryKey: ["saved_event", userId],
      }),
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/events/event/${id}`, {
        method: "DELETE",
      }).then((data) => data.json()),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["created-events"] }),
  });
};
