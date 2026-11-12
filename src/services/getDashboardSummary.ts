import apiServer from "@/lib/server";
import { IDashboardSummary } from "../types/dashboard/DashboardSummary";

export const getDashboardSummary = async (): Promise<IDashboardSummary> => {
  const { data } = await apiServer.get<IDashboardSummary>(
    "api/dashboard/summary"
  );

  return data;
};