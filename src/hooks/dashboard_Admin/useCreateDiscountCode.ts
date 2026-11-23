"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscountCodeAction } from "@/src/actions/DiscountAction";

export const useCreateDiscountCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiscountCodeAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discount-codes"],
      });
    },
  });
};
