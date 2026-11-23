"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLocationAction } from "@/src/actions/LocationAction";

const useDeleteLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocationAction,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};

export default useDeleteLocation;
