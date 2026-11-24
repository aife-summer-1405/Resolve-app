"use client";

import { getAdminUsersAction } from "@/src/actions/AdminUsersAction";
import { AdminUserRole } from "@/src/types/Admin_Dashboard/AdminUsers";
import { useQuery } from "@tanstack/react-query";

interface IGetAdminUsersParams {
  page: number;
  limit: number;
  role?:AdminUserRole;
  email?: string;
}

export const useGetAdminUsers = (params: IGetAdminUsersParams) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAdminUsersAction(params),
  });
};
