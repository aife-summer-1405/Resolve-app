"use client";

import { updateAdminUserAction } from "@/src/actions/AdminUsersAction";
import type { IUpdateAdminUserPayload } from "@/src/types/Admin_Dashboard/AdminUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string | number;
      payload: IUpdateAdminUserPayload;
    }) => updateAdminUserAction(userId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
};
