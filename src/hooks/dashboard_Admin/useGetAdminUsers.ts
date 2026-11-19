"use client";

import { getAdminUsersAction } from "@/src/actions/AdminUsersAction";
import { useQuery } from "@tanstack/react-query";

interface IGetAdminUsersParams {
  page: number;
  limit: number;
  role?: "admin" | "user" | "seller";
}

export const useGetAdminUsers = (params: IGetAdminUsersParams) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAdminUsersAction(params),
  });
};
