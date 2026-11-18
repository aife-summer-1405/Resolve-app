import { getAdminDashboardSummary } from "@/src/services/getAdminDashboardSummary";
import { getAdminUsers } from "@/src/services/getAdminUsers";
import { getAdminBookingsAction } from "@/src/actions/bookingActions";

import AdminDashboardOverviewSectionClient from "./AdminDashboardOverviewSectionClient";

const AdminDashboardOverviewSection = async () => {
  const [summary, usersResponse, bookingsResponse] = await Promise.all([
    getAdminDashboardSummary(),
    getAdminUsers(),
    getAdminBookingsAction(),
  ]);

  return (
    <AdminDashboardOverviewSectionClient
      summary={summary}
      users={usersResponse.data}
      totalUsers={usersResponse.totalCount}
      reservations={bookingsResponse.data}
    />
  );
};

export default AdminDashboardOverviewSection;
