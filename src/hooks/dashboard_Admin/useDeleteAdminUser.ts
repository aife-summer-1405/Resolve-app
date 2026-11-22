"use client";

import { deleteAdminUserAction } from "@/src/actions/AdminUsersAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string | number) => deleteAdminUserAction(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};
