"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingAction } from "@/src/actions/bookingActions";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteBookingAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
};