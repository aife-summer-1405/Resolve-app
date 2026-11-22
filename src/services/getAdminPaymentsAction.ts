import apiServer from "@/lib/server";
import type { IAdminPaymentsResponse } from "@/src/types/Admin_Dashboard/AdminPayments";

export const getAdminPaymentsAction =
  async (): Promise<IAdminPaymentsResponse> => {
    try {
      const { data } = await apiServer.get<IAdminPaymentsResponse>(
        "/api/admin/payments",
      );

      return data;
    } catch (error) {
      console.error("getAdminPaymentsAction error:", error);
      throw error;
    }
  };
