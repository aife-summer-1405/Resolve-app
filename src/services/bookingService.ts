import api from "@/lib/axios";
import apiClient from "@/lib/client";
import type { IBookingData } from "@/src/types/BookingType";

export const createBooking = async (data: IBookingData) => {
    const response = await apiClient.post("/api/bookings", data);
    return response.data;
};

// export const getBookingById = async (id: number) => {
//     const response = await api.get(`/bookings/${id}`);
//     return response.data;
// };
