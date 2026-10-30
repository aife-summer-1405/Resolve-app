"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentAction } from "@/src/actions/commentActions";
import { ICreateCommentInput } from "../types/HousereservesType/HouseCommentsType";

export function useCreateComment(houseId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: ICreateCommentInput) => {
            const result = await createCommentAction(input);

            if (!result.success) {
                throw new Error(
                    result.message ?? "ثبت نظر با خطا مواجه شد."
                );
            }

            return result.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["house-comments", houseId],
            });
        },
    });
}