"use server";

import apiServer from "@/lib/server";

import type {
  IDiscountCodesResponse,
  IGetDiscountCodesParams,
  IDiscountCodePayload,
} from "../types/Admin_Dashboard/DiscountCodes";

export const getDiscountCodesAction = async (
  params: IGetDiscountCodesParams,
): Promise<IDiscountCodesResponse> => {
  const response = await apiServer.get<IDiscountCodesResponse>(
    "/api/discount-codes",
    { params },
  );

  return response.data;
};

export const createDiscountCodeAction = async (data: IDiscountCodePayload) => {
  const response = await apiServer.post("/api/discount-codes", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};

export const updateDiscountCodeAction = async (
  id: string,
  data: IDiscountCodePayload,
) => {
  const response = await apiServer.put(`/api/discount-codes/${id}`, data);

  return response.data;
};
export const deleteDiscountCodeAction = async (id: string) => {
  const response = await apiServer.delete(`/api/discount-codes/${id}`);

  return response.data;
};
