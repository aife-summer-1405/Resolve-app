"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLocationAction } from "@/src/actions/LocationAction";

interface IUpdateLocationVariables {
  locationId: string;
  payload: {
    area_name: string;
    lat: number;
    lng: number;
  };
}

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ locationId, payload }: IUpdateLocationVariables) =>
      updateLocationAction(locationId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
};
