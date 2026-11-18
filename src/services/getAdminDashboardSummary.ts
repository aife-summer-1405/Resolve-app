import apiServer from "@/lib/server";
import { IAdminDashboardSummary } from "../types/Admin_Dashboard/AdminDashboardSummary";

export const getAdminDashboardSummary =
  async (): Promise<IAdminDashboardSummary> => {
    const { data } = await apiServer.get<IAdminDashboardSummary>(
      "api/admin/dashboard",
    );

    return data;
  };
