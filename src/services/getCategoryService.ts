import api from "@/lib/axios";
import { ICategoriesResponse } from "../types/CategoriesType";

export const getCategories = async (): Promise<ICategoriesResponse> => {
  const response = await api.get("/api/categories");

  return response.data;
};
