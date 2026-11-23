import { getAdminDashboardSummary } from "@/src/services/getAdminDashboardSummary";
import { getAdminUsers } from "@/src/services/getAdminUsers";
import { getAdminBookingsAction } from "@/src/actions/bookingActions";
import { getAdminPaymentsAction } from "@/src/services/getAdminPaymentsAction";
import { getAdminHouses } from "@/src/services/getAdminHouses";

import AdminDashboardOverviewSectionClient from "./AdminDashboardOverviewSectionClient";

const AdminDashboardOverviewSection = async () => {
  const [
    summary,
    usersResponse,
    bookingsResponse,
    paymentsResponse,
    housesResponse,
  ] = await Promise.all([
    getAdminDashboardSummary(),
    getAdminUsers(),
    getAdminBookingsAction(),
    getAdminPaymentsAction(),
    getAdminHouses(),
  ]);

  return (
    <AdminDashboardOverviewSectionClient
      summary={summary}
      users={usersResponse.data}
      totalUsers={usersResponse.totalCount}
      reservations={bookingsResponse.data}
      payments={paymentsResponse.data}
      totalPayments={paymentsResponse.totalCount}
      houses={housesResponse.data}
    />
  );
};

export default AdminDashboardOverviewSection;
