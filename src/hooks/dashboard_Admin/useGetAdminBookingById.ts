"use client";

import { getAdminBookingByIdAction } from "@/src/actions/bookingActions";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminBookingById = (id: number) => {
  return useQuery({
    queryKey: ["admin-booking", id],
    queryFn: () => getAdminBookingByIdAction(id),
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
