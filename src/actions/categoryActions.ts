"use server";

import apiServer from "@/lib/server";
import { ICategoriesResponse } from "@/src/types/HousereservesType/CategoriesType";

export const getCategoriesAction =
  async (): Promise<ICategoriesResponse> => {
    const { data } = await apiServer.get<ICategoriesResponse>(
      "/api/categories?page=1&limit=1000"
    );

    return data;
  };