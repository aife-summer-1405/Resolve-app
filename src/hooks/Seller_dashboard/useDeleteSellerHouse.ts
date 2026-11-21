"use client";

import { deleteSellerHouseAction } from "@/src/actions/deleteHouseAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSellerHouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSellerHouseAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["seller-houses"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["houses","seller"],
      });
    },
  });
};