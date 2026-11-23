"use client";

import { useQuery } from "@tanstack/react-query";
import { getLocationsAction } from "@/src/actions/LocationAction";
import type { ILocationsResponse } from "@/src/types/Admin_Dashboard/Locations";

export const useGetLocations = (params: { page: number; limit: number }) => {
  return useQuery<ILocationsResponse>({
    queryKey: ["locations", params],
    queryFn: () => getLocationsAction(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
