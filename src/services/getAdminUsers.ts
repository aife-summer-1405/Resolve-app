import apiServer from "@/lib/server";
import { IAdminUsersResponse } from "../types/Admin_Dashboard/AdminUsers";

export const getAdminUsers = async (): Promise<IAdminUsersResponse> => {
  const { data } = await apiServer.get<IAdminUsersResponse>("api/admin/users");

  return data;
};
