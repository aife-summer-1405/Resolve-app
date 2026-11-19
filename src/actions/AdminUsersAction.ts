"use server";

import apiServer from "@/lib/server";
import type { IAdminUsersResponse } from "@/src/types/Admin_Dashboard/AdminUsers";

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
