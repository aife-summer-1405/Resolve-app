
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategoryAction } from "@/src/actions/CategoriesAction";
import type { ICreateCategoryPayload } from "@/src/types/Admin_Dashboard/Categories";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateCategoryPayload) =>
      createCategoryAction(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export default useCreateCategory;
