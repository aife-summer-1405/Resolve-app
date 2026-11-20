// src/hooks/Seller_dashboard/useUpdateHouse.ts
"use client";

import { IUpdateHousePayload, updateHouseAction } from "@/src/actions/updateHouseAction";
import { IAddProperty } from "@/src/schemas/properties/propertySchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useUpdateHouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateHousePayload }) =>
      updateHouseAction(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["houses"] }),
  });
};