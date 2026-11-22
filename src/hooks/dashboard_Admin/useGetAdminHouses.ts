"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminHousesAction } from "@/src/actions/AdminHousesAction";

export const useGetAdminHouses = () => {
  return useQuery({
    queryKey: ["admin-houses-all"],
    queryFn: () =>
      getAdminHousesAction({
        page: 1,
        limit: 100,
      }),
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
