"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/src/services/commentService";

export const useCreateComment = (houseId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["house-comments", houseId],
            });
        },
    });
};