"use server";

import apiServer from "@/lib/server";
import type { IBookingData, IBookingResult } from "@/src/types/HousereservesType/BookingType";
import type { AxiosError } from "axios";



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