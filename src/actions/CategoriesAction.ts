
"use server";

import apiServer from "@/lib/server";

import type {
  IGetCategoriesParams,
  ICategoriesResponse,
  ICreateCategoryPayload,
  IUpdateCategoryPayload,
} from "@/src/types/Admin_Dashboard/Categories";

export const getCategoriesAction = async (
  params: IGetCategoriesParams,
): Promise<ICategoriesResponse> => {
  try {
    const { data } = await apiServer.get<ICategoriesResponse>(
      "/api/categories",
      { params },
    );

    return data;
  } catch (error) {
    console.error("getCategoriesAction error:", error);
    throw error;
  }
};

export const createCategoryAction = async (
  payload: ICreateCategoryPayload,
) => {
  try {
    const { data } = await apiServer.post(
      "/api/categories",
      payload,
    );

    return data;
  } catch (error) {
    console.error("createCategoryAction error:", error);
    throw error;
  }
};

export const updateCategoryAction = async (
  payload: IUpdateCategoryPayload,
) => {
  try {
    const { id, ...body } = payload;

    const { data } = await apiServer.put(
      `/api/categories/${id}`,
      body,
    );

    return data;
  } catch (error) {
    console.error("updateCategoryAction error:", error);
    throw error;
  }
};

export const deleteCategoryAction = async (id: string) => {
  try {
    const { data } = await apiServer.delete(
      `/api/categories/${id}`,
    );

    return data;
  } catch (error) {
    console.error("deleteCategoryAction error:", error);
    throw error;
  }
};
