"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLocationAction } from "@/src/actions/LocationAction";

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocationAction,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
};
