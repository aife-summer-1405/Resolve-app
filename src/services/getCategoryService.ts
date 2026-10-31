import api from "@/lib/axios";
import { ICategoriesResponse } from "../types/HousereservesType/CategoriesType";

export const getCategories = async (): Promise<ICategoriesResponse> => {
  const response = await api.get("/api/categories?page=1&limit=1000");

  return response.data;
};
