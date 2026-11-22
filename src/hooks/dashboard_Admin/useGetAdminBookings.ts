"use client";

import { useQuery } from "@tanstack/react-query";

import type { IGetAdminBookingsParams } from "@/src/types/Admin_Dashboard/AdminBookings";
import { getAdminBookingsAction } from "@/src/actions/bookingActions";

export const useGetAdminBookings = (params: IGetAdminBookingsParams = {}) => {
  return useQuery({
    queryKey: ["admin-bookings", params],
    queryFn: () => getAdminBookingsAction(params),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
