
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCategoryAction } from "@/src/actions/CategoriesAction";
import type { IUpdateCategoryPayload } from "@/src/types/Admin_Dashboard/Categories";

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateCategoryPayload) =>
      updateCategoryAction(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export default useUpdateCategory;
