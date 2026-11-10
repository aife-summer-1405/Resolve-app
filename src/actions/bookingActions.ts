"use server";

import apiServer from "@/lib/server";
import type { IBookingData, IBookingResult, IBookingsApiResponse } from "@/src/types/HousereservesType/BookingType";
import type { AxiosError } from "axios";
import { IGetBookingsParams } from "../types/dashboard/booking";
import { getBookings } from "../hooks/dashboard/getBookings";



export async function createBookingAction(
    data: IBookingData
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
                axiosError.response?.data?.message ??
                "ثبت رزرو با خطا مواجه شد.",
        };
    }
}

export async function getBookingsAction(
  params: IGetBookingsParams = {},
) {
  try {
    return await getBookings(params);
  } catch (error) {
    console.error("getBookingsAction error:", error);
    throw error;
  }
}