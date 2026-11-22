"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminHousesAction } from "@/src/actions/AdminHousesAction";
import type { IGetAdminHousesParams } from "@/src/types/Admin_Dashboard/AdminHouses";

export const useGetAdminHouses = (params: IGetAdminHousesParams) => {
  return useQuery({
    queryKey: ["admin-houses", params],
    queryFn: () => getAdminHousesAction(params),
  });
};
