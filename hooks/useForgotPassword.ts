"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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

    onSuccess(data, variables, onMutateResult, context) {
      toast(data.message);
    },
    onError: () => {
      toast("Server error. try submitting your credentials again.");
    },
  });
}
