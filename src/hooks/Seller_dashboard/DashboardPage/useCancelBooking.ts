"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { cancelBookingAction } from "@/src/actions/bookingActions";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: number) => cancelBookingAction(bookingId),

    onSuccess: (data) => {
      toast.success(data.message || "رزرو با موفقیت لغو شد");

      queryClient.invalidateQueries({
        queryKey: ["customer-bookings, bookings"],
      });
    },

    onError: (error) => {
      const message = isAxiosError(error)
        ? error.response?.data?.message
        : null;

      toast.error(message || "لغو رزرو با خطا مواجه شد");
    },
  });
};