"use client";

import { useMutation } from "@tanstack/react-query";
import type { IAddProperty } from "@/src/schemas/properties/propertySchema";
import { createHouseAction } from "@/src/actions/createHouseAction";

export const useCreateHouse = () => {
  return useMutation({
    mutationFn: (data: IAddProperty) => createHouseAction(data),

    onSuccess: (data) => {
      console.log("House created successfully:", data);
    },

    onError: (error) => {
      console.error("Failed to create house:", error);
    },
  });
};