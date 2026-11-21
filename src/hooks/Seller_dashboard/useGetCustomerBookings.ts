"use client";

import { getCustomerBookingsAction } from "@/src/actions/bookingActions";
import { IGetCustomerBookingsParams } from "@/src/types/Seller_Dashboard/customer-booking";
import { useQuery } from "@tanstack/react-query";


export const useGetCustomerBookings = (
  userId: number | undefined,
  params: IGetCustomerBookingsParams = {},
  enabled = true
) => {
  console.log(1111111111111,enabled, userId, params)
  return useQuery({
    queryKey: ["customer-bookings", userId, params],
    queryFn: () => getCustomerBookingsAction(userId!, params),
    enabled: enabled && !!userId,
  });
};