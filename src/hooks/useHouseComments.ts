"use client";

import { useQuery } from "@tanstack/react-query";
import { getHouseComments } from "@/src/services/getHouseComments";

export const useHouseComments = (houseId: string) => {
    return useQuery({
        queryKey: ["house-comments", houseId],
        queryFn: () => getHouseComments(Number(houseId)),
        enabled: Boolean(houseId),
    });
};