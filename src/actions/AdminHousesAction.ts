"use server";

import apiServer from "@/lib/server";
import type {
  IAdminHousesResponse,
  IGetAdminHousesParams,
} from "@/src/types/Admin_Dashboard/AdminHouses";

export const getAdminHousesAction = async (
  params: IGetAdminHousesParams,
): Promise<IAdminHousesResponse> => {
  const response = await apiServer.get<IAdminHousesResponse>(
    "/api/admin/houses",
    {
      params,
    },
  );

  return response.data;
};
