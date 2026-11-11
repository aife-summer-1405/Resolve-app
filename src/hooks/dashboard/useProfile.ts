"use client";

import { uploadProfilePictureAction } from "@/src/actions/authActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfilePictureAction,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export default useProfile;