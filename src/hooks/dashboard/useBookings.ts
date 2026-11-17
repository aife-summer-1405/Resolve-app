"use client";

import { getBookingsAction } from "@/src/actions/bookingActions";
import { IGetBookingsParams } from "@/src/types/dashboard/booking";
import { IBookingsApiResponse } from "@/src/types/HousereservesType/BookingType";
import { useQuery } from "@tanstack/react-query";

export const useBookings = (params: IGetBookingsParams,enabled = true
) => {
  return useQuery<IBookingsApiResponse>({
    queryKey: ["bookings", params],
    queryFn: () => getBookingsAction(params),
    enabled: enabled,
  });
};