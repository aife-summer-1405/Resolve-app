"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDiscountCodeAction } from "@/src/actions/DiscountAction";

export const useDeleteDiscountCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiscountCodeAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discount-codes"],
      });
    },
  });
};
