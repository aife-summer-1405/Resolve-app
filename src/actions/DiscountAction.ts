"use server";
import apiServer from "@/lib/server";
import type {
  IDiscountCodesResponse,
  IGetDiscountCodesParams,
} from "@/src/types/Admin_Dashboard/DiscountCodes";

export const getDiscountCodesAction = async (
  params: IGetDiscountCodesParams,
) => {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        queryParams.append(key, String(value));
      }
    });

    const response = await apiServer.get<IDiscountCodesResponse>(
      `/api/discount-codes?${queryParams.toString()}`,
    );

    return response.data;
  } catch (error) {
    console.error("getDiscountCodesAction error:", error);
    throw error;
  }
};
