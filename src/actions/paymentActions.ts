"use server";

import axios from "axios";
import { ICreatePaymentData } from "../types/HousereservesType/paymentType";
import apiServer from "@/lib/server";
import {
  IGetPaymentsParams,
  IGetPaymentsResponse,
} from "../types/dashboard/payment";

export async function createPaymentAction(data: ICreatePaymentData) {
  try {
    const response = await apiServer.post("/api/payments", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message ?? "خطا در ایجاد درخواست پرداخت",
      };
    }

    return {
      success: false,
      message: "خطای غیرمنتظره در پرداخت",
    };
  }
}

export const getPaymentsAction = async (
  params: IGetPaymentsParams,
): Promise<IGetPaymentsResponse> => {
  const { data } = await apiServer.get("/api/payments", {
    params,
  });

  return data;
};
