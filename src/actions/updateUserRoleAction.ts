"use server";


import apiServer from "@/lib/server";
import { AdminUserRole } from "../types/Admin_Dashboard/AdminUsers";



export const updateUserRoleAction = async (
  id: number | string,
  role: AdminUserRole
) => {
  const response = await apiServer.put(`/api/admin/users/${id}/role`, role);

  return response.data;
};