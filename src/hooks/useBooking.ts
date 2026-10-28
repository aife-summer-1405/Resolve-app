import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooking } from "@/src/services/bookingService";
import type { IBookingData } from "@/src/types/BookingType";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (data: IBookingData) => createBooking(data),
  });
};

// export const useBooking = (id: number) => {
//     return useQuery({
//         queryKey: ["booking", id],
//         queryFn: () => getBookingById(id),
//         enabled: Number.isFinite(id) && id > 0,
//     });
// };
