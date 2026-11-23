
"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategoriesAction } from "@/src/actions/CategoriesAction";
import type { IGetCategoriesParams } from "@/src/types/Admin_Dashboard/Categories";

const useGetCategories = (params: IGetCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategoriesAction(params),
  });
};

export default useGetCategories;
