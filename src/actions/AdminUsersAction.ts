"use server";

import apiServer from "@/lib/server";

import type {
  IAdminUsersResponse,
  IUpdateAdminUserPayload,
} from "@/src/types/Admin_Dashboard/AdminUsers";
interface IGetAdminUsersParams {
  page: number;
  limit: number;
}

export const getAdminUsersAction = async (
  params: IGetAdminUsersParams,
): Promise<IAdminUsersResponse> => {
  try {
    const { data } = await apiServer.get<IAdminUsersResponse>(
      "/api/admin/users",
      {
        params,
      },
    );

    return data;
  } catch (error) {
    console.error("getAdminUsersAction error:", error);
    throw error;
  }
};

export const updateAdminUserAction = async (
  userId: string | number,
  payload: IUpdateAdminUserPayload,
) => {
  try {
    const { data } = await apiServer.put(`/api/admin/users/${userId}`, payload);

    return data;
  } catch (error) {
    console.error("updateAdminUserAction error:", error);
    throw error;
  }
};

export const deleteAdminUserAction = async (userId: string | number) => {
  const { data } = await apiServer.delete(`/api/admin/users/${userId}`);

  return data;
};
