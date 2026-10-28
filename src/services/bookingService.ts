import api from "@/lib/axios";
import type { IBookingData } from "@/src/types/BookingType";

export const createBooking = async (data: IBookingData) => {
  const response = await api.post("/api/bookings", data);
  return response.data;
};

// export const getBookingById = async (id: number) => {
//     const response = await api.get(`/bookings/${id}`);
//     return response.data;
// };
