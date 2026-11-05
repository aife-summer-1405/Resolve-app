"use client";

import { useMutation } from "@tanstack/react-query";
import { createPaymentAction } from "@/src/actions/paymentActions";
import { ICreatePaymentData } from "../types/HousereservesType/paymentType";

export function useCreatePayment() {
    return useMutation({
        mutationFn: async (data: ICreatePaymentData) => {
            const result = await createPaymentAction(data);

            if (!result.success) {
                throw new Error(result.message);
            }

            return result.data;
        },
    });
}