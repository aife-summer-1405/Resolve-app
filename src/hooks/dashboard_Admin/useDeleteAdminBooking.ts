"use client";

import { deleteAdminBookingAction } from "@/src/actions/bookingActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAdminBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAdminBookingAction(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-bookings"],
      });

      queryClient.removeQueries({
        queryKey: ["admin-booking", id],
      });
    },
  });
};
