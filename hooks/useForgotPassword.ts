"use client";

import { useMutation } from "@tanstack/react-query";

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email }),
      });

      return res.json();
    },
  });
}
