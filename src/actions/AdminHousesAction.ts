"use server";

import apiServer from "@/lib/server";
import type {
  IAdminHousesResponse,
  IGetAdminHousesParams,
  IUpdateAdminHousePayload,
} from "@/src/types/Admin_Dashboard/AdminHouses";

export const getAdminHousesAction = async (
  params: IGetAdminHousesParams,
): Promise<IAdminHousesResponse> => {
  const response = await apiServer.get<IAdminHousesResponse>(
    "/api/admin/houses",
    { params },
  );

  return response.data;
};

export const updateAdminHouseAction = async (
  id: string,
  payload: IUpdateAdminHousePayload,
) => {
  const response = await apiServer.put(`/api/admin/houses/${id}`, payload);

  return response.data;
};

export const deleteAdminHouseAction = async (id: string) => {
  const response = await apiServer.delete(`/api/admin/houses/${id}`);

  return response.data;
};
