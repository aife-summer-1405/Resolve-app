"use client";

import { changePasswordAction } from "@/src/actions/authActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePasswordAction,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export default useChangePassword;