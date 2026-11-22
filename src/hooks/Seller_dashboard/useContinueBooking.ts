
"use client";

import { continueBookingAction } from "@/src/actions/bookingActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useContinueBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number ) => continueBookingAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer-bookings"],
      });
    },
  });
};
