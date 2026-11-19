import apiServer from "@/lib/server";
import type { IAdminHousesResponse } from "@/src/types/Admin_Dashboard/AdminHouses";

export const getAdminHouses = async (): Promise<IAdminHousesResponse> => {
  const { data } =
    await apiServer.get<IAdminHousesResponse>("/api/admin/houses");

  return data;
};
