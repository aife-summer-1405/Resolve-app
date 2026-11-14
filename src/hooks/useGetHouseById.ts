"use client";

import { useQuery } from "@tanstack/react-query";
import { getHouseByIdAction } from "@/src/actions/houseActions";

export const useGetHouseById = (id: string, enabled = true) => {
    console.log(333333)
  return useQuery({
    queryKey: ["house", id],
    queryFn: () => getHouseByIdAction(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};