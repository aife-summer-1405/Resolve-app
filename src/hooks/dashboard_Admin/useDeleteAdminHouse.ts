"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminHouseAction } from "@/src/actions/AdminHousesAction";

export const useDeleteAdminHouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminHouseAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-houses-all"],
      });
    },
  });
};
