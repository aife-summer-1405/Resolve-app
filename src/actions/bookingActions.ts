"use server";

import apiServer from "@/lib/server";
import type {
  IBookingData,
  IBookingResult,
} from "@/src/types/HousereservesType/BookingType";
import type { AxiosError } from "axios";
import { IGetBookingsParams } from "../types/dashboard/booking";
import { getBookings } from "../services/getBookings";
import {
  ICancelBookingResponse,
  ICustomerBookingsApiResponse,
  IGetCustomerBookingsParams,
} from "../types/Seller_Dashboard/customer-booking";
import type { IAdminBookingsResponse } from "@/src/types/Admin_Dashboard/AdminBookings";

export async function createBookingAction(
  data: IBookingData,
): Promise<IBookingResult> {
  try {
    const response = await apiServer.post("/api/bookings", data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message:
        axiosError.response?.data?.message ?? "ثبت رزرو با خطا مواجه شد.",
    };
  }
}

export async function getBookingsAction(params: IGetBookingsParams = {}) {
  try {
    return await getBookings(params);
  } catch (error) {
    console.error("getBookingsAction error:", error);
    throw error;
  }
}

export const getAdminBookingsAction =
  async (): Promise<IAdminBookingsResponse> => {
    try {
      const { data } = await apiServer.get<IAdminBookingsResponse>(
        "/api/admin/bookings",
      );

      return data;
    } catch (error) {
      console.error("getAdminBookingsAction error:", error);
      throw error;
    }
  };

export const deleteBookingAction = async (id: string | number) => {
  const { data } = await apiServer.delete(`/api/bookings/${id}`);
  return data;
};

export const getCustomerBookingsAction = async (
  userId: number,
  params: IGetCustomerBookingsParams = {},
): Promise<ICustomerBookingsApiResponse> => {
  const { data } = await apiServer.get(`/api/bookings/${userId}/customers`, {
    params: {
      page: 1,
      limit: 1000,
      sort: "created_at",
      order: "DESC",
      ...params,
    },
  });

  return data;
};



export const cancelBookingAction = async (
  bookingId: number
): Promise<ICancelBookingResponse> => {
  const { data } = await apiServer.post<ICancelBookingResponse>(
    `/api/bookings/${bookingId}/cancel`
  );

  return data;
};

export const continueBookingAction = async (id: number | string) => {
  const { data } = await apiServer.post(`/api/bookings/${id}/continue`);

  return data;
};