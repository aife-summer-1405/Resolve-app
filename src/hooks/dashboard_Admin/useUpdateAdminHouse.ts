"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminHouseAction } from "@/src/actions/AdminHousesAction";
import type { IUpdateAdminHousePayload } from "@/src/types/Admin_Dashboard/AdminHouses";

interface IUpdateAdminHouseVariables {
  id: string;
  payload: IUpdateAdminHousePayload;
}

export const useUpdateAdminHouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: IUpdateAdminHouseVariables) =>
      updateAdminHouseAction(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-houses-all"],
      });
    },
  });
};
