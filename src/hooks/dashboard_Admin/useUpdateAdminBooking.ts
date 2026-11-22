"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUpdateAdminBookingPayload } from "@/src/types/Admin_Dashboard/AdminBookings";
import { updateAdminBookingAction } from "@/src/actions/bookingActions";

export const useUpdateAdminBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: IUpdateAdminBookingPayload;
    }) => updateAdminBookingAction(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-booking", variables.id],
      });
    },
  });
};
