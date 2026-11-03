import { useQuery } from "@tanstack/react-query";

export const useBookings = () => {
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await fetch(`/api/booking`);

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      return res.json();
    },
  });
};
