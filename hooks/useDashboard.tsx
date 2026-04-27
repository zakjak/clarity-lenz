"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchDashbaord = async () => {
  const res = await fetch("/api/dashboard");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export const useDashboard = (id: string) => {
  return useQuery({
    queryKey: ["dashboard-user", id],
    queryFn: () => fetchDashbaord(),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};
