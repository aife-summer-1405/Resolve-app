import apiServer from "@/lib/server";
import { IAdminBookingsResponse } from "../types/Admin_Dashboard/AdminBookings";

export const getAdminBookingsAction =
  async (): Promise<IAdminBookingsResponse> => {
    try {
      const { data } = await apiServer.get<IAdminBookingsResponse>(
        "/api/admin/bookings",
      );

      return data;
    } catch (error) {
      console.error("getAdminBookingsAction error:", error);
      throw error;
    }
  };
