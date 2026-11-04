"use client";

import { useMutation } from "@tanstack/react-query";
import { createBookingAction } from "@/src/actions/bookingActions";
import type {
    IBookingData,
    IBookingResponse,
} from "@/src/types/HousereservesType/BookingType";

export function useCreateBooking() {
    return useMutation<IBookingResponse, Error, IBookingData>({
        mutationFn: async (data) => {
            const result = await createBookingAction(data);

            if (!result.success) {
                throw new Error(result.message);
            }

            return result.data as IBookingResponse;
        },
    });
}