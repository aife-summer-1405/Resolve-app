"use client";

import { useMutation } from "@tanstack/react-query";
import { createBookingAction } from "@/src/actions/bookingActions";
import type { IBookingData } from "@/src/types/HousereservesType/BookingType";

export function useCreateBooking() {
    return useMutation({
        mutationFn: async (data: IBookingData) => {
            const result = await createBookingAction(data);

            if (!result.success) {
                throw new Error(result.message);
            }

            return result.data;
        },
    });
}