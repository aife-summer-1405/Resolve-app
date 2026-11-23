
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategoryAction } from "@/src/actions/CategoriesAction";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategoryAction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export default useDeleteCategory;
