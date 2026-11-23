"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDiscountCodeAction } from "@/src/actions/DiscountAction";
import type { IUpdateDiscountCodeParams } from "@/src/types/Admin_Dashboard/DiscountCodes";

export const useUpdateDiscountCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IUpdateDiscountCodeParams) =>
      updateDiscountCodeAction(params.id, params.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discount-codes"],
      });
    },
  });
};
